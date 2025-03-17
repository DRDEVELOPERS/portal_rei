// app/components/sections/NewsletterSection.js
"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <section className="bg-primary-black dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-5xl font-bold text-primary-yellow mb-4">
          Quer receber novidades?
        </h2>
        <p className="text-gray-300 mb-8">
          Faça parte de um grupo exclusivo, a gente só manda novidades para quem
          busca exclusividade!
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
  );
}
