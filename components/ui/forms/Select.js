// app/components/ui/forms/Select.js
export const Select = ({ label, options, error, className, ...props }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <select
        {...props}
        className={`w-full px-4 py-2 bg-gray-800 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-colors text-gray-100`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-gray-800"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};
