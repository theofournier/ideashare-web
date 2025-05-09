"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePasswordAction } from "@/lib/supabase/actions/account/update-password-action";
import { Lock } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function PasswordForm() {
  const [state, formAction, isPending] = useActionState(updatePasswordAction, {
    errorMessage: "",
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Password updated successfully", {
        description: "Your password has been updated.",
      });
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            className="pl-10"
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
