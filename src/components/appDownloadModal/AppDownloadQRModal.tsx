import React, { useEffect } from "react";
import { X } from "lucide-react";
import AppDownloadQRCode from "./AppDownloadQRCode";
import "./AppDownloadQRModal.css";

interface AppDownloadQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Optional: override the QR URL (otherwise it’s computed automatically) */
  qrUrl?: string;
}

const AppDownloadQRModal: React.FC<AppDownloadQRModalProps> = ({
  isOpen,
  onClose,
  qrUrl,
}) => {
  // Close modal on escape key + lock background scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
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
        <button
          className="app-download-modal-close-btn"
          onClick={onClose}
          aria-label="Stäng"
        >
          <X size={24} />
        </button>

        <div className="app-download-modal-header">
          <h2 className="app-download-modal-title">Ladda ner SveaPanelen</h2>
          <p className="app-download-modal-subtitle">
            Skanna QR-koden med din telefon för att ladda ner appen
          </p>
        </div>

        <div className="app-download-modal-body">
          {/* Re-usable QR component */}
          <AppDownloadQRCode url={qrUrl} size={250} showInstructions />

          <div className="app-download-modal-footer">
            <div className="store-buttons">
              {/* (optional) store badges here */}
            </div>
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
