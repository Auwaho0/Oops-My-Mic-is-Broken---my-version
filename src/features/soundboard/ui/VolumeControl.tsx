import { memo, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundStore } from "@/features/soundboard";
import { cn } from "@/shared";
import { ACTIVE_STYLE, DISABLED_STYLE, baseStyle } from "../model/VolumeControlButtons";


function getAwkwardCaption(v: number): string {
  if (v <= 15) return "почти не слышно — «кажется, у тебя что-то шумит?»";
  if (v <= 40) return "уверенный фон — «да, это соседи, я не при чём»";
  if (v <= 70) return "громко — «извините, что вы говорите???»";
  return "максимум — соседи стучат в стену. пора эвакуироваться";
}

export const VolumeControl = memo(function VolumeControl() {
  const volume = useSoundStore((s) => s.volume);
  const setVolume = useSoundStore((s) => s.setVolume);
  const stopAll = useSoundStore((s) => s.stopAll);
  const hasActiveSounds = useSoundStore((s) => s.activeSounds.length > 0);

  const caption = getAwkwardCaption(volume);

  const handleSilence = useCallback(() => setVolume(0), [setVolume]);
  const handleStopAll = useCallback(() => stopAll(), [stopAll]);

  return (
    <div className="mt-10 border-[3px] border-ink bg-paper p-5 shadow-[6px_6px_0_var(--color-ink)] sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label
          htmlFor="awkward"
          className="flex items-center gap-2 font-display text-xl font-semibold uppercase sm:text-2xl"
        >
          <Volume2 className="size-6 text-ink" aria-hidden />
          Уровень неловкости
        </label>

        <div className="flex items-center gap-4">
          <button
            type="button"
            id="panic-stop-btn"
            onClick={handleSilence}
            className={cn(baseStyle, ACTIVE_STYLE)}
          >
            [ ТИШИНА! ]
          </button>

          <button
            type="button"
            id="panic-stopAll-btn"
            disabled={!hasActiveSounds}
            onClick={handleStopAll}
            className={cn(
              baseStyle,
              hasActiveSounds ? ACTIVE_STYLE : DISABLED_STYLE
            )}
          >
            [ Отключить все! ]
          </button>

          <span className="font-display text-2xl font-bold tabular-nums text-blood sm:text-3xl">
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
          onChange={(e) => setVolume(e.currentTarget.valueAsNumber)}
          className="awkward"
          aria-label="Уровень громкости звуков"
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-ink/70 sm:text-sm">
        <p>→ {caption}</p>
        {volume === 0 && (
          <span className="inline-flex items-center gap-1 font-bold text-blood">
            <VolumeX className="size-4" aria-hidden /> ЗВУК ВЫКЛЮЧЕН
          </span>
        )}
      </div>
    </div>
  );
});