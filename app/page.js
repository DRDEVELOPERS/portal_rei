// app/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import MainLayout from "./layouts/MainLayout";
import TopHeader from "./layouts/includes/TopHeader";
import CarouselComp from "./components/CarouselComp";

export default function Home() {
  return (
    <MainLayout>
      <div className="mt-12">
        <CarouselComp />
        <TopHeader />
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
          <h2 className="text-3xl font-bold text-primary-black dark:text-gray-200 mb-8">
            Para você
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
                  Professional Workshop Setups
                </h3>
                <p className="text-gray-200">
                  Explore ideal configurations for various spaces
                </p>
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
                      View Ideas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
