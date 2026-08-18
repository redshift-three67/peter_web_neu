import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  FileText,
  Heart,
  Leaf,
  Menu,
  Phone,
  Scale,
  Shield,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { useState } from "react";
import { nav, practice } from "@/content/site";
import { cn } from "@/lib/utils";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { useMusterSkin } from "./DesignSkin";

const itemIcons: Record<string, typeof Leaf> = {
  "Übersicht Diagnostik": BookOpen,
  "NLS-Diagnostik": Sparkles,
  "Vieva Pro": Sparkles,
  "EAV nach Dr. Voll": Stethoscope,
  "Übersicht manuell": Heart,
  Osteopathie: Stethoscope,
  "Schmerztherapie Augsburg": Heart,
  "Naturheilkunde Augsburg": Leaf,
  "Klassische Homöopathie": Leaf,
  "NAET / Allergie": Shield,
  Darmsanierung: Leaf,
  "Bioresonanz Augsburg": Sparkles,
  Informationstherapie: Sparkles,
  "Hypnotherapie Augsburg": BookOpen,
  "Psychotherapie Augsburg": Heart,
  "Quellenhinweis & Haftung": Scale,
  Rechtshinweise: FileText,
  Patientenaufklärung: ClipboardList,
  "Ihr Therapieweg": Stethoscope,
  Anamnesebogen: ClipboardList,
  Datenschutzerklärung: Shield,
};

function BrandMark({ onClick, ac }: { onClick?: () => void; ac?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" onClick={onClick}>
      {ac ? (
        <span className="font-display text-[1.35rem] font-medium tracking-[0.04em] text-[#2C2825]">
          Rauch
        </span>
      ) : (
        <>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage text-paper shadow-soft">
            <Leaf className="size-5" aria-hidden />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-display text-lg font-semibold leading-tight text-fg">
              Naturheilpraxis
            </span>
            <span className="text-xs text-muted">{practice.person}</span>
          </span>
        </>
      )}
    </Link>
  );
}

function MenuRow({
  to,
  label,
  text,
  active,
  onClick,
  plain,
}: {
  to: string;
  label: string;
  text?: string;
  active?: boolean;
  onClick?: () => void;
  plain?: boolean;
}) {
  const Icon = itemIcons[label] ?? Leaf;
  if (plain) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 py-2 text-sm text-[#2C2825]/85 hover:opacity-60",
          active && "underline underline-offset-4",
        )}
      >
        <Icon className="size-4 shrink-0 opacity-50" aria-hidden />
        {label}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-sage-50",
        active && "bg-sage-50",
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-sage-50 text-sage">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-fg">{label}</span>
        {text ? (
          <span className="mt-0.5 block text-sm leading-snug text-muted">
            {text}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const { ac } = useMusterSkin();

  return (
    <header
      className={
        ac
          ? "sticky top-0 z-50 w-full bg-[#F7F1E8]"
          : "sticky top-0 z-50 w-full border-b border-line/50 bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80"
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 sm:px-6">
        <BrandMark onClick={() => setOpen(false)} ac={ac} />

        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Hauptnavigation"
        >
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className={
                    ac
                      ? "px-3 py-2 text-sm text-[#2C2825]/80 underline-offset-[10px] hover:underline"
                      : "rounded-full px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-sage-100 hover:text-sage-700"
                  }
                >
                  {item.label}
                </button>
                <div
                  className={
                    ac
                      ? "invisible absolute left-1/2 top-full z-50 w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-1 rounded-2xl bg-[#F7F1E8] p-5 opacity-0 shadow-[0_20px_50px_-20px_rgba(44,40,37,0.25)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      : "invisible absolute left-0 top-full z-50 w-[22rem] translate-y-1 rounded-2xl border border-line bg-paper p-2 opacity-0 shadow-elevated transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  }
                >
                  {ac ? (
                    <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
                      <Link
                        to="/erstgespraech"
                        className="relative overflow-hidden rounded-2xl"
                      >
                        <img
                          src="/images/gespraech.jpg"
                          alt=""
                          className="aspect-[5/4] h-full w-full object-cover"
                        />
                        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-4 py-3 text-sm text-white">
                          Erstgespräch
                          <span className="grid size-8 place-items-center rounded-full bg-white/90 text-[#2C2825]">
                            →
                          </span>
                        </span>
                      </Link>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 content-start">
                        {item.children.map((child) => (
                          <MenuRow
                            key={child.to}
                            to={child.to}
                            label={child.label}
                            active={pathname === child.to}
                            plain
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <MenuRow
                          key={child.to}
                          to={child.to}
                          label={child.label}
                          text={child.text}
                          active={pathname === child.to}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  ac
                    ? "px-3 py-2 text-sm text-[#2C2825]/80 underline-offset-[10px] hover:underline"
                    : "rounded-full px-3 py-2 text-sm transition-colors hover:bg-sage-100 hover:text-sage-700",
                  !ac &&
                    (pathname === item.to
                      ? "bg-sage-100 text-sage-700"
                      : "text-fg/80"),
                  ac && pathname === item.to && "underline",
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
            className={
              ac
                ? "hidden size-10 items-center justify-center rounded-full border border-[#2C2825]/20 text-[#2C2825] hover:bg-[#2C2825] hover:text-[#F7F1E8] sm:inline-flex"
                : "hidden h-10 items-center gap-2 rounded-full bg-sage px-4 text-sm font-medium text-paper shadow-soft hover:bg-sage-600 sm:inline-flex"
            }
          >
            <Phone className="size-4" aria-hidden />
            {ac ? <span className="sr-only">Anrufen</span> : "Anrufen"}
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
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-paper text-fg xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menü</span>
          </button>
        </div>
      </div>

      {!ac ? (
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
      ) : null}

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[80vh] overflow-y-auto border-t border-line bg-paper px-3 py-3 xl:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobilnavigation">
            {nav.map((item) =>
              "children" in item ? (
                <div key={item.label} className="rounded-2xl border border-line p-2">
                  <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <MenuRow
                      key={child.to}
                      to={child.to}
                      label={child.label}
                      text={child.text}
                      active={pathname === child.to}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </div>
              ) : (
                <MenuRow
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  text={item.text}
                  active={pathname === item.to}
                  onClick={() => setOpen(false)}
                />
              ),
            )}
            <a
              href={`tel:${practice.phoneTel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sage font-medium text-paper"
            >
              <Phone className="size-4" /> {practice.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
