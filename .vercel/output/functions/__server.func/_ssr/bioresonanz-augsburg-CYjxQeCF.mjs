import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bioresonanz-augsburg-CYjxQeCF.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Verfahren · Frequenz",
			title: "Bioresonanz in Augsburg",
			lead: "Ein erfahrungsmedizinisches Hinweis- und Begleitverfahren. Kein Ersatz für Labor, Bildgebung oder ärztliche Diagnose.",
			image: "/images/naturheilkunde.jpg",
			imageAlt: "Stillleben mit Flaschen und Kräutern"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "In der Praxis arbeite ich unter anderem mit einem Bioresonanzsystem (Trikombin) sowie verwandten Verfahren der biophysikalischen Informationstherapie. Diese Verfahren sind schulmedizinisch nicht anerkannt. Es liegen in der Regel keine Studien vor, die eine Wirkung im wissenschaftlichen Sinn nachweisen." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ich setze sie ergänzend ein – nach Gespräch und im Rahmen einer Gesamtplanung. Wer eine gesicherte Diagnose sucht, braucht Ärztin oder Arzt und Labor." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Überblick:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-sage underline-offset-4 hover:underline",
							to: "/verfahren/frequenz",
							children: "Hinweisdiagnostik & Frequenz"
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
