import { Product, Review } from "@/types";

export const products: Product[] = [
  {
    id: "prod-001",
    title: "Whole Body MRI",
    handle: "whole-body-mri",
    description:
      "A comprehensive MRI-based full-body imaging scan that screens for abnormalities across all major organ systems. Using state-of-the-art 3T MRI technology, this scan provides detailed cross-sectional images of your brain, neck, chest, abdomen, pelvis, and spine. Ideal for health-conscious individuals seeking a thorough baseline assessment.",
    price: 1800,
    compareAtPrice: null,
    category: "comprehensive",
    durationEstimate: "Half-day (3-4 hours)",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "No metallic objects or implants. Remove all jewelry before the scan. Wear comfortable, loose-fitting clothing. No special dietary restrictions required.",
    includes: [
      "Brain MRI",
      "Neck MRI",
      "Chest MRI",
      "Abdominal MRI",
      "Pelvic MRI",
      "Spine MRI (cervical, thoracic, lumbar)",
      "Detailed radiology report",
      "English interpretation support",
    ],
    images: ["/images/products/whole-body-mri.jpg"],
    calendlyEventType: null,
    reviewsCount: 12,
    averageRating: 4.9,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "prod-002",
    title: "MRI + Health Checkup",
    handle: "mri-health-checkup",
    description:
      "Combine the power of whole-body MRI imaging with comprehensive blood work and standard health panels. This package merges advanced imaging technology with traditional laboratory diagnostics for a complete health assessment. Perfect for those who want both structural and functional health insights.",
    price: 2000,
    compareAtPrice: null,
    category: "comprehensive",
    durationEstimate: "Full-day (6-8 hours)",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "Fasting required for 10-12 hours before blood draw. No metallic implants. Remove all jewelry. Bring previous medical records if available.",
    includes: [
      "Whole Body MRI scan",
      "Complete blood count (CBC)",
      "Comprehensive metabolic panel",
      "Lipid panel",
      "Thyroid function test",
      "Liver function test",
      "Kidney function test",
      "Blood glucose & HbA1c",
      "Urinalysis",
      "English interpretation support",
    ],
    images: ["/images/products/mri-health-checkup.jpg"],
    calendlyEventType: null,
    reviewsCount: 15,
    averageRating: 5.0,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "prod-003",
    title: "Baseline Health Checkup",
    handle: "baseline-health-checkup",
    description:
      "An entry-level health screening package covering essential blood tests, basic vitals, and standard assessments. Perfect for young professionals or those new to preventive health screening. Get a clear snapshot of your current health status with key biomarkers.",
    price: 299,
    compareAtPrice: null,
    category: "comprehensive",
    durationEstimate: "Half-day (2-3 hours)",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Fasting required for 8-10 hours before blood draw. Take medications as usual unless instructed otherwise. Wear comfortable clothing.",
    includes: [
      "Complete blood count (CBC)",
      "Basic metabolic panel",
      "Lipid profile",
      "Blood glucose",
      "Blood pressure & vitals",
      "BMI measurement",
      "Basic vision test",
      "Urinalysis",
      "Physician consultation",
      "English interpretation support",
    ],
    images: ["/images/products/baseline-checkup.jpg"],
    calendlyEventType: null,
    reviewsCount: 18,
    averageRating: 4.8,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "prod-004",
    title: "Expanded Health Checkup",
    handle: "expanded-health-checkup",
    description:
      "A mid-tier screening package that builds upon the baseline with advanced imaging including ultrasound and X-ray, plus endoscopy options. Designed for individuals seeking deeper health insights beyond basic blood work. Recommended for adults 30+.",
    price: 890,
    compareAtPrice: null,
    category: "comprehensive",
    durationEstimate: "Full-day (6-8 hours)",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Fasting required for 10-12 hours. No food or water after midnight. Inform staff of any medications. Avoid alcohol 48 hours prior.",
    includes: [
      "All Baseline Checkup tests",
      "Abdominal ultrasound",
      "Chest X-ray",
      "Thyroid ultrasound",
      "Hepatitis B & C screening",
      "Tumor markers (AFP, CEA)",
      "Gastroscopy (optional)",
      "Colonoscopy consultation",
      "ECG (electrocardiogram)",
      "Bone density screening",
      "English interpretation support",
    ],
    images: ["/images/products/expanded-checkup.jpg"],
    calendlyEventType: null,
    reviewsCount: 14,
    averageRating: 4.9,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "prod-005",
    title: "Intensive Health Checkup",
    handle: "intensive-health-checkup",
    description:
      "An advanced full-body screening with a comprehensive imaging suite, optional PET/CT, and cardiac screening. This package is designed for thorough preventive care with specialist-level diagnostics. Ideal for those with family history of serious conditions or age 40+.",
    price: 1630,
    compareAtPrice: null,
    category: "comprehensive",
    durationEstimate: "Full-day to multi-day (1-2 days)",
    partnerHospital: "Seoul National University Hospital",
    preparationInstructions:
      "Fasting required for 12 hours. Avoid caffeine 24 hours prior. Inform staff of all medications and supplements. Previous imaging records helpful.",
    includes: [
      "All Expanded Checkup tests",
      "PET/CT scan (optional add-on)",
      "Cardiac CT calcium scoring",
      "Carotid artery ultrasound",
      "Brain MRI or CT",
      "Pulmonary function test",
      "Advanced cardiac screening",
      "Prostate/ovarian screening",
      "Vitamin D & B12 levels",
      "Full endocrinology panel",
      "Specialist consultations",
      "English interpretation support",
    ],
    images: ["/images/products/intensive-checkup.jpg"],
    calendlyEventType: null,
    reviewsCount: 10,
    averageRating: 5.0,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "prod-006",
    title: "Comprehensive Health Checkup",
    handle: "comprehensive-health-checkup",
    description:
      "The premium all-inclusive health screening package with specialist consultations across every major discipline. This is our most thorough offering, combining every available diagnostic tool with personalized specialist reviews. Recommended for executives and those wanting the most complete health picture possible.",
    price: 2815,
    compareAtPrice: null,
    category: "comprehensive",
    durationEstimate: "Multi-day (2-3 days)",
    partnerHospital: "Seoul National University Hospital",
    preparationInstructions:
      "Fasting required for 12 hours before Day 1. Detailed preparation instructions provided upon booking. Personal health questionnaire to complete in advance.",
    includes: [
      "All Intensive Checkup tests",
      "Whole Body MRI",
      "PET/CT scan included",
      "Full cardiac workup (echo, stress test)",
      "Gastroscopy & colonoscopy",
      "Dermatology consultation",
      "Ophthalmology consultation",
      "ENT examination",
      "Orthopedic assessment",
      "Nutritional counseling",
      "Personalized health report",
      "Post-checkup follow-up call",
      "English interpretation support",
    ],
    images: ["/images/products/comprehensive-checkup.jpg"],
    calendlyEventType: null,
    reviewsCount: 11,
    averageRating: 5.0,
    isActive: true,
    sortOrder: 6,
  },
  {
    id: "prod-007",
    title: "Skin Analysis & Consultation",
    handle: "skin-analysis-consultation",
    description:
      "A professional dermatological skin analysis using advanced imaging technology to assess skin health, detect early signs of conditions, and receive personalized treatment recommendations. Includes consultation with a board-certified dermatologist.",
    price: 77,
    compareAtPrice: null,
    category: "focused",
    durationEstimate: "1-2 hours",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "Avoid wearing makeup on the day of the appointment. Do not apply skincare products 2 hours before. Bring a list of current skincare products used.",
    includes: [
      "Digital skin analysis (VISIA or equivalent)",
      "Dermatologist consultation",
      "Skin type assessment",
      "Sun damage evaluation",
      "Personalized skincare recommendations",
      "English interpretation support",
    ],
    images: ["/images/products/skin-analysis.jpg"],
    calendlyEventType: null,
    reviewsCount: 8,
    averageRating: 4.7,
    isActive: true,
    sortOrder: 7,
  },
  {
    id: "prod-008",
    title: "Hair Analysis & Consultation",
    handle: "hair-analysis-consultation",
    description:
      "A comprehensive hair and scalp health analysis using microscopic imaging technology. Identify hair loss causes, scalp conditions, and receive evidence-based treatment recommendations from a specialist.",
    price: 77,
    compareAtPrice: null,
    category: "focused",
    durationEstimate: "1-2 hours",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "Do not wash hair on the day of the appointment. Avoid hair styling products. Bring list of any hair treatments or medications.",
    includes: [
      "Microscopic scalp analysis",
      "Hair density measurement",
      "Scalp health assessment",
      "Hair quality evaluation",
      "Treatment recommendations",
      "English interpretation support",
    ],
    images: ["/images/products/hair-analysis.jpg"],
    calendlyEventType: null,
    reviewsCount: 6,
    averageRating: 4.6,
    isActive: true,
    sortOrder: 8,
  },
  {
    id: "prod-009",
    title: "Vision Eye Exam",
    handle: "vision-eye-exam",
    description:
      "A comprehensive ophthalmological examination using the latest diagnostic equipment. Covers visual acuity, intraocular pressure, retinal imaging, and screening for common eye conditions including glaucoma, cataracts, and macular degeneration.",
    price: 150,
    compareAtPrice: null,
    category: "focused",
    durationEstimate: "2-3 hours",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Bring current prescription glasses or contacts. Pupil dilation may be performed; driving is not recommended afterward. Remove contact lenses 24 hours prior if possible.",
    includes: [
      "Visual acuity test",
      "Refraction assessment",
      "Intraocular pressure measurement",
      "Retinal imaging (OCT)",
      "Slit-lamp examination",
      "Color vision test",
      "Visual field test",
      "Ophthalmologist consultation",
      "English interpretation support",
    ],
    images: ["/images/products/vision-exam.jpg"],
    calendlyEventType: null,
    reviewsCount: 9,
    averageRating: 4.8,
    isActive: true,
    sortOrder: 9,
  },
  {
    id: "prod-010",
    title: "Women's Health Screening",
    handle: "womens-health-screening",
    description:
      "A specialized women-focused screening covering gynecological and hormonal health. Includes breast imaging, pelvic ultrasound, hormonal panels, and consultation with women's health specialists. Designed for comprehensive female health assessment.",
    price: 577,
    compareAtPrice: null,
    category: "focused",
    durationEstimate: "Half-day (3-4 hours)",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Schedule during specific menstrual cycle days if possible (instructions provided upon booking). Fasting may be required for blood work. Bring previous screening results.",
    includes: [
      "Breast ultrasound or mammogram",
      "Pelvic ultrasound",
      "Pap smear / cervical screening",
      "Hormonal panel (estrogen, progesterone, FSH, LH)",
      "Thyroid function test",
      "Bone density assessment",
      "CA-125 tumor marker",
      "Vitamin D & iron levels",
      "Gynecologist consultation",
      "English interpretation support",
    ],
    images: ["/images/products/womens-health.jpg"],
    calendlyEventType: null,
    reviewsCount: 7,
    averageRating: 4.9,
    isActive: true,
    sortOrder: 10,
  },
];

