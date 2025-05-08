"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../clients/server";
import { revalidatePath } from "next/cache";

export const logout = async () => {
  const supabase = await createClient();
  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/login");
};
