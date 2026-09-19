import { create } from "zustand";
import { webAudioEngine, type SoundId } from "@/shared/lib/audio";


interface SoundState {
  activeSounds: SoundId[];
  volume: number;
  toggleSound: (id: SoundId) => void;
  stopAll: () => void;
  setVolume: (v: number) => void;
  isSoundActive: (id: SoundId) => boolean;
}


export const useSoundStore = create<SoundState>((set, get) => ({
  activeSounds: [],
  volume: 35,
  // переключатель трека вкл и выкл
  toggleSound: (id: SoundId) => {
    const isNowPlaying = webAudioEngine.toggle(id);
    set((state) => {
      // если играет то оставляем если нет то убираем
      if (isNowPlaying) {
        if (!state.activeSounds.includes(id)) {
          return { activeSounds: [...state.activeSounds, id] };
        }
        return state;
      } else {
        return { activeSounds: state.activeSounds.filter((item) => item !== id) };
      }
    });
  },

  stopAll: () => {
    webAudioEngine.stopAll();
    set({ activeSounds: [] });
  },

  setVolume: (v: number) => {
    const clamped = Math.max(0, Math.min(100, v));
    set({ volume: clamped });
    webAudioEngine.setVolume((clamped / 100) * 0.9);
  },

  isSoundActive: (id: SoundId) => {
    return get().activeSounds.includes(id);
  },

}));
