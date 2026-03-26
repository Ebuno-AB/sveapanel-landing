import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getStoreDetail,
  getTrackingLink,
  getTrackingLinkWithCode,
  formatCashback,
  type CashbackStoreDetails,
} from "../api/cashbackActivationApi";
import "./CashbackActivation.css";

const DEFAULT_GRADIENT = "linear-gradient(135deg, #e60077, #ff49a7)";

function PageHeader() {
  return (
    <header className="activation-header">
      <div className="header-inner">
        <img src="/logo.png" alt="SveaPanelen" className="header-logo" />
        <span className="logo-text">SveaPanelen Cashback</span>
      </div>
    </header>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="activation-page">{children}</div>;
}

function StoreLogo({ store }: { store: CashbackStoreDetails }) {
  const [imgError, setImgError] = useState(false);

  if (store.logoUrl && !imgError) {
    return (
      <img
        src={store.logoUrl}
        alt={store.name}
        className="store-logo-img"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="store-logo-fallback">
      <span>{store.name.charAt(0).toUpperCase()}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <PageShell>
      <div className="store-cover" style={{ background: DEFAULT_GRADIENT }}>
        <PageHeader />
      </div>
      <main className="activation-container">
        <div className="activation-card">
          <div className="skeleton skeleton-logo" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-badge" />
          <div className="skeleton skeleton-button" />
        </div>
      </main>
    </PageShell>
  );
}

function NotFound() {
  return (
    <PageShell>
      <div className="store-cover" style={{ background: DEFAULT_GRADIENT }}>
        <PageHeader />
      </div>
      <main className="activation-container">
        <div className="activation-card not-found">
          <div className="not-found-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
          </div>
          <h1>Butiken hittades inte</h1>
          <p>Kontrollera länken och försök igen.</p>
        </div>
      </main>
    </PageShell>
  );
}

export default function CashbackActivationPage() {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("store");
  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const source = searchParams.get("source") || "unknown";

  const [store, setStore] = useState<CashbackStoreDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    if (!storeId || isNaN(Number(storeId))) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    getStoreDetail(Number(storeId), token)
      .then((data) => {
        setStore(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [storeId]);

  if (loading) return <LoadingSkeleton />;
  if (notFound || !store) return <NotFound />;

  const handleActivate = async () => {
    setActivating(true);
    let url: string;
    try {
      if (code) {
        url = await getTrackingLinkWithCode(store.id, code, source);
      } else if (token) {
        url = await getTrackingLink(store.id, token, source);
      } else {
        url = store.trackingUrl ?? store.websiteUrl;
      }
    } catch {
      url = store.trackingUrl ?? store.websiteUrl;
    }

    if (!url) { setActivating(false); return; }
    window.postMessage({ type: "SVEA_CASHBACK_ACTIVATE", storeId: store.id }, "*");
    setTimeout(() => { window.location.href = url; }, 50);
  };

  const gradient = store.coverGradient
    ? `linear-gradient(135deg, ${store.coverGradient.startColor}, ${store.coverGradient.endColor})`
    : DEFAULT_GRADIENT;

  return (
    <PageShell>
      <div className="store-cover" style={{ background: gradient, height: 150 }}>
        <PageHeader />
      </div>

      <main className="activation-container">
        <div className="activation-card">
          <div className="store-logo-wrapper">
            <StoreLogo store={store} />
          </div>
          <h1 className="activation-title">{store.name}</h1>

          {store.cashback && (
            <div className="cashback-badge">
              <span>{formatCashback(store.cashback)}</span>
            </div>
          )}

          {store.description && (
            <p className="store-description">{store.description}</p>
          )}

          <button
            className="activate-button"
            onClick={handleActivate}
            disabled={activating}
          >
            {activating ? <span className="btn-spinner" /> : "Aktivera cashback"}
          </button>

          {store.commissionGroups.length > 1 && (
            <div className="info-section">
              <h3>Cashback per kategori</h3>
              <div className="commission-list">
                {store.commissionGroups.map((group, i) => (
                  <div key={i} className="commission-row">
                    <span className="commission-name">{group.name}</span>
                    <span className="commission-amount">
                      {group.type === "percentage"
                        ? `${formatCashback(group)}%`
                        : `${group.amount} ${group.currency ?? "SEK"}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="info-section tips-section">
            <h3>Bra att veta</h3>
            <ul>
              <li>Cashback registreras vanligtvis inom 48 timmar.</li>
              <li>Godkännande kan ta upp till 90 dagar beroende på butikens returpolicy.</li>
              <li>Se till att du har cookies aktiverade i din webbläsare.</li>
            </ul>
          </div>

          {store.storeTerms.length > 0 && (
            <div className="info-section">
              <h3>Villkor</h3>
              {store.storeTerms.map((term) => (
                <div key={term.id} className="term-block">
                  {!term.isGeneral && <p className="term-name">{term.name}</p>}
                  <p className="term-content">{term.content}</p>
                </div>
              ))}
            </div>
          )}

          {!store.storeTerms.length && store.terms && (
            <div className="info-section">
              <h3>Villkor</h3>
              <p className="term-content">{store.terms}</p>
            </div>
          )}
        </div>
      </main>
    </PageShell>
  );
}
