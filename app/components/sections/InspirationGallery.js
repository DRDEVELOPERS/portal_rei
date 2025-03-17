// app/components/sections/InspirationGallery.js
"use client";

import Image from "next/image";

export default function InspirationGallery() {
  const galleryImages = Array(6)
    .fill(null)
    .map((_, i) => `/gallery/${i + 1}.jpg`);

  return (
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
            <h3 className="text-2xl font-bold text-white mb-2">Franquias</h3>
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
  );
}
