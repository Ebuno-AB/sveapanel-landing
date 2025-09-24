import React, { useEffect } from "react";
import { X } from "lucide-react";
import QRCode from "react-qr-code";
import "./AppDownloadQRModal.css";

interface AppDownloadQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppDownloadQRModal: React.FC<AppDownloadQRModalProps> = ({
  isOpen,
  onClose,
}) => {
  const getQRCodeUrl = () => {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      return `http://192.168.0.220:5173/redirect/detect`; // Your actual local IP and port
    } else {
      // For production, use the actual domain
      return `${window.location.origin}/redirect/detect`;
    }
  };

  const qrCodeUrl = getQRCodeUrl();

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
    <div className="app-download-modal-overlay" onClick={onClose}>
      <div
        className="app-download-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="app-download-modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="app-download-modal-header">
          <h2 className="app-download-modal-title">Ladda ner SveaPanelen</h2>
          <p className="app-download-modal-subtitle">
            Skanna QR-koden med din telefon för att ladda ner appen
          </p>
        </div>

        <div className="app-download-modal-body">
          <div className="qr-code-container">
            <div className="qr-code-wrapper">
              <QRCode
                value={qrCodeUrl}
                size={250}
                level="H"
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
            <p className="qr-code-instructions">
              Öppna kameran på din telefon och skanna QR-koden
            </p>
          </div>

          <div className="app-download-modal-footer">
            <div className="store-buttons"></div>
            <p className="store-note">
              Appen kommer automatiskt att öppnas i rätt butik baserat på din
              enhet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadQRModal;
