// app/layouts/includes/MobileHeader.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useCart } from "@/app/context/cart";
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import debounce from "lodash/debounce";

export default function MobileHeader() {
  const router = useRouter();
  const cart = useCart();
  const user = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchName = debounce((event) => {
    console.log(event.target.value);
  }, 500);

  return (
    <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 relative z-50">
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Mobile Header */}
      <nav className="md:hidden">
        {!isSearchExpanded ? (
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-primary-black dark:text-gray-300"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <img
                  width="120"
                  src="/images/logo.svg"
                  className="w-28"
                  alt="PORTALFERRAGEM Logo"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <AiOutlineSearch
                size={24}
                className="text-primary-black dark:text-gray-300 cursor-pointer"
                onClick={() => setIsSearchExpanded(true)}
              />
              <div
                className="relative cursor-pointer"
                onClick={() => router.push("/cart")}
              >
                <AiOutlineShoppingCart
                  size={26}
                  className="text-primary-black dark:text-gray-300"
                />
                {cart?.cartCount() > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full text-white flex items-center justify-center text-xs ring-2 ring-white dark:ring-gray-900 animate-pulse">
                    {cart.cartCount()}
                  </div>
                )}
              </div>
              {user?.id ? (
                <img
                  src={user.picture}
                  className="w-8 h-8 rounded-full border-2 border-primary-yellow"
                  alt="User avatar"
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push("/auth")}
                >
                  <AiOutlineUser
                    size={24}
                    className="flex items-center gap-2 px-4 nav-hover bg-gray-100 dark:bg-gray-800 rounded-full py-2 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 text-primary-black dark:text-gray-300"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          // Expanded Search Input
          <div className="flex items-center gap-4 px-4 py-4">
            <button
              onClick={() => setIsSearchExpanded(false)}
              className="text-primary-black dark:text-gray-300"
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="flex-1 flex items-center gap-2 border-2 border-primary-yellow bg-white dark:bg-gray-800 rounded-full px-4 py-2 transition-all duration-200 focus-within:border-primary-yellow">
              <AiOutlineSearch
                size={20}
                className="nav-hover transition-transform group-hover:scale-110"
              />
              <input
                autoFocus
                onChange={handleSearchName}
                placeholder="Pesquisar..."
                type="text"
                // className="w-full bg-transparent placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none"
                className="text-primary-yellow"
              />
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Header */}
      <nav className="hidden md:flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center w-full gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img
              width="120"
              src="/images/logo.svg"
              className="w-32"
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
