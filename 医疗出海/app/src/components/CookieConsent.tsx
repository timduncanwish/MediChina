"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

const CONSENT_KEY = "himedi_cookie_consent";

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getConsentSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return "declined";
  }
}

function getServerConsentSnapshot(): string | null {
  return "server";
}

export function CookieConsent() {
  const consentValue = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getServerConsentSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const visible = consentValue === null && !dismissed;

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, timestamp: Date.now() }));
    setDismissed(true);
    // Reload to activate analytics scripts
    window.location.reload();
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, timestamp: Date.now() }));
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              We use cookies to improve your experience and analyze site traffic. By clicking &quot;Accept&quot;, you agree to our{" "}
              <Link href="/policies/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={decline}
              className="text-sm text-muted hover:text-foreground transition-colors px-4 py-2"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="text-sm bg-primary text-white font-medium px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) return false;
    return JSON.parse(consent).analytics === true;
  } catch {
    return false;
  }
}
