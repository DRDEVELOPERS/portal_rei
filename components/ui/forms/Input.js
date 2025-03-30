// app/components/ui/forms/Input.js
export const Input = ({ label, error, className, ...props }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2 bg-gray-800 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-colors text-gray-100`}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};
