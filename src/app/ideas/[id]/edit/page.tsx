import { getIdea } from "@/lib/supabase/queries/idea/getIdea";
import { NextPageProps } from "@/lib/type";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditIdeaForm from "./_components/form";

export default async function EditIdeaPage({
  params,
}: NextPageProps<{ id: string }>) {
  const { id } = await params;
  const idea = await getIdea({ id });
  if (!idea) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            href={`/ideas/${id}`}
            className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to idea
          </Link>
          <h1 className="text-3xl font-bold">Edit Idea</h1>
        </div>

        <EditIdeaForm idea={idea} />
      </div>
    </div>
  );
}
