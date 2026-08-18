import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as practiceFaqs, i as practice } from "./utils-BK2XtN36.mjs";
import { a as ShieldCheck, c as MapPin, i as Sparkles, l as Leaf, o as Phone, p as ArrowRight, r as Stethoscope } from "../_libs/lucide-react.mjs";
import { a as Disclaimer, i as CtaBand, l as ReviewStrip, n as Button, o as FaqList, r as Container, t as AuthorByline } from "./Shared-KJRqCYum.mjs";
import { r as FaqJsonLd } from "./router-DXy4-btu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-sbp6B8Qd.js
var import_jsx_runtime = require_jsx_runtime();
var concerns = [
	{
		to: "/schmerztherapie-augsburg",
		title: "Schmerz & Bewegung",
		text: "Rücken, Gelenke, chronische Schmerzen – manuell, regulativ und im Gespräch.",
		image: "/images/manuelle-therapie.jpg"
	},
	{
		to: "/allergie-augsburg",
		title: "Allergie & Unverträglichkeit",
		text: "Wenn der Körper auf Alltägliches reagiert. Hinweisdiagnostik und begleitende Verfahren.",
		image: "/images/naturheilkunde.jpg"
	},
	{
		to: "/erschoepfung-augsburg",
		title: "Erschöpfung & Psyche",
		text: "Burnout, innere Unruhe, Schlaf – Hypnose, Gespräch und körperliche Regulation.",
		image: "/images/ruhe.jpg"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqJsonLd, { items: practiceFaqs }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero-praxis.jpg",
					alt: "Behandlungsraum der Naturheilpraxis Rauch in Augsburg-Hochzoll",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(105deg,rgb(39_73_50/0.88)_0%,rgb(39_73_50/0.62)_48%,rgb(39_73_50/0.28)_100%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
					className: "relative grid min-h-[78vh] items-end py-16 md:min-h-[84vh] md:py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl text-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.22em] text-sand-deep",
								children: "Augsburg-Hochzoll · Friedberg · Lechhausen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl",
								children: "Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 max-w-xl text-lg text-paper/85",
								children: [practice.tagline, ". Ich begleite Menschen, die mit Schmerz, Allergie oder Erschöpfung bei der Schulmedizin nicht weiterkommen – ergänzend, ohne Heilversprechen, mit klaren Grenzen."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "clay",
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${practice.phoneTel}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
											" Termin: ",
											practice.phoneDisplay
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									size: "lg",
									className: "border-transparent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/erstgespraech",
										children: ["Erstgespräch verstehen ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-paper/75",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Physiotherapeut seit 2001" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Heilpraktiker seit 2006" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [practice.experienceYears, " Jahre Praxis"] })
								]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-sage",
						children: "Person, nicht Gerät"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl text-sage-deep sm:text-4xl",
						children: "Ich bin Heilpraktiker und Physiotherapeut – und sehe den Menschen als Ganzes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4 text-[1.05rem] leading-relaxed text-fg/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Mein Name ist Peter Rauch. In meiner Praxis in der Friedrich-Deffner-Straße in Augsburg-Hochzoll arbeite ich mit Naturheilverfahren, manuellen Techniken und Gespräch. Zuerst versuche ich, Zusammenhänge zu verstehen. Danach ordne ich passende Verfahren zu." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ich bin kein Arzt. Bei Notfällen und klar ärztlichen Fragen gehört die Behandlung in eine Praxis oder Klinik. Schulmedizin und Naturheilkunde müssen sich nicht widersprechen." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ueber-mich",
								children: "Vita & Qualifikation"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/so-arbeite-ich",
								children: "So läuft ein Termin"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "rounded-xl border border-line bg-sand/80 p-6 shadow-soft",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "space-y-4 text-sm",
						children: [
							["Behandler", practice.person],
							["Qualifikation", practice.role],
							["Erlaubnis HP", `${practice.sinceHp} · ${practice.licenseHp}`],
							["Physiotherapie", `${practice.sincePt} · ${practice.licensePt}`],
							["Verband", practice.association],
							["Aufsicht", practice.authority],
							["Standort", `${practice.street}, ${practice.zip} ${practice.city}`]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sage-deep",
							children: v
						})] }, k))
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-sage",
					children: "Womit Menschen kommen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-2xl font-display text-3xl text-sage-deep sm:text-4xl",
					children: "Drei Anliegen – nicht siebenundzwanzig Geräte."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 md:grid-cols-3",
					children: concerns.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "group overflow-hidden rounded-xl border border-line bg-paper shadow-soft transition hover:-translate-y-0.5 hover:shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: "",
							className: "aspect-[5/3] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl text-sage-deep",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: item.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage",
									children: ["Weiterlesen ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						})]
					}, item.to))
				})
			]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-sage-soft/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				className: "grid gap-8 py-16 md:grid-cols-3",
				children: [
					{
						icon: Stethoscope,
						title: "1. Gespräch",
						text: "Oft mit ausgefülltem Anamnesebogen. Ich höre zu und ordne ein, was bereits ärztlich geklärt ist."
					},
					{
						icon: Sparkles,
						title: "2. Untersuchung",
						text: "Naturheilkundliche und manuelle Verfahren. Das ersetzt keine Laborwerte und keine ärztliche Diagnose."
					},
					{
						icon: Leaf,
						title: "3. Nächste Schritte",
						text: "Gemeinsame Planung – ohne Heilversprechen. Manchmal heißt das auch: zuerst zum Arzt."
					}
				].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-paper p-6 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
							className: "size-6 text-sage",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl text-sage-deep",
							children: step.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: step.text
						})
					]
				}, step.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewStrip, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "grid gap-10 py-16 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-sage",
					children: "Häufige Fragen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl text-sage-deep",
					children: "Klarheit vor dem ersten Anruf"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, { items: practiceFaqs })
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-paper p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm font-medium text-sage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), " Praxis vor Ort"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mt-2 font-display text-2xl text-sage-deep",
						children: [
							practice.street,
							", ",
							practice.city,
							"-",
							practice.district
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							"Gut erreichbar aus ",
							practice.reach.join(", "),
							". Einzugsgebiet außerdem ",
							practice.catchment.join(", "),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/anfahrt.jpg",
						alt: "Ruhiger Zugang zu einer Praxis in Augsburg-Hochzoll",
						className: "mt-5 aspect-[16/10] w-full rounded-lg object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/anfahrt",
								children: "Anfahrt & Parken"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: practice.mapsQuery,
								target: "_blank",
								rel: "noreferrer",
								children: "Google Maps"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 flex items-start gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-sage" }), "Privatleistung. Keine Notfallversorgung. Keine Online-Diagnose."]
					})
				]
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorByline, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { className: "mt-8" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { Home as component };
