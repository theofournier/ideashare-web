import { createClient } from "../../clients/server";
import { ideaMapping, ideaVoteMapping } from "../../supabaseMapping";
import { Idea, IdeaVote } from "../../types";
import { getSupabaseUser } from "../auth/getSupabaseUser";

type IdeaSearchParams = {
  userId?: string;
};

export const getIdeas = async (
  params?: IdeaSearchParams
): Promise<Idea[] | null> => {
  const supabase = await createClient();

  const user = await getSupabaseUser();

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

    let viewerVotes: IdeaVote[] = [];

    if (user) {
      const { data: voteData, error: voteError } = await supabase
        .from("idea_votes")
        .select("*")
        .eq("user_id", user.id)
        .in(
          "idea_id",
          data.map((idea) => idea.id)
        );

      if (voteError) {
        console.error("Error fetching idea votes:", voteError);
      }
      viewerVotes = voteData?.map((vote) => ideaVoteMapping(vote)) || [];
    }

    return data.map((idea) => ({
      ...ideaMapping(
        idea,
        idea.profiles,
        idea.idea_tags,
        idea.idea_tech_stacks,
        idea.idea_activities
      ),
      viewerVote: viewerVotes.find((vote) => vote.ideaId === idea.id),
    }));
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return null;
  }
};
