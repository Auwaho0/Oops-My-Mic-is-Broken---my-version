import { memo } from "react";
import type { SoundCategoryGroup } from "@/entities/sound";
import type { SoundId } from "@/shared/lib/audio";
import { SoundButton } from "./SoundButton";

export interface GroupSectionProps {
  group: SoundCategoryGroup
}

export const GroupSection = memo(({ group }: GroupSectionProps) => {



  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
          {group.title}
        </h3>
        <span className="text-xs sm:text-sm text-ink/70">/// {group.note}</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <SoundButton
            key={item.id}
            id={item.id}
            label={item.label}
            sub={item.sub}
            Icon={item.Icon}
          />
        ))}
      </div>
    </div>
  );
});

GroupSection.displayName = "GroupSection";
