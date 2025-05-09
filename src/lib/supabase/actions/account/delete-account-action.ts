"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../clients/server";
import { redirect } from "next/navigation";

export const deleteAccountAction = async (
  prevState: { errorMessage: string },
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("DELETE_ACCOUNT_ERROR", error);
    return { errorMessage: "Invalid delete account" };
  }

  revalidatePath("/");
  redirect("/");
};
