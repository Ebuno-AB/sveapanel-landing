import "@/App.css";
import "./Cashback.css";
import "@/features/cashback/styles/CashbackPage.css";
import { useState, useMemo, useEffect } from "react";
import TopNav from "@/components/topNav/TopNav";
import Footer from "@/components/footer/Footer";
import AppDownloadQRModal from "@/components/appDownloadModal/AppDownloadQRModal";
import cashbackMockup from "@/assets/Images/cashbackMockup.webp";
import cashbackIosReview from "@/assets/Images/cashbackIosReview.webp";
import howTo1 from "@/assets/Images/HowTo1.png";
import howTo2 from "@/assets/Images/HowTo2.png";
import howTo3 from "@/assets/Images/HowTo3.png";
import { isIosReview } from "@/config/reviewConfig";
import {
  usePublicStores,
  usePublicFeaturedStore,
  usePublicCategories,
} from "@/features/cashback/api/cashback.queries";
import SmallStoreCard from "@/features/cashback/components/SmallStoreCard";
import FeaturedCard from "@/features/cashback/components/FeaturedCard";
import FeedSkeleton from "@/features/cashback/components/FeedSkeleton";
import CategoryCarousel from "@/features/cashback/components/CategoryCarousel";
import { ShoppingBag, Search, ArrowUpDown } from "lucide-react";

const INITIAL_LIMIT = 24;

function Cashback() {
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"az" | "cashback">("az");
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 690);

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 690);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { data: featuredStore, isLoading: featuredLoading } =
    usePublicFeaturedStore();
  const { data: stores, isLoading: storesLoading } = usePublicStores();
  const { data: categories } = usePublicCategories();

  const isLoading = featuredLoading || storesLoading;

  const filteredStores = useMemo(() => {
    if (!stores) return [];
    let result = stores.filter((s) => s.isActive);

    if (selectedCategory) {
      result = result.filter((s) =>
        s.categories?.some((c) => c.slug === selectedCategory),
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (sortBy === "az") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "sv"));
    } else {
      result = [...result].sort(
        (a, b) => (b.cashback?.amount ?? 0) - (a.cashback?.amount ?? 0),
      );
    }

    return result;
  }, [stores, selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <TopNav />

      {/* Hero Section */}
      <section className="cashback-hero">
        <div className="cashback-hero-inner">
          {/* Left copy */}
          <div className="cashback-hero-copy">
            <h1 className="cashback-hero-title">SveaPanelen Cashback</h1>
            <p className="cashback-hero-desc">
              Ladda ner SveaPanelens app för att få tillfång till Cashback på
              hundratals butiker. Pengarna kommer till ditt konto hos
              SveaPanelen som du sedan kan ta ut med Swish!
            </p>
          </div>

          {/* Right mockup */}
          <div className="cashback-hero-image-wrap">
            <img
              src={isIosReview ? cashbackIosReview : cashbackMockup}
              alt="SveaPanelen Cashback app"
              className="cashback-hero-image"
            />
          </div>
        </div>
      </section>

      {/* How-to Section */}
      <section className="cashback-howto">
        <div className="cashback-howto-inner">
          <h2 className="cashback-section-title">Såhär gör du</h2>

          <div className="howto-grid">
            {[
              {
                img: howTo1,
                title: "Gå till butiken från appen",
                desc: "Du kan även scrolla bland alla butiker i appen och gå till butiken därifrån. När köpet har gått igenom kan du se din kommande cashback i appen.",
              },
              {
                img: howTo2,
                title: "Aktivera våran extension",
                desc: "Med våran extension på får du automatiskt cashback när du handlar online och använder Safari.",
              },
              {
                img: howTo3,
                title: "Ta ut från appen",
                desc: "Cashbacken kommer till ditt konto i appen som du sen kan ta ut direkt med Swish.",
              },
            ].map((card, i) => (
              <div key={i}>
                <img
                  src={card.img}
                  alt={card.title}
                  className="howto-card-img"
                />
                <h3 className="howto-card-title">{card.title}</h3>
                <p className="howto-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Cards Section */}
      <section className="cashback-stores">
        <div className="cashback-stores-inner">
          <h2 className="cashback-section-title">
            Få cashback på dina favoritbutiker
          </h2>

          {featuredStore && (
            <div className="cb-featured-single" style={{ marginBottom: 24 }}>
              <FeaturedCard store={featuredStore} onCardClick={() => {}} />
            </div>
          )}

          <div className="cb-search-input-wrap">
            <Search size={18} strokeWidth={2.5} />
            <input
              className="cb-search-input"
              type="text"
              placeholder="Sök efter butiker"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(INITIAL_LIMIT);
              }}
            />
          </div>

          {categories &&
            categories.length > 0 &&
            (isCompact ? (
              <select
                className="cb-category-select"
                value={selectedCategory ?? ""}
                onChange={(e) => {
                  setSelectedCategory(e.target.value || undefined);
                  setVisibleCount(INITIAL_LIMIT);
                }}
                aria-label="Välj kategori"
              >
                <option value="">Alla kategorier</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            ) : (
              <CategoryCarousel
                categories={categories}
                selected={selectedCategory}
                onSelect={(slug) => {
                  setSelectedCategory(slug);
                  setVisibleCount(INITIAL_LIMIT);
                }}
              />
            ))}

          <div className="cb-sort-chips">
            <button
              className={`cb-sort-chip${sortBy === "az" ? " active" : ""}`}
              onClick={() => setSortBy("az")}
            >
              <ArrowUpDown size={14} /> A-Ö
            </button>
            <button
              className={`cb-sort-chip${sortBy === "cashback" ? " active" : ""}`}
              onClick={() => setSortBy("cashback")}
            >
              <ArrowUpDown size={14} /> Högst cashback
            </button>
          </div>

          {isLoading ? (
            <FeedSkeleton />
          ) : filteredStores.length === 0 ? (
            <div className="cb-empty" style={{ marginTop: 24 }}>
              <div className="cb-empty-icon">
                <ShoppingBag size={32} />
              </div>
              <h3>Inga butiker hittades</h3>
              <p>
                Prova att söka efter något annat eller välj en annan kategori.
              </p>
            </div>
          ) : (
            <>
              <div className="cb-stores-scroll">
                {filteredStores.slice(0, visibleCount).map((store) => (
                  <SmallStoreCard
                    key={store.id}
                    store={store}
                    onCardClick={() => {}}
                  />
                ))}
              </div>
              {visibleCount < filteredStores.length && (
                <div className="cb-show-more-wrap">
                  <button
                    className="cb-show-more"
                    onClick={() => setVisibleCount((c) => c + INITIAL_LIMIT)}
                  >
                    Visa fler
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
      <AppDownloadQRModal
        isOpen={isAppDownloadQRModalOpen}
        onClose={() => setIsAppDownloadQRModalOpen(false)}
      />
    </>
  );
}

export default Cashback;
