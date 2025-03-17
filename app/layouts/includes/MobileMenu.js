// app/layouts/includes/MobileMenu.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiUser, FiShoppingCart } from "react-icons/fi";
import { useUser } from "@/app/context/user";
import { useCart } from "@/app/context/cart";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const cart = useCart();

  const menuItems = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Ofertas", href: "/deals" },
    { id: 3, name: "Categorias", href: "/categories" },
    { id: 4, name: "Minha Conta", href: user?.id ? "/profile" : "/auth" },
    { id: 5, name: "Carrinho", href: "/cart" },
    { id: 6, name: "Ajuda", href: "/help" },
  ];

  return (
    <div className="md:hidden">
      {/* Mobile Menu Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-primary-black dark:text-gray-300"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Content */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-primary-black dark:text-gray-300"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name === "Carrinho" && (
                    <div className="relative">
                      <FiShoppingCart className="w-5 h-5" />
                      {cart.cartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {cart.cartCount()}
                        </span>
                      )}
                    </div>
                  )}
                  {item.name === "Minha Conta" && (
                    <FiUser className="w-5 h-5" />
                  )}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {user?.id && (
            <div className="mt-4 pt-4 border-t dark:border-gray-800">
              <div className="flex items-center gap-3 px-3">
                <img
                  src={user.picture}
                  className="w-8 h-8 rounded-full border-2 border-primary-yellow"
                  alt="Profile"
                />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </nav>
      </aside>
    </div>
  );
}
