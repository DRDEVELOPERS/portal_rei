// app/components/sections/HeroSection.js
"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[50vh] md:h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-black/90 to-transparent z-10" />
      <Image
        src="/images/hero-tools.jpg"
        alt="Ferramentas profissionais"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 80vw"
      />
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-primary-yellow drop-shadow-xl">
              Ferramentas Profissionais
              <span className="block text-xl md:text-4xl text-white mt-1 md:mt-2">
                Para quem entende de trabalho sério
              </span>
            </h1>
            <Link
              href="/offers"
              className="inline-block text-sm md:text-lg bg-primary-yellow text-primary-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold hover:bg-[#f8d634] transition-colors"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
