import { useState } from "react";

export function useStarRating(initialRating, totalStars = 5) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const resetRating = () => setRating(0);
  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starValue = index + 1;
    return {
      value: starValue,
      isFilled: starValue <= (hoverRating || rating),
    };
  });
  return {
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    stars,
    resetRating,
  };
}