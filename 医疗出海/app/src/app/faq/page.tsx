import { Metadata } from "next";
import { faqData } from "@/data/products";
import { Accordion } from "@/components/Accordion";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Himedi's Korean medical tourism services, booking process, pricing, and travel preparation.",
};

export default function FAQPage() {
  const allFaqs = Object.values(faqData).flat();

  return (
    <>
    <JsonLd data={faqJsonLd(allFaqs)} />
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Frequently Asked Questions
          </h1>
          <p className="text-blue-100 text-lg">
            Find answers to common questions about our services, booking
            process, and what to expect during your Korean health screening.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {Object.entries(faqData).map(([category, questions]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading flex items-center gap-2">
                <div className="w-2 h-8 bg-primary rounded-full" />
                {category}
              </h2>
              <Accordion items={questions} />
            </section>
          ))}
        </div>
      </div>

      {/* Still have questions? */}
      <section className="py-16 bg-muted-light border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
            Still Have Questions?
          </h2>
          <p className="text-muted mb-6">
            Our concierge team is here to help. Get in touch and we&apos;ll
            respond within 24-48 hours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-heading"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
    </>
  );
}
