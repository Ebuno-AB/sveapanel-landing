import type { CompetitionHistoryItem } from "@/features/competition/types/competition.types";

const GOLD = "#FFD700";
const SILVER = "#C0C0C0";
const BRONZE = "#E8914E";
const RANK_COLORS = [GOLD, SILVER, BRONZE];

function HistoryRow({ item }: { item: CompetitionHistoryItem }) {
  const rank = item.my_place.finalOrder;
  const isTop = rank >= 1 && rank <= 3;
  const bgColor = isTop ? RANK_COLORS[rank - 1] : undefined;
  const date = new Date(item.competition_info.start_date).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="comp-history-row">
      <div
        className={`comp-history-rank ${isTop ? "top" : "normal"}`}
        style={isTop ? { background: bgColor } : undefined}
      >
        #{rank}
      </div>
      <div className="comp-history-info">
        <div className="comp-history-title">{item.competition_info.title}</div>
        <div className="comp-history-date">{date}</div>
      </div>
      <div className="comp-history-right">
        <div className="comp-history-score">
          {item.my_place.amount}<span>st</span>
        </div>
        {item.my_place.amount > 0 && (
          <div className="comp-history-prize" />
        )}
      </div>
    </div>
  );
}

export default HistoryRow;
