import type { Competition } from "@/features/competition/types/competition.types";

function MyPositionBar({ competition }: { competition: Competition }) {
  const { myPlace } = competition;
  if (!myPlace || myPlace.position == null) return null;

  return (
    <div className="comp-my-position">
      <span className="comp-my-rank">#{myPlace.position}</span>
      <span className="comp-my-label">Din placering</span>
      <span className="comp-my-amount">{myPlace.amount}st</span>
    </div>
  );
}

export default MyPositionBar;
