import type { CompetitionUser } from "@/features/competition/types/competition.types";

const GOLD = "#FFD700";
const SILVER = "#C0C0C0";
const BRONZE = "#E8914E";
const RANK_COLORS = [GOLD, SILVER, BRONZE];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function formatPrize(amount: number) {
  return `${amount} kr`;
}

function Podium({ users }: { users: CompetitionUser[] }) {
  const top3 = users.slice(0, 3);
  const second = top3[1];
  const first = top3[0];
  const third = top3[2];

  if (!first) return null;

  const renderPod = (
    user: CompetitionUser | undefined,
    rank: number,
    cls: string,
  ) => {
    if (!user) return <div className="comp-pod" style={{ width: 80 }} />;
    const color = RANK_COLORS[rank - 1] ?? "#555";
    return (
      <div className={`comp-pod ${cls}`}>
        <div
          className={`comp-pod-avatar ${rank === 1 ? "first" : rank === 2 ? "second" : "third"}`}
          style={{
            background: user.color || "#555",
            border: `${rank === 1 ? 3 : 2}px solid ${color}`,
          }}
        >
          {getInitials(user.name)}
        </div>
        <span
          className="comp-pod-rank"
          style={{ background: color, color: rank === 1 ? "#1a1a2e" : "#fff" }}
        >
          #{user.position}
        </span>
        <span className="comp-pod-name">{user.name.split(" ")[0]}</span>
        <span className={`comp-pod-score${rank === 1 ? " first-score" : ""}`}>
          {user.amount}
          <span>st</span>
        </span>
        {user.price > 0 && (
          <span className="comp-pod-prize">{formatPrize(user.price)}</span>
        )}
      </div>
    );
  };

  return (
    <div className="comp-podium">
      {renderPod(second, 2, "")}
      {renderPod(first, 1, "comp-pod-center")}
      {renderPod(third, 3, "")}
    </div>
  );
}

export default Podium;
