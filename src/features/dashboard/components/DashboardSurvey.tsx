import { useSurveys } from "@/features/survey/api/survey.queries";
import SurveyCard from "@/features/survey/components/SurveyCard";
import "@/features/survey/styles/SurveyCard.css";

const ClipboardIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

export const DashboardSurveys = () => {
  const { data: surveys, isLoading } = useSurveys();

  return (
    <section className="dashboard-section">
      <div className="section-header">
        <h3 className="section-title">Enkäter för dig</h3>
        {surveys && surveys.length > 0 && (
          <span className="survey-count-badge">
            <ClipboardIcon />
            {surveys.length}
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
        <div className="survey-grid">
          {surveys.map((s) => (
            <SurveyCard key={s.project_id} survey={s} />
          ))}
        </div>
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
