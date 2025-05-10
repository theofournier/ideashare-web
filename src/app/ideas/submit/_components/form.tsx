"use client";

import type React from "react";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { tags, type Difficulty } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Edit } from "lucide-react";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { submitIdea } from "@/lib/supabase/actions/idea/submitIdea";
import Link from "next/link";

// Mock tech stacks data
const techStackOptions = [
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

export default function SubmitIdeaForm() {
  const [state, formAction, isPending] = useActionState(submitIdea, {
    errorMessage: "",
  });

  const [fullDescription, setFullDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("edit");

  // Convert tags to combobox options
  const tagOptions: ComboboxOption[] = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    color: tag.color,
  }));

  const handleTagSelect = (tagId: string) => {
    setSelectedTags([...selectedTags, tagId]);
  };

  const handleTagRemove = (tagId: string) => {
    setSelectedTags(selectedTags.filter((id) => id !== tagId));
  };

  const handleTechStackSelect = (tech: string) => {
    setTechStack([...techStack, tech]);
  };

  const handleTechStackRemove = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

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
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter a catchy title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              placeholder="Brief summary of your idea (1-2 sentences)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <div className="rounded-md border">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit" className="flex items-center gap-2">
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
                    placeholder="Detailed explanation of your idea. Markdown is supported."
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
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
            <Select name="difficulty" defaultValue="beginner">
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Combobox
              name="tags"
              options={tagOptions}
              placeholder="Select tags"
              emptyMessage="No tags found."
              selectedValues={selectedTags}
              onSelect={handleTagSelect}
              onRemove={handleTagRemove}
              multiple={true}
            />
          </div>

          <div className="space-y-2">
            <Label>Tech Stack</Label>
            <Combobox
              name="techStacks"
              options={techStackOptions}
              placeholder="Select technologies"
              emptyMessage="No technologies found."
              selectedValues={techStack}
              onSelect={handleTechStackSelect}
              onRemove={handleTechStackRemove}
              multiple={true}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Link
          href="/browse"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Idea"}
        </Button>
      </div>
    </form>
  );
}
