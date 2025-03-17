//app/layouts/includes/TopMenu.js
"use client";

import Link from "next/link";
import { BsChevronDown, BsBoxSeam, BsHeadset } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
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
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    if (cart && typeof cart.cartCount === "function") {
      cart.cartCount();
    }
  }, [cart]);

  const isLoggedIn = () => {
    if (user && user?.id) {
      return (
        <button
          onClick={() => setIsMenu(!isMenu)}
          className="flex items-center gap-2 group hover:text-primary-yellow transition-colors"
        >
          <div className="relative">
            <img
              width={32}
              src={user?.picture}
              className="rounded-full border-2 border-primary-yellow transition-transform group-hover:scale-105"
              alt="Foto do perfil"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
          </div>
          <div className="font-medium hidden md:block">Olá, {user.name}</div>
          <BsChevronDown
            className={`w-4 h-4 transition-transform ${
              isMenu ? "rotate-180" : ""
            }`}
          />
        </button>
      );
    }

    return (
      <Link
        href="/auth"
        className="flex items-center gap-2 hover:text-primary-yellow transition-colors"
      >
        <AiOutlineUser className="w-6 h-6" />
        <div className="font-medium hidden md:block">Entrar</div>
        <BsChevronDown className="w-4 h-4" />
      </Link>
    );
  };

  return (
    <div className="hidden md:block">
      <div
        id="TopMenu"
        className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800 shadow-sm"
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4">
          <ul
            id="TopMenuLeft"
            className="flex items-center text-sm text-primary-black dark:text-gray-300 h-14"
          >
            <li className="relative px-4">
              {isLoggedIn()}

              <div
                className={`
                absolute bg-white dark:bg-gray-900 w-64 z-40 top-[56px] -left-4
                shadow-2xl rounded-xl border border-gray-100 dark:border-gray-800
                backdrop-blur-lg ${
                  isMenu ? "visible opacity-100" : "invisible opacity-0"
                } 
                transition-all duration-200
              `}
              >
                <div className="p-4 bg-gradient-to-r from-primary-yellow/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <img
                      width={48}
                      src={user?.picture}
                      className="rounded-full border-2 border-primary-yellow"
                      alt="Foto do perfil"
                    />
                    <div>
                      <div className="font-medium text-sm">{user?.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t dark:border-gray-800" />

                <ul className="p-2 space-y-1">
                  <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <Link
                      href="/orders"
                      className="text-sm flex items-center gap-2"
                    >
                      <BsBoxSeam className="w-4 h-4" />
                      Meus Pedidos
                    </Link>
                  </li>
                  <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <Link
                      href="/profile"
                      className="text-sm flex items-center gap-2"
                    >
                      <AiOutlineUser className="w-4 h-4" />
                      Meu Perfil
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      user.signOut();
                      setIsMenu(false);
                    }}
                    className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-sm flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sair
                  </li>
                </ul>
              </div>
            </li>
            <li className="px-4 nav-hover flex items-center gap-1">
              <BsBoxSeam className="w-4 h-4" />
              Ofertas do Dia
            </li>
            <li className="px-4 nav-hover flex items-center gap-1">
              <BsHeadset className="w-4 h-4" />
              Ajuda & Suporte
            </li>
          </ul>

          <ul
            id="TopMenuRight"
            className="flex items-center text-sm text-primary-black dark:text-gray-300 h-14 gap-2"
          >
            <li
              onClick={() => router.push("/address")}
              className="flex items-center gap-2 px-4 nav-hover bg-gray-100 dark:bg-gray-800 rounded-full py-2 transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <img
                width={24}
                src="/images/br-flag.png"
                className="rounded-full shadow-sm"
                alt="Bandeira do Brasil"
              />
              <span className="hidden sm:block">Enviar para</span>
              <BsChevronDown className="w-3 h-3" />
            </li>
            <ClientOnly>
              <li className="px-4">
                <div
                  onClick={() => router.push("/cart")}
                  className="relative cursor-pointer group"
                >
                  <AiOutlineShoppingCart
                    size={26}
                    className="nav-hover transition-transform group-hover:scale-110"
                  />
                  {cart.cartCount() > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full text-white flex items-center justify-center text-xs ring-2 ring-white dark:ring-gray-900 animate-pulse">
                      {cart.cartCount()}
                    </div>
                  )}
                </div>
              </li>
            </ClientOnly>
          </ul>
        </div>
      </div>
    </div>
  );
}
