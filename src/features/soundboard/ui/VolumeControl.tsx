import { memo } from "react";
import { Volume2, VolumeX } from "lucide-react";

export interface VolumeControlProps {
  volume: number;
  caption: string;
  hasActiveSounds?: boolean;
  onChange: (v: number) => void;
  onStopAll?: () => void;
}

export const VolumeControl = memo(
  ({ volume, caption, hasActiveSounds = false, onChange, onStopAll }: VolumeControlProps) => {
    return (
      <div className="mt-10 border-[3px] border-ink bg-paper p-5 sm:p-6 shadow-[6px_6px_0_var(--color-ink)]">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <label
            htmlFor="awkward"
            className="flex items-center gap-2 font-display text-xl sm:text-2xl font-semibold uppercase"
          >
            <Volume2 className="size-6 text-ink" />
            Уровень неловкости
          </label>
          <div className="flex items-center gap-4">
            {hasActiveSounds && onStopAll && (
              <button
                type="button"
                id="panic-stop-btn"
                onClick={onStopAll}
                className="cursor-pointer border-2 border-blood bg-blood px-3 py-1 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-paper shadow-[2px_2px_0_var(--color-ink)] transition-all hover:bg-ink hover:border-ink hover:text-paper active:translate-x-0.5 active:translate-y-0.5"
              >
                [ ТИШИНА! ]
              </button>
            )}
            <span className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-blood">
              {volume}%
            </span>
          </div>
        </div>
        <div className="relative mt-3">
          <input
            id="awkward"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => onChange(Number(e.target.value))}
            className="awkward"
            aria-label="Уровень громкости звуков"
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-ink/70">
          <p>→ {caption}</p>
          {volume === 0 && (
            <span className="inline-flex items-center gap-1 text-blood font-bold">
              <VolumeX className="size-4" /> ЗВУК ВЫКЛЮЧЕН
            </span>
          )}
        </div>
      </div>
    );
  }
);

VolumeControl.displayName = "VolumeControl";
