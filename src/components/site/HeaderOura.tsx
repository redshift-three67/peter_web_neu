import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { nav, practice } from "@/content/site";
import { cn } from "@/lib/utils";

const CIRCLE = "#3A6B4F";

export function HeaderOura({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div>
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 transition-colors md:px-5",
          overlay
            ? "h-14 bg-paper/55 shadow-sm ring-1 ring-white/50 backdrop-blur-md md:h-16"
            : "h-12 bg-[#F7F1E8] shadow-[0_10px_32px_-14px_rgba(0,0,0,0.35)] ring-1 ring-black/10 md:h-14",
        )}
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center" onClick={() => setOpen(false)}>
          <img
            src="/media/brand/peter-rauch-logo.svg"
            alt="Peter Rauch – Naturheilpraxis Augsburg"
            className={cn("w-auto", overlay ? "h-7 md:h-8" : "h-6 md:h-7")}
          />
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Hauptnavigation">
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="px-3 py-2 text-sm text-ink/85 underline-offset-[11px] decoration-2 hover:underline"
                  style={{ textDecorationColor: CIRCLE }}
                >
                  {item.label}
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="grid gap-5 rounded-2xl bg-[#F7F1E8] p-5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.28)] ring-1 ring-black/10 md:grid-cols-[15rem_1fr]">
                    <a href={item.children[0]?.to ?? "/"} className="relative overflow-hidden rounded-2xl">
                      <img src="/images/gespraech.jpg" alt="" className="aspect-[5/4] h-full w-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-3 py-2.5 text-sm text-white">
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
                              pathname === child.to && "font-medium underline underline-offset-4",
                            )}
                            style={pathname === child.to ? { textDecorationColor: CIRCLE } : undefined}
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
                  "px-3 py-2 text-sm text-ink/85 underline-offset-[11px] decoration-2 hover:underline",
                  pathname === item.to && "underline",
                )}
                style={{ textDecorationColor: CIRCLE }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${practice.phoneTel}`}
            className="hidden size-10 items-center justify-center rounded-full text-white sm:inline-flex"
            style={{ background: CIRCLE }}
            aria-label="Anrufen"
          >
            <Phone className="size-4" />
          </a>
          <Link
            to="/online-anamnesebogen"
            className="hidden h-10 items-center rounded-full bg-clay px-4 text-sm font-medium text-paper hover:bg-clay-deep md:inline-flex"
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
          className="mx-auto mt-2 max-h-[60vh] max-w-6xl overflow-y-auto rounded-3xl bg-[#F7F1E8] p-3 ring-1 ring-black/10 xl:hidden"
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
    </div>
  );
}
