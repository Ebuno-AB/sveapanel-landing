import { Clock } from "lucide-react";
import useCountdown from "@/features/competition/hooks/useCountdown";

function TimerPill({ endDate }: { endDate: number }) {
  const text = useCountdown(endDate);
  return (
    <span className="comp-tab-timer">
      <Clock size={10} strokeWidth={2.5} />
      {text}
    </span>
  );
}

export default TimerPill;
