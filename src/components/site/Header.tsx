import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { nav, practice } from "@/content/site";
import { cn } from "@/lib/utils";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" onClick={onClick}>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage text-paper shadow-soft">
        <Leaf className="size-5" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-display text-lg font-semibold leading-tight text-fg">
          Naturheilpraxis
        </span>
        <span className="text-xs text-muted">{practice.person}</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/50 bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 sm:px-6">
        <BrandMark onClick={() => setOpen(false)} />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Hauptnavigation"
        >
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-sage-100 hover:text-sage-700"
                >
                  {item.label}
                </button>
                <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-xl border border-line bg-paper p-2 opacity-0 shadow-elevated transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm hover:bg-sage-100",
                        pathname === child.to
                          ? "bg-sage-100 text-sage-700"
                          : "text-fg",
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors hover:bg-sage-100 hover:text-sage-700",
                  pathname === item.to
                    ? "bg-sage-100 text-sage-700"
                    : "text-fg/80",
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
            className="hidden h-10 items-center gap-2 rounded-full bg-sage px-4 text-sm font-medium text-paper shadow-soft hover:bg-sage-600 sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            Anrufen
          </a>
          {isPending ? (
            <div className="hidden size-8 animate-pulse rounded-full bg-sand md:block" />
          ) : user ? (
            <div className="hidden md:block">
              <UserButton />
            </div>
          ) : null}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-paper text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menü</span>
          </button>
        </div>
      </div>

      <div className="hidden border-t border-line/60 bg-sage-50/80 md:block">
        <div className="mx-auto flex min-h-12 max-w-6xl flex-wrap items-center gap-2 px-4 py-2 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Schnellzugriff
          </span>
          <Link
            to="/erstgespraech"
            className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-fg/80 hover:border-sage hover:text-sage"
          >
            Erstgespräch
          </Link>
          <Link
            to="/kontakt"
            className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-fg/80 hover:border-sage hover:text-sage"
          >
            Kontakt
          </Link>
          <Link
            to="/anfahrt"
            className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-fg/80 hover:border-sage hover:text-sage"
          >
            Anfahrt
          </Link>
          <span className="ml-auto hidden text-xs text-muted lg:inline">
            {practice.city}-{practice.district} · {practice.hoursShort}
          </span>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-paper px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobilnavigation">
            {nav.flatMap((item) =>
              "children" in item
                ? item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="rounded-md px-3 py-3 text-base hover:bg-sage-100"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))
                : [
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-md px-3 py-3 text-base hover:bg-sage-100"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>,
                  ],
            )}
            <a
              href={`tel:${practice.phoneTel}`}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-sage font-medium text-paper"
            >
              <Phone className="size-4" /> {practice.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
