import React from "react";
import "./UserReviews.css";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="ur-stars" aria-label={`${rating} av 5 stjärnor`}>
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "ur-star filled" : "ur-star"}>
        ★
      </span>
    ))}
  </div>
);

interface ReviewCardProps {
  title: string;
  text: string;
  rating: number;
  author: string;
  source: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  text,
  rating,
  author,
  source,
}) => (
  <div className="ur-card">
    <h3 className="ur-card-title">{title}</h3>
    <p className="ur-card-text">{text}</p>
    <StarRating rating={rating} />
    <p className="ur-card-author">
      {author}, {source}
    </p>
  </div>
);

const reviews: ReviewCardProps[] = [
  {
    title: "Fantastisk app!",
    text: "Fantastisk app! Enkelt att använda och bra utbetalningar. Jag behövde något som motiverade mig – det här är perfekt.",
    rating: 5,
    author: "Anna K.",
    source: "App Store",
  },
  {
    title: "Enastående",
    text: "Den här appen har motiverat mig att utforska mer. Ju mer jag använder den, desto mer hittar jag saker att göra och tjäna pengar på.",
    rating: 5,
    author: "Randy M.G.",
    source: "Google Play",
  },
  {
    title: "Utforskar igen",
    text: "Bästa panelen jag testat. Bra support, snabba utbetalningar via Swish och en trevlig app att använda varje dag.",
    rating: 5,
    author: "Erik L.",
    source: "Google Play",
  },
];

const UserReviews: React.FC = () => {
  return (
    <section className="ur-section">
      <div className="ur-inner">
        <div className="ur-header">
          <h2 className="ur-title">Vad våra användare tycker</h2>
          <p className="ur-subtitle">
            <span className="ur-stars-text">4,5 stjärnor</span> på App Store
          </p>
        </div>
        <div className="ur-cards">
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReviews;
