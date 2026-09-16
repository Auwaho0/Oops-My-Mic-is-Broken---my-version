import { useCallback, useMemo, useState } from "react";

import { type SoundId } from "@/audio/engine";
import Reveal from "@/shared/ui/reveal/Reveal";
import { GroupSection } from "@/features/soundboard/GroupSection";
import { VolumeControl } from "@/features/soundboard/VolumeControl";
import { GROUPS } from "./data/data"



function awkwardCaption(v: number): string {
  if (v <= 15) return "почти не слышно — «кажется, у тебя что-то шумит?»";
  if (v <= 40) return "уверенный фон — «да, это соседи, я не при чём»";
  if (v <= 70) return "громко — «извините, что вы говорите???»";
  return "максимум — соседи стучат в стену. пора эвакуироваться";
}

export default function Soundboard() {
  const [active, setActive] = useState<Set<SoundId>>(() => new Set());
  const [volume, setVolume] = useState(35);

  const toggle = useCallback((id: SoundId) => {
    
  }, []);

  const stopAll = useCallback(() => {
    // engine.stopAll();
    setActive(new Set());
  }, []);

  const onVolume = useCallback((v: number) => {
    setVolume(v);
    // engine.setVolume((v / 100) * 0.9);
  }, []);

  const caption = useMemo(() => awkwardCaption(volume), [volume]);

  return (
    <section id="sounds" className="bg-amber-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-6">


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
            ребёнка + звонок в дверь = железное алиби. Всё генерируется прямо в браузере, без
            единого mp3.
          </p>
        </Reveal>


        <Reveal delay={80}>
          <VolumeControl volume={volume} caption={caption} onChange={onVolume} />
        </Reveal>


        <div className="mt-12 space-y-12">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 60}>
              <GroupSection group={g} active={active} onToggle={toggle} />
            </Reveal>
          ))}
        </div>


      </div>
    </section>
  );
}