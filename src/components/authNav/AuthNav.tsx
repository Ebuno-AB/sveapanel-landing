import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/features/user/api/user.queries";
import { useStreakStats } from "@/features/streak/api/streak.queries";
import { Flame } from "lucide-react";
import logoImg from "@/assets/icons/logo.png";
import "./AuthNav.css";

const NAV_ITEMS = [
  { label: "Upptäck", path: "/dashboard" },
  { label: "Cashback", path: "/dashboard/cashback" },
  { label: "Tävlingar", path: "/dashboard/tavlingar" },
  { label: "Mina sidor", path: "/dashboard/konto" },
];

const BALANCE_MAX = 300;

function StreakBadge({
  streak,
  onClick,
}: {
  streak: number;
  onClick: () => void;
}) {
  return (
    <button className="streak-badge" onClick={onClick} aria-label="Streak">
      <span className="streak-badge-count">{streak}</span>
      <Flame className="streak-badge-fire" size={15} strokeWidth={2.5} />
    </button>
  );
}

function BalanceRing({ balance }: { balance: number }) {
  const displayBalance = balance / 10;
  const progress = Math.min(displayBalance / BALANCE_MAX, 1);

  return (
    <div className="balance-pill">
      <div
        className="balance-pill-fill"
        style={{ width: `${progress * 100}%` }}
      />
      <span className="balance-pill-text">
        {Math.round(displayBalance)}
        <span className="balance-pill-currency">kr</span>
      </span>
    </div>
  );
}

const AuthNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useUser();
  const { data: streakStats } = useStreakStats();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 769;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : "?";

  const closeAndGo = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className="auth-topnav">
        <div className="auth-topnav-container">
          {/* Left: logo + nav links */}
          <div className="auth-topnav-left">
            <div
              className="auth-topnav-logo"
              onClick={() => navigate("/dashboard")}
            >
              <img src={logoImg} alt="SveaPanelen" />
              {!isMobile && (
                <span className="auth-topnav-brand">SveaPanelen</span>
              )}
            </div>
            {!isMobile &&
              NAV_ITEMS.map((item) => {
                const isActive =
                  item.path === "/dashboard"
                    ? location.pathname === "/dashboard"
                    : location.pathname.startsWith(item.path);
                return (
                  <button
                    key={item.path}
                    className={`auth-nav-link${isActive ? " active" : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </button>
                );
              })}
          </div>

          {/* Right: balance + avatar (desktop) */}
          <div className="auth-topnav-right">
            {!isMobile && (
              <>
                <BalanceRing balance={user?.balance ?? 0} />
                <StreakBadge
                  streak={streakStats?.currentStreak ?? 0}
                  onClick={() => navigate("/dashboard/streak")}
                />
                <button
                  className="auth-avatar-btn"
                  onClick={() => navigate("/dashboard/konto")}
                >
                  <div className="auth-avatar">{initials}</div>
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <button
                className={`auth-hamburger${menuOpen ? " active" : ""}`}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Meny"
                aria-expanded={menuOpen}
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {isMobile && (
        <div
          ref={menuRef}
          className={`auth-mobile-menu${menuOpen ? " open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="auth-mobile-menu-content">
            <nav className="auth-mobile-nav">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.path === "/dashboard"
                    ? location.pathname === "/dashboard"
                    : location.pathname.startsWith(item.path);
                return (
                  <button
                    key={item.path}
                    className={`auth-mobile-link${isActive ? " active" : ""}`}
                    onClick={() => closeAndGo(item.path)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="auth-mobile-bottom">
              <div className="auth-mobile-balance">
                <BalanceRing balance={user?.balance ?? 0} />
                <span className="auth-mobile-balance-label">Ditt saldo</span>
              </div>
              <button
                className="auth-mobile-profile"
                onClick={() => closeAndGo("/dashboard/konto")}
              >
                <div className="auth-avatar">{initials}</div>
                <div className="auth-mobile-profile-info">
                  <span className="auth-mobile-profile-name">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="auth-mobile-profile-label">Mitt konto</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthNav;
