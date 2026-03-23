import { useState, useMemo, useEffect } from "react";
import { Search, ArrowUpDown, ShoppingBag } from "lucide-react";
import {
  useFeaturedStore,
  useStores,
  useCategories,
} from "@/features/cashback/api/cashback.queries";
import CategoryCarousel from "@/features/cashback/components/CategoryCarousel";
import FeaturedCard from "@/features/cashback/components/FeaturedCard";
import SmallStoreCard from "@/features/cashback/components/SmallStoreCard";
import FeedSkeleton from "@/features/cashback/components/FeedSkeleton";
import "@/features/cashback/styles/CashbackPage.css";

const INITIAL_LIMIT = 12;

const CashbackPage = () => {
  const { data: featuredStore, isLoading: featuredLoading } =
    useFeaturedStore();
  const { data: stores, isLoading: storesLoading } = useStores();
  const { data: categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"az" | "cashback">("az");
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 690);

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 690);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  const displayedStores = filteredStores.slice(0, visibleCount);

  const isLoading = featuredLoading || storesLoading;

  return (
    <div className="dash-cashback">
      <div className="dash-cashback-content">
        {/* Veckans butiker */}
        {featuredStore && (
          <div className="cb-feed-section">
            <div className="cb-feed-section-header">
              <h3 className="cb-feed-section-title">Veckans butiker</h3>
            </div>
            <div className="cb-featured-single">
              <FeaturedCard store={featuredStore} />
            </div>
          </div>
        )}

        {/* Alla butiker */}
        <div className="cb-feed-section">
          <div className="cb-feed-section-header">
            <h3 className="cb-feed-section-title">Alla butiker</h3>
          </div>

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
                {displayedStores.map((store) => (
                  <SmallStoreCard key={store.id} store={store} />
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
      </div>
    </div>
  );
};

export default CashbackPage;
