import type { CashbackRate } from "../types/cashback.types";

export function formatCashback(rate: CashbackRate | null | undefined): string {
  if (!rate) return "";

  if (rate.type === "percentage") {
    const n = Number(rate.amount) * 100;
    const str = n % 1 === 0 ? n.toFixed(0) : n.toFixed(1).replace(/\.0$/, "");
    return `${str}%`;
  }

  if (rate.type === "fixed") {
    const currency = rate.currency ?? "kr";
    return `${rate.amount} ${currency}`;
  }

  return "";
}
