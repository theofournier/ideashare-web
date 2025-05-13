"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../clients/server";
import { getSupabaseUser } from "../../queries/auth/getSupabaseUser";

export const voteIdeaAction = async (
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
    .select("*")
    .eq("id", id)
    .single();
  if (!idea || ideaError) {
    console.log("DELETE_IDEA_ERROR_NOT_FOUND");
    return { errorMessage: "Idea not found" };
  }
  const { data: vote } = await supabase
    .from("idea_votes")
    .select("*")
    .eq("idea_id", id)
    .eq("user_id", user.id)
    .single();

  if (vote) {
    const { error: deleteError } = await supabase
      .from("idea_votes")
      .delete()
      .eq("idea_id", id)
      .eq("user_id", user.id);
    if (deleteError) {
      console.log("DELETE_IDEA_ERROR", deleteError);
      return { errorMessage: "Error occured when unvoting" };
    }
  } else {
    const { error: insertError } = await supabase.from("idea_votes").insert({
      idea_id: id,
      user_id: user.id,
    });
    if (insertError) {
      console.log("INSERT_IDEA_VOTE_ERROR", insertError);
      return { errorMessage: "Error occured when voting" };
    }
  }

  revalidatePath("/");
  return { errorMessage: "" };
};
