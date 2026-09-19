import { memo } from "react";
import { Button } from "@/shared/ui/baseButton";
import {
  HEADER_BUTTONS,
} from "../model/headerButtons";

import type { THeaderButtonKey } from "../model/type"


interface HeaderBarActionsProps {
  handlers: Record<THeaderButtonKey, () => void>;
}

export const HeaderBarActions = memo(({ handlers }: HeaderBarActionsProps) => (
  <div className="flex flex-wrap items-center gap-1.5">
    {HEADER_BUTTONS.map(({ key, label, style, className, title }) => (
      <Button
        key={key}
        type="button"
        size="lg"
        className={className}
        style={style}
        onClick={handlers[key]}
        title={title}
      >
        {label}
      </Button>
    ))}
  </div>
));

HeaderBarActions.displayName = "HeaderBarActions";