import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt?: string;
  title?: string;
  meta?: string;
};

import { useMusterSkin } from "./DesignSkin";

const glassLegacy =
  "rounded-2xl border border-paper/40 bg-sage-50/55 shadow-card backdrop-blur-md";
const glassAc =
  "rounded-2xl border border-paper/50 bg-paper/70 shadow-card backdrop-blur-md";

export function PageHeroSlider({
  slides,
  heading,
  kicker = "Entwurf · nicht indexiert",
}: {
  slides: HeroSlide[];
  heading: string;
  kicker?: string;
}) {
  const { ac, neu, diagnostic } = useMusterSkin();
  const modern = ac || neu;
  const items = slides.filter((s) => s.src);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = items[index] ?? items[0];
  const multi = items.length > 1;

  useEffect(() => {
    if (!multi) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [multi, paused, items.length]);

  if (!slide) return null;

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription={multi ? "Karussell" : undefined}
      aria-label="Seitenmotiv"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[38svh] min-h-[220px] sm:h-[44svh] md:h-[48svh]">
        {items.map((item, i) => (
          <img
            key={`${item.src}-${item.meta ?? ""}-${i}`}
            src={item.src}
            alt=""
            aria-hidden={i !== index}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            width={1600}
            height={1000}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div
          className={
            modern && diagnostic
              ? "absolute inset-0 bg-gradient-to-r from-[#1D2C38]/75 via-[#1D2C38]/22 to-transparent"
              : modern
                ? "absolute inset-0 bg-gradient-to-r from-[#16332C]/70 via-[#16332C]/18 to-transparent"
                : "absolute inset-0 bg-gradient-to-r from-sage-800/28 via-sage-700/10 to-transparent"
          }
        />
        <div
          className={
            modern
              ? "absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#1D2C38]/30 to-transparent"
              : "absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-sage-900/25 to-transparent"
          }
        />

        <div className="absolute left-3 top-3 z-10 max-w-[min(20.5rem,calc(100%-1.5rem))] sm:left-5 sm:top-5 sm:max-w-[min(26rem,calc(100%-3rem))] md:left-6 md:top-6 lg:max-w-[28rem]">
          <div className={`${modern ? glassAc : glassLegacy} w-fit px-3.5 py-2.5 sm:px-4 sm:py-3`}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sage sm:text-xs">
              {kicker}
            </p>
            <h1 className="mt-1 font-display text-[1.35rem] font-medium leading-[1.18] text-sage-700 sm:text-[1.75rem] md:text-[2rem]">
              {heading}
            </h1>
          </div>
        </div>

        {multi ? (
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 md:bottom-6 md:left-6">
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-paper/50 bg-paper/25 text-paper backdrop-blur-sm hover:bg-paper hover:text-sage-700"
              aria-label="Vorheriges Motiv"
              onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Slider-Motive">
              {items.map((item, i) => (
                <button
                  key={`${item.src}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Motiv ${i + 1}${item.title ? `: ${item.title}` : ""}`}
                  className="grid size-11 place-items-center"
                  onClick={() => setIndex(i)}
                >
                  <span
                    className={`block h-2 rounded-full ${
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
              onClick={() => setIndex((i) => (i + 1) % items.length)}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        ) : null}

        {(slide.meta || slide.title) && (
          <aside className="absolute bottom-16 right-3 z-20 hidden w-fit max-w-[min(22rem,calc(100%-4.5rem))] md:bottom-6 md:right-6 md:block">
            <SlideCaption meta={slide.meta} title={slide.title} ac={ac} />
          </aside>
        )}
      </div>
      {(slide.meta || slide.title) && (
        <div className="px-3 py-3 md:hidden">
          <SlideCaption meta={slide.meta} title={slide.title} ac={ac} />
        </div>
      )}
    </section>
  );
}

function SlideCaption({
  meta,
  title,
  ac,
}: {
  meta?: string;
  title?: string;
  ac: boolean;
}) {
  return (
    <div className={`${ac ? glassAc : glassLegacy} w-fit max-w-full px-4 py-3 sm:px-5 sm:py-4`}>
      {meta ? (
        <p className="font-display text-lg font-medium leading-snug text-sage-700 sm:text-xl">
          {meta}
        </p>
      ) : null}
      {title ? (
        <p className="mt-1.5 text-base leading-relaxed text-sage-700/80">{title}</p>
      ) : null}
    </div>
  );
}
