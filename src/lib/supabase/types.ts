import { Database } from "./database.types";

export type Profile = {
  id: string;
  username?: string;
};

export type CurrentUser = Profile & {
  email?: string;
};

export type IdeaDifficulty = Database["public"]["Enums"]["idea_difficulty"];

export type IdeaStatus = Database["public"]["Enums"]["idea_status"];

export type Idea = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  difficulty: IdeaDifficulty;
  status: IdeaStatus;
  createdAt: string;
  updatedAt: string;
  userId?: string;

  profile?: Profile;
  tags: Tag[];
  techStacks: TechStack[];
  activity?: IdeaActivity;
  viewerVote?: IdeaVote;
};
export type Tag = {
  id: number;
  name: string;
  color: string;
};
export type TechStack = {
  id: number;
  name: string;
};
export type IdeaActivity = {
  voteCount: number;
  viewCount: number;
};
export type IdeaVote = {
  ideaId: string;
  userId: string;
  createdAt: string;
};

export type ReportReason = Database["public"]["Enums"]["report_reason"];

export type ReportStatus = Database["public"]["Enums"]["report_status"];
