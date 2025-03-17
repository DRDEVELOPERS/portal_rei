// app/components/sections/PromoBanner.js
"use client";

import CountdownTimer from "../promos/countdownTimer";

export default function PromoBanner() {
  return (
    <div className="bg-primary-black py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-primary-yellow space-y-1 md:space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold">
            Semana do Consumidor
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            Até 70% de desconto nas melhores marcas
          </p>
        </div>
        <CountdownTimer />
      </div>
    </div>
  );
}
