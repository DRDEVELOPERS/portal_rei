// app/admin/orders/page.js
"use client";

import { useEffect, useState } from "react";
import { FiDollarSign, FiSearch, FiFilter, FiClock } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ClientOnly from "@/components/ClientOnly";
import AdminLayout from "../layout";
import { formatCurrency } from "@/utils/helpers";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (statusFilter) params.set("status", statusFilter);

      const response = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error("Erro ao carregar pedidos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchOrders();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, statusFilter]);

  return (
    <AdminPanelLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-primary-yellow">
            Gestão de Pedidos
          </h1>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar pedidos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-yellow focus:ring-1 focus:ring-primary-yellow transition-colors"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <div className="dropdown">
                <label
                  tabIndex={0}
                  className="btn bg-gray-800 border border-gray-700 hover:bg-gray-700 flex items-center gap-2"
                >
                  <FiFilter />
                  Status
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-gray-800 rounded-box w-52 border border-gray-700 mt-2"
                >
                  {["Todos", "Pendente", "Processando", "Entregue"].map(
                    (status) => (
                      <li key={status}>
                        <button
                          onClick={() =>
                            setStatusFilter(status === "Todos" ? "" : status)
                          }
                          className={`hover:bg-gray-700 ${
                            statusFilter === status ? "bg-gray-700" : ""
                          }`}
                        >
                          {status}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          {isLoading ? (
            <OrdersSkeleton />
          ) : (
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    {[
                      "Pedido",
                      "Cliente",
                      "Produtos",
                      "Valor Total",
                      "Status",
                      "Data",
                    ].map((header) => (
                      <th
                        key={header}
                        className="text-left py-4 px-6 text-sm text-gray-400"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-300">
                        #{order.id.toString().padStart(4, "0")}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-gray-300">
                            {order.user?.name || "Cliente Anônimo"}
                          </span>
                          {order.user?.email && (
                            <span className="text-xs text-gray-400">
                              {order.user.email}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          {order.orderItem.map((item) => (
                            <span key={item.id} className="text-gray-400">
                              {item.quantity}x{" "}
                              {item.product?.title || item.combo?.title}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-primary-yellow font-semibold">
                        {formatCurrency(order.total / 100)}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {new Date(order.created_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && orders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum pedido encontrado
            </div>
          )}
        </div>
      </div>
    </AdminPanelLayout>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    Entregue: "bg-green-900/30 text-green-400",
    Processando: "bg-blue-900/30 text-blue-400",
    Pendente: "bg-yellow-900/30 text-yellow-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        statusStyles[status] || "bg-gray-700 text-gray-300"
      }`}
    >
      {status || "Desconhecido"}
    </span>
  );
}

function OrdersSkeleton() {
  return (
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 animate-pulse">
          <div className="h-12 bg-gray-700 rounded-lg flex-1" />
          <div className="h-12 bg-gray-700 rounded-lg flex-1" />
          <div className="h-12 bg-gray-700 rounded-lg flex-1" />
          <div className="h-12 bg-gray-700 rounded-lg flex-1" />
          <div className="h-12 bg-gray-700 rounded-lg flex-1" />
          <div className="h-12 bg-gray-700 rounded-lg flex-1" />
        </div>
      ))}
    </div>
  );
}
