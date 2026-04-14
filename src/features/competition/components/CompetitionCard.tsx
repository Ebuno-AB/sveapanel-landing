import type { Competition } from "@/features/competition/types/competition.types";
import TimerPill from "./TimerPill";
import MyPositionBar from "./MyPositionBar";
import Podium from "./Podium";
import Leaderboard from "./Leaderboard";

function CompetitionCard({ competition }: { competition: Competition }) {
  const { competitionInfo, topUsers } = competition;

  if (!competitionInfo) return null;

  return (
    <div className="comp-card">
      <div className="comp-card-header">
        <h3 className="comp-card-title">{competitionInfo.title}</h3>
        {competitionInfo.endDate && (
          <TimerPill endDate={competitionInfo.endDate} />
        )}
      </div>
      {competitionInfo.description && (
        <p className="comp-description">{competitionInfo.description}</p>
      )}
      <MyPositionBar competition={competition} />
      <Podium users={topUsers} />
      <Leaderboard users={topUsers} />
    </div>
  );
}

export default CompetitionCard;
