import { memo } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useExcuseStore } from "../model/useExcuseGenerator";

export const ExcuseActions = memo(function ExcuseActions() {
  const fullText = useExcuseStore((s) => s.fullText);
  const isCopied = useExcuseStore((s) => s.isCopied);
  const generate = useExcuseStore((s) => s.generate);
  const copyToClipboard = useExcuseStore((s) => s.copyToClipboard);

  return (
    <div className="flex min-w-[240px] flex-col gap-3 sm:flex-row lg:flex-col">
      <button
        type="button"
        onClick={generate}
        className="group inline-flex flex-1 cursor-pointer select-none items-center justify-center gap-3 border-[3px] border-paper bg-blood px-6 py-5 font-display text-xl font-semibold uppercase text-paper shadow-[6px_6px_0_var(--color-paper)] transition-all hover:-translate-y-1 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none sm:text-2xl lg:flex-none"
      >
        <RefreshCw className="size-6 transition-transform duration-500 group-hover:rotate-180" />
        Дай отговорку
      </button>

      <button
        type="button"
        onClick={copyToClipboard}
        disabled={!fullText}
        className={cn(
          "inline-flex flex-1 cursor-pointer select-none items-center justify-center gap-2 border-[3px] border-paper px-5 py-3.5 text-sm font-medium tracking-wide transition-all lg:flex-none",
          !fullText && "cursor-not-allowed opacity-40",
          isCopied
            ? "border-ok bg-ok text-paper shadow-[3px_3px_0_var(--color-paper)]"
            : "bg-transparent text-paper hover:bg-paper hover:text-ink active:translate-x-1 active:translate-y-1",
        )}
      >
        {isCopied ? <Check className="size-4 text-paper" /> : <Copy className="size-4" />}
        {isCopied ? "СКОПИРОВАНО В БУФЕР!" : "СКОПИРОВАТЬ В БУФЕР"}
      </button>
    </div>
  );
});