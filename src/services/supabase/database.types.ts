export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          organization_id: string | null
          role_id: string | null
          email_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          organization_id?: string | null
          role_id?: string | null
          email_verified?: boolean
        }
        Update: {
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          organization_id?: string | null
          role_id?: string | null
          email_verified?: boolean
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
        }
        Update: {
          name?: string
          description?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          name?: string
          slug?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          email_notifications: boolean
          marketing_emails: boolean
          theme_preference: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email_notifications?: boolean
          marketing_emails?: boolean
          theme_preference?: string
        }
        Update: {
          email_notifications?: boolean
          marketing_emails?: boolean
          theme_preference?: string
        }
        Relationships: []
      }
      downloads: {
        Row: {
          id: string
          user_id: string
          product: string
          version: string | null
          downloaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product: string
          version?: string | null
        }
        Update: {
          product?: string
          version?: string | null
        }
        Relationships: []
      }
      beta_programs: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          active?: boolean
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          active?: boolean
        }
        Relationships: []
      }
      portal_events: {
        Row: {
          id: string
          user_id: string
          portal: string
          event_type: string
          metadata: Record<string, unknown> | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          portal: string
          event_type: string
          metadata?: Record<string, unknown> | null
        }
        Update: {
          portal?: string
          event_type?: string
          metadata?: Record<string, unknown> | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
