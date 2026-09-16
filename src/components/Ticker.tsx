import { TICKER_ITEMS } from "@/data/excuses";

export default function Ticker() {
  const line = TICKER_ITEMS.map((t) => `/// ${t}`).join("  ");
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
}
