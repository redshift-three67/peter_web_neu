import { useRouterState } from "@tanstack/react-router";
import { isMusterPath, persistLook, resolveLook, type DesignLook } from "@/lib/design-skin";

export function useMusterSkin() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const look = resolveLook(search);
  const muster = isMusterPath(pathname);
  const on = muster && look !== "alt";
  const oura = on && pathname === "/";
  const neko = on && pathname === "/nls-diagnostik";
  return { ac: oura, oura, neko, look, muster, pathname };
}

export function DesignSkinBar() {
  const { muster, look, oura, neko } = useMusterSkin();
  if (!muster) return null;

  const next: DesignLook = look === "alt" ? "ac" : "alt";
  const label = look === "alt"
    ? "Vorheriges Design (Fallback)."
    : oura
      ? "Muster Oura — Start."
      : neko
        ? "Muster Neko — nur NLS."
        : "Muster.";

  return (
    <div className="border-b border-line bg-paper px-4 py-2 text-center text-sm text-fg">
      <span>{label}</span>{" "}
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
        {look === "alt" ? "Muster zeigen" : "Zurück zum vorherigen Design"}
      </button>
    </div>
  );
}
