// app/components/sections/PrimeSection.js
"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

export default function PrimeSection({ products }) {
  const carouselRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  // Simplified auto-scroll using setInterval
  useEffect(() => {
    const autoScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // If we've reached or exceeded the end, reset to the beginning
        if (scrollLeft + clientWidth >= scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    };

    const intervalId = setInterval(autoScroll, 3000); // auto-scroll every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 bg-primary-black/50 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary-yellow"></div>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-primary-black dark:text-gray-100">
          Ofertas em Destaque
          <span className="text-primary-yellow">.</span>
        </h2>
        <div className="flex gap-2">
          <button
            aria-label="Previous slide"
            className="rounded-full bg-primary-yellow p-2 hover:bg-[#f8d634] transition-colors animate__animated animate__pulse animate__infinite"
            onClick={() => scroll(-300)}
          >
            <BiChevronLeft className="h-6 w-6 text-primary-black" />
          </button>
          <button
            aria-label="Next slide"
            className="rounded-full bg-primary-yellow p-2 hover:bg-[#f8d634] transition-colors animate__animated animate__pulse animate__infinite"
            onClick={() => scroll(300)}
          >
            <BiChevronRight className="h-6 w-6 text-primary-black" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="relative w-full overflow-x-auto pb-6 pt-1 hide-scrollbar"
      >
        <ul className="flex gap-4">
          {[...products, ...products, ...products].map((product, i) => {
            const discount = product.discountPercentage || 5;
            return (
              <li
                key={`${product.id}-${i}`}
                className="relative w-72 flex-none group transition-transform duration-300 hover:-translate-y-2"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Discount Banner */}
                  <div className="flex items-start justify-between bg-gradient-to-r from-primary-yellow to-[#f8d634] rounded-t-lg px-4 py-2 -mx-[1px] -mt-[1px]">
                    <div className="flex-1 pr-2">
                      <p className="text-primary-black uppercase font-bold text-lg leading-tight">
                        {discount}% DE DESCONTO
                      </p>
                      <p className="text-[10px] text-primary-black/80 mt-1">
                        à vista no <span className="font-semibold">Pix</span> ou{" "}
                        <span className="font-semibold">Boleto</span>
                      </p>
                    </div>
                    <div className="text-primary-black font-black text-3xl leading-none">
                      {discount}%
                    </div>
                  </div>

                  {/* Product Card */}
                  <div className="relative border-2 border-primary-yellow/30 rounded-b-lg pt-4 pb-6 px-4">
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        alt={product.title}
                        src={product.url}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Add to Cart Overlay */}
                      <div className="absolute inset-0 bg-primary-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-primary-yellow text-primary-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#f8d634] transition-colors">
                          <FiShoppingCart className="text-lg" />
                          Comprar Agora
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="pt-4">
                      <h3 className="text-lg font-bold text-primary-yellow truncate">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-gray-300 line-through text-sm">
                          DE: R$ {(product.price / 100).toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-primary-yellow">
                          R${" "}
                          {(
                            (product.price * (1 - discount / 100)) /
                            100
                          ).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mt-2">
                        ou {product.installments || 4}x de R${" "}
                        {(
                          product.price /
                          (product.installments || 4) /
                          100
                        ).toFixed(2)}{" "}
                        sem juros
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
