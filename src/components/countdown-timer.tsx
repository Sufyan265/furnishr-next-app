
"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const TimerBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="font-mono text-2xl font-bold text-destructive">{String(value).padStart(2, '0')}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const hasTimeLeft = Object.values(timeLeft).some(val => val > 0);

  if (!hasTimeLeft) {
    return <p className="font-semibold text-destructive">Deal has expired!</p>;
  }

  return (
    <div className="flex items-center justify-center space-x-4 rounded-lg border bg-card p-3">
      <TimerBox value={timeLeft.days} label="Days" />
      <span className="text-2xl font-bold text-destructive -translate-y-1">:</span>
      <TimerBox value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-destructive -translate-y-1">:</span>
      <TimerBox value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-bold text-destructive -translate-y-1">:</span>
      <TimerBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
