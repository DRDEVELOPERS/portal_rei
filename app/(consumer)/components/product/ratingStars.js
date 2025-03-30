// components/RatingStars.js
export default function RatingStars({ rating = 0, reviewCount = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-2xl">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "⭐" : "☆"}
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-600">({reviewCount} avaliações)</span>
    </div>
  );
}
