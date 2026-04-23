import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Himedi - your trusted Korean medical tourism concierge connecting international patients with world-class Korean hospitals.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Mission Hero */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Making World-Class Korean Healthcare Accessible to Everyone
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Himedi is a Korean Government Certified medical tourism agency that
            connects international patients with top-tier Korean hospitals for
            preventive health screenings, at no extra concierge fee.
          </p>
        </div>
      </section>

      {/* Why Korea */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
                Why Korea?
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                South Korea has emerged as one of the world&apos;s leading
                destinations for medical tourism, and for good reason.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  <div>
                    <h3 className="font-semibold text-foreground font-heading">
                      World-Class Technology
                    </h3>
                    <p className="text-sm text-muted">
                      Korean hospitals utilize the latest medical imaging and
                      diagnostic technology, often ahead of Western institutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  <div>
                    <h3 className="font-semibold text-foreground font-heading">
                      Significantly Lower Costs
                    </h3>
                    <p className="text-sm text-muted">
                      The same comprehensive health screenings cost 3-5x less
                      than in the US, UK, or Australia, with no compromise on
                      quality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  <div>
                    <h3 className="font-semibold text-foreground font-heading">
                      Shorter Wait Times
                    </h3>
                    <p className="text-sm text-muted">
                      Skip months-long queues. Korean hospitals offer rapid
                      scheduling and fast results delivery.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  <div>
                    <h3 className="font-semibold text-foreground font-heading">
                      Government Certified
                    </h3>
                    <p className="text-sm text-muted">
                      Korea&apos;s medical tourism program is government-regulated
                      and certified, ensuring quality and safety standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light to-blue-50 rounded-2xl p-12 text-center">
              <div className="space-y-8">
                <div>
                  <p className="text-4xl font-bold text-primary font-heading">
                    3-5x
                  </p>
                  <p className="text-sm text-muted">Lower cost than US/UK</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary font-heading">
                    100+
                  </p>
                  <p className="text-sm text-muted">Medical interpreters</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary font-heading">
                    3-7 days
                  </p>
                  <p className="text-sm text-muted">Results delivery</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary font-heading">
                    $0
                  </p>
                  <p className="text-sm text-muted">Concierge fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-16 md:py-20 bg-muted-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              Our Founders
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              The team behind Himedi&apos;s mission to democratize access to
              Korean healthcare
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-border text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-light to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary font-heading">
                  DS
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1 font-heading">
                Donkyo Seo
              </h3>
              <p className="text-primary font-medium mb-4">CEO & Co-Founder</p>
              <p className="text-muted text-sm leading-relaxed">
                With extensive experience in Korean healthcare and international
                business, Donkyo leads Himedi&apos;s vision of making Korean
                medical excellence accessible globally. His deep connections with
                top Korean hospitals ensure our patients receive the best care
                possible.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-border text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-secondary font-heading">
                  WB
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1 font-heading">
                William Ban
              </h3>
              <p className="text-secondary font-medium mb-4">
                COO & Co-Founder
              </p>
              <p className="text-muted text-sm leading-relaxed">
                William brings operational expertise and a passion for patient
                experience. Having personally navigated the challenges of seeking
                medical care abroad, he built Himedi&apos;s concierge system to
                ensure every patient feels supported throughout their journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description:
                  "No hidden fees, no surprises. All displayed prices are final and include our full concierge service. We believe in honest, upfront communication.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
              },
              {
                title: "Patient-First",
                description:
                  "Every decision we make is centered on your well-being and comfort. From medical interpretation to itinerary planning, we prioritize your needs above all else.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              },
              {
                title: "Excellence",
                description:
                  "We partner only with Korea's most prestigious hospitals and clinics. Our commitment to quality means you receive world-class care at every step of your journey.",
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-xl bg-muted-light"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={value.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
                  {value.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Hospitals */}
      <section className="py-16 md:py-20 bg-muted-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              Our Partner Hospitals
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              We partner exclusively with Korea&apos;s most prestigious medical
              institutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Samsung Medical Center",
                specialty: "Multi-specialty",
                description:
                  "One of Korea's most renowned hospitals, known for advanced diagnostics and cutting-edge medical technology. Part of the Samsung healthcare system.",
              },
              {
                name: "Seoul National University Hospital (SNUH)",
                specialty: "Multi-specialty / Research",
                description:
                  "Korea's leading research hospital and medical school. Consistently ranked as the top hospital in South Korea for comprehensive care.",
              },
              {
                name: "KMI Gangnam",
                specialty: "Preventive Medicine",
                description:
                  "A specialized health screening center in Seoul's prestigious Gangnam district, focused exclusively on preventive medicine and diagnostics.",
              },
            ].map((hospital) => (
              <div
                key={hospital.name}
                className="bg-white rounded-xl p-8 border border-border"
              >
                <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1 font-heading">
                  {hospital.name}
                </h3>
                <p className="text-xs text-primary font-medium mb-3">
                  {hospital.specialty}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {hospital.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Explore our packages or get in touch with our concierge team for
            personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections/all"
              className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors font-heading"
            >
              Browse Packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors font-heading"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
