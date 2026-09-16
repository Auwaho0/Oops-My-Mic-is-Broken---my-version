import { memo } from "react";

interface VolumeControlProps {
  volume: number;
  caption: string;
  onChange: (v: number) => void;
}

export const VolumeControl = memo(({ volume, caption, onChange }: VolumeControlProps) => {
  return (
    <div className="mt-10 border-[3px] border-ink bg-paper p-5 sm:p-6 shadow-[6px_6px_0_var(--color-ink)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label
          htmlFor="awkward"
          className="font-display text-xl sm:text-2xl font-semibold uppercase"
        >
          Уровень неловкости
        </label>
        <span className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-blood">
          {volume}%
        </span>
      </div>
      <input
        id="awkward"
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
        className="awkward mt-3"
      />
      <p className="mt-2 text-xs sm:text-sm text-ink/70">→ {caption}</p>
    </div>
  );
});

VolumeControl.displayName = "VolumeControl";