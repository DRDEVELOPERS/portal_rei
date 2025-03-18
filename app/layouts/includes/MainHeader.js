// app/layouts/includes/MobileHeader.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useCart } from "@/app/context/cart";
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function MobileHeader() {
  const router = useRouter();
  const cart = useCart();
  const user = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      {/* Mobile Menu Component */}
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <nav className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Trigger */}
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
            className="text-primary-black dark:text-gray-300"
            onClick={() => router.push("/search")}
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
                className="text-primary-black dark:text-gray-300"
              />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
