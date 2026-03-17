import type { CompetitionUser } from "@/features/competition/types/competition.types";

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function formatPrize(amount: number) {
  return `${amount} kr`;
}

function Leaderboard({ users }: { users: CompetitionUser[] }) {
  return (
    <div className="comp-leaderboard">
      <h4 className="comp-leaderboard-title">Topplista</h4>
      <div className="comp-leaderboard-scroll">
        {users.map((user) => (
          <div key={user.id} className="comp-lb-row">
            <span className="comp-lb-pos">{user.position}</span>
            <div
              className="comp-lb-avatar"
              style={{ background: user.color || "#555" }}
            >
              {getInitials(user.name)}
            </div>
            <span className="comp-lb-name">{user.name}</span>
            <div className="comp-lb-right">
              {user.price > 0 && (
                <span className="comp-lb-prize">{formatPrize(user.price)}</span>
              )}
              <span className="comp-lb-amount">
                {user.amount}<span>st</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
