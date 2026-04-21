# Technical Specification Document
## Himedi - Korean Medical Tourism Concierge Platform

**Version:** 1.0 | **Date:** 2026-04-20 | **Source:** https://himedi.com/

---

## 1. System Architecture Overview

### 1.1 Technology Stack

| Layer | Technology | Version/Details | Purpose |
|-------|-----------|----------------|---------|
| **E-Commerce Platform** | Shopify | SaaS | Core storefront, checkout, product management |
| **Frontend Framework** | Shopify Liquid | Theme engine | Server-side rendered templates |
| **Theme** | Custom Shopify Theme | Multiple variants: t/35, t/39, t/46 | Per-page customization or A/B testing |
| **Typography (Main)** | Instrument Sans + Nunito | Google Fonts | Headings, navigation, body text |
| **Typography (Blog/Checkup)** | DM Sans + Lora | Google Fonts | Alternate theme typography |
| **Scheduling** | Calendly | Embedded widget | Appointment date/time selection |
| **Email Marketing** | Klaviyo | SaaS integration | Automated email flows, SMS notifications |
| **Product Reviews** | Judge.me | Shopify App | Customer review collection and display |
| **Forms** | Typeform | Embedded form | Structured inquiry and contact forms |
| **Payment** | Shopify Payments (Stripe) + PayPal | Gateway | Credit/debit cards, Apple Pay, Google Pay, PayPal wallet |
| **Analytics** | Google Analytics | gtag.js | Traffic and conversion tracking |
| **Ad Tracking** | Facebook Pixel | Meta Pixel | Retargeting, conversion attribution |
| **Mobile** | Shop App | Shopify native | Mobile shopping experience |
| **Appointment Apps** | Multiple Shopify apps | digital-appointments, easy-appointment-booking, servicify-appointments | Booking widget variants |
| **Hosting** | Shopify CDN | Cloudflare-backed | Global content delivery |
| **SSL** | Shopify-managed | Auto-renewed | HTTPS encryption |

### 1.2 Architecture Diagram

```
[User Browser]
    |
    v
[Shopify Storefront (Liquid Theme)]
    |
    +-- [Product Catalog] -- Shopify Products/Collections
    +-- [Checkout] -- Shopify Payments + PayPal
    +-- [Calendly Widget] -- Embedded iframe
    +-- [Judge.me Widget] -- Review rendering
    +-- [Typeform Embed] -- Contact forms
    +-- [Klaviyo Tracking] -- Email/SMS automation
    +-- [Google Analytics] -- Traffic tracking
    +-- [Facebook Pixel] -- Ad conversion tracking
    +-- [Shop App] -- Mobile commerce
    |
    v
[Shopify Backend]
    |
    +-- [Order Management]
    +-- [Customer Data]
    +-- [Product Data]
    +-- [Theme Files (t/35, t/39, t/46)]
```

---

## 2. Page Structure and Routing

### 2.1 URL Structure

| Page | URL Pattern | Template | Theme |
|------|------------|----------|-------|
| Homepage | `/` | `index.liquid` | t/35 |
| Product Listing | `/collections/all` | `collection.liquid` | t/35 |
| Product Detail | `/products/{handle}` | `product.liquid` | varies |
| About | `/pages/about` | `page.liquid` | t/35 |
| FAQ | `/pages/faq` | `page.liquid` | t/35 |
| Contact | `/pages/contact` | `page.liquid` | t/35 |
| Blog (EN) | `/blogs/news` | `blog.liquid` | t/39 |
| Blog (KR) | `/blogs/kr` | `blog.liquid` | t/39 |
| Blog (AR) | `/blogs/ar` | `blog.liquid` | t/39 |
| Blog (MN) | `/blogs/mn` | `blog.liquid` | t/39 |
| Blog (RU) | `/blogs/ru` | `blog.liquid` | t/39 |
| Checkup Page | `/products/*-checkup` | `product.liquid` | t/46 |
| Refund Policy | `/policies/refund-policy` | Shopify default | - |
| Terms of Service | `/policies/terms-of-service` | Shopify default | - |
| Privacy Policy | `/policies/privacy-policy` | Shopify default | - |
| Cart | `/cart` | `cart.liquid` | t/35 |
| Checkout | `/checkout` | Shopify checkout | - |

