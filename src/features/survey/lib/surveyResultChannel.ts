/**
 * Cross-window communication between a survey provider's callback page
 * (`/survey/complete`) and the main app window that opened the survey.
 *
 * The callback window broadcasts the result, then closes itself.
 * The main window listens, shows the reward popup, and refreshes data.
 */

export const SURVEY_RESULT_CHANNEL = "svea-survey-result";

export type SurveyResultStatus = "complete" | "screenout" | "quotafull";

export interface SurveyResultMessage {
  status: SurveyResultStatus;
  projectId: string | null;
  reward: number | null;
  currency: string | null;
}

export function parseSurveyResultFromURL(
  search: string,
): SurveyResultMessage | null {
  const params = new URLSearchParams(search);
  const rawStatus = params.get("status");
  if (
    rawStatus !== "complete" &&
    rawStatus !== "screenout" &&
    rawStatus !== "quotafull"
  ) {
    return null;
  }
  const rewardParam = params.get("reward");
  const reward =
    rewardParam != null && rewardParam !== "" ? Number(rewardParam) : null;
  return {
    status: rawStatus,
    projectId: params.get("project_id"),
    reward: Number.isFinite(reward) ? reward : null,
    currency: params.get("currency"),
  };
}
