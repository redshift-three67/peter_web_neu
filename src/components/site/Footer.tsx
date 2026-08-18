import { Link } from "@tanstack/react-router";
import { footerNav, practice } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-sage-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl">{practice.person}</p>
          <p className="mt-1 text-sm text-paper/75">{practice.role}</p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-paper/80">
            {practice.name}
            <br />
            {practice.street}
            <br />
            {practice.zip} {practice.city} ({practice.district})
          </address>
          <p className="mt-4 text-sm">
            <a className="underline-offset-4 hover:underline" href={`tel:${practice.phoneTel}`}>
              {practice.phoneDisplay}
            </a>
            <br />
            <a className="underline-offset-4 hover:underline" href={`mailto:${practice.email}`}>
              {practice.email}
            </a>
          </p>
          <p className="mt-3 text-xs text-paper/60">{practice.hoursShort}</p>
        </div>
        {(
          [
            ["Praxis", footerNav.praxis],
            ["Anliegen", footerNav.anliegen],
            ["Recht", footerNav.recht],
          ] as const
        ).map(([title, items]) => (
          <div key={title}>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/55">
              {title}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {items.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-paper/85 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
