// app/admin/layout.js
import Link from "next/link";
import Image from "next/image";
import {
  FiLogOut,
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import ClientOnly from "@/components/ClientOnly";

export default function AdminLayout({ children }) {
  // Dummy staff data - replace with actual data later
  const staffProfile = {
    name: "Reinaldo Schier",
    role: "Administrador",
    initials: "AU",
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 fixed h-screen bg-primary-black text-gray-300 p-6 border-r border-gray-700 flex flex-col">
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
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

        {/* Staff Profile & Logout */}
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <ClientOnly>{children}</ClientOnly>
      </main>
    </div>
  );
}
