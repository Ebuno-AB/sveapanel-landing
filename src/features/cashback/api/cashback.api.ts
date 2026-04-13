import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import type {
  CashbackFeedSection,
  CashbackCategory,
  CashbackStore,
  CashbackStoreDetails,
} from "../types/cashback.types";

export const cashbackApi = {
  getFeedSections: () =>
    httpClient.get<CashbackFeedSection[]>(ENDPOINTS.cashback.feedSections),
  getCategories: () =>
    httpClient.get<CashbackCategory[]>(ENDPOINTS.cashback.categories),
  getStores: () => httpClient.get<CashbackStore[]>(ENDPOINTS.cashback.stores),
  getFeaturedStore: () =>
    httpClient.get<CashbackStore>(ENDPOINTS.cashback.featuredStore),
  getStoreDetail: (storeId: number) =>
    httpClient.get<CashbackStoreDetails>(
      ENDPOINTS.cashback.storeDetail(storeId),
    ),
  createTrackingLink: (storeId: number, source = "dashboard-handla") =>
    httpClient.post<{ url: string }>(ENDPOINTS.cashback.createTrackingLink, {
      storeId,
      source,
    }),
};
