import { useEffect, useState } from "react";
import { HeaderOura } from "./HeaderOura";
import { useMusterSkin } from "./DesignSkin";

export function StickyOura() {
  const { oura } = useMusterSkin();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!oura) return;
    const onScroll = () => setShow(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [oura]);

  if (!oura || !show) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 md:px-8">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        <HeaderOura />
      </div>
    </div>
  );
}
