import { useState } from "react";
import { Clipboard } from "lucide-react";
import { useSurveys } from "@/features/survey/api/survey.queries";
import SurveyCard from "@/features/survey/components/SurveyCard";

const getPageSize = () => (window.innerWidth < 769 ? 4 : 8);

export const DashboardSurveys = () => {
  const { data: surveys, isLoading } = useSurveys();
  const [visibleCount, setVisibleCount] = useState(() => getPageSize());

  return (
    <section className="dashboard-section">
      <div className="section-header">
        <h3 className="section-title">Enkäter för dig</h3>
        {surveys && surveys.length > 0 && (
          <span className="survey-count-badge">
            <Clipboard size={13} strokeWidth={2.5} />
            {Math.min(visibleCount, surveys.length)} av {surveys.length}
          </span>
        )}
      </div>

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
      ) : surveys && surveys.length > 0 ? (
        <>
          <div className="survey-grid">
            {surveys.slice(0, visibleCount).map((s) => (
              <SurveyCard key={s.project_id} survey={s} />
            ))}
          </div>
          {visibleCount < surveys.length && (
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
