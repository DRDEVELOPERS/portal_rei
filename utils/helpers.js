// utils/helpers.js
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Optional: Add other helper functions if needed
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};
