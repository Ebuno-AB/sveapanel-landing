import "../App.css";
import "../components/bankModal/BankModal.css";
import "../styles/BlobStyles.css";

import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRModal from "../components/QRModal";

import RatingsSection from "../components/ratingsCompnent/RatingsSection";
import CookiesConsent from "../components/cookies/CookiesConsent";
import { useGA } from "../hooks/gtag";
import { useBankID } from "../hooks/useBankID";
import { isPhone, isSocialBrowser } from "../utils/browserDetection";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";
import Hero from "../components/heroSection/HeroSection";
import Footer from "../components/footer/Footer";
import TopNav from "../components/topNav/TopNav";
import FAQ from "../components/faq/FAQ";

import SurveyCards from "../components/surveyCards/SurveyCards";
import InfoSection from "../components/infoSection/InfoSection";
import FeatureSection from "../components/featureSection/FeatureSection";
import FlappyGame from "../components/flappyGame";
import branch from "branch-sdk";

function Landing() {
  const { trackEvent } = useGA();

  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  
  const [totalEarnings, setTotalEarnings] = useState(0);
  const earningsRef = useRef(0);
  
// Throttle UI updates to every 200ms
useEffect(() => {
  const interval = setInterval(() => {
    if (earningsRef.current !== totalEarnings) {
      setTotalEarnings(earningsRef.current);
    }
  }, 200);
  return () => clearInterval(interval);
}, [totalEarnings]);

// Use this for FlappyGame and SurveyCards
const handleEarn = useCallback((amount: number) => {
  earningsRef.current = parseFloat((earningsRef.current + amount).toFixed(1));
}, []);

  // BankID integration
  const {
    qrCodeUrl,
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

  useEffect(() => {
    branch.init(
      "key_live_iwbeLcb4ikSelTXhyZCFWkijxqlOtyRk",
      {},
      (err: branch.BranchError, data: branch.SessionData | null) => {
        console.log("Branch init", err, data);
      }
    );
  }, []);

  // Handle BankID registration button click
  const handleBankIDRegistration = async () => {
    console.log("BankID registration button clicked!");
    console.log("Device details:", {
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
      navigate("/redirect/google");
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
      navigate("/redirect/apple");
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
      <TopNav
        handleAppDownload={handleAppDownload}
        moneyValue={totalEarnings}
      />

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
          background:
           "linear-gradient(135deg, #2960ceff 0%, #34b1d0ff 50%, #3dbed2ff 100%)"
        }}
      >
        <InfoSection />
     
   
        {/* Ratings Section - Customer Reviews and Trust */}
        <div style={{ padding: "25px 15px" }}>
          <RatingsSection />
        </div>
      </div>

      {/* First Feature Section - Games */}
      <FeatureSection
        background="linear-gradient(135deg, #e05d89ff 0%, #ffa8cc 50%, #c8a8ff 100%)"
        title="100+ mobilspel att ladda ner!"
        description="Bli belönad för varje nivå!"
        imageAlt="Spel och belöningar"
        interactive={true}
        carousel={
          <div className="carousel-strip">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                // wider viewport
                width: "100vw",
                maxWidth: "600px",
                marginLeft: "-5rem",

                margin: "40px auto 60px",
                // smooth fade on edges
                maskImage:
                  "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  width: "max-content",
                  // seamless scroll
                  animation: "marquee var(--marquee-speed, 22s) linear infinite",
                  // eliminate jitter on reset
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  transform: "translate3d(0,0,0)",
                }}
              >
                {[
                  "/assets/games/candyCrush.png",
                  "/assets/games/monopoly.png",
                  "/assets/games/pigGame.png",
                  "/assets/games/tontongGame.png",
                ]
                  // exact 2× duplication ensures translateX(-50%) loops perfectly
                  .concat([
                    "/assets/games/candyCrush.png",
                    "/assets/games/monopoly.png",
                    "/assets/games/pigGame.png",
                    "/assets/games/tontongGame.png",
                  ])
                  .map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Game icon"
                      draggable={false}
                      style={{
                        flex: "0 0 auto", // prevent flex shrink (avoids width drift)
                        width: "160px",
                        height: "160px",
                        objectFit: "contain",
                        borderRadius: "20px",
                        padding: "6px",
                        // avoid subpixel blur on some GPUs
                        imageRendering: "auto",
                        transform: "translateZ(0)",
                      }}
                    />
                  ))}
              </div>

              {/* Animation styles */}
              <style>
                {`
          @keyframes marquee {
            0%   { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            .carousel-strip div[style*="animation: marquee"] {
              animation: none !important;
              transform: translate3d(0,0,0) !important;
            }
          }
        `}
              </style>
            </div>
          </div>
        }
      >
        <style>
          {`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}
        </style>
        {/* Phone showcase */}
        <div className="feature-phone-showcase">
          {/* Game inside phone (scales with frame) */}
          <div
            style={{
              position: "absolute",
              top: "0%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "72%",
              height: "82%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "25px",
              boxShadow: "inset 0 0 18px rgba(0,0,0,0.2)",
              background: "#000", // prevents transparent edges
              zIndex: 1, // sits under the frame
              overflow: "hidden",
              userSelect: "none",
              msUserSelect: "none",
              WebkitTapHighlightColor: "transparent",

            }}
          >
            <FlappyGame
              onPointGained={() => {
                handleEarn(1);
              }}
            />
          </div>

          {/* iPhone frame — always above */}
          <img
            src="/public/Iphone.svg"
            alt="iPhone Frame"
            style={{
              width: "80%",
              height: "auto",
              display: "block",
              shadow: "inset 0 0 100px rgba(0,0,0,0.2)",
              filter:
                "drop-shadow(0 25px 50px rgba(0,0,0,0.35)) drop-shadow(0 25px 30px rgba(0,0,0,0.2))",
              zIndex: 2, // above game
              position: "relative",
              pointerEvents: "none", // allows game interactions through
            }}
          />
        </div>
      </FeatureSection>

      {/* Second Feature Section - Survey Cards */}
      <FeatureSection
        background="linear-gradient(135deg, #ff6bf3ff 0%, #a8b8ffff 50%, #c8a8ff 100%)"
        title="Svara på enkäter och tjäna pengar"
        description=""
        backgroundImage="/assets/gameCards.webp"
      >
        <SurveyCards onEarn={handleEarn} />
      </FeatureSection>

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

export default Landing;
