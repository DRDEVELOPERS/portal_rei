// app/admin/orders/page.js
"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { formatCurrency } from "@/utils/helpers";
import AdminLayout from "../layout";

const dummyOrders = [
  {
    id: 1,
    user: { name: "João Silva", email: "joao@exemplo.com" },
    orderItem: [
      { quantity: 2, product: { title: "Furadeira 500W" } },
      { quantity: 1, combo: { title: "Kit Ferramentas Básico" } },
    ],
    total: 29990,
    status: "Processando",
    created_at: "2024-03-15",
  },
  {
    id: 2,
    user: { name: "Maria Souza" },
    orderItem: [{ quantity: 1, product: { title: "Serra Circular" } }],
    total: 18990,
    status: "Entregue",
    created_at: "2024-03-14",
  },
  {
    id: 3,
    user: { name: "Carlos Oliveira", email: "carlos@empresa.com" },
    orderItem: [
      { quantity: 3, product: { title: "Parafusadeira 18V" } },
      { quantity: 1, product: { title: "Jogo de Brocas" } },
    ],
    total: 45990,
    status: "Pendente",
    created_at: "2024-03-13",
  },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Simulate initial load with dummy data
    const loadData = () => {
      try {
        const timer = setTimeout(() => {
          setFilteredOrders(dummyOrders);
          setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Data loading error:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      try {
        const results = dummyOrders.filter((order) => {
          const searchLower = searchQuery.toLowerCase();
          const matchesSearch =
            order.user.name.toLowerCase().includes(searchLower) ||
            order.id.toString().includes(searchQuery) ||
            order.orderItem.some((item) =>
              (item.product?.title || item.combo?.title)
                .toLowerCase()
                .includes(searchLower)
            );

          const matchesStatus = statusFilter
            ? order.status === statusFilter
            : true;
          return matchesSearch && matchesStatus;
        });

        setFilteredOrders(results);
      } catch (error) {
        console.error("Filtering error:", error);
      }
    };

    if (!isLoading) filterData();
  }, [searchQuery, statusFilter, isLoading]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-primary-yellow">
            Gestão de Pedidos
          </h1>

          {/* Controls Container */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
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

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="btn bg-gray-800 border border-gray-700 flex items-center gap-2 pr-8 appearance-none"
              >
                <option value="">Todos Status</option>
                <option value="Processando">Processando</option>
                <option value="Entregue">Entregue</option>
                <option value="Pendente">Pendente</option>
              </select>
              <FiFilter className="absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Orders Table Container */}
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
                  {filteredOrders.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-6 text-center text-gray-400"
                      >
                        Nenhum pedido encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function OrderRow({ order }) {
  return (
    <tr className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors">
      <td className="py-4 px-6 font-medium text-gray-300">
        #{order.id.toString().padStart(4, "0")}
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-gray-300">{order.user.name}</span>
          {order.user.email && (
            <span className="text-xs text-gray-400">{order.user.email}</span>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col gap-1">
          {order.orderItem.map((item, index) => (
            <span key={index} className="text-gray-400">
              {item.quantity}x {item.product?.title || item.combo?.title}
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
      {status}
    </span>
  );
}

function OrdersSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-16 bg-gray-700 rounded-lg" />
          <div className="h-16 bg-gray-700 rounded-lg" />
          <div className="h-16 bg-gray-700 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
