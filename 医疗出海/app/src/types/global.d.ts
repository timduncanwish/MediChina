declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export {};

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}
