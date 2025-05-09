export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      idea_activities: {
        Row: {
          idea_id: string;
          view_count: number;
          vote_count: number;
        };
        Insert: {
          idea_id: string;
          view_count?: number;
          vote_count?: number;
        };
        Update: {
          idea_id?: string;
          view_count?: number;
          vote_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "idea_activities_idea_id_fkey";
            columns: ["idea_id"];
            isOneToOne: true;
            referencedRelation: "ideas";
            referencedColumns: ["id"];
          }
        ];
      };
      idea_reports: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          idea_id: string;
          reason: Database["public"]["Enums"]["report_reason"];
          status: Database["public"]["Enums"]["report_status"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          idea_id: string;
          reason: Database["public"]["Enums"]["report_reason"];
          status?: Database["public"]["Enums"]["report_status"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          idea_id?: string;
          reason?: Database["public"]["Enums"]["report_reason"];
          status?: Database["public"]["Enums"]["report_status"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "idea_reports_idea_id_fkey";
            columns: ["idea_id"];
            isOneToOne: false;
            referencedRelation: "ideas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "idea_reports_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      idea_tags: {
        Row: {
          idea_id: string;
          tag_id: number;
        };
        Insert: {
          idea_id: string;
          tag_id: number;
        };
        Update: {
          idea_id?: string;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "idea_tags_idea_id_fkey";
            columns: ["idea_id"];
            isOneToOne: false;
            referencedRelation: "ideas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "idea_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          }
        ];
      };
      idea_tech_stacks: {
        Row: {
          idea_id: string;
          tech_stack_id: number;
        };
        Insert: {
          idea_id: string;
          tech_stack_id: number;
        };
        Update: {
          idea_id?: string;
          tech_stack_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "idea_tech_stacks_idea_id_fkey";
            columns: ["idea_id"];
            isOneToOne: false;
            referencedRelation: "ideas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "idea_tech_stacks_tech_stack_id_fkey";
            columns: ["tech_stack_id"];
            isOneToOne: false;
            referencedRelation: "tech_stacks";
            referencedColumns: ["id"];
          }
        ];
      };
      idea_views: {
        Row: {
          created_at: string;
          idea_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          idea_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          idea_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "idea_views_idea_id_fkey";
            columns: ["idea_id"];
            isOneToOne: false;
            referencedRelation: "ideas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "idea_views_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      idea_votes: {
        Row: {
          created_at: string;
          idea_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          idea_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          idea_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "idea_votes_idea_id_fkey";
            columns: ["idea_id"];
            isOneToOne: false;
            referencedRelation: "ideas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "idea_votes_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      ideas: {
        Row: {
          created_at: string;
          difficulty: Database["public"]["Enums"]["idea_difficulty"];
          full_description: string;
          id: string;
          short_description: string;
          status: Database["public"]["Enums"]["idea_status"];
          title: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          difficulty: Database["public"]["Enums"]["idea_difficulty"];
          full_description: string;
          id?: string;
          short_description: string;
          status?: Database["public"]["Enums"]["idea_status"];
          title: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          difficulty?: Database["public"]["Enums"]["idea_difficulty"];
          full_description?: string;
          id?: string;
          short_description?: string;
          status?: Database["public"]["Enums"]["idea_status"];
          title?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ideas_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          id: string;
          updated_at: string;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          color: string;
          id: number;
          name: string;
        };
        Insert: {
          color: string;
          id?: number;
          name: string;
        };
        Update: {
          color?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      tech_stacks: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      idea_difficulty: "beginner" | "intermediate" | "advanced";
      idea_status: "published" | "hidden" | "pending" | "rejected";
      report_reason:
        | "inappropriate"
        | "spam"
        | "offensive"
        | "copyright"
        | "misinformation"
        | "other";
      report_status: "pending" | "reviewed" | "dismissed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      idea_difficulty: ["beginner", "intermediate", "advanced"],
      idea_status: ["published", "hidden", "pending", "rejected"],
      report_reason: [
        "inappropriate",
        "spam",
        "offensive",
        "copyright",
        "misinformation",
        "other",
      ],
      report_status: ["pending", "reviewed", "dismissed"],
    },
  },
} as const;
