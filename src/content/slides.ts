import { externalLinks } from "@/content/external-links";

/** Live-Slider der WordPress-Startseite, Overlay-Texte 1:1 vom 18.08.2026. */
export const homeSlides = [
  {
    src: "/media/originals/Naturheilpraxis_Heilpraktiker_Rauch_Augsburg_2_3.webp",
    alt: "Behandlungsraum der Naturheilpraxis Rauch in Augsburg-Hochzoll",
    meta: "Ganzheitliche Therapie",
    title: "Naturheilkundliche Verfahren in Augsburg",
    cta: "Info zur NLS Diagnostik",
    href: "/nls-diagnostik",
    external: false,
  },
  {
    src: "/media/originals/Naturheilpraxis_Heilpraktiker_Rauch_Augsburg_2_3.webp",
    alt: "Ruhige Patientin – Hinweis auf den Online-Anamnesebogen",
    meta: "Online-Anamnesebogen",
    title: "Patientenaufnahme vor dem Termin",
    cta: "Online-Anamnesebogen",
    href: externalLinks.anamneseApp,
    external: true,
  },
  {
    src: "/media/originals/Heilpraktiker_Peter_Rauch_Augsburg_Bioresonanz_Trikombin.webp",
    alt: "Hinweisdiagnostik und Frequenzverfahren in der Praxis",
    meta: "Naturheilpraxis Rauch",
    title: "Naturheilkundliche Therapieverfahren",
    cta: "Info zur klassischen Homöopathie",
    href: "/klassische-homoeopathie",
    external: false,
  },
  {
    src: "/media/originals/Koerperliche_und_Emotionale_Gesundheit_Naturheilpraxis_Augsburg.webp",
    alt: "Ruhe und Gespräch in der Naturheilpraxis",
    meta: "Naturheilpraxis Rauch",
    title: "Selbstbewusstsein und emotionale Freiheit",
    cta: "Info: Erschöpfung & Burnout",
    href: "/psychotherapie-augsburg",
    external: false,
  },
  {
    src: "/media/originals/Naturheilpraxis_Augsburg_Zen_1.webp",
    alt: "Ruhige Praxisatmosphäre in Augsburg-Hochzoll",
    meta: "Heilpraktiker Rauch",
    title: "Naturheilkundliche Verfahren in Augsburg",
    cta: "Info zur Informationstherapie",
    href: "/biophysikalische-informationstherapie-bit",
    external: false,
  },
] as const;
