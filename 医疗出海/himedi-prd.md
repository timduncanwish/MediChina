# Product Requirements Document (PRD)
## Himedi - Korean Medical Tourism Concierge Platform

**Version:** 1.0 | **Date:** 2026-04-20 | **Source:** https://himedi.com/

---

## 1. Product Overview

### 1.1 Vision and Mission
Himedi connects international patients with top-tier Korean hospitals for preventive health screenings. The platform provides full concierge support including medical interpretation, itinerary planning, and post-checkup follow-up at **no extra fee** to the customer. Revenue is generated via commission from partner clinics.

### 1.2 Business Model
- **Revenue:** Commission-based from partner hospitals/clinics
- **Customer-facing:** Zero concierge fees; all displayed prices are final
- **Positioning:** Premium medical tourism concierge targeting English-speaking markets
- **Certification:** Korean Government Certified medical tourism agency

### 1.3 Company Background
- **Founded:** 2024
- **Founders:** Donkyo Seo (CEO), William Ban (COO)
- **Media Coverage:** Featured in Business of Fashion (BoF), Oprah Daily
- **Platform:** Shopify-based e-commerce storefront

---

## 2. User Personas

| Persona | Profile | Pain Points | Goals |
|---------|---------|-------------|-------|
| Health-Conscious Traveler | 28-55, mid-to-high income, wellness-oriented | Language barriers, unfamiliar logistics abroad | Stress-free preventive screening in Korea |
| Medical Tourist | 35-65, seeking affordable healthcare | High costs / long waits at home | Affordable, high-quality Korean diagnostics |
| Expat in Korea | 25-50, English-speaking resident | Non-Korean speaker, complex hospital system | English-supported health screening experience |

---

## 3. Product and Service Catalog

### 3.1 Comprehensive Screens (6 Packages)

| # | Package Name | Price (USD) | Key Details |
|---|-------------|------------|-------------|
| 1 | **Whole Body MRI** | $1,800 | MRI-based full-body imaging scan |
| 2 | **MRI + Health Checkup** | $2,000 | Whole Body MRI combined with blood work and standard panels |
| 3 | **Baseline Health Checkup** | $299 | Entry-level screening: blood, urine, basic vitals |
| 4 | **Expanded Health Checkup** | $890 | Mid-tier: adds imaging (ultrasound, X-ray), endoscopy options |
| 5 | **Intensive Health Checkup** | $1,630 | Advanced: full imaging suite, PET/CT option, cardiac screening |
| 6 | **Comprehensive Health Checkup** | $2,815 | Premium: all-inclusive screening with specialist consultations |

### 3.2 Focused Diagnostics (4 Services)

| # | Service | Price (USD) | Key Details |
|---|---------|------------|-------------|
| 1 | **Skin Analysis & Consultation** | $77 | Dermatological skin analysis with specialist consultation |
| 2 | **Hair Analysis & Consultation** | $77 | Hair and scalp health analysis with treatment recommendations |
| 3 | **Vision Eye Exam** | $150 | Comprehensive ophthalmological examination |
| 4 | **Women's Health Screening** | $577 | Women-focused gynecological and hormonal screening |

### 3.3 Product Detail Page Content
Each product page includes:
- Service name and price
- Duration estimate (half-day / full-day / multi-day)
- Partner hospital/clinic information
- Included tests/procedures itemized list
- Preparation instructions (fasting, medication pause, etc.)
- Judge.me customer reviews with star ratings
- Calendly scheduling widget
- Add to Cart / Book Now CTA

---

## 4. Site Architecture and Navigation

### 4.1 Site Map

```
Homepage (/)
+-- Shop All / Packages (/collections/all)
|   +-- Comprehensive Screens (6 packages)
|   +-- Focused Diagnostics (4 services)
+-- About (/pages/about)
+-- FAQ (/pages/faq)
+-- Contact (/pages/contact)
+-- Blog (/blogs/[language])
|   +-- English, Korean, Arabic, Mongolian, Russian
+-- Cart (/cart)
+-- Checkout (/checkout)
+-- Refund Policy (/policies/refund-policy)
+-- Terms of Service (/policies/terms-of-service)
+-- Privacy Policy (/policies/privacy-policy)
```

