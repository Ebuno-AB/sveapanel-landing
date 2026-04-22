import type { CompetitionUser } from "@/features/competition/types/competition.types";
import CompetitionAvatar from "./CompetitionAvatar";

function formatPrize(amount: number) {
  return `${amount} kr`;
}

function Leaderboard({
  users,
  expanded = false,
}: {
  users: CompetitionUser[];
  expanded?: boolean;
}) {
  return (
    <div
      className={`comp-leaderboard${expanded ? " comp-leaderboard--expanded" : ""}`}
    >
      <h4 className="comp-leaderboard-title">Topplista</h4>
      <div className="comp-leaderboard-scroll">
        {users
          .filter((user) => user?.userId != null)
          .map((user) => (
            <div key={user.userId} className="comp-lb-row">
              <span className="comp-lb-pos">{user.position}</span>
              <CompetitionAvatar user={user} className="comp-lb-avatar" />
              <span className="comp-lb-name">{user.name}</span>
              <div className="comp-lb-right">
                {user.price > 0 && (
                  <span className="comp-lb-prize">
                    {formatPrize(user.price)}
                  </span>
                )}
                <span className="comp-lb-amount">
                  {user.amount}
                  <span>st</span>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Leaderboard;
