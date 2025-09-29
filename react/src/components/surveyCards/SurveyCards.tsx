import React, { useState } from "react";
import "./SurveyCards.css";
import Money from "@/src/public/assets/Catching.mp3";
import * as balanceRedux from "@/src/redux/slices/balanceSlice";
import { useDispatch } from "react-redux";

type CardProps = {
  minutes: number | string;
  price: number; // numeric so we can sum
  rating: number; // 0..5
  tag?: string;
  onEarn?: (amount: number) => void;
  color?: string;
};

const PriceCard: React.FC<CardProps> = ({
  minutes,
  price,
  rating,
  tag = "",
  onEarn,
  color,
}) => {
  // Store per-burst click position so each burst animates independently
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const moneyRef = React.useRef<HTMLAudioElement | null>(null);
  React.useEffect(() => {
    moneyRef.current = new Audio(Money);
  }, []);

  const MAX_BURSTS = 2; // hard cap to keep DOM light on mobile

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (moneyRef.current) {
      try {
        moneyRef.current.currentTime = 0;
        const p = moneyRef.current.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch {}
    }

    const id = Date.now() + Math.random();
    setBursts((b) => {
      const next = [...b, { id, x, y }];
      return next.length > MAX_BURSTS ? next.slice(-MAX_BURSTS) : next;
    });
    onEarn?.(price);

    window.setTimeout(() => {
      setBursts((b) => b.filter((x_) => x_.id !== id));
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      const id = Date.now() + Math.random();
      const x = 50;
      const y = 50;

      if (moneyRef.current) {
        try {
          moneyRef.current.currentTime = 0;
          const p = moneyRef.current.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {}
      }

      setBursts((b) => {
        const next = [...b, { id, x, y }];
        return next.length > MAX_BURSTS ? next.slice(-MAX_BURSTS) : next;
      });
      onEarn?.(price);

      window.setTimeout(() => {
        setBursts((b) => b.filter((x_) => x_.id !== id));
      }, 1200);
    }
  };

  return (
    <div
      className={`sc-card ${bursts.length > 0 ? "is-pop" : ""}`}
      style={{ ["--rating" as any]: rating }}
      onClick={handleClick}
      role="button"
      aria-label={`Earn ${price} kr card`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="sc-pill sc-pill--time">{minutes} min</div>
      <div
        className="sc-pill sc-pill--tag"
        style={{ ["--pill-bg" as any]: color, ["--pill-text" as any]: "#fff" } as React.CSSProperties}
      >
        {tag}
      </div>

      <div className="sc-price">
        <span className="sc-price-value">{price.toString().replace(",", ".")}</span>
        <span className="sc-price-currency">kr</span>
      </div>

      <div className="sc-stars" aria-hidden="true" />

      {/* Effects */}
      {bursts.map((b) => (
        <CoinBurst key={b.id} amount={price} x={b.x} y={b.y} />
      ))}
    </div>
  );
};

// Memoize to avoid re-rendering active bursts on parent updates
const CoinBurst: React.FC<{ amount: number; x: number; y: number }> = React.memo(({ amount, x, y }) => {
  const coins = React.useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    const N = isMobile ? 8 : 14; // fewer coins on mobile for smoother perf
    return Array.from({ length: N }).map((_, i) => {
      const angle = (i / N) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 62 + Math.random() * 52; // px
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - (18 + Math.random() * 36); // slight upward bias
      const rot = (Math.random() * 360 - 180).toFixed(1);
      const delay = (i * 0.012).toFixed(3);
      const scale = (0.8 + Math.random() * 0.5).toFixed(2);
      return { dx, dy, rot, delay, scale, i };
    });
  }, []);

  // Provide per-burst CSS variables so each burst uses its own origin
  const burstStyle = {
    ["--click-x" as any]: `${x}%`,
    ["--click-y" as any]: `${y}%`,
  } as React.CSSProperties;

  return (
    <div className="burst" style={burstStyle}>
      <div className="ring" />
      <div className="kr-float">+{amount.toString().replace(".", ",")} kr</div>
      {coins.map(({ dx, dy, rot, delay, scale, i }) => (
        <span
          key={i}
          className="coin"
          style={{
            ["--tx" as any]: `${dx}px`,
            ["--ty" as any]: `${dy}px`,
            ["--rot" as any]: `${rot}deg`,
            ["--delay" as any]: `${delay}s`,
            ["--scale" as any]: scale,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

interface SurveyCardsProps {
  onEarn?: (amount: number) => void;
}

const SurveyCards: React.FC<SurveyCardsProps> = () => {
  const dispatch = useDispatch();

  const handleEarn = (amount: number) => {
    dispatch(balanceRedux.increment(amount));
  };

  return (
    <div className="sc-stage">
      {/* <div className={`earnings-badge ${bump ? "is-bump" : ""}`}>
        Saldo: <strong>{total.toString().replace(".", ",")} kr</strong>
      </div> */}

      <div className="sc-wrap">
        <PriceCard
          minutes={8}
          price={18.3}
          rating={3.5}
          onEarn={handleEarn}
          tag="Cint"
          color="purple"
        />
        <PriceCard
          minutes={5}
          price={12.7}
          rating={5}
          onEarn={handleEarn}
          tag="Prime"
          color="#695CFF"
        />
        <PriceCard
          minutes={7}
          price={11.5}
          rating={4.5}
          onEarn={handleEarn}
          tag="Lucid"
          color="black"
        />
      </div>
    </div>
  );
};

export default SurveyCards;
