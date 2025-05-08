"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/clients/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { USE_MOCK_DATA } from "@/lib/utils";

export const registerAction = async (
  prevState: { errorMessage: string },
  formData: FormData
) => {
  const data: SignUpWithPasswordCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: { data: { username: formData.get("name") as string } },
  };
  if (!data.email || !data.password) {
    console.log("REGISTER_ERROR_EMPTY");
    return { errorMessage: "Email and password required" };
  }

  // Validate password length
  if (data.password.length < 6) {
    return {
      errorMessage: "Password must be at least 6 characters long",
    };
  }

  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.password === "password") {
      redirect("/");
    } else {
      return { errorMessage: "Invalid register credentials" };
    }
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log("REGISTER_ERROR", error);
    return { errorMessage: "Invalid register credentials" };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
