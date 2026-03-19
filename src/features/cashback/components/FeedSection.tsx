import type {
  CashbackFeedSection,
  CashbackCategory,
} from "@/features/cashback/types/cashback.types";
import { Search } from "lucide-react";
import FeaturedCard from "./FeaturedCard";
import SmallStoreCard from "./SmallStoreCard";
import CategoryCard from "./CategoryCard";

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
            <Search size={20} strokeWidth={2.5} />
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
