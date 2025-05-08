import { Database } from "./database.types";
import { Profile } from "./types";

type SupabaseProfile = Database["public"]["Tables"]["profiles"]["Row"];

export const profileMapping = (profile: SupabaseProfile): Profile => ({
  id: profile.id,
  username: profile.username || undefined,
});
