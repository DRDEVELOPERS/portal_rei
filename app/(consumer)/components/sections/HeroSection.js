// app/components/sections/HeroSection.js
"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-black/90 to-transparent z-10" />
      <Image
        src="/images/hero-tools.jpg"
        alt="Ferramentas profissionais"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 80vw"
      />
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-7xl w-full px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-primary-yellow drop-shadow-xl">
              Ferramentas Profissionais
              <span className="block text-xl md:text-3xl lg:text-4xl text-white mt-2 md:mt-3">
                Para quem entende de trabalho sério
              </span>
            </h1>
            <Link
              href="/offers"
              className="inline-block bg-primary-yellow text-primary-black px-6 py-3 md:px-8 md:py-4 rounded-full 
                        text-base md:text-lg font-bold hover:bg-[#f8d634] transition-colors
                        transform hover:scale-105 duration-300"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
