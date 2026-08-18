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
    title: "Schmerztherapie Augsburg – Heilpraktiker Peter Rauch",
    description:
      "Schmerztherapie in Augsburg-Hochzoll: manuell, naturheilkundlich und im Gespräch. Peter Rauch, Heilpraktiker und Physiotherapeut. Ergänzend zur Ärztin, ohne Heilversprechen.",
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
]);
