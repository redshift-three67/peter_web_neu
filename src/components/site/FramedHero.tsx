import type { ReactNode } from "react";
import { HeaderOura } from "./HeaderOura";
import { useMusterSkin } from "./DesignSkin";

/** Slider + transparentes Menü in einem Rahmen, nicht randlos. */
export function FramedHero({ children }: { children: ReactNode }) {
  const { oura } = useMusterSkin();

  return (
    <section className="px-3 pt-3 sm:px-5 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] shadow-[0_18px_50px_-24px_rgba(29,44,56,0.45)] ring-1 ring-black/10">
        {oura ? (
          <div className="absolute inset-x-0 top-0 z-30 p-2 sm:p-2.5">
            <HeaderOura overlay />
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
