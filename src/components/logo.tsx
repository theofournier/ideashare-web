import { Lightbulb } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Lightbulb className="h-6 w-6" />
      <span className="text-xl font-bold">IdeaShare</span>
    </Link>
  );
};
