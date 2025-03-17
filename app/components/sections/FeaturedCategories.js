// app/components/sections/FeaturedCategories.js
"use client";

import Image from "next/image";

export default function FeaturedCategories() {
  const categories = [
    "Ferramentas Elétricas",
    "Equipamentos de Segurança",
    "Acessórios",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl md:rounded-2xl aspect-video"
          >
            <Image
              src={`/images/category-${index + 1}.jpg`}
              alt={category}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-transparent to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-xl md:text-2xl font-bold text-white">
              {category}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
