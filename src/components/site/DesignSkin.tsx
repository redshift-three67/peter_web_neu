import { useRouterState } from "@tanstack/react-router";
import { isMusterPath, persistLook, resolveLook, type DesignLook } from "@/lib/design-skin";

export function useMusterSkin() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const look = resolveLook(search);
  const muster = isMusterPath(pathname);
  const ac = muster && look !== "alt";
  const diagnostic = pathname === "/nls-diagnostik";
  return { ac, diagnostic, look, muster, pathname };
}

export function DesignSkinBar() {
  const { muster, look } = useMusterSkin();
  if (!muster) return null;

  const next: DesignLook = look === "alt" ? "ac" : "alt";

  return (
    <div className="border-b border-line bg-paper px-4 py-2 text-center text-sm text-fg">
      <span>
        {look === "alt"
          ? "Vorheriges Design (Fallback)."
          : "Muster Oura — nur Start. Neko später."}
      </span>{" "}
      <button
        type="button"
        className="font-medium text-sage-deep underline-offset-2 hover:underline"
        onClick={() => {
          persistLook(next);
          const url = new URL(window.location.href);
          url.searchParams.set("look", next);
          window.location.assign(url.toString());
        }}
      >
        {look === "alt" ? "Muster A+C zeigen" : "Zurück zum vorherigen Design"}
      </button>
    </div>
  );
}