### 2.2 Navigation Structure

```
Header:
  [Logo] [Home] [Shop All] [About] [FAQ] [Contact] [Cart Icon]

Mobile Header:
  [Hamburger] [Logo] [Cart Icon]
  --> Slide-out drawer with nav links

Footer:
  Column 1: Brand logo + tagline + description
  Column 2: Quick Links (Home, About, FAQ, Contact)
  Column 3: Services (product links)
  Column 4: Legal (Refund Policy, Terms, Privacy)
  Bottom Bar: Social icons + Copyright
```

---

## 3. UI Component Specifications

### 3.1 Homepage Components

#### 3.1.1 Hero Section
- **Layout:** Full-width banner with overlay text
- **Elements:**
  - Headline (H1): Value proposition text
  - Subheadline: Supporting text about no concierge fees
  - CTA Button: Primary action (Explore Packages / Book Now)
  - Background: High-quality lifestyle/medical imagery
- **Responsive Behavior:**
  - Desktop: Full-width, text overlaid left or center
  - Mobile: Stacked layout, image as background with text overlay

#### 3.1.2 Value Propositions Section
- **Layout:** 3-column grid (desktop), stacked (mobile)
- **Elements:**
  - Icon/graphic per value
  - Title: "Your Time", "Your Support", "Your Peace of Mind"
  - Description paragraph (2-3 sentences each)

#### 3.1.3 The Himedi Experience Section
- **Layout:** Full-width section with guarantee messaging
- **Elements:**
  - Section title
  - Guarantee description
  - Trust indicators (partner hospital logos, certification)

#### 3.1.4 4-Step Booking Flow
- **Layout:** Horizontal stepper (desktop), vertical (mobile)
- **Steps:**
  1. Browse and Select - icon + label + description
  2. Customize Itinerary - icon + label + description
  3. Confirm and Prepare - icon + label + description
  4. Complete Checkup - icon + label + description
- **Visual:** Numbered circles with connecting lines/arrows

#### 3.1.5 Testimonials Section
- **Layout:** Carousel or grid (3 visible at once on desktop)
- **Elements:**
  - Customer quote text
  - Customer name and nationality
  - Service type used
  - Star rating (optional)

#### 3.1.6 FAQ Accordion
- **Layout:** Full-width accordion list
- **Elements:**
  - Question text (clickable header)
  - Answer text (expandable body)
  - Expand/collapse icon (+/-)
- **Behavior:** Single-open or multi-open accordion
- **Animation:** Smooth slide transition

#### 3.1.7 Founder Story Section
- **Layout:** Split layout (image + text)
- **Elements:**
  - Founder photos (Donkyo Seo, William Ban)
  - Founder names and titles (CEO, COO)
  - Brief story/narrative text
  - Optional link to About page

#### 3.1.8 Media Credibility Badges
- **Layout:** Horizontal row of logos
- **Elements:**
  - "As Featured In" label
  - BoF (Business of Fashion) logo
  - Oprah Daily logo

#### 3.1.9 Judge.me Reviews Badge
- **Display:** Floating or inline badge
- **Content:** "78+ Reviews" with average star rating
- **Link:** Clicks through to product reviews

#### 3.1.10 Footer
- **Layout:** Multi-column (4 columns)
- **Columns:**
  - Brand logo + tagline + description
  - Quick Links (Home, About, FAQ, Contact)
  - Services (product category links)
  - Legal (Refund Policy, Terms, Privacy)
- **Bottom Bar:** Social media icons + copyright notice
- **Social:** Instagram, Facebook, TikTok, YouTube

### 3.2 Collection Page Components

#### 3.2.1 Collection Header
- **Elements:** Collection title, description, product count

#### 3.2.2 Product Grid
- **Layout:** 2-3 columns (desktop), 1-2 (mobile)
- **Card Elements:**
  - Product image (thumbnail)
  - Product name
  - Price (with $ symbol)
  - Star rating (from Judge.me)
  - Quick "View Details" or "Add to Cart" button
