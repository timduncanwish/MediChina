import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Himedi Privacy Policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-heading">
            Privacy Policy
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <p className="text-muted mb-6">Last updated: April 20, 2026</p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            1. Information We Collect
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We collect information you provide directly, such as your name,
            email address, phone number, nationality, and service preferences
            when you create an account, make a booking, or contact us. We also
            collect usage data automatically through cookies and analytics tools.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-muted space-y-1 mb-4">
            <li>Process bookings and facilitate health screenings</li>
            <li>Provide concierge support and medical interpretation</li>
            <li>Send booking confirmations, preparation guides, and reminders</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            3. Health Data (HIPAA Notice)
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted">
              <strong className="text-foreground">HIPAA Compliance:</strong>{" "}
              Himedi does not collect, store, or process Protected Health
              Information (PHI). All medical records, test results, and health
              data are handled exclusively by our partner hospitals and are
              subject to Korean healthcare data protection laws. Medical results
              are delivered to you through secure, encrypted channels.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            4. Third-Party Services
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We use trusted third-party services including payment processors
            (Stripe, PayPal), scheduling tools (Calendly), and analytics
            (Google Analytics). Each of these services has their own privacy
            policies governing data they collect.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            5. Cookies
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We use essential cookies for site functionality and analytics cookies
            to understand how visitors interact with our website. You can manage
            cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            6. Data Retention
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We retain your personal information for as long as necessary to
            provide our services and comply with legal obligations. You may
            request deletion of your account and personal data at any time by
            contacting us.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            7. Your Rights (GDPR / CCPA)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-disc list-inside text-muted space-y-1 mb-4">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            8. Data Security
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We implement industry-standard security measures to protect your
            personal information, including SSL encryption, secure payment
            processing, and access controls. However, no method of transmission
            over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            9. Contact
          </h2>
          <p className="text-muted leading-relaxed">
            For privacy-related inquiries or to exercise your data rights,
            please contact us at hello@himedi.com or visit our{" "}
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
