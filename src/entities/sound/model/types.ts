import type { ComponentType } from "react";
import type { SoundId } from "@/shared/lib/audio";

export interface SoundItem {
  id: SoundId;
  label: string;
  sub: string;
  Icon: ComponentType<{ className?: string }>;
}

export interface SoundCategoryGroup {
  title: string;
  note: string;
  items: SoundItem[];
}
