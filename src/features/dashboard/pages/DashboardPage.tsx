import "@/features/dashboard/styles/DashboardPage.css";
import { DashboardSurveys } from "@/features/dashboard/components/DashboardSurveys";
import { DashboardStores } from "../components/DashboardStores";

const DashboardPage = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-content">
          <DashboardSurveys />
          <DashboardStores />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
