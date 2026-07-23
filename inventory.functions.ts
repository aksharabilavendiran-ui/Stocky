import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ALLOWED_TABLES = ["brands", "categories", "suppliers", "stores"] as const;
type Table = (typeof ALLOWED_TABLES)[number];

const tableSchema = z.enum(ALLOWED_TABLES);

const fieldSchemas: Record<Table, z.ZodObject<any>> = {
  brands: z.object({
    name: z.string().min(1).max(120),
    description: z.string().max(1000).optional().nullable(),
  }),
  categories: z.object({
    name: z.string().min(1).max(120),
    description: z.string().max(1000).optional().nullable(),
  }),
  suppliers: z.object({
    name: z.string().min(1).max(120),
    contact_person: z.string().max(120).optional().nullable(),
    email: z.string().email().max(200).optional().nullable().or(z.literal("")),
    phone: z.string().max(40).optional().nullable(),
    address: z.string().max(1000).optional().nullable(),
  }),
  stores: z.object({
    name: z.string().min(1).max(120),
    location: z.string().max(400).optional().nullable(),
    city: z.string().max(120).optional().nullable(),
    state: z.string().max(120).optional().nullable(),
  }),
};

function clean(payload: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(payload)) {
    if (v === "" || v === undefined) continue;
    out[k] = v;
  }
  return out;
}

export const listItems = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { table: Table }) =>
    z.object({ table: tableSchema }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from(data.table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const createItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { table: Table; values: Record<string, any> }) => {
    const parsed = z
      .object({ table: tableSchema, values: z.record(z.string(), z.any()) })
      .parse(input);
    const schema = fieldSchemas[parsed.table];
    return { table: parsed.table, values: schema.parse(parsed.values) };
  })
  .handler(async ({ data, context }) => {
    const payload = { ...clean(data.values), user_id: context.userId };
    const { data: row, error } = await (context.supabase as any)
      .from(data.table)
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { table: Table; id: string; values: Record<string, any> }) => {
      const parsed = z
        .object({
          table: tableSchema,
          id: z.string().uuid(),
          values: z.record(z.string(), z.any()),
        })
        .parse(input);
      const schema = fieldSchemas[parsed.table].partial();
      return {
        table: parsed.table,
        id: parsed.id,
        values: schema.parse(parsed.values),
      };
    },
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await (context.supabase as any)
      .from(data.table)
      .update(clean(data.values))
      .eq("id", data.id)
      .eq("user_id", context.userId)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { table: Table; id: string }) =>
    z.object({ table: tableSchema, id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from(data.table)
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
