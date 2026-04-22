import type { Competition } from "@/features/competition/types/competition.types";
import TimerPill from "./TimerPill";
import MyPositionBar from "./MyPositionBar";
import Podium from "./Podium";
import Leaderboard from "./Leaderboard";
import { ChevronRight, ArrowRight } from "lucide-react";

type Props = {
  competition: Competition;
  onClick?: () => void;
  expanded?: boolean;
};

function CompetitionCard({ competition, onClick, expanded = false }: Props) {
  const { competitionInfo, topUsers } = competition;

  if (!competitionInfo) return null;

  const clickable = !!onClick;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`comp-card${clickable ? " comp-card--clickable" : ""}${expanded ? " comp-card--expanded" : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className="comp-card-header">
        <h3 className="comp-card-title">{competitionInfo.title}</h3>
        {clickable && <ChevronRight size={20} className="comp-card-arrow" />}
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
      <Leaderboard users={topUsers} expanded={expanded} />
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
