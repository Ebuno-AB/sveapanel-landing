import type { CashbackStore } from "@/features/cashback/types/cashback.types";
import CashbackBadge from "./CashbackBadge";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function FeaturedCard({ store }: { store: CashbackStore }) {
  const handleClick = () => {
    if (store.websiteUrl) {
      window.open(store.websiteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="cb-featured-card" onClick={handleClick}>
      <div className="cb-featured-top">
        <img
          src={store.logoUrl}
          alt={store.name}
          className="cb-featured-logo"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
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
          Handla nu <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

export default FeaturedCard;
