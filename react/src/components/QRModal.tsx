import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../App.css";
import AppDownloadQRCode, {
  getDefaultQRCodeUrl,
} from "../components/appDownloadModal/AppDownloadQRCode";
import { isPhone } from "../utils/browserDetection";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl?: string;
  isLoading?: boolean;
  error?: {
    title: string;
    message: string;
    onRetry?: () => void;
  };
  success?: {
    title: string;
    message: string;
    onClose?: () => void;
  };
}

const QRModal: React.FC<QRModalProps> = ({
  isOpen,
  onClose,
  qrCodeUrl,
  isLoading = false,
  error,
  success = null,
}) => {
  const [timeLeft, setTimeLeft] = useState(30);

  const redirectUrl = getDefaultQRCodeUrl();

  const isPhoneDevice = isPhone();
  // Reset timer when modal opens
  useEffect(() => {
    if (isOpen && !error && !success) {
      setTimeLeft(30);
    }
  }, [isOpen, error, success]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || error || success || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer expired - close modal or show error
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, error, success, timeLeft, onClose]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">
            {error
              ? error.title
              : success
              ? success.title
              : "Registrera dig med BankID"}
          </h2>
          <p className="modal-subtitle">
            {error
              ? error.message
              : success
              ? success.message
              : "Skanna QR-koden med BankID för att registrera dig"}
          </p>
        </div>

        {success != null &&
          (isPhoneDevice ? (
            <div className="qr-code-modal-container">
              <p className="qr-code-modal-text mt-4" style={{ fontSize: 15 }}>
                Skanna QR-koden eller klicka på länken för att ladda ner appen!
              </p>
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn"
                style={{ marginTop: 1 }}
              >
                Ladda ner appen
              </a>
            </div>
          ) : (
            <div>
              <p
                className="qr-code-modal-text"
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                Skanna QR-koden för att ladda ner appen!
              </p>
              <AppDownloadQRCode size={200} showInstructions={false} />
            </div>
          ))}

        <div className="modal-body">
          {error ? (
            // Error State
            <div className="text-center p-8">
              <div className="mb-6"></div>
              <div className="modal-button-container">
                {error.onRetry && (
                  <button onClick={error.onRetry} className="modal-btn">
                    Försök igen
                  </button>
                )}

                <button onClick={onClose} className="modal-btn">
                  Stäng
                </button>
              </div>
            </div>
          ) : success ? (
            // Success State
            <div className="text-center p-8">
              <div className="modal-button-container">
                <button
                  onClick={success.onClose || onClose}
                  className="modal-btn bg-green-600 hover:bg-green-700"
                >
                  Stäng
                </button>
              </div>
            </div>
          ) : (
            // Normal QR Code State
            <div className="qr-code-modal-container">
              <div className="qr-code-placeholder-modal">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8"></div>
                ) : qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="BankID QR Code"
                    className="qr-code-img max-w-48 max-h-48"
                    onError={(e) => {
                      console.error("QR code image failed to load");
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center p-8 text-gray-500">
                    <p>QR-kod kunde inte laddas</p>
                  </div>
                )}
              </div>
              <p className="qr-code-modal-text mt-4">
                {isLoading
                  ? "Laddar QR-kod..."
                  : `Denna QR-kod är giltig i ${timeLeft} sekunder.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRModal;
