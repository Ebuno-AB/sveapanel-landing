import { Flame, Trophy, Medal } from "lucide-react";
import type { StreakLeaderboardEntry } from "../types/streak.types";

const MEDALS = [
  <Medal size={20} color="#FFD700" />,
  <Medal size={20} color="#C0C0C0" />,
  <Medal size={20} color="#CD7F32" />,
];

interface Props {
  toplist: StreakLeaderboardEntry[];
  isLoading: boolean;
}

const StreakLeaderboard = ({ toplist, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="streak-leaderboard">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="leaderboard-skeleton-row" />
        ))}
      </div>
    );
  }

  if (!toplist.length) {
    return (
      <div className="streak-leaderboard-empty">
        <div className="streak-empty-icon">
          <Trophy size={40} />
        </div>
        <p>Ingen topplista tillgänglig ännu</p>
      </div>
    );
  }

  return (
    <div className="streak-leaderboard">
      {toplist.map((entry, i) => (
        <div key={entry.userId} className="leaderboard-row">
          <div className="leaderboard-rank">
            {i < 3 ? (
              <span className="leaderboard-medal">{MEDALS[i]}</span>
            ) : (
              <span className="leaderboard-rank-num">#{entry.position}</span>
            )}
          </div>
          <div className="leaderboard-name">
            {entry.firstName} {entry.lastName}
          </div>
          <div className="leaderboard-streak">
            <Flame size={16} className="leaderboard-streak-icon" />
            <span className="leaderboard-streak-count">
              {entry.currentStreak}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreakLeaderboard;
