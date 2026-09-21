import { memo } from "react";
import { cn } from "@/shared/lib/cn";
import { useExcuseStore, selectCategoryConfig } from "../model/useExcuseGenerator";
import { TypingText } from "./TypingText";
import { MetaBar } from "./MetaBar";

export const ExcuseCard = memo(function ExcuseCard() {
  const config = useExcuseStore(selectCategoryConfig);   // стабильный объект из CATEGORIES
  const isTyping = useExcuseStore((s) => s.isTyping);
  const completeTyping = useExcuseStore((s) => s.completeTyping);

  return (
    <div
      id="excuse-card"
      onClick={completeTyping}                       // no-op если не печатается
      title={isTyping ? "Кликните, чтобы показать весь текст сразу" : undefined}
      className={cn(
        "relative flex min-h-[10.5rem] flex-col justify-between border-[3px] border-paper/80 bg-ink p-6 transition-colors sm:p-8",
        isTyping && "cursor-pointer",
      )}
    >
      <span className="absolute -top-3 left-5 border border-paper/20 bg-ink px-2 text-[10px] tracking-widest text-paper/60">
        ВХОДЯЩЕЕ СООБЩЕНИЕ · {config.label}
      </span>

      <div className="my-auto py-2">
        <TypingText />
      </div>

      <MetaBar />
    </div>
  );
});