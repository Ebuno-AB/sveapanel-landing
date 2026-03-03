import React from "react";
import "./RatingsSection.css";

// Apple App Store icon (inline SVG)
const AppleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.85 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
      fill="currentColor"
    />
  </svg>
);

// Google Play icon (inline SVG)
const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z"
      fill="#0F9D58"
    />
    <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#FFCD40" />
    <path
      d="M20.16 10.85C20.5 11.05 20.75 11.39 20.75 11.75S20.5 12.45 20.16 12.65L17.89 13.85L15.62 11.58L17.89 9.31L20.16 10.85Z"
      fill="#FF6138"
    />
    <path d="M16.81 8.88L14.54 11.15L6.05 2.66L16.81 8.88Z" fill="#4285F4" />
  </svg>
);

const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({
  rating,
  maxRating = 5,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div
      className="star-rating"
      aria-label={`Betyg ${rating.toFixed(1)} av ${maxRating}`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star filled">
          ★
        </span>
      ))}
      {hasHalfStar && <span className="star half">★</span>}
      {[...Array(maxRating - Math.ceil(rating))].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      ))}
    </div>
  );
};

interface Review {
  id: number;
  text: string;
  author: string;
  rating: number;
}

interface ReviewsPlatformProps {
  platform: "apple" | "google";
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const ReviewsPlatform: React.FC<ReviewsPlatformProps> = ({
  platform,
  rating,
  reviewCount,
  reviews,
}) => {
  const isApple = platform === "apple";

  // Duplicate the list for a seamless infinite loop
  const looped = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <div className={`platform-card ${isApple ? "apple" : "google"}`}>
      <div className="platform-header">
        <div className="platform-info">
          <div className="platform-details">
            <div className="platform-name-container">
              <h4 className="platform-name">
                {isApple ? "App Store" : "Google Play"}
              </h4>
              {isApple ? <AppleIcon /> : <GoogleIcon />}
            </div>
            <div className="platform-rating">
              <span className="rating-value">{rating.toFixed(1)}</span>
              <StarRating rating={rating} />
              <span className="rating-count">
                ({reviewCount.toLocaleString("sv-SE")} omdömen)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal, auto-animated carousel (no manual scroll) */}
      <div className="reviews-viewport" aria-label="Kundomdömen karusell">
        <div className="reviews-track">
          {looped.map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="review-card review-card--carousel"
              role="group"
              aria-roledescription="slide"
              aria-label={`${review.author} – ${review.rating} av 5`}
              tabIndex={0}
            >
              <div className="review-header">
                <StarRating rating={review.rating} />
                <span className="review-author">{review.author}</span>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RatingsSection: React.FC = () => {
  const appleReviews: Review[] = [
    {
      id: 1,
      text: "Fantastisk app! Enkelt att använda och bra utbetalningar.",
      author: "Anna K.",
      rating: 5,
    },
    {
      id: 2,
      text: "Bästa enkätappen jag använt. Snabba utbetalningar via Swish!",
      author: "Erik M.",
      rating: 5,
    },
    {
      id: 3,
      text: "Trovärdig och säker. Rekommenderar starkt!",
      author: "Lisa P.",
      rating: 4,
    },
  ];

  const googleReviews: Review[] = [
    {
      id: 1,
      text: "Trovärdig, cashback och erbjuder roliga spel i appen! Varje enkät och spel är underhållande.",
      author: "Randy M.G.",
      rating: 5,
    },
    {
      id: 2,
      text: "Bästa panelen jag testat. Bra support och många undersökningar.",
      author: "Erik L.",
      rating: 5,
    },
    {
      id: 3,
      text: "Trodde inte det var så enkelt att tjäna pengar på enkäter!",
      author: "Maria P.",
      rating: 4,
    },
  ];

  return (
    <div className="ratings-section">
      <div className="ratings-header">
        <h2 className="ratings-headline">
          Vi har betalat ut mer än{" "}
          <span className="highlight">7 000 000 kr</span> <br /> till våra
          användare!
        </h2>
        <p className="ratings-desc">
          SveaPanelen har tusentals nöjda användare och ett av de högsta betygen
          i branschen.
        </p>
      </div>

      <div className="platforms-container">
        <ReviewsPlatform
          platform="apple"
          rating={4.5}
          reviewCount={2200}
          reviews={appleReviews}
        />

        <ReviewsPlatform
          platform="google"
          rating={4.3}
          reviewCount={875}
          reviews={googleReviews}
        />
      </div>
    </div>
  );
};

export default RatingsSection;
