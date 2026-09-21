import { memo } from "react";
import { cn } from "@/shared/lib/cn";
import { CATEGORIES } from "@/entities/excuse";
import { useExcuseStore } from "../model/useExcuseGenerator"

const CategoryTab = memo(function CategoryTab({
  id,
  label,
  hint,
}: {
  id: (typeof CATEGORIES)[number]["id"];
  label: string;
  hint?: string;
}) {
  // ✅ подписка на примитив — ререндер только при смене своего статуса
  const isSelected = useExcuseStore((s) => s.category === id);
  const setCategory = useExcuseStore((s) => s.setCategory);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      title={hint}
      onClick={() => setCategory(id)}
      className={cn(
        "cursor-pointer select-none border-2 px-4 py-2 text-xs font-medium tracking-wide transition-all sm:text-sm",
        isSelected
          ? "border-paper bg-paper text-ink shadow-[4px_4px_0_var(--color-blood)]"
          : "border-paper/40 text-paper/80 hover:border-paper hover:text-paper",
      )}
    >
      {label}
    </button>
  );
});

export const CategoryTabs = memo(function CategoryTabs() {
  return (
    <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Категории отговорок">
      {CATEGORIES.map((c) => (
        <CategoryTab key={c.id} id={c.id} label={c.label} hint={c.hint} />
      ))}
    </div>
  );
});