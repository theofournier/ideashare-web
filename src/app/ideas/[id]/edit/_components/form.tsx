"use client";

import type React from "react";

import { useState, useActionState } from "react";
import Link from "next/link";
import { Edit, Eye, Save } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tags } from "@/lib/mock-data";
import { MultiSelect } from "@/components/ui/multi-select";

// Simple markdown preview component
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { DeleteIdeaDialog } from "@/app/ideas/[id]/edit/_components/delete-idea-dialog";
import { Idea } from "@/lib/supabase/types";
import { editIdeaAction } from "@/lib/supabase/actions/idea/edit-idea-action";
import { ComboboxOption } from "@/components/ui/combobox";

const techStackOptions: ComboboxOption[] = [
  { value: "1", label: "React" },
  { value: "2", label: "Next.js" },
  { value: "3", label: "Node.js" },
  { value: "4", label: "Python" },
  { value: "5", label: "TensorFlow" },
  { value: "6", label: "Django" },
  { value: "7", label: "Vue.js" },
  { value: "8", label: "Angular" },
  { value: "9", label: "Express" },
  { value: "10", label: "MongoDB" },
  { value: "11", label: "PostgreSQL" },
  { value: "12", label: "Firebase" },
  { value: "13", label: "AWS" },
  { value: "14", label: "Docker" },
  { value: "15", label: "Kubernetes" },
];

type Props = { idea: Idea };

export default function EditIdeaForm({ idea }: Props) {
  const action = editIdeaAction.bind(null, idea.id);
  const [state, formAction, isPending] = useActionState(action, {
    errorMessage: "",
  });
  const [fullDescription, setFullDescription] = useState(idea.fullDescription);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    idea.tags.map((tag) => `${tag.id}`)
  );
  const [techStack, setTechStack] = useState<string[]>(
    idea.techStacks.map((tech) => `${tech.id}`)
  );

  return (
    <form action={formAction} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide the core details about your project idea
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={idea.title}
                placeholder="Enter a catchy title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                defaultValue={idea.shortDescription}
                placeholder="Brief summary of your idea (1-2 sentences)"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description</Label>
              <div className="rounded-md border">
                <Tabs defaultValue="edit" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="edit"
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger
                      value="preview"
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit" className="p-0">
                    <Textarea
                      id="fullDescription"
                      name="fullDescription"
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                      placeholder="Detailed explanation of your idea. Markdown is supported."
                      className="min-h-[300px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                    <div className="border-t p-3">
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-1">Markdown supported:</p>
                        <div className="flex flex-wrap gap-2">
                          <code className="rounded bg-muted px-1 py-0.5">
                            # Heading
                          </code>
                          <code className="rounded bg-muted px-1 py-0.5">
                            **Bold**
                          </code>
                          <code className="rounded bg-muted px-1 py-0.5">
                            *Italic*
                          </code>
                          <code className="rounded bg-muted px-1 py-0.5">
                            [Link](url)
                          </code>
                          <code className="rounded bg-muted px-1 py-0.5">
                            - List item
                          </code>
                          <code className="rounded bg-muted px-1 py-0.5">
                            \`\`\`code\`\`\`
                          </code>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="preview" className="p-4">
                    {fullDescription ? (
                      <div className="prose prose-invert dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code(props) {
                              const {
                                children,
                                className,
                                node,
                                ref,
                                style,
                                ...rest
                              } = props;
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
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
                          {fullDescription}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        <p>Your preview will appear here</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Categorize and provide technical details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select name="difficulty" defaultValue={idea.difficulty}>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent defaultValue={idea.difficulty}>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <MultiSelect
              name="tags"
              options={tags.map((tag) => ({
                label: tag.name,
                value: tag.id,
                color: tag.color,
              }))}
              selected={selectedTags}
              onChange={(values) => setSelectedTags(values)}
              placeholder="Select tags"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <MultiSelect
              name="techStacks"
              options={techStackOptions}
              selected={techStack}
              onChange={(values) => setTechStack(values)}
              placeholder="Select technologies"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
        <DeleteIdeaDialog idea={idea} />

        <div className="flex gap-4">
          <Link
            href={`/idea/${idea.id}`}
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Cancel
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              "Saving..."
            ) : (
              <>
                <Save />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
