import { memo } from "react";
import { Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Reveal } from "@/shared/ui/reveal";
import { useExcuseGenerator } from "../model/useExcuseGenerator";

export const ExcuseGenerator = memo(() => {
  const {
    category,
    setCategory,
    categories,
    currentCategoryConfig,
    fullText,
    displayedText,
    isTyping,
    isCopied,
    generatedCount,
    generate,
    copyToClipboard,
    completeTypingImmediately,
  } = useExcuseGenerator();

  return (
    <div className="w-full">
      {/* Category filters */}
      <Reveal delay={60}>
        <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Категории отговорок">
          {categories.map((c) => {
            const isSelected = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`category-tab-${c.id}`}
                aria-selected={isSelected}
                onClick={() => setCategory(c.id)}
                title={c.hint}
                className={cn(
                  "cursor-pointer border-2 px-4 py-2 text-xs sm:text-sm font-medium tracking-wide transition-all select-none",
                  isSelected
                    ? "border-paper bg-paper text-ink shadow-[4px_4px_0_var(--color-blood)]"
                    : "border-paper/40 text-paper/80 hover:border-paper hover:text-paper"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Output & action cards */}
      <Reveal delay={120}>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div
            id="excuse-card"
            onClick={completeTypingImmediately}
            title={isTyping ? "Кликните, чтобы показать весь текст сразу" : undefined}
            className={cn(
              "relative border-[3px] border-paper/80 bg-ink p-6 sm:p-8 min-h-[10.5rem] flex flex-col justify-between transition-colors",
              isTyping && "cursor-pointer"
            )}
          >
            <span className="absolute -top-3 left-5 bg-ink px-2 text-[10px] tracking-widest text-paper/60 border border-paper/20">
              ВХОДЯЩЕЕ СООБЩЕНИЕ · {currentCategoryConfig.label}
            </span>

            <div className="my-auto py-2">
              {fullText ? (
                <p className="font-mono text-lg sm:text-2xl leading-snug">
                  «{displayedText}
                  {isTyping && <span className="anim-caret text-blood">▌</span>}
                  {!isTyping && "»"}
                </p>
              ) : (
                <p className="font-mono text-lg sm:text-2xl text-paper/40 italic flex items-center gap-2">
                  <Sparkles className="size-5 text-paper/30" />
                  [ жми кнопку — получишь алиби ]
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-paper/50 border-t border-paper/10 pt-3">
              <span>отправлено: {fullText ? "только что" : "ожидание"}</span>
              <span>·</span>
              <span>устройство: mic_broken_v0.3</span>
              <span>·</span>
              <span>сгенерировано за сессию: {generatedCount}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <button
              type="button"
              id="generate-excuse-btn"
              onClick={generate}
              className="group inline-flex flex-1 lg:flex-none items-center justify-center gap-3 border-[3px] border-paper bg-blood px-6 py-5 font-display text-xl sm:text-2xl font-semibold uppercase text-paper shadow-[6px_6px_0_var(--color-paper)] transition-all cursor-pointer select-none hover:-translate-y-1 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
            >
              <RefreshCw className="size-6 transition-transform duration-500 group-hover:rotate-180" />
              Дай отговорку
            </button>
            <button
              type="button"
              id="copy-excuse-btn"
              onClick={copyToClipboard}
              disabled={!fullText}
              className={cn(
                "inline-flex flex-1 lg:flex-none items-center justify-center gap-2 border-[3px] border-paper px-5 py-3.5 text-sm font-medium tracking-wide transition-all select-none cursor-pointer",
                !fullText && "opacity-40 cursor-not-allowed",
                isCopied
                  ? "bg-ok text-paper border-ok shadow-[3px_3px_0_var(--color-paper)]"
                  : "bg-transparent text-paper hover:bg-paper hover:text-ink active:translate-x-1 active:translate-y-1"
              )}
            >
              {isCopied ? <Check className="size-4 text-paper" /> : <Copy className="size-4" />}
              {isCopied ? "СКОПИРОВАНО В БУФЕР!" : "СКОПИРОВАТЬ В БУФЕР"}
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
});

ExcuseGenerator.displayName = "ExcuseGenerator";
