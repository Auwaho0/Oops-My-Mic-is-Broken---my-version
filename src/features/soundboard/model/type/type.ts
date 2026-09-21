import type { SoundId } from "@/shared/lib/audio";
import type { SoundCategoryGroup } from "@/entities/sound";
import type { ComponentType } from "react";

export interface IGroupSectionProps {
  group: SoundCategoryGroup
}

export interface ISoundState {
  activeSounds: SoundId[];
  volume: number;
  toggleSound: (id: SoundId) => void;
  stopAll: () => void;
  setVolume: (v: number) => void;
  isSoundActive: (id: SoundId) => boolean;
}

export interface ISoundButtonProps {
  id: SoundId;
  label: string;
  sub: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}