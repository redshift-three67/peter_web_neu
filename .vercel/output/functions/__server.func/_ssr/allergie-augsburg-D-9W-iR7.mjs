import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/allergie-augsburg-D-9W-iR7.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Anliegen · Allergie",
			title: "Allergie und Unverträglichkeit",
			lead: "Wenn der Alltag eng wird – Pollen, Tiere, Nahrung. Ich begleite ergänzend zur Diagnostik durch Ärztin oder Arzt.",
			image: "/images/naturheilkunde.jpg",
			imageAlt: "Kräuter und Flaschen auf einem Holztisch"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Allergien gehören in die ärztliche Diagnostik, wenn der Verdacht neu ist oder die Reaktion heftig. In der Praxis arbeite ich mit Anamnese, Hinweisverfahren und – wo sinnvoll – NAET sowie Regulation. Das ersetzt keinen Prick-Test und keinen Notfallplan." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Frequenz- und Hinweisverfahren wie Bioresonanz sind erfahrungsmedizinisch und wissenschaftlich nicht anerkannt. Ich setze sie als Ergänzung ein, nicht als Beweis." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Vertiefung:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-sage underline-offset-4 hover:underline",
							to: "/verfahren/frequenz",
							children: "Hinweisdiagnostik & Frequenz"
						}),
						" ",
						"und",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-sage underline-offset-4 hover:underline",
							to: "/bioresonanz-augsburg",
							children: "Bioresonanz Augsburg"
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
