// app/components/sections/ComboSection.js
"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const DUMMY_COMBOS = [
  {
    id: 1,
    title: "Ferramentas Básicas + Organizador",
    imageUrl: "/images/combos/toolkit-combo.jpg",
    products: Array(5).fill({}),
    originalPrice: 49900,
    discountedPrice: 39900,
    discountPercentage: 20,
  },
  {
    id: 2,
    title: "Kit Pintura Premium",
    imageUrl: "/images/combos/painting-combo.jpg",
    products: Array(8).fill({}),
    originalPrice: 79900,
    discountedPrice: 59900,
    discountPercentage: 25,
  },
  {
    id: 3,
    title: "Kit Jardim Completo",
    imageUrl: "/images/combos/garden-combo.jpg",
    products: Array(6).fill({}),
    originalPrice: 89900,
    discountedPrice: 69900,
    discountPercentage: 22,
  },
  {
    id: 4,
    title: "Kit Elétrica Profissional",
    imageUrl: "/images/combos/electric-combo.jpg",
    products: Array(7).fill({}),
    originalPrice: 129900,
    discountedPrice: 99900,
    discountPercentage: 23,
  },
];

export default function ComboSection({ combos }) {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const animationRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let lastTimestamp = null;
    const speed = 0.15;

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;

      if (!isHovered && !isTouched && carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const newScroll = scrollLeft + delta * speed;

        if (newScroll >= maxScroll) {
          carouselRef.current.scrollTo({ left: 0, behavior: "instant" });
        } else {
          carouselRef.current.scrollTo({
            left: newScroll,
            behavior: "instant",
          });
        }
      }

      lastTimestamp = timestamp;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered, isTouched]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 bg-gradient-to-r from-green-700 to-green-800 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/30"></div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-extrabold text-white">
            Super Combos
            <span className="text-yellow-300"> em Promoção</span>
          </h2>
          <p className="text-white/80 mt-2">
            Pacotes especiais com descontos exclusivos
          </p>
        </div>
        <div className="flex gap-2">
          {/* Keep existing navigation buttons */}
        </div>
      </div>

      <div
        ref={carouselRef}
        className="relative w-full overflow-x-auto pb-6 pt-1 hide-scrollbar"
      >
        <ul className="flex gap-4">
          {DUMMY_COMBOS.map((combo, i) => (
            <li
              key={combo.id}
              className="relative w-80 flex-none group transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                PROMOÇÃO ESPECIAL!
              </div>

              <Link href="#" className="block">
                {/* Combo Header */}
                <div className="flex items-start justify-between bg-yellow-400 rounded-t-lg px-4 py-3">
                  <div className="flex-1 pr-2">
                    <p className="text-green-900 uppercase font-black text-lg">
                      COMBO IMPERDÍVEL
                    </p>
                    <p className="text-green-900/70 text-xs mt-1">
                      {combo.products.length} itens • Economia de{" "}
                      {combo.discountPercentage}%
                    </p>
                  </div>
                  <div className="bg-green-900 text-yellow-400 px-3 py-2 rounded-lg font-black text-2xl">
                    {combo.discountPercentage}%
                  </div>
                </div>

                {/* Combo Card */}
                <div className="relative border-2 border-yellow-400/30 rounded-b-lg pt-4 pb-6 px-4 bg-white">
                  <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-lg">
                    <Image
                      alt={combo.title}
                      src={combo.imageUrl}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 transition-colors">
                        <FiShoppingCart className="text-lg" />
                        Comprar Agora
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-bold text-green-900 truncate">
                      {combo.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="text-gray-500 line-through text-sm">
                        De: R$ {(combo.originalPrice / 100).toFixed(2)}
                      </span>
                      <span className="text-2xl font-black text-green-900">
                        R$ {(combo.discountedPrice / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-3 bg-green-100 p-2 rounded-lg">
                      <p className="text-green-900 text-sm font-semibold">
                        ✓ Frete grátis • ✓ 12x sem juros • ✓ Garantia extendida
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
