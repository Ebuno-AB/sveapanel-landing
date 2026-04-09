import { useState, useEffect } from "react";
import {
  useActiveCompetitions,
  useCompetitionHistory,
  useCompetitionStats,
} from "@/features/competition/api/competition.queries";
import type { CompetitionHistoryItem } from "@/features/competition/types/competition.types";
import CompetitionCard from "@/features/competition/components/CompetitionCard";
import TimerPill from "@/features/competition/components/TimerPill";
import HistoryRow from "@/features/competition/components/HistoryRow";
import CompSkeleton from "@/features/competition/components/CompSkeleton";
import "@/features/competition/styles/CompetitionPage.css";

const CompetitionPage = () => {
  const { data: competitions, isLoading: compLoading } =
    useActiveCompetitions();
  const { data: historyRes, isLoading: histLoading } = useCompetitionHistory();
  const { data: stats } = useCompetitionStats();

  const validCompetitions =
    competitions?.filter((c) => c.competition_info) ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 690);
  const getHistoryPageSize = () => (window.innerWidth < 690 ? 2 : 5);
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(() =>
    getHistoryPageSize(),
  );

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 690);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
          <div className="comp-header-top"></div>

          {stats && (
            <div className="comp-stats">
              <div className="comp-stat">
                <div className="comp-stat-icon">🏅</div>
                <div className="comp-stat-value">
                  {stats.bestPosition > 0 ? `${stats.bestPosition}` : "-"}
                </div>
                <div className="comp-stat-label">Bästa</div>
              </div>
              <div className="comp-stat">
                <div className="comp-stat-icon">⚡</div>
                <div className="comp-stat-value">{stats.totalCompetitions}</div>
                <div className="comp-stat-label">Deltagit</div>
              </div>
              <div className="comp-stat">
                <div className="comp-stat-icon">🎯</div>
                <div className="comp-stat-value">{stats.topThreePositions}</div>
                <div className="comp-stat-label">Topp 3</div>
              </div>
              <div className="comp-stat">
                <div className="comp-stat-icon">💰</div>
                <div className="comp-stat-value">{stats.totalWon}kr</div>
                <div className="comp-stat-label">Vunnit</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="comp-active-panel">
        {validCompetitions.length > 1 && (
          <div className="comp-tabs-bar">
            {isCompact ? (
              <select
                className="comp-tabs-select"
                value={activeIdx}
                onChange={(e) => setActiveIdx(Number(e.target.value))}
                aria-label="Välj tävling"
              >
                {validCompetitions.map((comp, i) => (
                  <option key={comp.competition_info.id} value={i}>
                    {comp.competition_info.title}
                  </option>
                ))}
              </select>
            ) : (
              <div className="comp-tabs">
                {validCompetitions.map((comp, i) => (
                  <div
                    key={comp.competition_info.id}
                    className={`comp-tab${i === activeIdx ? " active" : ""}`}
                    onClick={() => setActiveIdx(i)}
                  >
                    <div className="comp-tab-title">
                      {comp.competition_info.title}
                    </div>
                    <div className="comp-tab-meta">
                      <span className="comp-tab-type">
                        {comp.competition_info.competition_type}
                      </span>
                      {comp.competition_info.end_date && (
                        <TimerPill endDate={comp.competition_info.end_date} />
                      )}
                      <div className="live-dot" />
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                {history.slice(0, visibleHistoryCount).map((item) => (
                  <HistoryRow key={item.competition_info.id} item={item} />
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
