import type { CompetitionUser } from "@/features/competition/types/competition.types";
import CompetitionAvatar from "./CompetitionAvatar";

const GOLD = "#FFD700";
const SILVER = "#C0C0C0";
const BRONZE = "#E8914E";
const RANK_COLORS = [GOLD, SILVER, BRONZE];
const RANK_BG = ["#FFD70033", "#C0C0C033", "#E8914E33"];

function formatPrize(amount: number) {
  return `${amount} kr`;
}

function Podium({ users }: { users: CompetitionUser[] }) {
  const top3 = users.slice(0, 3);
  const second = top3[1];
  const first = top3[0];
  const third = top3[2];

  if (!first) return null;

  const maxAmount = Math.max(...top3.map((u) => u.amount), 1);

  const renderPod = (
    user: CompetitionUser | undefined,
    rank: number,
    cls: string,
  ) => {
    if (!user) return <div className="comp-pod" style={{ width: 80 }} />;
    const color = RANK_COLORS[rank - 1] ?? "#555";
    const bgColor = RANK_BG[rank - 1] ?? "#55555533";
    const progress = (user.amount / maxAmount) * 100;
    return (
      <div className={`comp-pod ${cls}`}>
        {rank === 1 && <div className="comp-pod-crown">👑</div>}
        <div
          className={`comp-pod-avatar-ring ${rank === 1 ? "first" : rank === 2 ? "second" : "third"}`}
          style={{
            borderColor: color,
          }}
        >
          <CompetitionAvatar
            user={user}
            className={`comp-pod-avatar ${rank === 1 ? "first" : rank === 2 ? "second" : "third"}`}
            style={{
              background: user.color || "#555",
            }}
          />
        </div>
        <span
          className="comp-pod-rank"
          style={{ background: bgColor, color: color }}
        >
          #{user.position}
        </span>
        <span className="comp-pod-name">{user.name.split(" ")[0]}</span>
        <span className={`comp-pod-score${rank === 1 ? " first-score" : ""}`}>
          {user.price > 0 ? formatPrize(user.price) : `${user.amount}st`}
        </span>
        <span className="comp-pod-amount">{user.amount}st</span>
        <div className="comp-pod-progress">
          <div
            className="comp-pod-progress-bar"
            style={{ width: `${progress}%`, background: color }}
          />
        </div>
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
