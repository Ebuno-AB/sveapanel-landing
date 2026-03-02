import React from "react";
import "./HeroSection.css";
// import TyperEffect from "./TyperEffect";
import phoneImg from "@/src/public/assets/sveamock.png";
import bankIDLogo from "@/src/public/assets/BankID_logo.svg";
import logoImg from "@/src/public/assets/logo/logo.svg";

interface HeroProps {
  isRegistered: boolean;
  handleBankIDRegistration: () => void;
  handleAppDownload: () => void;
}

const HeroSection: React.FC<HeroProps> = ({
  isRegistered,
  handleBankIDRegistration,
  handleAppDownload,
}) => {
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
            <div>
              {isRegistered ? (
                <div className="custom-app-buttons">
                  <button
                    className="custom-app-btn"
                    onClick={handleBankIDRegistration}
                  >
                    Registrera dig med BankID
                    <img
                      src={bankIDLogo}
                      style={{ width: 50, height: "auto", marginLeft: 8 }}
                    />
                  </button>
                </div>
              ) : (
                <div className="custom-app-buttons">
                  <button
                    className="custom-app-btn"
                    onClick={handleAppDownload}
                  >
                    Ladda ner appen
                    <img src={logoImg} style={{ width: 35, height: 35 }} />
                  </button>
                </div>
              )}
            </div>
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
