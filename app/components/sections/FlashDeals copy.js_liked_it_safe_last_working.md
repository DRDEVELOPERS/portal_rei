// app/components/sections/FlashDeals.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

export default function FlashDeals({ products }) {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return (
      <div className="flex items-center gap-1">
        <span className="bg-white/20 px-2 py-1 rounded-md">{h}</span>
        <span>:</span>
        <span className="bg-white/20 px-2 py-1 rounded-md">{m}</span>
        <span>:</span>
        <span className="bg-white/20 px-2 py-1 rounded-md">{s}</span>
      </div>
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-black dark:text-gray-100">
          Flash Deals
          <span className="text-primary-yellow">.</span>
        </h2>
        <div className="flex items-center gap-3 bg-primary-black text-white px-4 py-2 rounded-full">
          <FiClock className="w-5 h-5" />
          <span className="text-sm md:text-base">Termina em:</span>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group relative overflow-hidden rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-primary-yellow transition-all"
          >
            <div className="relative aspect-square">
              <Image
                src={product.url}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                -{product.discountPercentage}%
              </div>
            </div>

            <div className="p-3 md:p-4">
              <h3 className="font-medium text-sm md:text-base line-clamp-2 mb-2">
                {product.title}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-lg md:text-xl font-bold text-primary-yellow">
                  R$ {(product.price / 100).toFixed(2)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                  R${" "}
                  {(
                    (product.price * (1 + product.discountPercentage / 100)) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-2">
                ou {product.installments || 4}x de R${" "}
                {(product.price / (product.installments || 4) / 100).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
