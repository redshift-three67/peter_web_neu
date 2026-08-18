import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as practiceFaqs, i as practice } from "./utils-BK2XtN36.mjs";
import { a as Disclaimer, c as Prose, i as CtaBand, n as Button, o as FaqList, r as Container, s as PageHero, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/erstgespraech-ysIwqXM9.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Einstieg",
			title: "Ihr erstes Gespräch in Augsburg-Hochzoll",
			lead: "60–90 Minuten Zeit. Kein Fließband. Ein klarer Kostenrahmen, den ich im Gespräch konkretisiere.",
			image: "/images/gespraech.jpg",
			imageAlt: "Ruhiger Gesprächsplatz"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Das Erstgespräch ist eine Privatleistung. Gesetzliche Kassen erstatten in der Regel nicht; Beihilfe und private Zusatztarife tun es oft anteilig. Bitte prüfen Sie Ihren Vertrag vorab." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Was Sie mitbringen" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "list-disc space-y-2 pl-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Befunde und Labor, soweit vorhanden" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Medikamentenliste" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ausgefüllten Anamnesebogen, wenn möglich" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Fragen, die Sie geklärt haben wollen" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Kostenrahmen" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Orientierung: Erstgespräch meist 60–90 Minuten. Folgeeinheiten kürzer. Die genaue Höhe hängt von Aufwand und Verfahren ab und wird vor der Behandlung besprochen. Grundlage ist das Gebührenverzeichnis für Heilpraktiker (GebüH) in angemessener Anpassung." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Konkrete Beträge nenne ich persönlich – nicht als Lockangebot auf der Website." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-line bg-paper p-6 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-sage-deep",
							children: "Nächster Schritt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-4 space-y-3 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. Anrufen oder Nachricht senden" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. Anamnesebogen ausfüllen" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Termin in der Friedrich-Deffner-Straße" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${practice.phoneTel}`,
										children: practice.phoneDisplay
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/kontakt",
										children: "Kontaktformular"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/anamnese",
										children: "Zum Anamnesebogen"
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, { items: practiceFaqs }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorByline, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-8" })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { Page as component };
