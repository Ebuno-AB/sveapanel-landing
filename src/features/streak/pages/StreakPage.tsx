import { useState, useCallback } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import fireLottie from "@/assets/icons/Fire.lottie";
import {
  useStreakStats,
  useStreakCompletions,
  useStreakToplist,
} from "../api/streak.queries";
import WeeklyProgress from "../components/WeeklyProgress";
import StreakLeaderboard from "../components/StreakLeaderboard";
import StreakSkeleton from "../components/StreakSkeleton";
import "@/features/streak/styles/StreakPage.css";

type TabId = "streak" | "toplist";

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

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.42, 0, 1, 1] },
  },
};

const StreakPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("streak");

  const dotLottieRef = useCallback((instance: DotLottie | null) => {
    if (!instance) return;
    instance.addEventListener("load", () => {
      instance.setSpeed(0.2);
    });
  }, []);

  const { data: stats, isLoading: statsLoading } = useStreakStats();
  const { data: completionsRes, isLoading: compLoading } =
    useStreakCompletions();
  const { data: toplistRes, isLoading: toplistLoading } = useStreakToplist();

  const completions = completionsRes?.entries ?? [];

  if ((statsLoading || compLoading) && !stats) {
    return <StreakSkeleton />;
  }

  const completedToday = stats?.hasCompletedToday ?? false;
  const statistics = stats
    ? [
        {
          label: "Nuvarande",
          value: String(stats.currentStreak),
          accent: true,
        },
        {
          label: "Rank",
          value: stats.currentRank !== null ? `#${stats.currentRank}` : "-",
        },
        {
          label: "Bästa rank",
          value: stats.bestRank !== null ? `#${stats.bestRank}` : "-",
        },
        {
          label: "Längsta",
          value: String(stats.longestStreak),
        },
      ]
    : [];

  return (
    <div className="streak-page">
      <div className="streak-page-inner">
        <h2 className="page-title">
          <FontAwesomeIcon icon={faFireFlameCurved} /> Streak
        </h2>
      </div>
      <div className="streak-tab-switcher-wrap">
        <div className="streak-tab-switcher">
          <button
            className={`streak-tab-btn${activeTab === "streak" ? " active" : ""}`}
            onClick={() => setActiveTab("streak")}
          >
            Streak
          </button>
          <button
            className={`streak-tab-btn${activeTab === "toplist" ? " active" : ""}`}
            onClick={() => setActiveTab("toplist")}
          >
            Topplista
          </button>
        </div>
      </div>

      <div className="streak-content">
        <AnimatePresence mode="wait">
          {activeTab === "streak" ? (
            <motion.div
              key="streak"
              variants={tabContentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="streak-card-stack"
              >
                <motion.div className="streak-hero" variants={cardVariants}>
                  <div className="streak-hero-inner">
                    <DotLottieReact
                      src={fireLottie}
                      autoplay
                      loop
                      dotLottieRefCallback={dotLottieRef}
                      style={{
                        width: 120,
                        height: 120,
                      }}
                    />
                    <div className="streak-hero-text">
                      <span className="streak-hero-count">
                        {stats?.currentStreak ?? 0}
                      </span>
                      <div className="streak-hero-label">dagars streak</div>
                      <div
                        className={`streak-hero-status${completedToday ? " done" : ""}`}
                      >
                        {completedToday ? (
                          <>
                            <FontAwesomeIcon icon={faCircleCheck} /> Slutförd
                            idag
                          </>
                        ) : (
                          "Ej slutförd idag"
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={cardVariants}>
                  <WeeklyProgress completions={completions} />
                </motion.div>

                <motion.div className="streak-how-to" variants={cardVariants}>
                  <h3 className="streak-how-to-title">Slutför din streak</h3>
                  <p className="streak-how-to-desc">
                    Spela spel, svara på enkäter eller handla med cashback.
                  </p>
                </motion.div>

                {stats && (
                  <motion.section
                    className="streak-statistics-card"
                    variants={cardVariants}
                  >
                    <h3 className="streak-statistics-title">Statistik</h3>
                    <div className="streak-statistics-grid">
                      {statistics.map((item) => (
                        <div
                          className="streak-statistics-item"
                          key={item.label}
                        >
                          <span
                            className={`streak-statistics-value${item.accent ? " accent" : ""}`}
                          >
                            {item.value}
                          </span>
                          <span className="streak-statistics-label">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="toplist"
              variants={tabContentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <StreakLeaderboard
                toplist={toplistRes?.entries ?? []}
                isLoading={toplistLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StreakPage;
