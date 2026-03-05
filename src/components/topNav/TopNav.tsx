import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TopNav.css";
import logoImg from "@/assets/icons/logo.png";

interface TopNavProps {
  handleAppDownload: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ handleAppDownload }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLButtonElement | null>(null);

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

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((o) => !o);

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
          'button, [href], [tabindex]:not([tabindex="-1"])',
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

  return (
    <>
      <nav className="modern-topnav">
        <div className="topnav-container">
          {/* Logo */}
          <div
            className="topnav-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={logoImg}
              alt="SveaPanelen logo"
              className="topnav-logo-img"
            />
            {!isMobile && <span className="topnav-brand">SveaPanelen</span>}
          </div>

          {/* Right side */}
          <div className="topnav-right">
            {/* Desktop links */}
            {!isMobile && (
              <div className="topnav-links">
                <button
                  className={`topnav-link${location.pathname === "/" ? " active" : ""}`}
                  onClick={() => navigate("/")}
                >
                  Hem
                </button>
                <button
                  className={`topnav-link${location.pathname === "/cashback" ? " active" : ""}`}
                  onClick={() => navigate("/cashback")}
                >
                  Cashback
                </button>
                <button className="topnav-download" onClick={handleAppDownload}>
                  Ladda ner appen
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
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 999999,
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
          }}
        >
          {/* Menu Header */}
          <div className="mobile-menu-header">
            <div className="mobile-menu-logo">
              <img src={logoImg} alt="SveaPanelen logo" />
              <span className="mobile-menu-brand">SveaPanelen</span>
            </div>
            <button
              className="mobile-menu-close"
              onClick={closeMenu}
              aria-label="Stäng meny"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="mobile-menu-content">
            <nav className="mobile-menu-nav">
              <button
                ref={firstLinkRef}
                className={`mobile-menu-link${location.pathname === "/" ? " active" : ""}`}
                role="menuitem"
                onClick={() => {
                  navigate("/");
                  closeMenu();
                }}
              >
                Hem
              </button>
              <button
                className={`mobile-menu-link${location.pathname === "/cashback" ? " active" : ""}`}
                role="menuitem"
                onClick={() => {
                  navigate("/cashback");
                  closeMenu();
                }}
              >
                Cashback
              </button>
              <button
                className={`mobile-menu-link${location.pathname === "/om" ? " active" : ""}`}
                role="menuitem"
                onClick={() => {
                  navigate("/om");
                  closeMenu();
                }}
              >
                Om
              </button>
              <button
                className={`mobile-menu-link${location.pathname === "/kontakt" ? " active" : ""}`}
                role="menuitem"
                onClick={() => {
                  navigate("/kontakt");
                  closeMenu();
                }}
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
                Ladda ner appen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
