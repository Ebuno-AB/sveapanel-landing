import "@/features/dashboard/styles/DashboardPage.css";
import { DashboardSurveys } from "@/features/dashboard/components/DashboardSurveys";
import { DashboardStores } from "../components/DashboardStores";
import StreakBadge from "@/features/streak/components/StreakBadge";
import { ReferralShareCard } from "@/features/myAccount/components/InviteFriends/ReferralShareCard";

const DashboardPage = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-content">
          <DashboardSurveys />
          <div className="dashboard-section dashboard-section--row">
            <StreakBadge />
            <ReferralShareCard />
          </div>
          <DashboardStores />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
