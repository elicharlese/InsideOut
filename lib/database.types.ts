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
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'moderator'
          date_of_birth: string | null
          phone: string | null
          preferred_pronouns: string | null
          bio: string | null
          wallet_address: string | null
          email_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          date_of_birth?: string | null
          phone?: string | null
          preferred_pronouns?: string | null
          bio?: string | null
          wallet_address?: string | null
          email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          date_of_birth?: string | null
          phone?: string | null
          preferred_pronouns?: string | null
          bio?: string | null
          wallet_address?: string | null
          email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          subcategory: string | null
          price: number
          sale_price: number | null
          is_sale: boolean
          is_new: boolean
          is_featured: boolean
          images: string[]
          inventory_count: number
          sku: string | null
          weight: number | null
          dimensions: Json | null
          tags: string[]
          metadata: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          subcategory?: string | null
          price: number
          sale_price?: number | null
          is_sale?: boolean
          is_new?: boolean
          is_featured?: boolean
          images?: string[]
          inventory_count?: number
          sku?: string | null
          weight?: number | null
          dimensions?: Json | null
          tags?: string[]
          metadata?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          subcategory?: string | null
          price?: number
          sale_price?: number | null
          is_sale?: boolean
          is_new?: boolean
          is_featured?: boolean
          images?: string[]
          inventory_count?: number
          sku?: string | null
          weight?: number | null
          dimensions?: Json | null
          tags?: string[]
          metadata?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal: number
          tax_amount: number
          shipping_amount: number
          total_amount: number
          currency: string
          shipping_address: Json
          billing_address: Json
          payment_method_id: string | null
          stripe_payment_intent_id: string | null
          tracking_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          total_amount: number
          currency?: string
          shipping_address: Json
          billing_address: Json
          payment_method_id?: string | null
          stripe_payment_intent_id?: string | null
          tracking_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          total_amount?: number
          currency?: string
          shipping_address?: Json
          billing_address?: Json
          payment_method_id?: string | null
          stripe_payment_intent_id?: string | null
          tracking_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // ... other table types would continue here
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_product_rating: {
        Args: {
          product_uuid: string
        }
        Returns: number
      }
      get_product_review_count: {
        Args: {
          product_uuid: string
        }
        Returns: number
      }
    }
    Enums: {
      user_role: 'user' | 'admin' | 'moderator'
      order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      appointment_status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
      service_type: 'therapy' | 'healthcare' | 'legal' | 'support-group'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
