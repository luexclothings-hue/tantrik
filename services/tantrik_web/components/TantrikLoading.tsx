"use client";

interface TantrikLoadingProps {
  spiritName: string;
}

export default function TantrikLoading({ spiritName }: TantrikLoadingProps) {
  const spiritNames: Record<string, string> = {
    dracula: "Count Dracula",
    reaper: "The Grim Reaper",
    bloody_mary: "Bloody Mary"
  };

  return (
    <div className="tantrik-loading">
      {/* Animated background */}
      <div className="tantrik-bg"></div>
      
      {/* Pentagram circle */}
      <div className="summoning-circle">
        <div className="pentagram">
          <svg viewBox="0 0 100 100" className="pentagram-svg">
            <path
              d="M50 10 L61 40 L92 40 L67 58 L78 88 L50 70 L22 88 L33 58 L8 40 L39 40 Z"
              className="pentagram-path"
            />
          </svg>
        </div>
        
        {/* Rotating runes */}
        <div className="runes-circle">
          <span className="rune">ᚱ</span>
          <span className="rune">ᚢ</span>
          <span className="rune">ᚾ</span>
          <span className="rune">ᛖ</span>
          <span className="rune">ᛋ</span>
        </div>
      </div>

      {/* Tantrik logo in center */}
      <div className="tantrik-logo-container">
        <img src="/tantrik-logo.svg" alt="Tantrik" className="tantrik-logo-summon" />
      </div>

      {/* Summoning text */}
      <div className="summoning-text">
        <h2 className="summoning-title">Summoning {spiritNames[spiritName]}...</h2>
        <p className="summoning-subtitle">The Tantrik opens the gateway between worlds</p>
        <div className="summoning-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      {/* Floating candles */}
      <div className="floating-candles">
        <span className="candle">🕯️</span>
        <span className="candle">🕯️</span>
        <span className="candle">🕯️</span>
        <span className="candle">🕯️</span>
      </div>
    </div>
  );
}
