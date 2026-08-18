import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { submitAnamnese, type AnamneseInput } from "@/lib/actions";
import { cn } from "@/lib/utils";

const steps = [
  { id: "person", title: "Person" },
  { id: "kontakt", title: "Kontakt" },
  { id: "anliegen", title: "Anliegen" },
  { id: "bisher", title: "Bisheriges" },
  { id: "leben", title: "Alltag" },
  { id: "einwilligung", title: "Abschluss" },
] as const;

const empty: AnamneseInput = {
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
  privacy: true,
};

export function AnamneseWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AnamneseInput>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );
  const [error, setError] = useState("");

  const progress = useMemo(
    () => Math.round(((step + 1) / steps.length) * 100),
    [step],
  );

  function set<K extends keyof AnamneseInput>(key: K, value: AnamneseInput[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    setStatus("sending");
    setError("");
    try {
      await submitAnamnese({
        data: {
          ...data,
          accurate: true,
          privacy: true,
        },
      });
      setStatus("ok");
    } catch {
      setStatus("err");
      setError(
        "Bitte Pflichtfelder prüfen: Name, Adresse, E-Mail, Telefon, Anliegen, Druckname und beide Bestätigungen.",
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-line bg-sage-soft p-8">
        <p className="font-display text-3xl text-sage-deep">
          Anamnesebogen übermittelt
        </p>
        <p className="mt-3 max-w-xl text-muted">
          Vielen Dank. Ihre Angaben werden vor dem Termin gelesen. Der Bogen
          stellt keine Diagnose und ersetzt das Gespräch nicht. Offene Punkte
          klären wir persönlich.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-paper p-5 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Schritt {step + 1} von {steps.length}
        </p>
        <p className="text-sm font-medium text-sage">{progress} %</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-sage transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="wizard-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {steps.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs whitespace-nowrap",
                i === step
                  ? "border-sage bg-sage text-paper"
                  : i < step
                    ? "border-sage/40 bg-sage-soft text-sage-deep"
                    : "border-line bg-bg text-muted",
              )}
            >
              {i < step ? <Check className="mr-1 inline size-3" /> : null}
              {item.title}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-4">
        {step === 0 ? (
          <>
            <h2 className="font-display text-2xl text-sage-deep">
              Wer kommt in die Praxis?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vorname" required>
                <Input
                  value={data.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Nachname" required>
                <Input
                  value={data.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  autoComplete="family-name"
                />
              </Field>
            </div>
            <Field label="Geburtsdatum" required>
              <Input
                value={data.birthDate}
                onChange={(e) => set("birthDate", e.target.value)}
                placeholder="TT.MM.JJJJ"
                autoComplete="bday"
              />
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <h2 className="font-display text-2xl text-sage-deep">
              Erreichbarkeit
            </h2>
            <Field label="Straße und Hausnummer" required>
              <Input
                value={data.street}
                onChange={(e) => set("street", e.target.value)}
                autoComplete="street-address"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <Field label="PLZ" required>
                <Input
                  value={data.zip}
                  onChange={(e) => set("zip", e.target.value)}
                  autoComplete="postal-code"
                />
              </Field>
              <Field label="Ort" required>
                <Input
                  value={data.city}
                  onChange={(e) => set("city", e.target.value)}
                  autoComplete="address-level2"
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="E-Mail" required>
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                />
              </Field>
              <Field label="Telefon" required>
                <Input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                />
              </Field>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h2 className="font-display text-2xl text-sage-deep">
              Womit darf ich Sie begleiten?
            </h2>
            <Field label="Hauptanliegen" required>
              <Textarea
                value={data.concern}
                onChange={(e) => set("concern", e.target.value)}
                placeholder="Was belastet Sie derzeit am stärksten?"
              />
            </Field>
            <Field label="Seit wann?">
              <Input
                value={data.duration ?? ""}
                onChange={(e) => set("duration", e.target.value)}
              />
            </Field>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h2 className="font-display text-2xl text-sage-deep">
              Was ist bereits geklärt?
            </h2>
            <Field label="Ärztliche Abklärung / Hausarzt">
              <Textarea
                value={data.physician ?? ""}
                onChange={(e) => set("physician", e.target.value)}
              />
            </Field>
            <Field label="Bekannte Diagnosen">
              <Textarea
                value={data.diagnoses ?? ""}
                onChange={(e) => set("diagnoses", e.target.value)}
              />
            </Field>
            <Field label="Medikamente & Präparate">
              <Textarea
                value={data.medication ?? ""}
                onChange={(e) => set("medication", e.target.value)}
              />
            </Field>
            <Field label="Allergien / Unverträglichkeiten">
              <Input
                value={data.allergies ?? ""}
                onChange={(e) => set("allergies", e.target.value)}
              />
            </Field>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <h2 className="font-display text-2xl text-sage-deep">Alltag</h2>
            <Field label="Schlaf, Energie, Belastung">
              <Textarea
                value={data.sleep ?? ""}
                onChange={(e) => set("sleep", e.target.value)}
              />
            </Field>
            <Field label="Sonstiges, das wichtig ist">
              <Textarea
                value={data.notes ?? ""}
                onChange={(e) => set("notes", e.target.value)}
              />
            </Field>
          </>
        ) : null}

        {step === 5 ? (
          <>
            <h2 className="font-display text-2xl text-sage-deep">Abschluss</h2>
            <p className="text-sm text-muted">
              Gesundheitsdaten sind besonders schützenswert. Der Bogen dient
              nur der Vorbereitung des Termins, stellt keine Diagnose und gibt
              kein Behandlungsergebnis.
            </p>
            <Field label="Name in Druckbuchstaben" required>
              <Input
                value={data.printedName}
                onChange={(e) => set("printedName", e.target.value)}
              />
            </Field>
            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={Boolean(data.accurate)}
                onChange={(e) =>
                  set("accurate", e.target.checked ? true : (false as unknown as true))
                }
                className="mt-1 size-4 accent-sage"
              />
              Ich bestätige, dass meine Angaben nach bestem Wissen richtig sind.
            </label>
            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={Boolean(data.privacy)}
                onChange={(e) =>
                  set("privacy", e.target.checked ? true : (false as unknown as true))
                }
                className="mt-1 size-4 accent-sage"
              />
              Ich willige in die Verarbeitung gemäß Datenschutzerklärung ein.
            </label>
          </>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ChevronLeft className="size-4" /> Zurück
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={() => setStep((s) => s + 1)}>
            Weiter <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="clay"
            disabled={status === "sending"}
            onClick={submit}
          >
            {status === "sending" ? "Wird gesendet …" : "Anamnesebogen absenden"}
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <Label>
        {label}
        {required ? <span className="text-clay"> *</span> : null}
      </Label>
      {children}
    </label>
  );
}
