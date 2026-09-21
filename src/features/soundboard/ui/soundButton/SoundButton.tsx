import { memo } from "react";
import { cn } from "@/shared/lib/cn";
import { useSoundStore } from "@/features/soundboard";
import type { ISoundButtonProps } from "../../model/type/type"
import "./SoundButton.css"

export const SoundButton = memo(
  ({ id, label, sub, Icon }: ISoundButtonProps) => {

    const isActive = useSoundStore((s) => s.activeSounds.includes(id));

    const toggleSound = useSoundStore((s) => s.toggleSound);

    return (
      <button
        type="button"
        id={`sound-btn-${id}`}
        onClick={() => toggleSound(id)}
        aria-pressed={isActive}
        className={cn(
          "group flex items-center gap-4 border-[3px] border-ink p-4 text-left transition-all cursor-pointer select-none",
          "shadow-[5px_5px_0_var(--color-ink)] hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none",
          isActive ? "bg-ink text-paper" : "bg-paper hover:bg-paper-dark"
        )}
      >
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center border-2 transition-colors",
            isActive
              ? "border-paper/60 bg-blood text-paper"
              : "border-ink bg-paper group-hover:bg-ink group-hover:text-paper"
          )}
        >
          <Icon className="size-6" strokeWidth={2.2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-semibold uppercase leading-tight">
            {label}
          </span>
          <span className={cn("block truncate text-xs", isActive ? "text-paper/70" : "text-ink/60")}>
            {sub}
          </span>
        </span>
        {isActive ? (
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
