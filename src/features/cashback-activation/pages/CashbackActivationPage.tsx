import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import branch from "branch-sdk";
import {
  getStoreDetail,
  getTrackingLink,
  getTrackingLinkWithCode,
  formatCashback,
  type CashbackStoreDetails,
  type CashbackCommissionGroup,
} from "../api/cashbackActivationApi";
import "./CashbackActivation.css";
import logoImg from "@/assets/icons/logo.png";

function StoreLogo({ store }: { store: CashbackStoreDetails }) {
  const [imgError, setImgError] = useState(false);

  if (store.logoUrl && !imgError) {
    return (
      <img
        src={store.logoUrl}
        alt={store.name}
        onError={() => setImgError(true)}
      />
    );
  }

  return <div className="logo-fallback">{store.name.charAt(0).toUpperCase()}</div>;
}

function CheckIcon() {
  return (
    <svg className="term-check" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function ShoppingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="info-box-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function CookieIcon() {
  return (
    <svg className="info-box-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.95 10.99c-1.79-.03-3.7-1.95-2.68-4.22-2.97 1-5.78-1.59-5.19-4.56C7.11.74 2 6.41 2 12c0 5.52 4.48 10 10 10 5.89 0 10.54-5.08 9.95-11.01zM8.5 15c-.83 0-1.5-.67-1.5-1.5S7.67 12 8.5 12s1.5.67 1.5 1.5S9.33 15 8.5 15zm2-5C9.67 10 9 9.33 9 8.5S9.67 7 10.5 7s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
}

function CommissionRow({ group }: { group: CashbackCommissionGroup }) {
  const rate = formatCashback({
    type: group.type,
    amount: group.amount,
    currency: group.currency,
  });

  return (
    <div className="commission-row">
      <span className="commission-name">{group.name}</span>
      <span className="commission-badge">{rate}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="activation-page">
      <div className="scroll-content">
        <div className="skeleton skeleton-logo" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-cashback-bar" />
        <div className="skeleton skeleton-description" />
        <div className="skeleton skeleton-button" />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="activation-page">
      <div className="scroll-content not-found">
        <div className="not-found-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        <h1>Butiken hittades inte</h1>
        <p>Kontrollera l&auml;nken och f&ouml;rs&ouml;k igen.</p>
      </div>
    </div>
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
  const [branchLink, setBranchLink] = useState<string | null>(null);

  const needsLogin = source === "extension" && !code;

  // Generate Branch deep link when user needs to log in
  useEffect(() => {
    if (!needsLogin || !store) return;
    branch.init(import.meta.env.VITE_BRANCH_SDK_KEY, {}, () => {
      branch.link(
        {
          channel: "cashback-extension",
          feature: "cashback-activation",
          data: {
            cashback_store_id: String(store.id),
            cashback_store_name: store.name,
            cashback_source: "extension",
            $deeplink_path: `cashback/activate/${store.id}`,
          },
        },
        (err, link) => {
          if (!err && link) setBranchLink(link);
        },
      );
    });
  }, [needsLogin, store]);

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

  const cashbackLabel = store.cashback ? formatCashback(store.cashback) : null;
  const hasMultipleGroups = store.commissionGroups.length > 1;
  const domain = store.websiteUrl
    ? store.websiteUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    : null;

  return (
    <div className="activation-page">
      <div className="scroll-content">
        {/* Logo */}
        <div className="logo-anchor">
          <div className="glow-ring" />
          <div className="logo-container">
            <StoreLogo store={store} />
          </div>
        </div>

        {/* Store name + domain + categories */}
        <div className="store-identity">
          <h1 className="store-name">{store.name}</h1>
          {domain && <span className="store-domain">{domain}</span>}
          {store.storeTerms.length > 0 && (
            <div className="category-row">
              {/* categories would go here if available */}
            </div>
          )}
        </div>

        {/* Cashback gradient bar */}
        {cashbackLabel && (
          <div className="cashback-bar">
            <span className="cashback-bar-label">CASHBACK</span>
            <span className="cashback-bar-value">{cashbackLabel}</span>
          </div>
        )}

        {/* Commission groups */}
        {hasMultipleGroups && (
          <div className="section">
            <div className="section-title">Cashback per kategori</div>
            <div className="card">
              {store.commissionGroups.map((group, i) => (
                <CommissionRow key={i} group={group} />
              ))}
            </div>
          </div>
        )}

        {/* Om butiken */}
        {store.description && (
          <div className="section">
            <div className="section-title">Om butiken</div>
            <div className="description-card">
              <p className="description-text">{store.description}</p>
            </div>
          </div>
        )}

        {/* Two info boxes side by side */}
        <div className="info-boxes">
          <div className="info-box">
            <ClockIcon />
            <span className="info-box-label">UTBETALNINGSTID</span>
            <span className="info-box-value">30-60 dagar</span>
          </div>
          <div className="info-box">
            <CookieIcon />
            <span className="info-box-label">KOM IH&Aring;G</span>
            <span className="info-box-value">Acceptera cookies</span>
          </div>
        </div>

        {/* Villkor */}
        {store.storeTerms.length > 0 && (
          <div className="section">
            <div className="section-title">Villkor</div>
            <div className="terms-card">
              {store.storeTerms.map((term) => (
                <div key={term.id} className="term-item">
                  <CheckIcon />
                  <span className="term-text">{term.content}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed CTA at bottom */}
      <div className="cta-gradient">
        <button
          className="cta-button"
          onClick={handleActivate}
          disabled={activating}
        >
          {activating ? (
            <span className="btn-spinner" />
          ) : (
            <>
              <ShoppingIcon />
              Handla hos {store.name}
            </>
          )}
        </button>
      </div>

      {/* Login required modal */}
      {needsLogin && (
        <div className="login-overlay">
          <div className="login-modal">
            <div className="login-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="login-text">
              Du m&aring;ste vara inloggad i appen f&ouml;r att du ska kunna f&aring; cashback p&aring; dina k&ouml;p
            </p>
            <a href={branchLink ?? "sveapanelen://"} className="login-button">
              <img src={logoImg} alt="SveaPanelen" className="login-button-logo" />
              &Ouml;ppna SveaPanelen
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
