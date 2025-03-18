"use client";
import { AiOutlineTool } from "react-icons/ai";
import "animate.css/animate.min.css";

export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-screen z-50 backdrop-blur-xl bg-primary-black/90 dark:bg-gray-900/95 flex flex-col items-center justify-center">
      {/* Logo Animation */}
      <div className="animate__animated animate__zoomIn animate__faster">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-yellow to-[#f8d634] bg-clip-text text-transparent">
          PORTAL FERRAGENS
        </h1>
      </div>

      {/* Animated Subtitle */}
      <div className="mt-4 animate__animated animate__fadeIn animate__delay-1s">
        <p className="text-gray-300 text-lg text-center">
          Preparando sua próxima ferramenta...
          <span className="ml-2 animate__animated animate__pulse animate__infinite">
            🔧
          </span>
        </p>
      </div>

      {/* Animated Tool Icon */}
      <div className="mt-8 animate__animated animate__fadeInUp animate__delay-2s">
        <AiOutlineTool
          size={80}
          className="text-primary-yellow animate-[spin_2s_linear_infinite] mx-auto"
        />
      </div>

      {/* Dynamic Loading Status */}
      <div className="mt-6 space-y-2 text-center">
        <p className="text-gray-400 animate__animated animate__fadeInUp animate__delay-3s">
          Estamos carregando tudo o que você precisa...
        </p>
        <div className="flex justify-center space-x-2 animate__animated animate__fadeIn animate__delay-4s">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 bg-primary-yellow rounded-full animate__animated animate__bounce animate__infinite"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 mt-6 bg-gray-800 rounded-full overflow-hidden animate__animated animate__fadeInUp animate__delay-3s">
        <div className="h-full bg-primary-yellow w-1/3 animate__animated animate__slideInLeft animate__infinite" />
      </div>
    </div>
  );
}
