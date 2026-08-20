export const practice = {
  name: "Naturheilpraxis Rauch",
  person: "Peter Rauch",
  role: "Heilpraktiker und Physiotherapeut",
  tagline: "Naturheilkundlich begleiten – stark im Leben",
  street: "Friedrich-Deffner-Straße 19a",
  zip: "86163",
  city: "Augsburg",
  district: "Hochzoll",
  region: "Bayern",
  country: "DE",
  phoneDisplay: "0821 2621462",
  phoneTel: "+498212621462",
  email: "praxis_rauch@icloud.com",
  geo: { lat: 48.33937, lng: 10.94893 },
  hours: "Montag bis Freitag, 10:00–12:30 und 13:00–19:00 Uhr, nach Vereinbarung",
  hoursShort: "Mo–Fr 10–12:30 · 13–19 Uhr",
  mapsQuery:
    "https://www.google.com/maps/search/?api=1&query=Friedrich-Deffner-Stra%C3%9Fe+19a%2C+86163+Augsburg",
  reach: ["Augsburg-Hochzoll", "Friedberg", "Lechhausen-Ost"],
  catchment: [
    "Stadtbergen",
    "Neusäß",
    "Gersthofen",
    "Kissing",
    "Mering",
    "Königsbrunn",
  ],
  sinceHp: "26.12.2006",
  sincePt: "02.11.2001",
  association: "Bund Deutscher Heilpraktiker und Naturheilkundiger e.V.",
  authority: "Gesundheitsamt Stadt Augsburg",
  licenseHp: "Landratsamt Aichach-Friedberg",
  licensePt: "Regierungspräsidium Gießen",
  taxId: "103/260/50615",
  updated: "August 2026",
  experienceYears: 20,
  emailCanonical: "praxis_rauch@icloud.com",
  social: {
    facebook:
      "https://www.facebook.com/heilpraktiker.naturheilpraxis.bioresonanz.rauch/",
    googlePlaces: "https://g.page/RauchHeilpraktikerAugsburg",
  },
  googleSiteVerification: "Lo1lpA7DNTfaUkKiiWvDSJFJSBAsi2DDhjToUoKieWU",
} as const;

export const reviews = {
  provenExpert: { score: "4,85", count: 103, label: "ProvenExpert" },
  jameda: { score: "5,0", count: 19, label: "Jameda" },
  quotes: [
    {
      text: "Herr Rauch nimmt sich extrem viel Zeit und erklärt Zusammenhänge so, dass sie gut zu verstehen sind.",
      source: "ProvenExpert",
    },
    {
      text: "Ein sehr empathischer Heilpraktiker, der sich wie noch nie jemand Zeit für meine chronische Erkrankung genommen hat.",
      source: "Jameda",
    },
    {
      text: "Ganzheitlich, zielgerichtet und genau. Man fühlt sich ernst genommen und gut aufgehoben.",
      source: "ProvenExpert",
    },
  ],
} as const;

export const nav = [
  { to: "/", label: "Start", text: "Heilpraktiker Augsburg-Hochzoll" },
  { to: "/ueber-mich", label: "Über mich", text: "Vita, Erlaubnis, Erfahrung" },
  {
    label: "Diagnostik",
    children: [
      { to: "/diagnostik-informationstherapie", label: "Übersicht Diagnostik", text: "Hinweisdiagnostik in der Praxis" },
      { to: "/nls-diagnostik", label: "NLS-Diagnostik", text: "Metatron / NLS in Augsburg" },
      { to: "/vieva-pro-herzratenvariabilitaet", label: "Vieva Pro", text: "HRV und Vitalfeld" },
      { to: "/hinweisdiagnostik-eav-elektroakupunktur-nach-dr-voll", label: "EAV nach Dr. Voll", text: "Elektroakupunktur, hinweisgebend" },
    ],
  },
  {
    label: "Manuelle Verfahren",
    children: [
      { to: "/manuelle-therapieverfahren-uebersicht", label: "Übersicht manuell", text: "Osteopathie, IMT, Lowen" },
      { to: "/osteopathie-techniken", label: "Osteopathie", text: "Manuelle Techniken in Augsburg" },
      { to: "/schmerztherapie-augsburg", label: "Schmerztherapie Augsburg", text: "Rücken, Gelenke, chronischer Schmerz" },
    ],
  },
  {
    label: "Naturheilkunde",
    children: [
      { to: "/naturheilkunde", label: "Naturheilkunde Augsburg", text: "Homöopathie, Pflanzen, NAET" },
      { to: "/klassische-homoeopathie", label: "Klassische Homöopathie", text: "Nach Hahnemann" },
      { to: "/naet-methode-allergie-behandlung", label: "NAET / Allergie", text: "Unverträglichkeiten, ergänzend" },
      { to: "/naturheilkundliche-darmsanierung", label: "Darmsanierung", text: "Naturheilkundliche Begleitung" },
    ],
  },
  {
    label: "Bioresonanz",
    children: [
      { to: "/bioresonanz-therapie", label: "Bioresonanz Augsburg", text: "Hinweisgebend, kein Laborersatz" },
      { to: "/biophysikalische-informationstherapie-bit", label: "Informationstherapie", text: "BIT in der Praxis" },
      { to: "/hypnotherapie-augsburg", label: "Hypnotherapie Augsburg", text: "Gesprächshypnose" },
      { to: "/psychotherapie-augsburg", label: "Erschöpfung & Burnout", text: "Gespräch und Begleitung, ergänzend" },
    ],
  },
  { to: "/kontakt", label: "Kontakt", text: "Hochzoll, Telefon, Nachricht" },
] as const;

