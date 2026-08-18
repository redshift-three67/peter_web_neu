import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, n as Button, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/so-arbeite-ich-Cs6vU-H4.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Prozess",
			title: "Zuerst verstehen, dann zuordnen",
			lead: "Ein Termin folgt einem klaren Ablauf. Ohne Heilversprechen. Ohne Ersatz für den Arzt.",
			image: "/images/hero-praxis.jpg",
			imageAlt: "Behandlungsraum mit natürlichem Licht"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1. Vorbereitung" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Vor dem Erstgespräch können Sie den",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/anamnese",
							className: "text-sage underline-offset-4 hover:underline",
							children: "Online-Anamnesebogen"
						}),
						" ",
						"ausfüllen. Er spart Zeit im Gespräch und ersetzt es nicht."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2. Gespräch" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Wir ordnen ein, was bereits ärztlich geklärt ist, was fehlt und womit ich Sie begleiten darf. Wenn eine ärztliche Abklärung nötig ist, sage ich das." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "3. Untersuchung" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Je nach Anliegen: manuelle Befundung, naturheilkundliche Hinweisverfahren, Gespräch. NLS, Bioresonanz und Elektroakupunktur nach Voll sind keine anerkannten Diagnosen und ersetzen kein Labor." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "4. Planung" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Gemeinsam legen wir die nächsten Schritte fest. Manchmal ist das eine manuelle Serie, manchmal Regulation und Mittel, manchmal Hypnose – oft eine Kombination. Immer ohne Garantie auf ein bestimmtes Ergebnis." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-3",
					children: [
						["Manuell & Osteopathie", "/verfahren/manuell"],
						["Hinweisdiagnostik & Frequenz", "/verfahren/frequenz"],
						["Naturheilkunde & Gespräch", "/verfahren/naturheilkunde"]
					].map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "h-auto py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to,
							children: label
						})
					}, to))
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
