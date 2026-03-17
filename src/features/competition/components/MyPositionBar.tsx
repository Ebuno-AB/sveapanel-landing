import type { Competition } from "@/features/competition/types/competition.types";

function MyPositionBar({ competition }: { competition: Competition }) {
  const { my_place } = competition;
  if (!my_place || my_place.position === "-") return null;

  return (
    <div className="comp-my-position">
      <span className="comp-my-rank">#{my_place.position}</span>
      <span className="comp-my-label">Din placering</span>
      <span className="comp-my-amount">{my_place.amount}st</span>
    </div>
  );
}

export default MyPositionBar;
