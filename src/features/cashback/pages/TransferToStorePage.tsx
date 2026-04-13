import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Tag,
  Clock,
  Cookie,
  FileText,
  ShoppingBag,
} from "lucide-react";
import type { CashbackStore } from "@/features/cashback/types/cashback.types";
import { cashbackApi } from "@/features/cashback/api/cashback.api";
import { formatCashback } from "@/features/cashback/utils/formatCashback";
import { useStoreDetail } from "@/features/cashback/api/cashback.queries";
import "@/features/cashback/styles/TransferToStore.css";

interface TransferToStoreState {
  store?: CashbackStore;
}

function TransferToStorePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = (location.state as TransferToStoreState)?.store;

  const [logoError, setLogoError] = useState(false);
  const [isOpeningStore, setIsOpeningStore] = useState(false);

  const { data: storeDetail } = useStoreDetail(
    store?.id ?? 0,
    store?.hasMultipleCommissionGroups ?? false,
  );

  useEffect(() => {
    if (!store) {
      navigate("/dashboard/cashback", { replace: true });
    }
  }, [store, navigate]);

  if (!store) return null;

  const cashbackText = formatCashback(store.cashback);

  const handleVisitStore = async () => {
    if (!store.websiteUrl || isOpeningStore) return;

    setIsOpeningStore(true);

    try {
      const result = await cashbackApi.createTrackingLink(store.id);
      window.open(
        result.url || store.websiteUrl,
        "_blank",
        "noopener,noreferrer",
      );
    } catch {
      window.open(store.websiteUrl, "_blank", "noopener,noreferrer");
    } finally {
      setIsOpeningStore(false);
    }
  };

  return (
    <div className="tts-page">
      <div className="tts-content">
        <button className="tts-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} strokeWidth={2.5} />
          Tillbaka
        </button>

        {/* Store header */}
        <div className="tts-header">
          <div className="tts-logo-wrap">
            {logoError || !store.logoUrl ? (
              <div className="tts-logo-fallback">
                {store.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <img
                src={store.logoUrl}
                alt={store.name}
                className="tts-logo"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <h1 className="tts-store-name">{store.name}</h1>
          <p className="tts-headline">
            Du är på väg att handla hos {store.name}
          </p>
        </div>

        {/* Info cards */}
        <div className="tts-info-grid">
          {/* Description */}
          {store.description && (
            <div className="tts-info-card">
              <div className="tts-info-card-header">
                <ShoppingBag
                  size={17}
                  strokeWidth={2}
                  className="tts-info-icon"
                />
                <span className="tts-info-title">Om butiken</span>
              </div>
              <p className="tts-info-text">{store.description}</p>
            </div>
          )}

          {/* Categories */}
          {store.categories && store.categories.length > 0 && (
            <div className="tts-info-card">
              <div className="tts-info-card-header">
                <Tag size={17} strokeWidth={2} className="tts-info-icon" />
                <span className="tts-info-title">Kategorier</span>
              </div>
              <div className="tts-categories">
                {store.categories.map((c) => (
                  <span key={c.id} className="tts-category-chip">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cashback */}
          {cashbackText && (
            <div className="tts-info-card tts-info-card--cashback">
              <div className="tts-info-card-header">
                <span className="tts-info-title">Cashback</span>
              </div>
              <div className="tts-cashback-amount">
                {store.hasMultipleCommissionGroups && (
                  <span className="tts-cashback-prefix">Upp till </span>
                )}
                <span className="tts-cashback-value">{cashbackText}</span>
              </div>
              {store.hasMultipleCommissionGroups && (
                <p className="tts-info-subtext">
                  Cashback varierar per produktkategori. Se mer information på
                  butikens sida.
                </p>
              )}
            </div>
          )}

          {/* Cashback per commission group */}
          {storeDetail?.commissionGroups &&
            storeDetail.commissionGroups.length > 0 && (
              <div className="tts-info-card tts-product-categories-card">
                <p className="tts-product-categories-title">
                  Cashback per kategori
                </p>
                <div className="tts-product-categories">
                  {storeDetail.commissionGroups.map((group) => (
                    <div key={group.name} className="tts-product-category-row">
                      <span className="tts-product-category-name">
                        {group.name}
                      </span>
                      <span className="tts-product-category-cashback">
                        {formatCashback(group)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Payout time */}
          <div className="tts-info-card">
            <div className="tts-info-card-header">
              <Clock size={17} strokeWidth={2} className="tts-info-icon" />
              <span className="tts-info-title">Utbetalningstid</span>
            </div>
            <p className="tts-info-text">
              Cashback godkänns normalt inom <strong>30-60 dagar</strong> efter
              genomfört köp, beroende på butikens returpolicy.
            </p>
          </div>

          {/* Cookies reminder */}
          <div className="tts-info-card tts-info-card--warning">
            <div className="tts-info-card-header">
              <Cookie size={17} strokeWidth={2} className="tts-info-icon" />
              <span className="tts-info-title">Viktigt – cookies</span>
            </div>
            <p className="tts-info-text">
              För att cashback ska registreras måste du{" "}
              <strong>acceptera alla cookies</strong> på butikens webbplats.
              Undvik att handla via prisjämförelsesajter eller VPN, och
              kombinera inte med en annan cashback-tjänst vid samma köp.
            </p>
          </div>

          {/* Terms */}
          <div className="tts-info-card">
            <div className="tts-info-card-header">
              <FileText size={17} strokeWidth={2} className="tts-info-icon" />
              <span className="tts-info-title">Villkor</span>
            </div>
            <p className="tts-info-text">
              Cashbacken beräknas normalt utifrån ordervärdet i hela kronor
              minus moms, skatt och frakt. Ingen cashback ges om du använder
              rabattkoder från annan källa än SveaPanelen.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button className="tts-cta" onClick={() => void handleVisitStore()}>
          <ExternalLink size={18} strokeWidth={2.5} />
          {isOpeningStore ? "Öppnar butik..." : `Gå till ${store.name}`}
        </button>
      </div>
    </div>
  );
}

export default TransferToStorePage;
