import Link from "next/link";
import {
  testimonials,
  faqData,
} from "@/data/products";
import { Accordion } from "@/components/Accordion";
import { StarRating } from "@/components/StarRating";
import { TrustBadges, CertificationBadges } from "@/components/TrustBadges";
import { JsonLd, organizationJsonLd, faqJsonLd } from "@/components/JsonLd";
import { getProductsByCategory } from "@/lib/products";

export default async function HomePage() {
  const comprehensiveProducts = await getProductsByCategory("comprehensive");

  const faqPreview = Object.values(faqData)
    .flat()
    .slice(0, 5);

  return (
    <>
    <JsonLd data={organizationJsonLd()} />
    <JsonLd data={faqJsonLd(faqPreview)} />

      {/* Hero — Full-width gradient banner */}
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-blue-200 mb-4 font-heading">
              Korea&apos;s #1 Medical Tourism Platform
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-heading">
              Premium Healthcare.<br />
              Personally Curated.<br />
              Globally Trusted.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
              Connect with top-tier Korean hospitals for comprehensive preventive health screenings with full concierge support. No hidden costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-base font-heading"
              >
                Start Here
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-base font-heading"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges — Media */}
      <TrustBadges />

      {/* Stats Strip */}
      <section className="bg-foreground text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">
              Join the 1.7 Million International Patients
            </h2>
            <p className="text-gray-400">Who trust Korean healthcare every year</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { value: "1.7M+", label: "International Patients" },
              { value: "50+", label: "Countries Served" },
              { value: "86", label: "5-Star Reviews" },
              { value: "100+", label: "Medical Interpreters" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary font-heading mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/collections/all"
              className="inline-flex items-center justify-center bg-primary text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-dark transition-colors text-base font-heading"
            >
              Start Testing
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Patients Choose Himedi */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              Why Patients Choose Himedi
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              We handle everything so you can focus on your health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Your Time",
                description: "Skip the long wait times. Access Korea's best preventive health screenings without the months-long queues common in many countries.",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Your Support",
                description: "Our certified medical interpreters and concierge team are with you every step of the way, from scheduling to results delivery. 100+ interpreters available.",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Your Peace of Mind",
                description: "Korean Government Certified medical tourism agency. Partner with Samsung Medical Center, SNUH, and KMI Gangnam for trusted, world-class care.",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Your Results",
                description: "Receive comprehensive, translated medical reports delivered digitally. Share them with your doctor back home for seamless continuity of care.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">{item.title}</h3>
                  <p className="text-muted leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 md:py-24 bg-muted-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <StarRating rating={5} size="lg" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-heading">
              86 Reviews &mdash; 5.0 Average
            </h2>
            <p className="text-muted text-lg">Real experiences from real patients worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-5">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm font-heading">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted">
                      {"countryFlag" in testimonial ? (testimonial as typeof testimonial & { countryFlag: string }).countryFlag + " " : ""}
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors font-heading"
            >
              See packages these patients chose
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works — 4 Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              How It Works
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Four simple steps to your Korean health screening
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Browse Packages",
                description: "Explore our curated screening packages and choose the one that fits your health goals and budget.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                step: 2,
                title: "Customize Itinerary",
                description: "Our concierge team helps tailor your experience, including travel planning, accommodation, and special requests.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                step: 3,
                title: "Confirm & Prepare",
                description: "Complete your booking and receive a detailed preparation guide with fasting instructions and travel tips.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                step: 4,
                title: "Complete & Follow Up",
                description: "Visit Korea, complete your screening with full interpreter support, and receive your translated digital results.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/20" />
                )}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  {item.icon}
                </div>
                <div className="inline-flex items-center justify-center w-7 h-7 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3 font-heading">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do + FAQ */}
      <section className="py-16 md:py-24 bg-muted-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: About */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
                What We Do
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Himedi is a Korean Government Certified medical tourism agency that connects international patients with world-class Korean hospitals for preventive health screenings.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                We partner with Samsung Medical Center, Seoul National University Hospital, and KMI Gangnam to provide comprehensive screening packages that include full concierge support, certified medical interpretation, and digitally translated results.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Government Certified", "Samsung Medical Center", "SNUH", "KMI Gangnam"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 bg-white text-foreground text-sm font-medium px-4 py-2 rounded-full border border-border">
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
              <CertificationBadges />
            </div>

            {/* Right: FAQ */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
                Frequently Asked Questions
              </h2>
              <Accordion items={faqPreview} />
              <div className="mt-6">
                <Link href="/faq" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors font-heading">
                  View All FAQs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">Popular Packages</h2>
              <p className="text-muted mt-2">Our most requested health screening packages</p>
            </div>
            <Link href="/collections/all" className="hidden sm:inline-flex items-center gap-1 text-primary font-medium hover:text-primary-dark transition-colors font-heading">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comprehensiveProducts.slice(0, 3).map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all">
                <div className="flex items-center gap-1 mb-3">
                  <StarRating rating={product.averageRating} count={product.reviewsCount} size="sm" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2 font-heading group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-sm text-muted mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl font-bold text-primary">${product.price.toLocaleString()}</span>
                  <span className="text-xs text-muted bg-muted-light px-2.5 py-1 rounded-full">{product.durationEstimate}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/collections/all" className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary-dark transition-colors font-heading">
              View All Packages
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Full Refund Guaranteed
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Not satisfied with your experience? We offer a full refund. Your health journey with us is completely risk-free.
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-base font-heading"
          >
            Browse All Packages
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Certified Agency
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              24/7 Support
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
