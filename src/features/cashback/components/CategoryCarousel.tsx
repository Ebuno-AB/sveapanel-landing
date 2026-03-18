import {
  LayoutGrid,
  Baby,
  Laptop,
  Shirt,
  Dumbbell,
  Home,
  UtensilsCrossed,
  Sparkles,
  Plane,
  BookOpen,
  Gamepad2,
  PawPrint,
  Flower2,
  Pill,
  Car,
  ShoppingBag,
  Tag,
  Banknote,
  Gift,
  Music,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import type { CashbackCategory } from "@/features/cashback/types/cashback.types";

// Ordered list of [keyword, icon] pairs — matched against the category name
const NAME_ICON_RULES: [string, LucideIcon][] = [
  ["barn", Baby],
  ["leksak", Baby],
  ["elektronik", Laptop],
  ["dator", Laptop],
  ["mobil", Laptop],
  ["kläder", Shirt],
  ["klader", Shirt],
  ["mode", Shirt],
  ["skor", Shirt],
  ["sport", Dumbbell],
  ["fritid", Dumbbell],
  ["träning", Dumbbell],
  ["hem", Home],
  ["inredning", Home],
  ["trädgård", Flower2],
  ["tradgard", Flower2],
  ["mat", UtensilsCrossed],
  ["dryck", UtensilsCrossed],
  ["livsmedel", UtensilsCrossed],
  ["skönhet", Sparkles],
  ["skonhet", Sparkles],
  ["hälsa", Pill],
  ["halsa", Pill],
  ["apotek", Pill],
  ["resa", Plane],
  ["resor", Plane],
  ["bok", BookOpen],
  ["böck", BookOpen],
  ["nöje", Clapperboard],
  ["noje", Clapperboard],
  ["spel", Gamepad2],
  ["hobby", Music],
  ["musik", Music],
  ["djur", PawPrint],
  ["finans", Banknote],
  ["ekonomi", Banknote],
  ["present", Gift],
  ["bil", Car],
  ["fordon", Car],
  ["shopping", ShoppingBag],
];

function getCategoryIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  for (const [keyword, icon] of NAME_ICON_RULES) {
    if (lower.includes(keyword)) return icon;
  }
  if (import.meta.env.DEV) {
    console.warn(
      `[CategoryCarousel] No icon mapped for category name: "${name}"`,
    );
  }
  return Tag;
}

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
          <LayoutGrid size={16} strokeWidth={1.75} />
          <span className="cb-category-name">Alla</span>
        </div>
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.name);
          return (
            <div
              key={cat.id}
              className={`cb-category-chip${selected === cat.slug ? " active" : ""}`}
              onClick={() => onSelect(cat.slug)}
            >
              <Icon size={16} strokeWidth={1.75} />
              <span className="cb-category-name">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryCarousel;
