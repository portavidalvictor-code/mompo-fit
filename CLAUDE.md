# Mompofit — Web José Mompó

Web del entrenador personal José Mompó. Gestionada por Victor, vendida a José.

## Accesos
- **Web:** https://mompo-fit.vercel.app
- **Admin:** https://mompo-fit.vercel.app/admin/login → `admin@mompofit.com` / `admin123`
- **GitHub:** https://github.com/portavidalvictor-code/mompo-fit
- **Deploy:** push a `main` → Vercel despliega automáticamente en ~2 min

## Supabase
- URL: https://xhbdauaipftrryrfnxmw.supabase.co
- Key: sb_publishable_vpTkgxZ4AQwVU41oqjCooA_rZWhVhF7
- Tabla `applications`: leads del formulario de planes
- Tabla `reviews`: valoraciones públicas

## Stack
- Next.js 14.2.5 · App Router · JavaScript (sin TypeScript)
- Tailwind CSS — paleta: `blood`=#0B5D3B (verde), `bone`=#F5F2EE, `ink-950`=#070707
- Fuentes: Anton (títulos) + Manrope + JetBrains Mono

## Archivos clave
- `src/components/landing/PlanApplyModal.jsx` — formulario solicitud (3 pasos)
- `src/components/landing/Header.jsx` — nav (enlace Admin visible temporalmente)
- `src/app/admin/solicitudes/page.js` — bandeja de leads
- `src/lib/supabase.js` — cliente base de datos

## Estado y pendientes
- Formulario de solicitud: FUNCIONA (bug RLS de Supabase resuelto el 2026-05-20)
- Enlace Admin en nav: VISIBLE (temporal — quitarlo cuando Victor entregue la web a José)
- Hay 1 registro de prueba en applications: "victor porta" (puede borrarse)

## Reglas de este proyecto
- Todo el contenido en español
- Sin emojis en la UI
- Estética dark premium deportiva
- Hablar con Victor en español claro, sin jerga técnica
