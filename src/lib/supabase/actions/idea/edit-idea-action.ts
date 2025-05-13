"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../clients/server";
import { getSupabaseUser } from "../../queries/auth/getSupabaseUser";
import { IdeaDifficulty } from "../../types";

export const editIdeaAction = async (
  id: string,
  prevState: { errorMessage: string },
  formData: FormData
) => {
  const ideaData = {
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: formData.get("fullDescription") as string,
    difficulty: formData.get("difficulty") as IdeaDifficulty,
    tags: formData.getAll("tags") as string[],
    techStacks: formData.getAll("techStacks") as string[],
  };

  if (
    !ideaData.title ||
    !ideaData.shortDescription ||
    !ideaData.fullDescription ||
    !ideaData.difficulty
  ) {
    console.log("EDIT_IDEA_ERROR_EMPTY");
    return { errorMessage: "All fields are required" };
  }

  const user = await getSupabaseUser();

  if (!user) {
    console.log("EDIT_IDEA_ERROR_NOT_CONNECTED");
    return { errorMessage: "Not connected" };
  }

  const supabase = await createClient();

  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("*, profiles!ideas_user_id_fkey1(*)")
    .eq("id", id)
    .single();

  if (!idea || ideaError) {
    console.log("EDIT_IDEA_ERROR_NOT_FOUND");
    return { errorMessage: "Idea not found" };
  }
  if (idea.profiles?.id !== user.id) {
    console.log("EDIT_IDEA_ERROR_NOT_OWNER");
    return { errorMessage: "You are not the owner of this idea" };
  }

  const { error: updateError } = await supabase
    .from("ideas")
    .update({
      title: ideaData.title,
      short_description: ideaData.shortDescription,
      full_description: ideaData.fullDescription,
      difficulty: ideaData.difficulty,
    })
    .eq("id", id);
  if (updateError) {
    console.log("EDIT_IDEA_ERROR", updateError);
    return { errorMessage: "Error occured when updating idea" };
  }

  if (ideaData.tags?.length !== 0) {
    const { error: tagsError } = await supabase
      .from("idea_tags")
      .delete()
      .eq("idea_id", id);

    if (tagsError) {
      console.log("EDIT_IDEA_TAGS_ERROR", tagsError);
    }

    const { error: insertTagsError } = await supabase.from("idea_tags").insert(
      ideaData.tags.map((tag) => ({
        idea_id: id,
        tag_id: +tag,
      }))
    );

    if (insertTagsError) {
      console.log("EDIT_IDEA_TAGS_ERROR", insertTagsError);
    }
  }

  if (ideaData.techStacks?.length !== 0) {
    const { error: techStacksError } = await supabase
      .from("idea_tech_stacks")
      .delete()
      .eq("idea_id", id);

    if (techStacksError) {
      console.log("EDIT_IDEA_TECH_STACKS_ERROR", techStacksError);
    }

    const { error: insertTechStacksError } = await supabase
      .from("idea_tech_stacks")
      .insert(
        ideaData.techStacks.map((techStack) => ({
          idea_id: id,
          tech_stack_id: +techStack,
        }))
      );

    if (insertTechStacksError) {
      console.log("EDIT_IDEA_TECH_STACKS_ERROR", insertTechStacksError);
    }
  }

  redirect(`/ideas/${id}`);
};
