"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAccountInfoAction } from "@/lib/supabase/actions/account/update-account-info-action";
import { Mail, User } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  email?: string;
  username?: string;
};

export default function AccountInfoForm({ email, username }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateAccountInfoAction,
    {
      errorMessage: "",
      success: false,
    }
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Account information updated successfully", {
        description: "Your account information has been updated.",
      });
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              name="username"
              placeholder="Your name"
              className="pl-10"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              className="pl-10"
              defaultValue={email}
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
