import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as require_jsx_runtime, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as __exportAll } from "./ssr.mjs";
import { _n as string, dn as literal, mn as object, pn as number, vn as union } from "../_libs/@better-auth/core+[...].mjs";
import { i as practice, n as footerNav, o as reviews, r as nav, t as cn } from "./utils-BK2XtN36.mjs";
import { n as TriangleAlert, o as Phone, s as Menu, t as X } from "../_libs/lucide-react.mjs";
import { i as signOut, t as authClient } from "./client-bdin7QIH.mjs";
import { n as auth } from "./server-Cwhq0xOd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DXy4-btu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-clay",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl text-sage-deep",
				children: "Etwas ist schiefgelaufen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "Ein unerwarteter Fehler ist aufgetreten. Bitte Seite neu laden."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
/**
* Whether `origin` is a known Grok embedder. Exported for tests.
* Do not list internal staging hosts here — this file ships in download/export.
*/
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
/** Public preview zone. Staging embedders frame this host via the proxy CSP. */
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
/** Resolve the parent origin to post to, or null when the bridge must noop. */
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	const candidates = [referrer, ancestorOrigin ?? ""].filter(Boolean);
	for (const candidate of candidates) try {
		const origin = candidate.includes("://") ? new URL(candidate).origin : candidate;
		if (isGrokEmbedderOrigin(origin)) return origin;
		if (!isSandboxPreviewGuestHost(guestHostname)) continue;
		const parsed = new URL(origin.includes("://") ? origin : `https://${origin}`);
		if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.origin;
	} catch {}
	return null;
}
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-20 border-t border-line bg-sage-deep text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: practice.person
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-paper/75",
						children: practice.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
						className: "mt-5 not-italic text-sm leading-relaxed text-paper/80",
						children: [
							practice.name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							practice.street,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							practice.zip,
							" ",
							practice.city,
							" (",
							practice.district,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "underline-offset-4 hover:underline",
								href: `tel:${practice.phoneTel}`,
								children: practice.phoneDisplay
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "underline-offset-4 hover:underline",
								href: `mailto:${practice.email}`,
								children: practice.email
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-paper/60",
						children: practice.hoursShort
					})
				]
			}), [
				["Praxis", footerNav.praxis],
				["Anliegen", footerNav.anliegen],
				["Recht", footerNav.recht]
			].map(([title, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-paper/55",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 text-sm",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "text-paper/85 hover:text-paper",
					children: item.label
				}) }, item.to))
			})] }, title))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-paper/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					practice.person,
					". Keine Heilversprechen. Ergänzend zur ärztlichen Versorgung. Stand: ",
					practice.updated,
					"."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Mitglied: ", practice.association] })]
			})
		})]
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled (default) -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* Auth is ON by default (including the sandbox live preview, which does real
* sign-in). Visitors are signed out until they authenticate. The shared dev
* user only appears when auth is explicitly disabled (`VITE_AUTH_ENABLED=false`).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void signOut(),
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline",
				children: "Sign out"
			})
		]
	});
}
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "group flex min-w-0 items-center gap-3",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 shrink-0 place-items-center rounded-md bg-sage-deep text-sm font-medium text-paper",
						children: "PR"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-display text-[1.05rem] leading-tight text-sage-deep",
							children: practice.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block truncate text-xs text-muted",
							children: [
								"Heilpraktiker · ",
								practice.city,
								"-",
								practice.district
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					"aria-label": "Hauptnavigation",
					children: nav.map((item) => "children" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-md px-3 py-2 text-sm text-fg/85 hover:bg-sage-soft hover:text-sage-deep",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-lg border border-line bg-paper p-1.5 opacity-0 shadow-card transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
							children: item.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: child.to,
								className: cn("block rounded-md px-3 py-2 text-sm hover:bg-sage-soft", pathname === child.to ? "bg-sage-soft text-sage-deep" : "text-fg"),
								children: child.label
							}, child.to))
						})]
					}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("rounded-md px-3 py-2 text-sm hover:bg-sage-soft hover:text-sage-deep", pathname === item.to ? "bg-sage-soft text-sage-deep" : "text-fg/85"),
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${practice.phoneTel}`,
							className: "hidden h-10 items-center gap-2 rounded-md bg-sage px-3 text-sm font-medium text-paper hover:bg-sage-deep sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
								className: "size-4",
								"aria-hidden": true
							}), "Anrufen"]
						}),
						isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden size-8 animate-pulse rounded-full bg-sand md:block" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-md border border-line bg-paper text-fg lg:hidden",
							"aria-expanded": open,
							"aria-controls": "mobile-nav",
							onClick: () => setOpen((v) => !v),
							children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Menü"
							})]
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "mobile-nav",
			className: "border-t border-line bg-paper px-4 py-4 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				"aria-label": "Mobilnavigation",
				children: [nav.flatMap((item) => "children" in item ? item.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: child.to,
					className: "rounded-md px-3 py-3 text-base hover:bg-sage-soft",
					onClick: () => setOpen(false),
					children: child.label
				}, child.to)) : [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "rounded-md px-3 py-3 text-base hover:bg-sage-soft",
					onClick: () => setOpen(false),
					children: item.label
				}, item.to)]), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `tel:${practice.phoneTel}`,
					className: "mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-sage font-medium text-paper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
						" ",
						practice.phoneDisplay
					]
				})]
			})
		}) : null]
	});
}
function PracticeJsonLd() {
	const data = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "MedicalBusiness",
			"@id": "https://rauch-heilpraktiker.de/#praxis",
			name: practice.name,
			image: "/images/hero-praxis.jpg",
			url: "https://rauch-heilpraktiker.de/",
			telephone: practice.phoneTel,
			email: practice.email,
			priceRange: "$$",
			address: {
				"@type": "PostalAddress",
				streetAddress: practice.street,
				postalCode: practice.zip,
				addressLocality: practice.city,
				addressRegion: "BY",
				addressCountry: "DE"
			},
			geo: {
				"@type": "GeoCoordinates",
				latitude: practice.geo.lat,
				longitude: practice.geo.lng
			},
			openingHoursSpecification: {
				"@type": "OpeningHoursSpecification",
				dayOfWeek: [
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday"
				],
				opens: "10:00",
				closes: "19:00"
			},
			areaServed: practice.reach.map((name) => ({
				"@type": "Place",
				name
			})),
			founder: { "@id": "https://rauch-heilpraktiker.de/#person" },
			employee: { "@id": "https://rauch-heilpraktiker.de/#person" },
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.85",
				reviewCount: String(reviews.provenExpert.count),
				bestRating: "5"
			}
		}, {
			"@type": "Person",
			"@id": "https://rauch-heilpraktiker.de/#person",
			name: practice.person,
			jobTitle: practice.role,
			worksFor: { "@id": "https://rauch-heilpraktiker.de/#praxis" },
			address: {
				"@type": "PostalAddress",
				addressLocality: `${practice.city}-${practice.district}`,
				addressCountry: "DE"
			},
			knowsAbout: [
				"Naturheilkunde",
				"Physiotherapie",
				"Manuelle Therapie",
				"Hypnotherapie",
				"Bioresonanztherapie"
			],
			memberOf: practice.association
		}]
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
function FaqJsonLd({ items }) {
	const data = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a
			}
		}))
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
function BreadcrumbJsonLd({ items }) {
	const data = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: `https://rauch-heilpraktiker.de${item.href}`
		}))
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeJsonLd, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-3 focus:py-2",
				children: "Zum Inhalt springen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var styles_default = "/assets/styles-gKUf0HjU.css";
