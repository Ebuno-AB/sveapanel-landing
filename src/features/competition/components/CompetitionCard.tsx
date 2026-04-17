import type { Competition } from "@/features/competition/types/competition.types";
import TimerPill from "./TimerPill";
import MyPositionBar from "./MyPositionBar";
import Podium from "./Podium";
import Leaderboard from "./Leaderboard";
import { ChevronRight, ArrowRight } from "lucide-react";

function CompetitionCard({ competition }: { competition: Competition }) {
  const { competitionInfo, topUsers } = competition;

  if (!competitionInfo) return null;

  return (
    <div className="comp-card">
      <div className="comp-card-header">
        <h3 className="comp-card-title">{competitionInfo.title}</h3>
        <ChevronRight size={20} className="comp-card-arrow" />
      </div>
      <div className="comp-card-pills">
        <span className="comp-card-type-pill">
          ⚡ {competitionInfo.competitionType}
        </span>
        {competitionInfo.endDate && (
          <TimerPill endDate={competitionInfo.endDate} />
        )}
      </div>
      <MyPositionBar competition={competition} />
      <Podium users={topUsers} />
      <Leaderboard users={topUsers} />
      {competitionInfo.joinText && (
        <div className="comp-card-cta">
          <ArrowRight size={16} />
          <span>{competitionInfo.joinText}</span>
        </div>
      )}
    </div>
  );
}

export default CompetitionCard;
