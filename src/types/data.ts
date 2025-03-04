
export interface AnalyticsData {
  total_appointments: number;
  completed_appointments: number;
  pending_appointments: number;
  total_reviews_received: number;
  average_rating_received: number | null;
}

export interface PaymentWithProfiles {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  payment_method: string;
  appointment?: {
    start_time: string;
  };
  paid_by_profile: { first_name: string; last_name: string; } | null;
  paid_to_profile: { first_name: string; last_name: string; } | null;
}

export interface ReviewWithProfile {
  id: string;
  rating: number;
  content: string;
  created_at: string;
  reviewer: {
    first_name: string;
    last_name: string;
  };
}
