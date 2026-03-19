import type { CompetitionHistoryItem } from "@/features/competition/types/competition.types";

const GOLD = "#FFD700";
const SILVER = "#C0C0C0";
const BRONZE = "#E8914E";
const TEAL = "#00cca3";
const RANK_COLORS = [GOLD, SILVER, BRONZE];

function HistoryRow({ item }: { item: CompetitionHistoryItem }) {
  const rank = item.my_place.finalOrder;
  const isTop = rank >= 1 && rank <= 3;
  const rankColor = isTop ? RANK_COLORS[rank - 1] : TEAL;
  const date = new Date(item.competition_info.start_date).toLocaleDateString(
    "sv-SE",
    {
      day: "numeric",
      month: "short",
    },
  );
  const winner = item.top_three?.[0];

  return (
    <div className="comp-history-row">
      <div className="comp-history-card-header">
        <div className="comp-history-title">{item.competition_info.title}</div>
        <div className="comp-history-date">{date}</div>
      </div>

      <div className="comp-history-card-body">
        <span className="comp-history-rank-big" style={{ color: rankColor }}>
          #{rank}
        </span>
        <span className="comp-history-amount">
          {item.my_place.amount}
          <span>st</span>
        </span>
      </div>

      {winner && (
        <div className="comp-history-card-footer">
          <span className="comp-history-winner-pill">
            <span className="comp-history-winner-icon">🏆</span>
            {winner.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default HistoryRow;
