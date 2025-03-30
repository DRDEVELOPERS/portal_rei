// app/components/sections/FeaturedProducts.js
"use client";

import Link from "next/link";
import { GridTileImage } from "../grid/tile";

export default function FeaturedProducts({ products }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-4xl font-extrabold text-primary-black dark:text-gray-100 mb-12">
        Mais Vendidos
        <span className="text-primary-yellow">.</span>
      </h2>

      <div className="product-grid grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {products.slice(0, 6).map((product, index) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className={`relative aspect-square overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 ${
              index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"
            }`}
          >
            <GridTileImage
              src={product.url}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              label={{
                title: product.title,
                amount: (product.price / 100).toFixed(2),
                currencyCode: "BRL",
              }}
            />
            {index === 0 && (
              <div className="discount-badge absolute top-2 right-2 bg-primary-yellow text-primary-black px-3 py-1 rounded-full text-sm font-bold">
                50% OFF
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