var APP_NAME = "Naturheilpraxis Peter Rauch";
var Route$21 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "apple-mobile-web-app-title",
				content: APP_NAME
			},
			{
				name: "theme-color",
				content: "#274932"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			...[]
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "de",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function pageHead({ title, description, path }) {
	const full = title.includes("Rauch") ? title : `${title} | Naturheilpraxis Peter Rauch`;
	const url = `https://rauch-heilpraktiker.de${path}`;
	return {
		meta: [
			{ title: full },
			{
				name: "description",
				content: description
			},
			{
				name: "author",
				content: "Peter Rauch, Heilpraktiker"
			},
			{
				property: "og:title",
				content: full
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:locale",
				content: "de_DE"
			},
			{
				property: "og:site_name",
				content: "Naturheilpraxis Peter Rauch"
			},
			{
				name: "twitter:title",
				content: full
			},
			{
				name: "twitter:description",
				content: description
			},
			{
				name: "geo.region",
				content: "DE-BY"
			},
			{
				name: "geo.placename",
				content: "Augsburg"
			},
			{
				name: "geo.position",
				content: "48.33937;10.94893"
			},
			{
				name: "ICBM",
				content: "48.33937, 10.94893"
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
var $$splitComponentImporter$19 = () => import("./routes-sbp6B8Qd.mjs");
var Route$20 = createFileRoute("/")({
	head: () => pageHead({
		title: "Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch",
		description: "Heilpraktiker in Augsburg-Hochzoll. Peter Rauch begleitet mit Naturheilkunde, manuellen Verfahren und Gespräch – ergänzend zur ärztlichen Versorgung, ohne Heilversprechen.",
		path: "/"
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./allergie-augsburg-D-9W-iR7.mjs");
var Route$19 = createFileRoute("/allergie-augsburg")({
	head: () => pageHead({
		title: "Allergie Heilpraktiker Augsburg – Naturheilpraxis Rauch",
		description: "Begleitung bei Allergien und Unverträglichkeiten in Augsburg-Hochzoll. Hinweisverfahren, NAET, Regulation – ohne Heilversprechen.",
		path: "/allergie-augsburg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./anamnese-Da6TprgB.mjs");
var Route$18 = createFileRoute("/anamnese")({
	head: () => pageHead({
		title: "Online-Anamnesebogen – Naturheilpraxis Rauch",
		description: "Patientenaufnahme vor dem Termin bei Heilpraktiker Peter Rauch. Der Bogen stellt keine Diagnose und bleibt auf der Praxis-Domain.",
		path: "/anamnese"
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./anfahrt-CrDDaqoY.mjs");
var Route$17 = createFileRoute("/anfahrt")({
	head: () => pageHead({
		title: "Anfahrt Heilpraktiker Augsburg-Hochzoll",
		description: "Naturheilpraxis Rauch, Friedrich-Deffner-Straße 19a, 86163 Augsburg-Hochzoll. Parken, ÖPNV, Anfahrt aus Friedberg und Lechhausen.",
		path: "/anfahrt"
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./bioresonanz-augsburg-CYjxQeCF.mjs");
var Route$16 = createFileRoute("/bioresonanz-augsburg")({
	head: () => pageHead({
		title: "Bioresonanz Augsburg – Naturheilpraxis Peter Rauch",
		description: "Bioresonanztherapie als ergänzendes, wissenschaftlich nicht anerkanntes Verfahren in Augsburg-Hochzoll. Keine Diagnose, kein Heilversprechen.",
		path: "/bioresonanz-augsburg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./datenschutz-DqtB3CCl.mjs");
var Route$15 = createFileRoute("/datenschutz")({
	head: () => pageHead({
		title: "Datenschutz – Naturheilpraxis Rauch",
		description: "Datenschutzerklärung der Naturheilpraxis Peter Rauch. DSGVO, TDDDG, Formulare und Hosting.",
		path: "/datenschutz"
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./erschoepfung-augsburg-BuInmbe3.mjs");
var Route$14 = createFileRoute("/erschoepfung-augsburg")({
	head: () => pageHead({
		title: "Erschöpfung & Burnout Augsburg – Heilpraktiker Rauch",
		description: "Begleitung bei Erschöpfung, Burnout und innerer Unruhe in Augsburg-Hochzoll. Gespräch, Hypnose, Regulation – ergänzend zur ärztlichen Versorgung.",
		path: "/erschoepfung-augsburg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./erstgespraech-ysIwqXM9.mjs");
var Route$13 = createFileRoute("/erstgespraech")({
	head: () => pageHead({
		title: "Erstgespräch & Kosten – Heilpraktiker Augsburg",
		description: "Ablauf, Dauer und Kostenrahmen des Erstgesprächs in der Naturheilpraxis Rauch. Privatleistung, transparent, ohne Heilversprechen.",
		path: "/erstgespraech"
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./hypnotherapie-augsburg-CQtUUA2T.mjs");
var Route$12 = createFileRoute("/hypnotherapie-augsburg")({
	head: () => pageHead({
		title: "Hypnotherapie Augsburg – Heilpraktiker Peter Rauch",
		description: "Hypnose als ergänzendes Verfahren in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Kein Ersatz für Psychotherapie nach ärztlichem Standard.",
		path: "/hypnotherapie-augsburg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./impressum-BqNLB4Qd.mjs");
var Route$11 = createFileRoute("/impressum")({
	head: () => pageHead({
		title: "Impressum – Naturheilpraxis Rauch",
		description: "Impressum gemäß DDG der Naturheilpraxis Peter Rauch, Augsburg.",
		path: "/impressum"
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./kontakt-HE22IenI.mjs");
var Route$10 = createFileRoute("/kontakt")({
	head: () => pageHead({
		title: "Kontakt – Naturheilpraxis Rauch Augsburg-Hochzoll",
		description: "Terminvereinbarung bei Heilpraktiker Peter Rauch. Telefon 0821 2621462, Friedrich-Deffner-Straße 19a, 86163 Augsburg.",
		path: "/kontakt"
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./login-kJ1jsiYw.mjs");
var Route$9 = createFileRoute("/login")({
	head: () => pageHead({
		title: "Praxiszugang",
		description: "Anmeldung für den geschützten Praxisbereich.",
		path: "/login"
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./praxis-CJU1EeDH.mjs");
var Route$8 = createFileRoute("/praxis")({
	head: () => pageHead({
		title: "Praxisposteingang",
		description: "Geschützter Bereich für eingegangene Nachrichten.",
		path: "/praxis"
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./rechtshinweise-BEYbwKcK.mjs");
var Route$7 = createFileRoute("/rechtshinweise")({
	head: () => pageHead({
		title: "Rechtshinweise Therapieverfahren – Naturheilpraxis Rauch",
		description: "Keine Heilversprechen. Verfahren ersetzen keine ärztliche Diagnose. Hinweise nach HWG und Heilpraktikergesetz.",
		path: "/rechtshinweise"
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./schmerztherapie-augsburg-Bw8vWpku.mjs");
var Route$6 = createFileRoute("/schmerztherapie-augsburg")({
	head: () => pageHead({
		title: "Schmerztherapie Augsburg – Heilpraktiker Peter Rauch",
		description: "Naturheilkundliche und manuelle Schmerztherapie in Augsburg-Hochzoll. Ergänzend zur ärztlichen Abklärung, ohne Heilversprechen.",
		path: "/schmerztherapie-augsburg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./so-arbeite-ich-Cs6vU-H4.mjs");
var Route$5 = createFileRoute("/so-arbeite-ich")({
	head: () => pageHead({
		title: "So arbeite ich – Ablauf in der Naturheilpraxis Rauch",
		description: "Gespräch, Untersuchung, gemeinsame Planung. So läuft ein Termin bei Heilpraktiker Peter Rauch in Augsburg-Hochzoll.",
		path: "/so-arbeite-ich"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./ueber-mich-Bqjk_g0g.mjs");
var Route$4 = createFileRoute("/ueber-mich")({
	head: () => pageHead({
		title: "Über mich – Peter Rauch, Heilpraktiker in Augsburg",
		description: "Vita von Peter Rauch: Physiotherapeut seit 2001, Heilpraktiker seit 2006, Hypnotherapeut. Naturheilpraxis in Augsburg-Hochzoll.",
		path: "/ueber-mich"
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./frequenz-4RK4KQlx.mjs");
var Route$3 = createFileRoute("/verfahren/frequenz")({
	head: () => pageHead({
		title: "Hinweisdiagnostik & Frequenzverfahren Augsburg",
		description: "NLS, Bioresonanz, Elektroakupunktur nach Voll: ergänzende Hinweisverfahren in der Naturheilpraxis Rauch. Wissenschaftlich nicht anerkannt.",
		path: "/verfahren/frequenz"
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./manuell-BjDFoSXU.mjs");
var Route$2 = createFileRoute("/verfahren/manuell")({
	head: () => pageHead({
		title: "Manuelle Therapie & Osteopathie Augsburg-Hochzoll",
		description: "Manuelle Verfahren, osteopathische Techniken und integrative manuelle Therapie bei Heilpraktiker und Physiotherapeut Peter Rauch.",
		path: "/verfahren/manuell"
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./naturheilkunde-4rD7ubF8.mjs");
var Route$1 = createFileRoute("/verfahren/naturheilkunde")({
	head: () => pageHead({
		title: "Naturheilkunde & Gespräch – Praxis Rauch Augsburg",
		description: "Klassische Naturheilkunde, Homöopathie, Phytotherapie und Gespräch in der Naturheilpraxis Peter Rauch, Augsburg-Hochzoll.",
		path: "/verfahren/naturheilkunde"
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$20.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$21
	}),
	AllergieAugsburgRoute: Route$19.update({
		id: "/allergie-augsburg",
		path: "/allergie-augsburg",
		getParentRoute: () => Route$21
	}),
	AnamneseRoute: Route$18.update({
		id: "/anamnese",
		path: "/anamnese",
		getParentRoute: () => Route$21
	}),
	AnfahrtRoute: Route$17.update({
		id: "/anfahrt",
		path: "/anfahrt",
		getParentRoute: () => Route$21
	}),
	BioresonanzAugsburgRoute: Route$16.update({
		id: "/bioresonanz-augsburg",
		path: "/bioresonanz-augsburg",
		getParentRoute: () => Route$21
	}),
	DatenschutzRoute: Route$15.update({
		id: "/datenschutz",
		path: "/datenschutz",
		getParentRoute: () => Route$21
	}),
	ErschoepfungAugsburgRoute: Route$14.update({
		id: "/erschoepfung-augsburg",
		path: "/erschoepfung-augsburg",
		getParentRoute: () => Route$21
	}),
	ErstgespraechRoute: Route$13.update({
		id: "/erstgespraech",
		path: "/erstgespraech",
		getParentRoute: () => Route$21
	}),
	HypnotherapieAugsburgRoute: Route$12.update({
		id: "/hypnotherapie-augsburg",
		path: "/hypnotherapie-augsburg",
		getParentRoute: () => Route$21
	}),
	ImpressumRoute: Route$11.update({
		id: "/impressum",
		path: "/impressum",
		getParentRoute: () => Route$21
	}),
	KontaktRoute: Route$10.update({
		id: "/kontakt",
		path: "/kontakt",
		getParentRoute: () => Route$21
	}),
	LoginRoute: Route$9.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$21
	}),
	PraxisRoute: Route$8.update({
		id: "/praxis",
		path: "/praxis",
		getParentRoute: () => Route$21
	}),
	RechtshinweiseRoute: Route$7.update({
		id: "/rechtshinweise",
		path: "/rechtshinweise",
		getParentRoute: () => Route$21
	}),
	SchmerztherapieAugsburgRoute: Route$6.update({
		id: "/schmerztherapie-augsburg",
		path: "/schmerztherapie-augsburg",
		getParentRoute: () => Route$21
	}),
	SoArbeiteIchRoute: Route$5.update({
		id: "/so-arbeite-ich",
		path: "/so-arbeite-ich",
		getParentRoute: () => Route$21
	}),
	UeberMichRoute: Route$4.update({
		id: "/ueber-mich",
		path: "/ueber-mich",
		getParentRoute: () => Route$21
	}),
	VerfahrenFrequenzRoute: Route$3.update({
		id: "/verfahren/frequenz",
		path: "/verfahren/frequenz",
		getParentRoute: () => Route$21
	}),
	VerfahrenManuellRoute: Route$2.update({
		id: "/verfahren/manuell",
		path: "/verfahren/manuell",
		getParentRoute: () => Route$21
	}),
	VerfahrenNaturheilkundeRoute: Route$1.update({
		id: "/verfahren/naturheilkunde",
		path: "/verfahren/naturheilkunde",
		getParentRoute: () => Route$21
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$21
	})
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useCurrentUserState as a, RedirectToSignIn as i, BreadcrumbJsonLd as n, FaqJsonLd as r, router_exports as t };
