import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Phone } from "lucide-react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PracticeJsonLd } from "./JsonLd";
import { DesignSkinBar, useMusterSkin } from "./DesignSkin";
import { practice } from "@/content/site";

export function SiteShell({ children }: { children: ReactNode }) {
  const { ac, neu, diagnostic } = useMusterSkin();
  const skin = [
    ac && "theme-ac",
    ac && diagnostic && "theme-ac-diag",
    neu && "theme-neu",
    neu && diagnostic && "theme-neu-diag",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex min-h-dvh flex-col bg-bg text-fg ${skin}`}>
      <PracticeJsonLd />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-3 focus:py-2"
      >
        Zum Inhalt springen
      </a>
      <DesignSkinBar />
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
      {neu ? <MobileCtaBar /> : null}
    </div>
  );
}

/** Sticky Mobile-CTA (nur Relaunch-Design): Anrufen + Termin, ≥44px Touch-Ziele. */
function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-field pb-[env(safe-area-inset-bottom)] md:hidden"
      role="navigation"
      aria-label="Schnellkontakt"
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${practice.phoneTel}`}
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-clay px-4 text-[0.95rem] font-medium text-white"
        >
          <Phone className="size-4" aria-hidden /> Anrufen
        </a>
        <Link
          to="/kontakt"
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-paper px-4 text-[0.95rem] font-medium text-field"
        >
          <CalendarCheck className="size-4" aria-hidden /> Termin anfragen
        </Link>
      </div>
    </div>
  );
}
