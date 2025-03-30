// app/admin/dashboard/components/ChartPlaceholder.js

import { Select } from "@/components/ui/forms/Select";

export function ChartPlaceholder({ title, showDetails }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary-yellow">{title}</h3>
        <Select
          options={[
            { value: "week", label: "Última semana" },
            { value: "month", label: "Último mês" },
          ]}
          className="w-40"
        />
      </div>
      {showDetails ? (
        <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Gráfico demonstrativo</span>
        </div>
      ) : (
        <div className="h-32 bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Visualização simplificada</span>
        </div>
      )}
    </div>
  );
}
