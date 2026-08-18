import { Link } from "@tanstack/react-router";
import { ExternalLink, Leaf, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, practice } from "@/content/site";

export function Footer() {
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
