import { Constants, Database } from "./database.types";
import { Idea, IdeaActivity, Profile, Tag, TechStack } from "./types";

type SupabaseProfile = Database["public"]["Tables"]["profiles"]["Row"];
type IdeaTag = Database["public"]["Tables"]["idea_tags"]["Row"] & {
  tags: Database["public"]["Tables"]["tags"]["Row"];
};
type IdeaTechStack = Database["public"]["Tables"]["idea_tech_stacks"]["Row"] & {
  tech_stacks: Database["public"]["Tables"]["tech_stacks"]["Row"];
};

export const profileMapping = (profile: SupabaseProfile): Profile => ({
  id: profile.id,
  username: profile.username || undefined,
});

export const ideaMapping = (
  idea: Database["public"]["Tables"]["ideas"]["Row"],
  profile: SupabaseProfile | null,
  ideaTags: IdeaTag[],
  ideaTechStacks: IdeaTechStack[],
  activity: Database["public"]["Tables"]["idea_activities"]["Row"] | null
): Idea => ({
  id: idea.id,
  title: idea.title,
  shortDescription: idea.short_description,
  fullDescription: idea.full_description,
  difficulty: idea.difficulty,
  status: idea.status,
  createdAt: idea.created_at,
  updatedAt: idea.updated_at,
  userId: idea.user_id || undefined,

  profile: profile ? profileMapping(profile) : undefined,
  tags: ideaTags.map((ideaTag) => tagMapping(ideaTag.tags)),
  techStacks: ideaTechStacks.map((ideaTechStack) =>
    techStackMapping(ideaTechStack.tech_stacks)
  ),
  activity: activity ? ideaActivityMapping(activity) : undefined,
});

export const ideaActivityMapping = (
  activity: Database["public"]["Tables"]["idea_activities"]["Row"]
): IdeaActivity => ({
  voteCount: activity.vote_count,
  viewCount: activity.view_count,
});

export const tagMapping = (
  tag: Database["public"]["Tables"]["tags"]["Row"]
): Tag => ({
  id: tag.id,
  name: tag.name,
  color: tag.color,
});
export const techStackMapping = (
  techStack: Database["public"]["Tables"]["tech_stacks"]["Row"]
): TechStack => ({
  id: techStack.id,
  name: techStack.name,
});
