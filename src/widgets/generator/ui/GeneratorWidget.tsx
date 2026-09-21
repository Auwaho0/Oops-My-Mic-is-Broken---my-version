import { memo } from "react";
import { Reveal } from "@/shared/ui/reveal";
import { ExcuseGenerator } from "@/features/excuse-generator";
import "./GeneratorWidget.css"


export const GeneratorWidget = memo(() => {
  return (
    <section id="excuses" className="border-y-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <p className="text-sm text-blood font-medium tracking-widest">
            // МОДУЛЬ Б — ГЕНЕРАТОР ТЕКСТОВЫХ АЛИБИ
          </p>
          <h2 className="mt-3 font-display font-bold uppercase leading-[0.9] text-[clamp(2.4rem,7vw,5.5rem)]">
            Дай отговорку
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/70">
            Выбирай калибр — от вежливого «отключаюсь по семейным обстоятельствам» до «микрофон съела
            собака». Копируй — и вставляй в чат созвона, не вставая с дивана.
          </p>
        </Reveal>

        <ExcuseGenerator />
      </div>
    </section>
  );
});

GeneratorWidget.displayName = "GeneratorWidget";
export default GeneratorWidget;
