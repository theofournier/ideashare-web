import { getIdeas } from "@/lib/supabase/queries/idea/getIdeas";
import { FilterBar } from "@/app/browse/_components/filter-bar";
import { ideas as mockIdeas, tags } from "@/lib/mock-data";
import { SideBar } from "./_components/side-bar";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { IdeaCard } from "@/components/idea/idea-card";
import { IdeaListItem } from "@/components/idea/idea-list-item";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const allTechStacks = Array.from(
  new Set(mockIdeas.flatMap((idea) => idea.techStack))
).sort();

export default async function BrowsePage() {
  const ideas = await getIdeas();

  const totalPages = Math.ceil(ideas?.length ?? 0 / 10);
  const currentPage = 1;
  const viewMode = "grid";

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page numbers to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis1");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis2");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Tech Project Ideas</h1>
        <p className="text-muted-foreground">
          Discover and explore tech project ideas shared by the community
        </p>
      </div>

      <div className="lg:hidden sticky top-16 mb-4 z-10 bg-card px-4 py-4 transition-shadow backdrop-blur-sm rounded-lg">
        <FilterBar tags={tags} techOptions={allTechStacks} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar for filters - only visible on desktop */}
        <SideBar>
          <FilterBar tags={tags} techOptions={allTechStacks} vertical={true} />
        </SideBar>

        {/* Main content area */}
        <div className={"flex-1 lg:ml-4"}>
          {/* View mode toggle */}
          <div className="flex justify-end mb-4">
            <div className="bg-muted inline-flex rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-sm"
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={"ghost"}
                size="sm"
                className="rounded-sm"
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Remove the standalone sort dropdown */}
          {!ideas ? (
            <div className="mt-12 text-center">
              <h3 className="text-xl font-medium">
                Error while fetching ideas
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try again later or contact support
              </p>
            </div>
          ) : ideas?.length === 0 ? (
            <div className="mt-12 text-center">
              <h3 className="text-xl font-medium">
                No ideas match your filters
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              {/* Conditional rendering based on view mode */}
              {viewMode === "grid" ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {ideas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {ideas!.map((idea) => (
                    <IdeaListItem key={idea.id} idea={idea} />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                    )}

                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === "ellipsis1" || page === "ellipsis2" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}

              <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing 6 of {ideas.length} ideas
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
