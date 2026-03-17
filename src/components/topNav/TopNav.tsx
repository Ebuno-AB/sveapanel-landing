import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TopNav.css";
import logoImg from "@/assets/icons/logo.png";

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLButtonElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Responsive breakpoint + close menu when switching to desktop
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 900;
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
                <button
                  className={`topnav-link${location.pathname === "/kundtjanst" ? " active" : ""}`}
                  onClick={() => navigate("/kundtjanst")}
                >
                  Kundtjänst
                </button>
                <button className="topnav-download" onClick={() => navigate("/logga-in")}>
                  Logga in
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

      {/* Full-Screen Mobile Menu - Always in DOM on mobile so exit transition plays */}
      {isMobile && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`mobile-menu${isMenuOpen ? " open" : ""}`}
          role="menu"
          aria-label="Mobilmeny"
          aria-hidden={!isMenuOpen}
        >
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
                className={`mobile-menu-link${location.pathname === "/kundtjanst" ? " active" : ""}`}
                role="menuitem"
                onClick={() => {
                  navigate("/kundtjanst");
                  closeMenu();
                }}
              >
                Kundtjänst
              </button>
            </nav>

            {/* Bottom Actions */}
            <div className="mobile-menu-actions">
              <button
                className="mobile-menu-cta"
                onClick={() => {
                  navigate("/logga-in");
                  closeMenu();
                }}
              >
                Logga in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
