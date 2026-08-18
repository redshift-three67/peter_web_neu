import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/naturheilkunde-4rD7ubF8.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Verfahren",
			title: "Naturheilkunde & Gespräch",
			lead: "Homöopathie, Pflanzen, Regulation, Hypnose. Immer im Rahmen der Erfahrungsheilkunde.",
			image: "/images/naturheilkunde.jpg",
			imageAlt: "Kräuter und Glasflaschen"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hierher gehören klassische und Komplex-Homöopathie, Phytotherapie, orthomolekulare Beratung, Darmsanierung im naturheilkundlichen Sinn und das therapeutische Gespräch inklusive Hypnose." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Auch diese Verfahren ersetzen keine ärztliche Behandlung. Mittel und Dosierungen bespreche ich persönlich – nicht als Fernrezept über die Website." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorByline, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-8" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { Page as component };
