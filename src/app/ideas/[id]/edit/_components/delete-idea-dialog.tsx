"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";
import { Idea } from "@/lib/supabase/types";
import { deleteIdeaAction } from "@/lib/supabase/actions/idea/delete-idea-action";

interface Props {
  idea: Idea;
}

export function DeleteIdeaDialog({ idea }: Props) {
  const action = deleteIdeaAction.bind(null, idea.id);
  const [state, formAction, isPending] = useActionState(action, {
    errorMessage: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" title="Delete idea">
          <Trash2 className="h-4 w-4" />
          <span>Delete idea</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Idea</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{idea.title}&quot;? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <form action={formAction}>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Deleting..." : "Delete idea"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
