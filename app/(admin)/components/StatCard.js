// app/admin/dashboard/components/StatCard.js
export function StatCard({ title, value, icon, trend }) {
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
