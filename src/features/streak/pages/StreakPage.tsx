import { useState } from "react";
import { Flame, Check } from "lucide-react";
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

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const StreakPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("streak");

  const { data: stats, isLoading: statsLoading } = useStreakStats();
  const { data: completionsRes, isLoading: compLoading } =
    useStreakCompletions();
  const { data: toplistRes, isLoading: toplistLoading } = useStreakToplist();

  console.log(completionsRes, stats);

  const completions = completionsRes?.data ?? [];

  if ((statsLoading || compLoading) && !stats) {
    return <StreakSkeleton />;
  }

  const todayStr = toDateStr(new Date());
  const completedToday = stats?.lastCompletedLocalDate === todayStr;

  return (
    <div className="streak-page">
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
        {activeTab === "streak" ? (
          <>
            <div className="streak-hero">
              <div className="streak-hero-inner">
                <Flame size={60} className="streak-fire-emoji" />
                <span className="streak-hero-count">
                  {stats?.currentStreak ?? 0}
                </span>
              </div>
              <div className="streak-hero-label">dagars streak</div>
              <div
                className={`streak-hero-status${completedToday ? " done" : ""}`}
              >
                {completedToday ? (
                  <>
                    Slutförd idag! <Check size={16} />
                  </>
                ) : (
                  "Ej slutförd idag"
                )}
              </div>
            </div>

            <WeeklyProgress completions={completions} />

            <div className="streak-how-to">
              <h3 className="streak-how-to-title">Slutför din streak</h3>
              <p className="streak-how-to-desc">
                Spela spel, svara på enkäter eller handla med cashback.
              </p>
            </div>

            {stats && stats.longestStreak > 0 && (
              <div className="streak-personal-best">
                <span className="streak-pb-label">Längsta streak</span>
                <span className="streak-pb-value">
                  <Flame size={16} /> {stats.longestStreak} dagar
                </span>
              </div>
            )}
          </>
        ) : (
          <StreakLeaderboard
            toplist={toplistRes?.data ?? []}
            isLoading={toplistLoading}
          />
        )}
      </div>
    </div>
  );
};

export default StreakPage;
