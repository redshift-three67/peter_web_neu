import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as practice } from "./utils-BK2XtN36.mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
import { n as BreadcrumbJsonLd } from "./router-DXy4-btu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ueber-mich-Bqjk_g0g.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbJsonLd, { items: [{
			name: "Start",
			href: "/"
		}, {
			name: "Über mich",
			href: "/ueber-mich"
		}] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Person & Qualifikation",
			title: "Peter Rauch – Heilpraktiker und Physiotherapeut",
			lead: "Zwanzig Jahre Arbeit am Menschen. Keine Geräte-Show. Eine Praxis, in der Zeit, Hände und Gespräch zusammengehören.",
			image: "/images/gespraech.jpg",
			imageAlt: "Gesprächsplatz in der Naturheilpraxis"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Ich bin ",
						practice.person,
						", ",
						practice.role,
						" in Augsburg-Hochzoll. Die Erlaubnis zur berufsmäßigen Ausübung der Heilkunde ohne ärztliche Bestallung erhielt ich am ",
						practice.sinceHp,
						" durch das",
						" ",
						practice.licenseHp,
						". Die Berufsbezeichnung Physiotherapeut führe ich seit ",
						practice.sincePt,
						" (Erlaubnis: ",
						practice.licensePt,
						")."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Zusätzlich arbeite ich als Hypnotherapeut. Ich bin Mitglied im",
						" ",
						practice.association,
						". Aufsichtsbehörde ist das",
						" ",
						practice.authority,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pt-4 font-display text-3xl text-sage-deep",
						children: "Werdegang"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2001" }), " — Erlaubnis Physiotherapeut, Regierungspräsidium Gießen."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2006" }), " — Heilpraktikererlaubnis, Landratsamt Aichach-Friedberg."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "seit 2013" }), " — Arbeit mit biophysikalischer Informationstherapie und Bioresonanzsystemen in der eigenen Praxis – als ergänzende Hinweisverfahren, nicht als Schulmedizin."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "heute" }), " — Einzelpraxis in der Friedrich-Deffner-Straße 19a, Augsburg-Hochzoll."] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pt-4 font-display text-3xl text-sage-deep",
						children: "Haltung"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ich betrachte den Menschen als Ganzes. Körperliche und seelische Beschwerden gehören oft zusammen. Mein Ziel ist nicht, ein Gerät zu verkaufen, sondern Zusammenhänge verständlich zu machen und nächste Schritte zu planen." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Zur Dorntherapie sage ich bewusst: Eine gesonderte Dorn-Ausbildung habe ich nicht absolviert. Die bestehenden manuellen Ausbildungen decken die wesentlichen Anteile ab. Diese Ehrlichkeit gehört für mich zur Expertise." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorByline, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-8" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { Page as component };
