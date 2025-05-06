import { Lightbulb, Users, Zap } from "lucide-react";
import { ElementType } from "react";

const Section = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: ElementType;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-primary/40 p-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const HowSection = () => {
  const sections = [
    {
      title: "Discover Ideas",
      description:
        "Browse through a curated collection of tech project ideas across various categories and difficulty levels.",
      Icon: Lightbulb,
    },
    {
      title: "Share Your Ideas",
      description:
        "Submit your own project ideas to inspire others and get feedback from the community.",
      Icon: Zap,
    },
    {
      title: "Collaborate",
      description:
        "Connect with other developers, upvote ideas you like, and collaborate on projects.",
      Icon: Users,
    },
  ];
  return (
    <section className="py-10">
      <div className="container mx-auto space-y-10 px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Section
              key={section.title}
              title={section.title}
              description={section.description}
              Icon={section.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
