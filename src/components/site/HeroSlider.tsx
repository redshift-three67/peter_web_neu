import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { homeSlides } from "@/content/slides";

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

  const ctaClass =
    "mt-3 inline-flex min-h-11 items-center rounded-full bg-sage px-5 text-sm font-medium text-paper hover:bg-sage-600";

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="Karussell"
      aria-label="Einblick in die Praxis"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[40svh] min-h-[240px] sm:h-[46svh] md:h-[50svh] lg:h-[52svh]">
        {homeSlides.map((item, i) => (
          <img
            key={`${item.src}-${item.meta}`}
            src={item.src}
            alt=""
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-sage-800/40 via-sage-700/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-sage-900/30 to-transparent" />

        <div className="absolute inset-x-0 top-0 z-10 px-4 pt-4 sm:px-6 md:pt-7">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-xl rounded-2xl bg-sage-50/92 px-4 py-3 shadow-card backdrop-blur-md sm:px-5 sm:py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
                Augsburg-Hochzoll · Friedberg · Lechhausen
              </p>
              <h1 className="mt-1 font-display text-[1.55rem] font-semibold leading-[1.15] text-sage-700 sm:text-3xl md:text-4xl">
                Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch
              </h1>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 md:bottom-6 md:left-6">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-paper/50 bg-paper/25 text-paper backdrop-blur-sm hover:bg-paper hover:text-sage-700"
            aria-label="Vorheriges Motiv"
            onClick={() =>
              setIndex((i) => (i - 1 + homeSlides.length) % homeSlides.length)
            }
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slider-Motive">
            {homeSlides.map((item, i) => (
              <button
                key={`${item.src}-${item.meta}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Motiv ${i + 1}: ${item.title}`}
                className="grid size-11 place-items-center"
                onClick={() => setIndex(i)}
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-paper" : "w-2 bg-paper/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-paper/50 bg-paper/25 text-paper backdrop-blur-sm hover:bg-paper hover:text-sage-700"
            aria-label="Nächstes Motiv"
            onClick={() => setIndex((i) => (i + 1) % homeSlides.length)}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <aside className="absolute bottom-16 right-3 z-20 hidden w-[22rem] md:bottom-6 md:right-6 md:block lg:w-[24rem]">
          <OverlayCard slide={slide} ctaClass={ctaClass} />
        </aside>
      </div>

      <div className="border-t border-sage-100 bg-sage-50 px-4 py-3 md:hidden">
        <OverlayCard slide={slide} ctaClass={ctaClass} />
      </div>
    </section>
  );
}

function OverlayCard({
  slide,
  ctaClass,
}: {
  slide: (typeof homeSlides)[number];
  ctaClass: string;
}) {
  return (
    <div className="rounded-2xl border border-sage-200 bg-sage-50/95 p-5 shadow-card backdrop-blur-md">
      <p className="font-display text-xl font-semibold text-sage-700 sm:text-2xl">
        {slide.meta}
      </p>
      <p className="mt-2 text-base leading-relaxed text-muted">{slide.title}</p>
      <a
        href={slide.href}
        target={slide.external ? "_blank" : undefined}
        rel={slide.external ? "noreferrer" : undefined}
        className={ctaClass}
      >
        {slide.cta}
      </a>
    </div>
  );
}
