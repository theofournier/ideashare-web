import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card>
          <CardHeader>
            <CardTitle>IdeaShare</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeModeToggle />
          </CardContent>
          <CardFooter>
            <Button>Shadcn button</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
