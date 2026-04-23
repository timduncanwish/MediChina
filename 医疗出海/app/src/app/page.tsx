import Link from "next/link";
import {
  testimonials,
  faqData,
  comprehensiveProducts,
} from "@/data/products";
import { AccordionItem } from "@/components/Accordion";
import { StarRating } from "@/components/StarRating";
import { JsonLd, organizationJsonLd, faqJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  const faqPreview = Object.values(faqData)
    .flat()
    .slice(0, 6);

  return (
    <>
    <JsonLd data={organizationJsonLd()} />
    <JsonLd data={faqJsonLd(faqPreview)} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-heading">
              World-Class Korean Health Screenings, Stress-Free
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-4">
              Connect with top-tier Korean hospitals for comprehensive
              preventive health screenings with full concierge support.
            </p>
            <p className="text-base text-blue-200 mb-8 font-medium">
              No concierge fees. No hidden costs. Just exceptional care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-base font-heading"
              >
                Explore Packages
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-base font-heading"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              Why Choose Himedi?
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              We handle everything so you can focus on your health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-muted-light">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">Your Time</h3>
              <p className="text-muted leading-relaxed">
                Skip the long wait times. Access Korea&apos;s best preventive health screenings without the months-long queues common in many countries.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-muted-light">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">Your Support</h3>
              <p className="text-muted leading-relaxed">
                Our certified medical interpreters and concierge team are with you every step of the way, from scheduling to results delivery. 100+ interpreters available.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-muted-light">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">Your Peace of Mind</h3>
              <p className="text-muted leading-relaxed">
                Korean Government Certified medical tourism agency. Partner with Samsung Medical Center, SNUH, and KMI Gangnam for trusted, world-class care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Himedi Experience */}
      <section className="py-16 md:py-20 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
            The Himedi Experience
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto mb-8">
            We guarantee a seamless, stress-free health screening experience in Korea. From the moment you book to the delivery of your translated results, Himedi is your dedicated partner in preventive health.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["Samsung Medical Center", "SNUH", "KMI Gangnam"].map((name) => (
              <div key={name} className="flex items-center gap-2 text-muted/60">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <StarRating rating={5} size="lg" />
            <span className="text-muted font-medium ml-2">78+ Reviews | 5.0 Average</span>
          </div>
        </div>
      </section>

      {/* 4-Step Booking Flow */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              How It Works
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Four simple steps to your Korean health screening
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Browse & Select", description: "Explore our curated packages and choose the screening that fits your health goals." },
              { step: 2, title: "Customize Itinerary", description: "Our concierge team helps tailor your experience, including travel planning and special requests." },
              { step: 3, title: "Confirm & Prepare", description: "Complete your booking and receive a detailed preparation guide for your screening." },
              { step: 4, title: "Complete Checkup", description: "Visit Korea, complete your screening with full interpreter support, and receive translated results." },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-primary/20" />
                )}
                <div className="relative z-10 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 font-heading">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-muted-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground font-heading">Popular Packages</h2>
              <p className="text-muted mt-1">Our most requested health screening packages</p>
            </div>
            <Link href="/collections/all" className="hidden sm:inline-flex items-center gap-1 text-primary font-medium hover:text-primary-dark transition-colors font-heading">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comprehensiveProducts.slice(0, 3).map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={product.averageRating} count={product.reviewsCount} size="sm" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2 font-heading">{product.title}</h3>
                <p className="text-sm text-muted mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${product.price.toLocaleString()}</span>
                  <span className="text-xs text-muted">{product.durationEstimate}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              What Our Clients Say
            </h2>
            <p className="text-muted text-lg">Real experiences from real patients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-muted-light rounded-xl p-6 border border-border">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.nationality} | {testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24 bg-muted-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-muted text-lg">Quick answers to common questions</p>
          </div>
          <div className="space-y-3">
            {faqPreview.map((item, index) => (
              <AccordionItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors font-heading">
              View All FAQs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
                Meet the Founders
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Himedi was founded in 2024 by Donkyo Seo and William Ban with a simple mission: make world-class Korean healthcare accessible to everyone, regardless of language or cultural barriers.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Having experienced firsthand the challenges international patients face when seeking medical care abroad, they built Himedi to provide a seamless, stress-free experience from booking to results delivery.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                As featured in Business of Fashion and Oprah Daily, Himedi has quickly become the trusted name in Korean medical tourism.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors font-heading">
                Read Our Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary-light to-blue-100 rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary font-heading">DS</span>
                </div>
                <h3 className="font-semibold text-foreground font-heading">Donkyo Seo</h3>
                <p className="text-sm text-muted">CEO & Co-Founder</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-green-50 rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary font-heading">WB</span>
                </div>
                <h3 className="font-semibold text-foreground font-heading">William Ban</h3>
                <p className="text-sm text-muted">COO & Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Credibility */}
      <section className="py-12 bg-muted-light border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted mb-6 uppercase tracking-wider font-medium">As Featured In</p>
          <div className="flex items-center justify-center gap-12 md:gap-20">
            <div className="text-muted/40 text-lg font-bold font-heading">Business of Fashion</div>
            <div className="text-muted/40 text-lg font-bold font-heading">Oprah Daily</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
            Ready to Prioritize Your Health?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Browse our health screening packages and book your Korean medical experience today. Full concierge support included at no extra cost.
          </p>
          <Link href="/collections/all" className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-base font-heading">
            Browse All Packages
          </Link>
        </div>
      </section>
    </>
  );
}
