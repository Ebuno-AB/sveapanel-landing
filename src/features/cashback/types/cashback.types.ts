export type CashbackRate = {
  type: "percentage" | "fixed";
  amount: number;
  currency: string | null;
};

export type CashbackCategory = {
  id: number;
  name: string;
  slug: string;
  iconUrl: string | null;
  coverImageUrl: string | null;
  sortOrder: number;
  storeCount?: number;
};

export type CashbackProvider = {
  id: number;
  name: string;
  slug: string;
};

export type CashbackStore = {
  id: number;
  provider: CashbackProvider;
  providerId: number;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  cashback: CashbackRate | null;
  hasMultipleCommissionGroups: boolean;
  isActive: boolean;
  categories?: CashbackCategory[];
  slug?: string | null;
  tags: string | null;
  productFeed: boolean;
};

export type CashbackFeedSection = {
  id: number;
  title: string;
  description: string | null;
  cardVariant: string | null;
  sectionType: string;
  stores: CashbackStore[];
};

export type CashbackCommissionGroup = {
  name: string;
  type: "percentage" | "fixed";
  amount: number;
  fullAmount: number;
  currency: string | null;
};

export type CashbackStoreTerm = {
  title: string;
  description: string;
};

export type CashbackCoverGradient = {
  from: string;
  to: string;
};

export type CashbackStoreDetails = CashbackStore & {
  commissionGroups: CashbackCommissionGroup[];
  terms: string | null;
  storeTerms: CashbackStoreTerm[];
  coverImageUrl: string | null;
  coverGradient: CashbackCoverGradient | null;
};

export type PendingBalance = {
  totalPending: number;
  fullTotalPending: number;
  totalApproved: number;
  fullTotalApproved: number;
  currency: string;
  pendingCount: number;
  approvedCount: number;
};
