import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import {
  useActiveCompetitions,
  useCompetitionHistory,
  useCompetitionStats,
} from "@/features/competition/api/competition.queries";
import type { CompetitionHistoryItem } from "@/features/competition/types/competition.types";
import CompetitionCard from "@/features/competition/components/CompetitionCard";
import HistoryRow from "@/features/competition/components/HistoryRow";
import CompSkeleton from "@/features/competition/components/CompSkeleton";
import "@/features/competition/styles/CompetitionPage.css";

const CompetitionPage = () => {
  const { data: competitions, isLoading: compLoading } =
    useActiveCompetitions();
  const { data: historyRes, isLoading: histLoading } = useCompetitionHistory();
  const { data: stats } = useCompetitionStats();

  const validCompetitions =
    competitions?.filter((c) => c.competitionInfo) ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const getHistoryPageSize = () => (window.innerWidth < 690 ? 2 : 5);
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(() =>
    getHistoryPageSize(),
  );

  const history =
    historyRes?.data ??
    (Array.isArray(historyRes)
      ? (historyRes as unknown as CompetitionHistoryItem[])
      : []);
  const activeComp = validCompetitions[activeIdx];

  return (
    <div className="comp-page">
      <div className="comp-header">
        <div className="comp-header-inner">
          <div className="comp-header-top">
            <h2 className="page-title">
              <FontAwesomeIcon icon={faTrophy} /> Tävlingar
            </h2>
          </div>

          {stats && (
            <div className="comp-stats-card">
              <div className="comp-stat">
                <div className="comp-stat-icon">🏅</div>
                <div className="comp-stat-value">
                  {stats.bestPosition > 0 ? `#${stats.bestPosition}` : "-"}
                </div>
                <div className="comp-stat-label">Bästa</div>
              </div>
              <div className="comp-stat-divider" />
              <div className="comp-stat">
                <div className="comp-stat-icon">⚡</div>
                <div className="comp-stat-value">{stats.totalCompetitions}</div>
                <div className="comp-stat-label">Deltagit</div>
              </div>
              <div className="comp-stat-divider" />
              <div className="comp-stat">
                <div className="comp-stat-icon">🎯</div>
                <div className="comp-stat-value">{stats.topThreeCount}</div>
                <div className="comp-stat-label">Topp 3</div>
              </div>
              <div className="comp-stat-divider" />
              <div className="comp-stat">
                <div className="comp-stat-icon">💰</div>
                <div className="comp-stat-value comp-stat-value--green">
                  {stats.totalWon} kr
                </div>
                <div className="comp-stat-label">Vunnit</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="comp-active-panel">
        <div className="comp-section-header">
          <div className="comp-section-header-left">
            <span className="comp-live-indicator" />
            <h3>Aktiva tävlingar</h3>
          </div>
          {validCompetitions.length > 0 && (
            <span className="comp-count-badge">{validCompetitions.length}</span>
          )}
        </div>

        {validCompetitions.length > 1 && (
          <div className="comp-pill-tabs">
            {validCompetitions.map((comp, i) => (
              <button
                key={comp.competitionInfo.id}
                className={`comp-pill-tab${i === activeIdx ? " active" : ""}`}
                onClick={() => setActiveIdx(i)}
              >
                {comp.competitionInfo.title}
              </button>
            ))}
          </div>
        )}

        {compLoading ? (
          <div className="comp-panel-body">
            <CompSkeleton />
          </div>
        ) : activeComp ? (
          <CompetitionCard competition={activeComp} />
        ) : validCompetitions.length === 0 ? (
          <div className="comp-empty">
            <div className="comp-empty-icon">🏆</div>
            <h3>Inga aktiva tävlingar</h3>
            <p>Nya tävlingar startar snart — håll utkik!</p>
          </div>
        ) : null}
      </div>

      <div className="comp-content">
        <div className="comp-inner">
          {history.length > 0 && (
            <div className="comp-history-section">
              <div className="comp-history-header">
                <h3>Tidigare tävlingar</h3>
              </div>
              <div className="comp-history-list">
                {history
                  .slice(0, visibleHistoryCount)
                  .filter((item) => item?.competitionInfo)
                  .map((item) => (
                    <HistoryRow key={item.competitionInfo.id} item={item} />
                  ))}
              </div>
              {visibleHistoryCount < history.length && (
                <div className="comp-history-load-more">
                  <button
                    className="comp-history-load-more-btn"
                    onClick={() =>
                      setVisibleHistoryCount((c) => c + getHistoryPageSize())
                    }
                  >
                    Visa fler
                  </button>
                </div>
              )}
            </div>
          )}

          {histLoading && !history.length && (
            <div className="comp-history-section" style={{ marginTop: 40 }}>
              <div className="comp-history-header">
                <h3>Tidigare tävlingar</h3>
              </div>
              <CompSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionPage;
