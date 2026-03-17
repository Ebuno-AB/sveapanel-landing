import { useState, useEffect } from "react";

function useCountdown(endDateStr: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const end = Number(endDateStr) * 1000;
      const diff = end - Date.now();
      if (diff <= 0) return "Avslutad";
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      if (days > 0) return `${days}d ${hours}h kvar`;
      return `${hours}h ${mins}m kvar`;
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 60000);
    return () => clearInterval(id);
  }, [endDateStr]);

  return timeLeft;
}

export default useCountdown;
