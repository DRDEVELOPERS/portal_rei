// app/components/sections/CategoryShowcase.js
"use client";

import Product from "../Product";
import { GridTileImage } from "../grid/tile";

export default function CategoryShowcase({ products }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <h2 className="text-3xl font-extrabold text-primary-black dark:text-gray-100 mb-6 md:mb-8">
        Itens em Ofertas agora
        <span className="text-primary-yellow">.</span>
      </h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
        {products.length > 0 && (
          <>
            <div className="md:col-span-4 md:row-span-2">
              <Product
                product={products[0]}
                size="full"
                priority={true}
                className="h-full"
              />
            </div>
            {products.slice(1, 12).map((product, index) => (
              <div key={product.id} className="md:col-span-2">
                <Product product={product} size="half" priority={index === 0} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Secondary Grid */}
      <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
        {products.slice(3).map((product) => (
          <div key={product.id} className="aspect-square">
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
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
