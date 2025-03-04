//app/layouts/includes/TopMenu.js

"use client";

import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function TopMenu() {
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
              loggeding
              <div
                className={`
                absolute bg-white dark:bg-gray-900 w-48 z-40 top-[48px] left-4
                shadow-xl rounded-lg border border-gray-100 dark:border-gray-800`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      src="https://placeholder.co/40"
                      className="rounded-full border-2 border-primary-yellow"
                      alt="Foto do perfil"
                    />
                    <div className="font-medium text-sm">Danilo</div>
                  </div>
                </div>

                <div className="border-t dark:border-gray-800" />

                <ul className="p-2">
                  <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <Link href="/orders" className="text-sm">
                      Meus Pedidos
                    </Link>
                  </li>
                  <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer text-sm">
                    Sair
                  </li>
                </ul>
              </div>
            </li>
            <li className="px-4 nav-hover">Ofertas do Dia</li>
            <li className="px-4 nav-hover">Ajuda & Suporte</li>
          </ul>
        </div>
      </div>
    </>
  );
}