- **Category Grouping:**
  - Section header: "Comprehensive Screens"
  - Product cards for this category (6 items)
  - Section header: "Focused Diagnostics"
  - Product cards for this category (4 items)

### 3.3 Product Detail Page Components

#### 3.3.1 Product Hero
- **Layout:** Two-column (image left, info right)
- **Elements:**
  - Product images (gallery or single hero)
  - Product title (H1)
  - Price with currency ($ USD)
  - Brief description
  - "Add to Cart" / "Book Now" button
  - Calendly scheduling widget (inline embed)

#### 3.3.2 Product Description
- **Layout:** Full-width rich text section
- **Elements:**
  - Detailed service description
  - What is included list (bullet points)
  - Preparation instructions
  - Partner hospital/clinic information
  - Duration estimate

#### 3.3.3 Reviews Section
- **Widget:** Judge.me embedded reviews
- **Elements:**
  - Average star rating + count
  - Individual review cards (rating, title, body, author, date)
  - "Write a Review" button
  - Pagination or "Load More"
- **Review Count:** 86+ on checkup pages, 78+ homepage aggregate

### 3.4 About Page Components

#### 3.4.1 Mission Statement
- **Layout:** Full-width hero-style section
- **Elements:** Mission headline, supporting paragraph

#### 3.4.2 Why Korea Section
- **Layout:** Content with supporting imagery
- **Elements:** Korean healthcare quality statistics, advantages

#### 3.4.3 Values Section
- **Layout:** Grid of value cards
- **Elements:** 3-4 value cards with icon, title, description

#### 3.4.4 Partner Hospitals Display
- **Layout:** Logo grid or card grid
- **Elements:** Partner hospital logo, name, specialty description

### 3.5 FAQ Page Components

#### 3.5.1 FAQ Categories
- **Layout:** Accordion with category headers
- **Categories:**
  - Booking Process
  - Language Support
  - Pricing and Payment
  - Refund and Cancellation
  - Exam Preparation
  - Colonoscopy
  - Post-Checkup Follow-Up
  - Travel and Accommodation
  - Treatment Options

### 3.6 Blog Components

#### 3.6.1 Blog Listing
- **Layout:** Article cards in grid
- **Elements:** Thumbnail, title, excerpt, date, language tag
- **Multi-language:** Separate blogs per language (EN, KR, AR, MN, RU)

#### 3.6.2 Blog Article
- **Layout:** Full-width article with sidebar
- **Elements:** Title, author, date, featured image, body content, related articles

### 3.7 Policy Pages
- **Layout:** Standard text page with Shopify default template
- **Styling:** Clean typography, proper headings hierarchy

---

## 4. Third-Party Integration Specifications

### 4.1 Shopify Platform

#### Product Management
- **Products as Shopify Products:** Each medical service is a Shopify product
- **Collections:** Two collections - "Comprehensive Screens" and "Focused Diagnostics"
- **Pricing:** Fixed price per product, displayed in USD
- **Inventory:** Not applicable (services, not physical goods)
- **Variants:** May include duration/tier options per service

#### Checkout Flow
- **Payment Gateway:** Shopify Payments (Stripe-powered) + PayPal
- **Supported Methods:** Credit/debit cards, Apple Pay, Google Pay, PayPal wallet
- **Guest Checkout:** Available via PayPal guest credit/debit card
- **Currency:** USD default
- **Order Confirmation:** Automated via Shopify + Klaviyo

### 4.2 Calendly Integration

#### Configuration
- **Embed Method:** Inline embed or popup widget
- **Event Types:** One event type per service/product
- **Availability:** Linked to partner hospital schedules
- **Timezone:** Auto-detect user timezone
- **Buffer Time:** Configurable between appointments

#### Data Flow
```
User selects product > Clicks Book/Schedule
> Calendly widget opens
> User selects date/time
> Calendly sends confirmation email
> Webhook notifies Himedi backend (if configured)
> Klaviyo triggers booking confirmation flow
```

### 4.3 Klaviyo Integration

#### Email Flows

