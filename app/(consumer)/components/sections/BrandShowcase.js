// app/components/sections/BrandShowcase.js
"use client";

import Image from "next/image";

export default function BrandShowcase() {
  const brands = [1, 2, 3, 4, 5];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-primary-black dark:text-gray-300 mb-8">
          Marcas Parceiras
          <span className="text-primary-yellow">.</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {brands.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
            >
              <Image
                src={`/images/brand-${item}.jpg`}
                alt="Marca"
                width={120}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
