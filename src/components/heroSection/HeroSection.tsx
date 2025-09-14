import React from "react";
import "./HeroSection.css";
import MovingBlurryBlobsBare from "../BlurryBlobBackground";
import MoneyCounter from "../moneyCounter";
import TyperEffect from "./TyperEffect";

interface HeroProps {
    isRegistered: boolean;
    handleBankIDRegistration: () => void;
    handleAppDownload: () => void;
    handleGooglePlayClick: () => void;
    handleAppStoreClick: () => void;
}

const HeroSection: React.FC<HeroProps> = ({
    isRegistered,
    handleBankIDRegistration,
    handleAppDownload,
    handleGooglePlayClick,
    handleAppStoreClick,
}) => {
return (
    <div className="hero">
      <MovingBlurryBlobsBare />
     
      <div className="hero-overlay">
        
        <div className="hero-inner">
      
          {/* Left: copy */}
          <div className="hero-col hero-copy">
           <h1 className="hero-title">
          <TyperEffect 
            staticText="Bli belönad för "
            words={["dina åsikter", "att spela mobilspel", "att svara på enkäter", "ditt deltagande"]}
            speed={120}
            pauseTime={2500}
          />
        </h1>
            <h3 className="hero-sub">
              Bli en av våra <span className="accent">200 000+</span> användare som
              tjänar pengar på enkäter och spel
            </h3>

            <div>
              {isRegistered ? (
                <div>
                  <button className="custom-app-btn" onClick={handleBankIDRegistration}>
                    Registrera dig med BankID
                    <img
                      src="/assets/BankID_logo.svg"
                      style={{ width: 50, height: "auto", marginLeft: 8 }}
                    />
                  </button>
                  <p className="hero-note">Registrera dig för att få tillgång till våra tjänster</p>
                </div>
              ) : (
                <div className="custom-app-buttons">
                  <button className="custom-app-btn" onClick={handleAppDownload}>
                    Ladda ner appen
                    <img src="/assets/logo/logo.svg" style={{ width: 35, height: 35 }} />
                  </button>
                </div>
              )}

              <div className="stores">
                <p className="stores-label">Tillgänglig på</p>
                <div className="stores-row">
                  <img
                    src="/assets/googleplay.png"
                    alt="Ladda ner på Google Play"
                    className="store-badge"
                    onClick={handleGooglePlayClick}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.opacity = "1";
                    }}
                  />
                  <img
                    src="/assets/appstore.png"
                    alt="Ladda ner på App Store"
                    className="store-badge"
                    onClick={handleAppStoreClick}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.opacity = "1";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: visuals */}
          <div className="hero-col hero-visual">
            <div className="phone-wrap">
              <img src="/assets/sveamodel.png" className="phone-img" />
              <img src="/assets/conf1.avif" className="floaty badge badge-1" />
              <img src="/assets/conf2.avif" className="floaty badge badge-2" />
              <img src="/assets/conf3.avif" className="floaty badge badge-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default HeroSection;