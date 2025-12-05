import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export interface Result {
  id: string;
  tier: 'free' | 'premium';
  user_name: string | null;
  answers: Record<number, string>;
  ai_result: {
    title: string;
    summary: string;
    insight?: string;
    emotion?: string;
    relationship?: string;
    growth?: string;
    taste?: string;
    advice: string;
    keywords: string[];
  } | null;
  created_at: string;
  view_count: number;
}
