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
        Relationships: []
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
        Relationships: []
      }
      healthcare_provider_profiles: {
        Row: {
          created_at: string
          id: string
          license_number: string | null
          practice_name: string | null
          specialties: string[] | null
          updated_at: string
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          id: string
          license_number?: string | null
          practice_name?: string | null
          specialties?: string[] | null
          updated_at?: string
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          license_number?: string | null
          practice_name?: string | null
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
        Relationships: []
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
        ]
      }
      permissions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string | null
          updated_at: string
          user_type: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_type?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_company_profiles"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: []
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
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission_id: string | null
          role: Database["public"]["Enums"]["company_role"]
        }
        Insert: {
          created_at?: string
          id?: string
          permission_id?: string | null
          role: Database["public"]["Enums"]["company_role"]
        }
        Update: {
          created_at?: string
          id?: string
          permission_id?: string | null
          role?: Database["public"]["Enums"]["company_role"]
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_accounts: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["company_role"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["company_role"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["company_role"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
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
      user_profiles: {
        Row: {
          average_rating: number | null
          calendar_preferences: Json | null
          email: string
          first_name: string | null
          google_calendar_token: string | null
          id: string
          is_calendar_connected: boolean
          last_name: string | null
          reminder_settings: Json | null
          role: string | null
          total_reviews: number | null
          updated_at: string
          user_type: string | null
        }
        Insert: {
          average_rating?: number | null
          calendar_preferences?: Json | null
          email: string
          first_name?: string | null
          google_calendar_token?: string | null
          id: string
          is_calendar_connected?: boolean
          last_name?: string | null
          reminder_settings?: Json | null
          role?: string | null
          total_reviews?: number | null
          updated_at: string
          user_type?: string | null
        }
        Update: {
          average_rating?: number | null
          calendar_preferences?: Json | null
          email?: string
          first_name?: string | null
          google_calendar_token?: string | null
          id?: string
          is_calendar_connected?: boolean
          last_name?: string | null
          reminder_settings?: Json | null
          role?: string | null
          total_reviews?: number | null
          updated_at?: string
          user_type?: string | null
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
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_company_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_own_record: {
        Args: {
          record_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      company_role: "admin" | "manager" | "worker"
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
