import { Link } from "@tanstack/react-router";
import { ExternalLink, Leaf, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, practice } from "@/content/site";
import { useMusterSkin } from "./DesignSkin";

export function Footer() {
  const { ac, neko } = useMusterSkin();

  if (neko) {
    return (
      <footer className="bg-[#2C4045] text-[#F4F1EA]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-2xl">NLS · Augsburg-Hochzoll</p>
            <p className="mt-2 max-w-sm text-sm text-white/60">
              {practice.street}, {practice.zip} {practice.city}. Hinweisverfahren,
              kein Laborersatz.
            </p>
          </div>
          <p className="text-sm text-white/55">
            <a href={`tel:${practice.phoneTel}`} className="hover:text-white">
              {practice.phoneDisplay}
            </a>
            {" · "}
            <Link to="/impressum" className="hover:text-white">
              Impressum
            </Link>
          </p>
        </div>
      </footer>
    );
  }

  if (ac) {
    return (
      <footer className="mt-0 bg-[#1C1B19] text-[#F4EDE3]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-4xl font-medium tracking-[0.06em]">Rauch</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              Naturheilpraxis Peter Rauch · Heilpraktiker und Physiotherapeut ·
              {practice.street}, {practice.zip} {practice.city}-{practice.district}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <li>
              <a href={`tel:${practice.phoneTel}`} className="hover:text-white">
                {practice.phoneDisplay}
              </a>
            </li>
            <li>
              <Link to="/impressum" className="hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link to="/datenschutz" className="hover:text-white">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="hover:text-white">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/45 sm:px-6">
            © {new Date().getFullYear()} {practice.person}. Keine Heilversprechen.
            Privatleistung. Stand: {practice.updated}.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-20 border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-full bg-sage text-paper">
              <Leaf className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-lg font-semibold text-fg">
                Naturheilpraxis
              </span>
              <span className="text-xs text-muted">{practice.person}</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted">
            Heilpraktiker und Physiotherapeut in Augsburg-Hochzoll.
            Naturheilkundlich begleiten – ergänzend zur ärztlichen Versorgung.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-lg font-medium text-fg">Navigation</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {footerNav.praxis.map((item) => (
              <li key={item.to}>
                <a href={item.to} className="text-muted transition-colors hover:text-sage">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-lg font-medium text-fg">Kontakt</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 text-sage" aria-hidden />
              <a className="hover:text-sage" href={`tel:${practice.phoneTel}`}>
                {practice.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 text-sage" aria-hidden />
              <a className="hover:text-sage" href={`mailto:${practice.email}`}>
                {practice.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-sage" aria-hidden />
              <span>
                {practice.street}, {practice.zip} {practice.city}
              </span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-lg font-medium text-fg">Website</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {footerNav.recht.map((item) => (
              <li key={item.to}>
                <a href={item.to} className="text-muted transition-colors hover:text-sage">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://rauch-heilpraktiker.de"
                className="inline-flex items-center gap-1 text-muted hover:text-sage"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                rauch-heilpraktiker.de
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {practice.person}. Alle Rechte vorbehalten.
            Keine Heilversprechen. Stand: {practice.updated}.
          </p>
          <p className="flex gap-4">
            <Link to="/impressum" className="hover:text-sage">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-sage">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
