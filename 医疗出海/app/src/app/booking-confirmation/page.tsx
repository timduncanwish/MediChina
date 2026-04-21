import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Himedi",
  description: "Your health screening booking has been confirmed.",
};

export default function BookingConfirmationPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
          Booking Confirmed!
        </h1>

        <p className="text-muted text-lg mb-2">
          Thank you for choosing Himedi for your health screening.
        </p>
        <p className="text-muted mb-8">
          A confirmation email has been sent to your inbox with detailed
          preparation instructions and next steps.
        </p>

        {/* What happens next */}
        <div className="bg-muted-light rounded-xl p-8 text-left mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Concierge Contact",
                description:
                  "Our team will reach out within 24-48 hours to help plan your itinerary and answer any questions.",
              },
              {
                step: "2",
                title: "Schedule Appointment",
                description:
                  "We will work with you to select the best date and time for your screening at our partner hospital.",
              },
              {
                step: "3",
                title: "Preparation Guide",
                description:
                  "You will receive a detailed preparation guide including fasting instructions and what to bring.",
              },
              {
                step: "4",
                title: "Travel to Korea",
                description:
                  "We assist with travel recommendations and airport transfer arrangements if needed.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 font-[family-name:var(--font-heading)]">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-left mb-8">
          <h3 className="font-semibold text-foreground mb-2 font-[family-name:var(--font-heading)]">
            Important Information
          </h3>
          <ul className="text-sm text-muted space-y-1">
            <li>- Your booking can be rescheduled free of charge within 12 months.</li>
            <li>- Full refund available if cancelled 7+ days before your appointment.</li>
            <li>- 50% refund for cancellations less than 7 days before.</li>
            <li>- English medical interpretation is included at no extra cost.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-[family-name:var(--font-heading)]"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-[family-name:var(--font-heading)]"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
