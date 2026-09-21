import { create } from "zustand";
import { CATEGORIES, EXCUSES, type ExcuseCategory } from "@/entities/excuse";

// ---------- вне стора: не триггерит подписчиков ----------
let typingTimer: number | null = null;
const lastIndices: Record<string, number> = {};

const clearTypingTimer = () => {
  if (typingTimer !== null) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
};

// ---------- state / actions ----------
interface ExcuseState {
  category: ExcuseCategory;
  fullText: string;
  displayedText: string;
  isTyping: boolean;
  isCopied: boolean;
  generatedCount: number;

  setCategory: (c: ExcuseCategory) => void;
  generate: () => void;
  copyToClipboard: () => Promise<void>;
  completeTyping: () => void;
}

export const useExcuseStore = create<ExcuseState>((set, get) => ({
  category: "brazen",
  fullText: "",
  displayedText: "",
  isTyping: false,
  isCopied: false,
  generatedCount: 0,

  setCategory: (category) => set({ category }),

  generate: () => {
    const { category, generatedCount } = get();
    const pool = EXCUSES[category];
    if (!pool?.length) return;

    let nextIdx = Math.floor(Math.random() * pool.length);
    const last = lastIndices[category];
    if (pool.length > 1 && nextIdx === last) {
      nextIdx = (nextIdx + 1) % pool.length;
    }
    lastIndices[category] = nextIdx;

    const text = pool[nextIdx];
    clearTypingTimer();
    set({
      fullText: text,
      displayedText: "",
      isTyping: true,
      isCopied: false,
      generatedCount: generatedCount + 1,
    });

    // локальный цикл печати — тикает прямо в стор через set,
    // но подписан на displayedText только TypingText
    let i = 0;
    const tick = () => {
      const s = get();
      // защита от гонки: если пользователь сгенерил другой текст — выходим
      if (!s.isTyping || s.fullText !== text) return;

      i++;
      if (i >= text.length) {
        set({ displayedText: text, isTyping: false });
        typingTimer = null;
        return;
      }
      set({ displayedText: text.slice(0, i) });
      typingTimer = window.setTimeout(tick, Math.random() * 20 + 15);
    };
    typingTimer = window.setTimeout(tick, 100);
  },

  completeTyping: () => {
    const { isTyping, fullText } = get();
    if (!isTyping) return;
    clearTypingTimer();
    set({ displayedText: fullText, isTyping: false });
  },

  copyToClipboard: async () => {
    const { fullText } = get();
    if (!fullText) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else throw new Error("no clipboard");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = fullText;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    set({ isCopied: true });
    window.setTimeout(() => set({ isCopied: false }), 2000);
  },
}));

// селекторы-хелперы для читаемости
export const selectCategoryConfig = (s: ExcuseState) =>
  CATEGORIES.find((c) => c.id === s.category) ?? CATEGORIES[0];