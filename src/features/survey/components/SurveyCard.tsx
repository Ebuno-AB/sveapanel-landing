import type { Survey } from "@/features/survey/api/survey.api";
import StarRating from "./StarRating";

const TimerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function SurveyCard({ survey }: { survey: Survey }) {
  const handleStart = () => {
    if (survey.entry) {
      window.open(survey.entry, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="survey-card" onClick={handleStart}>
      <div className="survey-card-top">
        {survey.image ? (
          <img
            src={survey.image}
            alt={survey.provider}
            className="survey-provider-logo"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : (
          <span className="survey-provider">{survey.provider}</span>
        )}
        <span className="badge badge-time">
          <TimerIcon />
          {survey.loi}min
        </span>
      </div>

      <div className="survey-reward">
        <span className="reward-amount">
          {survey.reward.amount}
          <span className="reward-currency">{survey.reward.currency}</span>
        </span>
      </div>

      <StarRating score={survey.score} />

      <button className="survey-cta" onClick={(e) => { e.stopPropagation(); handleStart(); }}>
        Starta <ArrowIcon />
      </button>
    </div>
  );
}

export default SurveyCard;
