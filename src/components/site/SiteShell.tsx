import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PracticeJsonLd } from "./JsonLd";
import { DesignSkinBar, useMusterSkin } from "./DesignSkin";

export function SiteShell({ children }: { children: ReactNode }) {
  const { oura, neko } = useMusterSkin();
  const skin = [oura && "theme-ac", neko && "theme-neko"].filter(Boolean).join(" ");

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
    </div>
  );
}
