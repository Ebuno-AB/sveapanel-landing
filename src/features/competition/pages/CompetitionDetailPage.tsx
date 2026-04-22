import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useCompetitionLeaderboard } from "@/features/competition/api/competition.queries";
import CompetitionCard from "@/features/competition/components/CompetitionCard";
import CompSkeleton from "@/features/competition/components/CompSkeleton";
import "@/features/competition/styles/CompetitionPage.css";

const CompetitionDetailPage = () => {
  const navigate = useNavigate();
  const { competitionId } = useParams<{ competitionId: string }>();
  const id = competitionId ? Number(competitionId) : undefined;

  const { data: competition, isLoading } = useCompetitionLeaderboard(id, 50);

  return (
    <div className="comp-page">
      <div className="comp-header">
        <div className="comp-header-inner">
          <div className="comp-detail-back">
            <button
              type="button"
              className="comp-detail-back-btn"
              onClick={() => navigate(-1)}
              aria-label="Tillbaka"
            >
              <ChevronLeft size={22} />
              <span>Tillbaka</span>
            </button>
          </div>
        </div>
      </div>

      <div className="comp-active-panel">
        {isLoading ? (
          <div className="comp-panel-body">
            <CompSkeleton />
          </div>
        ) : competition?.competitionInfo ? (
          <CompetitionCard competition={competition} expanded />
        ) : (
          <div className="comp-empty">
            <div className="comp-empty-icon">🏆</div>
            <h3>Tävlingen kunde inte hittas</h3>
            <p>Gå tillbaka och försök igen.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionDetailPage;
