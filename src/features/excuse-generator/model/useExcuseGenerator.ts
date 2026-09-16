import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { CATEGORIES, EXCUSES, type ExcuseCategory } from "@/entities/excuse";

export function useExcuseGenerator() {
  const [category, setCategory] = useState<ExcuseCategory>("brazen");
  const [fullText, setFullText] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [generatedCount, setGeneratedCount] = useState<number>(0);

  const lastIndicesRef = useRef<Record<string, number>>({});
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!fullText) {
      setDisplayedText("");
      return;
    }

    clearTimer();
    setDisplayedText("");
    let charIndex = 0;

    const tick = () => {
      charIndex += 1;
      setDisplayedText(fullText.slice(0, charIndex));
      if (charIndex < fullText.length) {
        const jitter = Math.floor(Math.random() * 20) + 15;
        timerRef.current = window.setTimeout(tick, jitter);
      }
    };

    timerRef.current = window.setTimeout(tick, 100);

    return clearTimer;
  }, [fullText, clearTimer]);

  const generate = useCallback(() => {
    const pool = EXCUSES[category];
    if (!pool || pool.length === 0) return;

    let nextIdx = Math.floor(Math.random() * pool.length);
    const lastIdx = lastIndicesRef.current[category];

    if (pool.length > 1 && nextIdx === lastIdx) {
      nextIdx = (nextIdx + 1) % pool.length;
    }

    lastIndicesRef.current[category] = nextIdx;
    setFullText(pool[nextIdx]);
    setGeneratedCount((c) => c + 1);
    setIsCopied(false);
  }, [category]);

  const copyToClipboard = useCallback(async () => {
    if (!fullText) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = fullText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  }, [fullText]);

  const completeTypingImmediately = useCallback(() => {
    if (fullText && displayedText.length < fullText.length) {
      clearTimer();
      setDisplayedText(fullText);
    }
  }, [fullText, displayedText, clearTimer]);

  const currentCategoryConfig = useMemo(() => {
    return CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
  }, [category]);

  const isTyping = displayedText.length < fullText.length;

  return {
    category,
    setCategory,
    categories: CATEGORIES,
    currentCategoryConfig,
    fullText,
    displayedText,
    isTyping,
    isCopied,
    generatedCount,
    generate,
    copyToClipboard,
    completeTypingImmediately,
  };
}
