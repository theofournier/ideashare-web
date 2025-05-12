import { getCurrentUser } from "@/lib/supabase/queries/auth/getCurrentUser";
import SubmitIdeaForm from "./_components/form";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function SubmitIdeaPage() {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Submit a New Idea</h1>
          <p className="text-muted-foreground">
            Share your tech project idea with the community
          </p>
        </div>
        {user ? (
          <SubmitIdeaForm />
        ) : (
          <Card className="mb-8">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 dark:bg-primary/40 p-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">Login Required</h2>
              <p className="mb-4 text-muted-foreground">
                You need to be logged in to submit a new idea. Please log in to
                share your project ideas with the community.
              </p>
              <Link href="/login?next=/ideas/submit" className={buttonVariants()}>
                <LogIn />
                Login
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
