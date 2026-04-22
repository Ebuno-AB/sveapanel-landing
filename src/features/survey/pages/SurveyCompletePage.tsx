import { useEffect, useState } from "react";
import {
  SURVEY_RESULT_CHANNEL,
  parseSurveyResultFromURL,
  type SurveyResultMessage,
} from "@/features/survey/lib/surveyResultChannel";
import "@/features/survey/styles/SurveyCompletePage.css";

/**
 * Landing page that survey providers redirect to after the user finishes,
 * screens out, or hits a full quota. It broadcasts the result to the
 * dashboard window and attempts to close itself.
 *
 * If `window.close()` is blocked (common on mobile browsers), a fallback
 * message is shown instructing the user to close the window manually.
 */
const SurveyCompletePage = () => {
  const [result, setResult] = useState<SurveyResultMessage | null>(null);
  const [closeBlocked, setCloseBlocked] = useState(false);

  useEffect(() => {
    const parsed = parseSurveyResultFromURL(window.location.search);
    setResult(parsed);

    if (parsed) {
      try {
        const bc = new BroadcastChannel(SURVEY_RESULT_CHANNEL);
        bc.postMessage(parsed);
        bc.close();
      } catch {
        // BroadcastChannel not supported — the dashboard focus handler
        // will still refresh data when the user returns.
      }
    }

    // Try to close the window. Works reliably for popups opened via
    // window.open(); may be ignored on mobile where it falls back to a tab.
    const closeTimer = window.setTimeout(() => {
      window.close();
      window.setTimeout(() => setCloseBlocked(true), 400);
    }, 150);

    return () => window.clearTimeout(closeTimer);
  }, []);

  const heading =
    result?.status === "complete"
      ? "Tack för ditt svar!"
      : result?.status === "screenout"
        ? "Tyvärr matchade du inte enkäten"
        : result?.status === "quotafull"
          ? "Enkäten är full"
          : "Klart!";

  const subheading =
    result?.status === "complete"
      ? "Din belöning är på väg in på ditt konto."
      : "Inga problem - fler enkäter väntar på dig.";

  return (
    <div className="survey-complete-page">
      <div className="survey-complete-card">
        <h1>{heading}</h1>
        <p>{subheading}</p>
        {closeBlocked && (
          <p className="survey-complete-hint">
            Du kan stänga det här fönstret och gå tillbaka till SveaPanelen.
          </p>
        )}
      </div>
    </div>
  );
};

export default SurveyCompletePage;
