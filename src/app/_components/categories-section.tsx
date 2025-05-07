"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ideas, tags } from "@/lib/mock-data";
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CategoriesSection = () => {
  const cardsPerPage = 4;

  // Get popular tags
  const popularTags = [...tags].slice(0, 6);

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Set first category as default on initial render
  useEffect(() => {
    if (popularTags.length > 0 && !selectedCategory) {
      setSelectedCategory(popularTags[0].id);
    }
  }, [popularTags, selectedCategory]);

  // Get ideas for selected category
  const categoryIdeas = selectedCategory
    ? [...ideas]
        .filter((idea) => idea.tags.includes(selectedCategory))
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, 20)
    : [];

  // Category carousel state
  const [categoryPage, setCategoryPage] = useState(0);
  const categoryTotalPages = Math.ceil(categoryIdeas.length / cardsPerPage);

  const nextCategoryPage = () => {
    setCategoryPage((prev) => (prev + 1) % categoryTotalPages);
  };

  const prevCategoryPage = () => {
    setCategoryPage(
      (prev) => (prev - 1 + categoryTotalPages) % categoryTotalPages
    );
  };

  // Get current page of category ideas
  const currentCategoryIdeas = categoryIdeas.slice(
    categoryPage * cardsPerPage,
    (categoryPage + 1) * cardsPerPage
  );

  // Get selected category name
  const selectedCategoryName = selectedCategory
    ? popularTags.find((tag) => tag.id === selectedCategory)?.name
    : "";
  return (
    <section className="bg-muted/50 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-3xl font-bold">Popular Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {popularTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedCategory(tag.id)}
              className={`${
                tag.color
              } h-full rounded-lg p-6 text-white transition-transform hover:scale-105 text-left ${
                selectedCategory === tag.id
                  ? "ring-4 ring-offset-2 ring-offset-background ring-primary"
                  : ""
              }`}
            >
              <h3 className="text-xl font-bold">{tag.name}</h3>
              <p className="mt-2 text-sm text-white/80">
                {ideas.filter((idea) => idea.tags.includes(tag.id)).length}{" "}
                ideas
              </p>
            </button>
          ))}
        </div>

        {/* Category Ideas */}
        {selectedCategory && currentCategoryIdeas.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                {selectedCategoryName} Ideas
              </h3>
              <Link
                href={`/browse?tag=${selectedCategory}`}
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
                {currentCategoryIdeas.map((idea) => (
                  <Card
                    key={idea.id}
                    className="h-full overflow-hidden transition-all hover:shadow-md card-enhanced flex flex-col relative"
                  >
                    <CardContent className="p-4 flex-grow">
                      {/* Title and description at the top */}
                      <Link href={`/ideas/${idea.id}`}>
                        <h3 className="mb-1 text-sm font-bold line-clamp-2 hover:text-primary">
                          {idea.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {idea.shortDescription}
                      </p>

                      {/* Difficulty below */}
                      <div className="mb-1 flex items-center justify-between">
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

              {/* Category Carousel Controls */}
              {categoryTotalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={prevCategoryPage}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: categoryTotalPages }).map((_, i) => (
                      <button
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i === categoryPage
                            ? "bg-primary"
                            : "bg-muted-foreground/30"
                        }`}
                        onClick={() => setCategoryPage(i)}
                        aria-label={`Go to page ${i + 1}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={nextCategoryPage}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
