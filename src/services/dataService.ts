
import { supabase } from "@/integrations/supabase/client";
import type { StaffProfile } from "@/types/staff";

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
  paid_by_profile: { first_name: string; last_name: string } | null;
  paid_to_profile: { first_name: string; last_name: string } | null;
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

export const fetchProfile = async (userId: string): Promise<StaffProfile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  if (data) {
    const validRole = ["admin", "staff", "provider", "company"].includes(data.role) 
      ? (data.role as StaffProfile['role'])
      : "staff";

    return {
      ...data,
      role: validRole,
      user_type: validRole,
    } as StaffProfile;
  }

  return null;
};

export const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
  // Instead of querying a non-existent table, let's aggregate the data we need
  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("status");

  if (appointmentsError) {
    console.error("Error fetching analytics:", appointmentsError);
    return null;
  }

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("rating");

  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError);
    return null;
  }

  const total = appointments.length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : null;

  return {
    total_appointments: total,
    completed_appointments: completed,
    pending_appointments: pending,
    total_reviews_received: reviews.length,
    average_rating_received: avgRating,
  };
};

export const fetchPaymentHistory = async (): Promise<PaymentWithProfiles[]> => {
  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      paid_by_profile:profiles!paid_by(first_name, last_name),
      paid_to_profile:profiles!paid_to(first_name, last_name)
    `);

  if (error) {
    console.error("Error fetching payments:", error);
    return [];
  }

  return data || [];
};

export const fetchReviews = async (userId: string): Promise<ReviewWithProfile[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      content,
      created_at,
      reviewer:profiles!reviews_reviewer_id_fkey(first_name, last_name)
    `)
    .eq("reviewee_id", userId);

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data || [];
};
