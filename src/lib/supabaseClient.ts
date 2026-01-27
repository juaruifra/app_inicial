import { createClient } from "@supabase/supabase-js";

// Variables de entorno
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente Supabase
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
