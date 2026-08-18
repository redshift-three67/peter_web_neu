import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { homeSlides } from "@/content/slides";
import { useSwipe } from "@/lib/swipe";

const glassCard =
  "rounded-2xl border border-paper/45 bg-paper/70 shadow-card backdrop-blur-md";

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

  const isClay =
    slide.href.includes("anamnes") || slide.href.includes("lovable");
  const ctaClass = isClay
    ? "mt-3 inline-flex min-h-11 items-center rounded-lg bg-clay px-5 text-sm font-medium text-paper hover:bg-clay-deep"
    : "mt-3 inline-flex min-h-11 items-center rounded-lg bg-field px-5 text-sm font-medium text-paper hover:bg-ink";

  const goPrev = () =>
    setIndex((i) => (i - 1 + homeSlides.length) % homeSlides.length);
  const goNext = () => setIndex((i) => (i + 1) % homeSlides.length);
  const swipe = useSwipe(goPrev, goNext);

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="Karussell"
      aria-label="Einblick in die Praxis"
      onPointerDown={swipe.onPointerDown}
      onPointerUp={swipe.onPointerUp}
      onPointerCancel={swipe.onPointerCancel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={swipe.style}
    >
      <div className="relative h-[40svh] min-h-[240px] sm:h-[46svh] md:h-[50svh] lg:h-[52svh]">
        {homeSlides.map((item, i) => (
          <img
            key={`${item.src}-${item.meta}`}
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

        <div className="absolute inset-0 bg-gradient-to-r from-field/70 via-field/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-field/35 to-transparent" />

        <div className="absolute left-3 top-3 z-10 max-w-[min(20.5rem,calc(100%-1.5rem))] sm:left-5 sm:top-5 sm:max-w-[min(26rem,calc(100%-3rem))] md:left-6 md:top-6 lg:max-w-[28rem]">
          <div className={`${glassCard} w-fit px-3.5 py-2.5 sm:px-4 sm:py-3`}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sage sm:text-xs">
              Augsburg-Hochzoll · Friedberg · Lechhausen
            </p>
            <h1 className="mt-1 font-display text-[1.35rem] font-medium leading-[1.18] text-ink sm:text-[1.75rem] md:text-[2rem] lg:text-[2.15rem]">
              Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch
            </h1>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 md:bottom-6 md:left-6">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-paper/50 bg-paper/25 text-paper backdrop-blur-sm hover:bg-paper hover:text-sage-700"
            aria-label="Vorheriges Motiv"
            onClick={goPrev}
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
            onClick={goNext}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <aside className="absolute bottom-16 right-3 z-20 hidden w-fit max-w-[min(22rem,calc(100%-4.5rem))] md:bottom-6 md:right-6 md:block">
          <OverlayCard slide={slide} ctaClass={ctaClass} />
        </aside>
      </div>

      <div className="px-3 py-3 md:hidden">
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
    <div className={`${glassCard} w-fit max-w-full px-4 py-3 sm:px-5 sm:py-4`}>
      <p className="font-display text-lg font-medium leading-snug text-ink sm:text-xl md:text-[1.35rem]">
        {slide.meta}
      </p>
      <p className="mt-1.5 text-base leading-relaxed text-ink/75">{slide.title}</p>
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
