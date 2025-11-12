"use client";

import { useEffect, useState } from "react";

interface HorrorTypingProps {
  text: string;
  onComplete?: () => void;
}

export default function HorrorTyping({ text, onComplete }: HorrorTypingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // Faster, more intense ghost typing - 30-60ms for rapid horror effect
    const baseDelay = 30;
    const randomDelay = Math.random() * 30 + baseDelay;
    
    // Occasionally pause longer (like ghost hesitating) - less frequent
    const shouldPause = Math.random() < 0.08;
    const delay = shouldPause ? randomDelay * 2.5 : randomDelay;

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, onComplete]);

  return (
    <span className="horror-typing">
      {displayedText}
      {!isComplete && <span className="horror-cursor">|</span>}
    </span>
  );
}
