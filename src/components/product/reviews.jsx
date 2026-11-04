"use client";

import { startTransition, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { addReviewToggle } from "@/lib/actions/review";
import { Star } from "lucide-react";
import { useStarRating } from "@/hooks/starrating";

export default function Reviews({ productId, datareview, session, reviews }) {
  const [addReview, setAddReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const { rating, setRating, setHoverRating, stars, resetRating } =
    useStarRating(0, 5);
  const hasAlreadyReviewed = (reviews || []).some(
    (i) => i.product?.toString() === productId?.toString(),
  );
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    if (hasAlreadyReviewed) {
      console.log("Вже залишили відгук");
      return;
    }
    startTransition(async () => {
      const result = await addReviewToggle(productId, reviewText, rating);
      if (result?.success) {
        setReviewText("");
        resetRating();
        setAddReview(false);
      }
    });
  };
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const safeReviews = datareview || [];
  const visibleReviews = safeReviews.slice(0, visibleCount);
  const hasMore = visibleCount < safeReviews.length;
  return (
    <section className="bg-secondary p-4">
      <div className="w-full text-center flex justify-between px-4">
        <h1 className="text-primary font-primary h1">Відгуки</h1>
        {session?.user && !hasAlreadyReviewed && (
          <Button
            type="button"
            onClick={() => setAddReview((prev) => !prev)}
            className="rounded-full px-4 py-1 text-xl"
          >
            {addReview ? "Скасувати" : "Залишити відгук"}
          </Button>
        )}
      </div>
      {addReview && (
        <form onSubmit={handleAddReview} className="my-4 space-y-3">
          <div className="flex items-center gap-1">
            <span className="mr-2 text-sm text-gray-600">Оцінка:</span>
            {stars.map((star) => (
              <Button
                key={`star-input-${star.value}`}
                type="button"
                onClick={() => setRating(star.value)}
                onMouseEnter={() => setHoverRating(star.value)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none focus:ring-1 focus:ring-primary rounded-full transition-transform hover:scale-110"
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    star.isFilled
                      ? "text-secondary fill-secondary"
                      : "text-secondary"
                  }`}
                />
              </Button>
            ))}
          </div>

          <textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Напишіть свій відгук..."
            className="min-h-20 w-full rounded-3xl border-2 border-secondary bg-primary px-3 py-2 text-secondary"
          />
          <Button type="submit">Опублікувати відгук</Button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4">
        {safeReviews.length === 0 ? (
          <div></div>
        ) : (
          visibleReviews.map((item) => (
            <div key={item._id} className="bg-primary rounded-2xl p-2">
              <div className="p-2 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/Ellipse2.svg" />
                </Avatar>
                <h2 className="font-secondary">{item.name}</h2>
              </div>
              <div className="bg-secondary rounded-2xl p-2">
                <p className="text-primary font-secondary">{item.review}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 pt-2 px-2">
                  {Array.from({ length: 5 }, (_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= (item.star || 0);

                    return (
                      <Star
                        key={`review-${item._id}-star-${starValue}`}
                        className={`w-5 h-5 ${
                          isFilled
                            ? "text-secondary fill-secondary"
                            : "text-secondary"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )))}
      </div>

      {hasMore && (
        <div className="w-full flex flex-col sm:flex-row justify-center items-center mt-4">
          <Button
            type="button"
            onClick={handleLoadMore}
            className="py-2 px-4 rounded-full text-2xl"
          >
            Більше відгуків
          </Button>
        </div>
      )}
    </section>
  );
}