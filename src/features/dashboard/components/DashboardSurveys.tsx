import { useState, useMemo, useEffect } from "react";
import { Clipboard, Star, Coins, Timer } from "lucide-react";
import { useSurveys } from "@/features/survey/api/survey.queries";
import SurveyCard from "@/features/survey/components/SurveyCard";
import SurveyModal from "@/features/survey/components/SurveyModal";
import type { Survey } from "@/features/survey/api/survey.api";

type SortOption = "recommended" | "reward" | "shortest";

const getPageSize = () => (window.innerWidth < 769 ? 4 : 8);

export const DashboardSurveys = () => {
  const { data: surveys, isLoading } = useSurveys();
  const [visibleCount, setVisibleCount] = useState(() => getPageSize());
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 690);

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 690);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sortedSurveys = useMemo(() => {
    if (!surveys) return [];
    const result = [...surveys];
    if (sortBy === "recommended") {
      return result.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    } else if (sortBy === "reward") {
      return result.sort(
        (a, b) => (b.reward?.amount ?? 0) - (a.reward?.amount ?? 0),
      );
    } else {
      return result.sort((a, b) => (a.loi ?? 0) - (b.loi ?? 0));
    }
  }, [surveys, sortBy]);

  return (
    <section className="dashboard-section">
      <SurveyModal
        survey={selectedSurvey}
        onClose={() => setSelectedSurvey(null)}
      />
      <div className="section-header">
        <h3 className="section-title">Enkäter för dig</h3>
        {surveys && surveys.length > 0 && (
          <span className="survey-count-badge">
            <Clipboard size={13} strokeWidth={2.5} />
            {Math.min(visibleCount, surveys.length)} av {surveys.length}
          </span>
        )}
      </div>

      {isCompact ? (
        <select
          className="survey-sort-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as SortOption);
            setVisibleCount(getPageSize());
          }}
          aria-label="Sortera enkäter"
        >
          <option value="recommended">Rekommenderad</option>
          <option value="reward">Högst belöning</option>
          <option value="shortest">Kortast</option>
        </select>
      ) : (
        <div className="survey-sort-chips">
          <button
            className={`survey-sort-chip${sortBy === "recommended" ? " active" : ""}`}
            onClick={() => {
              setSortBy("recommended");
              setVisibleCount(getPageSize());
            }}
          >
            <Star size={13} strokeWidth={2.5} /> Rekommenderad
          </button>
          <button
            className={`survey-sort-chip${sortBy === "reward" ? " active" : ""}`}
            onClick={() => {
              setSortBy("reward");
              setVisibleCount(getPageSize());
            }}
          >
            <Coins size={13} strokeWidth={2.5} /> Högst belöning
          </button>
          <button
            className={`survey-sort-chip${sortBy === "shortest" ? " active" : ""}`}
            onClick={() => {
              setSortBy("shortest");
              setVisibleCount(getPageSize());
            }}
          >
            <Timer size={13} strokeWidth={2.5} /> Kortast
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="survey-grid">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="survey-card"
              style={{ opacity: 0.4, pointerEvents: "none" }}
            >
              <div className="survey-card-top">
                <div
                  style={{
                    width: 70,
                    height: 18,
                    background: "#e5e5e5",
                    borderRadius: 6,
                  }}
                />
                <div className="survey-badges">
                  <div
                    style={{
                      width: 52,
                      height: 22,
                      background: "#e5e5e5",
                      borderRadius: 10,
                    }}
                  />
                  <div
                    style={{
                      width: 52,
                      height: 22,
                      background: "#e5e5e5",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
              <div className="survey-reward">
                <div
                  style={{
                    width: 80,
                    height: 28,
                    background: "#e5e5e5",
                    borderRadius: 8,
                    margin: "0 auto",
                  }}
                />
              </div>
              <div
                style={{
                  width: "80%",
                  height: 34,
                  background: "#e5e5e5",
                  borderRadius: 14,
                  margin: "0 auto",
                }}
              />
            </div>
          ))}
        </div>
      ) : sortedSurveys.length > 0 ? (
        <>
          <div className="survey-grid">
            {sortedSurveys.slice(0, visibleCount).map((s) => (
              <SurveyCard
                key={s.project_id}
                survey={s}
                onSelect={setSelectedSurvey}
              />
            ))}
          </div>
          {visibleCount < sortedSurveys.length && (
            <div className="survey-load-more">
              <button
                className="survey-load-more-btn"
                onClick={() => setVisibleCount((c) => c + getPageSize())}
              >
                Visa fler
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="survey-empty">
          <div className="survey-empty-icon">📋</div>
          <h3>Inga enkäter just nu</h3>
          <p>Kom tillbaka senare — nya enkäter dyker upp regelbundet.</p>
        </div>
      )}
    </section>
  );
};
