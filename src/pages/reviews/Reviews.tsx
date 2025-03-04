import { useEffect, useState } from "react";
import { fetchReviews, type ReviewWithProfile } from "@/services/dataService";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  rating: number;
  content: string;
  created_at: string;
  reviewer: {
    first_name: string;
    last_name: string;
  };
}

const Reviews = ({ userId }: { userId: string }) => {
  const [reviews, setReviews] = useState<ReviewWithProfile[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchReviews(userId);
      setReviews(data);

      if (data) {
        const avg = data.reduce((acc, review) => acc + review.rating, 0) / data.length;
        setAverageRating(data.length > 0 ? avg : null);
      }
    };

    loadReviews();
  }, [userId]);

  return (
    <div className="space-y-6">
      {averageRating !== null && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews.length} reviews)
          </span>
        </div>
      )}

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-sm font-medium">
                    {review.reviewer.first_name} {review.reviewer.last_name}
                  </CardTitle>
                  <CardDescription>
                    {new Date(review.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
