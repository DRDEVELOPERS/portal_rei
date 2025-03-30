// app/admin/dashboard/components/RecentOrdersTable.js
import { FiClock } from "react-icons/fi";

const dummyOrders = [
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

export function RecentOrdersTable() {
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
            {dummyOrders.map((order) => (
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
