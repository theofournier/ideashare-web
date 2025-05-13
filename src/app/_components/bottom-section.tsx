import { buttonVariants } from "@/components/ui/button";
import { getSupabaseUser } from "@/lib/supabase/queries/auth/getSupabaseUser";
import Link from "next/link";

export const BottomSection = async () => {
  const user = await getSupabaseUser();
  return (
    <section className="bg-primary text-primary-foreground py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 max-w-[600px] text-primary-foreground/80">
            Join our community of developers and start discovering or sharing
            tech project ideas today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {!user && (
              <Link
                href="/register"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Sign Up
              </Link>
            )}
            <Link
              href="/browse"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
            >
              Browse Ideas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
