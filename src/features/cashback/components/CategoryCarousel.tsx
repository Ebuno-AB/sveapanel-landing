import type { CashbackCategory } from "@/features/cashback/types/cashback.types";

function CategoryCarousel({
  categories,
  selected,
  onSelect,
}: {
  categories: CashbackCategory[];
  selected: string | undefined;
  onSelect: (slug: string | undefined) => void;
}) {
  return (
    <div className="cb-categories-section">
      <div className="cb-categories-scroll">
        <div
          className={`cb-category-chip${!selected ? " active" : ""}`}
          onClick={() => onSelect(undefined)}
        >
          <div className="cb-category-img-wrap">
            <div className="cb-category-icon-fallback">🏠</div>
          </div>
          <span className="cb-category-name">Alla</span>
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`cb-category-chip${selected === cat.slug ? " active" : ""}`}
            onClick={() => onSelect(cat.slug)}
          >
            <div className="cb-category-img-wrap">
              {cat.coverImageUrl ? (
                <img src={cat.coverImageUrl} alt={cat.name} />
              ) : (
                <div className="cb-category-icon-fallback">
                  {cat.iconUrl ? (
                    <img src={cat.iconUrl} alt="" style={{ width: 28, height: 28 }} />
                  ) : (
                    "🏷"
                  )}
                </div>
              )}
            </div>
            <span className="cb-category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCarousel;
