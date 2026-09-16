import { memo } from "react";
import { Menu } from "@/widgets/menu";
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Ticker } from "@/widgets/ticker";
import { Soundboard } from "@/widgets/soundboard";
import { GeneratorWidget } from "@/widgets/generator";

export const HomePage = memo(() => {
  return (
    <main>
      <Menu />
      <Hero />
      <About />
      <Ticker />
      <Soundboard />
      <GeneratorWidget />
    </main>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
