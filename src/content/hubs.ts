/** 18 Hub-URLs = alte WordPress-Pfade. Welle 1–3. */
export const hubWaves = {
  1: [
    "/",
    "/schmerztherapie-augsburg",
    "/hypnotherapie-augsburg",
    "/naturheilkunde",
    "/manuelle-therapieverfahren-uebersicht",
    "/bioresonanz-therapie",
  ],
  2: [
    "/psychotherapie-augsburg",
    "/nls-diagnostik",
    "/osteopathie-techniken",
    "/kontakt",
    "/online-anamnesebogen",
    "/impressum",
  ],
  3: [
    "/datenschutzerklaerung",
    "/rechtshinweise-therapieverfahren",
    "/klassische-homoeopathie",
    "/naet-methode-allergie-behandlung",
    "/diagnostik-informationstherapie",
    "/downloadbereich-naturheilpraxis-rauch",
  ],
} as const;

export const hubMeta: Record<
  string,
  { title: string; description: string; kicker: string }
> = {
  "/schmerztherapie-augsburg": {
    title: "Heilpraktiker für Schmerz in Augsburg | Peter Rauch",
    description:
      "Ergänzende Schmerztherapie in Augsburg-Hochzoll: manuelle Verfahren, Naturheilkunde und Gespräch bei chronischen Schmerzen. Peter Rauch, Heilpraktiker und Physiotherapeut. Ohne Heilversprechen.",
    kicker: "Heilpraktiker Augsburg-Hochzoll",
  },
  "/hypnotherapie-augsburg": {
    title: "Hypnotherapie Augsburg – Naturheilpraxis Peter Rauch",
    description:
      "Hypnotherapie in Augsburg-Hochzoll bei innerer Unruhe, Belastung und Gewohnheiten. Ergänzend, ohne Heilversprechen. Termin: 0821 2621462.",
    kicker: "Heilpraktiker Augsburg-Hochzoll",
  },
  "/naturheilkunde": {
    title: "Naturheilkunde Augsburg – Heilpraktiker Peter Rauch",
    description:
      "Naturheilkunde in Augsburg-Hochzoll: Homöopathie, Pflanzen, NAET und Injektionen im heilpraktischen Rahmen. Ergänzend zur schulmedizinischen Versorgung.",
    kicker: "Heilpraktiker Augsburg · Hochzoll · Friedberg",
  },
  "/manuelle-therapieverfahren-uebersicht": {
    title: "Manuelle Therapie Augsburg – Osteopathie & IMT | Peter Rauch",
    description:
      "Manuelle Verfahren in Augsburg-Hochzoll: Osteopathie, Integrative Manual Therapy, Lowen Systems. Heilpraktiker und Physiotherapeut Peter Rauch.",
    kicker: "Heilpraktiker Augsburg-Hochzoll",
  },
  "/bioresonanz-therapie": {
    title: "Bioresonanz Augsburg – Hinweisdiagnostik | Peter Rauch",
    description:
      "Bioresonanz in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Hinweisgebend, nicht als Labordiagnose. Keine Heilversprechen.",
    kicker: "Heilpraktiker Augsburg-Hochzoll",
  },
  "/psychotherapie-augsburg": {
    title: "Erschöpfung & Burnout – Heilpraktiker Augsburg | Peter Rauch",
    description:
      "Ergänzende Gesprächs- und naturheilkundliche Begleitung bei Erschöpfung, Burnout und Belastung in Augsburg-Hochzoll. Keine approbierte Psychotherapie, kein Heilversprechen. Termin: 0821 2621462.",
    kicker: "Heilpraktiker Augsburg-Hochzoll",
  },
  "/nls-diagnostik": {
    title: "NLS-Diagnostik Augsburg – Hinweisverfahren | Peter Rauch",
    description:
      "NLS-Diagnostik in Augsburg-Hochzoll als ergänzendes Hinweisverfahren. Kein Laborersatz, keine ärztliche Diagnose, kein Heilversprechen.",
    kicker: "Heilpraktiker Augsburg-Hochzoll",
  },
  "/osteopathie-techniken": {
    title: "Osteopathie Augsburg – Manuelle Therapie | Peter Rauch",
    description:
      "Osteopathie in Augsburg-Hochzoll: manuelle Techniken bei Heilpraktiker und Physiotherapeut Peter Rauch. Ergänzend, ohne Heilversprechen.",
    kicker: "Heilpraktiker Augsburg-Hochzoll",
  },
  "/kontakt": {
    title: "Kontakt Heilpraktiker Augsburg – Praxis Rauch Hochzoll",
    description:
      "Termin bei Heilpraktiker Peter Rauch in Augsburg-Hochzoll. Telefon 0821 2621462, Friedrich-Deffner-Straße 19a. Aus Friedberg und Lechhausen erreichbar.",
    kicker: "Naturheilpraxis Augsburg-Hochzoll",
  },
  "/online-anamnesebogen": {
    title: "Online-Anamnesebogen Augsburg – Naturheilpraxis Rauch",
    description:
      "Patientenaufnahme vor dem Termin in Augsburg-Hochzoll. Der Bogen ist keine Diagnose und kein Notfallweg.",
    kicker: "Patientenaufnahme · Augsburg-Hochzoll",
  },
  "/impressum": {
    title: "Impressum – Heilpraktiker Peter Rauch Augsburg",
    description:
      "Impressum gemäß DDG: Peter Rauch, Heilpraktiker und Physiotherapeut, Friedrich-Deffner-Straße 19a, 86163 Augsburg-Hochzoll.",
    kicker: "Recht · Augsburg-Hochzoll",
  },
  "/datenschutzerklaerung": {
    title: "Datenschutz – Heilpraktiker Peter Rauch Augsburg",
    description:
      "Datenschutzerklärung der Naturheilpraxis Rauch, Augsburg-Hochzoll. DSGVO, TDDDG, Formulare. Keine Google Fonts.",
    kicker: "Recht · Augsburg-Hochzoll",
  },
  "/rechtshinweise-therapieverfahren": {
    title: "Rechtshinweise Therapieverfahren – Heilpraktiker Augsburg",
    description:
      "Keine Heilversprechen. Verfahren in der Naturheilpraxis Rauch ersetzen keine ärztliche Diagnose. Hinweise nach HWG.",
    kicker: "Recht · Augsburg-Hochzoll",
  },
  "/klassische-homoeopathie": {
    title: "Klassische Homöopathie Augsburg – Heilpraktiker Peter Rauch",
    description:
      "Klassische Homöopathie nach Hahnemann in Augsburg-Hochzoll. Ergänzend zur ärztlichen Versorgung, ohne Heilversprechen.",
    kicker: "Naturheilkunde · Augsburg-Hochzoll",
  },
  "/naet-methode-allergie-behandlung": {
    title: "Allergie & Unverträglichkeit – Heilpraktiker Augsburg | Peter Rauch",
    description:
      "Ergänzende naturheilkundliche Begleitung bei Allergien und Unverträglichkeiten in Augsburg-Hochzoll, u. a. mit NAET. Keine Allergiediagnose, kein Heilversprechen. Termin: 0821 2621462.",
    kicker: "Naturheilkunde · Augsburg-Hochzoll",
  },
  "/diagnostik-informationstherapie": {
    title: "Hinweisdiagnostik Augsburg – NLS, EAV, Bioresonanz",
    description:
      "Hinweisdiagnostik in der Naturheilpraxis Rauch, Augsburg-Hochzoll: NLS, EAV, Bioresonanz. Kein Laborersatz, keine ärztliche Diagnose.",
    kicker: "Diagnostik · Augsburg-Hochzoll",
  },
  "/downloadbereich-naturheilpraxis-rauch": {
    title: "Downloadbereich – Anamnese Augsburg | Praxis Rauch",
    description:
      "Formulare und Erstinformation vor dem Termin in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Keine Diagnose per Download.",
    kicker: "Patientenaufnahme · Augsburg-Hochzoll",
  },
};

