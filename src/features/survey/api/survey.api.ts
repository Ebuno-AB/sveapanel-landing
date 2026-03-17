import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";

export type Survey = {
  project_id: number;
  provider: string;
  conversion: number;
  entry: string;
  image: string;
  score: number;
  loi: number;
  reward: {
    currency: string;
    amount: number;
  };
  additional: Record<string, unknown>;
};

export const surveyApi = {
  getSurveys: () => httpClient.get<Survey[]>(ENDPOINTS.survey.available),
};
