//app/layouts/MainLayout.js
"use client";

import debounce from "lodash/debounce";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

export default function MainLayout() {
  const handleSearchName = (event) => {
    console.log(" ");
  };

  return (
    <div
      id="MainHeader"
      className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
    >
      <nav className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center w-full gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img
              width="120"
              src="/images/logo.svg"
              className="w-28 md:w-32"
              alt="PORTALFERRAGEM Logo"
            />
          </Link>

          <div className="flex-1 relative group">
            <div className="flex items-center gap-2 w-full">
              <div className="relative flex-1">
                <div className="flex items-center w-full rounded-full border-2 border-primary-black dark:border-gray-600 bg-transparent transition-all duration-200 focus-within:border-primary-yellow">
                  <div className="pl-4">
                    <AiOutlineSearch
                      size={22}
                      className="text-primary-black dark:text-gray-400"
                    />
                  </div>

                  <input
                    onChange={handleSearchName}
                    placeholder="Pesquisar por produtos da reforma ao reparo, para trabalhar ou lazer..."
                    type="text"
                    className="w-full py-3 px-4 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <button className="bg-primary-yellow hover:bg-[#f8d634] text-primary-black px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-200">
                Procurar
              </button>
            </div>

            <div className="absolute right-0 -bottom-6">
              <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary-yellow transition-colors">
                Busca Avançada
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
