"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "himedi_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, timestamp: Date.now() }));
    setVisible(false);
    // Reload to activate analytics scripts
    window.location.reload();
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, timestamp: Date.now() }));
    setVisible(false);
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
