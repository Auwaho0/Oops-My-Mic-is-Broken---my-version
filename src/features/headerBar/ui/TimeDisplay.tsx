import {
  memo,
  useEffect,
  useState
} from "react";

/* ---------- Изолированные часы ---------- */
// Ререндерится только этот компонент раз в секунду.
export const TimeDisplay = memo(() => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let id: number | undefined;
    const start = () => {
      id = window.setInterval(() => setNow(new Date()), 1000);
    };
    const stop = () => {
      if (id !== undefined) clearInterval(id);
      id = undefined;
    };
    const onVis = () => (document.hidden ? stop() : (setNow(new Date()), start()));

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <span className="text-xs tabular-nums text-ink/70">
      {now.toLocaleTimeString("ru-RU", { hour12: false })}
    </span>
  );
});

TimeDisplay.displayName = "TimeDisplay";