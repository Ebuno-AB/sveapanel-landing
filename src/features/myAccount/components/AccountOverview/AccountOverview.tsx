import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Clock,
  Users,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { useUser } from "@/features/user/api/user.queries";
import { useSurveys } from "@/features/survey/api/survey.queries";
import { usePendingBalance } from "@/features/cashback/api/cashback.queries";
import "./AccountOverview.css";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const formatKr = (n: number) =>
  n.toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " kr";

export const AccountOverview = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: surveys } = useSurveys();
  const { data: pendingBalance } = usePendingBalance();
  const [copied, setCopied] = useState(false);

  const topSurveyReward =
    surveys && surveys.length > 0
      ? Math.max(...surveys.map((s) => s.reward.amount))
      : null;

  const handleCopyCode = () => {
    if (!user?.referralCode) return;
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overview">
      {/* Greeting */}
      <motion.div
        className="overview__greeting"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="overview__name">
          Hej,{" "}
          {userLoading ? (
            <span className="overview__skel overview__skel--name" />
          ) : (
            (user?.firstName ?? "du")
          )}
          !
        </h2>
        <p className="overview__subtitle">Här är din kontoöversikt</p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        className="overview__bento"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Balance card — full width */}
        <motion.div
          className="overview__card overview__card--balance"
          variants={cardVariants}
        >
          <div className="overview__card-header">
            <Wallet size={18} className="overview__card-icon" />
            <span className="overview__card-label">Saldo</span>
          </div>
          <div className="overview__balance-amount">
            {userLoading ? (
              <span className="overview__skel overview__skel--balance" />
            ) : (
              formatKr(user?.balance ?? 0)
            )}
          </div>
          <button
            className="overview__payout-btn"
            disabled={!user?.swishNumber}
            title={
              !user?.swishNumber
                ? "Lägg till Swish-nummer för att ta ut"
                : undefined
            }
          >
            Ta ut pengar <ChevronRight size={14} />
          </button>
        </motion.div>

        {/* Surveys card */}
        <motion.div
          className="overview__card overview__card--surveys"
          variants={cardVariants}
        >
          <div className="overview__card-header">
            <TrendingUp size={18} className="overview__card-icon" />
            <span className="overview__card-label">Enkäter</span>
          </div>
          <div className="overview__stat-number">
            {surveys === undefined ? (
              <span className="overview__skel overview__skel--number" />
            ) : (
              surveys.length
            )}
          </div>
          <p className="overview__stat-sub">
            {topSurveyReward != null
              ? `Upp till ${topSurveyReward} kr`
              : "tillgängliga"}
          </p>
          <ChevronRight className="overview__card-arrow" size={16} />
        </motion.div>

        {/* Pending balance card */}
        <motion.div
          className="overview__card overview__card--pending"
          variants={cardVariants}
        >
          <div className="overview__card-header">
            <Clock size={18} className="overview__card-icon" />
            <span className="overview__card-label">Kommande</span>
          </div>
          <div className="overview__stat-number">
            {pendingBalance === undefined ? (
              <span className="overview__skel overview__skel--number" />
            ) : (
              formatKr(pendingBalance ?? 0)
            )}
          </div>
          <p className="overview__stat-sub">Väntar på godkännande</p>
        </motion.div>

        {/* Referral card — full width */}
        <motion.div
          className="overview__card overview__card--referral"
          variants={cardVariants}
        >
          <div className="overview__card-header">
            <Users size={18} className="overview__card-icon" />
            <span className="overview__card-label">Bjud in vänner</span>
          </div>
          <p className="overview__referral-desc">
            Du och din vän får <strong>10 kr</strong> vardera — dela din kod!
          </p>
          <div className="overview__referral-row">
            <span className="overview__referral-code">
              {userLoading ? (
                <span className="overview__skel overview__skel--code" />
              ) : (
                (user?.referralCode ?? "-----")
              )}
            </span>
            <button
              className="overview__copy-btn"
              onClick={handleCopyCode}
              disabled={!user?.referralCode}
              aria-label="Kopiera värvningskod"
            >
              {copied ? (
                <>
                  <Check size={14} /> Kopierad!
                </>
              ) : (
                <>
                  <Copy size={14} /> Kopiera
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
