import React from "react";
import "./HeroSection.css";
import phoneImg from "@/assets/Images/sveamock.png";
import PayoutCounter from "../ui/PayoutCounter";

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-overlay">
        <div className="hero-inner">
          {/* Left: copy */}
          <div className="hero-col hero-copy">
            <h1 className="hero-title">Sveriges bästa rewards app.</h1>
            <h3 className="hero-sub">
              Bli en av våra <span className="accent">200 000+</span> användare
              som tjänar pengar på enkäter, mobilspel och cashback.
            </h3>
            <ul className="hero-features">
              <li className="hero-feature">
                <span className="feature-text">
                  Registrera dig på en 1 min med <strong>BankID</strong>
                </span>
              </li>
              <li className="hero-feature">
                <span className="feature-text">
                  Ta ut dina pengar när du vill med <strong>Swish</strong>
                </span>
              </li>
            </ul>
            <PayoutCounter />
          </div>

          {/* Right: visuals */}
          <div className="hero-col hero-visual">
            <div className="phone-wrap">
              <img src={phoneImg} className="phone-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
