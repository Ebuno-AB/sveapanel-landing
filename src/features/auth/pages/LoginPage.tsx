import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBankIdLogin } from "../hooks/useBankIdLogin";
import { isPhone } from "@/utils/browserDetection";
import { safeRedirect } from "@/utils/safeRedirect";
import BankIdQRModal from "../components/BankIdQRModal";
import bankIdLogo from "@/assets/icons/BankID_logo.svg";
import { queryClient } from "@/core/query/queryClient";
import { queryKeys } from "@/core/query/queryKeys";
import "../styles/LoginPage.css";

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
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <button
            className="login-card__close"
            onClick={() => navigate("/")}
            aria-label="Stäng"
          >
            ✕
          </button>
          <h1>Registrera/ Logga in</h1>
          <p>
            {isPhoneDevice
              ? "Tryck på knappen för att öppna BankID"
              : "Verifiera dig med BankID för att svara på enkäter och handla med cashback."}
          </p>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="login-btn"
          >
            {isLoading ? (
              "Startar BankID..."
            ) : (
              <span className="login-btn__inner">
                <img
                  src={bankIdLogo}
                  alt="BankID"
                  className="login-btn__logo"
                />
                Kom igång med BankID
              </span>
            )}
          </button>

          {error && <p className="login-error">{error}</p>}
          <span className="login-disclaimer">
            Genom att registrera dig accepterar du våra regler och villkor.
            *OBS! 13 års gräns.
          </span>
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
    </>
  );
};

export default LoginPage;
