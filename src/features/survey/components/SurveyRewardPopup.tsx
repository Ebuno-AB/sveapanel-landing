import { useEffect } from "react";
import { CircleX, PartyPopper, Frown } from "lucide-react";
import type { SurveyResultMessage } from "@/features/survey/lib/surveyResultChannel";
import "@/features/survey/styles/SurveyRewardPopup.css";

interface SurveyRewardPopupProps {
  result: SurveyResultMessage | null;
  onClose: () => void;
}

function SurveyRewardPopup({ result, onClose }: SurveyRewardPopupProps) {
  useEffect(() => {
    if (!result) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [result, onClose]);

  if (!result) return null;

  const isComplete = result.status === "complete";

  return (
    <div className="survey-reward-overlay" onClick={onClose}>
      <div className="survey-reward-popup" onClick={(e) => e.stopPropagation()}>
        <button
          className="survey-reward-close"
          onClick={onClose}
          aria-label="Stäng"
        >
          <CircleX size={22} strokeWidth={1.75} />
        </button>

        <div
          className={`survey-reward-icon ${isComplete ? "success" : "neutral"}`}
        >
          {isComplete ? (
            <PartyPopper size={40} strokeWidth={2} />
          ) : (
            <Frown size={40} strokeWidth={2} />
          )}
        </div>

        {isComplete ? (
          <>
            <h2 className="survey-reward-title">Grattis!</h2>
            {result.reward != null ? (
              <div className="survey-reward-amount">
                +{result.reward}
                <span className="survey-reward-currency">
                  {result.currency ?? "kr"}
                </span>
              </div>
            ) : null}
            <p className="survey-reward-text">
              Din belöning har lagts till på ditt konto.
            </p>
          </>
        ) : (
          <>
            <h2 className="survey-reward-title">
              {result.status === "quotafull"
                ? "Enkäten var full"
                : "Ingen match den här gången"}
            </h2>
            <p className="survey-reward-text">
              Inga problem - fler enkäter väntar på dig.
            </p>
          </>
        )}

        <button className="survey-reward-cta" onClick={onClose}>
          Stäng
        </button>
      </div>
    </div>
  );
}

export default SurveyRewardPopup;
