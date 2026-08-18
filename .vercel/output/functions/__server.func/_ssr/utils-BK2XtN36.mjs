import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BK2XtN36.js
var practice = {
	name: "Naturheilpraxis Rauch",
	person: "Peter Rauch",
	role: "Heilpraktiker und Physiotherapeut",
	tagline: "Naturheilkundlich begleiten – stark im Leben",
	street: "Friedrich-Deffner-Straße 19a",
	zip: "86163",
	city: "Augsburg",
	district: "Hochzoll",
	region: "Bayern",
	country: "DE",
	phoneDisplay: "0821 2621462",
	phoneTel: "+498212621462",
	email: "info@rauch-heilpraktiker.de",
	geo: {
		lat: 48.33937,
		lng: 10.94893
	},
	hours: "Montag bis Freitag, 10:00–12:30 und 13:00–19:00 Uhr, nach Vereinbarung",
	hoursShort: "Mo–Fr 10–12:30 · 13–19 Uhr",
	mapsQuery: "https://www.google.com/maps/search/?api=1&query=Friedrich-Deffner-Stra%C3%9Fe+19a%2C+86163+Augsburg",
	reach: [
		"Augsburg-Hochzoll",
		"Friedberg",
		"Lechhausen-Ost"
	],
	catchment: [
		"Stadtbergen",
		"Neusäß",
		"Gersthofen",
		"Kissing",
		"Mering",
		"Königsbrunn"
	],
	sinceHp: "26.12.2006",
	sincePt: "02.11.2001",
	association: "Bund Deutscher Heilpraktiker und Naturheilkundiger e.V.",
	authority: "Gesundheitsamt Stadt Augsburg",
	licenseHp: "Landratsamt Aichach-Friedberg",
	licensePt: "Regierungspräsidium Gießen",
	updated: "August 2026",
	experienceYears: 20
};
var reviews = {
	provenExpert: {
		score: "4,85",
		count: 103,
		label: "ProvenExpert"
	},
	jameda: {
		score: "5,0",
		count: 19,
		label: "Jameda"
	},
	quotes: [
		{
			text: "Herr Rauch nimmt sich extrem viel Zeit und erklärt Zusammenhänge so, dass sie gut zu verstehen sind.",
			source: "ProvenExpert"
		},
		{
			text: "Ein sehr empathischer Heilpraktiker, der sich wie noch nie jemand Zeit für meine chronische Erkrankung genommen hat.",
			source: "Jameda"
		},
		{
			text: "Ganzheitlich, zielgerichtet und genau. Man fühlt sich ernst genommen und gut aufgehoben.",
			source: "ProvenExpert"
		}
	]
};
var nav = [
	{
		to: "/",
		label: "Start"
	},
	{
		to: "/ueber-mich",
		label: "Über mich"
	},
	{
		to: "/so-arbeite-ich",
		label: "So arbeite ich"
	},
	{
		label: "Anliegen",
		children: [
			{
				to: "/schmerztherapie-augsburg",
				label: "Schmerz"
			},
			{
				to: "/allergie-augsburg",
				label: "Allergie"
			},
			{
				to: "/erschoepfung-augsburg",
				label: "Erschöpfung & Psyche"
			}
		]
	},
	{
		label: "Verfahren",
		children: [
			{
				to: "/verfahren/manuell",
				label: "Manuell & Osteopathie"
			},
			{
				to: "/verfahren/frequenz",
				label: "Hinweisdiagnostik & Frequenz"
			},
			{
				to: "/verfahren/naturheilkunde",
				label: "Naturheilkunde & Gespräch"
			},
			{
				to: "/hypnotherapie-augsburg",
				label: "Hypnotherapie"
			}
		]
	},
	{
		to: "/erstgespraech",
		label: "Erstgespräch"
	},
	{
		to: "/kontakt",
		label: "Kontakt"
	}
];
var footerNav = {
	praxis: [
		{
			to: "/ueber-mich",
			label: "Vita & Qualifikation"
		},
		{
			to: "/so-arbeite-ich",
			label: "Ablauf"
		},
		{
			to: "/erstgespraech",
			label: "Erstgespräch & Kosten"
		},
		{
			to: "/anfahrt",
			label: "Anfahrt Hochzoll"
		},
		{
			to: "/anamnese",
			label: "Online-Anamnese"
		}
	],
	anliegen: [
		{
			to: "/schmerztherapie-augsburg",
			label: "Schmerztherapie Augsburg"
		},
		{
			to: "/allergie-augsburg",
			label: "Allergie Augsburg"
		},
		{
			to: "/erschoepfung-augsburg",
			label: "Erschöpfung & Burnout"
		},
		{
			to: "/hypnotherapie-augsburg",
			label: "Hypnotherapie Augsburg"
		},
		{
			to: "/bioresonanz-augsburg",
			label: "Bioresonanz Augsburg"
		}
	],
	recht: [
		{
			to: "/impressum",
			label: "Impressum"
		},
		{
			to: "/datenschutz",
			label: "Datenschutz"
		},
		{
			to: "/rechtshinweise",
			label: "Rechtshinweise"
		},
		{
			to: "/login",
			label: "Praxiszugang"
		}
	]
};
var practiceFaqs = [
	{
		q: "Ersetzt die Naturheilpraxis einen Arztbesuch?",
		a: "Nein. Ich arbeite ergänzend. Die dargestellten Verfahren ersetzen keine ärztliche Diagnose, Beratung oder Behandlung. Bei Notfällen wählen Sie 112, außerhalb der Sprechzeit den kassenärztlichen Bereitschaftsdienst 116 117."
	},
	{
		q: "Wie vereinbare ich einen Termin?",
		a: "Telefonisch unter 0821 2621462 oder über das Kontaktformular. Vor dem Erstgespräch können Sie den Online-Anamnesebogen ausfüllen. Sprechzeiten: montags bis freitags 10–12:30 und 13–19 Uhr, nach Vereinbarung."
	},
	{
		q: "Was kostet die Behandlung?",
		a: "Die Behandlung ist eine Privatleistung. Das Erstgespräch dauert in der Regel 60–90 Minuten. Einen konkreten Rahmen nenne ich im Gespräch – abhängig von Aufwand und Verfahren. Ob Krankenkasse, Beihilfe oder Zusatzversicherung erstattet, hängt von Ihrem Vertrag ab."
	},
	{
		q: "Wo liegt die Praxis?",
		a: "In Augsburg-Hochzoll, Friedrich-Deffner-Straße 19a. Von Friedberg und Lechhausen-Ost ist sie in wenigen Minuten erreichbar. Parken ist in der Straße möglich; die S-Bahn-Haltestelle Hochzoll liegt in der Nähe."
	},
	{
		q: "Geben Sie Heilversprechen?",
		a: "Nein. Ich gebe keine Heilversprechen ab und ersetze keine ärztliche Diagnostik. Ziel der Arbeit ist mehr körperliches und seelisches Wohlbefinden im Alltag – ohne Garantie auf ein bestimmtes Ergebnis."
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { practiceFaqs as a, practice as i, footerNav as n, reviews as o, nav as r, cn as t };
