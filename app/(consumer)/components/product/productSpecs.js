// components/ProductSpecs.js
export default function ProductSpecs({ specs }) {
  const defaultSpecs = {
    voltage: ["110V", "220V"],
    warranty: "12 meses",
    brand: "Makita",
    power: "850W",
    weight: "3.5kg",
  };

  const displaySpecs = specs || defaultSpecs;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-gray-600 text-lg font-semibold mb-4">
        Especificações Técnicas
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(displaySpecs).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b pb-2">
            <span className="text-gray-600 capitalize">{key}:</span>
            <span className="font-medium">
              {Array.isArray(value) ? value.join(" / ") : value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
