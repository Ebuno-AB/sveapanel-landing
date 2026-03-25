import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import "./ExtensionBanner.css";

export const ExtensionBanner = () => {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
  };

  return (
    <div className="extension-banner">
      <button
        className="extension-banner__close"
        onClick={handleDismiss}
        aria-label="Stäng"
      >
        <X size={16} />
      </button>
      <h3 className="extension-banner__title">Missa aldrig din cashback</h3>
      <p className="extension-banner__desc">
        Installera Svea-extension till din webbläsare så blir du automatiskt
        påmind om att använda Svea cashback
      </p>
      <button
        className="extension-banner__cta"
        onClick={() =>
          navigate("/dashboard/konto", { state: { tab: "extension" } })
        }
      >
        Installera nu!
      </button>
    </div>
  );
};
