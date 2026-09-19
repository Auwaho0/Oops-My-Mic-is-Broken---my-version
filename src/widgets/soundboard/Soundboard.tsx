import { SOUND_GROUPS } from "@/entities/sound";
import { Reveal } from "@/shared/ui/reveal";
import {
  GroupSection,
  VolumeControl
} from "@/features/soundboard";



export function Soundboard() {

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
          <VolumeControl />
        </Reveal>

        <div className="mt-12 space-y-12">
          {SOUND_GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 60}>
              <GroupSection
                group={g}

              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Soundboard;
