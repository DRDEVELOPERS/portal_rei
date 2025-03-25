// app/admin/dashboard/page.js
import { FiPackage, FiDollarSign, FiUsers, FiClock } from "react-icons/fi";
import ClientOnly from "@/components/ClientOnly";
import dynamic from "next/dynamic";

// Dummy data
const stats = {
  dailyOrders: 42,
  dailyRevenue: 12500,
  activeUsers: 234,
  averageTime: "2h34",
};

const recentOrders = [
  {
    id: "#0425",
    total: "R$ 299,90",
    status: "Entregue",
    createdAt: "25/04/2024",
  },
  {
    id: "#0424",
    total: "R$ 599,90",
    status: "Processando",
    createdAt: "24/04/2024",
  },
  {
    id: "#0423",
    total: "R$ 199,90",
    status: "Pendente",
    createdAt: "23/04/2024",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pedidos Hoje"
          value={stats.dailyOrders}
          icon={<FiPackage className="menu-icon" />}
          trend="+12%"
        />
        <StatCard
          title="Faturamento"
          value={stats.dailyRevenue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          icon={<FiDollarSign className="menu-icon" />}
          trend="+18%"
        />
        <StatCard
          title="Usuários Ativos"
          value={stats.activeUsers}
          icon={<FiUsers className="menu-icon" />}
          trend="+5%"
        />
        <StatCard
          title="Tempo Médio"
          value="2h34"
          icon={<FiClock className="menu-icon" />}
          trend="-8%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartPlaceholder title="Vendas Recentes" />
        <ChartPlaceholder title="Desempenho de Produtos" />
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  const trendColor = trend.startsWith("+")
    ? "text-green-400"
    : trend.startsWith("-")
    ? "text-red-400"
    : "text-gray-400";

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-primary-yellow mt-2">{value}</p>
          <span className={`text-sm ${trendColor}`}>{trend}</span>
        </div>
        <div className="text-primary-yellow p-3 bg-gray-700 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ChartPlaceholder({ title }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-primary-yellow mb-4">
        {title}
      </h3>
      <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Gráfico demonstrativo</span>
      </div>
    </div>
  );
}

function RecentOrdersTable({ orders }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold p-6 text-primary-yellow">
        Pedidos Recentes
      </h3>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              {["Pedido #", "Data", "Valor", "Status"].map((header) => (
                <th
                  key={header}
                  className="text-left py-3 px-6 text-sm text-gray-400"
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
                  {order.id}
                </td>
                <td className="py-4 px-6 text-gray-400">{order.createdAt}</td>
                <td className="py-4 px-6 font-semibold text-primary-yellow">
                  {order.total}
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    Entregue: "bg-green-900/30 text-green-400",
    Processando: "bg-blue-900/30 text-blue-400",
    Pendente: "bg-yellow-900/30 text-yellow-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
