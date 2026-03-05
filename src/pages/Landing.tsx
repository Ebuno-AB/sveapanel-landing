import "../App.css";
import "../components/bankModal/BankModal.css";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRModal from "../components/ui/QRModal";

import CookiesConsent from "../components/cookies/CookiesConsent";
import { useGA } from "../hooks/gtag";
import { useBankID } from "../hooks/useBankID";
import useReferral from "../hooks/useReferral";
import { isPhone, isSocialBrowser } from "../utils/browserDetection";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";
import Hero from "../components/heroSection/HeroSection";
import Footer from "../components/footer/Footer";
import TopNav from "../components/topNav/TopNav";
import { AppInfo } from "../components/AppInfo/AppInfo";
import branch from "branch-sdk";
import { DownloadToday } from "@/components/downloadToday/DownloadToday";

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
      },
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
        returnedBrowserLink,
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
  }, [cookiesAccepted, trackEvent, window.gtag]);

  // Track page view when cookies are accepted
  useEffect(() => {
    if (cookiesAccepted) {
      trackEvent("page_view", {
        page: "landing",
        user_type: isRegistered ? "registered" : "unregistered",
        device_type: isPhoneDevice ? "mobile" : "desktop",
      });
    }
  }, [cookiesAccepted, trackEvent, isRegistered, isPhoneDevice, window.gtag]);

  return (
    <>
      <TopNav handleAppDownload={handleAppDownload} />

      <Hero
        isRegistered={isRegistered}
        handleBankIDRegistration={handleBankIDRegistration}
        handleAppDownload={handleAppDownload}
      />

      <AppInfo />

      {/* <div style={{ padding: "25px 15px" }}>
        <RatingsSection />
      </div> */}

      <DownloadToday />
      <Footer />

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
            "Grattis! Din registrering med BankID är klar. Ladda ner appen och kom igång med att tjäna pengar direkt.",
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
