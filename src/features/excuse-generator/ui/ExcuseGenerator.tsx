import { memo } from "react";
import { Reveal } from "@/shared/ui/reveal";
import { CategoryTabs } from "./CategoryTabs";
import { ExcuseCard } from "./ExcuseCard";
import { ExcuseActions } from "./ExcuseActions";

export const ExcuseGenerator = memo(function ExcuseGenerator() {
  return (
    <div className="w-full">
      <Reveal delay={60}>
        <CategoryTabs />
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto]">
          <ExcuseCard />
          <ExcuseActions />
        </div>
      </Reveal>
    </div>
  );
});