import { useState } from "react";
import { Flame, Trophy } from "lucide-react";
import type { StreakLeaderboardEntry } from "../types/streak.types";

// Colors for avatar backgrounds when no image is available
const AVATAR_COLORS = [
  "#4CAF50", // green
  "#9C27B0", // purple
  "#FF9800", // orange
  "#2196F3", // blue
  "#E91E63", // pink
  "#00BCD4", // cyan
  "#795548", // brown
  "#607D8B", // blue-grey
];

function getAvatarColor(userId: number): string {
  return AVATAR_COLORS[userId % AVATAR_COLORS.length];
}

function getInitials(firstName: string, lastName: string): string {
  const first = firstName?.trim()?.[0] || "";
  const last = lastName?.trim()?.[0] || "";
  return (first + last).toUpperCase();
}

function formatName(firstName: string, lastName: string): string {
  const first = firstName?.trim() || "";
  const lastInitial = lastName?.trim()?.[0] || "";
  return lastInitial ? `${first} ${lastInitial}.` : first;
}

interface AvatarProps {
  entry: StreakLeaderboardEntry;
  className: string;
}

function StreakAvatar({ entry, className }: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = getInitials(entry.firstName, entry.lastName);
  const bgColor = entry.color || getAvatarColor(entry.userId);
  console.log("entry", entry);
  const thumbnailUrl = entry.avatar?.thumbnailUrl;
  const showImage = !!thumbnailUrl && !hasImageError;

  return (
    <div
      className={className}
      style={{ backgroundColor: bgColor }}
      aria-label={`${formatName(entry.firstName, entry.lastName)}s avatar`}
    >
      {showImage ? (
        <img
          src={thumbnailUrl}
          alt=""
          className="streak-lb-avatar-image"
          onError={() => setHasImageError(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
}

interface Props {
  toplist: StreakLeaderboardEntry[];
  isLoading: boolean;
}

const StreakLeaderboard = ({ toplist, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="streak-leaderboard">
        <div className="streak-lb-podium-skeleton">
          {[0, 1, 2].map((i) => (
            <div key={i} className="streak-lb-pod-skel" />
          ))}
        </div>
        {Array.from({ length: 6 }, (_, i) => (
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

  const top3 = toplist.slice(0, 3);
  const second = top3[1];
  const first = top3[0];
  const third = top3[2];

  const renderPodiumEntry = (
    entry: StreakLeaderboardEntry | undefined,
    position: 1 | 2 | 3,
  ) => {
    if (!entry) return <div className="streak-lb-pod-placeholder" />;

    return (
      <div className={`streak-lb-pod streak-lb-pod--${position}`}>
        <StreakAvatar
          entry={entry}
          className={`streak-lb-pod-avatar${position === 1 ? " streak-lb-pod-avatar--first" : ""}`}
        />
        <span className="streak-lb-pod-rank">{position}</span>
      </div>
    );
  };

  return (
    <div className="streak-leaderboard">
      {/* Podium for top 3 */}
      <div className="streak-lb-podium">
        {renderPodiumEntry(second, 2)}
        {renderPodiumEntry(first, 1)}
        {renderPodiumEntry(third, 3)}
      </div>

      {/* Full list */}
      <div className="streak-lb-list">
        {toplist.map((entry) => (
          <div key={entry.userId} className="streak-lb-row">
            <span className="streak-lb-pos">{entry.position}.</span>
            <StreakAvatar entry={entry} className="streak-lb-avatar" />
            <span className="streak-lb-name">
              {formatName(entry.firstName, entry.lastName)}
            </span>
            <div className="streak-lb-streak">
              <Flame size={18} className="streak-lb-flame" />
              <span className="streak-lb-count">{entry.currentStreak}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakLeaderboard;
