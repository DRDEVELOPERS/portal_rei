// app/(admin)/;/dashboard/page.js

"use client";

import { useState } from "react";
import { FiPackage, FiDollarSign, FiUsers, FiClock } from "react-icons/fi";
import { Input } from "@/components/ui/forms/Input";
import ClientOnly from "@/components/ClientOnly";
import { StatCard } from "../../components/StatCard";
import { ChartPlaceholder } from "../../components/ChartPlaceholder";
import { Select } from "@/components/ui/forms/Select";
import { Toggle } from "@/components/ui/forms/Toggle";
import { RecentOrdersTable } from "../../components/RecentOrdersTable";
// import { RecentOrdersTable, StatCard, ChartPlaceholder } from "./components";

const STATS = {
  dailyOrders: 42,
  dailyRevenue: 12500,
  activeUsers: 234,
  averageTime: "2h34",
};

const STATUS_OPTIONS = [
  { value: "all", label: "Todos Status" },
  { value: "Entregue", label: "Entregue" },
  { value: "Processando", label: "Processando" },
  { value: "Pendente", label: "Pendente" },
];

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState("today");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <Input
          label="Buscar pedidos"
          placeholder="Digite o ID do pedido..."
          className="md:col-span-2"
        />
        <Select
          label="Filtrar por status"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <Toggle
          label="Mostrar detalhes"
          initialChecked={showDetails}
          onChange={setShowDetails}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pedidos Hoje"
          value={STATS.dailyOrders}
          icon={<FiPackage className="text-2xl" />}
          trend="+12%"
        />
        <StatCard
          title="Faturamento"
          value={STATS.dailyRevenue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          icon={<FiDollarSign className="text-2xl" />}
          trend="+18%"
        />
        <StatCard
          title="Usuários Ativos"
          value={STATS.activeUsers}
          icon={<FiUsers className="text-2xl" />}
          trend="+5%"
        />
        <StatCard
          title="Tempo Médio"
          value="2h34"
          icon={<FiClock className="text-2xl" />}
          trend="-8%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartPlaceholder title="Vendas Recentes" showDetails={showDetails} />
        <ChartPlaceholder
          title="Desempenho de Produtos"
          showDetails={showDetails}
        />
      </div>

      {/* Recent Orders Table */}
      <ClientOnly>
        <RecentOrdersTable />
      </ClientOnly>
    </div>
  );
}
