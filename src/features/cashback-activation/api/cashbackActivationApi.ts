import { env } from "@/core/config/env";

const API_URL = env.apiUrl;

export type CashbackRate = {
  type: "percentage" | "fixed";
  amount: number;
  currency: string | null;
};

export type CashbackCommissionGroup = {
  name: string;
  type: "percentage" | "fixed";
  amount: number;
  fullAmount: number;
  currency: string | null;
};

export type CashbackStoreTerm = {
  id: number;
  name: string;
  content: string;
  isGeneral: boolean;
};

export type CashbackStoreDetails = {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  trackingUrl: string | null;
  cashback: CashbackRate | null;
  commissionGroups: CashbackCommissionGroup[];
  terms: string | null;
  storeTerms: CashbackStoreTerm[];
  coverImageUrl: string | null;
  coverGradient: { startColor: string; endColor: string } | null;
};

export async function getStoreDetail(storeId: number, token?: string | null): Promise<CashbackStoreDetails> {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}cashback/stores/${storeId}`, { headers });
  if (!res.ok) throw new Error(`Store not found (${res.status})`);
  return res.json();
}

export async function getTrackingLink(
  storeId: number,
  token: string,
  source: string,
): Promise<string> {
  const res = await fetch(`${API_URL}/cashback/trackinglink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ storeId, source }),
  });
  if (!res.ok) throw new Error(`Failed to build tracking link (${res.status})`);
  const json = await res.json();
  return json.url as string;
}

export async function getTrackingLinkWithCode(
  storeId: number,
  code: string,
  source: string,
): Promise<string> {
  const res = await fetch(`${API_URL}/cashback/extension/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ storeId, code, source }),
  });
  if (!res.ok) throw new Error(`Failed to activate (${res.status})`);
  const json = await res.json();
  return json.url as string;
}

export function formatCashback(rate: CashbackRate): string {
  if (rate.type === "percentage") {
    return `${parseFloat((rate.amount * 100).toFixed(4))}% cashback`;
  }
  return `${rate.amount} ${rate.currency ?? "SEK"} cashback`;
}
