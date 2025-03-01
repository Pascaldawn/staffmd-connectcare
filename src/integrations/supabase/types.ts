export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointment_reminders: {
        Row: {
          appointment_id: string | null
          created_at: string
          id: string
          reminder_type: string
          scheduled_for: string
          sent_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          id?: string
          reminder_type: string
          scheduled_for: string
          sent_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          id?: string
          reminder_type?: string
          scheduled_for?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_reminders_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          calendar_event_id: string | null
          company_id: string | null
          completed_at: string | null
          created_at: string
          end_time: string
          id: string
          notes: string | null
          payment_status: string | null
          provider_id: string | null
          start_time: string
          status: string | null
          sync_status: string | null
          updated_at: string
        }
        Insert: {
          calendar_event_id?: string | null
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          end_time: string
          id?: string
          notes?: string | null
          payment_status?: string | null
          provider_id?: string | null
          start_time: string
          status?: string | null
          sync_status?: string | null
          updated_at?: string
        }
        Update: {
          calendar_event_id?: string | null
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          end_time?: string
          id?: string
          notes?: string | null
          payment_status?: string | null
          provider_id?: string | null
          start_time?: string
          status?: string | null
          sync_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "appointments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          company_name: string
          company_size: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          industry: string | null
          location: string | null
          updated_at: string
        }
        Insert: {
          company_name: string
          company_size?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id: string
          industry?: string | null
          location?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string
          company_size?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          location?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      company_subscriptions: {
        Row: {
          company_id: string | null
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          plan_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_fees: {
        Row: {
          consultation_type: string
          created_at: string
          fee: number
          id: string
          provider_id: string | null
          updated_at: string
        }
        Insert: {
          consultation_type: string
          created_at?: string
          fee: number
          id?: string
          provider_id?: string | null
          updated_at?: string
        }
        Update: {
          consultation_type?: string
          created_at?: string
          fee?: number
          id?: string
          provider_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultation_fees_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "healthcare_provider_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healthcare_provider_profiles: {
        Row: {
          created_at: string
          id: string
          license_expiry: string | null
          license_number: string | null
          practice_name: string | null
          qualifications: string[] | null
          specialties: string[] | null
          updated_at: string
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          id: string
          license_expiry?: string | null
          license_number?: string | null
          practice_name?: string | null
          qualifications?: string[] | null
          specialties?: string[] | null
          updated_at?: string
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          license_expiry?: string | null
          license_number?: string | null
          practice_name?: string | null
          qualifications?: string[] | null
          specialties?: string[] | null
          updated_at?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "healthcare_provider_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "healthcare_provider_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          message_type: string | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          appointment_id: string | null
          bank_transfer_reference: string | null
          created_at: string
          id: string
          notes: string | null
          paid_by: string | null
          paid_to: string | null
          payment_date: string | null
          payment_method: string
          payment_proof_url: string | null
          status: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          bank_transfer_reference?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          paid_by?: string | null
          paid_to?: string | null
          payment_date?: string | null
          payment_method: string
          payment_proof_url?: string | null
          status?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          bank_transfer_reference?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          paid_by?: string | null
          paid_to?: string | null
          payment_date?: string | null
          payment_method?: string
          payment_proof_url?: string | null
          status?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_paid_by_fkey"
            columns: ["paid_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_paid_by_fkey"
            columns: ["paid_by"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payments_paid_to_fkey"
            columns: ["paid_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_paid_to_fkey"
            columns: ["paid_to"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payments_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          average_rating: number | null
          calendar_preferences: Json | null
          first_name: string | null
          google_calendar_token: Json | null
          google_refresh_token: string | null
          id: string
          is_calendar_connected: boolean | null
          last_name: string | null
          reminder_settings: Json | null
          total_reviews: number | null
          updated_at: string
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          average_rating?: number | null
          calendar_preferences?: Json | null
          first_name?: string | null
          google_calendar_token?: Json | null
          google_refresh_token?: string | null
          id: string
          is_calendar_connected?: boolean | null
          last_name?: string | null
          reminder_settings?: Json | null
          total_reviews?: number | null
          updated_at?: string
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          average_rating?: number | null
          calendar_preferences?: Json | null
          first_name?: string | null
          google_calendar_token?: Json | null
          google_refresh_token?: string | null
          id?: string
          is_calendar_connected?: boolean | null
          last_name?: string | null
          reminder_settings?: Json | null
          total_reviews?: number | null
          updated_at?: string
          user_type?: string | null
        }
        Relationships: []
      }
      provider_availability: {
        Row: {
          created_at: string
          day_of_week: number | null
          end_time: string
          id: string
          is_available: boolean | null
          provider_id: string | null
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week?: number | null
          end_time: string
          id?: string
          is_available?: boolean | null
          provider_id?: string | null
          start_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number | null
          end_time?: string
          id?: string
          is_available?: boolean | null
          provider_id?: string | null
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_availability_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_availability_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      reviews: {
        Row: {
          appointment_id: string | null
          content: string
          created_at: string
          id: string
          is_visible: boolean | null
          rating: number
          reviewee_id: string | null
          reviewer_id: string | null
        }
        Insert: {
          appointment_id?: string | null
          content: string
          created_at?: string
          id?: string
          is_visible?: boolean | null
          rating: number
          reviewee_id?: string | null
          reviewer_id?: string | null
        }
        Update: {
          appointment_id?: string | null
          content?: string
          created_at?: string
          id?: string
          is_visible?: boolean | null
          rating?: number
          reviewee_id?: string | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      staff_accounts: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "staff_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      video_calls: {
        Row: {
          company_id: string | null
          created_at: string
          ended_at: string | null
          id: string
          meeting_url: string | null
          provider_id: string | null
          scheduled_for: string | null
          status: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          ended_at?: string | null
          id?: string
          meeting_url?: string | null
          provider_id?: string | null
          scheduled_for?: string | null
          status?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          ended_at?: string | null
          id?: string
          meeting_url?: string | null
          provider_id?: string | null
          scheduled_for?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_calls_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_calls_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "video_calls_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_calls_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      user_analytics: {
        Row: {
          average_rating_received: number | null
          completed_appointments: number | null
          pending_appointments: number | null
          total_appointments: number | null
          total_reviews_received: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
