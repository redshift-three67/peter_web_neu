import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { practice } from "@/content/site";
import { homeSlides } from "@/content/slides";
import { Container } from "@/components/site/Shared";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = homeSlides[index];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % homeSlides.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="Karussell"
      aria-label="Einblick in die Praxis"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {homeSlides.map((item, i) => (
        <img
          key={item.src}
          src={item.src}
          alt=""
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-sage-700/92 via-sage-600/82 to-sage-500/62" />
      <Container className="relative grid min-h-[72vh] items-end py-20 md:min-h-[80vh] md:py-28">
        <div className="max-w-2xl text-paper">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-200">
            Augsburg-Hochzoll · Friedberg · Lechhausen
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-light">
            {slide.meta}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
            Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch
          </h1>
          <p className="mt-3 font-display text-xl text-paper/90 md:text-2xl">
            {slide.title}
          </p>
          <p className="mt-5 max-w-xl text-lg text-paper/85">
            {practice.tagline}. Ich begleite Menschen, die mit Schmerz,
            Allergie oder Erschöpfung bei der Schulmedizin nicht weiterkommen
            – ergänzend, ohne Heilversprechen, mit klaren Grenzen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="clay" size="lg" className="rounded-full shadow-elevated">
              <a href={`tel:${practice.phoneTel}`}>
                <Phone className="size-4" /> Termin: {practice.phoneDisplay}
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-full border-paper/30 bg-paper/15 text-paper hover:bg-paper hover:text-sage-700"
            >
              <Link to="/erstgespraech">Erstgespräch verstehen</Link>
            </Button>
          </div>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-paper/75">
            <span>Physiotherapeut seit 2001</span>
            <span>Heilpraktiker seit 2006</span>
            <span>{practice.experienceYears} Jahre Praxis</span>
          </p>
        </div>
      </Container>
      <div className="absolute bottom-6 right-4 z-10 flex items-center gap-2 sm:right-8">
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-paper/30 bg-paper/15 text-paper hover:bg-paper hover:text-sage-700"
          aria-label="Vorheriges Motiv"
          onClick={() => setIndex((i) => (i - 1 + homeSlides.length) % homeSlides.length)}
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-1.5" role="tablist" aria-label="Slider-Motive">
          {homeSlides.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Motiv ${i + 1}: ${item.title}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-paper" : "w-2 bg-paper/40"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-paper/30 bg-paper/15 text-paper hover:bg-paper hover:text-sage-700"
          aria-label="Nächstes Motiv"
          onClick={() => setIndex((i) => (i + 1) % homeSlides.length)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
