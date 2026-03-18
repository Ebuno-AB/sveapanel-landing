import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import type {
  CashbackFeedSection,
  CashbackCategory,
  CashbackStore,
} from "../types/cashback.types";

export const cashbackApi = {
  getFeedSections: () =>
    httpClient.get<CashbackFeedSection[]>(ENDPOINTS.cashback.feedSections),
  getCategories: () =>
    httpClient.get<CashbackCategory[]>(ENDPOINTS.cashback.categories),
  getStores: () => httpClient.get<CashbackStore[]>(ENDPOINTS.cashback.stores),
  getFeaturedStore: () =>
    httpClient.get<CashbackStore>(ENDPOINTS.cashback.featuredStore),
};
