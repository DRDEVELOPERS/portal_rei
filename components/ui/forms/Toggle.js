// app/components/ui/forms/Toggle.js
import { useState } from "react";

export const Toggle = ({ label, initialChecked = false, onChange }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleToggle = () => {
    setChecked(!checked);
    onChange?.(!checked);
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm font-medium text-gray-300">{label}</span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-primary-yellow" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
