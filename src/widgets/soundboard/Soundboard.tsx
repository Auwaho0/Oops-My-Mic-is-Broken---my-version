import { useMemo } from "react";
import { SOUND_GROUPS } from "@/entities/sound";
import { Reveal } from "@/shared/ui/reveal";
import {
  GroupSection,
  VolumeControl,
  useSoundStore,
} from "@/features/soundboard";

function getAwkwardCaption(v: number): string {
  if (v <= 15) return "почти не слышно — «кажется, у тебя что-то шумит?»";
  if (v <= 40) return "уверенный фон — «да, это соседи, я не при чём»";
  if (v <= 70) return "громко — «извините, что вы говорите???»";
  return "максимум — соседи стучат в стену. пора эвакуироваться";
}

export function Soundboard() {
  const activeSounds = useSoundStore((state) => state.activeSounds);
  const volume = useSoundStore((state) => state.volume);
  const toggleSound = useSoundStore((state) => state.toggleSound);
  const stopAll = useSoundStore((state) => state.stopAll);
  const setVolume = useSoundStore((state) => state.setVolume);

  const caption = useMemo(() => getAwkwardCaption(volume), [volume]);

  return (
    <section id="sounds" className="bg-amber-100/60 border-t-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <Reveal>
          <p className="text-sm text-blood font-medium tracking-widest">
            // МОДУЛЬ А — ДЕКА ЗВУКОВ
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display font-bold uppercase leading-[0.9] text-[clamp(2.4rem,7vw,5.5rem)]">
              Фон, которому <span className="text-blood">верят</span>
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80">
            Жми на кнопку — включается зацикленный шум. Можно миксовать: перфоратор + плач
            ребёнка + звонок в дверь = железное алиби. Всё генерируется прямо в браузере Web Audio API, без
            единого mp3.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <VolumeControl
            volume={volume}
            caption={caption}
            hasActiveSounds={activeSounds.length > 0}
            onChange={setVolume}
            onStopAll={stopAll}
          />
        </Reveal>

        <div className="mt-12 space-y-12">
          {SOUND_GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 60}>
              <GroupSection
                group={g}
                activeSounds={activeSounds}
                onToggle={toggleSound}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Soundboard;
