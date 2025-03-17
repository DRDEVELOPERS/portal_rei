"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductComp from "./Product";
import { BiLoader } from "react-icons/bi";

export default function SimilarProducts() {
  const [products, setProducts] = useState([]);

  const getRandomProducts = async () => {
    try {
      const response = await fetch("/api/products/get-random");
      const result = await response.json();
      setProducts(result || []);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="border-b py-1 mb-8" />

      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-black dark:text-gray-100">
          Mais produtos que você vai gostar
          <span className="text-primary-yellow">.</span>
        </h2>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-primary-yellow transition-all bg-white dark:bg-gray-900"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 right-2 bg-primary-yellow text-primary-black px-3 py-1 rounded-full text-sm font-bold z-10">
                {product.discountPercentage}% OFF
              </div>

              {/* Product Image */}
              <div className="relative aspect-square">
                <Image
                  src={product.url}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Product Info */}
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
                  {(product.price / (product.installments || 4) / 100).toFixed(
                    2
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center justify-center gap-4 font-semibold">
            <BiLoader size={30} className="text-blue-400 animate-spin" />
            Carregando produtos...
          </div>
        </div>
      )}
    </section>
  );
}
