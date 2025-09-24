import React, { useState } from "react";
import "./SurveyCards.css";
import Money from "@/src/public/assets/Catching.mp3";
import * as balanceRedux from "@/src/redux/slices/balanceSlice";
import { useDispatch } from "react-redux";

type CardProps = {
  minutes: number | string;
  price: number;          // numeric so we can sum
  rating: number;         // 0..5
  tag?: string;
  onEarn?: (amount: number) => void;
  color?: string; 
};

const PriceCard: React.FC<CardProps> = ({ minutes, price, rating, tag = "", onEarn, color }) => {
  const [pop, setPop] = useState(false);
  const [bursts, setBursts] = useState<Array<{ id: number }>>([]);

   const moneyRef = React.useRef<HTMLAudioElement | null>(null);
    React.useEffect(() => {
      moneyRef.current = new Audio(Money);
    }, []);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (moneyRef.current) {
    moneyRef.current.currentTime = 0;
    moneyRef.current.play();
  }
   
    
    // Set click position as CSS custom properties
    e.currentTarget.style.setProperty('--click-x', `${x}%`);
    e.currentTarget.style.setProperty('--click-y', `${y}%`);
    
    setPop(true);
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id }]);
    onEarn?.(price);

    // cleanup burst after animation ends
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
      setPop(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      // For keyboard events, position at center
      e.currentTarget.style.setProperty('--click-x', '50%');
      e.currentTarget.style.setProperty('--click-y', '50%');

      if (moneyRef.current) {
        moneyRef.current.currentTime = 0;
        moneyRef.current.play();
      }

      setPop(true);
      const id = Date.now() + Math.random();
      setBursts((b) => [...b, { id }]);
      onEarn?.(price);

      setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id));
        setPop(false);
      }, 1200);
    }
  };

  return (
    <div
      className={`sc-card ${pop ? "is-pop" : ""}`}
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
        style={{
          // Use the color prop for background, and set text color as needed
          "--pill-bg": color,
          "--pill-text": "#fff", // or any color you want
        } as React.CSSProperties}
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
        <CoinBurst key={b.id} amount={price} />
      ))}
    </div>
  );
};

const CoinBurst: React.FC<{ amount: number }> = ({ amount }) => {
  const N = 16;
  const coins = Array.from({ length: N }).map((_, i) => {
    const angle = (i / N) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 70 + Math.random() * 60; // px
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - (20 + Math.random() * 40); // slight upward bias
    const rot = (Math.random() * 360 - 180).toFixed(1);
    const delay = (i * 0.015).toFixed(3);
    const scale = (0.8 + Math.random() * 0.6).toFixed(2);
    return { dx, dy, rot, delay, scale, i };
  });

  return (
    <div className="burst">
      <div className="ring" />
      <div className="kr-float">+{amount.toString().replace(".", ",")} kr</div>
      {coins.map(({ dx, dy, rot, delay, scale, i }) => (
        <span
          key={i}
          className="coin"
          style={
            {
              ["--tx" as any]: `${dx}px`,
              ["--ty" as any]: `${dy}px`,
              ["--rot" as any]: `${rot}deg`,
              ["--delay" as any]: `${delay}s`,
              ["--scale" as any]: scale,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

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
        <PriceCard minutes={8} price={18.3} rating={3.5} onEarn={handleEarn} tag="Cint" color="#000000" />
        <PriceCard minutes={5} price={12.7} rating={5} onEarn={handleEarn} tag="Prime Survey" color="#695CFF"/>
        <PriceCard minutes={7} price={11.5} rating={4.5} onEarn={handleEarn} tag="Pure Spectrum" color="#eb0d0dff" />
      </div>
    </div>
  );
};

export default SurveyCards;
