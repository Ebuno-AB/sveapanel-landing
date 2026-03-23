import { useEffect } from "react";
import { CircleX, Clock, ArrowRight } from "lucide-react";
import type { Survey } from "@/features/survey/api/survey.api";
import StarRating from "./StarRating";
import "@/features/survey/styles/SurveyModal.css";

interface SurveyModalProps {
  survey: Survey | null;
  onClose: () => void;
}

function SurveyModal({ survey, onClose }: SurveyModalProps) {
  useEffect(() => {
    if (!survey) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [survey, onClose]);

  if (!survey) return null;

  const handleBegin = () => {
    if (survey.entry) {
      window.open(survey.entry, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  return (
    <div className="survey-modal-overlay" onClick={onClose}>
      <div className="survey-modal" onClick={(e) => e.stopPropagation()}>
        <div className="survey-modal-topbar">
          <div className="survey-modal-provider-wrap">
            {survey.image ? (
              <img
                src={survey.image}
                alt={survey.provider}
                className="survey-modal-logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const fallback = (e.target as HTMLImageElement)
                    .nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.hidden = false;
                }}
              />
            ) : null}
            <span className="survey-modal-provider" hidden={!!survey.image}>
              {survey.provider}
            </span>
          </div>
          <div className="survey-modal-topbar-right">
            <span className="survey-modal-time">
              <Clock size={14} strokeWidth={2.5} />
              {survey.loi} minuter
            </span>
            <button
              className="survey-modal-close"
              onClick={onClose}
              aria-label="Stäng"
            >
              <CircleX size={24} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="survey-modal-reward">
          <span className="survey-modal-reward-amount">
            {survey.reward.amount}
            <span className="survey-modal-reward-currency">
              {survey.reward.currency}
            </span>
          </span>
        </div>

        <StarRating score={survey.score} />

        <button className="survey-modal-cta" onClick={handleBegin}>
          Starta enkät <ArrowRight size={16} strokeWidth={2.5} />
        </button>
        <span className="survey-modal-disclaimer">
          Man matchas inte alltid med enkäter man startar
        </span>
      </div>
    </div>
  );
}

export default SurveyModal;
