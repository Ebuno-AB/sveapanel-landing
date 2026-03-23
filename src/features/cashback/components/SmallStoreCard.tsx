import { useState } from "react";
import type { CashbackStore } from "@/features/cashback/types/cashback.types";
import CashbackBadge from "./CashbackBadge";

function SmallStoreCard({
  store,
  onCardClick,
}: {
  store: CashbackStore;
  onCardClick?: () => void;
}) {
  const [logoError, setLogoError] = useState(false);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick();
      return;
    }
    if (store.websiteUrl) {
      window.open(store.websiteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="cb-small-card" onClick={handleClick}>
      {logoError || !store.logoUrl ? (
        <div className="cb-small-logo cb-small-logo-fallback">
          {store.name.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={store.logoUrl}
          alt={store.name}
          className="cb-small-logo"
          onError={() => setLogoError(true)}
        />
      )}
      <span className="cb-small-name">{store.name}</span>
      <CashbackBadge store={store} />
    </div>
  );
}

export default SmallStoreCard;
