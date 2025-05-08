import { USE_MOCK_DATA } from "@/lib/utils";
import { createClient } from "../../clients/server";
import { profileMapping } from "../../supabaseMapping";
import { CurrentUser } from "../../types";
import { currentUserMock } from "../../mocks";

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return currentUserMock;
  }

  const supabase = await createClient();

  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      console.error("Error fetching auth user:", userError);
      return null;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();
    if (profileError || !profileData) {
      console.error("Error fetching current profile:", profileError);
      return null;
    }
    return { ...profileMapping(profileData), email: userData.user.email };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
