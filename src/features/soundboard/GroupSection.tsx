import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { SoundButton } from "./SoundButton";
import type { SoundId } from "@/audio/engine";

export interface Group {
  title: string;
  note: string;
  items: { id: SoundId; label: string; sub: string; Icon: LucideIcon }[];
}

interface GroupSectionProps {
  group: Group;
  active: Set<SoundId>;
  onToggle: (id: SoundId) => void;
}

export const GroupSection = memo(({ group, active, onToggle }: GroupSectionProps) => {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase">
          {group.title}
        </h3>
        <span className="text-xs text-ink/60">{group.note}</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map(({ id, label, sub, Icon }) => (
          <SoundButton
            key={id}
            id={id}
            label={label}
            sub={sub}
            Icon={Icon}
            on={active.has(id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </>
  );
});

GroupSection.displayName = "GroupSection";