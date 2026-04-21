import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    title: "Whole Body MRI",
    handle: "whole-body-mri",
    description:
      "A comprehensive MRI-based full-body imaging scan that screens for abnormalities across all major organ systems. Using state-of-the-art 3T MRI technology, this scan provides detailed cross-sectional images of your brain, neck, chest, abdomen, pelvis, and spine.",
    price: 1800,
    category: "comprehensive",
    durationEstimate: "Half-day (3-4 hours)",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "No metallic objects or implants. Remove all jewelry before the scan. Wear comfortable, loose-fitting clothing.",
    includes: [
      "Brain MRI",
      "Neck MRI",
      "Chest MRI",
      "Abdominal MRI",
      "Pelvic MRI",
      "Spine MRI",
      "Detailed radiology report",
      "English interpretation support",
    ],
    images: ["/images/products/whole-body-mri.jpg"],
    reviewsCount: 12,
    averageRating: 4.9,
    sortOrder: 1,
  },
  {
    title: "MRI + Health Checkup",
    handle: "mri-health-checkup",
    description:
      "Combine the power of whole-body MRI imaging with comprehensive blood work and standard health panels. This package merges advanced imaging technology with traditional laboratory diagnostics for a complete health assessment.",
    price: 2000,
    category: "comprehensive",
    durationEstimate: "Full-day (6-8 hours)",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "Fasting required for 10-12 hours before blood draw. No metallic implants. Remove all jewelry.",
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
    reviewsCount: 15,
    averageRating: 5.0,
    sortOrder: 2,
  },
  {
    title: "Baseline Health Checkup",
    handle: "baseline-health-checkup",
    description:
      "An entry-level health screening package covering essential blood tests, basic vitals, and standard assessments. Perfect for young professionals or those new to preventive health screening.",
    price: 299,
    category: "comprehensive",
    durationEstimate: "Half-day (2-3 hours)",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Fasting required for 8-10 hours before blood draw. Take medications as usual unless instructed otherwise.",
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
    reviewsCount: 18,
    averageRating: 4.8,
    sortOrder: 3,
  },
  {
    title: "Expanded Health Checkup",
    handle: "expanded-health-checkup",
    description:
      "A mid-tier screening package that builds upon the baseline with advanced imaging including ultrasound and X-ray, plus endoscopy options. Recommended for adults 30+.",
    price: 890,
    category: "comprehensive",
    durationEstimate: "Full-day (6-8 hours)",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Fasting required for 10-12 hours. No food or water after midnight. Avoid alcohol 48 hours prior.",
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
    reviewsCount: 14,
    averageRating: 4.9,
    sortOrder: 4,
  },
  {
    title: "Intensive Health Checkup",
    handle: "intensive-health-checkup",
    description:
      "An advanced full-body screening with a comprehensive imaging suite, optional PET/CT, and cardiac screening. Ideal for those with family history of serious conditions or age 40+.",
    price: 1630,
    category: "comprehensive",
    durationEstimate: "Full-day to multi-day (1-2 days)",
    partnerHospital: "Seoul National University Hospital",
    preparationInstructions:
      "Fasting required for 12 hours. Avoid caffeine 24 hours prior. Inform staff of all medications and supplements.",
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
    reviewsCount: 10,
    averageRating: 5.0,
    sortOrder: 5,
  },
  {
    title: "Comprehensive Health Checkup",
    handle: "comprehensive-health-checkup",
    description:
      "The premium all-inclusive health screening package with specialist consultations across every major discipline. Our most thorough offering, combining every available diagnostic tool.",
    price: 2815,
    category: "comprehensive",
    durationEstimate: "Multi-day (2-3 days)",
    partnerHospital: "Seoul National University Hospital",
    preparationInstructions:
      "Fasting required for 12 hours before Day 1. Detailed preparation instructions provided upon booking.",
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
    reviewsCount: 11,
    averageRating: 5.0,
    sortOrder: 6,
  },
  {
    title: "Skin Analysis & Consultation",
    handle: "skin-analysis-consultation",
    description:
      "A professional dermatological skin analysis using advanced imaging technology to assess skin health, detect early signs of conditions, and receive personalized treatment recommendations.",
    price: 77,
    category: "focused",
    durationEstimate: "1-2 hours",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "Avoid wearing makeup on the day of the appointment. Do not apply skincare products 2 hours before.",
    includes: [
      "Digital skin analysis",
      "Dermatologist consultation",
      "Skin type assessment",
      "Sun damage evaluation",
      "Personalized skincare recommendations",
      "English interpretation support",
    ],
    images: ["/images/products/skin-analysis.jpg"],
    reviewsCount: 8,
    averageRating: 4.7,
    sortOrder: 7,
  },
  {
    title: "Hair Analysis & Consultation",
    handle: "hair-analysis-consultation",
    description:
      "A comprehensive hair and scalp health analysis using microscopic imaging technology. Identify hair loss causes, scalp conditions, and receive evidence-based treatment recommendations.",
    price: 77,
    category: "focused",
    durationEstimate: "1-2 hours",
    partnerHospital: "KMI Gangnam",
    preparationInstructions:
      "Do not wash hair on the day of the appointment. Avoid hair styling products.",
    includes: [
      "Microscopic scalp analysis",
      "Hair density measurement",
      "Scalp health assessment",
      "Hair quality evaluation",
      "Treatment recommendations",
      "English interpretation support",
    ],
    images: ["/images/products/hair-analysis.jpg"],
    reviewsCount: 6,
    averageRating: 4.6,
    sortOrder: 8,
  },
  {
    title: "Vision Eye Exam",
    handle: "vision-eye-exam",
    description:
      "A comprehensive ophthalmological examination using the latest diagnostic equipment. Covers visual acuity, intraocular pressure, retinal imaging, and screening for common eye conditions.",
    price: 150,
    category: "focused",
    durationEstimate: "2-3 hours",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Bring current prescription glasses or contacts. Pupil dilation may be performed; driving not recommended afterward.",
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
    reviewsCount: 9,
    averageRating: 4.8,
    sortOrder: 9,
  },
  {
    title: "Women's Health Screening",
    handle: "womens-health-screening",
    description:
      "A specialized women-focused screening covering gynecological and hormonal health. Includes breast imaging, pelvic ultrasound, hormonal panels, and consultation with women's health specialists.",
    price: 577,
    category: "focused",
    durationEstimate: "Half-day (3-4 hours)",
    partnerHospital: "Samsung Medical Center",
    preparationInstructions:
      "Schedule during specific menstrual cycle days if possible. Fasting may be required for blood work.",
    includes: [
      "Breast ultrasound or mammogram",
      "Pelvic ultrasound",
      "Pap smear / cervical screening",
      "Hormonal panel",
      "Thyroid function test",
      "Bone density assessment",
      "CA-125 tumor marker",
      "Vitamin D & iron levels",
      "Gynecologist consultation",
      "English interpretation support",
    ],
    images: ["/images/products/womens-health.jpg"],
    reviewsCount: 7,
    averageRating: 4.9,
    sortOrder: 10,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing products
  await prisma.product.deleteMany({});

  // Insert products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
