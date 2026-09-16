import { useEffect, useRef, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { CATEGORIES, EXCUSES, type ExcuseCategory } from "@/data/excuses";
import { cn } from "@/utils/cn";
import Reveal from "../shared/ui/reveal/Reveal";

export default function Generator() {
  const [category, setCategory] = useState<ExcuseCategory>("brazen");
  const [full, setFull] = useState<string>("");
  const [shown, setShown] = useState("");
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);
  const [lastIdx, setLastIdx] = useState<Record<string, number>>({});
  const typeTimer = useRef<number | null>(null);

  /* печатная машинка */
  useEffect(() => {
    if (!full) return;
    setShown("");
    let i = 0;
    const tick = () => {
      i += 1;
      setShown(full.slice(0, i));
      if (i < full.length) typeTimer.current = window.setTimeout(tick, 16 + Math.random() * 22);
    };
    typeTimer.current = window.setTimeout(tick, 120);
    return () => {
      if (typeTimer.current) window.clearTimeout(typeTimer.current);
    };
  }, [full]);

  const generate = () => {
    const pool = EXCUSES[category];
    let idx = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && idx === lastIdx[category]) idx = (idx + 1) % pool.length;
    setLastIdx((m) => ({ ...m, [category]: idx }));
    setFull(pool[idx]);
    setCount((c) => c + 1);
    setCopied(false);
  };

  const copy = async () => {
    if (!full) return;
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = full;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const typing = shown.length < full.length;
  const cat = CATEGORIES.find((c) => c.id === category)!;

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

        {/* фильтры */}
        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                title={c.hint}
                className={cn(
                  "border-2 px-4 py-2 text-xs sm:text-sm font-medium tracking-wide transition-all",
                  category === c.id
                    ? "border-paper bg-paper text-ink shadow-[4px_4px_0_var(--color-blood)]"
                    : "border-paper/40 text-paper/80 hover:border-paper hover:text-paper",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* вывод */}
        <Reveal delay={120}>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto]">
            <div className="relative border-[3px] border-paper/80 bg-ink p-6 sm:p-8 min-h-[10rem]">
              <span className="absolute -top-3 left-5 bg-ink px-2 text-[10px] tracking-widest text-paper/60">
                ВХОДЯЩЕЕ СООБЩЕНИЕ · {cat.label}
              </span>
              {full ? (
                <p className="font-mono text-lg sm:text-2xl leading-snug">
                  «{shown}
                  {typing && <span className="anim-caret text-blood">▌</span>}
                  {!typing && "»"}
                </p>
              ) : (
                <p className="font-mono text-lg sm:text-2xl text-paper/40">
                  [ жми кнопку — получишь алиби ]
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-paper/50">
                <span>отправлено: только что</span>
                <span>·</span>
                <span>устройство: mic_broken_v0.3</span>
                <span>·</span>
                <span>сгенерировано за сессию: {count}</span>
              </div>
            </div>

            <div className="flex lg:flex-col gap-3">
              <button
                type="button"
                onClick={generate}
                className="group inline-flex flex-1 lg:flex-none items-center justify-center gap-3 border-[3px] border-paper bg-blood px-6 py-5 font-display text-xl sm:text-2xl font-semibold uppercase text-paper shadow-[6px_6px_0_var(--color-paper)] transition-all hover:-translate-y-1 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
              >
                <RefreshCw className="size-6 transition-transform duration-500 group-hover:rotate-180" />
                Дай отговорку
              </button>
              <button
                type="button"
                onClick={copy}
                disabled={!full}
                className={cn(
                  "inline-flex flex-1 lg:flex-none items-center justify-center gap-2 border-[3px] border-paper px-5 py-3 text-sm font-medium tracking-wide transition-all",
                  !full && "opacity-40 cursor-not-allowed",
                  copied
                    ? "bg-ok text-paper"
                    : "bg-transparent text-paper hover:bg-paper hover:text-ink",
                )}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "СКОПИРОВАНО!" : "СКОПИРОВАТЬ В БУФЕР"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
