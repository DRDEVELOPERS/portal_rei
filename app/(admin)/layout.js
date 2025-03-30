// app/(admin)/layout.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiLogOut,
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiBox, // Added FiBox icon for products
} from "react-icons/fi";
import ClientOnly from "@/components/ClientOnly";

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const staffProfile = {
    name: "Reinaldo Schier",
    role: "Administrador",
    initials: "RS",
  };

  const MobileSidebar = () => (
    <div
      className={`fixed inset-0 z-50 md:hidden ${
        isMobileMenuOpen ? "block" : "hidden"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside className="relative w-64 h-full bg-primary-black text-gray-300 p-6 border-r border-gray-700 flex flex-col animate-slideIn">
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Logo Section */}
        <div className="mb-8">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={120}
            height={40}
            className="w-28 mb-4"
          />
          <h2 className="text-2xl font-bold">
            <span className="text-primary-yellow">ADMIN</span>PAINEL
          </h2>
          <p className="text-sm text-gray-400 mt-1">Controle Total</p>
        </div>

        {/* Navigation - Added Products link */}
        <nav className="space-y-2 flex-1">
          <Link
            href="/admin/dashboard"
            className="menu-item"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiPackage className="menu-icon" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="menu-item"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiBox className="menu-icon" />
            Produtos
          </Link>
          <Link
            href="/admin/orders"
            className="menu-item"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiDollarSign className="menu-icon" />
            Pedidos
          </Link>
          <Link
            href="/admin/orders"
            className="menu-item"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiUsers className="menu-icon" />
            Usuários
          </Link>
          <Link
            href="/admin/settings"
            className="menu-item"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiSettings className="menu-icon" />
            Configurações
          </Link>
        </nav>

        {/* Staff Profile */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full border-2 border-primary-yellow bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-300">
              {staffProfile.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">
                {staffProfile.name}
              </p>
              <p className="text-xs text-gray-400">{staffProfile.role}</p>
            </div>
          </div>

          <button className="w-full menu-item text-red-400 hover:bg-red-900/10">
            <FiLogOut className="menu-icon" />
            Sair
          </button>
        </div>
      </aside>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 text-gray-300 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 fixed h-screen bg-primary-black text-gray-300 p-6 border-r border-gray-700 flex-col">
        {/* Logo Section */}
        <div className="mb-8">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={120}
            height={40}
            className="w-28 mb-4"
          />
          <h2 className="text-2xl font-bold">
            <span className="text-primary-yellow">ADMIN</span>PAINEL
          </h2>
          <p className="text-sm text-gray-400 mt-1">Controle Total</p>
        </div>

        {/* Navigation - Added Products link */}
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard" className="menu-item">
            <FiPackage className="menu-icon" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="menu-item">
            <FiBox className="menu-icon" />
            Produtos
          </Link>
          <Link href="/admin/orders" className="menu-item">
            <FiDollarSign className="menu-icon" />
            Pedidos
          </Link>
          <Link href="/admin/users" className="menu-item">
            <FiUsers className="menu-icon" />
            Usuários
          </Link>
          <Link href="/admin/settings" className="menu-item">
            <FiSettings className="menu-icon" />
            Configurações
          </Link>
        </nav>

        {/* Staff Profile */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full border-2 border-primary-yellow bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-300">
              {staffProfile.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">
                {staffProfile.name}
              </p>
              <p className="text-xs text-gray-400">{staffProfile.role}</p>
            </div>
          </div>

          <ClientOnly>
            <button className="w-full menu-item text-red-400 hover:bg-red-900/10">
              <FiLogOut className="menu-icon" />
              Sair
            </button>
          </ClientOnly>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-64" : "translate-x-0"
        } md:translate-x-0 md:ml-64 p-4 md:p-8`}
      >
        {/* Mobile Header Logo */}
        <div className="md:hidden mb-6">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={120}
            height={40}
            className="w-28"
          />
        </div>

        <ClientOnly>{children}</ClientOnly>
      </main>
    </div>
  );
}
