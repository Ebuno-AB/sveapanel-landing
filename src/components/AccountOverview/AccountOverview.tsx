import "./AccountOverview.css";

export const OversiktContent = () => {
  return (
    <div className="overview">
      <h2 className="overview__title">Översikt</h2>

      <div className="overview__grid">
        {/* Top-left: activity card */}
        <div className="overview__activity-card">
          <div className="overview__activity-row">
            <span className="overview__activity-icon">🕐</span>
            <span className="overview__activity-label">
              Kommande{" "}
              <span className="overview__activity-amount--pending">33.3kr</span>
            </span>
            <span className="overview__activity-chevron">›</span>
          </div>
          <div className="overview__divider" />
          <div className="overview__activity-row">
            <span className="overview__activity-icon">✓</span>
            <span className="overview__activity-label">
              Godkännd{" "}
              <span className="overview__activity-amount--approved">13kr</span>
            </span>
            <span className="overview__activity-chevron">›</span>
          </div>
        </div>

        {/* Top-right: balance card */}
        <div className="overview__balance-card">
          Saldo:<span className="overview__balance-amount">145kr</span>
        </div>

        {/* Bottom-left: extension CTA */}
        <button className="overview__extension-card">
          Installera Svea- extension &rsaquo;
        </button>

        {/* Bottom-right: referral card */}
        <div className="overview__referral-card">
          Få <span className="overview__referral-amount">10kr</span> när du
          bjuder in en kompis! &rsaquo;
        </div>
      </div>
    </div>
  );
};
