import { Constants } from "./database.types";
import {
  IdeaDifficulty,
  IdeaStatus,
  ReportReason,
  ReportStatus,
} from "./types";

export const ideaStatuses: readonly IdeaStatus[] =
  Constants["public"]["Enums"]["idea_status"];
export const ideaDifficulties: readonly IdeaDifficulty[] =
  Constants["public"]["Enums"]["idea_difficulty"];
export const reportReasons: readonly ReportReason[] =
  Constants["public"]["Enums"]["report_reason"];
export const reportStatuses: readonly ReportStatus[] =
  Constants["public"]["Enums"]["report_status"];
