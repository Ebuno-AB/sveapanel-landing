import "../App.css";
import "../components/bankModal/BankModal.css";
import "../styles/BlobStyles.css";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRModal from "../components/QRModal";

import RatingsSection from "../components/ratingsCompnent/RatingsSection";
import CookiesConsent from "../components/cookies/CookiesConsent";
import { useGA } from "../hooks/gtag";
import { useBankID } from "../hooks/useBankID";
import useReferral from "../hooks/useReferral";
import { isPhone, isSocialBrowser } from "../utils/browserDetection";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";
import Hero from "../components/heroSection/HeroSection";
import Footer from "../components/footer/Footer";
import TopNav from "../components/topNav/TopNav";
import FAQ from "../components/faq/FAQ";

import SurveyCards from "../components/surveyCards/SurveyCards";
import InfoSection from "../components/infoSection/InfoSection";
import FeatureSection from "../components/featureSection/FeatureSection";
import FlappyGame from "../components/flappyBird/flappyGame";
import branch from "branch-sdk";
import Carousel from "../components/Carousel";
import iphone from "@/src/public/Iphone.svg";

function Landing() {
  const { trackEvent } = useGA();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);
  const referralHook = useReferral();

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
    // Check for /r/{code} and validate code length
    const match = location.pathname.match(/\/r\/(\w{1,})/); // only take the part after /r/
    if (match) {
      const code = match[1];
      if (code.length !== 5) {
        navigate("/", { replace: true });
      }

      referralHook.checkReferralCodeExists(code).then((exists) => {
        if (!exists) {
          navigate("/", { replace: true });
        }
      });
    }
  }, [location.pathname, navigate]);

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
      />
      {/* Unified Background for InfoSection and RatingsSection */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #6a5ae0 0%, #7e7eff 50%, #49c6f3 100%)",
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
        background="linear-gradient(135deg, #ff7ac7 0%, #b56cff 50%, #4baaff 100%)"
        title="100+ mobilspel att ladda ner!"
        description="Bli belönad för varje nivå!"
        imageAlt="Spel och belöningar"
        interactive={true}
        carousel={<Carousel />}
      >
        {/* Phone showcase */}
        <div className="feature-phone-showcase">
          {/* Game inside phone (scales with frame) */}
          <div
            style={{
              position: "absolute",
              top: isPhoneDevice ? "2.5%" : "2.5%",
              left: isPhoneDevice ? "50%" : "14%",
              transform: isPhoneDevice ? "translateX(-50%)" : "none",
              width: "72%",
              height: isPhoneDevice ? "79%" : "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "clamp(25px, 3vw, 25px)",
              boxShadow: "inset 0 0 18px rgba(0,0,0,0.2)",
              background: "#000",
              zIndex: 1,
              overflow: "hidden",
              userSelect: "none",
              msUserSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <FlappyGame />
            
          </div>

          {/* iPhone frame — always above */}
          <img
            src={iphone}
            alt="iPhone Frame"
            style={{
              width: "80%",
              height: "auto",
              display: "block",
              filter:
                "drop-shadow(0 25px 50px rgba(0,0,0,0.35)) drop-shadow(0 25px 30px rgba(0,0,0,0.2))",
              zIndex: 2,
              position: "relative",
              pointerEvents: "none", // allows game interactions through
            }}
          />
        </div>
      </FeatureSection>

      {/* Second Feature Section - Survey Cards */}
      <FeatureSection
        background="linear-gradient(135deg, #6a5ae0 0%, #7e7eff 50%, #49c6f3 100%)
"
        title="Tjäna pengar på enkäter online"
        description="Få betalt för din åsikt – enkelt hemifrån."
      >
        <SurveyCards />
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
