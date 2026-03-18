import { useFeedSections } from "@/features/cashback/api/cashback.queries";
import SmallStoreCard from "@/features/cashback/components/SmallStoreCard";
import "@/features/cashback/styles/CashbackPage.css";

const ShopIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

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
            <ShopIcon />
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
