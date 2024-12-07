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
      companies: {
        Row: {
          billing_address: string
          billing_email: string
          company_name: string
          created_at: string
          id: string
        }
        Insert: {
          billing_address: string
          billing_email: string
          company_name: string
          created_at?: string
          id?: string
        }
        Update: {
          billing_address?: string
          billing_email?: string
          company_name?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          latitude: number
          longitude: number
          title: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude: number
          longitude: number
          title: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number
          longitude?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string | null
          contact_email: string
          created_at: string
          id: string
          is_primary_user: boolean | null
          last_login: string | null
          max_additional_users: number | null
          primary_user_id: string | null
          role: string | null
          user_status: string | null
        }
        Insert: {
          company_id?: string | null
          contact_email: string
          created_at?: string
          id: string
          is_primary_user?: boolean | null
          last_login?: string | null
          max_additional_users?: number | null
          primary_user_id?: string | null
          role?: string | null
          user_status?: string | null
        }
        Update: {
          company_id?: string | null
          contact_email?: string
          created_at?: string
          id?: string
          is_primary_user?: boolean | null
          last_login?: string | null
          max_additional_users?: number | null
          primary_user_id?: string | null
          role?: string | null
          user_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          bids_due: string | null
          bids_due_to: string | null
          created_at: string
          databid_id: string | null
          databid_reporter: string | null
          detail_of_services: string | null
          dows: string | null
          id: string
          industry: string | null
          latitude: number | null
          location: string
          longitude: number | null
          prebid_datetime: string | null
          prebid_location: string | null
          prequalification: boolean | null
          prequalification_info: string | null
          project_bid_no: string | null
          project_class: string | null
          project_document_info: string | null
          questions_contact: string | null
          sector: string | null
          stage: string | null
          title: string
          trade: string | null
          updated_at: string
        }
        Insert: {
          bids_due?: string | null
          bids_due_to?: string | null
          created_at?: string
          databid_id?: string | null
          databid_reporter?: string | null
          detail_of_services?: string | null
          dows?: string | null
          id?: string
          industry?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          prebid_datetime?: string | null
          prebid_location?: string | null
          prequalification?: boolean | null
          prequalification_info?: string | null
          project_bid_no?: string | null
          project_class?: string | null
          project_document_info?: string | null
          questions_contact?: string | null
          sector?: string | null
          stage?: string | null
          title: string
          trade?: string | null
          updated_at?: string
        }
        Update: {
          bids_due?: string | null
          bids_due_to?: string | null
          created_at?: string
          databid_id?: string | null
          databid_reporter?: string | null
          detail_of_services?: string | null
          dows?: string | null
          id?: string
          industry?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          prebid_datetime?: string | null
          prebid_location?: string | null
          prequalification?: boolean | null
          prequalification_info?: string | null
          project_bid_no?: string | null
          project_class?: string | null
          project_document_info?: string | null
          questions_contact?: string | null
          sector?: string | null
          stage?: string | null
          title?: string
          trade?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      region_access: {
        Row: {
          created_at: string
          id: string
          region_id: string | null
          subscription_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          region_id?: string | null
          subscription_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          region_id?: string | null
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "region_access_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "region_access_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          auto_renewal: boolean | null
          billing_cycle_end: string | null
          billing_cycle_start: string | null
          company_id: string | null
          created_at: string
          end_date: string | null
          id: string
          payment_status: string | null
          plan_type: string | null
          start_date: string | null
          status: string | null
          subscription_tier: string | null
        }
        Insert: {
          auto_renewal?: boolean | null
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          company_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          payment_status?: string | null
          plan_type?: string | null
          start_date?: string | null
          status?: string | null
          subscription_tier?: string | null
        }
        Update: {
          auto_renewal?: boolean | null
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          company_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          payment_status?: string | null
          plan_type?: string | null
          start_date?: string | null
          status?: string | null
          subscription_tier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
