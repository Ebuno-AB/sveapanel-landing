import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getStoreDetail,
  getTrackingLink,
  getTrackingLinkWithCode,
  formatCashback,
  type CashbackStoreDetails,
  type CashbackCommissionGroup,
} from "../api/cashbackActivationApi";
import "./CashbackActivation.css";
import { useBankIdLogin } from "@/features/auth/hooks/useBankIdLogin";
import BankIdQRModal from "@/features/auth/components/BankIdQRModal";
import { isPhone } from "@/utils/browserDetection";
import { safeRedirect } from "@/utils/safeRedirect";
import { useAuthStore } from "@/core/auth/authStore";
import { tokenStorage } from "@/core/auth/tokenStorage";
import { queryClient } from "@/core/query/queryClient";
import { queryKeys } from "@/core/query/queryKeys";

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

  return (
    <div className="logo-fallback">{store.name.charAt(0).toUpperCase()}</div>
  );
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
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="40"
            height="40"
          >
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
  const tokenFromQuery = searchParams.get("token");
  const code = searchParams.get("code");
  const source = searchParams.get("source") || "unknown";
  const isExtensionSource = source.startsWith("extension");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const browserToken = isAuthenticated ? tokenStorage.getToken() : null;
  const authToken = tokenFromQuery ?? browserToken;
  const isPhoneDevice = isPhone();

  const [store, setStore] = useState<CashbackStoreDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activating, setActivating] = useState(false);
  const [showBankIdModal, setShowBankIdModal] = useState(false);
  const [pendingActivation, setPendingActivation] = useState(false);

  const {
    qrDataUrl,
    isLoading: isBankIdLoading,
    status: bankIdStatus,
    error: bankIdError,
    isSuccess: bankIdSuccess,
    start: startBankIdLogin,
    cancel: cancelBankIdLogin,
  } = useBankIdLogin();

  const needsBrowserLogin = isExtensionSource && !code && !authToken;

  const activateStore = useCallback(
    async (currentAuthToken?: string | null) => {
      if (!store) return;

      setActivating(true);
      let url: string;
      try {
        if (code) {
          url = await getTrackingLinkWithCode(store.id, code, source);
        } else if (currentAuthToken) {
          url = await getTrackingLink(store.id, currentAuthToken, source);
        } else {
          url = store.trackingUrl ?? store.websiteUrl;
        }
      } catch {
        url = store.trackingUrl ?? store.websiteUrl;
      }

      if (!url) {
        setActivating(false);
        return;
      }

      window.postMessage(
        { type: "SVEA_CASHBACK_ACTIVATE", storeId: store.id },
        "*",
      );
      setTimeout(() => {
        window.location.href = url;
      }, 50);
    },
    [code, source, store],
  );

  useEffect(() => {
    if (!bankIdSuccess) return;

    queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    setShowBankIdModal(false);

    if (pendingActivation) {
      setPendingActivation(false);
      void activateStore(tokenStorage.getToken());
    }
  }, [activateStore, bankIdSuccess, pendingActivation]);

  useEffect(() => {
    if (!storeId || isNaN(Number(storeId))) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    getStoreDetail(Number(storeId), authToken)
      .then((data) => {
        setStore(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [storeId, authToken]);

  if (loading) return <LoadingSkeleton />;
  if (notFound || !store) return <NotFound />;

  const startLoginFlow = async () => {
    setPendingActivation(true);
    const universalLink = await startBankIdLogin();

    if (isPhoneDevice && universalLink) {
      safeRedirect(universalLink);
      return;
    }

    setShowBankIdModal(true);
  };

  const handleActivate = async () => {
    if (!code && !authToken) {
      await startLoginFlow();
      return;
    }

    await activateStore(authToken);
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

        {needsBrowserLogin && (
          <div className="section">
            <div className="section-title">Logga in f&ouml;r cashback</div>
            <div className="description-card">
              <p className="description-text">
                Logga in med BankID i din webbl&auml;sare f&ouml;r att aktivera
                cashback hos {store.name}. N&auml;r du har verifierat dig
                skickas du vidare till butiken automatiskt.
              </p>
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
          disabled={activating || isBankIdLoading}
        >
          {activating || isBankIdLoading ? (
            <span className="btn-spinner" />
          ) : (
            <>
              <ShoppingIcon />
              {needsBrowserLogin
                ? "Logga in med BankID"
                : `Handla hos ${store.name}`}
            </>
          )}
        </button>
      </div>

      <BankIdQRModal
        open={showBankIdModal}
        qrDataUrl={qrDataUrl}
        isLoading={isBankIdLoading}
        status={bankIdStatus}
        error={bankIdError}
        onClose={() => {
          setPendingActivation(false);
          setShowBankIdModal(false);
          cancelBankIdLogin();
        }}
        onRetry={() => {
          void startLoginFlow();
        }}
      />
    </div>
  );
}
