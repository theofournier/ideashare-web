"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../clients/server";

export const updateAccountInfoAction = async (
  prevState: { errorMessage: string; success?: boolean },
  formData: FormData
) => {
  const { email, username } = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
  };

  if (!email) {
    console.log("UPDATE_EMAIL_ERROR_EMPTY");
    return { errorMessage: "Email required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    email,
    data: {
      display_name: username,
    },
  });

  if (error) {
    console.log("UPDATE_EMAIL_ERROR", error);
    return { errorMessage: "Invalid update email" };
  }

  revalidatePath("/");
  return { errorMessage: "", success: true };
};
