"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../clients/server";

export const updatePasswordAction = async (
  prevState: { errorMessage: string; success?: boolean },
  formData: FormData
) => {
  const { password } = {
    password: formData.get("password") as string,
  };

  if (!password) {
    console.log("UPDATE_PASSWORD_ERROR_EMPTY");
    return { errorMessage: "Password required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.log("UPDATE_PASSWORD_ERROR", error);
    return { errorMessage: "Invalid update password" };
  }

  revalidatePath("/");
  return { errorMessage: "", success: true };
};
