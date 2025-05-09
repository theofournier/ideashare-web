import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdeaCard } from "@/components/idea-card";
import { ideas, userVotes } from "@/lib/mock-data";
import { redirect } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { getProfile } from "@/lib/supabase/queries/profile/getProfile";
import { NextPageProps } from "@/lib/type";

export default async function ProfilePage({
  params,
}: NextPageProps<{ id: string }>) {
  const { id } = await params;
  const profile = await getProfile(id);
  if (!profile) {
    redirect("/login");
  }

  const upvotedIdeas = userVotes["1"] || [];

  const userSubmittedIdeas = ideas;

  const userLikedIdeas = ideas.filter((idea) => upvotedIdeas.includes(idea.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-center space-x-4">
        <CircleUserRound />
        <h1 className="text-2xl font-bold">{profile.username}</h1>
      </div>

      <Tabs defaultValue="submitted" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submitted">My Ideas</TabsTrigger>
          <TabsTrigger value="upvoted">Upvoted Ideas</TabsTrigger>
        </TabsList>

        <TabsContent value="submitted" className="mt-6">
          {userSubmittedIdeas.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userSubmittedIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  isUpvoted={upvotedIdeas.includes(idea.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-xl font-medium">
                You have not submitted any ideas yet
              </h3>
              <p className="mt-2 text-muted-foreground">
                Share your first idea with the community
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upvoted" className="mt-6">
          {userLikedIdeas.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userLikedIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} isUpvoted={true} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-xl font-medium">
                You have not upvoted any ideas yet
              </h3>
              <p className="mt-2 text-muted-foreground">
                Browse ideas and upvote the ones you like
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
