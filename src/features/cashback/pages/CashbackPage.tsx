import { useState } from "react";
import {
  useFeedSections,
  useCategories,
} from "@/features/cashback/api/cashback.queries";
import CategoryCarousel from "@/features/cashback/components/CategoryCarousel";
import FeedSection from "@/features/cashback/components/FeedSection";
import FeedSkeleton from "@/features/cashback/components/FeedSkeleton";
import "@/features/cashback/styles/CashbackPage.css";

const CashbackPage = () => {
  const { data: feedSections, isLoading: sectionsLoading } = useFeedSections();
  const { data: categories, isLoading: catsLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const isLoading = sectionsLoading || catsLoading;

  return (
    <div className="dash-cashback">
      <div className="dash-cashback-content">
        {categories && categories.length > 0 && (
          <CategoryCarousel
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}

        {isLoading ? (
          <FeedSkeleton />
        ) : feedSections && feedSections.length > 0 ? (
          feedSections.map((section) => (
            <FeedSection
              key={section.id}
              section={section}
              categories={categories ?? []}
            />
          ))
        ) : (
          <div className="cb-empty" style={{ marginTop: 32 }}>
            <div className="cb-empty-icon">🛍</div>
            <h3>Inga butiker just nu</h3>
            <p>Kom tillbaka senare — nya butiker dyker upp regelbundet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashbackPage;
