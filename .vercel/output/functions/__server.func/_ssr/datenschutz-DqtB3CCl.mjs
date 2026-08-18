import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as practice } from "./utils-BK2XtN36.mjs";
import { c as Prose, r as Container, s as PageHero } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/datenschutz-DqtB3CCl.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Recht",
		title: "Datenschutzerklärung",
		lead: "Gesundheitsdaten sind besonders schützenswert. Diese Erklärung gilt für Website, Kontaktformular und Anamnesebogen."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Verantwortlicher: ",
				practice.person,
				", ",
				practice.street,
				",",
				" ",
				practice.zip,
				" ",
				practice.city,
				", ",
				practice.email,
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Hosting und Protokolle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Beim Aufruf entstehen technisch notwendige Server-Logs (IP, Zeitpunkt, aufgerufene Ressource). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO, berechtigte Interessen an Betrieb und Sicherheit." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Formulare" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Kontakt- und Anamnesedaten werden ausschließlich zur Terminvorbereitung und Praxisorganisation verarbeitet (Art. 6 Abs. 1 lit. a und lit. b DSGVO, Art. 9 Abs. 2 lit. a und h DSGVO). Anamnesedaten sind Gesundheitsdaten. Die Übermittlung erfolgt über diese Domain, nicht über fremde Prototyp-Hosts." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Cookies und Einwilligung" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Essenzielle Cookies für Sitzung und Sicherheit. Analyse- oder Werbecookies nur nach Einwilligung gemäß TDDDG und DSGVO (Consent Mode, sobald Kampagnen geschaltet werden)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Schriftarten" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Schriften werden lokal ausgeliefert. Es findet kein Aufruf von Google Fonts statt." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Ihre Rechte" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Beschwerde bei der zuständigen Aufsichtsbehörde (BayLDA)." })
		] })
	})] });
}
//#endregion
export { Page as component };
