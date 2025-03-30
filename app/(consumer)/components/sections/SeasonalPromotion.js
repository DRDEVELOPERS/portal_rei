// app/components/sections/SeasonalPromotion.js
"use client";

import Image from "next/image";
import Link from "next/link";

export default function SeasonalPromotion() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="bg-primary-yellow rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <span className="bg-primary-black text-primary-yellow px-4 py-1 rounded-full text-sm font-bold">
            Lançamentos
          </span>
          <h2 className="text-4xl font-bold text-primary-black mt-4 mb-6">
            Quel tal novidades?
          </h2>
          <p className="text-lg text-primary-black/80 mb-6">
            Quer fazer parte do clube dos ferramenteiros?
          </p>
          <button className="bg-primary-black text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
            Comprar agora
          </button>
        </div>
        <div className="flex-1">
          <Image
            src="/images/home/seasonal-promo_b2.png"
            alt="Workshop Tools"
            width={600}
            height={400}
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
