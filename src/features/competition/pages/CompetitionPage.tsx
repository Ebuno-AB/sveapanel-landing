import { useState } from "react";
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

  const [activeIdx, setActiveIdx] = useState(0);
  const history =
    historyRes?.data ??
    (Array.isArray(historyRes)
      ? (historyRes as unknown as CompetitionHistoryItem[])
      : []);
  const activeComp = competitions?.[activeIdx];

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
                  {stats.bestPosition > 0 ? `#${stats.bestPosition}` : "-"}
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

      {competitions && competitions.length > 1 && (
        <div className="comp-tabs-section">
          <div className="comp-tabs">
            {competitions.map((comp, i) => (
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
        </div>
      )}

      <div className="comp-content">
        <div className="comp-inner">
          {compLoading ? (
            <CompSkeleton />
          ) : activeComp ? (
            <CompetitionCard competition={activeComp} />
          ) : !competitions || competitions.length === 0 ? (
            <div className="comp-empty">
              <div className="comp-empty-icon">🏆</div>
              <h3>Inga aktiva tävlingar</h3>
              <p>Nya tävlingar startar snart — håll utkik!</p>
            </div>
          ) : null}

          {history.length > 0 && (
            <div className="comp-history-section">
              <div className="comp-history-header">
                <h3>Tidigare tävlingar</h3>
              </div>
              <div className="comp-history-list">
                {history.map((item) => (
                  <HistoryRow key={item.competition_info.id} item={item} />
                ))}
              </div>
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
