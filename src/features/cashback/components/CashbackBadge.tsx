import { formatCashback } from "@/features/cashback/utils/formatCashback";
import type { CashbackStore } from "@/features/cashback/types/cashback.types";

function CashbackBadge({ store }: { store: CashbackStore }) {
  const text = formatCashback(store.cashback);
  if (!text) return null;

  return (
    <span className="cb-badge">
      {store.hasMultipleCommissionGroups && (
        <span className="cb-badge-prefix">Upp till </span>
      )}
      {text} cashback
    </span>
  );
}

export default CashbackBadge;
