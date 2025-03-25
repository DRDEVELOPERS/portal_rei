// app/admin/layout.js
import Link from "next/link";
import {
  FiLogOut,
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";
import ClientOnly from "@/components/ClientOnly";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 fixed h-screen bg-primary-black text-gray-300 p-6 border-r border-gray-700">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            <span className="text-primary-yellow">ADMIN</span>PANEL
          </h2>
          <p className="text-sm text-gray-400 mt-1">Controle Total</p>
        </div>

        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="menu-item">
            <FiPackage className="menu-icon" />
            Dashboard
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

        <ClientOnly>
          <button className="w-full mt-8 menu-item text-red-400 hover:bg-red-900/10">
            <FiLogOut className="menu-icon" />
            Sair
          </button>
        </ClientOnly>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <ClientOnly>{children}</ClientOnly>
      </main>
    </div>
  );
}
