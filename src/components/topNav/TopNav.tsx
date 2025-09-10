import React, { useEffect, useRef, useState } from "react";
import "./TopNav.css";

interface TopNavProps {
  handleAppDownload: () => void;
  moneyValue?: number;
}

const TopNav: React.FC<TopNavProps> = ({
  handleAppDownload,
  moneyValue = 0,
}) => {
  const prevRef = useRef(moneyValue);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [pop, setPop] = useState(false);
  const [bursts, setBursts] = useState<Array<{ id: number; amount: number }>>(
    []
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Fire a burst when moneyValue increases
  useEffect(() => {
    const prev = prevRef.current;
    if (moneyValue > prev) {
      const diff = parseFloat((moneyValue - prev).toFixed(1));

      // Set the click position to the center of the saldo box
      if (boxRef.current) {
        boxRef.current.style.setProperty("--click-x", "50%");
        boxRef.current.style.setProperty("--click-y", "50%");
      }

      setPop(true);
      const id = Date.now() + Math.random();
      setBursts((b) => [...b, { id, amount: diff > 0 ? diff : moneyValue }]);

      // clear after animation
      const t = setTimeout(() => {
        setPop(false);
        setBursts((b) => b.filter((x) => x.id !== id));
      }, 1200);
      return () => clearTimeout(t);
    }
    prevRef.current = moneyValue;
  }, [moneyValue]);

  // Keep prev updated
  useEffect(() => {
    prevRef.current = moneyValue;
  }, [moneyValue]);

  return (
    <nav className="modern-topnav">
      {/* Inline styles just for the saldo/coins; keep or move to CSS file later */}
      <style>{`
       
      `}</style>

      <div className="topnav-container">
        {/* Logo */}
        <div className="topnav-logo">
          <img
            src="/logo.png"
            alt="SveaPanelen logo"
            className="topnav-logo-img"
          />
          <span className="topnav-brand">SveaPanelen</span>
        </div>

        {/* Right: links + saldo */}
        <div className="topnav-links">
          <button
            className="topnav-link"
            onClick={() => scrollToSection("faq-section")}
          >
            Vanliga frågor
          </button>
          <button
            className="topnav-link"
            onClick={() => scrollToSection("footer")}
          >
            Kontakt
          </button>

          {/* S A L D O  */}
          <div ref={boxRef} className={`saldo-box ${pop ? "pop" : ""}`}>
            {moneyValue.toFixed(1)}kr
            {/* burst layer */}
            {bursts.map((b) => (
              <SaldoBurst key={b.id} amount={b.amount} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

/* ------- burst subcomponent (coins + text + ring) ------- */
const SaldoBurst: React.FC<{ amount: number }> = ({ amount }) => {
  const N = 16;
  const coins = Array.from({ length: N }).map((_, i) => {
    const angle = (i / N) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 60 + Math.random() * 50; // px
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - (15 + Math.random() * 35); // slight upward bias
    const rot = (Math.random() * 360 - 180).toFixed(1);
    const delay = (i * 0.015).toFixed(3);
    const scale = (0.8 + Math.random() * 0.6).toFixed(2);
    return { dx, dy, rot, delay, scale, i };
  });

  return (
    <div className="saldo-burst" aria-hidden="true">
      <div className="saldo-ring" />
      <div className="saldo-float">
        +{amount.toString().replace(".", ",")} kr
      </div>
      {coins.map(({ dx, dy, rot, delay, scale, i }) => (
        <span
          key={i}
          className="saldo-coin"
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
