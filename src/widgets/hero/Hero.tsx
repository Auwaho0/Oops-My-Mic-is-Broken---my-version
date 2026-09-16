import { useCallback, useMemo, useState } from "react";
import { StatusDisplay, STATUS_COUNT } from "@/features/hero-status";
import "@/widgets/hero/Hero.css";

export function Hero() {
  const [status, setStatus] = useState(0);

  const handleStatus = useCallback(() => {
    setStatus((v) => (v + 1) % STATUS_COUNT);
  }, []);

  const todayDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <section id="top" className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 pb-12">
      {/* Stamp sticker */}
      <div className="absolute right-4 sm:right-8 top-10 sm:top-14 rotate-6 border-2 border-blood px-4 py-2 text-blood pointer-events-none hidden sm:block">
        <p className="font-mono font-bold text-[18px] leading-tight text-center">
          ПРОВЕРЕНО:
          <br />
          ЗВУЧИТ УБЕДИТЕЛЬНО
        </p>
      </div>

      <h1 className="font-display font-bold uppercase tracking-[-0.01em] leading-[0.86] text-[clamp(3.4rem,12.5vw,11.5rem)]">
        <span className="block">Ой.</span>
        <span className="block">У тебя микрофон</span>
        <span className="flex flex-wrap items-end gap-x-6 gap-y-2">
          <span className="relative inline-block">
            сломан.
            <span className="anim-strike absolute left-[-2%] right-[-3%] top-[54%] h-[0.075em] bg-ink -rotate-1 pointer-events-none" />
          </span>
          <span className="font-serif italic font-medium normal-case tracking-normal leading-none text-[clamp(1.5rem,4.6vw,3.9rem)] pb-[0.08em]">
            (или нет?)
          </span>
        </span>
      </h1>

      <StatusDisplay status={status} onClick={handleStatus} />

      <p className="mt-8 text-xs sm:text-sm text-ink/80 font-mono">
        v0.3 — {todayDate} — unsaved draft — собрано за 4 минуты до дедлайна
      </p>
    </section>
  );
}

export default Hero;
