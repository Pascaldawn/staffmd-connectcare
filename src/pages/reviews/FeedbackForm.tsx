
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: appointmentData, error: appointmentError } = await supabase
        .from("appointments")
        .select("company_id, provider_id")
        .eq("id", appointmentId)
        .single();

      if (appointmentError) throw appointmentError;

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const revieweeId = userData.user.id === appointmentData.company_id
        ? appointmentData.provider_id
        : appointmentData.company_id;

      const { error: reviewError } = await supabase
        .from("reviews")
        .insert({
          reviewer_id: userData.user.id,
          reviewee_id: revieweeId,
          rating,
          content: review,
          appointment_id: appointmentId,
        });

      if (reviewError) throw reviewError;

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });

      navigate(-1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Submit Feedback</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredStar || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Review</label>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            className="min-h-[150px]"
            required
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={!rating || !review}>
            Submit Feedback
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
