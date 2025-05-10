import { createClient } from "../../clients/server";
import { ideaMapping } from "../../supabaseMapping";

type IdeaParams = {
  id: string;
};

export const getIdea = async (params: IdeaParams) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("ideas")
      .select(
        "*, profiles!ideas_user_id_fkey1(*), idea_tags(*, tags(*)), idea_tech_stacks(*, tech_stacks(*)), idea_activities(*)"
      )
      .eq("id", params.id)
      .single();

    if (!data || error) {
      console.error("Error fetching idea:", error);
      return null;
    }
    return ideaMapping(
      data,
      data.profiles,
      data.idea_tags,
      data.idea_tech_stacks,
      data.idea_activities
    );
  } catch (error) {
    console.error("Error fetching idea:", error);
    return null;
  }
};
