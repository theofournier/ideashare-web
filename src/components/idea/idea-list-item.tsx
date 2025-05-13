"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Idea } from "@/lib/supabase/types";
import { IdeaVoteButton } from "./idea-vote-button";

interface IdeaListItemProps {
  idea: Idea;
}

export function IdeaListItem({ idea }: IdeaListItemProps) {
  const tags = idea.tags;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-all bg-card text-card-foreground card-enhanced">
      {/* Left section with title and description */}
      <div className="flex-grow">
        <Link href={`/idea/${idea.id}`}>
          <h3 className="text-xl font-bold hover:text-primary mb-2">
            {idea.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {idea.shortDescription}
        </p>

        {/* Tags and tech stack */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex flex-wrap gap-1 mr-2">
            {tags.map((tag) => (
              <Badge key={tag.id} className={`${tag.color} text-white`}>
                {tag.name}
              </Badge>
            ))}
          </div>

          <Badge variant="outline" className="mr-2">
            {idea.difficulty}
          </Badge>

          <div className="flex flex-wrap gap-1">
            {idea.techStacks.slice(0, 3).map((tech) => (
              <span
                key={tech.id}
                className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground"
              >
                {tech.name}
              </span>
            ))}
            {idea.techStacks.length > 3 && (
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                +{idea.techStacks.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right section with date and upvote */}
      <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 sm:min-w-[100px]">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
        </div>
        <IdeaVoteButton idea={idea} />
      </div>
    </div>
  );
}
