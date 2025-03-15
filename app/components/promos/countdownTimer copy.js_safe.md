// components/CountdownTimer.js
"use client";

import { useEffect, useState } from "react";

const CountdownTimer = ({ supabaseEndTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Set default to 36 hours from now if no Supabase time
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours() + 36);

    const endTime = supabaseEndTime ? new Date(supabaseEndTime) : defaultTime;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          hours: Math.floor(hours).toString().padStart(2, "0"),
          minutes: Math.floor(minutes).toString().padStart(2, "0"),
          seconds: Math.floor(seconds).toString().padStart(2, "0"),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [supabaseEndTime]);

  return (
    <div className="flex items-center gap-2 bg-primary-yellow/20 px-4 py-2 rounded-full">
      <div className="text-center">
        <span className="text-xl font-bold text-primary-yellow">
          {timeLeft.hours}
        </span>
        <span className="text-xs text-gray-300 block">Horas</span>
      </div>
      <span className="text-primary-yellow">:</span>
      <div className="text-center">
        <span className="text-xl font-bold text-primary-yellow">
          {timeLeft.minutes}
        </span>
        <span className="text-xs text-gray-300 block">Minutos</span>
      </div>
      <span className="text-primary-yellow">:</span>
      <div className="text-center">
        <span className="text-xl font-bold text-primary-yellow">
          {timeLeft.seconds}
        </span>
        <span className="text-xs text-gray-300 block">Segundos</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
