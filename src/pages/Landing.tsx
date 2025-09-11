import "../App.css";
import "../components/bankModal/BankModal.css";
import "../styles/BlobStyles.css";

import { useState, useEffect } from "react";
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

  // Money counter state for survey earnings
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Handle earning money from survey cards
  const handleEarn = (amount: number) => {
    setTotalEarnings((prev) => parseFloat((prev + amount).toFixed(1)));
  };

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
            "linear-gradient(135deg, #6a55cbff 0%, #9683caff 50%, #967dc1ff 100%)",
        }}
      >
        <InfoSection />

        {/* Ratings Section - Customer Reviews and Trust */}
        <div style={{ padding: "50px 30px" }}>
          <RatingsSection />
        </div>
      </div>

      {/* First Feature Section - Games */}
      <FeatureSection
        background="linear-gradient(135deg, #e05d89ff 0%, #ffa8cc 50%, #c8a8ff 100%)"
        title="Ladda ner mobilspel"
        description="Bli belönad för varje nivå"
        imageAlt="Spel och belöningar"
        interactive={true}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "auto", // Slightly smaller for better fit
            margin: "0 auto",
            minHeight: "900px", // Ensure adequate height
          }}
        >
          {/* iPhone frame background */}
          <img
            src="/public/Iphone.svg"
            alt="iPhone Frame"
            style={{
              width: "80%",
              height: "auto",
              maxWidth: "500px", // Match container max width
              display: "block",
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))", // Add realistic shadow
              zIndex: 1000,
            }}
          />

          {/* Game positioned over iPhone screen area */}
          <div
            style={{
              position: "absolute",
              top: "11%", // More precise alignment with iPhone screen
              left: "50%",
              transform: "translateX(-50%)",
              width: "75%", // Almost full width to match phone image width
              height: "78%", // Taller to better match iPhone screen proportions
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              borderRadius: "25px", // Match iPhone screen corner radius
              overflow: "hidden", // Ensure game stays within rounded corners
            }}
          >
            <FlappyGame
              onPointGained={() => {
                handleEarn(10);
              }}
            />
          </div>

          {/* Game icons hovering around the phone */}
          {/* <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 2000, // Ensure icons are in front of the phone image
            }}
          >
            {[
              {
                src: "/assets/games/candyCrush.png",
                top: "20%",
                left: "-4%",
                size: 150,
              },
              {
                src: "/assets/games/monopoly.png",
                top: "10%",
                right: "5%",
                size: 140,
              },
              {
                src: "/assets/games/tontongGame.png",
                bottom: "25%",
                left: "-5%",
                size: 130,
              },
              {
                src: "/assets/games/pigGame.png",
                bottom: "15%",
                right: "0%",
                size: 120,
              },
            ].map((icon, index) => (
              <img
                key={index}
                src={icon.src}
                alt={`Game Icon ${index}`}
                style={{
                  position: "absolute",
                  ...icon,
                  animation: `hover${index} 5s infinite ease-in-out`,
                  width: `${icon.size}px`,
                  height: `${icon.size}px`,
                  filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.3))`",
                  zIndex: 2000, // Ensure each icon is in front of the phone image
                }}
              />
            ))}
          </div> */}

          {/* Add floating animations */}
          <style>
            {`
              @keyframes hover0 {
                0% { transform: translate(0, 0); }
                50% { transform: translate(-10px, 10px); }
                100% { transform: translate(0, 0); }
              }
              @keyframes hover1 {
                0% { transform: translate(0, 0); }
                50% { transform: translate(10px, -10px); }
                100% { transform: translate(0, 0); }
              }
              @keyframes hover2 {
                0% { transform: translate(0, 0); }
                50% { transform: translate(-10px, -10px); }
                100% { transform: translate(0, 0); }
              }
              @keyframes hover3 {
                0% { transform: translate(0, 0); }
                50% { transform: translate(10px, 10px); }
                100% { transform: translate(0, 0); }
              }
            `}
          </style>
        </div>
      </FeatureSection>

      {/* Second Feature Section - Survey Cards */}
      <FeatureSection
        background="linear-gradient(135deg, #ff6bf3ff 0%, #a8b8ffff 50%, #c8a8ff 100%)"
        title="Svara på formulär och tjäna pengar"
        description="För alla stunder i ditt liv"
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
