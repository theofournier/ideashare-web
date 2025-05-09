import { createClient } from "../../clients/server";
import { profileMapping } from "../../supabaseMapping";
import { Profile } from "../../types";

export async function getProfile(id: string): Promise<Profile | null> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      console.log(`Error fetching profile ${id}:`, error);
      return null;
    }
    return profileMapping(data);
  } catch (error) {
    console.log(`Error fetching profile ${id}:`, error);
    return null;
  }
}
