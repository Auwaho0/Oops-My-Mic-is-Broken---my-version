// src/components/StatusDisplay.tsx
import { memo, useMemo } from "react";
import { Button } from "@/shared/ui/baseButton/BaseButton";

// Данные статусов – статичны
const STATUSES = [
  { text: "ПРЯМО СЕЙЧАС НА СОЗВОНЕ", dot: "--color-blood", ring: "shadow-[0_0_0_3px_rgba(200,30,20,0.25)]", blink: true },
  { text: "МИКРОФОН СЛОМАН. ЧЕСТНО.", dot: "--color-ink", ring: "", blink: false },
  { text: "ВЫШЕЛ ЗА КОФЕ НА 2 ЧАСА", dot: "--color-warn", ring: "", blink: true },
  { text: "БУДУ ТОЛЬКО В ЧАТЕ", dot: "--color-ok", ring: "", blink: true },
];


// Стили для кнопки – вынесены, чтобы не пересоздавать объект
const BUTTON_STYLES = {
  "--btn-bg": "#e9e4d6",
  "--btn-bg-hover": "#e9e4d6",
  "--btn-bg-active": "#e9e4d6",
} as React.CSSProperties;



// Базовые классы кнопки
const BUTTON_BASE_CLASSES =
  "cursor-pointer group inline-flex flex-wrap justify-normal items-center gap-x-4 gap-y-2 border-[3px] border-ink px-5 sm:px-7 py-3.5 sm:py-4";

// Интерфейс пропсов
interface StatusDisplayProps {
  status: number;
  onClick: () => void;
}
// StatusDisplay.tsx
export const STATUS_COUNT = STATUSES.length;
// Основной компонент
export const StatusDisplay = memo(({ status, onClick }: StatusDisplayProps) => {
  const s = useMemo(() => STATUSES[status], [status]);

  const dotStyles = useMemo(() => {
    return {
      backgroundColor: `var(${s.dot})`,
    } as React.CSSProperties;
  }, [s.dot]);

  return (
    <div className="mt-4 sm:mt-10">
      <Button
        type="button"
        style={BUTTON_STYLES}
        onClick={onClick}
        className={BUTTON_BASE_CLASSES + "text-[2px]"}
        title="нажми, чтобы сменить статус"
      >
        <span className="font-display text-[16px] sm:text-[30px] font-semibold uppercase">Статус:</span>
        <div className="flex justify-center items-center gap-2" >
          <span className="relative w-3 h-3 sm:w-5.5 sm:h-5.5">
            <span className={`blink`} style={dotStyles} />
            {s.blink ? <span className={`anim-blink`} style={dotStyles} /> : ""}
          </span>
          <span className="font-display text-[16px] sm:text-[30px] font-semibold uppercase tracking-wide">
            {s.text}
          </span>
        </div>
      </Button>
      <p className="mt-2 text-xs text-ink/60">[ нажми на рамку, чтобы сменить легенду ]</p>
    </div>
  );
});

StatusDisplay.displayName = "StatusDisplay";