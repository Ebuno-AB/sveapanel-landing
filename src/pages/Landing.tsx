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

            <ModernFeatureCard
              icon="�"
              title="Starta en enkät"
              description="Få feedback från din grupp med en snabb enkät - offentlig eller privat"
              mockupContent={
                <div style={{ padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "12px", fontSize: "14px" }}>
                  <div style={{ fontWeight: "600", marginBottom: "8px" }}>Enkätpanel 2024</div>
                  <div style={{ color: "#666", marginBottom: "12px" }}>Aktiva enkäter</div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "6px", backgroundColor: "#4caf50" }}></div>
                      <span style={{ fontWeight: "500" }}>Produkttest - 25kr</span>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "6px", backgroundColor: "#2196f3" }}></div>
                      <span style={{ fontWeight: "500" }}>Konsumentvanor - 15kr</span>
                    </div>
                  </div>
                  
                </div>
                
              }
              
            />
                        <img src="/public/assets/formulär.svg" alt="Feature Image" style={{ width: "70%"}} />
            {/* <ModernFeatureCard
              icon="�"
              title="Tjäna belöningar"
              description="Samla poäng och få belöningar direkt via Swish"
              mockupContent={
                <div style={{ padding: "16px", backgroundColor: "#4caf50", borderRadius: "12px", color: "white" }}>
                  <div style={{ fontSize: "12px", opacity: 0.9 }}>BELÖNING</div>
                  <div style={{ fontSize: "20px", fontWeight: "700" }}>250kr</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", marginTop: "8px" }}>Enkäter slutförda</div>
                  <div style={{ fontSize: "12px", opacity: 0.9 }}>Via Swish • Inga avgifter</div>
                  <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                    <button style={{ backgroundColor: "rgba(255,255,255,0.2)", border: "none", borderRadius: "20px", padding: "6px 12px", color: "white", fontSize: "12px" }}>Ta ut nu</button>
                    <button style={{ backgroundColor: "rgba(255,255,255,0.2)", border: "none", borderRadius: "20px", padding: "6px 12px", color: "white", fontSize: "12px" }}>Spara mer</button>
                  </div>
                </div>
              }
            />
            
            <ModernFeatureCard
              icon="�"
              title="Spela spel"
              description="Testa nya spel och tjäna extra poäng när du spelar"
              mockupContent={
                <div style={{ padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "12px", fontSize: "14px" }}>
                  <div style={{ fontWeight: "600", marginBottom: "12px" }}>Vilka spel vill du testa?</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#e3f2fd", borderRadius: "6px" }}>
                      <span>🎮 Puzzle Games</span>
                      <span style={{ fontSize: "12px", color: "#666" }}>10kr/tim</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "#fff3e0", borderRadius: "6px" }}>
                      <span>🏆 Strategy Games</span>
                      <span style={{ fontSize: "12px", color: "#666" }}>15kr/tim</span>
                    </div>
                  </div>
                  <div style={{ marginTop: "12px", fontSize: "12px", color: "#666" }}>Börja spela • Tjäna direkt</div>
                </div>
              }
            /> */}
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
    <div
      style={{
        flex: 1,
        position: "relative",
        top: 0,
        left: 0,
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "black",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <MovingBlurryBlobsBare />
      <div
        style={{
          zIndex: 1,
          position: "absolute",
          flex: 1,
          top: "0px",
          width: "100%",
          height: "100%",
          left: "0px",

          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "60%",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          > 
            <h1
              style={{
                fontSize: 50,
                color: "white",
              }}
            >
              Bli belönad för dina åsikter
            </h1>
            <h3
              style={{
                fontWeight: "normal",
                color: "white",
              }}
            >
              Bli en av våra{" "}
              <span style={{ fontWeight: "bold", color: "#00CCA3" }}>
                200 000+
              </span>{" "}
              användare som tjänar pengar på enkäter och spel
            </h3>
            <div>
              {isRegistered ? (
                <div className="">
                  <button
                    className="custom-app-btn"
                    onClick={handleBankIDRegistration}
                  >
                    Registrera dig med BankID
                    <img
                      src="/assets/BankID_logo.svg"
                      style={{
                        width: "50px",
                        height: "auto",
                        marginLeft: "8px",
                      }}
                    />
                  </button>
                  <p style={{ fontSize: "1rem", color: "white" }}>
                    Registrera dig för att få tillgång till våra tjänster{" "}
                  </p>
                </div>
              ) : (
                // Show app store buttons for registered users
                <div className="custom-app-buttons">
                  <button
                    className="custom-app-btn"
                    onClick={handleAppDownload}
                  >
                    Ladda ner appen
                    <img src="/assets/logo/logo.svg" style={{ width: "35px", height: "35px" }} />
                  </button>
                </div>
              )}
              <div
                style={{
                  marginTop: 30,
                  marginBottom: 20,
                }}
              >
                <p 
                  style={{ 
                    color: "white", 
                    opacity: 0.8, 
                    fontSize: "0.9rem",
                    marginBottom: 15,
                    fontWeight: "300"
                  }}
                >
                  Tillgänglig på
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <img
                    src="/assets/googleplay.png"
                    alt="Ladda ner på Google Play"
                    style={{ 
                      height: 50,      
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: "transform 0.2s ease, opacity 0.2s ease",
                    }}
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
                    style={{ 
                      height: 52, 
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: "transform 0.2s ease, opacity 0.2s ease",
                    }}
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
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              display: "flex",
            }}
          >
            <div
              style={{ height: "550px", width: "400px", position: "relative" }}
            >
              <img
                src="/assets/sveamodel.png"
                style={{ height: "550px" }}
              />
              <img
                src="/assets/conf1.avif"
                className="floaty"
                style={{
                  height: "100px",
                  position: "absolute",
                  top: 20,
                  left: 0,
                }}
              />
              <img
                className="floaty"
                src="/assets/conf2.avif"
                style={{
                  height: "110px",
                  position: "absolute",
                  top: 120,
                  right: 20,
                }}
              />
              <img
                className="floaty"
                src="/assets/conf3.avif"
                style={{
                  height: "110px",
                  position: "absolute",
                  bottom: 60,
                  right: 20,
                }}
              />
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

// return (
//   <>
//     <div className="">
//       <header className="landing-header">
//         <div className="logo-container">
//           <Link to="/">
//             <img
//               src={logoImage}
//               alt="Sveapanelen logo"
//               className="logo-img"
//             />
//           </Link>
//         </div>
//       </header>

//       {/* Centered container for the hero section */}
//       <section className="custom-hero fade-in">
//         <ParticlesComponent />
//         <div className="custom-hero-content">
//           {/*
//           <img src={gameIcon1} alt="Game" className="game-icon game-icon-1" />

//           <img src={gameIcon2} alt="Game" className="game-icon game-icon-2" />
//           <img src={gameIcon3} alt="Game" className="game-icon game-icon-3" /> */}
//           {/* <img
//             src={icon1}
//             alt="Game"
//             className="game-icon game-icon-5"
//             style={{ left: "30%", top: "10%", opacity: "0.8" }}
//           />
//           <img src={icon2} alt="Game" className="game-icon game-icon-5" /> */}

//           {/* Left: Text */}
//           <div className="custom-hero-left">
//             <span className="custom-welcome">Välkommen till</span>
//             <h1 className="custom-title">
//               Betalda undersökningar.
//               <br />
//               Som du kan lita på.
//             </h1>
//             <p className="custom-desc">
//               Vi är ett företag som hjälper dig att tjäna pengar på att svara
//               på enkäter och spela spel!
//             </p>

//             {isRegistered ? (
//               <div className="">
//                 <button
//                   className="custom-app-btn"
//                   onClick={handleBankIDRegistration}
//                 >
//                   Registrera dig med BankID
//                   <img
//                     src={BankIdLogo}
//                     style={{
//                       width: "50px",
//                       height: "auto",
//                       marginLeft: "8px",
//                     }}
//                   />
//                 </button>
//                 <p style={{ fontSize: "1rem" }}>
//                   Registrera dig för att få tillgång till våra tjänster{" "}
//                 </p>
//               </div>
//             ) : (
//               // Show app store buttons for registered users
//               <div className="custom-app-buttons">
//                 <button
//                   className="custom-app-btn"
//                   onClick={handleAppDownload}
//                 >
//                   Ladda ner appen
//                   <img src={logo} style={{ width: "35px", height: "35px" }} />
//                 </button>
//                 {/* <button
//                   className="custom-app-btn google"
//                   onClick={handleAppDownload}
//                 >
//                   <img src={googleImage} alt="Google" />
//                   Google Play
//                 </button>
//                 <button
//                   className="custom-app-btn apple"
//                   onClick={handleAppDownload}
//                 >
//                   <img src={appleImage} alt="Apple" />
//                   App Store
//                 </button> */}
//               </div>
//             )}
//           </div>
//           {/* Right: Phone mockup and cards */}
//           <div className="custom-hero-right">
//             {!isPhone() && (
//               <div className="custom-phone-stack">
//                 <img
//                   src={globeImage}
//                   alt="mobileImage"
//                   className={`fade-image ${fade ? "fade-in" : "fade-out"}`}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>

//     {/* Live Earnings Counter - positioned for maximum impact */}

//     {/* Services Section - now outside landing-root for white background */}
//     <div className="services-section">
//       <h2 className="services-heading">
//         Tjäna pengar med <br />{" "}
//         <span className="text-black">SveaPanelen</span>
//       </h2>
//       <p className="services-subheading">
//         Med tre enkla steg kan du tjäna pengar på att svara på enkäter!
//       </p>

//       <div className="cards-container">
//         <div className="card">
//           <img
//             src={gameBird}
//             alt="Game"
//             className="card-img"
//             style={{ width: "130px", height: "130px" }}
//           />
//           <div className="card-text">Spela och tjäna poäng!</div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur <br />
//             adipisicing elit. Quisquam, quos.
//           </p>
//         </div>
//         <div className="card">
//           <img src={marioBird} alt="Game" className="card-img" />
//           <div className="card-text">Upptäck nya spel!</div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur <br />
//             adipisicing elit. Quisquam, quos.
//           </p>
//         </div>
//         <div className="card">
//           <img src={rewardBird} alt="Game" className="card-img" />
//           <div className="card-text">Få belöningar direkt!</div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur <br />
//             adipisicing elit. Quisquam, quos.
//           </p>
//         </div>
//       </div>
//       <LiveEarningsCounter />
//       <RatingsSection />

//       {/* IMAGES*/}

//       {/* <img ref={el => { splineRefs.current[0] = el; }} src={games} alt="Game" className="spline-img" />
//      <img ref={el => { splineRefs.current[1] = el; }} src={forms} alt="Game" className="spline-img" /> */}

//       {/* Discover Games & Earn Rewards Section */}

//       {/* 1st block */}
//       <div className="features-section">
//         <div className="feature-block">
//           <div className="feature-content">
//             <div className="feature-icon">
//               <Gamepad2 size={24} className="highlight" />
//             </div>
//             <div className="feature-header">SPEL</div>
//             <h2 className="feature-title">Upptäck Spel</h2>
//             <p className="feature-description">
//               Våra spel är anpassade för dig. Hitta ett spel du gillar och
//               börja spela. Ju längre du spelar, desto fler poäng får du.
//             </p>
//           </div>
//           <div className="feature-graphics">
//             <div className="game-icons">
//               <img src={gameCards} style={{ width: "80%" }} />
//             </div>
//           </div>
//         </div>

//         {/* 2nd block */}
//         <div className="feature-block">
//           <div className="feature-content">
//             <div className="feature-icon">
//               <List size={24} className="highlight" />
//             </div>
//             <div className="feature-header">FORMULÄR</div>
//             <h2 className="feature-title">Fyll i formulär</h2>
//             <p className="feature-description">
//               Fyll i formulär och få pengar direkt via Swish, utan
//               uttagsgränser. Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Quisquam, quos.
//             </p>
//           </div>
//           <div className="feature-graphics">
//             <div className="game-icons">
//               <img src={FormImg} />
//             </div>
//           </div>
//         </div>

//         {/* 3rd block */}
//         <div className="feature-block">
//           <div className="feature-graphics">
//             <div className="reward-cards">
//               <img src={money} />
//             </div>
//           </div>

//           <div className="feature-content">
//             <div className="feature-icon">
//               <DollarSign size={24} className="highlight" />
//             </div>
//             <div className="feature-header">Swish</div>
//             <h2 className="feature-title">Tjäna pengar</h2>
//             <p className="feature-description">
//               Få pengar direkt via Swish, utan uttagsgränser. Lorem ipsum
//               dolor sit amet consectetur adipisicing elit. Quisquam, quos.
//             </p>
//           </div>

//           {/* 4th block */}
//         </div>
//         <div className="feature-block">
//           <div className="feature-graphics">
//             <div className="reward-cards">
//               <img src={tokens} style={{ width: "50%" }} />
//             </div>
//           </div>
//           <div className="feature-content">
//             <div className="feature-icon">
//               <Gift size={24} className="highlight" />
//             </div>
//             <div className="feature-header">POÄNG</div>
//             <h2 className="feature-title">Formulär</h2>
//             <p className="feature-description">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Quisquam, quos. Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Quisquam, quos.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ABOUT FORM */}
//       <div className="about-form">
//         <div className="about-form-header">
//           <h2 className="about-form-title">
//             Vanliga frågor om betalda undersökningar
//           </h2>
//           <p className="about-form-subtitle">
//             Här får du svar på dina vanligaste frågor om hur du tjänar pengar
//             genom att svara på enkäter
//           </p>
//         </div>

//         <div className="info-container">
//           <div className="info-card">
//             <div className="info-card-content">
//               <h3 className="info-title">
//                 Vad brukar belöningarna ligga på?
//               </h3>
//               <p className="info-desc">
//                 Belöningarna brukar ligga runt 1-50kr per enkät, beroende på
//                 längd och komplexitet.
//               </p>
//             </div>
//           </div>
//           <div className="info-card">
//             <div className="info-card-content">
//               <h3 className="info-title">Hur långa är undersökningarna?</h3>
//               <p className="info-desc">
//                 Undersökningarna är från 1-25 minuter långa, så du kan välja
//                 vad som passar dig bäst.
//               </p>
//             </div>
//           </div>
//           <div className="info-card">
//             <div className="info-card-content">
//               <h3 className="info-title">Hur får jag pengarna?</h3>
//               <p className="info-desc">
//                 Du får pengar direkt via Swish, utan uttagsgränser eller dolda
//                 avgifter.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div
//         className="foldable-cards-section-margin"
//         id="foldable-cards-section"
//       >
//         <h3 className="foldable-cards-section-title">Frågor och svar</h3>
//         {/* Foldable Cards Section */}
//         <div className="foldable-cards-section">
//           <FoldableCard title="Hur fungerar det?" defaultOpen={false}>
//             <p>
//               Du registrerar dig, svarar på enkäter och tjänar pengar direkt
//               via Swish. Det är så enkelt!
//             </p>
//             <ul>
//               <li>Registrera dig gratis</li>
//               <li>Svara på enkäter</li>
//               <li>Få pengar via Swish</li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard
//             title="Vad är betalda undersökningar?"
//             defaultOpen={false}
//           >
//             <p>
//               Betalda undersökningar är enkäter som företag betalar dig för
//               att svara på. Här är hur det fungerar:
//             </p>
//             <ul>
//               <li>
//                 <strong>Företag behöver feedback:</strong> Många företag vill
//                 testa sina produkter och idéer innan de lanseras. De vänder
//                 sig till panelföretag som SveaPanelen för att sätta upp
//                 undersökningar.
//               </li>
//               <li>
//                 <strong>Du får betalt:</strong> Vi visar undersökningarna för
//                 våra användare och betalar ut belöningar för deltagandet. Alla
//                 belöningar kan tas ut till Swish, direkt till ditt konto, utan
//                 uttagsgränser.
//               </li>
//               <li>
//                 <strong>Extra tävlingar:</strong> Vi erbjuder även tävlingar
//                 för de som gör flest enkäter eller bjuder in flest användare.
//                 Du kan vinna häftiga priser som betalas ut varje vecka!
//               </li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard
//             title="Vad kan man tjäna med betalda undersökningar?"
//             defaultOpen={false}
//           >
//             <p>
//               Betalda undersökningar erbjuder möjligheten att tjäna extra
//               pengar på fritiden genom att dela med sig av sina åsikter och
//               tankar om olika produkter och tjänster.
//             </p>
//             <ul>
//               <li>
//                 <strong>Extra inkomst:</strong> Med minimal ansträngning kan
//                 du få en extra inkomst som kan hjälpa dig att spara pengar
//                 eller finansiera dina fritidsintressen.
//               </li>
//               <li>
//                 <strong>Små belopp blir stora:</strong> Även om det är mindre
//                 belopp som du kan tjäna på undersökningar så kan små belopp
//                 sammanlagt bli ett bra tillskott.
//               </li>
//               <li>
//                 <strong>Lunch betald:</strong> Genom att vara aktiv då och då
//                 kan du få lunchen betald.
//               </li>
//             </ul>
//             <p>
//               <strong>Kom igång redan idag:</strong> Börja att tjäna pengar på
//               enkäter och ladda ner appen på App Store eller Google Play.
//             </p>
//           </FoldableCard>

//           <FoldableCard title="Vilka belöningar kan jag få?">
//             <p>Du kan välja mellan olika belöningar:</p>
//             <ul>
//               <li>Swish-betalningar</li>
//               <li>Presentkort till Amazon</li>
//               <li>Google Play-kort</li>
//               <li>PayPal-betalningar</li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard title="Hur mycket kan jag tjäna?">
//             <p>
//               Belöningarna varierar beroende på enkätens längd och
//               komplexitet:
//             </p>
//             <ul>
//               <li>Korta enkäter: 1-10 kr</li>
//               <li>Mellanlånga enkäter: 10-25 kr</li>
//               <li>Långa enkäter: 25-50 kr</li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard title="Varför just oss?" defaultOpen={false}>
//             <p>
//               Vi är ett företag som hjälper dig att tjäna pengar på att svara
//               på enkäter!
//             </p>
//             <ul>
//               <li>
//                 Vi är ett företag som hjälper dig att tjäna pengar på att
//                 svara på enkäter!
//               </li>
//               <li>
//                 Vi är ett företag som hjälper dig att tjäna pengar på att
//                 svara på enkäter!
//               </li>
//             </ul>
//           </FoldableCard>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     {/* QR Modal */}
//     {/* BankID Registration Modal */}
//     <QRModal
//       isOpen={isModalOpen}
//       onClose={handleModalClose}
//       qrCodeUrl={qrCodeUrl}
//       isLoading={isLoading}
//       error={error || undefined}
//       success={success || undefined}
//     />

//     {/* Success Modal for Mobile Registration */}
//     <QRModal
//       isOpen={showSuccessModal}
//       onClose={() => setShowSuccessModal(false)}
//       success={{
//         title: "Registrering lyckades!",
//         message:
//           "Du har registrerats framgångsrikt med BankID! Du kan nu ladda ner appen för att börja tjäna pengar.",
//         onClose: () => setShowSuccessModal(false),
//       }}
//     />

//     {/* App Download QR Modal */}
//     <AppDownloadQRModal
//       isOpen={isAppDownloadQRModalOpen}
//       onClose={() => setIsAppDownloadQRModalOpen(false)}
//     />

//     {/* Mobile BankID handling - removed since we now redirect directly */}

//     {/* Cookies Consent Banner */}
//     <CookiesConsent
//       onAccept={() => {
//         console.log("Cookies accepted");
//         setCookiesAccepted(true);
//         // Track that user accepted cookies
//         console.log("Cookies accepted");
//       }}
//       onDecline={() => {
//         console.log("Cookies declined");
//         setCookiesAccepted(false);
//         // Track that user declined cookies
//         console.log("Cookies declined");
//       }}
//     />
//   </>
// );
