/**
 * TrustBadges — "As Featured In" media logos bar.
 * Since we don't have real logo images, we use styled text placeholders
 * that can be replaced with actual SVG/PNG logos later.
 */

const MEDIA_OUTLETS = [
  { name: "Business of Fashion", abbr: "BoF" },
  { name: "Oprah Daily", abbr: "OPRAH" },
  { name: "Forbes", abbr: "Forbes" },
  { name: "Conde Nast Traveler", abbr: "CN Traveller" },
  { name: "The Points Guy", abbr: "TPG" },
];

export function TrustBadges() {
  return (
    <section className="py-10 md:py-14 border-y border-border bg-white" aria-label="As featured in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted mb-8 font-heading">
          As Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {MEDIA_OUTLETS.map((outlet) => (
            <div
              key={outlet.name}
              className="text-gray-300 hover:text-gray-400 transition-colors select-none"
              title={outlet.name}
            >
              <span className="text-lg md:text-xl font-bold tracking-wide font-heading opacity-40">
                {outlet.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * CertificationBadges — trust signals shown inline.
 */
const CERTIFICATIONS = [
  {
    label: "Korean Gov. Certified",
    detail: "Medical Tourism Agency",
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    label: "SSL Encrypted",
    detail: "Secure Payments",
    iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  {
    label: "HIPAA Compliant",
    detail: "Data Privacy",
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    label: "Free Concierge",
    detail: "$0 Service Fee",
    iconPath: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export function CertificationBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CERTIFICATIONS.map((cert) => (
        <div
          key={cert.label}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={cert.iconPath} />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">{cert.label}</p>
            <p className="text-xs text-muted">{cert.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
