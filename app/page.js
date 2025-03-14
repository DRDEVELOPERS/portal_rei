// app/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import MainLayout from "./layouts/MainLayout";
import TopHeader from "./layouts/includes/TopHeader";
import CarouselComp from "./components/CarouselComp";
import { ThreeItemGrid } from "./components/grid/three-items";
import { Grid, GridItem } from "./components/grid";
import { GridTileImage } from "./components/grid/tile";

import useIsLoading from "./hooks/useIsLoading";
import Product from "./components/Product";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    useIsLoading(true);
    try {
      const response = await fetch("/api/products");
      const prods = await response.json();
      setProducts(prods);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      useIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <MainLayout>
      <div className="mt-12">
        {/* Hero Section */}
        <section className="relative h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-black/90 to-transparent z-10" />
          <Image
            src="/images/hero-tools.jpg"
            alt="Ferramentas profissionais"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-2xl space-y-6">
                <h1 className="text-6xl font-black text-primary-yellow drop-shadow-xl">
                  Ferramentas Profissionais
                  <span className="block text-4xl text-white mt-2">
                    Para quem entende de trabalho sério
                  </span>
                </h1>
                <button className="bg-primary-yellow text-primary-black px-8 py-4 rounded-full text-lg font-bold hover:bg-[#f8d634] transition-colors">
                  Ver Ofertas
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories Grid */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Ferramentas Elétricas",
              "Equipamentos de Segurança",
              "Acessórios",
            ].map((category, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl aspect-video"
              >
                <Image
                  src={`/images/category-${index + 1}.jpg`}
                  alt={category}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-transparent to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <div className="bg-primary-black py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-primary-yellow space-y-2">
              <h3 className="text-3xl font-bold">Semana do Consumidor</h3>
              <p className="text-gray-300">
                Até 70% de desconto nas melhores marcas
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-yellow">02</div>
                <div className="text-gray-300 text-sm">Dias</div>
              </div>
              <div className="text-4xl text-primary-yellow">:</div>
              {/* Add more countdown elements */}
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-4xl font-extrabold text-primary-black dark:text-gray-100 mb-12">
            Mais Vendidos
            <span className="text-primary-yellow">.</span>
          </h2>

          <div className="product-grid">
            {products.slice(0, 6).map((product, index) => (
              <div
                key={product.id}
                className={`product-tile ${
                  index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"
                }`}
              >
                <GridTileImage
                  // src={`${product.url}/800`}
                  src={product.url}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: (product.price / 100).toFixed(2),
                    currencyCode: "BRL",
                  }}
                />
                {index === 0 && <div className="discount-badge">50% OFF</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-primary-black dark:text-gray-300 mb-8">
              Marcas Parceiras
              <span className="text-primary-yellow">.</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((item) => (
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
        <CarouselComp />
        <TopHeader />

        {/* Featured Products Section */}

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="text-justify space-y-3 group">
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
            <p></p>
          </div>

          {/* Main Featured Grid */}
          <ThreeItemGrid products={products.slice(0, 3)} />

          {/* Secondary Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.slice(3).map((product) => (
              <div key={product.id} className="aspect-square">
                <GridTileImage
                  // src={product.url}
                  src={`${product.url}/500`}
                  fill={true}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: (product.price / 100).toFixed(2),
                    position: "bottom",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Promotion Section */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="bg-primary-yellow rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="bg-primary-black text-primary-yellow px-4 py-1 rounded-full text-sm font-bold">
                Lançamentos
              </span>
              <h2 className="text-4xl font-bold text-primary-black mt-4 mb-6">
                Quel tal novidades?
              </h2>
              <p className="text-lg text-primary-black/80 mb-6">
                Quer fazer parte do clube dos ferramenteiros?
              </p>
              <button className="bg-primary-black text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                Comprar agora
              </button>
            </div>
            <div className="flex-1">
              <Image
                src="/images/home/seasonal-promo_b2.png"
                alt="Workshop Tools"
                width={600}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-primary-black dark:bg-gray-900 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-5xl font-bold text-primary-yellow mb-4">
              Quer receber novidades?
            </h2>
            <p className="text-gray-300 mb-8">
              Faça parte de um grupo exclusivo, a gente só manda novidades para
              quem busca exclusividade!
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Cadastre seu e-mail aqui"
                className="flex-1 px-6 py-3 rounded-full border-2 border-primary-yellow bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-primary-yellow text-primary-black px-8 py-3 rounded-full font-semibold hover:bg-[#f8d634] transition-colors">
                Cadastrar
              </button>
            </div>
          </div>
        </section>

        {/* Inspiration Gallery Section */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-3xl font-extrabold text-primary-black dark:text-gray-100 mb-8">
            Para você
            <span className="text-primary-yellow">.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group overflow-hidden rounded-2xl">
              <Image
                src="/images/inspiration-1.jpg"
                alt="Workspace Setup"
                width={800}
                height={600}
                className="h-96 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-black/80">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Franquias
                </h3>
                <p className="text-gray-200">Seja um franqueado</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="relative group overflow-hidden rounded-2xl"
                >
                  <Image
                    src={`/images/inspiration-${num}.jpg`}
                    alt="Inspiration"
                    width={400}
                    height={300}
                    className="h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-white font-medium px-6 py-2 border-2 border-white rounded-full hover:bg-white/10">
                      Ver Franquias
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Showcase Section */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-3xl font-extrabold text-primary-black dark:text-gray-100 mb-8 animate__animated animate__fadeIn">
            Itens em Ofertas agora
            <span className="text-primary-yellow">.</span>
          </h2>

          {/* Grid offers aligned */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
            {products.length > 0 && (
              <>
                <Product product={products[0]} size="full" priority={true} />
                {products.slice(1, 12).map((product, index) => (
                  <Product
                    key={product.id}
                    product={product}
                    size="half"
                    priority={index === 0}
                  />
                ))}
              </>
            )}
          </div>

          {/* Secondary Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.slice(3).map((product) => (
              <Product
                key={product.id}
                product={product}
                className="hover:scale-[1.02] transition-transform duration-200"
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