export const comprehensiveProducts = products.filter(
  (p) => p.category === "comprehensive"
);
export const focusedProducts = products.filter((p) => p.category === "focused");

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export const mockReviews: Review[] = [
  {
    id: "rev-001",
    productId: "prod-001",
    rating: 5,
    title: "Incredible peace of mind",
    body: "The whole body MRI was thorough and the staff was incredibly professional. Having an English interpreter made everything so much easier. I got my results translated within a week. Highly recommend Himedi!",
    author: "Sarah M.",
    verified: true,
    createdAt: "2025-12-15",
  },
  {
    id: "rev-002",
    productId: "prod-002",
    rating: 5,
    title: "Best health investment I've made",
    body: "Combining MRI with blood work gave me a complete picture of my health. The facility was world-class and the concierge service was exceptional. No hidden fees, exactly as promised.",
    author: "James T.",
    verified: true,
    createdAt: "2026-01-08",
  },
  {
    id: "rev-003",
    productId: "prod-003",
    rating: 5,
    title: "Perfect starting point",
    body: "As someone who had never done a health checkup before, this was the perfect entry point. Quick, efficient, and the results were easy to understand. The English support was invaluable.",
    author: "Emily R.",
    verified: true,
    createdAt: "2026-02-20",
  },
  {
    id: "rev-004",
    productId: "prod-004",
    rating: 4,
    title: "Very comprehensive screening",
    body: "The expanded checkup covered so much more than I expected. The ultrasound and imaging results were detailed. Only wish the wait time was a bit shorter, but overall excellent experience.",
    author: "Michael K.",
    verified: true,
    createdAt: "2026-01-30",
  },
  {
    id: "rev-005",
    productId: "prod-005",
    rating: 5,
    title: "Worth every penny",
    body: "The intensive checkup found an early-stage issue that I would never have known about. The Korean healthcare system is truly world-class, and Himedi made accessing it completely stress-free.",
    author: "Robert L.",
    verified: true,
    createdAt: "2026-03-05",
  },
  {
    id: "rev-006",
    productId: "prod-006",
    rating: 5,
    title: "The ultimate health checkup",
    body: "I traveled from the US specifically for this package and it exceeded all expectations. Two days of thorough testing with specialist consultations. The personalized report was incredibly detailed.",
    author: "David W.",
    verified: true,
    createdAt: "2026-02-14",
  },
  {
    id: "rev-007",
    productId: "prod-007",
    rating: 5,
    title: "Eye-opening skin analysis",
    body: "The digital skin analysis showed sun damage I couldn't see with the naked eye. The dermatologist gave me a tailored skincare routine. Quick, affordable, and very professional.",
    author: "Lisa P.",
    verified: true,
    createdAt: "2025-11-22",
  },
  {
    id: "rev-008",
    productId: "prod-008",
    rating: 4,
    title: "Very informative",
    body: "Learned so much about my hair and scalp health. The microscopic analysis was fascinating and the recommendations were practical. Would recommend to anyone experiencing hair concerns.",
    author: "Anna S.",
    verified: true,
    createdAt: "2026-01-18",
  },
  {
    id: "rev-009",
    productId: "prod-009",
    rating: 5,
    title: "Thorough eye examination",
    body: "More comprehensive than any eye exam I've had in my home country. The retinal imaging technology was impressive. Great value for the level of care received.",
    author: "Thomas H.",
    verified: true,
    createdAt: "2026-03-12",
  },
  {
    id: "rev-010",
    productId: "prod-010",
    rating: 5,
    title: "Essential screening for women",
    body: "Finally, a women's health screening that actually covers everything. The gynecologist was thorough and empathetic. The hormonal panel gave me insights I'd been seeking for years. Thank you, Himedi!",
    author: "Maria G.",
    verified: true,
    createdAt: "2026-02-28",
  },
];

