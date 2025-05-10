"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../clients/server";
import { getSupabaseUser } from "../../queries/auth/getSupabaseUser";
import { IdeaDifficulty } from "../../types";

export const submitIdea = async (
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
    console.log("CREATE_IDEA_ERROR_EMPTY");
    return { errorMessage: "All fields are required" };
  }

  const user = await getSupabaseUser();

  if (!user) {
    console.log("CREATE_IDEA_ERROR_NOT_CONNECTED");
    return { errorMessage: "Not connected" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ideas")
    .insert({
      title: ideaData.title,
      short_description: ideaData.shortDescription,
      full_description: ideaData.fullDescription,
      difficulty: ideaData.difficulty,
      user_id: user.id,
    })
    .select()
    .single();

  if (error || !data) {
    console.log("CREATE_IDEA_ERROR", error);
    return { errorMessage: "Error occured when creating idea" };
  }

  if (ideaData.tags?.length !== 0) {
    const { error: tagsError } = await supabase.from("idea_tags").insert(
      ideaData.tags.map((tag) => ({
        idea_id: data.id,
        tag_id: +tag,
      }))
    );

    if (tagsError) {
      console.log("CREATE_IDEA_TAGS_ERROR", tagsError);
      return { errorMessage: "Error occured when creating idea tags" };
    }
  }

  if (ideaData.techStacks?.length !== 0) {
    const { error: techStacksError } = await supabase
      .from("idea_tech_stacks")
      .insert(
        ideaData.techStacks.map((techStack) => ({
          idea_id: data.id,
          tech_stack_id: +techStack,
        }))
      );

    if (techStacksError) {
      console.log("CREATE_IDEA_TECH_STACKS_ERROR", techStacksError);
      return { errorMessage: "Error occured when creating idea tech stacks" };
    }
  }

  redirect(`/ideas/${data.id}`);
};
