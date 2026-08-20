/**
 * Breitenberger-Inhaltsmaschine: die drei Anliegen-Hubs.
 * Vorgabe: docs/design-a-plus-c/07-breitenberger-inhaltsmaschine.md
 * Akzeptanz je Seite: Title = Anliegen + Augsburg, Above-the-fold
 * (wer, für wen, wo, was nicht), Symptome / Einordnung / Verfahren,
 * Byline + Quelle, FAQ 3–6, NAP, ein Clay-CTA.
 * HWG-strenger formulieren als der Wettbewerb: keine Heilversprechen,
 * keine Indikations-Claims, Grenzen klar benennen.
 */

export type AnliegenSpoke = { name: string; href: string; text: string };

export type Anliegen = {
  slug: string;
  /** H1 auf der Seite: Anliegen + „in Augsburg“ */
  h1: string;
  /** Kurzform für Menü / Footer */
  navLabel: string;
  image: string;
  imageAlt: string;
  /** Eine zitierfähige Definition (Klartext für AI Overviews / GEO). */
  kurz: string;
  /** Above-the-fold: wer, für wen, wo, was es nicht ist. */
  facts: { label: string; text: string }[];
  /** Symptom-Intent: Anliegen, mit denen Menschen suchen – ohne Claims. */
  symptome: { titel: string; text: string }[];
  /** Einordnung: was die Praxis ergänzend tut und was vorher stehen muss. */
  einordnung: string[];
  /** Verfahrens-Seiten (Geräte-URLs stützen das Anliegen, nicht umgekehrt). */
  spokes: AnliegenSpoke[];
  /** Was die Praxis anbietet. */
  bietet: string[];
  /** Was die Praxis ausdrücklich NICHT tut – Grenzen ohne Wenn und Aber. */
  nichtBietet: string[];
  /** Nächster Schritt in drei Etappen. */
  schritte: { titel: string; text: string }[];
  /** Hub-spezifische FAQ (3–6). */
  faqs: { q: string; a: string }[];
  quelle: string;
};

