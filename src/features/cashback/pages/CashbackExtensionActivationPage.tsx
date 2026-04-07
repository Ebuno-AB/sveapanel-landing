import { useEffect, useMemo } from "react";
import safariLogo from "@/assets/icons/safarilogo.png";

const isSafariBrowser = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // Exclude all known non-Safari browsers (including iOS variants which all
  // include "Safari" in their UA but also include their own marker).
  return (
    /Safari/.test(ua) &&
    !/Chrome|CriOS|FxiOS|EdgiOS|OPiOS|Edg|OPR|Chromium|Android/.test(ua)
  );
};

const CashbackExtensionActivationPage = () => {
  const isSafari = useMemo(() => isSafariBrowser(), []);

  useEffect(() => {
    const prevPadding = document.body.style.paddingTop;
    const prevBodyBg = document.body.style.cssText;
    const prevHtmlBg = document.documentElement.style.cssText;
    document.body.style.paddingTop = "0";
    document.body.style.backgroundColor = "#e60077";
    document.body.style.backgroundImage =
      "linear-gradient(135deg, #e60077 0%, #ff4ba8 50%, #ff80c0 100%)";
    document.body.style.backgroundAttachment = "fixed";
    document.documentElement.style.backgroundColor = "#e60077";
    return () => {
      document.body.style.paddingTop = prevPadding;
      document.body.style.cssText = prevBodyBg;
      document.documentElement.style.cssText = prevHtmlBg;
    };
  }, []);

  const openInSafari = () => {
    const { href } = window.location;
    // iOS Safari deeplink scheme — opens any URL in Safari from
    // in-app browsers (Instagram, Facebook, etc.) and other iOS browsers.
    const safariUrl = href.replace(/^https?:\/\//, "x-safari-https://");
    window.location.href = safariUrl;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 32,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        }}
      >
        {isSafari ? (
          // Safari extensions puzzle piece
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M14.25 3.5c0-.966.784-1.75 1.75-1.75s1.75.784 1.75 1.75v1.75h2.5c.69 0 1.25.56 1.25 1.25v3.25h-1.75c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75h1.75v3.25c0 .69-.56 1.25-1.25 1.25h-3.25v-1.75c0-.966-.784-1.75-1.75-1.75s-1.75.784-1.75 1.75v1.75H10c-.69 0-1.25-.56-1.25-1.25v-2.5H7c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75h1.75V8c0-.69.56-1.25 1.25-1.25h4.25V3.5z"
              fill="#fff"
            />
          </svg>
        ) : (
          // Safari compass logo
          <img
            src={safariLogo}
            alt="Safari"
            width={72}
            height={72}
            style={{ display: "block" }}
          />
        )}
      </div>

      {isSafari ? (
        <>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              margin: "0 0 12px",
              letterSpacing: -0.5,
            }}
          >
            Aktivera tillägget
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 420,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            För att börja tjäna cashback automatiskt på dina köp behöver du
            aktivera SveaPanelens tillägg i Safari.
          </p>

          {/* Steps */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
              maxWidth: 420,
            }}
          >
            {[
              { n: 1, text: "Tryck på «aA» i adressfältet" },
              { n: 2, text: "Välj «Hantera tillägg»" },
              { n: 3, text: "Slå på SveaPanelen" },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    background: "#fff",
                    color: "#e60077",
                    fontWeight: 800,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {step.n}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              margin: "0 0 12px",
              letterSpacing: -0.5,
            }}
          >
            Endast i Safari
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 420,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            SveaPanelens cashback-tillägg fungerar bara i Safari. Öppna den här
            sidan i Safari för att fortsätta.
          </p>

          <button
            onClick={openInSafari}
            style={{
              marginTop: 32,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "16px 28px",
              borderRadius: 18,
              background: "#fff",
              color: "#e60077",
              fontSize: 16,
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              fontFamily: "inherit",
            }}
          >
            <img
              src={safariLogo}
              alt=""
              width={26}
              height={26}
              style={{ display: "block" }}
            />
            Öppna i Safari
          </button>
        </>
      )}
    </div>
  );
};

export default CashbackExtensionActivationPage;
