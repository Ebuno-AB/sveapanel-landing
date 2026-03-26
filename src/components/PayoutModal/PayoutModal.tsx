import { useEffect } from "react";
import { CircleX } from "lucide-react";
import swishLogo from "@/assets/icons/swishLogo.png";
import "./PayoutModal.css";

interface PayoutModalProps {
  balance: number;
  phone: string | null;
  onClose: () => void;
}

const FEE_THRESHOLD = 30;
const FEE_AMOUNT = 2;
const MIN_WITHDRAWAL = 3;

const PayoutModal = ({ balance, phone, onClose }: PayoutModalProps) => {
  const displayBalance = balance / 10;
  const fee = displayBalance <= FEE_THRESHOLD ? FEE_AMOUNT : 0;
  const netAmount = displayBalance - fee;
  const belowMinimum = displayBalance < MIN_WITHDRAWAL;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="balance-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="balance-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="balance-modal-close"
          onClick={onClose}
          aria-label="Stäng"
        >
          <CircleX size={24} color="#ffffff" />
        </button>
        <div className="balance-modal-ring">
          <span className="balance-modal-amount">
            {displayBalance.toFixed(1)}kr
          </span>
        </div>
        <div className="balance-modal-details">
          <h3 className="balance-modal-details-title">Utbetalningdetaljer</h3>
          <div className="balance-modal-details-row">
            <span>Swishnummer</span>
            <span>{phone ?? "—"}</span>
          </div>
          <div className="balance-modal-details-row">
            <span>Belopp</span>
            <span>{displayBalance.toFixed(1)}kr</span>
          </div>
          <div className="balance-modal-details-row">
            <span>Avgift</span>
            {fee > 0 ? (
              <span className="balance-modal-details-fee">-{fee}kr</span>
            ) : (
              <span className="balance-modal-details-free">Gratis</span>
            )}
          </div>
          <div className="balance-modal-details-row balance-modal-details-total">
            <span>Totalt</span>
            <span>{netAmount.toFixed(1)}kr</span>
          </div>
          {belowMinimum && (
            <p className="balance-modal-details-error">
              Minsta uttagsbelopp är {MIN_WITHDRAWAL}kr
            </p>
          )}
          {!belowMinimum && (
            <p className="balance-modal-details-note">
              Utbetalningen skickas direkt
            </p>
          )}
        </div>
        <button className="balance-modal-payout-btn" disabled={belowMinimum}>
          <img
            src={swishLogo}
            alt="Swish"
            className="balance-modal-swish-logo"
          />
          Ta ut pengar
        </button>
      </div>
    </div>
  );
};

export default PayoutModal;
