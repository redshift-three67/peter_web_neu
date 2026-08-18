import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as practice } from "./utils-BK2XtN36.mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, n as Button, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anfahrt-CrDDaqoY.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: `${practice.city}-${practice.district}`,
			title: "Anfahrt zur Praxis",
			lead: "An der Naht zwischen Augsburg-Hochzoll und Friedberg. Wenige Minuten von Lechhausen-Ost.",
			image: "/images/anfahrt.jpg",
			imageAlt: "Ruhiger Zugang in einem Wohnquartier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						practice.street,
						", ",
						practice.zip,
						" ",
						practice.city,
						". Die Praxis liegt in einem Wohngebiet, nicht in der Innenstadt – das ist Absicht: Ruhe vor dem Gespräch."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Mit dem Auto" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Über die B300 / A8 Richtung Augsburg-Ost, Ausfahrt in Richtung Hochzoll / Friedberg. In der Friedrich-Deffner-Straße ist in der Regel Straßenparken möglich. Bitte rechnen Sie ein paar Minuten extra ein." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "ÖPNV" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "S-Bahn-Haltestelle Augsburg-Hochzoll in fußläufiger Nähe. Aus Friedberg und Lechhausen-Ost sind es wenige Minuten." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Einzugsgebiet" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Regelmäßig kommen Menschen aus ",
						practice.reach.join(", "),
						" sowie",
						" ",
						practice.catchment.join(", "),
						"."
					] })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: practice.mapsQuery,
							target: "_blank",
							rel: "noreferrer",
							children: "Route in Google Maps"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorByline, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-8" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { Page as component };
