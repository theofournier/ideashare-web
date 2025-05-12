"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/clients/server";

export const loginAction = async (
  redirectTo: string | undefined,
  prevState: { errorMessage: string },
  formData: FormData
) => {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    console.log("LOGIN_ERROR_EMPTY");
    return { errorMessage: "Email and password required" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("LOGIN_ERROR", error);
    return { errorMessage: "Invalid login credentials" };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo || "/");
};
