import type { Competition } from "@/features/competition/types/competition.types";
import TimerPill from "./TimerPill";
import MyPositionBar from "./MyPositionBar";
import Podium from "./Podium";
import Leaderboard from "./Leaderboard";

function CompetitionCard({ competition }: { competition: Competition }) {
  const { competition_info, top_users } = competition;

  if (!competition_info) return null;

  return (
    <div className="comp-card">
      <div className="comp-card-header">
        <h3 className="comp-card-title">{competition_info.title}</h3>
        {competition_info.end_date && (
          <TimerPill endDate={competition_info.end_date} />
        )}
      </div>
      {competition_info.description && (
        <p className="comp-description">{competition_info.description}</p>
      )}
      <MyPositionBar competition={competition} />
      <Podium users={top_users} />
      <Leaderboard users={top_users} />
    </div>
  );
}

export default CompetitionCard;
