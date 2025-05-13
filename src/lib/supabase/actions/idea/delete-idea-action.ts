"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../clients/server";
import { getSupabaseUser } from "../../queries/auth/getSupabaseUser";

export const deleteIdeaAction = async (
  id: string,
  prevState: { errorMessage: string },
  formData: FormData
) => {
  const user = await getSupabaseUser();
  if (!user) {
    console.log("DELETE_IDEA_ERROR_NOT_CONNECTED");
    return { errorMessage: "Not connected" };
  }
  const supabase = await createClient();
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("*, profiles!ideas_user_id_fkey1(*)")
    .eq("id", id)
    .single();
  if (!idea || ideaError) {
    console.log("DELETE_IDEA_ERROR_NOT_FOUND");
    return { errorMessage: "Idea not found" };
  }
  if (idea.profiles?.id !== user.id) {
    console.log("DELETE_IDEA_ERROR_NOT_OWNER");
    return { errorMessage: "You are not the owner of this idea" };
  }
  const { error: deleteError } = await supabase
    .from("ideas")
    .delete()
    .eq("id", id);
  if (deleteError) {
    console.log("DELETE_IDEA_ERROR", deleteError);
    return { errorMessage: "Error occured when deleting idea" };
  }

  redirect("/browse");
};
