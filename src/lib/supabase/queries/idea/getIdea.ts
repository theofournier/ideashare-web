import { createClient } from "../../clients/server";
import { ideaMapping, ideaVoteMapping } from "../../supabaseMapping";
import { Idea, IdeaVote } from "../../types";
import { getSupabaseUser } from "../auth/getSupabaseUser";

type IdeaParams = {
  id: string;
};

export const getIdea = async (params: IdeaParams): Promise<Idea | null> => {
  const supabase = await createClient();

  const user = await getSupabaseUser();

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

    let viewerVote: IdeaVote | undefined = undefined;

    if (user) {
      const { data: voteData, error: voteError } = await supabase
        .from("idea_votes")
        .select("*")
        .eq("user_id", user.id)
        .eq("idea_id", params.id)
        .single();

      if (voteError) {
        console.error("Error fetching idea votes:", voteError);
      }
      viewerVote = voteData ? ideaVoteMapping(voteData) : undefined;
    }

    return {
      ...ideaMapping(
        data,
        data.profiles,
        data.idea_tags,
        data.idea_tech_stacks,
        data.idea_activities
      ),
      viewerVote,
    };
  } catch (error) {
    console.error("Error fetching idea:", error);
    return null;
  }
};
