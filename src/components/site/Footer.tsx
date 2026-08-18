import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
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
          <address className="not-italic text-sm leading-relaxed text-muted">
            {practice.street}
            <br />
            {practice.zip} {practice.city}
            <br />
            <a className="text-sage hover:underline" href={`tel:${practice.phoneTel}`}>
              {practice.phoneDisplay}
            </a>
            <br />
            <a className="text-sage hover:underline" href={`mailto:${practice.email}`}>
              {practice.email}
            </a>
          </address>
        </div>
        {(
          [
            ["Praxis", footerNav.praxis],
            ["Anliegen", footerNav.anliegen],
            ["Recht", footerNav.recht],
          ] as const
        ).map(([title, items]) => (
          <div key={title} className="space-y-4">
            <h3 className="font-display text-lg font-medium text-fg">{title}</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted transition-colors hover:text-sage"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {practice.person}. Keine Heilversprechen.
            Ergänzend zur ärztlichen Versorgung. Stand: {practice.updated}.
          </p>
          <p>Mitglied: {practice.association}</p>
        </div>
      </div>
    </footer>
  );
}
