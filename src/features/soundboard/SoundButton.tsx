import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import type { SoundId } from "@/audio/engine";

interface SoundButtonProps {
  id: SoundId;
  label: string;
  sub: string;
  Icon: LucideIcon;
  on: boolean;
  onToggle: (id: SoundId) => void;
}

export const SoundButton = memo(
  ({ id, label, sub, Icon, on, onToggle }: SoundButtonProps) => {
    return (
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-pressed={on}
        className={cn(
          "group flex items-center gap-4 border-[3px] border-ink p-4 text-left transition-all cursor-pointer",
          "shadow-[5px_5px_0_var(--color-ink)] hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none",
          on ? "bg-ink text-paper" : "bg-paper hover:bg-paper-dark",
        )}
      >
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center border-2 transition-colors",
            on
              ? "border-paper/60 bg-blood text-paper"
              : "border-ink bg-paper group-hover:bg-ink group-hover:text-paper",
          )}
        >
          <Icon className="size-6" strokeWidth={2.2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-semibold uppercase leading-tight">
            {label}
          </span>
          <span className={cn("block truncate text-xs", on ? "text-paper/70" : "text-ink/60")}>
            {sub}
          </span>
        </span>
        {on ? (
          <span className="eq flex h-4 items-end gap-[3px] text-blood" aria-label="играет">
            <span />
            <span />
            <span />
            <span />
          </span>
        ) : (
          <span className="text-[10px] tracking-widest text-ink/40 group-hover:text-ink/70">
            ВЫКЛ
          </span>
        )}
      </button>
    );
  }
);

SoundButton.displayName = "SoundButton";