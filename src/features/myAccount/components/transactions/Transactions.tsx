import { useQuery } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  Wallet,
  Swords,
  Trophy,
  ClipboardList,
  Gift,
  Flame,
  Users,
  ArrowUpCircle,
} from "lucide-react";
import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import { queryKeys } from "@/core/query/queryKeys";
import { useAuthStore } from "@/core/auth/authStore";
import { useUser } from "@/features/user/api/user.queries";
import "./Transactions.css";

interface TransactionRow {
  id: number;
  userId: number;
  transactionTag: string;
  amount: number;
  ingoingBalance: number;
  outgoingBalance: number;
  timestamp: string;
}

interface WithdrawRow {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
}

const TAG_LABELS: Record<string, string> = {
  DUEL_WIN: "Duel Vinst",
  DUEL_WIN_OPPONENT_QUIT: "Duel Vinst (motståndare lämnade)",
  DUEL: "Duell",
  SURVEY: "Enkät",
  WITHDRAWAL: "Uttag",
  REFERRAL: "Väntjänst",
  BONUS: "Bonus",
  CASHBACK: "Cashback",
  STREAK: "Streak",
};

function getTagLabel(tag: string): string {
  return TAG_LABELS[tag] ?? tag;
}

function TagIcon({ tag }: { tag: string }) {
  if (tag === "DUEL_WIN" || tag === "DUEL_WIN_OPPONENT_QUIT") {
    return (
      <span className="tx-row__icon tx-row__icon--win">
        <Trophy size={16} />
      </span>
    );
  }
  if (tag.startsWith("DUEL")) {
    return (
      <span className="tx-row__icon tx-row__icon--duel">
        <Swords size={16} />
      </span>
    );
  }
  if (tag === "SURVEY") {
    return (
      <span className="tx-row__icon tx-row__icon--survey">
        <ClipboardList size={16} />
      </span>
    );
  }
  if (tag === "WITHDRAWAL") {
    return (
      <span className="tx-row__icon tx-row__icon--withdrawal">
        <ArrowUpCircle size={16} />
      </span>
    );
  }
  if (tag === "REFERRAL") {
    return (
      <span className="tx-row__icon tx-row__icon--referral">
        <Users size={16} />
      </span>
    );
  }
  if (tag === "BONUS") {
    return (
      <span className="tx-row__icon tx-row__icon--bonus">
        <Gift size={16} />
      </span>
    );
  }
  if (tag === "STREAK") {
    return (
      <span className="tx-row__icon tx-row__icon--streak">
        <Flame size={16} />
      </span>
    );
  }
  return (
    <span className="tx-row__icon tx-row__icon--default">
      <Wallet size={16} />
    </span>
  );
}

function formatAmount(n: number): string {
  const abs = Math.abs(n) / 10;
  return `${abs % 1 === 0 ? abs.toFixed(1) : abs}kr`;
}

function formatBalance(n: number): string {
  const val = n / 10;
  return `${val % 1 === 0 ? val.toFixed(1) : val}kr`;
}

function formatDate(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });
}

export const Transactions = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: user } = useUser();

  const { data: transactions, isLoading: txLoading } = useQuery({
    queryKey: queryKeys.user.transactions(user?.id ?? 0),
    queryFn: () => httpClient.get<unknown>(ENDPOINTS.user.transactions),
    select: (res): TransactionRow[] => {
      if (Array.isArray(res)) return res;
      const obj = res as Record<string, unknown>;
      const inner = obj.transactions ?? obj.data ?? obj.rows ?? obj.items ?? [];
      return Array.isArray(inner) ? (inner as TransactionRow[]) : [];
    },
    enabled: isAuthenticated && !!user,
  });

  const { data: withdrawHistory } = useQuery({
    queryKey: queryKeys.cashout.history,
    queryFn: () => httpClient.get<unknown>(ENDPOINTS.cashout.history),
    select: (res): WithdrawRow[] => {
      if (Array.isArray(res)) return res;
      const obj = res as Record<string, unknown>;
      const inner = obj.withdrawals ?? obj.data ?? obj.rows ?? obj.items ?? [];
      return Array.isArray(inner) ? (inner as WithdrawRow[]) : [];
    },
    enabled: isAuthenticated,
  });

  const totalEarned = user?.totalEarned ?? 0;

  const totalWithdrawn =
    withdrawHistory?.reduce((sum, w) => sum + w.amount, 0) ?? 0;

  const saldo = user?.balance ?? 0;

  return (
    <div className="tx">
      <h2 className="tx__title">Mina transaktioner</h2>

      {/* Summary cards */}
      <div className="tx__summary">
        <div className="tx__summary-card">
          <span className="tx__summary-icon tx__summary-icon--earned">
            <ArrowDown size={18} />
          </span>
          <span className="tx__summary-amount">
            {txLoading ? (
              <span className="tx__skel tx__skel--sm" />
            ) : (
              `${formatBalance(totalEarned)}`
            )}
          </span>
          <span className="tx__summary-label">Intjänat</span>
        </div>

        <div className="tx__summary-card">
          <span className="tx__summary-icon tx__summary-icon--withdrawn">
            <ArrowUp size={18} />
          </span>
          <span className="tx__summary-amount">
            {txLoading ? (
              <span className="tx__skel tx__skel--sm" />
            ) : (
              `${formatBalance(totalWithdrawn)}`
            )}
          </span>
          <span className="tx__summary-label">Uttaget</span>
        </div>

        <div className="tx__summary-card">
          <span className="tx__summary-icon tx__summary-icon--balance">
            <Wallet size={18} />
          </span>
          <span className="tx__summary-amount">
            {!user ? (
              <span className="tx__skel tx__skel--sm" />
            ) : (
              `${formatBalance(saldo)}`
            )}
          </span>
          <span className="tx__summary-label">Saldo</span>
        </div>
      </div>

      {/* History list */}
      <h3 className="tx__section-title">Historik</h3>

      {txLoading && (
        <div className="tx__list">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="tx-row tx-row--skeleton">
              <span className="tx__skel tx__skel--icon" />
              <div className="tx-row__info">
                <span className="tx__skel tx__skel--label" />
                <span className="tx__skel tx__skel--date" />
              </div>
              <div className="tx-row__amounts">
                <span className="tx__skel tx__skel--amount" />
                <span className="tx__skel tx__skel--balance" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!txLoading && transactions?.length === 0 && (
        <p className="tx__empty">Inga transaktioner ännu.</p>
      )}

      {!txLoading && transactions && transactions.length > 0 && (
        <div className="tx__list">
          {transactions.map((tx) => (
            <div key={tx.id} className="tx-row">
              <TagIcon tag={tx.transactionTag} />
              <div className="tx-row__info">
                <span className="tx-row__label">
                  {getTagLabel(tx.transactionTag)}
                </span>
                <span className="tx-row__date">{formatDate(tx.timestamp)}</span>
              </div>
              <div className="tx-row__amounts">
                <span
                  className={`tx-row__change tx-row__change--${tx.amount >= 0 ? "pos" : "neg"}`}
                >
                  {tx.amount >= 0 ? "+" : "-"}
                  {formatAmount(tx.amount)}
                </span>
                <span className="tx-row__balance">
                  {formatBalance(tx.outgoingBalance)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