| Flow Name | Trigger | Content |
|-----------|---------|----------|
| **Welcome Series** | New subscriber/account | Brand intro, value prop, service overview |
| **Booking Confirmation** | Order created | Booking details, preparation instructions |
| **Pre-Visit Reminder** | X days before appointment | Final prep, what to bring, location details |
| **Post-Visit Follow-up** | X days after appointment | Results delivery, review request, next steps |
| **Abandoned Cart** | Cart abandoned 1hr+ | Reminder, incentive (if applicable) |
| **Newsletter** | Scheduled (monthly) | Health tips, new services, promotions |

#### SMS Notifications
- Booking confirmation
- Appointment reminders (24hr, 2hr before)
- Emergency contact information

#### Tracking
- Klaviyo JavaScript snippet for onsite tracking
- Identify API for user profiling
- Event tracking: viewed product, started checkout, completed purchase

### 4.4 Judge.me Integration

#### Widget Configuration
- **Review Display:** Star ratings on product cards and detail pages
- **Review Form:** Post-purchase review request via email
- **Photo Reviews:** Supported (if enabled)
- **Verified Badges:** Automatic for confirmed purchases
- **Sorting:** By date, rating, helpfulness

#### Data Points
- Total reviews: 78+ (homepage badge), 86+ (checkup product pages)
- Average rating: ~5.0 (observed from site)
- Review distribution across products

### 4.5 Typeform Integration

#### Form Configuration
- **Embed Method:** Embedded on contact page or modal popup
- **Fields:**
  - Full Name (text)
  - Email (email)
  - Phone Number (phone)
  - Nationality/Country (dropdown)
  - Service Interest (multiple choice)
  - Preferred Date Range (date picker)
  - Additional Notes (textarea)
- **Submission:**
  - Data sent to Typeform
  - Notification email to Himedi team
  - Auto-response to user (optional)

### 4.6 Google Analytics

#### Configuration
- **Tracking Method:** gtag.js (Google Tag Manager or direct)
- **Enhanced Ecommerce:** Enabled for product/checkout tracking
- **Events:** page_view, view_item, add_to_cart, begin_checkout, purchase

### 4.7 Facebook Pixel

#### Configuration
- **Pixel ID:** Embedded in theme <head>
- **Standard Events:** PageView, ViewContent, AddToCart, InitiateCheckout, Purchase
- **Custom Conversions:** Booking completed, Inquiry submitted

### 4.8 Appointment Booking Apps
Multiple Shopify appointment booking app paths observed:
- `/apps/digital-appointments/` - Digital appointments variant
- `/apps/easy-appointment-booking/` - Easy appointment booking variant
- `/apps/servicify-appointments/` - Servicify appointments variant
- May indicate A/B testing across booking app providers

---

## 5. Data Models

### 5.1 Product Model (Shopify)
```json
{
  "id": "string",
  "title": "string",
  "handle": "string",
  "description": "string (HTML)",
  "price": "number",
  "currency": "USD",
  "compare_at_price": "number | null",
  "category": "comprehensive | focused",
  "duration_estimate": "string",
  "partner_hospital": "string",
  "preparation_instructions": "string (HTML)",
  "includes": ["string"],
  "images": ["url"],
  "calendly_event_type": "string (url)",
  "reviews_count": "number",
  "average_rating": "number"
}
```

### 5.2 Booking/Order Model (Shopify)
```json
{
  "id": "string",
  "order_number": "string",
  "customer": {
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "string"
  },
  "line_items": [{
    "product_id": "string",
    "product_title": "string",
    "price": "number",
    "quantity": 1
  }],
  "total_price": "number",
  "currency": "USD",
  "appointment_date": "date | null",
  "appointment_time": "string | null",
  "status": "pending | confirmed | completed | cancelled",
  "interpreter_language": "string",
  "created_at": "datetime",
  "refund_status": "none | partial | full"
}
```

### 5.3 Review Model (Judge.me)
```json
{
  "id": "string",
  "product_id": "string",
  "rating": "number (1-5)",
  "title": "string",
  "body": "string",
  "reviewer": {
    "name": "string",
    "email": "string",
    "verified": "boolean"
  },
  "created_at": "datetime",
  "curated": "boolean"
}
```