export const anliegen: Record<string, Anliegen> = {
  "/schmerztherapie-augsburg": {
    slug: "/schmerztherapie-augsburg",
    h1: "Schmerztherapie in Augsburg",
    navLabel: "Schmerztherapie Augsburg",
    image: "/images/manuelle-therapie.jpg",
    imageAlt: "Manuelle Behandlung in der Naturheilpraxis Rauch",
    kurz:
      "Die Schmerztherapie der Naturheilpraxis Rauch in Augsburg-Hochzoll begleitet chronische und wiederkehrende Schmerzen ergänzend – mit manuellen Verfahren, Naturheilkunde und Gespräch. Sie ersetzt keine ärztliche Diagnose und keine Behandlung, die Sie bereits erhalten.",
    facts: [
      {
        label: "Wer",
        text: "Peter Rauch, Heilpraktiker (Erlaubnis seit 2006) und Physiotherapeut (seit 2001).",
      },
      {
        label: "Für wen",
        text: "Menschen mit länger bestehenden Rücken-, Gelenk- und Muskelbeschwerden, deren Ursachen ärztlich abgeklärt oder in Abklärung sind.",
      },
      {
        label: "Wo",
        text: "Naturheilpraxis Rauch, Friedrich-Deffner-Straße 19a, 86163 Augsburg-Hochzoll – erreichbar aus Friedberg und Lechhausen-Ost.",
      },
      {
        label: "Was dies nicht ist",
        text: "Kein Notfallweg, keine Bildgebung, kein Ersatz für Ärztin oder Arzt und keine Umstellung Ihrer Medikamente.",
      },
    ],
    symptome: [
      {
        titel: "Rücken und Kreuz",
        text: "Wiederkehrende Beschwerden im unteren Rücken, die den Alltag und die Bewegung einschränken.",
      },
      {
        titel: "Nacken und Schultern",
        text: "Verspannungen, die morgens beginnen oder unter Belastung zunehmen und oft mit Kopfbeschwerden einhergehen.",
      },
      {
        titel: "Gelenke",
        text: "Knie, Hüfte, Hand oder Fuß – Beschwerden, die bei Bewegung und Ruhe unterschiedlich auftreten.",
      },
      {
        titel: "Muskuläre Verspannungen",
        text: "Hartnäckige Verhärtungen, die durch Übungen allein nicht nachlassen und immer wiederkehren.",
      },
      {
        titel: "Wiederkehrende Kopfbeschwerden",
        text: "Spannungsbedingte Kopfbeschwerden, ärztlich abgeklärt, aber im Alltag belastend.",
      },
      {
        titel: "Schmerz mit Stimmung und Schlaf",
        text: "Wenn Schmerz, Schlaf und Anspannung sich gegenseitig verstärken und der Alltag eng wird.",
      },
    ],
    einordnung: [
      "Schmerz ist ein Signal. Ist er länger da, verändert er sich: Der Körper behält das Muster bei, auch wenn die ursprüngliche Ursache ausgeheilt sein kann. Deshalb beginnt jede Begleitung bei mir mit der Frage, was ärztlich bereits geklärt ist – und was noch geklärt werden sollte.",
      "Warnzeichen gehören vorab in ärztliche Hände: Lähmungen, Taubheitsgefühle, Blasen- oder Darmstörungen, Fieber, ungewollter Gewichtsverlust, ein Sturz oder Unfall mit anschließenden Schmerzen. Diese Fälle kläre ich nicht manuell, sondern empfehle konsequent die ärztliche Abklärung.",
      "Ergänzend arbeite ich mit manuellen Verfahren wie Osteopathie und Integrativer Manual Therapy, mit Naturheilkunde und – wenn es passt – mit Gespräch und Hypnotherapie. Behutsam, im Rahmen des heilpraktischen Auftrags und ohne Heilversprechen. Ziel ist mehr Beweglichkeit und Wohlbefinden im Alltag, nicht das Ersetzen Ihrer Ärztin oder Ihres Arztes.",
    ],
    spokes: [
      {
        name: "Osteopathie",
        href: "/osteopathie-techniken",
        text: "Manuelle Techniken für Bewegungsapparat und Gewebe – ergänzend, ohne Heilzusage.",
      },
      {
        name: "Manuelle Verfahren im Überblick",
        href: "/manuelle-therapieverfahren-uebersicht",
        text: "Osteopathie, IMT, Lowen Systems: welche Hände wann arbeiten.",
      },
      {
        name: "Naturheilkunde",
        href: "/naturheilkunde",
        text: "Homöopathie, Pflanzen und Injektionen im heilpraktischen Rahmen.",
      },
      {
        name: "Hypnotherapie",
        href: "/hypnotherapie-augsburg",
        text: "Entspannung und Umgang mit Anspannung, wenn Schmerz und Psyche zusammenhängen.",
      },
    ],
    bietet: [
      "Ausführliche Anamnese im Erstgespräch (60–90 Minuten) mit Blick auf Vorgeschichte, Alltag und Befunde",
      "Manuelle Behandlung im Rahmen meiner Ausbildungen als Physiotherapeut und Heilpraktiker",
      "Übungen und Alltagshinweise für die Zeit zwischen den Terminen",
      "Abstimmung mit behandelnden Ärztinnen, Ärzten und Therapeutinnen, wenn Sie das wünschen",
      "Ehrliche Rückmeldung, wenn eine Beschwerde zuerst ärztlich geklärt werden sollte",
    ],
    nichtBietet: [
      "Keine Notfallversorgung – bei akuten Warnzeichen 112, sonst Bereitschaftsdienst 116 117",
      "Keine Bildgebung (MRT, Röntgen) und keine Labordiagnostik",
      "Keine Umstellung oder Absetzung von Medikamenten – das bleibt ärztliche Entscheidung",
      "Keine manuelle Behandlung ungeklärter Warnzeichen",
      "Keine Heilversprechen und keine Garantie auf ein bestimmtes Ergebnis",
    ],
    schritte: [
      {
        titel: "1. Erstgespräch",
        text: "60–90 Minuten Zeit. Sie schildern Ihr Anliegen, ich schaue auf Vorgeschichte, Befunde und Alltag. Vorab können Sie den Online-Anamnesebogen ausfüllen.",
      },
      {
        titel: "2. Ergänzende Verfahren",
        text: "Je nach Befund manuelle Techniken, Naturheilkunde oder Gespräch – behutsam und in Ihrem Tempo.",
      },
      {
        titel: "3. Review",
        text: "Nach wenigen Terminen schauen wir gemeinsam: Was trägt? Was braucht ärztliche Klärung? Wie geht es weiter?",
      },
    ],
    faqs: [
      {
        q: "Brauche ich eine Überweisung zu Ihnen?",
        a: "Nein, als Heilpraktiker arbeite ich ohne Überweisung. Sinnvoll ist es aber, vorhandene Befunde (Bildgebung, Arztberichte, Medikamentenliste) mitzubringen. Und: Warnzeichen wie Lähmungen, Taubheitsgefühle oder Fieber gehören vorab ärztlich abgeklärt.",
      },
      {
        q: "Ersetzt die Behandlung meine ärztliche Schmerztherapie?",
        a: "Nein. Ich arbeite ergänzend. Ihre verordneten Medikamente und ärztlichen Behandlungen bleiben unverändert – Änderungen besprechen Sie ausschließlich mit Ihrer Ärztin oder Ihrem Arzt.",
      },
      {
        q: "Was kostet die Begleitung?",
        a: "Die Behandlung ist eine Privatleistung. Das Erstgespräch dauert in der Regel 60–90 Minuten; einen konkreten Kostenrahmen nenne ich im Gespräch. Ob Krankenkasse, Beihilfe oder Zusatzversicherung erstattet, hängt von Ihrem Vertrag ab.",
      },
      {
        q: "Wie viele Termine sind nötig?",
        a: "Das hängt vom Anliegen ab und lässt sich vorher nicht seriös zusagen. Nach wenigen Terminen schauen wir gemeinsam, was trägt – und ob etwas anders oder zusätzlich gebraucht wird.",
      },
      {
        q: "Wo liegt die Praxis und wie erreiche ich sie?",
        a: "In Augsburg-Hochzoll, Friedrich-Deffner-Straße 19a. Von Friedberg und Lechhausen-Ost ist sie in wenigen Minuten erreichbar; die S-Bahn-Haltestelle Hochzoll liegt in der Nähe. Termine telefonisch unter 0821 2621462.",
      },
    ],
    quelle: "Redaktion: Naturheilpraxis Peter Rauch, Augsburg-Hochzoll · Geprüft: August 2026",
  },

  "/psychotherapie-augsburg": {
    slug: "/psychotherapie-augsburg",
    h1: "Erschöpfung und Burnout in Augsburg",
    navLabel: "Erschöpfung & Burnout",
    image: "/images/ruhe.jpg",
    imageAlt: "Ruhiger Gesprächsplatz in der Naturheilpraxis Rauch",
    kurz:
      "Bei Erschöpfung, Burnout und anhaltender seelischer Belastung bietet die Naturheilpraxis Rauch in Augsburg-Hochzoll ergänzende Gesprächs- und naturheilkundliche Begleitung. Sie ersetzt weder Arztbesuch noch approbierte Psychotherapie.",
    facts: [
      {
        label: "Wer",
        text: "Peter Rauch, Heilpraktiker (Erlaubnis seit 2006) und Physiotherapeut (seit 2001), zusätzlich Hypnotherapeut.",
      },
      {
        label: "Für wen",
        text: "Menschen mit Erschöpfung, Schlafproblemen, innerer Unruhe und anhaltender Belastung, die ergänzend begleitet werden möchten.",
      },
      {
        label: "Wo",
        text: "Naturheilpraxis Rauch, Friedrich-Deffner-Straße 19a, 86163 Augsburg-Hochzoll – erreichbar aus Friedberg und Lechhausen-Ost.",
      },
      {
        label: "Was dies nicht ist",
        text: "Keine approbierte Psychotherapie, keine Psychiatrie, keine Akutversorgung in Krisen.",
      },
    ],
    symptome: [
      {
        titel: "Tagesmüdigkeit trotz Schlaf",
        text: "Morgens erschöpft aufwachen, über den Tag kaum Kraft – über Wochen und Monate.",
      },
      {
        titel: "Innere Unruhe und Grübeln",
        text: "Gedankenkreisen, Anspannung abends, ein Gefühl von Getriebensein ohne Pause.",
      },
      {
        titel: "Antriebslosigkeit",
        text: "Dinge, die früher selbstverständlich waren, kosten heute Überwindung.",
      },
      {
        titel: "Erschöpfung im Beruf",
        text: "Belastung, die aus der Arbeit mitgenommen wird und am Wochenende nicht abgebaut wird.",
      },
      {
        titel: "Schlafstörungen",
        text: "Ein- und Durchschlafprobleme, unruhige Nächte mit Folge am Tag.",
      },
      {
        titel: "Körper und Belastung zusammen",
        text: "Verspannungen, Kopf oder Verdauung, die mit Stress und Anspannung einhergehen.",
      },
    ],
    einordnung: [
      "Erschöpfung und Burnout sind keine Diagnosen, die eine Website stellen kann. Wenn Beschwerden wie niedergedrückte Stimmung, Angst oder starke Erschöpfung länger anhalten, gehört das ärztlich und – wenn nötig – psychiatrisch oder psychotherapeutisch abgeklärt. Diese Seite beschreibt, was ich ergänzend anbieten kann, nicht was Sie stattdessen bräuchten.",
      "In der Praxis beginne ich mit einem ausführlichen Erstgespräch: Was belastet, wie lange schon, was wurde geklärt, was trägt bisher? Daraus entwickeln wir gemeinsam, ob begleitende Gesprächsführung, Hypnotherapie oder stützende Naturheilkunde passen kann – behutsam und ohne Heilversprechen.",
      "Wichtig in Krisen: Bei akuter Selbst- oder Fremdgefährdung wählen Sie sofort die 112. Außerhalb der Sprechzeit erreicht Sie der kassenärztliche Bereitschaftsdienst unter 116 117; die Telefonseelsorge ist rund um die Uhr unter 0800 111 0 111 erreichbar.",
    ],
    spokes: [
      {
        name: "Hypnotherapie",
        href: "/hypnotherapie-augsburg",
        text: "Entspannungsfokussierte Gesprächshypnose bei innerer Unruhe und Belastung.",
      },
      {
        name: "Naturheilkunde",
        href: "/naturheilkunde",
        text: "Stützende naturheilkundliche Begleitung im heilpraktischen Rahmen.",
      },
      {
        name: "So arbeite ich",
        href: "/so-arbeite-ich",
        text: "Ablauf vom Erstgespräch bis zur gemeinsamen Review.",
      },
      {
        name: "Erstgespräch & Kosten",
        href: "/erstgespraech",
        text: "Dauer, Ablauf und Kostenrahmen des ersten Termins.",
      },
    ],
    bietet: [
      "Ausführliches Erstgespräch mit Zeit für das, was Sie belastet",
      "Begleitende Gesprächsführung und Hypnotherapie nach individueller Anamnese",
      "Stützende Naturheilkunde, wenn Körper und Belastung zusammenhängen",
      "Weitervermittlung zu ärztlicher, psychiatrischer oder psychotherapeutischer Versorgung, wenn das nötig ist",
      "Vertraulichkeit: Ich unterliege als Heilpraktiker der Schweigepflicht",
    ],
    nichtBietet: [
      "Keine approbierte Psychotherapie und keine psychiatrische Behandlung",
      "Keine Diagnosen wie Depression oder Angststörung – das gehört ärztlich geklärt",
      "Keine Akut- oder Krisenversorgung – 112, 116 117, Telefonseelsorge 0800 111 0 111",
      "Kein Absetzen oder Ändern verordneter Medikamente",
      "Keine Heilversprechen und keine Garantie auf ein bestimmtes Ergebnis",
    ],
    schritte: [
      {
        titel: "1. Erstgespräch",
        text: "60–90 Minuten Zeit für Ihr Anliegen – was belastet, wie lange schon, was wurde geklärt. Vorab können Sie den Online-Anamnesebogen ausfüllen.",
      },
      {
        titel: "2. Ergänzende Begleitung",
        text: "Je nach Anamnese begleitende Gesprächsführung, Hypnotherapie oder stützende Naturheilkunde.",
      },
      {
        titel: "3. Review und Netz",
        text: "Gemeinsam prüfen, was trägt. Bei klar ärztlichem oder psychotherapeutischem Bedarf vermittle ich weiter.",
      },
    ],
    faqs: [
      {
        q: "Ersetzt diese Begleitung eine Psychotherapie?",
        a: "Nein. Ich bin Heilpraktiker, kein approbierter Psychotherapeut. Meine Arbeit ist ergänzend. Wenn eine ärztliche, psychiatrische oder psychotherapeutische Abklärung oder Behandlung nötig ist, spreche ich das offen an und helfe bei der Weitervermittlung.",
      },
      {
        q: "Was passiert im Erstgespräch?",
        a: "Wir nehmen uns 60–90 Minuten Zeit. Sie schildern Ihr Anliegen, ich frage nach Vorgeschichte, Schlaf, Alltag und bereits geklärten Ursachen. Gemeinsam schauen wir, welche ergänzende Begleitung infrage kommt.",
      },
      {
        q: "Was kostet die Begleitung?",
        a: "Die Behandlung ist eine Privatleistung. Einen konkreten Kostenrahmen für das Erstgespräch nenne ich im Gespräch. Ob Krankenkasse, Beihilfe oder Zusatzversicherung erstattet, hängt von Ihrem Vertrag ab.",
      },
      {
        q: "Ist alles, was ich erzähle, vertraulich?",
        a: "Ja. Als Heilpraktiker unterliege ich der Schweigepflicht. Was Sie im Gespräch anvertrauen, bleibt in der Praxis.",
      },
      {
        q: "Wann sollte ich lieber sofort ärztliche Hilfe suchen?",
        a: "Bei akuter Selbst- oder Fremdgefährdung sofort die 112 wählen. Außerhalb der Sprechzeit erreicht Sie der Bereitschaftsdienst unter 116 117, die Telefonseelsorge rund um die Uhr unter 0800 111 0 111. Meine Praxis ist kein Krisenweg.",
      },
    ],
    quelle: "Redaktion: Naturheilpraxis Peter Rauch, Augsburg-Hochzoll · Geprüft: August 2026",
  },

  "/naet-methode-allergie-behandlung": {
    slug: "/naet-methode-allergie-behandlung",
    h1: "Allergien und Unverträglichkeiten in Augsburg",
    navLabel: "Allergie / NAET",
    image: "/images/naturheilkunde.jpg",
    imageAlt: "Naturheilkundliche Begleitung bei Unverträglichkeiten",
    kurz:
      "Bei Allergien und Unverträglichkeiten arbeitet die Naturheilpraxis Rauch in Augsburg-Hochzoll ergänzend – unter anderem mit der NAET-Methode und naturheilkundlicher Begleitung. Die allergologische Diagnose erfolgt ärztlich; die Verfahren der Praxis ersetzen sie nicht.",
    facts: [
      {
        label: "Wer",
        text: "Peter Rauch, Heilpraktiker (Erlaubnis seit 2006) und Physiotherapeut (seit 2001).",
      },
      {
        label: "Für wen",
        text: "Menschen mit bekannter Allergie oder Verdacht auf Unverträglichkeiten, die ergänzend naturheilkundlich begleitet werden möchten.",
      },
      {
        label: "Wo",
        text: "Naturheilpraxis Rauch, Friedrich-Deffner-Straße 19a, 86163 Augsburg-Hochzoll – erreichbar aus Friedberg und Lechhausen-Ost.",
      },
      {
        label: "Was dies nicht ist",
        text: "Keine Allergiediagnostik, kein Ersatz für Notfallmedizin und keinen Behandlungsplan Ihres Arztes.",
      },
    ],
    symptome: [
      {
        titel: "Heuschnupfen in der Pollensaison",
        text: "Jährlich wiederkehrende Beschwerden von Nase und Augen in der Pollenzeit.",
      },
      {
        titel: "Verdacht auf Nahrungsmittel-Unverträglichkeit",
        text: "Wiederkehrende Beschwerden nach bestimmten Lebensmitteln, ohne dass die Ursache geklärt ist.",
      },
      {
        titel: "Hautreaktionen",
        text: "Juckreiz oder Quaddeln, ärztlich abgeklärt, aber im Alltag wiederkehrend.",
      },
      {
        titel: "Verdauungsbeschwerden",
        text: "Blähungen oder Unwohlsein, die im Zusammenhang mit der Ernährung auftreten.",
      },
      {
        titel: "Bekannte Allergie, beschwerlicher Alltag",
        text: "Allergie ist ärztlich bekannt – und Sie suchen ergänzend eine naturheilkundliche Begleitung.",
      },
    ],
    einordnung: [
      "Wichtig vorweg: Die Diagnose einer Allergie gehört in ärztliche Hände – über Hauttests oder Blutwerte beim Allergologen. Keines der Verfahren in meiner Praxis ersetzt diese Diagnostik. Ich arbeite ergänzend, mit dem, was bereits geklärt ist.",
      "NAET (Nambudripad’s Allergy Elimination Techniques) ist ein ergänzendes naturheilkundliches Verfahren aus Kinesiologie und Akupunkturlehre. Es ist schulmedizinisch nicht anerkannt; Wirksamkeitsnachweise im wissenschaftlichen Sinne liegen nicht vor. Ich ordne das offen ein – und arbeite mit NAET nur, wenn Sie das nach dieser Einordnung möchten.",
      "Besonders bei bekannten schweren allergischen Reaktionen gilt: Notfallmedikamente und Notfallplan Ihrer Ärztin oder Ihres Arztes haben immer Vorrang. Von verordneten Medikamenten setze ich nichts ab und ändere nichts – das bleibt ärztliche Entscheidung.",
    ],
    spokes: [
      {
        name: "Naturheilkunde",
        href: "/naturheilkunde",
        text: "Der ergänzende Rahmen: Homöopathie, Pflanzen, Injektionen.",
      },
      {
        name: "Bioresonanz",
        href: "/bioresonanz-therapie",
        text: "Hinweisgebend, kein Laborersatz – ehrlich eingeordnet.",
      },
      {
        name: "Naturheilkundliche Darmsanierung",
        href: "/naturheilkundliche-darmsanierung",
        text: "Begleitung, wenn Verdauung und Unverträglichkeiten zusammenhängen.",
      },
      {
        name: "Hinweisdiagnostik im Überblick",
        href: "/diagnostik-informationstherapie",
        text: "NLS, EAV, Bioresonanz – Grenzen der Verfahren im Überblick.",
      },
    ],
    bietet: [
      "Ausführliche Anamnese mit Blick auf bekannte Allergien, Ernährung und Alltag",
      "Ergänzende Begleitung mit der NAET-Methode – nach offener Einordnung",
      "Naturheilkundliche Begleitung des Umfelds: Verdauung, Schleimhaut, Ernährungsalltag",
      "Zusammenarbeit mit Ihrer Ärztin oder Ihrem Arzt auf Ihren Wunsch",
      "Klare Grenzen: Was hier nicht stattfindet, sage ich vorher",
    ],
    nichtBietet: [
      "Keine Allergiediagnostik – Haut- und Bluttests gehören zum Allergologen",
      "Keine Behandlung oder Beurteilung anaphylaktischer Reaktionen – hier gilt immer der ärztliche Notfallplan",
      "Kein Absetzen oder Ändern verordneter Medikamente (auch nicht der Notfallmedizin)",
      "Keine Aussagen wie „allergiefrei nach X Sitzungen“ – solche Schemata gebe ich nicht ab",
      "Keine Heilversprechen und keine Garantie auf ein bestimmtes Ergebnis",
    ],
    schritte: [
      {
        titel: "1. Erstgespräch",
        text: "60–90 Minuten: bekannte Allergien, Befunde, Ernährungsalltag und Beschwerden. Vorab können Sie den Online-Anamnesebogen ausfüllen.",
      },
      {
        titel: "2. Ergänzende Begleitung",
        text: "Nach offener Einordnung: NAET und stützende Naturheilkunde – in Ihrem Tempo, ohne Zeitdruck.",
      },
      {
        titel: "3. Review",
        text: "Gemeinsam schauen, was trägt und was sich verändert – und was ärztlich weiter begleitet werden sollte.",
      },
    ],
    faqs: [
      {
        q: "Was ist NAET?",
        a: "NAET (Nambudripad’s Allergy Elimination Techniques) ist ein ergänzendes naturheilkundliches Verfahren, das Elemente aus Kinesiologie und Akupunkturlehre verbindet. Es ist schulmedizinisch nicht anerkannt; Wirksamkeitsnachweise liegen nicht vor. Ich arbeite damit nur, wenn Sie das nach dieser Einordnung möchten.",
      },
      {
        q: "Ersetzt NAET den Allergietest beim Arzt?",
        a: "Nein. Die allergologische Diagnose – Hauttest oder Blutwerte – gehört in ärztliche Hände. Die Verfahren in meiner Praxis sind ergänzend und setzen eine ärztliche Abklärung nicht überflüssig, sondern voraus.",
      },
      {
        q: "Wie läuft die Begleitung ab?",
        a: "Nach dem Erstgespräch mit Anamnese entscheiden wir gemeinsam, ob NAET und stützende Naturheilkunde für Sie infrage kommen. Die Sitzungen selbst sind ruhig und ohne Zeitdruck.",
      },
      {
        q: "Was kostet die Begleitung?",
        a: "Die Behandlung ist eine Privatleistung. Das Erstgespräch dauert in der Regel 60–90 Minuten; den Kostenrahmen nenne ich im Gespräch. Erstattung hängt von Ihrem Versicherungsvertrag ab.",
      },
      {
        q: "Kann ich meine Notfallmedizin absetzen, wenn es besser läuft?",
        a: "Nein. Verordnete Medikamente – insbesondere Notfallmedikamente bei schweren allergischen Reaktionen – dürfen ausschließlich mit Ihrer Ärztin oder Ihrem Arzt geändert oder abgesetzt werden. Daran ändert die Begleitung in meiner Praxis nichts.",
      },
    ],
    quelle: "Redaktion: Naturheilpraxis Peter Rauch, Augsburg-Hochzoll · Geprüft: August 2026",
  },
};
