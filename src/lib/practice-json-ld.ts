export interface PracticeJsonLdInput {
  readonly name: string;
  readonly person: string;
  readonly role: string;
  readonly street: string;
  readonly zip: string;
  readonly city: string;
  readonly district: string;
  readonly phoneTel: string;
  readonly email: string;
  readonly geo: {
    readonly lat: number;
    readonly lng: number;
  };
  readonly reach: readonly string[];
  readonly association: string;
  readonly social: {
    readonly facebook: string;
    readonly googlePlaces: string;
  };
  readonly schemaImage: string;
  readonly openingDays: readonly string[];
  readonly openingIntervals: readonly {
    readonly opens: string;
    readonly closes: string;
  }[];
}

export function buildPracticeJsonLd(practice: PracticeJsonLdInput) {
  const personId = "https://rauch-heilpraktiker.de/#person";
  const practiceId = "https://rauch-heilpraktiker.de/#praxis";
  const sameAs = [practice.social.facebook, practice.social.googlePlaces];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": practiceId,
        name: practice.name,
        image: practice.schemaImage,
        url: "https://rauch-heilpraktiker.de/",
        telephone: practice.phoneTel,
        email: practice.email,
        priceRange: "$$",
        sameAs,
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
        openingHoursSpecification: practice.openingIntervals.map(
          ({ opens, closes }) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...practice.openingDays],
            opens,
            closes,
          }),
        ),
        areaServed: practice.reach.map((name) => ({
          "@type": "Place",
          name,
        })),
        founder: { "@id": personId },
        employee: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: practice.person,
        jobTitle: practice.role,
        worksFor: { "@id": practiceId },
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
        sameAs,
      },
    ],
  };
}
