import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { nav, practice } from "@/content/site";
import { cn } from "@/lib/utils";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-sage-deep text-sm font-medium text-paper">
            PR
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[1.05rem] leading-tight text-sage-deep">
              {practice.name}
            </span>
            <span className="block truncate text-xs text-muted">
              Heilpraktiker · {practice.city}-{practice.district}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Hauptnavigation"
        >
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-sm text-fg/85 hover:bg-sage-soft hover:text-sage-deep"
                >
                  {item.label}
                </button>
                <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-lg border border-line bg-paper p-1.5 opacity-0 shadow-card transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm hover:bg-sage-soft",
                        pathname === child.to
                          ? "bg-sage-soft text-sage-deep"
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
                  "rounded-md px-3 py-2 text-sm hover:bg-sage-soft hover:text-sage-deep",
                  pathname === item.to
                    ? "bg-sage-soft text-sage-deep"
                    : "text-fg/85",
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
            className="hidden h-10 items-center gap-2 rounded-md bg-sage px-3 text-sm font-medium text-paper hover:bg-sage-deep sm:inline-flex"
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
            className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-paper text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menü</span>
          </button>
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
                      className="rounded-md px-3 py-3 text-base hover:bg-sage-soft"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))
                : [
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-md px-3 py-3 text-base hover:bg-sage-soft"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>,
                  ],
            )}
            <a
              href={`tel:${practice.phoneTel}`}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-sage font-medium text-paper"
            >
              <Phone className="size-4" /> {practice.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
