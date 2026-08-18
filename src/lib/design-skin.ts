const KEY = "rauch-look";
export type DesignLook = "ac" | "alt";

const MUSTER = new Set(["/", "/nls-diagnostik"]);

export function isMusterPath(pathname: string) {
  return MUSTER.has(pathname);
}

export function lookFromSearch(search: string): DesignLook | null {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("look");
  if (q === "alt" || q === "ac") return q;
  return null;
}

export function storedLook(): DesignLook {
  if (typeof window === "undefined") return "ac";
  return window.localStorage.getItem(KEY) === "alt" ? "alt" : "ac";
}

export function persistLook(look: DesignLook) {
  window.localStorage.setItem(KEY, look);
}

export function resolveLook(search: string): DesignLook {
  return lookFromSearch(search) ?? "ac";
}
