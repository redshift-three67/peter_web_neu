import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as practice, o as reviews, t as cn } from "./utils-BK2XtN36.mjs";
import { o as Phone, p as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4", {
	variants: {
		variant: {
			primary: "bg-sage text-paper hover:bg-sage-deep shadow-soft",
			secondary: "bg-sand text-sage-deep hover:bg-sand-deep border border-line",
			outline: "border border-line bg-paper text-fg hover:bg-sage-soft",
			ghost: "text-sage-deep hover:bg-sage-soft",
			clay: "bg-clay text-paper hover:bg-clay-deep",
			link: "text-sage underline-offset-4 hover:underline px-0"
		},
		size: {
			sm: "h-9 px-3",
			md: "h-11 px-5",
			lg: "h-12 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Container({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className),
		children
	});
}
function PageHero({ kicker, title, lead, image, imageAlt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line bg-sand/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "grid gap-10 py-12 md:grid-cols-[1.15fr_0.85fr] md:items-end md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-sage",
					children: kicker
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl font-display text-4xl text-sage-deep sm:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted",
					children: lead
				})
			] }), image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: imageAlt ?? "",
					className: "aspect-[4/3] w-full object-cover"
				})
			}) : null]
		})
	});
}
function CtaBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-sage-deep text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: "Erstgespräch vereinbaren"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-paper/75",
				children: "Telefonisch oder über das Formular. Vor dem Termin können Sie den Anamnesebogen in Ruhe ausfüllen."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "clay",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:${practice.phoneTel}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
							" ",
							practice.phoneDisplay
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "lg",
					className: "border-transparent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/kontakt",
						children: ["Nachricht schreiben ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			})]
		})
	});
}
function ReviewStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-line bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-sage",
					children: "Stimmen aus der Praxis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-2 font-display text-3xl text-sage-deep",
					children: [
						reviews.provenExpert.score,
						" von 5 · ",
						reviews.provenExpert.count,
						" ",
						"Bewertungen"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						reviews.provenExpert.label,
						" · ",
						reviews.jameda.label,
						" ",
						reviews.jameda.score,
						" / ",
						reviews.jameda.count
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: reviews.quotes.map((quote) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "rounded-xl border border-line bg-bg p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "text-[1.05rem] leading-relaxed text-fg",
						children: [
							"„",
							quote.text,
							"“"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-4 text-xs uppercase tracking-[0.14em] text-muted",
						children: quote.source
					})]
				}, quote.text))
			})]
		})
	});
}
function FaqList({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y divide-line rounded-xl border border-line bg-paper",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "group px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer list-none font-medium text-sage-deep marker:content-none [&::-webkit-details-marker]:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-start justify-between gap-4",
					children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted transition group-open:rotate-45",
						children: "+"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-3xl text-sm leading-relaxed text-muted",
				children: item.a
			})]
		}, item.q))
	});
}
function Disclaimer({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("text-sm leading-relaxed text-muted", className),
		children: [
			"Die auf dieser Website dargestellten Verfahren dienen der allgemeinen Aufklärung und ersetzen keine ärztliche Diagnose, Beratung oder Behandlung. Es werden keine Heilversprechen abgegeben. Ich bin Heilpraktiker, kein Arzt. Rechtliche Hinweise finden Sie unter",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/rechtshinweise",
				className: "text-sage underline-offset-4 hover:underline",
				children: "Rechtshinweise"
			}),
			"."
		]
	});
}
function AuthorByline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "mt-12 flex flex-col gap-3 rounded-xl border border-line bg-sand/70 p-5 sm:flex-row sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-14 shrink-0 place-items-center rounded-full bg-sage-deep font-display text-lg text-paper",
			children: "PR"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-medium text-sage-deep",
			children: [
				practice.person,
				" · ",
				practice.role
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Heilpraktikererlaubnis seit ",
				practice.sinceHp,
				" · Physiotherapeut seit",
				" ",
				practice.sincePt,
				" · ",
				practice.experienceYears,
				" Jahre Berufserfahrung · Geprüft: ",
				practice.updated
			]
		})] })]
	});
}
function Prose({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("max-w-3xl space-y-5 text-[1.05rem] leading-relaxed text-fg/90", className),
		children
	});
}
//#endregion
export { Disclaimer as a, Prose as c, CtaBand as i, ReviewStrip as l, Button as n, FaqList as o, Container as r, PageHero as s, AuthorByline as t };