### 4.2 Navigation Structure
- **Main Nav:** Home | Shop All | About | FAQ | Contact
- **Header Elements:** Logo, navigation links, cart icon (with item count badge)
- **Footer:** Brand info, quick links, service links, legal links, social media icons
- **Mobile:** Hamburger menu with slide-out drawer

---

## 5. User Flows

### 5.1 Primary Flow: Browse > Book > Complete

1. Homepage Visit
2. Browse Packages (collection page)
3. Select Service (product detail page)
4. View Details, Reviews, Preparation Info
5. Add to Cart
6. Checkout (Shopify Payments: PayPal / Credit Card / Apple Pay / Google Pay)
7. Schedule Appointment (Calendly embedded widget)
8. Confirmation Email (Klaviyo automated)
9. Pre-Visit Prep Guide (email + SMS reminders)
10. Appointment Day (Medical Interpreter provided)
11. Complete Checkup
12. Results Delivery (translated to preferred language)
13. Follow-Up Communication
14. Review Request (Judge.me post-purchase email)

### 5.2 Inquiry Flow: Custom Request

1. Contact Page (Typeform embed)
2. Fill inquiry form (name, email, phone, nationality, service interest, preferred dates)
3. Submit
4. Himedi concierge reviews
5. Concierge contacts user within 24-48 hours
6. Itinerary proposed and refined
7. Booking confirmed

### 5.3 Refund / Modification Flow

1. Contact Support
2. Verify booking details
3. Determine resolution:
   - Date Change: Free within 12 months of purchase
   - Full Refund: Cancellation 7+ days before appointment
   - 50% Refund: Cancellation <7 days before appointment
   - No Refund: No-show

---

## 6. Page-by-Page Requirements

### 6.1 Homepage
| Section | Priority | Content |
|---------|----------|---------|
| Hero Banner | P0 | Headline, "No concierge fees" subtext, CTA button, hero image |
| Value Propositions | P0 | 3-column: Your Time / Your Support / Your Peace of Mind |
| The Himedi Experience | P0 | Guarantee messaging, trust indicators |
| 4-Step Booking Flow | P1 | Browse > Customize > Confirm > Complete (visual stepper) |
| Testimonials | P1 | 3+ customer reviews with name, nationality, service type |
| FAQ Preview | P1 | Top 5-8 FAQ items in accordion format |
| Founder Story | P2 | Photos of Donkyo Seo & William Ban, narrative text |
| Media Credibility | P2 | "As Featured In" - BoF, Oprah Daily logos |
| Reviews Badge | P1 | Judge.me badge showing 78+ reviews, average rating |
| Footer | P0 | Multi-column: brand, links, legal, social |

### 6.2 Collection / Shop All Page
- Category grouping: Comprehensive Screens vs Focused Diagnostics
- Product cards: image, name, price, star rating, quick action button
- 2-3 column grid (desktop), 1-2 column (mobile)

### 6.3 Product Detail Page
- Two-column layout: product images (left) + info panel (right)
- Info panel: title, price, description, included items, CTA button
- Calendly inline scheduling widget
- Preparation instructions expandable section
- Partner hospital information
- Judge.me reviews section (86+ reviews on checkup page)
- Related/similar products

### 6.4 About Page
- Mission statement hero section
- "Why Korea?" section with healthcare quality data
- Founder profiles (Donkyo Seo, William Ban)
- Company values grid
- Partner hospital logos and descriptions

### 6.5 FAQ Page
- Accordion-style Q&A
- Categories: Booking Process, Language Support, Pricing & Payment, Refund & Cancellation, Exam Preparation, Colonoscopy, Follow-Up, Accommodation, Treatment Options

### 6.6 Contact Page
- Typeform embedded form
- Fields: Full Name, Email, Phone, Nationality, Service Interest, Preferred Date Range, Additional Notes

