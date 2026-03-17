import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import type {
  CashbackFeedSection,
  CashbackCategory,
} from "../types/cashback.types";

export const cashbackApi = {
  getFeedSections: () =>
    httpClient.get<CashbackFeedSection[]>(ENDPOINTS.cashback.feedSections),
  getCategories: () =>
    httpClient.get<CashbackCategory[]>(ENDPOINTS.cashback.categories),
};
