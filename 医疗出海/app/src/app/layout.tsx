import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { Analytics } from "@/components/Analytics";
import { AuthProvider } from "@/components/AuthProvider";
import { CookieConsent } from "@/components/CookieConsent";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Himedi - Korean Medical Tourism Concierge",
    template: "%s | Himedi",
  },
  description:
    "Connect with top-tier Korean hospitals for preventive health screenings. Full concierge support including medical interpretation, itinerary planning, and post-checkup follow-up at no extra fee.",
  keywords: [
    "medical tourism",
    "Korea",
    "health screening",
    "health checkup",
    "preventive care",
    "Korean hospitals",
    "medical concierge",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Himedi",
    title: "Himedi - Korean Medical Tourism Concierge",
    description:
      "Connect with top-tier Korean hospitals for preventive health screenings. Full concierge support at no extra fee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himedi - Korean Medical Tourism Concierge",
    description:
      "Connect with top-tier Korean hospitals for preventive health screenings. Full concierge support at no extra fee.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${instrumentSans.variable} ${nunito.variable}`}>
      <body className="min-h-full flex flex-col font-body">
        <Analytics />
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        <CookieConsent />
      </body>
    </html>
  );
}
