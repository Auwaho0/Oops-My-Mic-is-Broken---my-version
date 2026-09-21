import { useCallback, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { TimeDisplay } from "@/features/headerBar";
import type { THeaderButtonKey } from "@/features/headerBar";
import { HeaderBarActions } from "@/features/headerBar";
import "./HeaderBar.module.css"


export function HeaderBar() {
  const [wobble, setWobble] = useState(0);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFullscreen = useCallback(() => {
    const doc = document;
    if (!doc.fullscreenElement) {
      doc.documentElement.requestFullscreen?.().catch(() => { });
    } else {
      doc.exitFullscreen?.().catch(() => { });
    }
  }, []);

  const handleClose = useCallback(() => {
    setWobble((w) => w + 1);
  }, []);

  const handlers: Record<THeaderButtonKey, () => void> = {
    minimize: handleScrollToTop,
    fullscreen: handleFullscreen,
    close: handleClose,
  };

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-[5px] border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* key={wobble} перезапускает CSS-анимацию при каждом клике "X" */}
        <div
          key={wobble}
          className={cn(
            "flex flex-wrap items-center justify-center sm:justify-between gap-3 py-2",
            wobble > 0 && "anim-wobble"
          )}
        >
          <p className="truncate text-xs hidden sm:inline-block sm:text-sm font-mono-code">
            file://localhost/oops-mic-broken/index.html
          </p>
          <div className="flex flex-wrap justify-between w-full sm:w-auto items-center gap-2 shrink-0">
            <TimeDisplay />
            <HeaderBarActions handlers={handlers} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;