// app/layouts/includes/MobileMenu.js
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiX, FiUser, FiShoppingCart } from "react-icons/fi";
import { useUser } from "@/app/context/user";
import { useCart } from "@/app/context/cart";
import { AiOutlineUser } from "react-icons/ai";

export default function MobileMenu({ isOpen, setIsOpen }) {
  const user = useUser();
  const cart = useCart();

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener("routechange", handleRouteChange);
    return () => window.removeEventListener("routechange", handleRouteChange);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const menuItems = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Ofertas", href: "/deals" },
    { id: 3, name: "Categorias", href: "/categories" },
    { id: 4, name: "Minha Conta", href: user?.id ? "/profile" : "/auth" },
    { id: 5, name: "Carrinho", href: "/cart" },
    { id: 6, name: "Ajuda", href: "/help" },
  ];

  return (
    <>
      {/* Dark overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Vertical left-side menu */}
      <aside
        className={`fixed left-0 top-0 z-[1000]  w-[280px] bg-[#1a365d] shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with logo */}
        <div className="flex items-center justify-between p-4 border-b border-[#2d4a7a] bg-[#1a365d]">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img
              src="/images/logo.svg"
              className="w-24 filter brightness-0 invert"
              alt="PORTALFERRAGEM Logo"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-white hover:text-yellow-400 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable content area */}
        <nav className="p-4 flex flex-col justify-between h-[calc(100%-72px)] bg-[#1a365d] overflow-y-auto">
          <div className="space-y-4">
            {/* User Section */}
            <div className="mb-4">
              {user?.id ? (
                <div className="flex items-center gap-3 p-3 bg-[#2d4a7a] rounded-lg">
                  <img
                    src={user.picture}
                    className="w-10 h-10 rounded-full border-2 border-yellow-400"
                    alt="Profile"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-blue-200">{user.email}</p>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 text-white hover:bg-[#2d4a7a] rounded-lg transition-colors"
                >
                  <AiOutlineUser className="w-6 h-6 text-yellow-400" />
                  <span>Entrar/Cadastrar</span>
                </Link>
              )}
            </div>

            {/* Menu Items */}
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 p-3 text-white hover:bg-[#2d4a7a] rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name === "Carrinho" && (
                      <div className="relative">
                        <FiShoppingCart className="w-5 h-5 text-yellow-400" />
                        {/* Added optional chaining for cart */}
                        {cart?.cartCount() > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                            {/* Added optional chaining here too */}
                            {cart?.cartCount()}
                          </span>
                        )}
                      </div>
                    )}
                    {item.name === "Minha Conta" && (
                      <FiUser className="w-5 h-5 text-yellow-400" />
                    )}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-[#2d4a7a] bg-[#1a365d] sticky bottom-0">
            <div className="mb-4 p-4 bg-[#2d4a7a] rounded-lg">
              <h3 className="text-white text-sm font-semibold mb-2">
                PORTALFERRAGEM.shop
              </h3>
              <button className="w-full bg-yellow-400 text-[#1a365d] py-2 px-4 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                Ver Ofertas
              </button>
            </div>

            <div className="pt-4 border-t border-[#2d4a7a]">
              <p className="text-blue-200 text-sm text-center">
                Entrega Rápida para todo Brasil!
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
