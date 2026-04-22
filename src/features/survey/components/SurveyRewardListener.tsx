import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/queryKeys";
import {
  SURVEY_RESULT_CHANNEL,
  type SurveyResultMessage,
} from "@/features/survey/lib/surveyResultChannel";
import SurveyRewardPopup from "./SurveyRewardPopup";

/**
 * Subscribes to survey-completion broadcasts from the /survey/complete
 * popup window and shows the reward popup. Also refreshes surveys + user
 * data when the main window regains focus, so balance stays fresh even
 * if the broadcast is missed (e.g. user closed the popup manually).
 */
function SurveyRewardListener() {
  const queryClient = useQueryClient();
  const [result, setResult] = useState<SurveyResultMessage | null>(null);

  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel(SURVEY_RESULT_CHANNEL);
      bc.onmessage = (event) => {
        const data = event.data as SurveyResultMessage | undefined;
        if (!data) return;
        setResult(data);
        queryClient.invalidateQueries({ queryKey: queryKeys.survey.available });
        queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      };
    } catch {
      // BroadcastChannel not supported — focus handler below still refreshes.
    }

    const onFocus = () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.survey.available });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    };
    window.addEventListener("focus", onFocus);

    return () => {
      bc?.close();
      window.removeEventListener("focus", onFocus);
    };
  }, [queryClient]);

  return <SurveyRewardPopup result={result} onClose={() => setResult(null)} />;
}

export default SurveyRewardListener;
