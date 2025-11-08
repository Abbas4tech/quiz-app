import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TimerProps {
  timeInSeconds?: number;
  onComplete: () => void;
}

const Timer = ({
  timeInSeconds = 30,
  onComplete,
}: TimerProps): React.JSX.Element => {
  const second = 1;
  const [time, setTime] = useState(timeInSeconds);

  useEffect(() => {
    const t = setTimeout(() => {
      setTime(time - second);
    }, second * 1000);

    if (!time) {
      clearTimeout(t);
      onComplete();
    }

    return (): void => clearTimeout(t);
  }, [time, onComplete]);

  const timeClass =
    time <= Math.round(timeInSeconds * 0.33)
      ? "bg-red-200 text-red-600 border-red-400"
      : time <= Math.round(timeInSeconds * 0.66)
      ? "bg-lime-200 text-lime-600 border-lime-400"
      : "bg-blue-200 text-blue-600 border-blue-400";

  return (
    <div
      className={cn(
        timeClass,
        "font-bold px-4 py-2 w-max border bg rounded-sm"
      )}
    >
      {time}
    </div>
  );
};

export default Timer;
