import type { CashbackStore } from "@/features/cashback/types/cashback.types";
import CashbackBadge from "./CashbackBadge";

function SmallStoreCard({ store }: { store: CashbackStore }) {
  const handleClick = () => {
    if (store.websiteUrl) {
      window.open(store.websiteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="cb-small-card" onClick={handleClick}>
      <img
        src={store.logoUrl}
        alt={store.name}
        className="cb-small-logo"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="cb-small-name">{store.name}</span>
      <CashbackBadge store={store} />
    </div>
  );
}

export default SmallStoreCard;
