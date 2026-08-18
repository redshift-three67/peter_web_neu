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

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="Karussell"
      aria-label="Einblick in die Praxis"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[42svh] min-h-[220px] sm:h-[46svh] md:h-[50svh] lg:h-[52svh]">
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

        <div className="absolute inset-0 bg-gradient-to-r from-sage-800/45 via-sage-700/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sage-900/35 to-transparent" />

        <div className="absolute inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6 md:pt-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/85 sm:text-xs">
              Augsburg-Hochzoll · Friedberg · Lechhausen
            </p>
            <h1 className="mt-1.5 max-w-xl font-display text-[1.65rem] font-semibold leading-[1.12] text-paper drop-shadow-sm sm:text-3xl md:max-w-2xl md:text-4xl lg:text-[2.6rem]">
              Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch
            </h1>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 sm:bottom-5 sm:left-6">
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-paper/50 bg-paper/20 text-paper backdrop-blur-sm hover:bg-paper hover:text-sage-700 sm:size-10"
            aria-label="Vorheriges Motiv"
            onClick={() =>
              setIndex((i) => (i - 1 + homeSlides.length) % homeSlides.length)
            }
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-1.5" role="tablist" aria-label="Slider-Motive">
            {homeSlides.map((item, i) => (
              <button
                key={`${item.src}-${item.meta}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Motiv ${i + 1}: ${item.title}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-paper" : "w-2 bg-paper/45"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-paper/50 bg-paper/20 text-paper backdrop-blur-sm hover:bg-paper hover:text-sage-700 sm:size-10"
            aria-label="Nächstes Motiv"
            onClick={() => setIndex((i) => (i + 1) % homeSlides.length)}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <aside className="absolute bottom-14 right-3 z-20 w-[min(92%,20.5rem)] sm:bottom-5 sm:right-6 sm:w-[22rem] md:w-[24rem]">
          <div className="bg-[rgb(35_70_76/0.88)] px-5 py-4 text-paper shadow-elevated sm:px-6 sm:py-5">
            <p className="font-display text-xl font-medium text-[#e4d3a4] sm:text-2xl">
              {slide.meta}
            </p>
            <p className="mt-1 border-t border-paper/25 pt-2 text-sm text-paper/95 sm:text-base">
              {slide.title}
            </p>
            {slide.external ? (
              <a
                href={slide.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block bg-paper px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-sage-700 hover:bg-sand-100"
              >
                {slide.cta}
              </a>
            ) : (
              <a
                href={slide.href}
                className="mt-3 inline-block bg-paper px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-sage-700 hover:bg-sand-100"
              >
                {slide.cta}
              </a>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
