# Mompó Fit · Plataforma del entrenador personal

Aplicación web premium para Jose Mompó (`Mompó Fit`), entrenador personal especializado en hombres adultos con poco tiempo y altos estándares.

Incluye:

- **Landing pública** dark/red con estética editorial agresiva (Hero, Método, Manifiesto, Sobre Jose, Casos, Planes, Contacto, Formulario de aplicación, Footer).
- **Panel admin** completo con login, dashboard de métricas, gestión de clientes, seguimientos semanales, planes nutricionales, rutinas de entrenamiento, finanzas, solicitudes y ajustes.

## Stack

- **Next.js 14.2.5** · App Router
- **React 18**
- **Tailwind CSS 3.4**
- **Recharts** para gráficas
- **Lucide React** para iconos
- **JavaScript** (sin TypeScript)
- Datos mock (`/src/data/`) preparados para sustituirse por **Supabase**

## Arrancar el proyecto

Requisitos: Node.js 18.17 o superior, npm.

```bash
npm install
npm run dev
```

La app se abre en http://localhost:3000

## Acceso al admin

URL: http://localhost:3000/admin/login

```
email:    admin@mompofit.com
password: admin123
```

(El login usa `localStorage`. Es un mock; sustituir por auth real.)

## Estructura

```
mompo-fit/
├── src/
│   ├── app/                       # App Router (Next.js)
│   │   ├── globals.css            # Sistema visual completo
│   │   ├── layout.js              # Layout raíz · fuentes
│   │   ├── page.js                # Landing pública
│   │   └── admin/
│   │       ├── layout.js          # AuthGuard + Sidebar
│   │       ├── login/page.js
│   │       ├── page.js            # Dashboard
│   │       ├── clientes/
│   │       │   ├── page.js        # Lista
│   │       │   └── [id]/page.js   # Ficha del cliente
│   │       ├── seguimientos/page.js
│   │       ├── nutricion/page.js
│   │       ├── entrenamiento/page.js
│   │       ├── finanzas/page.js
│   │       ├── solicitudes/page.js
│   │       └── ajustes/page.js
│   ├── components/
│   │   ├── landing/               # Componentes públicos
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Method.jsx
│   │   │   ├── Manifesto.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Cases.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ApplyForm.jsx
│   │   │   └── Footer.jsx
│   │   └── admin/                 # Componentes panel
│   │       ├── Sidebar.jsx
│   │       ├── TopBar.jsx
│   │       ├── AuthGuard.jsx
│   │       └── MetricCard.jsx
│   ├── data/                      # Mock data (sustituir por Supabase)
│   │   ├── plans.js               # Planes y casos antes/después
│   │   ├── clients.js             # Clientes, seguimientos, solicitudes
│   │   └── metrics.js             # Métricas derivadas
│   └── lib/
│       └── auth.js                # Auth mock con localStorage
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Sistema visual

- **Fondo:** `ink-950 #070707`
- **Tinta:** `bone #F5F2EE`
- **Acento:** `blood #E10600`
- **Tipografías:** Anton (display), Manrope (sans), JetBrains Mono (mono)
- **Detalles editoriales:** numeración 001/002, eyebrows con guión rojo, marquees, grano, líneas diagonales, scrollbar roja.

## Próximos pasos hacia producción

1. **Auth real** · Sustituir `src/lib/auth.js` por Supabase Auth, NextAuth, o Clerk.
2. **Persistencia** · Mover `src/data/*.js` a tablas Supabase con RLS por `coach_id`.
3. **Endpoints** · Crear API routes en `src/app/api/` para CRUD de clientes, seguimientos, etc.
4. **Subida de imágenes** · Avatares de cliente y fotos antes/después con Supabase Storage.
5. **Email transaccional** · Resend o SendGrid para notificar nuevas solicitudes y respuestas.
6. **Pagos** · Integrar Stripe para cobros recurrentes mensuales por plan.
7. **App móvil del cliente** · Vista de seguimiento + subida de checks semanales.

## Licencia

Privado · Mompó Fit · Todos los derechos reservados.
