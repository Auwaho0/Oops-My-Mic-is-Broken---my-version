import { memo, useMemo } from "react";
import { TICKER_ITEMS } from "@/entities/excuse";
import "./Ticker.css"

export const Ticker = memo(() => {
  const line = useMemo(() => TICKER_ITEMS.map((t) => `/// ${t}`).join("  "), []);

  return (
    <div
      className="overflow-hidden border-y-2 border-ink bg-ink py-2 text-paper select-none"
      aria-hidden="true"
    >
      <div className="anim-marquee flex w-max whitespace-nowrap">
        <span className="px-4 text-sm tracking-wide">{line} //</span>
        <span className="px-4 text-sm tracking-wide">{line} //</span>
      </div>
    </div>
  );
});

Ticker.displayName = "Ticker";
export default Ticker;
