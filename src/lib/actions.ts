import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(40).optional(),
  topic: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into contact_messages (id, name, email, phone, topic, message, consent)
      values (
        ${id},
        ${data.name},
        ${data.email},
        ${data.phone ?? ""},
        ${data.topic ?? ""},
        ${data.message},
        ${true}
      )
    `;
    return { ok: true as const, id };
  });

const anamneseSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  birthDate: z.string().trim().min(6).max(20),
  street: z.string().trim().min(3).max(120),
  zip: z.string().trim().min(4).max(10),
  city: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6).max(40),
  concern: z.string().trim().min(8).max(2000),
  duration: z.string().trim().max(200).optional(),
  physician: z.string().trim().max(400).optional(),
  diagnoses: z.string().trim().max(800).optional(),
  medication: z.string().trim().max(800).optional(),
  allergies: z.string().trim().max(400).optional(),
  sleep: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(2000).optional(),
  printedName: z.string().trim().min(3).max(120),
  accurate: z.literal(true),
  privacy: z.literal(true),
});

export type AnamneseInput = z.infer<typeof anamneseSchema>;

export const submitAnamnese = createServerFn({ method: "POST" })
  .validator((input: unknown) => anamneseSchema.parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const id = crypto.randomUUID();
    const payload = JSON.stringify(data);
    await sql`
      insert into anamnesis_submissions (id, payload, status)
      values (${id}, ${payload}, ${"received"})
    `;
    return { ok: true as const, id };
  });

export const listInbox = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const contacts = await sql<{
      id: string;
      created_at: string;
      name: string;
      email: string;
      phone: string;
      topic: string;
      message: string;
    }>`
      select id, created_at, name, email, phone, topic, message
      from contact_messages
      order by created_at desc
      limit 50
    `;
    const forms = await sql<{
      id: string;
      created_at: string;
      status: string;
    }>`
      select id, created_at, status
      from anamnesis_submissions
      order by created_at desc
      limit 50
    `;
    return { contacts, forms };
  });
