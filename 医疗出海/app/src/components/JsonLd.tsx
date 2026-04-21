interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Himedi",
    url: "https://himedi.com",
    logo: "https://himedi.com/images/logo.png",
    description:
      "Korean Medical Tourism Concierge - Connect with top-tier Korean hospitals for preventive health screenings with full concierge support.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seoul",
      addressCountry: "KR",
    },
    sameAs: [
      "https://instagram.com/himedi",
      "https://facebook.com/himedi",
      "https://tiktok.com/@himedi",
      "https://youtube.com/@himedi",
    ],
  };
}

export function productJsonLd(product: {
  title: string;
  description: string;
  price: number;
  handle: string;
  averageRating: number;
  reviewsCount: number;
  images: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    url: `https://himedi.com/products/${product.handle}`,
    brand: {
      "@type": "Brand",
      name: "Himedi",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.averageRating,
      reviewCount: product.reviewsCount,
    },
  };
}

export function faqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
