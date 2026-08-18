import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  AuthorByline,
  Container,
  Disclaimer,
  FaqList,
  ReviewStrip,
} from "@/components/site/Shared";
import { practice, practiceFaqs } from "@/content/site";

const topics = [
  { to: "/schmerztherapie-augsburg", label: "Schmerz & Bewegung" },
  { to: "/naet-methode-allergie-behandlung", label: "Allergie" },
  { to: "/psychotherapie-augsburg", label: "Erschöpfung & Psyche" },
  { to: "/naturheilkunde-augsburg", label: "Naturheilkunde" },
  { to: "/nls-diagnostik", label: "NLS-Hinweis" },
  { to: "/hypnotherapie-augsburg", label: "Hypnose" },
];

export function HomeAc() {
  return (
    <>
      <section className="bg-[#F7F1E8] px-4 pb-8 pt-16 text-center sm:pt-20">
        <p className="text-xs tracking-[0.2em] text-[#6B6560] uppercase">
          Heilpraktiker · Augsburg-Hochzoll
        </p>
        <h1 className="mx-auto mt-5 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.08] tracking-[-0.03em] text-[#2C2825] sm:text-6xl md:text-7xl">
          Zuhören. Einordnen.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#6B6560]">
          Peter Rauch begleitet in der Friedrich-Deffner-Straße – ergänzend zur
          ärztlichen Versorgung, ohne Heilversprechen.
        </p>
      </section>

      <section className="bg-[#F7F1E8] px-4 pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem]">
          <img
            src="/images/gespraech.jpg"
            alt="Gespräch – Sinnbild, nicht ein konkreter Patient der Praxis"
            className="aspect-[16/8] w-full object-cover object-center sm:aspect-[21/9]"
            width={1600}
            height={700}
          />
        </div>
      </section>

      <section className="bg-[#F7F1E8] pb-6">
        <Container>
          <div className="grid items-center gap-8 rounded-[1.75rem] bg-[#F3EBE0] px-5 py-6 md:grid-cols-[17rem_1fr] md:px-8">
            <Link to="/erstgespraech" className="group relative overflow-hidden rounded-2xl">
              <img
                src="/images/anfahrt.jpg"
                alt="Praxiszugang Friedrich-Deffner-Straße, Augsburg-Hochzoll"
                className="aspect-[5/4] w-full object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent px-4 py-3 text-sm text-white">
                Erstgespräch
                <span className="grid size-8 place-items-center rounded-full bg-white text-[#2C2825] transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    className="flex items-center justify-between border-b border-[#2C2825]/10 py-2 text-[1.05rem] text-[#2C2825] hover:opacity-60"
                  >
                    {t.label}
                    <ArrowRight className="size-4 opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="oura-shift bg-[#EFEBE4] py-20">
        <Container className="max-w-3xl text-center">
          <p className="text-xs tracking-[0.2em] text-[#6B6560] uppercase">Person, nicht Gerät</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-[#2C2825] sm:text-5xl">
            Drei Anliegen.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#6B6560]">
            Schmerz, Allergie, Erschöpfung – so kommen die Menschen nach
            Hochzoll, Friedberg und Lechhausen. Verfahren ordne ich danach zu.
          </p>
        </Container>
        <Container className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              to: "/schmerztherapie-augsburg",
              img: "/images/manuelle-therapie.jpg",
              alt: "Manuelle Behandlung",
              t: "Schmerz",
              d: "Hände zuerst. Bildgebung bleibt beim Arzt.",
            },
            {
              to: "/naet-methode-allergie-behandlung",
              img: "/images/naturheilkunde.jpg",
              alt: "Pflanzliche Zubereitung, Sinnbild",
              t: "Allergie",
              d: "Hinweisdiagnostik, kein Laborersatz.",
            },
            {
              to: "/psychotherapie-augsburg",
              img: "/images/free/raum-licht.jpg",
              alt: "Ruhiger Sitzplatz, Atmosphäre",
              t: "Psyche",
              d: "Zuhören, dann erst Verfahren.",
            },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group block">
              <img
                src={c.img}
                alt={c.alt}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <h3 className="mt-4 font-display text-2xl font-medium text-[#2C2825]">{c.t}</h3>
              <p className="mt-1 text-base text-[#6B6560]">{c.d}</p>
            </Link>
          ))}
        </Container>
      </section>

      <section className="oura-shift bg-[#F7F1E8] py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#6B6560] uppercase">Vor Ort</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-[#2C2825]">
              Friedrich-Deffner-Straße 19a
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#6B6560]">
              Augsburg-Hochzoll. Gut erreichbar aus {practice.reach.join(", ")}.
            </p>
            <Link
              to="/anfahrt"
              className="mt-6 inline-flex items-center gap-2 text-sm text-[#2C2825] underline-offset-4 hover:underline"
            >
              Anfahrt & Parken <ArrowRight className="size-4" />
            </Link>
          </div>
          <img
            src="/images/anfahrt.jpg"
            alt="Zugang zur Naturheilpraxis Rauch, Augsburg-Hochzoll"
            className="aspect-[5/4] w-full rounded-2xl object-cover"
          />
        </Container>
      </section>

      <section className="oura-shift bg-[#EFEBE4] py-16">
        <Container className="max-w-3xl">
          <h2 className="text-center font-display text-3xl font-medium text-[#2C2825]">
            Klarheit vor dem ersten Anruf
          </h2>
          <div className="mt-8">
            <FaqList items={practiceFaqs} />
          </div>
        </Container>
      </section>

      <ReviewStrip />

      <Container className="py-12">
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
    </>
  );
}
