import { useSurveys } from "@/features/survey/api/survey.queries";
import { useUser } from "@/features/user/api/user.queries";
import SurveyCard from "@/features/survey/components/SurveyCard";
import "@/features/survey/styles/SurveyCard.css";
import "@/features/dashboard/styles/DashboardPage.css";

const ClipboardIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const DashboardPage = () => {
  const { data: user } = useUser();
  const { data: surveys, isLoading } = useSurveys();

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-hero-inner">
          <h2 className="dashboard-greeting">
            Hej, {user?.firstName ?? ""}!
          </h2>
          <p className="dashboard-subtitle">Välkommen tillbaka till SveaPanelen</p>

          <div className="dashboard-balance-row">
            <div className="dashboard-balance-card">
              <WalletIcon />
              <div>
                <div className="balance-label">Saldo</div>
                <div className="balance-amount">
                  {user?.balance != null ? `${user.balance / 10}kr` : "–"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Surveys */}
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
                <div key={i} className="survey-card" style={{ opacity: 0.4, pointerEvents: "none" }}>
                  <div className="survey-card-top">
                    <div style={{ width: 70, height: 18, background: "#e5e5e5", borderRadius: 6 }} />
                    <div className="survey-badges">
                      <div style={{ width: 52, height: 22, background: "#e5e5e5", borderRadius: 10 }} />
                      <div style={{ width: 52, height: 22, background: "#e5e5e5", borderRadius: 10 }} />
                    </div>
                  </div>
                  <div className="survey-reward">
                    <div style={{ width: 80, height: 28, background: "#e5e5e5", borderRadius: 8, margin: "0 auto" }} />
                  </div>
                  <div style={{ width: "80%", height: 34, background: "#e5e5e5", borderRadius: 14, margin: "0 auto" }} />
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

        {/* Quick Actions */}
        <section className="dashboard-section">
          <div className="section-header">
            <h3 className="section-title">Snabblänkar</h3>
          </div>
          <div className="quick-actions">
            <a href="/dashboard/cashback" className="quick-action-card">
              <div className="quick-action-icon teal">🛍</div>
              <span className="quick-action-label">Cashback</span>
            </a>
            <a href="/dashboard/konto" className="quick-action-card">
              <div className="quick-action-icon gold">👤</div>
              <span className="quick-action-label">Mitt konto</span>
            </a>
            <a href="/dashboard/tavlingar" className="quick-action-card">
              <div className="quick-action-icon purple">🏆</div>
              <span className="quick-action-label">Tävlingar</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
