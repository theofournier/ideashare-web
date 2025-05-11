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
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface DeleteIdeaDialogProps {
  ideaTitle: string;
}

export function DeleteIdeaDialog({ ideaTitle }: DeleteIdeaDialogProps) {
  //const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteIdea = async () => {
    setIsDeleting(true);

    try {
      // In a real app, this would be an API call to delete the idea
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Idea deleted", {
        description: "Your idea has been successfully deleted",
      });

      // Redirect to the browse page
      //router.push("/browse");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete idea. Please try again.",
      });
      setIsDeleting(false);
    }
  };
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
            Are you sure you want to delete &quot;{ideaTitle}&quot;? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteIdea}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete idea"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
