import { memo } from "react";
import { SoundButton } from "./soundButton/SoundButton";
import type { IGroupSectionProps } from "../model/type/type"
import { cn } from "@/shared";





export const GroupSection = memo(({ group }: IGroupSectionProps) => {

  const onOther = group.title === "[ Свои ]"
  const onOpenUpload = true

  return (
    <div>
      <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
        <h3 className="min-w-0 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight ">
          {group.title}
        </h3>
        <span className="min-w-0 text-xs sm:text-sm text-ink/70">/// {group.note}</span>
        {onOther && (
          <button
            type="button"
            onClick={() => { '' }}
            className="min-w-0 justify-self-end inline-flex items-center gap-1.5 border border-ink/40 bg-paper px-2.5 py-1 text-xs font-mono font-semibold uppercase text-ink hover:border-blood hover:text-blood transition-colors cursor-pointer"
          >
            {/* <Plus className="size-3.5" /> */}
            <span>ЗАГРУЗИТЬ СВОЙ ЗВУК</span>
          </button>
        )}
      </div>

      <div className={cn("mt-4 grid gap-3",
        onOther ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3")}>

        {group.items.length > 0 ? group.items.map(({ id, label, sub, Icon }) => (
          <SoundButton
            key={id}
            id={id}
            label={label}
            sub={sub}
            Icon={Icon}
          />
        )) : <div className="mt-5 border-2 border-dashed border-ink/40 bg-paper/60 p-6 text-center">
          <p className="font-display text-base font-semibold uppercase text-ink/80">
            Пользовательские звуки
          </p>
          <p className="mt-1 text-xs text-ink/60 max-w-md mx-auto">
            Здесь будут отображаться ваши загруженные звуковые алиби.
          </p>
          {onOpenUpload && (
            <button
              type="button"
              onClick={() => { '' }}
              className="mt-3 inline-flex items-center gap-2 border-2 border-blood bg-blood px-4 py-2 font-display text-xs font-bold uppercase text-paper hover:bg-ink hover:border-ink transition-colors cursor-pointer"
            >
              {/* <Plus className="size-4" /> */}
              <span>ЗАГРУЗИТЬ СВОЙ ЗВУК</span>
            </button>
          )}
        </div>}
      </div>
    </div >
  );
});

GroupSection.displayName = "GroupSection";
