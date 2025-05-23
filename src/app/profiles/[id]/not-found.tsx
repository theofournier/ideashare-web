import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserX } from "lucide-react";

export default function ProfileNotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6">
        <UserX className="w-24 h-24 mx-auto text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        Profile Not Found
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
        The user profile you are looking for does not exist or may have been
        removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/browse" className={buttonVariants()}>
          Browse Ideas
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
