// app/layouts/includes/TopMenu.js
"use client";

import Link from "next/link";
import {
  BsChevronDown,
  BsBoxSeam,
  BsHeadset,
  BsSearch,
  BsList,
} from "react-icons/bs";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/user";
import { useCart } from "@/app/context/cart";
import ClientOnly from "@/components/ClientOnly";
import { useRouter } from "next/navigation";

export default function TopMenu() {
  const router = useRouter();
  const user = useUser();
  const cart = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (cart && typeof cart.cartCount === "function") {
      cart.cartCount();
    }
  }, [cart]);

  // Mobile Menu Structure
  const MobileMenu = () => (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute bottom-0 w-full bg-white dark:bg-gray-900 rounded-t-2xl p-4 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <img src="/images/logo.svg" className="h-8 w-auto" alt="Logo" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-primary-black dark:text-gray-300"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-4">
          <Link href="/" className="menu-item">
            <BsBoxSeam className="menu-icon" />
            Home
          </Link>
          <Link href="/offers" className="menu-item">
            <BsBoxSeam className="menu-icon" />
            Ofertas
          </Link>
          <Link href="/categories" className="menu-item">
            <BsBoxSeam className="menu-icon" />
            Categorias
          </Link>
          <Link href="/support" className="menu-item">
            <BsHeadset className="menu-icon" />
            Suporte
          </Link>
          {user?.id && (
            <>
              <Link href="/profile" className="menu-item">
                <AiOutlineUser className="menu-icon" />
                Perfil
              </Link>
              <button
                onClick={() => user.signOut()}
                className="menu-item text-red-500 w-full text-left"
              >
                <FiLogOut className="menu-icon" />
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 border-t z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-primary-black dark:text-gray-300"
            >
              <BsList className="w-6 h-6" />
            </button>

            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img
                src="/images/logo.svg"
                className="h-8 w-auto"
                alt="PORTALFERRAGEM Logo"
              />
            </Link>

            <ClientOnly>
              <div
                onClick={() => router.push("/cart")}
                className="relative cursor-pointer group"
              >
                <AiOutlineShoppingCart className="w-6 h-6" />
                {cart.cartCount() > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full text-white flex items-center justify-center text-xs ring-2 ring-white dark:ring-gray-900 animate-pulse">
                    {cart.cartCount()}
                  </div>
                )}
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <MobileMenu />}

      {/* Desktop Menu (keep your existing desktop code) */}
      <div className="hidden md:block">
        {/* Your existing desktop menu code */}
      </div>
    </>
  );
}
