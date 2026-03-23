import { Swords, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "@/features/competition/styles/DuelsBadge.css";

const DuelsBadge = () => {
  const navigate = useNavigate();

  return (
    <div
      className="duels-badge"
      onClick={() => navigate("/dashboard/tavlingar")}
    >
      {/* Corner glows */}
      <div className="duels-badge__glow duels-badge__glow--tl" />
      <div className="duels-badge__glow duels-badge__glow--br" />

      {/* Swords watermark */}
      <div className="duels-badge__watermark">
        <Swords size={110} className="duels-badge__watermark-icon" />
      </div>

      {/* Top edge glow */}
      <div className="duels-badge__edge-glow" />

      {/* Content */}
      <div className="duels-badge__content">
        {/* Left column */}
        <div className="duels-badge__left">
          <div className="duels-badge__badges">
            <div className="duels-badge__pill duels-badge__pill--live">
              <div className="duels-badge__dot" />
              <span>LIVE</span>
            </div>
            <div className="duels-badge__pill duels-badge__pill--boost">
              <Zap size={10} />
              <span>VINN 2X</span>
            </div>
          </div>

          <span className="duels-badge__title">DUELS</span>
          <span className="duels-badge__subtitle">
            Utmana andra spelare i quiz
          </span>
        </div>

        {/* Right column */}
        <div className="duels-badge__right">
          <Swords size={22} className="duels-badge__swords-icon" />
          <button className="duels-badge__play-btn">
            <span>SPELA</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuelsBadge;
