import { memo, useMemo, useCallback, useState } from "react";
import { Button } from "@/shared/ui/baseButton";
import "./StatusDisplay.css"
import type IStatusItem from "./type/type"


const STATUSES: IStatusItem[] = [
  { text: "ПРЯМО СЕЙЧАС НА СОЗВОНЕ", dot: "--color-blood", ring: "", blink: true },
  { text: "МИКРОФОН СЛОМАН. ЧЕСТНО.", dot: "--color-ink", ring: "", blink: false },
  { text: "ВЫШЕЛ ЗА КОФЕ НА 2 ЧАСА", dot: "--color-warn", ring: "", blink: true },
  { text: "БУДУ ТОЛЬКО В ЧАТЕ", dot: "--color-ok", ring: "", blink: true },
];

const STATUS_COUNT = STATUSES.length;

const BUTTON_STYLES = {
  "--btn-bg": "#e9e4d6",
  "--btn-bg-hover": "#e9e4d6",
  "--btn-bg-active": "#e9e4d6",
} as React.CSSProperties;

const BUTTON_BASE_CLASSES =
  "cursor-pointer group inline-flex flex-wrap justify-normal items-center gap-x-4 gap-y-2 border-[3px] border-ink px-5 sm:px-7 py-3.5 sm:py-4";


export const StatusDisplay = memo(() => {
  const [status, setStatus] = useState(0);

  const handleStatus = useCallback(() => {
    setStatus((v) => (v + 1) % STATUS_COUNT);
  }, []);

  const currentStatus = useMemo(() => STATUSES[status] || STATUSES[0], [status]);

  const dotStyles = useMemo(() => {
    return {
      backgroundColor: `var(${currentStatus.dot})`,
    } as React.CSSProperties;
  }, [currentStatus.dot]);

  return (
    <div className="mt-4 sm:mt-10">
      <Button
        type="button"
        id="status-toggle-btn"
        style={BUTTON_STYLES}
        onClick={handleStatus}
        className={BUTTON_BASE_CLASSES + " text-[2px]"}
        title="нажми, чтобы сменить статус"
      >
        <span className="font-display text-[16px] sm:text-[30px] font-semibold uppercase">
          Статус:
        </span>
        <div className="flex justify-center items-center gap-2">
          <span className="relative w-3 h-3 sm:w-5.5 sm:h-5.5">
            <span className="blink" style={dotStyles} />
            {currentStatus.blink && <span className="anim-blink" style={dotStyles} />}
          </span>
          <span className="font-display text-[16px] sm:text-[30px] font-semibold uppercase tracking-wide">
            {currentStatus.text}
          </span>
        </div>
      </Button>
    </div>
  );
});

StatusDisplay.displayName = "StatusDisplay";
