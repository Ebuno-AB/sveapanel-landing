import { Clock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import type { StreakCompletionEntry } from "../types/streak.types";

const SWEDISH_DAYS = ["MAN", "TIS", "ONS", "TORS", "FRE", "LÖR", "SÖN"];

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getWeekDates(): string[] {
  const today = new Date();
  const day = today.getDay(); // 0=Sun … 6=Sat
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

interface Props {
  completions: StreakCompletionEntry[];
}

const WeeklyProgress = ({ completions }: Props) => {
  const weekDates = getWeekDates();
  const todayStr = toDateStr(new Date());
  const completionSet = new Set(completions.map((c) => c.localDate));
  const completedCount = weekDates.filter((d) => completionSet.has(d)).length;

  return (
    <div className="weekly-progress-card">
      <div className="weekly-progress-header">
        <span className="weekly-progress-title">Veckans framsteg</span>
        <span className="weekly-progress-count">
          <FontAwesomeIcon icon={faFireFlameCurved} className="weekly-fire" />
          {completedCount}/7
        </span>
      </div>

      <div className="weekly-progress-bar-track">
        <div
          className="weekly-progress-bar-fill"
          style={{ width: `${(completedCount / 7) * 100}%` }}
        />
      </div>

      <div className="weekly-days">
        {weekDates.map((date, i) => {
          const isToday = date === todayStr;
          const isCompleted = completionSet.has(date);
          const isFuture = date > todayStr;

          let circleClass = "day-circle";
          if (isCompleted) circleClass += " completed";
          else if (isToday) circleClass += " today-pending";
          else if (isFuture) circleClass += " future";
          else circleClass += " missed";

          return (
            <div key={date} className="day-item">
              <div className={circleClass}>
                {isCompleted ? (
                  <FontAwesomeIcon icon={faFireFlameCurved} />
                ) : isToday ? (
                  <Clock size={20} />
                ) : null}
              </div>
              <span className={`day-label${isToday ? " today" : ""}`}>
                {SWEDISH_DAYS[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyProgress;
