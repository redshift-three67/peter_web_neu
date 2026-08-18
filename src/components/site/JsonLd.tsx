import { practice, reviews } from "@/content/site";

export function PracticeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://rauch-heilpraktiker.de/#praxis",
        name: practice.name,
        image: "/images/hero-praxis.jpg",
        url: "https://rauch-heilpraktiker.de/",
        telephone: practice.phoneTel,
        email: practice.email,
        priceRange: "$$",
        sameAs: [practice.social.facebook, practice.social.googlePlaces],
        address: {
          "@type": "PostalAddress",
          streetAddress: practice.street,
          postalCode: practice.zip,
          addressLocality: practice.city,
          addressRegion: "BY",
          addressCountry: "DE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: practice.geo.lat,
          longitude: practice.geo.lng,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "19:00",
        },
        areaServed: practice.reach.map((name) => ({
          "@type": "Place",
          name,
        })),
        founder: { "@id": "https://rauch-heilpraktiker.de/#person" },
        employee: { "@id": "https://rauch-heilpraktiker.de/#person" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.85",
          reviewCount: String(reviews.provenExpert.count),
          bestRating: "5",
        },
      },
      {
        "@type": "Person",
        "@id": "https://rauch-heilpraktiker.de/#person",
        name: practice.person,
        jobTitle: practice.role,
        worksFor: { "@id": "https://rauch-heilpraktiker.de/#praxis" },
        address: {
          "@type": "PostalAddress",
          addressLocality: `${practice.city}-${practice.district}`,
          addressCountry: "DE",
        },
        knowsAbout: [
          "Naturheilkunde",
          "Physiotherapie",
          "Manuelle Therapie",
          "Hypnotherapie",
          "Bioresonanztherapie",
        ],
        memberOf: practice.association,
        sameAs: [practice.social.facebook, practice.social.googlePlaces],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://rauch-heilpraktiker.de${item.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
