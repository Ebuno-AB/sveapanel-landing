import { useUser } from "@/features/user/api/user.queries";
import { DashboardSurveys } from "@/features/dashboard/components/DashboardSurvey";
import "@/features/dashboard/styles/DashboardPage.css";

const DashboardPage = () => {
  const { data: user } = useUser();

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-hero-inner">
          <h2 className="dashboard-greeting">Hej, {user?.firstName ?? ""}!</h2>
          <p className="dashboard-subtitle">
            Välkommen tillbaka till SveaPanelen
          </p>
        </div>
      </div>

      <div className="dashboard-content">
        <DashboardSurveys />
      </div>
    </div>
  );
};

export default DashboardPage;
