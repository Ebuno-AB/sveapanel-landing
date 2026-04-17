import type { Competition } from "@/features/competition/types/competition.types";

function MyPositionBar({ competition }: { competition: Competition }) {
  const { myPlace } = competition;
  const hasPlace = myPlace && myPlace.position != null;

  return (
    <div
      className={`comp-my-position${hasPlace ? "" : " comp-my-position--placeholder"}`}
    >
      {hasPlace && (
        <>
          <span className="comp-my-rank">#{myPlace.position}</span>
          <span className="comp-my-label">Din placering</span>
          <span className="comp-my-amount">{myPlace.amount}st</span>
        </>
      )}
    </div>
  );
}

export default MyPositionBar;
