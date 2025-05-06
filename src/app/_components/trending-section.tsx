import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getTagById, ideas } from "@/lib/mock-data";
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const TrendingSection = () => {
  // Get trending ideas (most upvoted)
  const trendingIdeas = [...ideas]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 20);
  const [currentPage, setCurrentPage] = useState(0);

  // Number of cards to show per page based on screen size
  const cardsPerPage = 4;
  const totalPages = Math.ceil(trendingIdeas.length / cardsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current page of ideas
  const currentIdeas = trendingIdeas.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Trending Ideas</h2>
          <Link
            href="/browse"
            className={buttonVariants({
              variant: "ghost",
              className: "gap-1",
            })}
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentIdeas.map((idea) => (
              <Card
                key={idea.id}
                className="h-full overflow-hidden transition-all hover:shadow-md card-enhanced flex flex-col relative"
              >
                <CardContent className="p-4 flex-grow">
                  {/* Title and description at the top */}
                  <Link href={`/idea/${idea.id}`}>
                    <h3 className="mb-1 text-sm font-bold line-clamp-2 hover:text-primary">
                      {idea.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {idea.shortDescription}
                  </p>

                  {/* Tags and difficulty below */}
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 1).map((tagId) => {
                        const tag = getTagById(tagId);
                        return tag ? (
                          <Badge
                            key={tag.id}
                            className={`${tag.color} text-white text-[10px] px-1.5 py-0`}
                          >
                            {tag.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {idea.difficulty}
                    </Badge>
                  </div>

                  {/* Tech Stack - simplified */}
                  <div className="mt-1">
                    <div className="flex flex-wrap gap-1">
                      {idea.techStack.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border px-1.5 py-0 text-[10px] font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {idea.techStack.length > 2 && (
                        <span className="inline-flex items-center rounded-full border px-1.5 py-0 text-[10px] font-medium text-muted-foreground">
                          +{idea.techStack.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-2 pt-0">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <ArrowUp className="h-2.5 w-2.5" />
                      <span>{idea.upvotes}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center mt-4 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={prevPage}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === currentPage ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={nextPage}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
