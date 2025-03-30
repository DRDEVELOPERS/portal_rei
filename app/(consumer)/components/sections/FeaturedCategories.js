// app/components/sections/FeaturedCategories.js
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const categories = [
  {
    name: "Seja um Franqueado",
    description: "Junte-se à nossa rede de franquias e construa seu negócio",
  },
  {
    name: "Vendas Corporativas",
    description: "Soluções personalizadas para sua empresa",
  },
  {
    name: "Garantia Estendida Premium",
    description: "Proteção total por até 5 anos com assistência 24h",
  },
  {
    name: "Programa de Fidelidade",
    description: "Descontos exclusivos e benefícios especiais",
  },
  {
    name: "Suporte Técnico Prioritário",
    description: "Atendimento preferencial e treinamento especializado",
  },
];

export default function FeaturedCategories() {
  const carouselRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const slide = carouselRef.current.querySelector(".carousel-slide");
      if (slide) {
        const slideWidth = slide.clientWidth;
        setScrollDirection(direction > 0 ? "right" : "left");
        carouselRef.current.scrollBy({
          left: slideWidth * direction,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-8 md:py-16 relative"
      aria-label="Categorias em Destaque"
    >
      {/* Mobile Version: vertical grid for small screens */}
      <div className="block md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl border-2 border-transparent hover:border-primary-yellow transition-all duration-300"
              style={{ paddingBottom: "69.3%" }}
            >
              <div className="absolute inset-0">
                <Image
                  src={`/images/category-${index + 1}.jpg`}
                  alt={category.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="100vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white shadow-lg bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:bg-white/30">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-white/90 font-medium shadow-sm bg-white/10 px-1.5 py-0.5 rounded-md backdrop-blur-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-white/20">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Version: Carousel for md and larger screens */}
      <div className="hidden md:block">
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-30">
          <button
            aria-label="Previous slide"
            className="bg-primary-yellow/80 hover:bg-primary-yellow p-2 rounded-full -ml-4 transition-colors"
            onClick={() => scroll(-1)}
          >
            <BiChevronLeft className="h-8 w-8 text-primary-black" />
          </button>
          <button
            aria-label="Next slide"
            className="bg-primary-yellow/80 hover:bg-primary-yellow p-2 rounded-full -mr-4 transition-colors"
            onClick={() => scroll(1)}
          >
            <BiChevronRight className="h-8 w-8 text-primary-black" />
          </button>
        </div>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-6 hide-scrollbar scroll-smooth"
        >
          <div className="flex gap-4 md:gap-8 flex-nowrap">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`carousel-slide relative group overflow-hidden rounded-xl md:rounded-2xl flex-none w-[537px] aspect-[537/372] border-2 border-transparent hover:border-primary-yellow transition-all duration-300 animate__animated ${
                  scrollDirection === "right"
                    ? "animate__slideInRight"
                    : "animate__slideInLeft"
                }`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={`/images/category-${index + 1}.jpg`}
                    alt={category.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 537px"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white shadow-lg bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:bg-white/30">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-white/90 font-medium shadow-sm bg-white/10 px-1.5 py-0.5 rounded-md backdrop-blur-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-white/20">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
