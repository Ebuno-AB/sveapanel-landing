import "../App.css";
import "../styles/BlobStyles.css";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Gamepad2, List, Gift, DollarSign } from "lucide-react";
import FoldableCard from "../components/FoldableCard";
import QRModal from "../components/QRModal";

import ParticlesComponent from "../components/particlesComponent";
import LiveEarningsCounter from "../components/LiveEarningsCounter";
import RatingsSection from "../components/ratingsCompnent/RatingsSection";
import CookiesConsent from "../components/cookies/CookiesConsent";
import { useGA } from "../hooks/gtag";
import { useBankID } from "../hooks/useBankID";
import { isPhone, isSocialBrowser } from "../utils/browserDetection";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";

import MovingBlurryBlobsBare from "../components/BlurryBlobBackground";
import Footer from "../components/footer";
import FAQ from "../components/FAQ";
import { ModernFeatureCard } from "../components/ModernFeatureCard";

function Landing() {
  const { trackEvent } = useGA();

  const navigate = useNavigate();
  const location = useLocation();
  const [fade, setFade] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
  
    useState(false);

  // BankID integration
  const {
    qrCodeUrl,
    browserLink,
    isLoading,
    error,
    success,
    initialize,
    clearAllIntervals,
  } = useBankID();
  const isPhoneDevice = isPhone();
  const isSocialBrowserDetected = isSocialBrowser();
  const currentUrl = window.location.href;

  // Check if user is registered (URL contains /r/{code} or /register/{code})
  const isRegistered = location.pathname.includes("/r/");

  // Handle BankID registration button click
  const handleBankIDRegistration = async () => {
    console.log("🔵 BankID registration button clicked!");
    console.log("📱 Device details:", {
      isPhoneDevice,
      isSocialBrowserDetected,
      currentUrl,
    });

    // Start BankID authentication
    console.log("🚀 Initializing BankID authentication...");
    const returnedBrowserLink = await initialize(isPhoneDevice);

    // For non-desktop devices, redirect to browserLink if available.
    // for successful registrations, redirect to landing page "/ " with a success message

    if (isPhoneDevice && returnedBrowserLink) {
      console.log(
        "📱 Redirecting to BankID app via browserLink:",
        returnedBrowserLink
      );
      window.location.href = returnedBrowserLink;
      return;
    }

    // Open modal for desktop devices
    if (!isPhoneDevice) {
      console.log("🖥️ Opening modal for desktop");
      setIsModalOpen(true);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    console.log("❌ Modal closed - clearing intervals");
    clearAllIntervals();
    setIsModalOpen(false);
  };

  const handleAppDownload = () => {
    // Track app download attempt
    if (cookiesAccepted) {
      trackEvent("app_download_click", {
        platform: "general",
        device_type: isPhone() ? "mobile" : "desktop",
      });
    }

    // Check if user is on desktop
    const isDesktop = !isPhone();

    if (isDesktop) {
      // Show QR code modal for desktop users
      setIsAppDownloadQRModalOpen(true);
    } else {
      // Direct redirect for mobile users
      const detectedPlatform = isPhone() ? "detect" : "google";
      navigate(`/redirect/${detectedPlatform}`);
    }
  };

  const handleGooglePlayClick = () => {
    // Track Google Play download attempt
    if (cookiesAccepted) {
      trackEvent("app_download_click", {
        platform: "google_play",
        device_type: isPhone() ? "mobile" : "desktop",
      });
    }

    const isDesktop = !isPhone();
    if (isDesktop) {
      setIsAppDownloadQRModalOpen(true);
    } else {
      navigate('/redirect/google');
    }
  };

  const handleAppStoreClick = () => {
    // Track App Store download attempt
    if (cookiesAccepted) {
      trackEvent("app_download_click", {
        platform: "app_store",
        device_type: isPhone() ? "mobile" : "desktop",
      });
    }

    const isDesktop = !isPhone();
    if (isDesktop) {
      setIsAppDownloadQRModalOpen(true);
    } else {
      navigate('/redirect/apple');
    }
  };

  // Check for success parameter in URL (for mobile redirects)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("registration") === "success") {
      setShowSuccessModal(true);
      // Track successful registration
      if (cookiesAccepted) {
        trackEvent("registration_completed", {
          method: "bankid",
          source: "mobile_redirect",
        });
      }
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [cookiesAccepted, trackEvent]);

  // Track page view when cookies are accepted
  useEffect(() => {
    if (cookiesAccepted) {
      trackEvent("page_view", {
        page: "landing",
        user_type: isRegistered ? "registered" : "unregistered",
        device_type: isPhoneDevice ? "mobile" : "desktop",
      });
    }
  }, [cookiesAccepted, trackEvent, isRegistered, isPhoneDevice]);

  return (
    <>
      <TopNav handleAppDownload={handleAppDownload} />
      <Hero
        isRegistered={isRegistered}
        handleBankIDRegistration={handleBankIDRegistration}
        handleAppDownload={handleAppDownload}
        handleGooglePlayClick={handleGooglePlayClick}
        handleAppStoreClick={handleAppStoreClick}
      />
      {/* Unified Background for InfoSection and RatingsSection */}
      <div
        style={{
           background: "linear-gradient(135deg, #866bffff 0%, #bfa8ffff 50%, #c8a8ff 100%)",
        }}
      >
        <InfoSection />
        
        {/* Ratings Section - Customer Reviews and Trust */}
        <div style={{ padding: "50px 30px" }}>
          <RatingsSection />
        </div>
      </div>
      
      <div
        style={{
          background: "linear-gradient(135deg, #ff6b9d 0%, #ffa8cc 50%, #c8a8ff 100%)",
          padding: "80px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {/* Left side - Text content */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              textAlign: "left",
              paddingRight: "20px",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "52px",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "24px",
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              Allt du behöver för att tjäna pengar
            </h2>
            <p
              style={{
                color: "white",
                opacity: 0.95,
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "1.4",
                marginBottom: "0",
              }}
            >
              För alla grupper i ditt liv
            </p>
          </div>

          {/* Right side - Feature cards */}
          <div
            style={{
              flex: "2",
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
              minWidth: "600px",
            }}

          
          >
            {/* image */}
            <img src="/public/assets/games.png" alt="Feature Image" style={{ maxWidth: "30%", borderRadius: "12px" }} />

          
                        <img src="/public/assets/formulär.svg" alt="Feature Image" style={{ width: "70%"}} />
           
      
          </div>
          
        </div>
      </div>
      
      {/* FAQ Section */}
      <FAQ />
      

      <Footer />

      {/* QR Modal */}
      {/* BankID Registration Modal */}
      <QRModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        qrCodeUrl={qrCodeUrl}
        isLoading={isLoading}
        error={error || undefined}
        success={success || undefined}
      />

      {/* Success Modal for Mobile Registration */}
      <QRModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        success={{
          title: "Registrering lyckades!",
          message:
            "Du har registrerats framgångsrikt med BankID! Du kan nu ladda ner appen för att börja tjäna pengar.",
          onClose: () => setShowSuccessModal(false),
        }}
      />

      {/* App Download QR Modal */}
      <AppDownloadQRModal
        isOpen={isAppDownloadQRModalOpen}
        onClose={() => setIsAppDownloadQRModalOpen(false)}
      />

      {/* Cookies Consent Banner */}
      <CookiesConsent
        onAccept={() => {
          console.log("Cookies accepted");
          setCookiesAccepted(true);
          // Track that user accepted cookies and enable GA
          trackEvent("cookie_consent", {
            consent_type: "accepted",
          });
        }}
        onDecline={() => {
          console.log("Cookies declined");
          setCookiesAccepted(false);
          // Track that user declined cookies (this will be the last tracked event)
          trackEvent("cookie_consent", {
            consent_type: "declined",
          });
        }}
      />
    </>
  );
}

const InfoSection = () => {
  return (
    <div
      style={{
        padding: "60px 40px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: 36,
          fontWeight: "bold",
          marginBottom: 40,
        }}
      >
        Tre enkla steg till att tjäna pengar
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 40,
          flexWrap: "wrap",
          margin: "-20px",
        }}
      >
        <CardSection
          title="Svara på enkäter"
          description="Hjälp företag och myndigheter genom att dela din åsikt"
        />
        <CardSection
          title="Bjud in vänner"
          description="Få bonusar när du tipsar andra om tjänsten"
        />
        <CardSection
          title="Tjäna pengar"
          description="Lös uppgifter och se dina belöningar växa"
        />
      </div>
    </div>
  );
};

