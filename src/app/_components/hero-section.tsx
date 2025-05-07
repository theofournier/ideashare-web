import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover and Share Tech Project Ideas
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Find inspiration for your next project, share your ideas with
                the community, and collaborate with other developers.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/browse" className={buttonVariants({ size: "lg" })}>
                Browse Ideas
                <ArrowRight />
              </Link>
              <Link
                href="/ideas/submit"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Submit Your Idea
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <Image
                src="/placeholder.svg?key=o5bep"
                alt="Developers sharing ideas"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
