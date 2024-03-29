import {
  createServerClient as createClient,
  type CookieOptions,
} from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../schema/supabase.schema";

export const createServerClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (e) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (e) {}
        },
      },
    }
  );
};
