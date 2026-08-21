const KEY = "rauch-look";
export type DesignLook = "ac" | "alt" | "neu";

/**
 * Musterflächen: Start, NLS (A+C-Referenz) und seit dem Relaunch-Konzept
 * die drei Anliegen-Hubs. Alle anderen Seiten bleiben im Bestandslook.
 */
const MUSTER = new Set([
  "/",
  "/nls-diagnostik",
  "/schmerztherapie-augsburg",
  "/psychotherapie-augsburg",
  "/naet-methode-allergie-behandlung",
]);

export function isMusterPath(pathname: string) {
  return MUSTER.has(pathname);
}

export function lookFromSearch(search: string): DesignLook | null {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("look");
  if (q === "alt" || q === "ac" || q === "neu") return q;
  return null;
}

export function storedLook(): DesignLook {
  if (typeof window === "undefined") return "neu";
  const stored = window.localStorage.getItem(KEY);
  return stored === "alt" || stored === "ac" || stored === "neu" ? stored : "neu";
}

export function persistLook(look: DesignLook) {
  window.localStorage.setItem(KEY, look);
}

export function resolveLook(search: string): DesignLook {
  return lookFromSearch(search) ?? "alt";
}
