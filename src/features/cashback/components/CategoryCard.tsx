import type { CashbackCategory } from "@/features/cashback/types/cashback.types";

function CategoryCard({ category }: { category: CashbackCategory }) {
  return (
    <div className="cb-category-card">
      {category.coverImageUrl ? (
        <img src={category.coverImageUrl} alt={category.name} />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #e0e0e0, #ccc)" }} />
      )}
      <div className="cb-category-card-overlay">
        <span className="cb-category-card-name">{category.name}</span>
        {category.storeCount != null && (
          <span className="cb-category-card-count">
            {category.storeCount} butiker
          </span>
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