export const testimonials = [
  {
    quote:
      "Himedi made my medical trip to Korea absolutely seamless. From airport pickup to the hospital visit, everything was taken care of. The health screening was world-class.",
    name: "Sarah Mitchell",
    nationality: "United States",
    service: "Comprehensive Health Checkup",
    rating: 5,
  },
  {
    quote:
      "I was nervous about navigating a Korean hospital, but the English interpreter and concierge support made me feel completely at ease. The results were thorough and delivered quickly.",
    name: "James Thompson",
    nationality: "United Kingdom",
    service: "Intensive Health Checkup",
    rating: 5,
  },
  {
    quote:
      "The value is incredible. The same screening would have cost 3-4x more in Australia. Plus the level of care and technology at SNUH was outstanding.",
    name: "Emily Chen",
    nationality: "Australia",
    service: "MRI + Health Checkup",
    rating: 5,
  },
  {
    quote:
      "As an expat living in Seoul, finding English-speaking medical services was challenging until I discovered Himedi. They handle everything and the hospitals they partner with are top-tier.",
    name: "Michael Park",
    nationality: "Canada",
    service: "Expanded Health Checkup",
    rating: 5,
  },
];

export const faqData: Record<string, { question: string; answer: string }[]> = {
  "Booking Process": [
    {
      question: "How do I book a health screening package?",
      answer:
        "Simply browse our packages, select the one that suits your needs, add it to your cart, and proceed to checkout. After payment, you can schedule your appointment using our Calendly booking widget. Our concierge team will then reach out to help with travel planning and preparation.",
    },
    {
      question: "Can I customize my screening package?",
      answer:
        "Yes! After booking, our concierge team will work with you to customize your itinerary. You can add or remove specific tests based on your health concerns. We can also arrange additional services like airport transfers, accommodation, and local tours.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 2-3 weeks in advance to secure your preferred date and allow time for travel arrangements. However, we can accommodate shorter notice bookings when availability allows.",
    },
  ],
  "Language Support": [
    {
      question: "What languages does the medical interpretation cover?",
      answer:
        "We provide certified medical interpreters for English, Chinese (Mandarin and Cantonese), Japanese, Korean, and Russian. Our interpreters are present throughout your hospital visit to ensure clear communication with medical staff.",
    },
    {
      question: "Will my medical results be translated?",
      answer:
        "Yes, all medical results and reports are translated into your preferred language. You will receive a comprehensive digital report that you can share with your doctor back home.",
    },
  ],
  "Pricing and Payment": [
    {
      question: "Are there any hidden fees?",
      answer:
        "Absolutely not. All displayed prices are final and include the medical screening, English interpretation, concierge services, and translated results. There are no additional concierge fees.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards (Visa, Mastercard, AMEX), PayPal, Apple Pay, and Google Pay through our secure checkout powered by Stripe.",
    },
    {
      question: "What currency are prices in?",
      answer:
        "All prices are displayed in US Dollars (USD). If you are paying with a non-USD card, your bank will handle the currency conversion at their prevailing rate.",
    },
  ],
  "Refund and Cancellation": [
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made 7 or more days before your appointment receive a full refund. Cancellations less than 7 days before receive a 50% refund. No-shows are non-refundable.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Yes, you can reschedule your appointment free of charge within 12 months of your original purchase date. Simply contact our support team to arrange a new date.",
    },
  ],
  "Exam Preparation": [
    {
      question: "How should I prepare for my health screening?",
      answer:
        "Preparation varies by package. Generally, most packages require 8-12 hours of fasting before blood work. Specific instructions for your chosen package will be provided upon booking confirmation. Our concierge team will also send you a detailed preparation guide.",
    },
    {
      question: "What should I bring to my appointment?",
      answer:
        "Please bring your passport, booking confirmation email, any previous medical records or test results, a list of current medications, and comfortable clothing. If you wear glasses, bring them as well.",
    },
  ],
  Colonoscopy: [
    {
      question: "Is a colonoscopy included in the screening packages?",
      answer:
        "Colonoscopy is included in the Expanded, Intensive, and Comprehensive Health Checkup packages. For other packages, it can be added as an optional extra. Please note that colonoscopy requires special preparation including a clear liquid diet and bowel preparation the day before.",
    },
  ],
  "Post-Checkup Follow-Up": [
    {
      question: "How long until I receive my results?",
      answer:
        "Most results are available within 3-7 business days. Some specialized tests may take up to 2 weeks. You will receive a comprehensive translated digital report via email, and our concierge team will schedule a follow-up call to discuss your results.",
    },
    {
      question: "What if my results show something concerning?",
      answer:
        "If any concerning findings are detected, our team will notify you promptly and facilitate specialist referrals if needed. We can arrange follow-up consultations with Korean specialists or coordinate with your healthcare provider back home.",
    },
  ],
  "Travel and Accommodation": [
    {
      question: "Do you help with travel arrangements?",
      answer:
        "Yes! Our concierge service includes assistance with travel planning. While flights and accommodation are at your own expense, we can recommend partner hotels near the hospitals, arrange airport transfers, and help you navigate Seoul during your stay.",
    },
    {
      question: "How long should I plan to stay in Korea?",
      answer:
        "Depending on your package, plan for 2-5 days. Most screenings take 1-2 days, but we recommend allowing an extra day or two for rest, results discussion, and any follow-up. Our team will help you plan the ideal itinerary.",
    },
  ],
  "Treatment Options": [
    {
      question: "Can I get treatment in Korea if needed?",
      answer:
        "Yes, if your screening reveals any condition requiring treatment, we can facilitate referrals to specialists at our partner hospitals. Korea offers world-class treatment options at competitive prices, and our concierge team can help coordinate everything.",
    },
  ],
};
