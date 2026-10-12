// Helper utility for Supabase connection (optional client-side or server-side usage)

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
  dbUri?: string;
}

export const getSupabaseConfig = (): SupabaseConfig | null => {
  // Check localStorage first if in browser
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('terranova_supabase_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.url && parsed?.anonKey) {
          return parsed;
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
  }

  const url =
    (typeof process !== 'undefined' ? process.env?.SUPABASE_URL : undefined) ||
    (typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_SUPABASE_URL as string)
      : undefined);

  const anonKey =
    (typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY : undefined) ||
    (typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_SUPABASE_ANON_KEY as string)
      : undefined);

  if (!url || !anonKey) return null;
  return { url, anonKey };
};

