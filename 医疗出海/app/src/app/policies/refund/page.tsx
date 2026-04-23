import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Himedi refund and cancellation policy. Learn about our refund terms, rescheduling options, and cancellation windows.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-heading">
            Refund Policy
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <p className="text-muted mb-6">
            Last updated: April 20, 2026
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 mt-8 font-heading">
            Cancellation Policy
          </h2>
          <div className="bg-muted-light rounded-xl p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-secondary font-bold text-sm">7+</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">7+ Days Before Appointment</h3>
                  <p className="text-sm text-muted">Full refund of the order total.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-accent font-bold text-sm">&lt;7</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Less Than 7 Days Before Appointment</h3>
                  <p className="text-sm text-muted">50% refund of the order total.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-red-500 font-bold text-sm">NS</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">No-Show</h3>
                  <p className="text-sm text-muted">No refund. Full order amount is non-refundable.</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4 mt-8 font-heading">
            Rescheduling
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            You may reschedule your appointment free of charge within 12 months
            of your original purchase date. To reschedule, please contact our
            support team via email at hello@himedi.com or through our contact
            form.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4 mt-8 font-heading">
            How to Request a Refund
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted">
            <li>Contact our support team at hello@himedi.com</li>
            <li>Provide your order number and reason for cancellation</li>
            <li>Our team will verify your booking details</li>
            <li>Refund will be processed within 5-10 business days to the original payment method</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground mb-4 mt-8 font-heading">
            Exceptions
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            In the event that a medical facility cancels or significantly
            reschedules your appointment due to operational reasons, Himedi will
            offer a full refund or free rescheduling at your preference.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
            <p className="text-sm text-muted">
              <strong className="text-foreground">Note:</strong> All refund
              requests are subject to verification. Himedi reserves the right to
              process refunds on a case-by-case basis. For questions, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
