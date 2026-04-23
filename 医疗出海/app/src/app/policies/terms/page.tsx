import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Himedi Terms of Service. Read our terms and conditions for using Himedi's Korean medical tourism platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-heading">
            Terms of Service
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <p className="text-muted mb-6">Last updated: April 20, 2026</p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            By accessing and using the Himedi website and services, you agree to
            be bound by these Terms of Service. If you do not agree to these
            terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            2. Service Description
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Himedi is a medical tourism concierge platform that connects
            international patients with Korean hospitals for preventive health
            screenings. We facilitate booking, scheduling, medical
            interpretation, and coordination services. Himedi is not a medical
            provider and does not deliver medical services directly.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            3. Medical Disclaimer
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted">
              <strong className="text-foreground">Important:</strong> The health
              screening services offered through Himedi are provided by
              independent third-party hospitals and clinics. Himedi does not
              provide medical advice, diagnosis, or treatment. All medical
              services are subject to the terms and conditions of the respective
              healthcare provider.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            4. Pricing and Payment
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            All prices are displayed in US Dollars (USD) and include concierge
            support and English medical interpretation at no additional cost.
            Payment is required at the time of booking. We accept major credit
            cards, PayPal, Apple Pay, and Google Pay.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            5. Cancellation and Refunds
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Please refer to our{" "}
            <a href="/policies/refund" className="text-primary hover:underline">
              Refund Policy
            </a>{" "}
            for detailed information about cancellations and refund eligibility.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            6. HIPAA and Health Data
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Himedi does not store, process, or have access to your Protected
            Health Information (PHI). All medical records and health data are
            handled exclusively by our partner hospitals in compliance with
            applicable Korean and international health data regulations.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            7. Limitation of Liability
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Himedi acts solely as a facilitator and concierge service. We are
            not liable for the medical outcomes, diagnoses, or treatments
            provided by our partner hospitals. Our liability is limited to the
            concierge and coordination services we provide.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            8. Changes to Terms
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We reserve the right to update these Terms of Service at any time.
            Changes will be posted on this page with an updated revision date.
            Continued use of our services after changes constitutes acceptance
            of the revised terms.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            9. Contact
          </h2>
          <p className="text-muted leading-relaxed">
            For questions about these Terms of Service, please contact us at
            hello@himedi.com or visit our{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
