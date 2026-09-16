import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/shared/ui/baseButton/BaseButton";

// Компонент времени – обновляется каждую секунду, но не триггерит перерисовку всего хедера
const TimeDisplay = memo(() => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("ru-RU", { hour12: false });

  return (
    <span className="text-xs tabular-nums text-ink/70">
      {time}
    </span>
  );
});
TimeDisplay.displayName = "TimeDisplay";


// Общие стили для кнопок "—" и "□"
const MINIMIZE_FULLSCREEN_STYLES = {
  "--btn-bg-hover": "#11111130",
  "--btn-bg-active": "#11111130",
} as React.CSSProperties;

export default function HeaderBar() {
  const [wobble, setWobble] = useState(0);

  // Обработчики с мемоизацией
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFullscreen = useCallback(() => {
    window.document.documentElement.requestFullscreen?.();
  }, []);

  const handleWobble = useCallback(() => {
    setWobble((w) => w + 1);
  }, []);

  // Конфигурация кнопок – мемоизируется, чтобы не создавать массив при каждом рендере
  const buttons = useMemo(
    () => [
      {
        key: "minimize",
        children: "—",
        style: MINIMIZE_FULLSCREEN_STYLES,
        onClick: handleScrollToTop,
        className: "px-4",
        title: "Нажмите чтобы вернуться на вверх"
      },
      {
        key: "fullscreen",
        children: "□",
        style: MINIMIZE_FULLSCREEN_STYLES,
        onClick: handleFullscreen,
        className: "flex justify-center items-center px-4",
        title: "Нажмите чтобы сделать полноэкран"
      },
      {
        key: "close",
        children: "X",
        style: {
          "--btn-text-hover": "#ffffff",
          "--btn-text-active": "#ffffff",
          "--btn-border-hover": "#ffffff",
          "--btn-border-active": "#ffffff",
          "--btn-bg-hover": "#e01d1d",
          "--btn-bg-active": "#e01d1d",
        } as React.CSSProperties,
        onClick: handleWobble,
        className: "px-4",
        title: "Нажмите чтобы закрыть :)"
      },
    ],
    [handleScrollToTop, handleFullscreen, handleWobble]
  );

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-[5px] border-b-2 border-ink ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* key={wobble} заставляет элемент пересоздаваться, перезапуская анимацию */}
        <div
          key={wobble}
          className={cn(
            "flex flex-wrap items-center justify-center  sm:justify-between gap-3 py-2",
            wobble > 0 && "anim-wobble"
          )}
        >
          <p className="truncate text-xs hidden sm:inline-block sm:text-sm font-mono-code ">
            file://localhost/oops-mic-broken/index.html
          </p>
          <div className="flex flex-wrap justify-between w-full sm:w-auto items-center gap-2 shrink-0">
            <TimeDisplay />
            <div className="flex flex-wrap items-center gap-1.5">
              {buttons.map((btn) => (
                <Button
                  key={btn.key}
                  type="button"
                  size="lg"
                  className={btn.className}
                  style={btn.style}
                  onClick={btn.onClick}
                  title={btn.title}
                >
                  {btn.children}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}