import { createClient } from "../../clients/server";

export const getSupabaseUser = async () => {
  const supabase = await createClient();

  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      console.error("Error fetching auth user:", userError);
      return null;
    }
    return userData.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
