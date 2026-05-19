// =============================================================
// Supabase Client · cliente de la base de datos
// =============================================================
// Las claves se leen de variables de entorno en Vercel
// para que funcione en producción.
// En local también las puedes poner en .env.local

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xhbdauaipftrryrfnxmw.supabase.co';

const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  'sb_publishable_vpTkgxZ4AQwVU41oqjCooA_rZWhVhF7';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
