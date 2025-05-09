"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAccountAction } from "@/lib/supabase/actions/account/delete-account-action";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";

export const DeleteForm = () => {
  const [state, formAction, isPending] = useActionState(deleteAccountAction, {
    errorMessage: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone and all your data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <p className="font-medium">This will:</p>
          <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
            <li>Delete your profile and personal information</li>
            <li>Remove all your submitted ideas</li>
            <li>Remove your comments and upvotes</li>
            <li>Cancel any active subscriptions</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>

          <form action={formAction}>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Deleting..." : "Delete Account"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
