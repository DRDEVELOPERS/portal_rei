"use client";

import { useEffect, useState } from "react";
import CountdownTimer from "../promos/countdownTimer";
import { FiAlertTriangle } from "react-icons/fi";

export default function PromoBanner() {
  const [showError, setShowError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleTimerError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  const handleComplete = () => {
    setIsExiting(true);
    // Wait for animation to finish before removing
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`bg-primary-black py-6 md:py-8 relative overflow-hidden
      animate__animated ${isExiting ? "animate-slideUp" : "animate__fadeInDown"}
    `}
    >
      {showError && (
        <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center animate__animated animate__pulse animate__infinite">
          <div className="flex items-center gap-2 text-white">
            <FiAlertTriangle className="text-xl" />
            <span>Promoção disponível por tempo limitado</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-primary-yellow space-y-1 md:space-y-2 animate__animated animate__zoomIn">
          <h3 className="text-2xl md:text-3xl font-bold animate__animated animate__fadeInLeft">
            Semana do Consumidor
          </h3>
          <p className="text-gray-300 text-sm md:text-base animate__animated animate__fadeInLeft animate__delay-1s">
            Até 70% de desconto nas melhores marcas
          </p>
        </div>

        <div className="animate__animated animate__fadeInRight">
          <CountdownTimer
            onError={handleTimerError}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}
