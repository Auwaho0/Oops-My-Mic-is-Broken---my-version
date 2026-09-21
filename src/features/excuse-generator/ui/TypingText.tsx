import { memo } from "react";
import { Sparkles } from "lucide-react";
import { useExcuseStore } from "../model/useExcuseGenerator";

export const TypingText = memo(function TypingText() {
  const fullText = useExcuseStore((s) => s.fullText);
  const displayedText = useExcuseStore((s) => s.displayedText);
  const isTyping = useExcuseStore((s) => s.isTyping);

  if (!fullText) {
    return (
      <p className="flex items-center gap-2 font-mono text-lg text-paper/40 italic sm:text-2xl">
        <Sparkles className="size-5 text-paper/30" />
        [ жми кнопку — получишь алиби ]
      </p>
    );
  }

  return (
    <p className="font-mono text-lg leading-snug sm:text-2xl">
      «{displayedText}
      {isTyping && <span className="anim-caret text-blood">▌</span>}
      {!isTyping && "»"}
    </p>
  );
});