### 6.7 Blog
- Multi-language support: EN, KR, AR, MN, RU
- Health tips, Korea travel guides, service spotlights
- SEO-optimized content articles

### 6.8 Policy Pages
- **Refund Policy:** Full (7+ days), 50% (<7 days), None (no-show), Free reschedule within 12 months
- **Terms of Service:** Standard Shopify ToS with medical disclaimers
- **Privacy Policy:** GDPR/CCPA compliant, HIPAA disclaimers (no PHI stored on platform)

---

## 7. Functional Requirements

### 7.1 Core E-Commerce (P0)
| ID | Requirement | Description |
|----|------------|-------------|
| FR-1 | Product Catalog | Display 10 products across 2 categories with full details |
| FR-2 | Product Detail Pages | Name, price, duration, hospital info, reviews, prep instructions, CTA |
| FR-3 | Shopping Cart | Add/remove items, quantity management, persistent cart |
| FR-4 | Checkout Flow | Shopify checkout with multiple payment methods |
| FR-5 | Payment Processing | PayPal + credit/debit card (guest checkout) + Apple Pay + Google Pay |

### 7.2 Booking & Scheduling (P0)
| ID | Requirement | Description |
|----|------------|-------------|
| FR-6 | Calendly Integration | Embedded scheduling widget on product pages |
| FR-7 | Appointment Booking | Date/time selection with real-time availability |
| FR-8 | Booking Confirmation | Automated email via Klaviyo with booking details |
| FR-9 | Booking Modification | Free date changes within 12 months via support |

### 7.3 Concierge Services (P0-P1)
| ID | Requirement | Description |
|----|------------|-------------|
| FR-10 | Medical Interpretation | 100+ interpreters; English, Chinese, Japanese, Korean |
| FR-11 | Itinerary Planning | Pre-trip consultation, hospital coordination, accommodation |
| FR-12 | Post-Checkup Follow-Up | Translated results, specialist referrals, digital reports |

### 7.4 Communication & Marketing (P1)
| ID | Requirement | Description |
|----|------------|-------------|
| FR-13 | Email Automation (Klaviyo) | Welcome, booking confirm, prep guide, reminders, reviews, newsletter |
| FR-14 | SMS Notifications (Klaviyo) | Booking confirm, appointment reminders (24hr, 2hr) |
| FR-15 | Contact Form (Typeform) | Embedded inquiry form with structured fields |
| FR-16 | Blog (Multi-language) | EN, KR, AR, MN, RU content publishing |

### 7.5 Trust & Social Proof (P0-P2)
| ID | Requirement | Description |
|----|------------|-------------|
| FR-17 | Customer Reviews (Judge.me) | Star ratings, verified badges, 78+ reviews displayed |
| FR-18 | Testimonials | Homepage customer stories with name and nationality |
| FR-19 | Partner Hospital Display | Logos: Samsung Medical Center, SNUH, KMI Gangnam |
| FR-20 | Media Credibility | BoF, Oprah Daily logos |

### 7.6 Content & Information (P0-P2)
| ID | Requirement | Description |
|----|------------|-------------|
| FR-21 | FAQ System | Accordion with 9+ topic categories |
| FR-22 | About Page | Mission, founders, values, Why Korea |
| FR-23 | Policy Pages | Refund, ToS, Privacy with medical disclaimers |
| FR-24 | Refund Logic | Full (7+ days), 50% (<7 days), None (no-show), Free reschedule (12mo) |

---

## 8. Non-Functional Requirements

### 8.1 Performance
| ID | Requirement | Target |
|----|------------|--------|
| NFR-1 | Page Load Time | < 3 seconds on 4G |
| NFR-2 | Mobile Responsive | All pages functional on 320px-1440px viewports |
| NFR-3 | Lighthouse Score | > 80 across all categories |