const CardSection = ({
  title = "",
  description = "",
}: {
  title: string;
  description: string;
}) => {
  return (
    <div
      style={{
        flex: "0 1 280px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        margin: "20px",
      }}
    >
      <h3 style={{ color: "white", marginBottom: 20 }}>{title}</h3>
      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          width: "100%",
          height: 180,
          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          marginBottom: 20,
        }}
      ></div>
      <p
        style={{
          color: "white",
          opacity: 0.7,
        }}
      >
        {description}
      </p>
    </div>
  );
};
const Hero = ({
  isRegistered,
  handleBankIDRegistration,
  handleAppDownload,
  handleGooglePlayClick,
  handleAppStoreClick,
}: {
  isRegistered: boolean;
  handleBankIDRegistration: () => void;
  handleAppDownload: () => void;
  handleGooglePlayClick: () => void;
  handleAppStoreClick: () => void;
}) => {
  return (
    <div className="hero">
      <MovingBlurryBlobsBare />

      <div className="hero-overlay">
        <div className="hero-inner">
          {/* Left: copy */}
          <div className="hero-col hero-copy">
            <h1 className="hero-title">Bli belönad för dina åsikter</h1>
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

const TopNav = ({ handleAppDownload }: { handleAppDownload: () => void }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="modern-topnav">
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
        
        {/* Navigation Links */}
        <div className="topnav-links">
          <button 
            className="topnav-link"
            onClick={() => scrollToSection('about-section')}
          >
            Om oss
          </button>
          <button 
            className="topnav-link"
            onClick={() => scrollToSection('faq-section')}
          >
            Vanliga frågor
          </button>
            <button 
            className="topnav-link"
            onClick={() => scrollToSection('footer')}
            >
            Kontakt
            </button>
    
        </div>
      </div>
    </nav>
  );
};


export default Landing;
