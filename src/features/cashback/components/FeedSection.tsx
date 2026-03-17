import type {
  CashbackFeedSection,
  CashbackCategory,
} from "@/features/cashback/types/cashback.types";
import FeaturedCard from "./FeaturedCard";
import SmallStoreCard from "./SmallStoreCard";
import CategoryCard from "./CategoryCard";

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

function FeedSection({
  section,
  categories,
}: {
  section: CashbackFeedSection;
  categories: CashbackCategory[];
}) {
  if (section.sectionType === "categories") {
    return (
      <div className="cb-feed-section">
        <div className="cb-feed-section-header">
          <h3 className="cb-feed-section-title">{section.title}</h3>
          {section.description && (
            <p className="cb-feed-section-desc">{section.description}</p>
          )}
        </div>
        <div className="cb-category-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    );
  }

  if (section.sectionType === "search") {
    return (
      <div className="cb-feed-section">
        <div className="cb-search-banner">
          <div className="cb-search-icon">
            <SearchIcon />
          </div>
          <div className="cb-search-text">
            <h4>Sök bland butiker</h4>
            <p>Hitta din favoritbutik och börja tjäna cashback</p>
          </div>
        </div>
      </div>
    );
  }

  if (!section.stores || section.stores.length === 0) return null;

  const isFeatured = section.cardVariant === "featured";

  return (
    <div className="cb-feed-section">
      <div className="cb-feed-section-header">
        <h3 className="cb-feed-section-title">{section.title}</h3>
        {section.description && (
          <p className="cb-feed-section-desc">{section.description}</p>
        )}
      </div>
      {isFeatured ? (
        <div className="cb-featured-scroll">
          {section.stores.map((store) => (
            <FeaturedCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="cb-stores-scroll">
          {section.stores.map((store) => (
            <SmallStoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedSection;
