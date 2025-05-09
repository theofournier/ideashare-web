import { createClient } from "../../clients/server";
import { ideaMapping } from "../../supabaseMapping";

type IdeaSearchParams = {
  userId?: string;
};

export const getIdeas = async (params?: IdeaSearchParams) => {
  const supabase = await createClient();

  try {
    let query = supabase
      .from("ideas")
      .select(
        "*, profiles!ideas_user_id_fkey1(*), idea_tags(*, tags(*)), idea_tech_stacks(*, tech_stacks(*)), idea_activities(*)"
      );

    if (params) {
      const { userId } = params;
      if (userId) {
        query = query.eq("user_id", userId);
      }
    }

    const { data, error } = await query;

    if (!data || error) {
      console.error("Error fetching ideas:", error);
      return null;
    }
    return data.map((idea) =>
      ideaMapping(
        idea,
        idea.profiles,
        idea.idea_tags,
        idea.idea_tech_stacks,
        idea.idea_activities
      )
    );
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return null;
  }
};
