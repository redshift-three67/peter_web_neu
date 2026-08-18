import { i as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { r as getSql } from "./db-LPk0TYJA.mjs";
import { t as authMiddleware } from "./middleware-eFdjvOeq.mjs";
import { _n as string, dn as literal, mn as object } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-gZrFoad6.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var contactSchema = object({
	name: string().trim().min(2).max(120),
	email: string().trim().email().max(180),
	phone: string().trim().max(40).optional(),
	topic: string().trim().max(80).optional(),
	message: string().trim().min(10).max(4e3),
	consent: literal(true)
});
var submitContact_createServerFn_handler = createServerRpc({
	id: "b0c967a5ebb6736a12b624eab55be4b330a815064be6adb4bd3f1ad8fa372a0a",
	name: "submitContact",
	filename: "src/lib/actions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator((input) => contactSchema.parse(input)).handler(submitContact_createServerFn_handler, async ({ data }) => {
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
	return {
		ok: true,
		id
	};
});
var anamneseSchema = object({
	firstName: string().trim().min(2).max(80),
	lastName: string().trim().min(2).max(80),
	birthDate: string().trim().min(6).max(20),
	street: string().trim().min(3).max(120),
	zip: string().trim().min(4).max(10),
	city: string().trim().min(2).max(80),
	email: string().trim().email(),
	phone: string().trim().min(6).max(40),
	concern: string().trim().min(8).max(2e3),
	duration: string().trim().max(200).optional(),
	physician: string().trim().max(400).optional(),
	diagnoses: string().trim().max(800).optional(),
	medication: string().trim().max(800).optional(),
	allergies: string().trim().max(400).optional(),
	sleep: string().trim().max(200).optional(),
	notes: string().trim().max(2e3).optional(),
	printedName: string().trim().min(3).max(120),
	accurate: literal(true),
	privacy: literal(true)
});
var submitAnamnese_createServerFn_handler = createServerRpc({
	id: "4ea2f4a9b4af2dc5dd7db8d5c4501a76132347ea77f19dcd59c852d05f54f15f",
	name: "submitAnamnese",
	filename: "src/lib/actions.ts"
}, (opts) => submitAnamnese.__executeServer(opts));
var submitAnamnese = createServerFn({ method: "POST" }).validator((input) => anamneseSchema.parse(input)).handler(submitAnamnese_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const id = crypto.randomUUID();
	await sql`
      insert into anamnesis_submissions (id, payload, status)
      values (${id}, ${JSON.stringify(data)}, ${"received"})
    `;
	return {
		ok: true,
		id
	};
});
var listInbox_createServerFn_handler = createServerRpc({
	id: "373fe3aff5f49a1e6930c2570fd15fbde7be4de2f32d793102e5cac6d65d1595",
	name: "listInbox",
	filename: "src/lib/actions.ts"
}, (opts) => listInbox.__executeServer(opts));
var listInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listInbox_createServerFn_handler, async () => {
	const sql = await getSql();
	return {
		contacts: await sql`
      select id, created_at, name, email, phone, topic, message
      from contact_messages
      order by created_at desc
      limit 50
    `,
		forms: await sql`
      select id, created_at, status
      from anamnesis_submissions
      order by created_at desc
      limit 50
    `
	};
});
//#endregion
export { listInbox_createServerFn_handler, submitAnamnese_createServerFn_handler, submitContact_createServerFn_handler };
