// app/components/sections/FlashDeals.js
"use client";

import { GridTileImage } from "../grid/tile";
import CountdownTimer from "../promos/countdownTimer";
import { ThreeItemGrid } from "../grid/three-items";

export default function FlashDeals({ products }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-justify space-y-3 group mb-8">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-[1.01] hover:drop-shadow-md">
          <span className="inline-block animate-float will-change-transform">
            Flash Deals
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium transition-colors hover:text-sky-500">
          Itens em Ofertas{" "}
          <a
            href="#"
            className="inline-flex items-center gap-2 underline decoration-2 decoration-dotted underline-offset-4 hover:decoration-wavy hover:text-amber-500 hover:decoration-amber-400 transition-all duration-200"
          >
            <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full">
              Aproveite nossas promoções
            </span>
          </a>
        </p>
      </div>

      {/* Countdown Section */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-yellow">
            Só Hoje
            <span className="text-primary-yellow">.</span>
          </h2>
          <CountdownTimer supabaseEndTime={products[0]?.saleEndTime} />
        </div>
      </div>

      {/* Main Featured Grid */}
      <ThreeItemGrid products={products.slice(0, 3)} />

      {/* Secondary Grid */}
      <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
        {products.slice(3).map((product) => (
          <div
            key={product.id}
            className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl"
          >
            <GridTileImage
              src={product.url}
              alt={product.title}
              label={{
                title: product.title,
                amount: (product.price / 100).toFixed(2),
                currencyCode: "BRL",
                position: "bottom",
              }}
              sizes="(min-width: 768px) 25vw, 50vw"
              priority={false}
              className="hover:scale-105 transition-transform duration-300"
            />
            {product.discountPercentage && (
              <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
