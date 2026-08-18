import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as practice } from "./utils-BK2XtN36.mjs";
import { a as Disclaimer, n as Button, r as Container, s as PageHero } from "./Shared-KJRqCYum.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-BJ4RdLfy.mjs";
import { r as submitContact } from "./actions-CoS6DbQb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kontakt-HE22IenI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactForm() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		setStatus("sending");
		setError("");
		const formEl = e.currentTarget;
		const form = new FormData(formEl);
		try {
			await submitContact({ data: {
				name: String(form.get("name") ?? ""),
				email: String(form.get("email") ?? ""),
				phone: String(form.get("phone") ?? "") || void 0,
				topic: String(form.get("topic") ?? "") || void 0,
				message: String(form.get("message") ?? ""),
				consent: form.get("consent") === "on" ? true : false
			} });
			setStatus("ok");
			formEl.reset();
		} catch (err) {
			setStatus("err");
			const message = err instanceof Error ? err.message : "Übermittlung fehlgeschlagen.";
			setError(message.includes("invalid") || message.includes("Expected") ? "Bitte Name, gültige E-Mail, Nachricht und Einwilligung prüfen." : message);
		}
	}
	if (status === "ok") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-sage-soft p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-sage-deep",
			children: "Nachricht erhalten"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Vielen Dank. Ich melde mich in der Regel innerhalb eines Werktags. Für zeitnahe Termine rufen Sie bitte an."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "name",
					label: "Name",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						name: "name",
						autoComplete: "name",
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "email",
					label: "E-Mail",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						name: "email",
						type: "email",
						autoComplete: "email",
						required: true
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "phone",
					label: "Telefon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "phone",
						name: "phone",
						type: "tel",
						autoComplete: "tel"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "topic",
					label: "Anliegen",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "topic",
						name: "topic",
						placeholder: "Schmerz, Allergie, Erschöpfung …"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "message",
				label: "Nachricht",
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "message",
					name: "message",
					required: true,
					minLength: 10
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					name: "consent",
					required: true,
					className: "mt-1 size-4 accent-sage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ich willige in die Verarbeitung meiner Angaben zur Kontaktaufnahme ein. Hinweise in der Datenschutzerklärung. Keine Notfälle über dieses Formular." })]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: status === "sending",
				children: status === "sending" ? "Wird gesendet …" : "Nachricht senden"
			})
		]
	});
}
function Field({ id, label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
			htmlFor: id,
			children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-clay",
				children: " *"
			}) : null]
		}), children]
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Kontakt",
		title: "Schreiben oder anrufen",
		lead: "Termine nach Vereinbarung. Das Formular ist kein Notfallweg."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-xl border border-line bg-sand/70 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-sage-deep",
						children: "Praxis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 leading-relaxed",
						children: [
							practice.name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							practice.street,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							practice.zip,
							" ",
							practice.city,
							" (",
							practice.district,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-sage",
								href: `tel:${practice.phoneTel}`,
								children: practice.phoneDisplay
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-sage",
								href: `mailto:${practice.email}`,
								children: practice.email
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: practice.hours
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"Erreichbar aus ",
							practice.reach.join(", "),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "lg:col-span-2" })
		]
	})] });
}
//#endregion
export { Page as component };
