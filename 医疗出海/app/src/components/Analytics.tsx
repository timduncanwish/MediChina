"use client";

import Script from "next/script";
import { hasConsent } from "./CookieConsent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export function Analytics() {
  const consented = typeof window !== "undefined" && hasConsent();

  return (
    <>
      {/* Google Analytics - only loaded with consent */}
      {GA_MEASUREMENT_ID && consented && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel - only loaded with consent */}
      {FB_PIXEL_ID && consented && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

// Event tracking helpers
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (GA_MEASUREMENT_ID && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Facebook Pixel
  if (FB_PIXEL_ID && typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
}

// E-commerce event helpers
export const analytics = {
  viewItem: (product: { id: string; title: string; price: number; category: string }) => {
    trackEvent("view_item", {
      currency: "USD",
      value: product.price,
      items: [{ item_id: product.id, item_name: product.title, item_category: product.category, price: product.price }],
    });
  },
  addToCart: (product: { id: string; title: string; price: number; quantity: number }) => {
    trackEvent("add_to_cart", {
      currency: "USD",
      value: product.price * product.quantity,
      items: [{ item_id: product.id, item_name: product.title, price: product.price, quantity: product.quantity }],
    });
  },
  beginCheckout: (items: { id: string; title: string; price: number; quantity: number }[], total: number) => {
    trackEvent("begin_checkout", {
      currency: "USD",
      value: total,
      items: items.map((i) => ({ item_id: i.id, item_name: i.title, price: i.price, quantity: i.quantity })),
    });
  },
  purchase: (orderId: string, items: { id: string; title: string; price: number; quantity: number }[], total: number) => {
    trackEvent("purchase", {
      transaction_id: orderId,
      currency: "USD",
      value: total,
      items: items.map((i) => ({ item_id: i.id, item_name: i.title, price: i.price, quantity: i.quantity })),
    });
  },
};
