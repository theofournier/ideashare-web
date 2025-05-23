"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Idea } from "@/lib/supabase/types";
import { IdeaVoteButton } from "./idea-vote-button";

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const tags = idea.tags;

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg card-enhanced flex flex-col">
      <CardContent className="p-4 flex-grow">
        {/* Title and description at the top */}
        <Link href={`/ideas/${idea.id}`}>
          <h3 className="mb-2 text-xl font-bold hover:text-primary">
            {idea.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">
          {idea.shortDescription}
        </p>

        {/* Tags and difficulty below */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag.id} className={`${tag.color} text-white`}>
                {tag.name}
              </Badge>
            ))}
          </div>
          <Badge variant="outline">{idea.difficulty}</Badge>
        </div>

        {/* Tech Stack */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {idea.techStacks.map((tech) => (
              <span
                key={tech.id}
                className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
          <IdeaVoteButton idea={idea} />
        </div>
      </CardFooter>
    </Card>
  );
}
