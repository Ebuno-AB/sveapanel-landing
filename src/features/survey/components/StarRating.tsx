const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z";

function StarRating({ score }: { score: number }) {
  const rating = Math.min(score / 20, 5);
  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars;
  const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);
  const clipId = `star-clip-${score}`;

  return (
    <span className="star-rating">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg key={`f${i}`} width="18" height="18" viewBox="0 0 24 24" fill="#fcba03">
          <path d={STAR_PATH} />
        </svg>
      ))}
      {fraction > 0 && (
        <svg width="18" height="18" viewBox="0 0 24 24">
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={24 * fraction} height="24" />
            </clipPath>
          </defs>
          <path d={STAR_PATH} fill="#e0e0e0" />
          <path d={STAR_PATH} fill="#fcba03" clipPath={`url(#${clipId})`} />
        </svg>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg key={`e${i}`} width="18" height="18" viewBox="0 0 24 24" fill="#e0e0e0">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

export default StarRating;
