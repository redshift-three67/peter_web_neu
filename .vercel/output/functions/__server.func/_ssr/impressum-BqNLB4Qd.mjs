import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as practice } from "./utils-BK2XtN36.mjs";
import { c as Prose, r as Container, s as PageHero } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/impressum-BqNLB4Qd.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Recht",
		title: "Impressum",
		lead: "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				practice.person,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				practice.name,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				practice.street,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				practice.zip,
				" ",
				practice.city
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Telefon: ",
				practice.phoneDisplay,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"E-Mail: ",
				practice.email
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Berufsbezeichnung" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Heilpraktiker (Deutschland). Erlaubnis zur berufsmäßigen Ausübung der Heilkunde ohne Arzt zu sein am ",
				practice.sinceHp,
				" durch das",
				" ",
				practice.licenseHp,
				". Erlaubnis zur Führung der Berufsbezeichnung Physiotherapeut durch das ",
				practice.licensePt,
				" am ",
				practice.sincePt,
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Aufsichtsbehörde" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [practice.authority, ", Hoher Weg 8, 86152 Augsburg."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Berufsrechtliche Regelungen" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Heilpraktikergesetz und Durchführungsverordnung, nachzulesen unter gesetze-im-internet.de. Berufsordnung für Heilpraktiker (BOH)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Verband" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: practice.association }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Umsatzsteuer" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Heilkundliche Tätigkeit ist nach § 4 Nr. 14 UStG von der Umsatzsteuer befreit." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Streitschlichtung" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "text-sage underline-offset-4 hover:underline",
					href: "https://ec.europa.eu/consumers/odr",
					children: "ec.europa.eu/consumers/odr"
				}),
				". Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Haftung" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Für externe Links gilt: Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar." })
		] })
	})] });
}
//#endregion
export { Page as component };
