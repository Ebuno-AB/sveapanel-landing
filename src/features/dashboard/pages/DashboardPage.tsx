import { DashboardSurveys } from "@/features/dashboard/components/DashboardSurvey";
import "@/features/dashboard/styles/DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <DashboardSurveys />
      </div>
    </div>
  );
};

export default DashboardPage;
