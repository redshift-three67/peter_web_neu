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
    return { contacts };
  });
