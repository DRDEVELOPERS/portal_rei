"use client";

import { useState } from "react";
import Image from "next/image";
import CountdownTimer from "../promos/countdownTimer";
import { FiAlertTriangle } from "react-icons/fi";

export default function PromoBanner() {
  const [showError, setShowError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleTimerError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 animate__animated animate__fadeInDown">
      <div className="max-w-7xl mx-auto rounded-xl shadow-lg p-4 md:p-6 relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/promo-banner.jpg" // Update this path with your background image
          alt="Promo Banner Background"
          fill
          className="object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-primary-black/70"></div>

        {showError && (
          <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center animate__animated animate__pulse animate__infinite">
            <div className="flex items-center gap-2 text-white text-sm md:text-base">
              <FiAlertTriangle className="text-xl" />
              <span>Promoção disponível por tempo limitado</span>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-primary-yellow animate__animated animate__zoomIn">
              Semana do Consumidor
            </h3>
            <p className="text-gray-300 text-sm md:text-base animate__animated animate__fadeIn">
              Até 70% de desconto nas melhores marcas
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="animate__animated animate__fadeIn">
            <CountdownTimer
              onError={handleTimerError}
              onComplete={() => setIsVisible(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
