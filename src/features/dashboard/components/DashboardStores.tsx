import { ShoppingBag } from "lucide-react";
import { useFeedSections } from "@/features/cashback/api/cashback.queries";
import SmallStoreCard from "@/features/cashback/components/SmallStoreCard";
import "@/features/cashback/styles/CashbackPage.css";

export const DashboardStores = () => {
  const { data: feedSections, isLoading } = useFeedSections();

  const stores = feedSections
    ? Array.from(
        new Map(
          feedSections
            .flatMap((s) => s.stores)
            .map((store) => [store.id, store]),
        ).values(),
      )
    : [];

  return (
    <section className="dashboard-section">
      <div className="section-header">
        <h3 className="section-title">Cashback-butiker</h3>
        {stores.length > 0 && (
          <span className="survey-count-badge">
            <ShoppingBag size={13} strokeWidth={2.5} />
            {stores.length} butiker
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="cb-skeleton-row">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="cb-skeleton-card" />
          ))}
        </div>
      ) : stores.length > 0 ? (
        <div className="cb-stores-scroll">
          {stores.map((store) => (
            <SmallStoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="cb-empty">
          <div className="cb-empty-icon">🛍️</div>
          <h3>Inga butiker just nu</h3>
          <p>Kom tillbaka senare — fler butiker läggs till regelbundet.</p>
        </div>
      )}
    </section>
  );
};