### 5.4 Customer Model (Shopify + Klaviyo)
```json
{
  "id": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "phone": "string",
  "nationality": "string",
  "language_preference": "string",
  "orders_count": "number",
  "total_spent": "number",
  "klaviyo_profile_id": "string",
  "tags": ["string"],
  "notes": "string"
}
```

---

## 6. Responsive Design Specifications

### 6.1 Breakpoints

| Breakpoint | Width | Target |
|-----------|-------|--------|
| **Mobile** | < 768px | Phones |
| **Tablet** | 768px - 1024px | Tablets, small laptops |
| **Desktop** | > 1024px | Laptops, desktops |

### 6.2 Layout Adaptations

#### Navigation
- **Desktop:** Horizontal top nav bar with logo left, links center/right
- **Mobile:** Hamburger menu with slide-out drawer

#### Product Grid
- **Desktop:** 3 columns
- **Tablet:** 2 columns
- **Mobile:** 1-2 columns

#### Hero Section
- **Desktop:** Full-width with side text overlay
- **Mobile:** Stacked with text below image

#### Booking Flow Stepper
- **Desktop:** Horizontal stepper with connecting lines
- **Mobile:** Vertical stepper with numbered steps

#### Footer
- **Desktop:** 4-column layout
- **Mobile:** Stacked single column

---

## 7. Performance Specifications

### 7.1 Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **INP** | < 200ms | Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |

### 7.2 Loading Strategy
- Lazy load images below the fold
- Defer non-critical JavaScript (Calendly, Typeform widgets)
- Optimize hero images with WebP/AVIF formats
- Preconnect to third-party domains (Calendly, Klaviyo, Judge.me)

### 7.3 Third-Party Script Loading Order
1. Shopify core (blocking)
2. Klaviyo tracking (async, high priority)
3. Google Analytics gtag.js (async)
4. Facebook Pixel (async)
5. Judge.me widget (async)
6. Calendly embed (lazy, on interaction)
7. Typeform (lazy, on scroll to section)

---

## 8. SEO and Metadata Specifications

### 8.1 Page-Level SEO
- Each page has unique `<title>` and `<meta description>`
- Open Graph tags for social sharing
- Structured data (JSON-LD) for:
  - Organization
  - Product (with offers, reviews)
  - FAQ (FAQPage schema)
  - BreadcrumbList

### 8.2 URL Structure
- Clean, descriptive URLs
- Product handles use kebab-case
- Canonical URLs set per page
- Multi-language blog under `/blogs/{language-code}`

---

## 9. Security Specifications

### 9.1 Data Protection
- All customer data transmitted over HTTPS (Shopify-managed SSL)
- Payment data handled entirely by Shopify (no PCI scope for merchant)
- HIPAA considerations for patient health data:
  - No medical records stored on Shopify
  - Medical results delivered via secure channel (not email)
  - PHI handled only by partner hospitals

### 9.2 Privacy Compliance
- Cookie consent banner (GDPR/CCPA)
- Privacy Policy accessible from footer
- Customer data deletion upon request
- Email opt-out via Klaviyo
- Facebook Pixel and Google Analytics with consent mode

---

## 10. Analytics and Tracking

### 10.1 Event Tracking Points

| Event | Location | Data |
|-------|----------|------|
| `page_view` | All pages | URL, referrer, UTM params |
| `view_item` | Product detail | Product ID, name, price, category |
| `add_to_cart` | Product detail / collection | Product ID, quantity, price |
| `begin_checkout` | Cart page | Cart contents, total |
| `purchase` | Checkout complete | Order ID, total, items |
| `schedule_appointment` | Calendly confirmation | Product, date, time |
| `submit_inquiry` | Typeform submit | Form data |

### 10.2 Conversion Funnel
```
Homepage Visit > Product View > Add to Cart > Begin Checkout > Purchase > Schedule Appointment
```

Each step tracked with drop-off rates for optimization.

---

## 11. Deployment and Infrastructure

### 11.1 Hosting
- **Platform:** Shopify-hosted (SaaS)
- **CDN:** Shopify CDN (Cloudflare-backed)
- **Domain:** Custom domain (himedi.com)
- **SSL:** Shopify-managed certificate (auto-renewed)

