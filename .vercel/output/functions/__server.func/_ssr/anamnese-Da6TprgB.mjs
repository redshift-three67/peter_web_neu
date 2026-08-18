import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-BK2XtN36.mjs";
import { d as ChevronLeft, f as Check, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as Disclaimer, n as Button, r as Container, s as PageHero } from "./Shared-KJRqCYum.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-BJ4RdLfy.mjs";
import { n as submitAnamnese } from "./actions-CoS6DbQb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anamnese-Da6TprgB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		id: "person",
		title: "Person"
	},
	{
		id: "kontakt",
		title: "Kontakt"
	},
	{
		id: "anliegen",
		title: "Anliegen"
	},
	{
		id: "bisher",
		title: "Bisheriges"
	},
	{
		id: "leben",
		title: "Alltag"
	},
	{
		id: "einwilligung",
		title: "Abschluss"
	}
];
var empty = {
	firstName: "",
	lastName: "",
	birthDate: "",
	street: "",
	zip: "",
	city: "Augsburg",
	email: "",
	phone: "",
	concern: "",
	duration: "",
	physician: "",
	diagnoses: "",
	medication: "",
	allergies: "",
	sleep: "",
	notes: "",
	printedName: "",
	accurate: true,
	privacy: true
};
function AnamneseWizard() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [data, setData] = (0, import_react.useState)(empty);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	const progress = (0, import_react.useMemo)(() => Math.round((step + 1) / steps.length * 100), [step]);
	function set(key, value) {
		setData((prev) => ({
			...prev,
			[key]: value
		}));
	}
	async function submit() {
		setStatus("sending");
		setError("");
		try {
			await submitAnamnese({ data: {
				...data,
				accurate: true,
				privacy: true
			} });
			setStatus("ok");
		} catch {
			setStatus("err");
			setError("Bitte Pflichtfelder prüfen: Name, Adresse, E-Mail, Telefon, Anliegen, Druckname und beide Bestätigungen.");
		}
	}
	if (status === "ok") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-sage-soft p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl text-sage-deep",
			children: "Anamnesebogen übermittelt"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: "Vielen Dank. Ihre Angaben werden vor dem Termin gelesen. Der Bogen stellt keine Diagnose und ersetzt das Gespräch nicht. Offene Punkte klären wir persönlich."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-paper p-5 shadow-card sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Schritt ",
						step + 1,
						" von ",
						steps.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium text-sage",
					children: [progress, " %"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-1.5 overflow-hidden rounded-full bg-sand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-sage transition-[width] duration-300",
					style: { width: `${progress}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "wizard-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1",
				children: steps.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setStep(i),
					className: cn("rounded-full border px-3 py-1.5 text-xs whitespace-nowrap", i === step ? "border-sage bg-sage text-paper" : i < step ? "border-sage/40 bg-sage-soft text-sage-deep" : "border-line bg-bg text-muted"),
					children: [i < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline size-3" }) : null, item.title]
				}) }, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-sage-deep",
							children: "Wer kommt in die Praxis?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Vorname",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: data.firstName,
									onChange: (e) => set("firstName", e.target.value),
									autoComplete: "given-name"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nachname",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: data.lastName,
									onChange: (e) => set("lastName", e.target.value),
									autoComplete: "family-name"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Geburtsdatum",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: data.birthDate,
								onChange: (e) => set("birthDate", e.target.value),
								placeholder: "TT.MM.JJJJ",
								autoComplete: "bday"
							})
						})
					] }) : null,
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-sage-deep",
							children: "Erreichbarkeit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Straße und Hausnummer",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: data.street,
								onChange: (e) => set("street", e.target.value),
								autoComplete: "street-address"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-[140px_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "PLZ",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: data.zip,
									onChange: (e) => set("zip", e.target.value),
									autoComplete: "postal-code"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Ort",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: data.city,
									onChange: (e) => set("city", e.target.value),
									autoComplete: "address-level2"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E-Mail",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: data.email,
									onChange: (e) => set("email", e.target.value),
									autoComplete: "email"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Telefon",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "tel",
									value: data.phone,
									onChange: (e) => set("phone", e.target.value),
									autoComplete: "tel"
								})
							})]
						})
					] }) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-sage-deep",
							children: "Womit darf ich Sie begleiten?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Hauptanliegen",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: data.concern,
								onChange: (e) => set("concern", e.target.value),
								placeholder: "Was belastet Sie derzeit am stärksten?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Seit wann?",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: data.duration ?? "",
								onChange: (e) => set("duration", e.target.value)
							})
						})
					] }) : null,
					step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-sage-deep",
							children: "Was ist bereits geklärt?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ärztliche Abklärung / Hausarzt",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: data.physician ?? "",
								onChange: (e) => set("physician", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bekannte Diagnosen",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: data.diagnoses ?? "",
								onChange: (e) => set("diagnoses", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Medikamente & Präparate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: data.medication ?? "",
								onChange: (e) => set("medication", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Allergien / Unverträglichkeiten",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: data.allergies ?? "",
								onChange: (e) => set("allergies", e.target.value)
							})
						})
					] }) : null,
					step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-sage-deep",
							children: "Alltag"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Schlaf, Energie, Belastung",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: data.sleep ?? "",
								onChange: (e) => set("sleep", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Sonstiges, das wichtig ist",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: data.notes ?? "",
								onChange: (e) => set("notes", e.target.value)
							})
						})
					] }) : null,
					step === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-sage-deep",
							children: "Abschluss"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Gesundheitsdaten sind besonders schützenswert. Der Bogen dient nur der Vorbereitung des Termins, stellt keine Diagnose und gibt kein Behandlungsergebnis."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name in Druckbuchstaben",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: data.printedName,
								onChange: (e) => set("printedName", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: Boolean(data.accurate),
								onChange: (e) => set("accurate", e.target.checked ? true : false),
								className: "mt-1 size-4 accent-sage"
							}), "Ich bestätige, dass meine Angaben nach bestem Wissen richtig sind."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: Boolean(data.privacy),
								onChange: (e) => set("privacy", e.target.checked ? true : false),
								className: "mt-1 size-4 accent-sage"
							}), "Ich willige in die Verarbeitung gemäß Datenschutzerklärung ein."]
						})
					] }) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					disabled: step === 0,
					onClick: () => setStep((s) => Math.max(0, s - 1)),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Zurück"]
				}), step < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					onClick: () => setStep((s) => s + 1),
					children: ["Weiter ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "clay",
					disabled: status === "sending",
					onClick: submit,
					children: status === "sending" ? "Wird gesendet …" : "Anamnesebogen absenden"
				})]
			})
		]
	});
}
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-clay",
			children: " *"
		}) : null] }), children]
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Patientenaufnahme",
		title: "Online-Anamnesebogen",
		lead: "Bitte vor dem Ersttermin ausfüllen. Schritt für Schritt, auf dieser Website – nicht auf einem fremden Prototyp-Host. Keine Diagnose, kein Behandlungsergebnis."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "max-w-3xl py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnamneseWizard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-8" })]
	})] });
}
//#endregion
export { Page as component };
