"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/clients/server";
import { USE_MOCK_DATA } from "@/lib/utils";
import { users } from "@/lib/mock-data";

export async function login(
  prevState: { errorMessage: string },
  formData: FormData
) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    console.log("LOGIN_ERROR_EMPTY");
    return { errorMessage: "Email and password required" };
  }

  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication
    const user = users.find(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (user && data.password === "password") {
      redirect("/");
    } else {
      return { errorMessage: "Invalid login credentials" };
    }
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("LOGIN_ERROR", error);
    return { errorMessage: "Invalid login credentials" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
