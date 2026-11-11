import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { preorderSchema } from "./preorder-schema";

export type PreorderResult = { ok: true; already: boolean } | { ok: false };

export const joinPreorderList = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => preorderSchema.parse(data))
  .handler(async ({ data }): Promise<PreorderResult> => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("preorder_signups").insert(data);
    if (error) {
      if (error.code === "23505") return { ok: true, already: true };
      console.error("preorder insert failed", error);
      return { ok: false };
    }
    return { ok: true, already: false };
  });