### 11.2 Theme Management
- **Theme:** Custom Shopify theme with multiple variants (t/35, t/39, t/46)
- **Version Control:** Theme files managed via Shopify CLI or GitHub integration
- **Deployment:** Via Shopify admin or CLI push
- **Theme Editor:** Shopify theme editor for content updates

### 11.3 App Dependencies

| App | Purpose | Integration Point |
|-----|---------|-------------------|
| **Calendly** | Scheduling | Product pages, post-checkout |
| **Judge.me** | Reviews | Product cards, product detail pages |
| **Klaviyo** | Email/SMS | Sitewide tracking, checkout, post-purchase |
| **Typeform** | Contact forms | Contact page, footer link |
| **Google Analytics** | Analytics | Sitewide (via theme <head>) |
| **Facebook Pixel** | Ad tracking | Sitewide (via theme <head>) |
| **Shop App** | Mobile commerce | Shopify-managed |
| **Appointment Booking Apps** | Booking variants | Multiple app paths for A/B testing |

---

## 12. Testing Requirements

### 12.1 Browser Compatibility
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest)
- Android Chrome (latest)

### 12.2 Performance Testing
- Lighthouse audit score > 80 (all categories)
- Core Web Vitals within targets
- Load testing for high-traffic periods

### 12.3 Integration Testing
- Calendly booking flow end-to-end
- PayPal guest checkout flow
- Klaviyo email trigger verification
- Judge.me review submission and display
- Typeform submission and notification
- Shopify checkout with various payment methods

### 12.4 Accessibility Testing
- Automated: axe-core scan (zero critical violations)
- Manual: Keyboard navigation, screen reader testing
- Color contrast ratios meet WCAG AA (4.5:1 for text)

---

## Appendix A: Product Catalog Reference

| Product | Category | Price (USD) | Description |
|---------|----------|------------|-------------|
| Whole Body MRI | Comprehensive | $1,800 | Full-body MRI imaging scan |
| MRI + Health Checkup | Comprehensive | $2,000 | MRI + blood work and panels |
| Baseline Health Checkup | Comprehensive | $299 | Entry-level screening |
| Expanded Health Checkup | Comprehensive | $890 | Mid-tier with imaging |
| Intensive Health Checkup | Comprehensive | $1,630 | Advanced full screening |
| Comprehensive Health Checkup | Comprehensive | $2,815 | Premium all-inclusive |
| Skin Analysis & Consultation | Focused | $77 | Dermatological analysis |
| Hair Analysis & Consultation | Focused | $77 | Hair/scalp analysis |
| Vision Eye Exam | Focused | $150 | Eye examination |
| Women's Health Screening | Focused | $577 | Women's health screening |

## Appendix B: Partner Institutions

| Partner | Specialty | Notable |
|---------|----------|--------|
| Samsung Medical Center | Multi-specialty | Top-tier Korean hospital |
| Seoul National University Hospital (SNUH) | Multi-specialty | Leading research hospital |
| KMI Gangnam | Preventive medicine | Specialized health screening center |

## Appendix C: Refund Policy Logic

```
IF cancellation >= 7 days before appointment:
    refund = full_refund(order_total)
ELIF cancellation < 7 days AND > 0 days before appointment:
    refund = partial_refund(order_total * 0.50)
ELSE (no-show):
    refund = 0

IF date_change_request:
    IF within_12_months_of_purchase:
        reschedule_free()
    ELSE:
        require_new_purchase()
```

## Appendix D: Theme Variants

| Theme ID | Observed On | Typography | Notes |
|----------|------------|------------|-------|
| t/35 | Homepage, About, FAQ, Contact | Instrument Sans + Nunito | Main theme |
| t/39 | Blog pages (all languages) | DM Sans + Lora | Blog-specific theme |
| t/46 | Checkup product pages | DM Sans + Lora | Product detail variant |

## Appendix E: Multi-Language Blog Structure

| Language | URL Path | Blog Handle |
|----------|---------|-------------|
| English | `/blogs/news` | news |
| Korean | `/blogs/kr` | kr |
| Arabic | `/blogs/ar` | ar |
| Mongolian | `/blogs/mn` | mn |
| Russian | `/blogs/ru` | ru |
