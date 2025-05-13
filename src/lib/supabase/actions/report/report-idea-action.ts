"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../clients/server";
import { getSupabaseUser } from "../../queries/auth/getSupabaseUser";
import { ReportReason } from "../../types";

export const reportIdeaAction = async (
  id: string,
  prevState: { errorMessage: string },
  formData: FormData
) => {
  const reportData = {
    reason: formData.get("reason") as ReportReason,
    description: formData.get("description") as string,
  };

  if (!reportData.reason) {
    console.log("REPORT_IDEA_ERROR_EMPTY");
    return { errorMessage: "All fields are required" };
  }

  const user = await getSupabaseUser();
  if (!user) {
    console.log("REPORT_IDEA_ERROR_NOT_CONNECTED");
    return { errorMessage: "Not connected" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("idea_reports").insert({
    idea_id: id,
    user_id: user.id,
    reason: reportData.reason,
    description: reportData.description,
  });

  if (error) {
    console.log("REPORT_IDEA_ERROR", error);
    return { errorMessage: "Error occured when reporting idea" };
  }

  redirect(`/ideas/${id}`);
};
