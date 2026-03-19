import type { ToplistEntry } from "../types/streak.types";

const MEDALS = ["🥇", "🥈", "🥉"];

interface Props {
  toplist: ToplistEntry[];
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
        <div className="streak-empty-icon">🏆</div>
        <p>Ingen topplista tillgänglig ännu</p>
      </div>
    );
  }

  return (
    <div className="streak-leaderboard">
      {toplist.map((entry, i) => (
        <div key={entry.user_id} className="leaderboard-row">
          <div className="leaderboard-rank">
            {i < 3 ? (
              <span className="leaderboard-medal">{MEDALS[i]}</span>
            ) : (
              <span className="leaderboard-rank-num">#{entry.rank}</span>
            )}
          </div>
          <div className="leaderboard-name">{entry.name}</div>
          <div className="leaderboard-streak">
            <span className="leaderboard-streak-icon">🔥</span>
            <span className="leaderboard-streak-count">
              {entry.current_streak}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreakLeaderboard;