export const legacyRedirects: Record<string, string> = {
  "/bioresonanz-augsburg": "/bioresonanz-therapie",
  "/verfahren/naturheilkunde": "/naturheilkunde",
  "/verfahren/manuell": "/manuelle-therapieverfahren-uebersicht",
  "/verfahren/frequenz": "/diagnostik-informationstherapie",
  "/allergie-augsburg": "/naet-methode-allergie-behandlung",
  "/erschoepfung-augsburg": "/psychotherapie-augsburg",
  "/datenschutz": "/datenschutzerklaerung",
  "/rechtshinweise": "/rechtshinweise-therapieverfahren",
  "/anamnese": "/online-anamnesebogen",
};

export const NAV_CHROME = new Set([
  "Impressum",
  "Rechtshinweise",
  "Rechtshinweise Therapieverfahren",
  "Downloadbereich",
  "Praxis offen",
  "Online-Anamnesebogen",
  "Gesundheitsrelevante Dokumentation",
  "Datenschutz",
  "Datenschutz Tools",
  "Naturheilkundlich begleiten – Stark im Leben",
  "Zurück zur Startseite",
  "Zentrum für Naturheilkunde",
  "Mein Facebook - Profil",
  "Meine Google - Bewertung",
  "Downloadbereich Naturheilpraxis",
]);
