export type ProjectRecord = {
  id: string;
  title_zh: string;
  title_en: string;
  country: string;
  city: string;
  status: "精選" | "新案" | "即將完售";
  rooms: string;
  area: string;
  price: string;
  delivery: string;
  image_url: string | null;
  image_path: string | null;
  sort_order: number;
  is_published: boolean;
};

type SupabaseGlobal = {
  createClient: (url: string, key: string, options?: Record<string, unknown>) => any;
};

declare global {
  interface Window {
    supabase: SupabaseGlobal;
  }
}

const SUPABASE_URL = "https://bnudfjggbcuujfxwrker.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JHZQR3MvxGsVLnMSrIA3PA_tTEZOnZW";

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } },
);
