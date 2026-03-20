import "@/features/dashboard/styles/DashboardPage.css";
import { DashboardSurveys } from "@/features/dashboard/components/DashboardSurveys";
import { DashboardStores } from "../components/DashboardStores";
import StreakBadge from "@/features/streak/components/StreakBadge";

const DashboardPage = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="dashboard-section">
            <StreakBadge />
          </div>
          <DashboardSurveys />
          <DashboardStores />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
