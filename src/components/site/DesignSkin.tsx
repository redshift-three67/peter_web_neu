import { useRouterState } from "@tanstack/react-router";
import { isMusterPath, persistLook, resolveLook, type DesignLook } from "@/lib/design-skin";

export function useMusterSkin() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const look = resolveLook(search);
  const muster = isMusterPath(pathname);
  const oura = muster && look !== "alt";
  return { ac: oura, oura, look, muster, pathname };
}

export function DesignSkinBar() {
  const { muster, look } = useMusterSkin();
  if (!muster) return null;

  const next: DesignLook = look === "alt" ? "ac" : "alt";

  return (
    <div className="relative z-[60] border-b border-line bg-paper px-4 py-2 text-center text-sm text-ink">
      <span>
        {look === "alt"
          ? "Vorheriges Design (Fallback)."
          : "Oura-Header auf Start, NLS, Schmerz. Wisch im Slider."}
      </span>{" "}
      <button
        type="button"
        className="font-medium underline-offset-2 hover:underline"
        onClick={() => {
          persistLook(next);
          const url = new URL(window.location.href);
          url.searchParams.set("look", next);
          window.location.assign(url.toString());
        }}
      >
        {look === "alt" ? "Oura-Header zeigen" : "Zurück zum vorherigen Design"}
      </button>
    </div>
  );
}
