import { Star, StarHalf } from "lucide-react";

export function useProductRating(reviews) {
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, item) => sum + (item.star), 0) / reviews.length : 0;
  const reviewsCount = reviews.length; 
  const formattedRating =  averageRating > 0 ? averageRating.toFixed(1) : "Немає оцінок";
  const renderStars = () => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => {
      const starValue = index + 1;
      if (averageRating >= starValue) {
        return (
          <Star
            key={`star-${starValue}`}
            className="w-5 h-5 text-secondary fill-secondary"
          />
        );
      }
      if (averageRating >= starValue - 0.5) {
        return (
          <StarHalf
            key={`star-${starValue}`}
            className="w-5 h-5 text-secondary fill-secondary"
          />
        );
      }
      return (
        <Star key={`star-${starValue}`} className="w-5 h-5 text-secondary" />
      );

    });
  };
  return {
    averageRating,
    formattedRating, 
    reviewsCount,
    renderStars,
  };
}