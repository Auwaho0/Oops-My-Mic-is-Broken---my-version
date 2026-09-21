import { memo } from "react";
import { useExcuseStore } from "../model/useExcuseGenerator";

export const MetaBar = memo(function MetaBar() {
  const fullText = useExcuseStore((s) => s.fullText);
  const generatedCount = useExcuseStore((s) => s.generatedCount);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-paper/10 pt-3 text-[11px] text-paper/50">
      <span>отправлено: {fullText ? "только что" : "ожидание"}</span>
      <span>·</span>
      <span>устройство: mic_broken_v0.3</span>
      <span>·</span>
      <span>сгенерировано за сессию: {generatedCount}</span>
    </div>
  );
});