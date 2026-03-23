import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleX, ArrowRight, ShoppingBag } from "lucide-react";
import type { CashbackStore } from "@/features/cashback/types/cashback.types";
import { formatCashback } from "@/features/cashback/utils/formatCashback";
import "@/features/cashback/styles/CashbackStoreModal.css";

interface CashbackStoreModalProps {
  store: CashbackStore | null;
  onClose: () => void;
}

function CashbackStoreModal({ store, onClose }: CashbackStoreModalProps) {
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (!store) return;
    setLogoError(false);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [store, onClose]);

  if (!store) return null;

  const cashbackText = formatCashback(store.cashback);

  const handleShop = () => {
    onClose();
    navigate("/dashboard/cashback/handla", { state: { store } });
  };

  return (
    <div className="cb-modal-overlay" onClick={onClose}>
      <div className="cb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cb-modal-topbar">
          <div className="cb-modal-logo-wrap">
            {logoError || !store.logoUrl ? (
              <div className="cb-modal-logo-fallback">
                {store.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <img
                src={store.logoUrl}
                alt={store.name}
                className="cb-modal-logo"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <button
            className="cb-modal-close"
            onClick={onClose}
            aria-label="Stäng"
          >
            <CircleX size={24} strokeWidth={1.75} />
          </button>
        </div>

        <div className="cb-modal-name">{store.name}</div>

        {cashbackText && (
          <div className="cb-modal-cashback">
            {store.hasMultipleCommissionGroups && (
              <span className="cb-modal-cashback-prefix">Upp till</span>
            )}
            <span className="cb-modal-cashback-amount">{cashbackText}</span>
            <span className="cb-modal-cashback-label">cashback</span>
          </div>
        )}

        <button className="cb-modal-cta" onClick={handleShop}>
          <ShoppingBag size={16} strokeWidth={2.5} />
          Handla nu <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default CashbackStoreModal;
