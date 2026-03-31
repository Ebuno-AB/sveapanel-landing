import { useEffect, useRef, useState } from "react";
import "./PayoutCounter.css";

const TARGET = 20_000_000;
const START_FROM_PCT = 0.997;
const DURATION = 2400;
const start = Math.floor(TARGET * START_FROM_PCT);

function useCountUp() {
  const [count, setCount] = useState(start);
  const containerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 5);
            setCount(Math.floor(start + eased * (TARGET - start)));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(TARGET);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { count, containerRef };
}

export default function PayoutCounter() {
  const { count, containerRef } = useCountUp();

  return (
    <div
      ref={containerRef}
      className="payout-counter"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <span
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 800,
          color: "#00cca3",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {count.toLocaleString("sv-SE")} kr+
      </span>
      <span
        style={{
          marginTop: 10,
          fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
          color: "#000000",
          fontWeight: 500,
          letterSpacing: "0.03em",
        }}
      >
        Utbetalat till våra användare
      </span>
    </div>
  );
}
