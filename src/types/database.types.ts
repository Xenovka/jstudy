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
      achievements: {
        Row: {
          created_at: string
          description: string
          id: number
          requirements: Json | null
          reward_points: number
          reward_xp: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: number
          requirements?: Json | null
          reward_points?: number
          reward_xp?: number
          title?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          requirements?: Json | null
          reward_points?: number
          reward_xp?: number
          title?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          answer: string
          choices: string[]
          created_at: string
          difficulty: Database["public"]["Enums"]["Difficulty"]
          durations: number
          id: number
          question: string
          reward_points: number
          reward_xp: number
          snippet: string | null
          topics: string
          user_ids: number[]
        }
        Insert: {
          answer?: string
          choices?: string[]
          created_at?: string
          difficulty?: Database["public"]["Enums"]["Difficulty"]
          durations: number
          id?: number
          question?: string
          reward_points?: number
          reward_xp?: number
          snippet?: string | null
          topics: string
          user_ids: number[]
        }
        Update: {
          answer?: string
          choices?: string[]
          created_at?: string
          difficulty?: Database["public"]["Enums"]["Difficulty"]
          durations?: number
          id?: number
          question?: string
          reward_points?: number
          reward_xp?: number
          snippet?: string | null
          topics?: string
          user_ids?: number[]
        }
        Relationships: []
      }
      course_modules: {
        Row: {
          address: string
          content: string
          course_slug: string
          id: string
          module_number: number
          next_module: string | null
          prev_module: string | null
          title: string
        }
        Insert: {
          address?: string
          content?: string
          course_slug: string
          id?: string
          module_number?: number
          next_module?: string | null
          prev_module?: string | null
          title?: string
        }
        Update: {
          address?: string
          content?: string
          course_slug?: string
          id?: string
          module_number?: number
          next_module?: string | null
          prev_module?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_slug_fkey"
            columns: ["course_slug"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["slug"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string
          difficulty: Database["public"]["Enums"]["Difficulty"]
          slug: string
          start_address: string
          student_ids: number[]
          title: string
          total_modules: number
        }
        Insert: {
          created_at?: string
          description?: string
          difficulty: Database["public"]["Enums"]["Difficulty"]
          slug?: string
          start_address?: string
          student_ids?: number[]
          title?: string
          total_modules?: number
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: Database["public"]["Enums"]["Difficulty"]
          slug?: string
          start_address?: string
          student_ids?: number[]
          title?: string
          total_modules?: number
        }
        Relationships: []
      }
      student_courses: {
        Row: {
          completed_at: string | null
          course_slug: string
          course_title: string
          id: number
          last_accessed_at: string
          last_module: string | null
          progress: number
          started_at: string
          status: Database["public"]["Enums"]["Completion Status"]
          student_id: number
        }
        Insert: {
          completed_at?: string | null
          course_slug: string
          course_title: string
          id?: number
          last_accessed_at?: string
          last_module?: string | null
          progress?: number
          started_at?: string
          status?: Database["public"]["Enums"]["Completion Status"]
          student_id: number
        }
        Update: {
          completed_at?: string | null
          course_slug?: string
          course_title?: string
          id?: number
          last_accessed_at?: string
          last_module?: string | null
          progress?: number
          started_at?: string
          status?: Database["public"]["Enums"]["Completion Status"]
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_courses_course_slug_fkey"
            columns: ["course_slug"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "student_courses_last_module_fkey"
            columns: ["last_module"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_courses_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          achievements: number[]
          challenges_completed: number[]
          completed_courses: string[]
          created_at: string
          current_xp: number
          has_failed_challenge: boolean
          has_finished_challenge: boolean
          id: number
          last_challenge_timestamp: string | null
          level: number
          points: number
          rank: Database["public"]["Enums"]["Ranks"]
          streaks: number
          total_challenges_completed: number
          user_id: string | null
          username: string | null
        }
        Insert: {
          achievements: number[]
          challenges_completed?: number[]
          completed_courses?: string[]
          created_at?: string
          current_xp?: number
          has_failed_challenge?: boolean
          has_finished_challenge?: boolean
          id?: number
          last_challenge_timestamp?: string | null
          level?: number
          points?: number
          rank?: Database["public"]["Enums"]["Ranks"]
          streaks?: number
          total_challenges_completed?: number
          user_id?: string | null
          username?: string | null
        }
        Update: {
          achievements?: number[]
          challenges_completed?: number[]
          completed_courses?: string[]
          created_at?: string
          current_xp?: number
          has_failed_challenge?: boolean
          has_finished_challenge?: boolean
          id?: number
          last_challenge_timestamp?: string | null
          level?: number
          points?: number
          rank?: Database["public"]["Enums"]["Ranks"]
          streaks?: number
          total_challenges_completed?: number
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      "Completion Status": "Completed" | "Incomplete"
      Difficulty: "Easy" | "Medium" | "Hard"
      Ranks: "Beginner" | "Intermediate" | "Advanced" | "Master"
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
