import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, practice } from "@/content/site";
import { cn } from "@/lib/utils";

const CIRCLE = "#3A6B4F";
const NEKO = "#2EA4B8";

export function HeaderOura() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 24);
      if (open) {
        setHidden(false);
        last = y;
        return;
      }
      if (y > last + 10 && y > 80) setHidden(true);
      else if (y < last - 8) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={cn(
        "pointer-events-none sticky top-0 z-50 px-3 pt-3 transition-transform duration-300 sm:px-5",
        hidden && "-translate-y-[120%]",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full bg-paper/95 shadow-[0_8px_30px_-12px_rgba(29,44,56,0.28)] ring-1 ring-ink/5 backdrop-blur-md transition-all",
          compact ? "h-12 px-3 md:h-14 md:px-5" : "h-14 px-4 md:h-16 md:px-6",
        )}
      >
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span
            className="grid size-8 place-items-center rounded-full text-paper md:size-9"
            style={{ background: CIRCLE }}
          >
            <span className="font-display text-sm">R</span>
          </span>
          <span className="font-display text-lg tracking-wide text-ink">Rauch</span>
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Hauptnavigation">
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="px-3 py-2 text-sm text-ink/80 underline-offset-[10px] hover:underline"
                >
                  {item.label}
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="grid gap-5 rounded-2xl bg-paper p-5 shadow-[0_20px_50px_-20px_rgba(29,44,56,0.28)] ring-1 ring-ink/5 md:grid-cols-[15rem_1fr]">
                    <a
                      href={item.children[0]?.to ?? "/"}
                      className="relative overflow-hidden rounded-2xl"
                    >
                      <img
                        src="/images/gespraech.jpg"
                        alt=""
                        className="aspect-[5/4] h-full w-full object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent px-3 py-2.5 text-sm text-white">
                        {item.label}
                        <span
                          className="grid size-7 place-items-center rounded-full text-white"
                          style={{ background: CIRCLE }}
                        >
                          →
                        </span>
                      </span>
                    </a>
                    <ul className="grid content-start grid-cols-2 gap-x-4 gap-y-1">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <a
                            href={child.to}
                            className={cn(
                              "block py-2 text-sm text-ink/80 hover:text-ink",
                              pathname === child.to && "underline underline-offset-4",
                            )}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 text-sm text-ink/80 underline-offset-[10px] hover:underline",
                  pathname === item.to && "underline",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${practice.phoneTel}`}
            className="hidden size-10 items-center justify-center rounded-full text-paper sm:inline-flex"
            style={{ background: CIRCLE }}
            aria-label="Anrufen"
          >
            <Phone className="size-4" />
          </a>
          <Link
            to="/online-anamnesebogen"
            className="hidden h-10 items-center rounded-full px-4 text-sm font-medium text-white md:inline-flex"
            style={{ background: NEKO }}
          >
            Anamnese
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="oura-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menü</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="oura-mobile-nav"
          className="pointer-events-auto mx-auto mt-2 max-h-[70vh] max-w-6xl overflow-y-auto rounded-3xl bg-paper p-3 shadow-elevated xl:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobilnavigation">
            {nav.map((item) =>
              "children" in item ? (
                <div key={item.label} className="px-2 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <a
                      key={child.to}
                      href={child.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm text-ink"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 text-sm text-ink"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
