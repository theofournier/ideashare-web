"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../clients/server";
import { redirect } from "next/navigation";

export const deleteAccountAction = async (
  prevState: { errorMessage: string },
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  revalidatePath("/");
  redirect("/");
};
