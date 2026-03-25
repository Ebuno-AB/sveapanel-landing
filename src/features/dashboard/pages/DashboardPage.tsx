import { useState } from "react";
import "@/features/dashboard/styles/DashboardPage.css";
import { DashboardSurveys } from "@/features/dashboard/components/DashboardSurveys";
import { DashboardStores } from "../components/DashboardStores";
import StreakBadge from "@/features/streak/components/StreakBadge";
import { DashboardReferralCard } from "@/features/dashboard/components/DashboardReferralCard";
import DuelsBadge from "@/features/competition/components/DuelsBadge";
import GamesBadge from "@/features/games/components/GamesBadge";
import AppDownloadQRModal from "@/components/appDownloadModal/AppDownloadQRModal";
import { ExtensionBanner } from "@/features/dashboard/components/ExtensionBanner/ExtensionBanner";

const DashboardPage = () => {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-content">
          <ExtensionBanner />
          <DashboardSurveys />
          <div className="dashboard-section dashboard-section--row">
            <StreakBadge />
            <DashboardReferralCard />
          </div>
          <DashboardStores />
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Ladda ner appen</h2>
            </div>
            <div className="dashboard-section--row">
              <DuelsBadge onClick={() => setIsAppModalOpen(true)} />
              <GamesBadge onClick={() => setIsAppModalOpen(true)} />
            </div>
          </div>
        </div>
      </div>
      <AppDownloadQRModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
      />
    </>
  );
};

export default DashboardPage;
