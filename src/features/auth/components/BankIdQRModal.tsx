import { useEffect, useRef } from "react";
import type { BankIdStatus } from "../types/auth.types";

type Props = {
  open: boolean;
  qrDataUrl: string;
  isLoading: boolean;
  status: BankIdStatus;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
};

const BankIdQRModal = ({
  open,
  qrDataUrl,
  isLoading,
  status,
  error,
  onClose,
  onRetry,
}: Props) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const isFailed = status === "failed" || status === "timeout" || !!error;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 32,
          maxWidth: 380,
          width: "90%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#999",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
          Logga in med BankID
        </h2>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
          Öppna BankID-appen och skanna QR-koden
        </p>

        {/* QR area */}
        <div
          style={{
            minHeight: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading && !qrDataUrl ? (
            <div style={{ color: "#999" }}>
              <Spinner />
              <p style={{ fontSize: 13, marginTop: 12 }}>Startar BankID...</p>
            </div>
          ) : isFailed ? (
            <div>
              <p style={{ fontSize: 14, color: "#e53935", marginBottom: 16 }}>
                {error ?? "Något gick fel. Försök igen."}
              </p>
              <button
                onClick={onRetry}
                style={{
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#00CCA3",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Försök igen
              </button>
            </div>
          ) : qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="BankID QR-kod"
              style={{ width: 250, height: 250, borderRadius: 12 }}
            />
          ) : null}
        </div>

        {status === "pending" && qrDataUrl && (
          <p style={{ fontSize: 12, color: "#999", marginTop: 12 }}>
            Väntar på att du öppnar BankID...
          </p>
        )}
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    style={{ animation: "spin 1s linear infinite" }}
  >
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#ddd"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="#00CCA3"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default BankIdQRModal;
