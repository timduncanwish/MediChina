export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  language: string;
  author: string;
  image: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export const languages = [
  { code: "en", label: "English", path: "/blogs/en" },
  { code: "kr", label: "한국어", path: "/blogs/kr" },
  { code: "ar", label: "العربية", path: "/blogs/ar" },
  { code: "mn", label: "Монгол", path: "/blogs/mn" },
  { code: "ru", label: "Русский", path: "/blogs/ru" },
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    title: "Why Korea is the Top Destination for Health Screenings",
    slug: "why-korea-health-screenings",
    excerpt:
      "Discover why millions of international patients choose Korea for preventive health screenings. World-class hospitals, cutting-edge technology, and affordable pricing make Korea the premier medical tourism destination.",
    content: `Korea has rapidly become one of the world's leading destinations for medical tourism, particularly in the area of preventive health screenings. With state-of-the-art hospitals like Samsung Medical Center, Seoul National University Hospital, and KMI Gangnam, patients have access to diagnostic technology that rivals or exceeds what's available in many Western countries.

## World-Class Healthcare Infrastructure

Korean hospitals consistently rank among the best in Asia. The country's investment in medical technology means patients benefit from the latest MRI machines, PET/CT scanners, and advanced laboratory equipment.

## Affordability Without Compromise

A comprehensive health screening in Korea typically costs 50-70% less than the equivalent procedure in the United States, with no compromise on quality. This dramatic cost difference, combined with shorter wait times, makes Korea an attractive option for health-conscious travelers.

## English-Speaking Support

One of the biggest concerns for international patients is the language barrier. Services like Himedi provide full English-speaking medical interpreters throughout your screening, ensuring clear communication with doctors and medical staff.

## What to Expect

Most comprehensive screenings take 1-2 days and include blood work, imaging, specialist consultations, and a detailed report. The entire experience is designed to be comfortable and stress-free, with concierge services handling logistics from airport pickup to hospital navigation.`,
    language: "en",
    author: "Himedi Team",
    image: null,
    tags: ["korea", "health-screening", "medical-tourism"],
    published: true,
    createdAt: "2026-03-15",
  },
  {
    id: "blog-002",
    title: "Preparing for Your Health Screening: A Complete Guide",
    slug: "preparing-health-screening-guide",
    excerpt:
      "Everything you need to know before your health screening in Korea. From fasting requirements to what to bring, this guide covers all the essentials for a smooth screening experience.",
    content: `Proper preparation is key to getting the most accurate results from your health screening. Here's a comprehensive guide to help you prepare for your visit to a Korean hospital.

## Fasting Requirements

Most comprehensive screening packages require 8-12 hours of fasting before blood work. This means no food or drink (except water) after midnight before your appointment.

## What to Bring

- Passport (required for hospital registration)
- Booking confirmation email
- Previous medical records (if available)
- List of current medications
- Comfortable clothing

## Medication Guidelines

Continue taking most medications as prescribed, unless specifically instructed otherwise. Blood thinners and certain diabetes medications may need to be adjusted - consult with your concierge team.

## After Your Screening

Results are typically available within 3-7 business days. You'll receive a comprehensive translated digital report that you can share with your healthcare provider back home.`,
    language: "en",
    author: "Dr. Sarah Kim",
    image: null,
    tags: ["preparation", "guide", "tips"],
    published: true,
    createdAt: "2026-03-20",
  },
  {
    id: "blog-003",
    title: "Understanding Your MRI Results",
    slug: "understanding-mri-results",
    excerpt:
      "A patient-friendly guide to understanding whole body MRI results. Learn what the scan covers, how to read your report, and when to follow up with a specialist.",
    content: `Whole body MRI is one of the most powerful diagnostic tools available today. Here's what you need to know about understanding your results.

## What the Scan Covers

A whole body MRI examines your brain, neck, chest, abdomen, pelvis, and spine in a single session. The scan uses magnetic fields to create detailed cross-sectional images.

## Reading Your Report

Your report will be organized by body region, with findings categorized as normal, benign, or requiring follow-up. Common benign findings include simple cysts and normal variants.

## When to Follow Up

Any concerning findings will be clearly highlighted in your report. Our medical team will schedule a follow-up consultation to discuss next steps if needed.`,
    language: "en",
    author: "Himedi Team",
    image: null,
    tags: ["mri", "diagnostics", "results"],
    published: true,
    createdAt: "2026-04-01",
  },
  {
    id: "blog-004",
    title: "한국 건강검진 가이드: 외국인을 위한 완벽 가이드",
    slug: "korea-health-screening-guide-kr",
    excerpt:
      "외국인을 위한 한국 건강검진 완벽 가이드입니다. 삼성서울병원, 서울대병원 등 최고의 병원에서 받는 건강검진에 대해 알아보세요.",
    content: `한국은 세계 최고 수준의 의료 기술과 합리적인 비용으로 건강검진을 받을 수 있는 곳입니다. 외국인 환자분들을 위한 상세 가이드를 제공합니다.

## 왜 한국에서 건강검진을 받아야 할까요?

한국의 주요 병원들은 최첨단 MRI, PET/CT 등의 장비를 보유하고 있으며, 전문 의료진이 포괄적인 검진 서비스를 제공합니다.

## 준비 사항

- 8-12시간 공복 유지
- 여권 지참
- 현재 복용 중인 약물 목록`,
    language: "kr",
    author: "Himedi Team",
    image: null,
    tags: ["건강검진", "가이드", "한국"],
    published: true,
    createdAt: "2026-03-18",
  },
  {
    id: "blog-005",
    title: "دليل فحوصات الصحة في كوريا",
    slug: "korea-health-screening-guide-ar",
    excerpt:
      "دليل شامل لفحوصات الصحة الوقائية في كوريا. تعرف على أفضل المستشفيات والخدمات المتاحة للمرضى الدوليين.",
    content: `تعتبر كوريا واحدة من أفضل الوجهات للفحوصات الصحية الوقائية. إليك كل ما تحتاج معرفته.

## لماذا كوريا؟

تتميز المستشفيات الكورية بأحدث التقنيات الطبية وأسعار معقولة مقارنة بالدول الغربية.`,
    language: "ar",
    author: "Himedi Team",
    image: null,
    tags: ["فحص-صحي", "كوريا", "سياحة-علاجية"],
    published: true,
    createdAt: "2026-03-22",
  },
  {
    id: "blog-006",
    title: "Солонгосын эрүүл мэндийн үзлэгийн гарын авлага",
    slug: "korea-health-screening-guide-mn",
    excerpt:
      "Солонгос улсад эрүүл мэндийн үзлэг хийлгэх гарын авлага. Олон улсын өвчтөнүүдэд зориулсан үйлчилгээний тухай бүхнийг мэдэх.",
    content: `Солонгос нь дэлхийн хамгийн шилдэг эрүүл мэндийн үзлэг хийх газруудын нэг юм. Энд таны мэдэх ёстой бүх зүйл бий.`,
    language: "mn",
    author: "Himedi Team",
    image: null,
    tags: ["эрүүл-мэнд", "солонгос", "үзлэг"],
    published: true,
    createdAt: "2026-03-25",
  },
  {
    id: "blog-007",
    title: "Руководство по медицинским обследованиям в Корее",
    slug: "korea-health-screening-guide-ru",
    excerpt:
      "Полное руководство по профилактическим медицинским обследованиям в Корее. Узнайте о лучших больницах и услугах для иностранных пациентов.",
    content: `Корея является одним из лучших направлений для профилактических медицинских обследований. Вот всё, что вам нужно знать.

## Почему Корея?

Корейские больницы оснащены новейшим медицинским оборудованием по доступным ценам по сравнению с западными странами.`,
    language: "ru",
    author: "Himedi Team",
    image: null,
    tags: ["медицина", "корея", "обследование"],
    published: true,
    createdAt: "2026-03-28",
  },
];

export function getBlogPosts(language: string): BlogPost[] {
  return blogPosts.filter(
    (p) => p.language === language && p.published
  );
}

export function getBlogPost(slug: string, language: string): BlogPost | undefined {
  return blogPosts.find(
    (p) => p.slug === slug && p.language === language && p.published
  );
}
