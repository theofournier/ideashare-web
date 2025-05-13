import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ideas } from "@/lib/mock-data";
import { ReportIdeaModal } from "@/app/ideas/[id]/_components/report-idea-modal";
import { SimilarIdeas } from "@/components/idea/similar-ideas";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card, CardContent } from "@/components/ui/card";
import { NextPageProps } from "@/lib/type";
import { getIdea } from "@/lib/supabase/queries/idea/getIdea";
import { IdeaVoteButton } from "@/components/idea/idea-vote-button";

export default async function IdeaDetailPage({
  params,
}: NextPageProps<{ id: string }>) {
  const { id } = await params;
  const idea = await getIdea({ id });
  if (!idea) {
    notFound();
  }

  const similarIdeas = ideas.slice(0, 6);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <Link
          href="/browse"
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to ideas
        </Link>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">{idea.title}</h1>
            <p className="mt-2 text-muted-foreground">
              {idea.shortDescription}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/ideas/${id}/edit`}
              className={buttonVariants({ variant: "outline" })}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
            <IdeaVoteButton idea={idea} full />
            <ReportIdeaModal ideaId={id} ideaTitle={idea.title} />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, node, ref, style, ...rest } =
                    props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...rest}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {idea.fullDescription}
            </ReactMarkdown>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="px-4">
              <h3 className="mb-3 text-lg font-medium">Project Details</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Difficulty
                  </h4>
                  <Badge variant="outline" className="mt-1">
                    {idea.difficulty}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Tags
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {idea.tags.map((tag) => (
                      <Badge key={tag.id} className={`${tag.color} text-white`}>
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Suggested Tech Stack
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {idea.techStacks.map((tech) => (
                      <Badge key={tech.id} variant="secondary">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Submitted by
                  </h4>
                  <div className="mt-2 flex items-center">
                    {idea.profile ? (
                      <span className="font-medium">
                        {idea.profile.username}
                      </span>
                    ) : (
                      <span className="font-medium">Unknown User</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Submitted on
                  </h4>
                  <p className="mt-1">
                    {new Date(idea.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Ideas */}
          {similarIdeas.length > 0 && (
            <Card>
              <CardContent className="px-4">
                <SimilarIdeas currentIdeaId={id} similarIdeas={similarIdeas} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
