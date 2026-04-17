import { useState } from "react";
import type { CompetitionUser } from "@/features/competition/types/competition.types";

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.trim().slice(0, 2).toUpperCase();
}

interface Props {
  user: CompetitionUser;
  className: string;
  style?: React.CSSProperties;
}

function CompetitionAvatar({ user, className, style }: Props) {
  const [hasImageError, setHasImageError] = useState(false);
  const thumbnailUrl = user.avatar?.thumbnailUrl;
  const showImage = !!thumbnailUrl && !hasImageError;

  return (
    <div
      className={className}
      style={{ background: user.color || "#555", ...style }}
      aria-label={`Avatar för ${user.name}`}
    >
      {showImage ? (
        <img
          src={thumbnailUrl}
          alt=""
          className="comp-avatar-image"
          onError={() => setHasImageError(true)}
        />
      ) : (
        getInitials(user.name)
      )}
    </div>
  );
}

export default CompetitionAvatar;
