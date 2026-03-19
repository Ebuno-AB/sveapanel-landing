import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { CashbackStore } from "@/features/cashback/types/cashback.types";
import CashbackBadge from "./CashbackBadge";

function FeaturedCard({ store }: { store: CashbackStore }) {
  const [logoError, setLogoError] = useState(false);

  const handleClick = () => {
    if (store.websiteUrl) {
      window.open(store.websiteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="cb-featured-card" onClick={handleClick}>
      <div className="cb-featured-top">
        {logoError || !store.logoUrl ? (
          <div className="cb-featured-logo cb-featured-logo-fallback">
            {store.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <img
            src={store.logoUrl}
            alt={store.name}
            className="cb-featured-logo"
            onError={() => setLogoError(true)}
          />
        )}
        <div className="cb-featured-info">
          <h4 className="cb-featured-name">{store.name}</h4>
          <p className="cb-featured-desc">{store.description}</p>
        </div>
      </div>
      <div className="cb-featured-bottom">
        <CashbackBadge store={store} />
        <button
          className="cb-featured-cta"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Handla nu <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default FeaturedCard;