### 8.2 Security & Compliance
| ID | Requirement | Description |
|----|------------|-------------|
| NFR-4 | HIPAA Compliance | No PHI stored on Shopify; medical data handled by partner hospitals only |
| NFR-5 | HTTPS | Site-wide SSL encryption (Shopify-managed) |
| NFR-6 | PCI-DSS | Payment processing via Shopify Payments (Stripe) + PayPal |
| NFR-7 | GDPR/CCPA | Cookie consent, data deletion on request, email opt-out |

### 8.3 Internationalization
| ID | Requirement | Description |
|----|------------|-------------|
| NFR-8 | Multi-language Blog | EN, KR, AR, MN, RU |
| NFR-9 | Currency | USD default; conversion support |
| NFR-10 | Timezone | Auto-detect for Calendly scheduling |

### 8.4 Accessibility
| ID | Requirement | Target |
|----|------------|--------|
| NFR-11 | WCAG AA | Color contrast 4.5:1, keyboard navigation, screen reader compatible |

---

## 9. Third-Party Integrations

| Integration | Purpose | Scope |
|------------|---------|-------|
| **Shopify** | E-commerce platform | Storefront, checkout, product management, order management |
| **PayPal** | Payment gateway | Guest credit/debit card checkout, PayPal wallet |
| **Calendly** | Appointment scheduling | Embedded widget, real-time availability, timezone support |
| **Judge.me** | Product reviews | Star ratings, verified badges, review forms, 78-86+ reviews |
| **Klaviyo** | Email & SMS marketing | Automated flows, on-site tracking, customer profiling |
| **Typeform** | Contact/inquiry forms | Embedded structured forms |
| **Google Analytics** | Web analytics | Traffic, conversion tracking, user behavior |
| **Facebook Pixel** | Ad tracking | Retargeting, conversion attribution |
| **Shop App** | Mobile shopping | Shopify native mobile app integration |

---

## 10. Social Media Presence

| Platform | Purpose |
|----------|---------|
| Instagram | Visual content, patient stories, Korea health tips |
| Facebook | Community, reviews, advertising |
| TikTok | Short-form health content, Korea medical tourism |
| YouTube | Long-form content, facility tours, patient testimonials |

---

## 11. Brand and Visual Identity

### 11.1 Typography
- **Primary:** Instrument Sans (headings, navigation)
- **Secondary:** Nunito (body text, buttons)
- **Blog/Checkup Pages:** DM Sans + Lora (alternate theme variant)

### 11.2 Theme System
- Multiple Shopify theme versions observed (t/35, t/39, t/46)
- Suggests per-page theme customization or A/B testing
- Clean, modern aesthetic with healthcare professionalism

### 11.3 Brand Tone
- Trustworthy, professional, yet approachable
- Emphasis on "no hidden fees" and "full concierge" messaging
- Korean quality + English-speaking support as key differentiator

---

## 12. KPIs and Success Metrics

| Category | Metrics |
|----------|---------|
| **Acquisition** | Monthly visitors, conversion rate, cost per acquisition (CPA) |
| **Engagement** | Time on site, pages per session, email open rate, blog read rate |
| **Revenue** | Monthly bookings, average order value (AOV), revenue by category |
| **Satisfaction** | NPS, average review rating, repeat booking rate |
| **Operations** | Booking-to-appointment time, interpreter fulfillment rate, refund rate |

---

## 13. Out of Scope (Future Consideration)

- Telemedicine / remote consultations
- Health insurance processing
- Native mobile app (currently Shop App only)
- Customer dashboard / portal
- Live chat support
- Treatment booking (screenings only)
- Loyalty / rewards program
- Multi-currency checkout

---

## 14. Glossary

| Term | Definition |
|------|-----------|
| **Concierge** | Personalized support service: interpretation, logistics, coordination at no extra fee |
| **Comprehensive Screen** | Full-body or multi-system health checkup package |
| **Focused Diagnostic** | Single-system analysis (skin, hair, vision, women's health) |
| **Medical Interpreter** | Certified real-time translator present during medical consultations |
| **Partner Hospital** | Korean medical institution with formal partnership with Himedi |
| **PHI** | Protected Health Information - handled exclusively by partner hospitals |
