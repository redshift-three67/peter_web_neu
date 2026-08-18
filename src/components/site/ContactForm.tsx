import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { submitContact } from "@/lib/actions";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    try {
      await submitContact({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? "") || undefined,
          topic: String(form.get("topic") ?? "") || undefined,
          message: String(form.get("message") ?? ""),
          consent: form.get("consent") === "on" ? true : (false as unknown as true),
        },
      });
      setStatus("ok");
      formEl.reset();
    } catch (err) {
      setStatus("err");
      const message =
        err instanceof Error ? err.message : "Übermittlung fehlgeschlagen.";
      setError(
        message.includes("invalid") || message.includes("Expected")
          ? "Bitte Name, gültige E-Mail, Nachricht und Einwilligung prüfen."
          : message,
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-line bg-sage-soft p-6">
        <p className="font-display text-2xl text-sage-deep">Nachricht erhalten</p>
        <p className="mt-2 text-sm text-muted">
          Vielen Dank. Ich melde mich in der Regel innerhalb eines Werktags.
          Für zeitnahe Termine rufen Sie bitte an.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" required>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field id="email" label="E-Mail" required>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="phone" label="Telefon">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field id="topic" label="Anliegen">
          <Input id="topic" name="topic" placeholder="Schmerz, Allergie, Erschöpfung …" />
        </Field>
      </div>
      <Field id="message" label="Nachricht" required>
        <Textarea id="message" name="message" required minLength={10} />
      </Field>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 accent-sage"
        />
        <span>
          Ich willige in die Verarbeitung meiner Angaben zur Kontaktaufnahme ein.
          Hinweise in der Datenschutzerklärung. Keine Notfälle über dieses Formular.
        </span>
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-clay"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}
