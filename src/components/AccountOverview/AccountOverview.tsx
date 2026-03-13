import { Clock, Check, ChevronRight } from "lucide-react";
import "./AccountOverview.css";

export const AccountOverview = () => {
  return (
    <div className="overview">
      <h2 className="overview__title">Översikt</h2>

      <div className="overview__grid">
        {/* Left column: activity + extension */}
        <div className="overview__left-col">
          <div className="overview__activity-card">
            <div className="overview__activity-row">
              <Clock className="overview__activity-icon" size={16} />
              <span className="overview__activity-label">
                Kommande{" "}
                <span className="overview__activity-amount--pending">
                  33.3kr
                </span>
              </span>
              <ChevronRight className="overview__activity-chevron" size={16} />
            </div>
            <div className="overview__divider" />
            <div className="overview__activity-row">
              <Check className="overview__activity-icon" size={16} />
              <span className="overview__activity-label">
                Godkännd{" "}
                <span className="overview__activity-amount--approved">
                  13kr
                </span>
              </span>
              <ChevronRight className="overview__activity-chevron" size={16} />
            </div>
          </div>

          {/* Extension CTA */}
          <button className="overview__extension-card">
            Installera Svea- extension <ChevronRight size={16} />
          </button>
        </div>

        {/* Right column: balance + referral */}
        <div className="overview__right-col">
          <div className="overview__balance-card">
            Saldo:<span className="overview__balance-amount">145kr</span>
          </div>

          <div className="overview__referral-card">
            Få <span className="overview__referral-amount">10kr</span> när du
            bjuder in en kompis! <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
