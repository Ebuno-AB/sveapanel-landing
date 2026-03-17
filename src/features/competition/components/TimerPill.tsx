import useCountdown from "@/features/competition/hooks/useCountdown";

const TimerIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

function TimerPill({ endDate }: { endDate: string }) {
  const text = useCountdown(endDate);
  return (
    <span className="comp-tab-timer">
      <TimerIcon />
      {text}
    </span>
  );
}

export default TimerPill;