export const footerNav = {
  praxis: [
    { to: "/ueber-mich", label: "Vita & Qualifikation" },
    { to: "/so-arbeite-ich", label: "Ablauf" },
    { to: "/erstgespraech", label: "Erstgespräch & Kosten" },
    { to: "/anfahrt", label: "Anfahrt Hochzoll" },
    { to: "/online-anamnesebogen", label: "Online-Anamnese" },
  ],
  anliegen: [
    { to: "/schmerztherapie-augsburg", label: "Schmerztherapie Augsburg" },
    { to: "/naet-methode-allergie-behandlung", label: "Allergie / NAET" },
    { to: "/psychotherapie-augsburg", label: "Erschöpfung & Burnout" },
    { to: "/hypnotherapie-augsburg", label: "Hypnotherapie Augsburg" },
    { to: "/bioresonanz-therapie", label: "Bioresonanz Augsburg" },
  ],
  recht: [
    { to: "/impressum", label: "Impressum" },
    { to: "/datenschutzerklaerung", label: "Datenschutz" },
    { to: "/rechtshinweise-therapieverfahren", label: "Rechtshinweise" },
    { to: "/quellenhinweis", label: "Quellen & Haftung" },
    { to: "/login", label: "Praxiszugang" },
    { to: "/archiv", label: "Seitenarchiv" },
  ],
} as const;

export const practiceFaqs = [
  {
    q: "Ersetzt die Naturheilpraxis einen Arztbesuch?",
    a: "Nein. Ich arbeite ergänzend. Die dargestellten Verfahren ersetzen keine ärztliche Diagnose, Beratung oder Behandlung. Bei Notfällen wählen Sie 112, außerhalb der Sprechzeit den kassenärztlichen Bereitschaftsdienst 116 117.",
  },
  {
    q: "Wie vereinbare ich einen Termin?",
    a: "Telefonisch unter 0821 2621462 oder über das Kontaktformular. Vor dem Erstgespräch können Sie den Online-Anamnesebogen ausfüllen. Sprechzeiten: montags bis freitags 10–12:30 und 13–19 Uhr, nach Vereinbarung.",
  },
  {
    q: "Was kostet die Behandlung?",
    a: "Die Behandlung ist eine Privatleistung. Das Erstgespräch dauert in der Regel 60–90 Minuten. Einen konkreten Rahmen nenne ich im Gespräch – abhängig von Aufwand und Verfahren. Ob Krankenkasse, Beihilfe oder Zusatzversicherung erstattet, hängt von Ihrem Vertrag ab.",
  },
  {
    q: "Wo liegt die Praxis?",
    a: "In Augsburg-Hochzoll, Friedrich-Deffner-Straße 19a. Von Friedberg und Lechhausen-Ost ist sie in wenigen Minuten erreichbar. Parken ist in der Straße möglich; die S-Bahn-Haltestelle Hochzoll liegt in der Nähe.",
  },
  {
    q: "Geben Sie Heilversprechen?",
    a: "Nein. Ich gebe keine Heilversprechen ab und ersetze keine ärztliche Diagnostik. Ziel der Arbeit ist mehr körperliches und seelisches Wohlbefinden im Alltag – ohne Garantie auf ein bestimmtes Ergebnis.",
  },
] as const;
