import { HeroSection } from "./_components/hero-section";
import { HowSection } from "./_components/how-section";
import { BottomSection } from "./_components/bottom-section";
import { CategoriesSection } from "./_components/categories-section";
import { TrendingSection } from "./_components/trending-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <TrendingSection />

      <CategoriesSection />

      <HowSection />

      <BottomSection />
    </div>
  );
}
