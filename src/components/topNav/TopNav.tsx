import React, { useEffect, useRef, useState } from "react";
import "./TopNav.css";

interface TopNavProps {
  handleAppDownload: () => void;
  moneyValue?: number;
}

const TopNav: React.FC<TopNavProps> = ({ handleAppDownload, moneyValue = 0 }) => {
  const prevRef = useRef(moneyValue);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // NEW: refs for a11y and focus management
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLButtonElement | null>(null);

  const [pop, setPop] = useState(false);
  const [bursts, setBursts] = useState<Array<{ id: number; amount: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Responsive breakpoint + close menu when switching to desktop
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((o) => !o);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (isMobile) closeMenu();
  };

  // Body scroll lock + initial focus when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      // prevent body scroll
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
      // focus first interactive element
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  // Close on ESC and keep focus trapped inside the menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      } else if (e.key === "Tab" && menuRef.current) {
        // Simple focus trap
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // --- your saldo burst logic (unchanged) ---
  useEffect(() => {
    const prev = prevRef.current;
    if (moneyValue > prev) {
      const diff = parseFloat((moneyValue - prev).toFixed(1));
      if (boxRef.current) {
        boxRef.current.style.setProperty("--click-x", "50%");
        boxRef.current.style.setProperty("--click-y", "50%");
      }
      setPop(true);
      const id = Date.now() + Math.random();
      setBursts((b) => [...b, { id, amount: diff > 0 ? diff : moneyValue }]);
      const t = setTimeout(() => {
        setPop(false);
        setBursts((b) => b.filter((x) => x.id !== id));
      }, 1200);
      return () => clearTimeout(t);
    }
    prevRef.current = moneyValue;
  }, [moneyValue]);

  useEffect(() => {
    prevRef.current = moneyValue;
  }, [moneyValue]);

  return (
    <>
      <nav className="modern-topnav">
        <div className="topnav-container">
          {/* Logo */}
          <div className="topnav-logo">
            <img src="/logo.png" alt="SveaPanelen logo" className="topnav-logo-img" />
            {!isMobile && <span className="topnav-brand">SveaPanelen</span>}
          </div>

          {/* Right side */}
          <div className="topnav-right">
            <div ref={boxRef} className={`saldo-box ${pop ? "pop" : ""}`}>
              {moneyValue.toFixed(1)}kr
              {bursts.map((b) => (
                <SaldoBurst key={b.id} amount={b.amount} />
              ))}
            </div>

            {/* Desktop links */}
            {!isMobile && (
              <div className="topnav-links">
                <button className="topnav-link" onClick={() => scrollToSection("faq-section")}>
                  Vanliga frågor
                </button>
                <button className="topnav-link" onClick={() => scrollToSection("footer")}>
                  Kontakt
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <button
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
                aria-label="Huvudmeny"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu - Rendered at root level */}
      {isMobile && isMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="mobile-menu open"
          role="menu"
          aria-label="Mobilmeny"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)'
          }}
        >
          {/* Menu Header */}
          <div className="mobile-menu-header">
            <div className="mobile-menu-logo">
              <img src="/logo.png" alt="SveaPanelen logo" />
              <span className="mobile-menu-brand">SveaPanelen</span>
            </div>
            <button
              className="mobile-menu-close"
              onClick={closeMenu}
              aria-label="Stäng meny"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="mobile-menu-content">
            <nav className="mobile-menu-nav">
              <h3 className="mobile-menu-section-title">Navigation</h3>
              
              <button
                ref={firstLinkRef}
                className="mobile-menu-link"
                role="menuitem"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  closeMenu();
                }}
              >
                Hem
              </button>
              
              <button
                className="mobile-menu-link"
                role="menuitem"
                onClick={() => scrollToSection("faq-section")}
              >
                Vanliga frågor
              </button>
              
              <button
                className="mobile-menu-link"
                role="menuitem"
                onClick={() => scrollToSection("footer")}
              >
                Kontakt
              </button>
            </nav>

            {/* Bottom Actions */}
            <div className="mobile-menu-actions">
              <button
                className="mobile-menu-cta"
                onClick={() => {
                  handleAppDownload();
                  closeMenu();
                }}
              >
                Ladda ner app
              </button>
              
              <button
                className="mobile-menu-secondary"
                onClick={() => scrollToSection("footer")}
              >
                Kontakta uss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;

/* ------- burst subcomponent (unchanged) ------- */
const SaldoBurst: React.FC<{ amount: number }> = ({ amount }) => {
  const N = 16;
  const coins = Array.from({ length: N }).map((_, i) => {
    const angle = (i / N) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 60 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - (15 + Math.random() * 35);
    const rot = (Math.random() * 360 - 180).toFixed(1);
    const delay = (i * 0.015).toFixed(3);
    const scale = (0.8 + Math.random() * 0.6).toFixed(2);
    return { dx, dy, rot, delay, scale, i };
  });

  return (
    <div className="saldo-burst" aria-hidden="true">
      <div className="saldo-ring" />
      <div className="saldo-float">+{amount.toString().replace(".", ",")} kr</div>
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