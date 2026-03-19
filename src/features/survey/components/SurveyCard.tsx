import { Clock, ArrowRight } from "lucide-react";
import "@/features/survey/styles/SurveyCard.css";
import type { Survey } from "@/features/survey/api/survey.api";
import StarRating from "./StarRating";

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
          <>
            <img
              src={survey.image}
              alt={survey.provider}
              className="survey-provider-logo"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const fallback = (e.target as HTMLImageElement)
                  .nextElementSibling as HTMLElement | null;
                if (fallback) fallback.hidden = false;
              }}
            />
            <span className="survey-provider" hidden>
              {survey.provider}
            </span>
          </>
        ) : (
          <span className="survey-provider">{survey.provider}</span>
        )}
        <span className="badge badge-time">
          <Clock size={12} strokeWidth={2.5} />
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

      <button
        className="survey-cta"
        onClick={(e) => {
          e.stopPropagation();
          handleStart();
        }}
      >
        Starta <ArrowRight size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default SurveyCard;
