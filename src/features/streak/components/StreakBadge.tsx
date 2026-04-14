import { Flame, Check, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStreakStats, useStreakCompletions } from "../api/streak.queries";
import "@/features/streak/styles/StreakBadge.css";

const SWEDISH_DAYS = ["M", "T", "O", "T", "F", "L", "S"];

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getWeekDates(): string[] {
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return toDateStr(d);
  });
}

const StreakBadge = () => {
  const navigate = useNavigate();
  const { data: stats } = useStreakStats();
  const { data: completionsRes } = useStreakCompletions();

  const completions = completionsRes?.entries ?? [];
  const weekDates = getWeekDates();
  const todayStr = toDateStr(new Date());
  const completionSet = new Set(completions.map((c) => c.localDate));
  const currentStreak = stats?.currentStreak ?? 0;

  return (
    <div
      className="streak-badge"
      onClick={() => navigate("/dashboard/streak")}
      style={{ cursor: "pointer" }}
    >
      <div className="streak-badge-header">
        <div className="streak-badge-icon-wrap">
          <Flame size={26} className="streak-badge-flame" />
        </div>
        <div className="streak-badge-info">
          <span className="streak-badge-count">
            {currentStreak} dagar i rad
          </span>
          <span className="streak-badge-subtitle">
            Slutför din dagliga streak
          </span>
        </div>
        <ChevronRight size={20} className="streak-badge-chevron" />
      </div>

      <div className="streak-badge-days">
        {weekDates.map((date, i) => {
          const isToday = date === todayStr;
          const isCompleted = completionSet.has(date);
          const isFuture = date > todayStr;

          let circleClass = "streak-badge-circle";
          if (isCompleted) circleClass += " completed";
          else if (isToday) circleClass += " today-pending";
          else if (isFuture) circleClass += " future";
          else circleClass += " missed";

          return (
            <div key={date} className="streak-badge-day-item">
              <div className={circleClass}>
                {isCompleted ? (
                  <Check size={16} strokeWidth={2.5} />
                ) : isToday ? (
                  <Clock size={16} />
                ) : null}
              </div>
              <span
                className={`streak-badge-day-label${isToday ? " today" : ""}`}
              >
                {SWEDISH_DAYS[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakBadge;
