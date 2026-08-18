import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schmerztherapie-augsburg-Bw8vWpku.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Anliegen · Augsburg-Hochzoll",
			title: "Schmerztherapie in Augsburg",
			lead: "Wenn der Schmerz bleibt, obwohl schon viel versucht wurde. Ich arbeite manuell, regulativ und im Gespräch – ergänzend, nicht statt des Arztes.",
			image: "/images/manuelle-therapie.jpg",
			imageAlt: "Manuelle Behandlung auf Leinen"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Menschen kommen mit Rücken-, Gelenk- oder chronischen Schmerzen, oft nach langer Odyssee. Mein erster Blick gilt der ärztlichen Abklärung: Was ist ausgeschlossen, was fehlt, was darf ich begleiten?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Wie ich arbeite" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Manuelle Techniken aus Physiotherapie, osteopathischen Griffen und integrativer manueller Arbeit. Ergänzend können Injektionsverfahren im heilpraktischen Rahmen, Regulation, Homöopathie oder Gespräch sinnvoll sein. Nicht jedes Verfahren ist wissenschaftlich anerkannt. Ich sage das dazu." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Mehr zum körperlichen Arbeiten:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-sage underline-offset-4 hover:underline",
							to: "/verfahren/manuell",
							children: "Manuell & Osteopathie"
						}),
						"."
					] })
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
