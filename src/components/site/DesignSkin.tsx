import { useRouterState } from "@tanstack/react-router";
import { isMusterPath, persistLook, resolveLook, type DesignLook } from "@/lib/design-skin";

export function useMusterSkin() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const look = resolveLook(search);
  const muster = isMusterPath(pathname);
  const ac = muster && look === "ac";
  const neu = muster && look === "neu";
  const diagnostic = pathname === "/nls-diagnostik";
  return { ac, neu, diagnostic, look, muster, pathname };
}

export function DesignSkinBar() {
  const { muster, look } = useMusterSkin();
  if (!muster) return null;

  const options: { key: DesignLook; label: string }[] = [
    { key: "neu", label: "Relaunch-Design 2026" },
    { key: "ac", label: "Muster A+C" },
    { key: "alt", label: "Bisheriges Design" },
  ];

  return (
    <div className="border-b border-line bg-paper px-4 py-2 text-center text-sm text-fg">
      <span>Design-Vorschau:</span>{" "}
      {options.map((option, i) => (
        <span key={option.key}>
          {i > 0 && " · "}
          {look === option.key ? (
            <strong className="font-medium text-sage-deep">{option.label}</strong>
          ) : (
            <button
              type="button"
              className="font-medium text-sage-deep underline-offset-2 hover:underline"
              onClick={() => {
                persistLook(option.key);
                const url = new URL(window.location.href);
                url.searchParams.set("look", option.key);
                window.location.assign(url.toString());
              }}
            >
              {option.label}
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
