"use client";

import { voteIdeaAction } from "@/lib/supabase/actions/idea/vote-idea-action";
import { Idea, IdeaVote } from "@/lib/supabase/types";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

type Props = {
  idea: Idea;
  full?: boolean;
};

export const IdeaVoteButton = ({ idea, full }: Props) => {
  const action = voteIdeaAction.bind(null, idea.id);
  const [state, formAction, isPending] = useActionState(action, {
    errorMessage: "",
  });

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant={idea.viewerVote ? "default" : "outline"}
        size={full ? "default" : "sm"}
        className={full ? "gap-2" : "gap-1"}
        disabled={isPending}
      >
        <ArrowUp className="h-4 w-4" />
        {full && <>{isPending ? "Upvoting..." : "Upvote"}</>}
        <span>{idea.activity?.voteCount}</span>
      </Button>
    </form>
  );
};
