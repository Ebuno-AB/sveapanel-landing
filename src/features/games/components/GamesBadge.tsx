import { Gamepad2, Smartphone, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "@/features/games/styles/GamesBadge.css";

interface GamesBadgeProps {
  onClick?: () => void;
}

const GamesBadge = ({ onClick }: GamesBadgeProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="games-badge"
      onClick={onClick ?? (() => navigate("/dashboard/spel"))}
    >
      {/* Corner glows */}
      <div className="games-badge__glow games-badge__glow--tl" />
      <div className="games-badge__glow games-badge__glow--br" />

      {/* Gamepad watermark */}
      <div className="games-badge__watermark">
        <Gamepad2 size={110} className="games-badge__watermark-icon" />
      </div>

      {/* Top edge glow */}
      <div className="games-badge__edge-glow" />

      {/* Content */}
      <div className="games-badge__content">
        {/* Left column */}
        <div className="games-badge__left">
          <div className="games-badge__badges">
            <div className="games-badge__pill games-badge__pill--new">
              <Sparkles size={9} />
              <span>NYTT</span>
            </div>
            <div className="games-badge__pill games-badge__pill--exclusive">
              <Smartphone size={9} />
              <span>APP-EXKLUSIVT</span>
            </div>
          </div>

          <span className="games-badge__title">SPEL</span>
          <span className="games-badge__subtitle">
            Spela exklusiva spel i appen
          </span>
        </div>

        {/* Right column */}
        <div className="games-badge__right">
          <Gamepad2 size={22} className="games-badge__gamepad-icon" />
          <button className="games-badge__play-btn">
            <span>ÖPPNA</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesBadge;
