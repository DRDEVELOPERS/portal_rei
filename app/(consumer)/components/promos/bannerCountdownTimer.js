// components/CountdownTimerDataDB.js
"use client";

import { useEffect, useState } from "react";

const BannerCountdownTimerDataDB = ({ supabaseEndTime, className }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours() + 36);

    const endTime = supabaseEndTime ? new Date(supabaseEndTime) : defaultTime;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [supabaseEndTime]);

  return (
    <div
      className={`flex items-center gap-4 px-6 py-3 rounded-full ${className}`}
    >
      <div className="text-center">
        <span className="text-3xl font-bold text-primary-yellow block">
          {timeLeft.days}
        </span>
        <span className="text-sm text-gray-200">Dias</span>
      </div>
      <span className="text-2xl text-primary-yellow">:</span>
      <div className="text-center">
        <span className="text-3xl font-bold text-primary-yellow block">
          {timeLeft.hours}
        </span>
        <span className="text-sm text-gray-200">Horas</span>
      </div>
      <span className="text-2xl text-primary-yellow">:</span>
      <div className="text-center">
        <span className="text-3xl font-bold text-primary-yellow block">
          {timeLeft.minutes}
        </span>
        <span className="text-sm text-gray-200">Minutos</span>
      </div>
      <span className="text-2xl text-primary-yellow">:</span>
      <div className="text-center">
        <span className="text-3xl font-bold text-primary-yellow block">
          {timeLeft.seconds}
        </span>
        <span className="text-sm text-gray-200">Segundos</span>
      </div>
    </div>
  );
};
