//app/layouts/includes/TopMenu.js

"use client";

import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
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
          className="flex items-center gap-2 hover:text-primary-yellow transition-colors"
        >
          <div className="font-medium">Olá, {user.name}</div>
          <BsChevronDown className="w-4 h-4" />
        </button>
      );
    }

    return (
      <Link
        href="/auth"
        className="flex items-center gap-2 hover:text-primary-yellow transition-colors"
      >
        <div className="font-medium">Entrar</div>
        <BsChevronDown className="w-4 h-4" />
      </Link>
    );
  };

  return (
    <>
      <div
        id="TopMenu"
        className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800"
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4">
          <ul
            id="TopMenuLeft"
            className="flex items-center text-sm text-primary-black dark:text-gray-300 h-12"
          >
            <li className="relative px-4">
              {isLoggedIn()}

              <div
                className={`
                absolute bg-white dark:bg-gray-900 w-48 z-40 top-[48px] left-4
                shadow-xl rounded-lg border border-gray-100 dark:border-gray-800
                ${isMenu ? "visible opacity-100" : "invisible opacity-0"} 
                transition-all duration-200
              `}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      src={user?.picture}
                      className="rounded-full border-2 border-primary-yellow"
                      alt="Foto do perfil"
                    />
                    <div className="font-medium text-sm">{user?.name}</div>
                  </div>
                </div>

                <div className="border-t dark:border-gray-800" />

                <ul className="p-2">
                  <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <Link href="/orders" className="text-sm">
                      Meus Pedidos
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      user.signOut();
                      setIsMenu(false);
                    }}
                    className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer text-sm"
                  >
                    Sair
                  </li>
                </ul>
              </div>
            </li>
            <li className="px-4 nav-hover">Ofertas do Dia</li>
            <li className="px-4 nav-hover">Ajuda & Suporte</li>
          </ul>

          <ul
            id="TopMenuRight"
            className="flex items-center text-sm text-primary-black dark:text-gray-300 h-12 gap-2"
          >
            <li
              onClick={() => router.push("/address")}
              className="flex items-center gap-2 px-4 nav-hover bg-gray-100 dark:bg-gray-800 rounded-full py-1.5"
            >
              <img
                width={24}
                src="/images/br-flag.png" // Changed to Brazilian flag
                className="rounded-full"
                alt="Bandeira do Brasil"
              />
              <span>Enviar para</span>
            </li>
            <ClientOnly>
              <li className="px-4">
                <div onClick={() => router.push("/cart")} className="relative">
                  <AiOutlineShoppingCart size={24} className="nav-hover" />
                  {cart.cartCount() > 0 && (
                    <div className="absolute text-xs -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full text-white flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                      {cart.cartCount()}
                    </div>
                  )}
                </div>
              </li>
            </ClientOnly>
          </ul>
        </div>
      </div>
    </>
  );
}
