import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBankIdLogin } from "../hooks/useBankIdLogin";
import { isPhone } from "@/utils/browserDetection";
import { safeRedirect } from "@/utils/safeRedirect";
import BankIdQRModal from "../components/BankIdQRModal";
import TopNav from "@/components/topNav/TopNav";
import Footer from "@/components/footer/Footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const { qrDataUrl, isLoading, status, error, isSuccess, start, cancel } =
    useBankIdLogin();
  const [showModal, setShowModal] = useState(false);
  const isPhoneDevice = isPhone();

  const handleLogin = async () => {
    const universalLink = await start();

    if (isPhoneDevice && universalLink) {
      safeRedirect(universalLink);
    } else {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    cancel();
    setShowModal(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <TopNav />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1a1a1a",
              marginBottom: 8,
            }}
          >
            Logga in
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#666",
              marginBottom: 32,
            }}
          >
            {isPhoneDevice
              ? "Tryck på knappen för att öppna BankID"
              : "Logga in med BankID för att komma åt ditt konto"}
          </p>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px 24px",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              backgroundColor: "#00CCA3",
              border: "none",
              borderRadius: 12,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {isLoading ? "Startar BankID..." : "Logga in med BankID"}
          </button>

          {error && (
            <p style={{ color: "#e53935", marginTop: 16, fontSize: 14 }}>
              {error}
            </p>
          )}
        </div>
      </div>

      <BankIdQRModal
        open={showModal && !isPhoneDevice}
        qrDataUrl={qrDataUrl}
        isLoading={isLoading}
        status={status}
        error={error}
        onClose={handleClose}
        onRetry={handleLogin}
      />

      <Footer />
    </>
  );
};

export default LoginPage;
