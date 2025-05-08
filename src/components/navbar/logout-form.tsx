import { logout } from "@/lib/supabase/actions/auth/logout";
import { useActionState } from "react";
import { Button } from "../ui/button";

export const LogoutForm = () => {
  const [state, formAction, isPending] = useActionState(logout, {});

  return (
    <form action={formAction}>
      <Button type="submit" variant="destructive" disabled={isPending}>
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </form>
  );
};
