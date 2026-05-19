'use client';

import { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Globe,
  Trash2,
  Save,
  Camera,
  Instagram,
  Mail,
  Phone,
} from 'lucide-react';
import TopBar from '@/components/admin/TopBar';

const SECTIONS = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'security', label: 'Seguridad', icon: Lock },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
  { id: 'plans', label: 'Planes y precios', icon: CreditCard },
  { id: 'site', label: 'Sitio web', icon: Globe },
];

export default function SettingsPage() {
  const [section, setSection] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Jose Mompó',
    email: 'portavidalvictor@gmail.com',
    phone: '+34 693 848 285',
    instagram: '@mompo.fit',
    bio: 'Entrenador personal especializado en hombres adultos con poco tiempo. Llevo más de una década entrenando a profesionales que necesitan resultados sin pérdidas.',
    title: 'Entrenador personal · Coach de rendimiento',
  });
  const [notifs, setNotifs] = useState({
    newRequest: true,
    paymentReceived: true,
    followupPending: true,
    weeklyReport: false,
    marketing: false,
  });
  const [plans, setPlans] = useState({
    esencial: 70,
    atletico: 120,
    premium: 180,
  });

  return (
    <>
      <TopBar
        title="Ajustes"
        subtitle="Configuración del coach y la plataforma"
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-0">
        {/* Sidebar secciones */}
        <aside className="border-r border-white/10 bg-ink-950 py-5">
          <nav className="space-y-1 px-3">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const isActive = section === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                    isActive
                      ? 'bg-blood/10 border-l-2 border-l-blood text-bone'
                      : 'border-l-2 border-l-transparent text-bone/50 hover:text-bone hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-blood' : ''} />
                  <span className="font-mono uppercase tracking-wider text-[11px]">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 mx-3 p-4 border border-blood/30 bg-blood/5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-blood mb-1.5">
              Zona peligrosa
            </div>
            <button className="flex items-center gap-2 text-xs text-bone/70 hover:text-blood transition">
              <Trash2 size={11} /> Eliminar cuenta
            </button>
          </div>
        </aside>

        {/* Contenido */}
        <section className="flex-1 overflow-y-auto">
          <div className="px-6 py-8 md:px-10 max-w-3xl">
            {section === 'profile' && (
              <div className="space-y-6">
                <div>
                  <div className="eyebrow">Sección</div>
                  <h2 className="font-display text-3xl tracking-tight text-bone uppercase">
                    Perfil del coach
                  </h2>
                </div>

                <div className="border border-white/10 bg-ink-900 p-6 flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blood flex items-center justify-center font-display text-3xl tracking-tight text-bone">
                      JM
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-bone text-ink-950 flex items-center justify-center hover:bg-white transition">
                      <Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <div className="font-display text-xl tracking-wide text-bone uppercase">
                      {profile.name}
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-bone/50 mt-0.5">
                      {profile.title}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Field
                    label="Nombre completo"
                    value={profile.name}
                    onChange={(v) => setProfile({ ...profile, name: v })}
                  />
                  <Field
                    label="Título profesional"
                    value={profile.title}
                    onChange={(v) => setProfile({ ...profile, title: v })}
                  />
                  <Field
                    icon={Mail}
                    label="Email"
                    value={profile.email}
                    onChange={(v) => setProfile({ ...profile, email: v })}
                  />
                  <Field
                    icon={Phone}
                    label="Teléfono"
                    value={profile.phone}
                    onChange={(v) => setProfile({ ...profile, phone: v })}
                  />
                  <Field
                    icon={Instagram}
                    label="Instagram"
                    value={profile.instagram}
                    onChange={(v) => setProfile({ ...profile, instagram: v })}
                  />
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/50 mb-2">
                      Biografía
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition resize-none"
                    />
                  </div>
                </div>

                <button className="btn-blood !py-2.5 !px-5 !text-[10px]">
                  <Save size={12} /> Guardar cambios
                </button>
              </div>
            )}

            {section === 'security' && (
              <div className="space-y-6">
                <div>
                  <div className="eyebrow">Sección</div>
                  <h2 className="font-display text-3xl tracking-tight text-bone uppercase">
                    Seguridad
                  </h2>
                </div>

                <div className="space-y-4">
                  <Field label="Contraseña actual" type="password" placeholder="••••••••" />
                  <Field label="Nueva contraseña" type="password" placeholder="Mínimo 8 caracteres" />
                  <Field label="Repetir nueva contraseña" type="password" placeholder="••••••••" />
                </div>

                <button className="btn-blood !py-2.5 !px-5 !text-[10px]">
                  <Save size={12} /> Actualizar contraseña
                </button>

                <div className="border-t border-white/10 pt-6 mt-8">
                  <div className="eyebrow mb-3">Sesiones activas</div>
                  <div className="border border-white/10 bg-ink-900 p-4 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-sm text-bone">MacBook Pro · Valencia</div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mt-0.5">
                        Sesión actual · activa ahora
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            )}

            {section === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <div className="eyebrow">Sección</div>
                  <h2 className="font-display text-3xl tracking-tight text-bone uppercase">
                    Notificaciones
                  </h2>
                </div>

                <div className="border border-white/10 bg-ink-900 divide-y divide-white/5">
                  {[
                    { id: 'newRequest', label: 'Nueva solicitud recibida', desc: 'Recibirás un email cuando alguien complete el formulario.' },
                    { id: 'paymentReceived', label: 'Pago recibido', desc: 'Notificación al cobrar a un cliente activo.' },
                    { id: 'followupPending', label: 'Seguimiento pendiente', desc: 'Cuando un cliente envía su seguimiento semanal.' },
                    { id: 'weeklyReport', label: 'Reporte semanal del negocio', desc: 'Resumen de métricas cada lunes a primera hora.' },
                    { id: 'marketing', label: 'Novedades de la plataforma', desc: 'Nuevas funciones, mejoras y comunicaciones internas.' },
                  ].map((n) => (
                    <div key={n.id} className="px-5 py-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-mono uppercase tracking-wider text-bone">
                          {n.label}
                        </div>
                        <div className="text-[11px] text-bone/50 mt-1">{n.desc}</div>
                      </div>
                      <button
                        onClick={() => setNotifs({ ...notifs, [n.id]: !notifs[n.id] })}
                        className={`relative w-10 h-5 transition flex-shrink-0 ${
                          notifs[n.id] ? 'bg-blood' : 'bg-white/10'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 bg-bone transition ${
                            notifs[n.id] ? 'left-5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'plans' && (
              <div className="space-y-6">
                <div>
                  <div className="eyebrow">Sección</div>
                  <h2 className="font-display text-3xl tracking-tight text-bone uppercase">
                    Planes y precios
                  </h2>
                  <p className="text-sm text-bone/50 mt-2">
                    Estos precios se sincronizan con la landing pública.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'esencial', name: 'Esencial', current: plans.esencial },
                    { id: 'atletico', name: 'Atlético', current: plans.atletico, primary: true },
                    { id: 'premium', name: 'Premium', current: plans.premium },
                  ].map((p) => (
                    <div
                      key={p.id}
                      className={`p-5 border ${p.primary ? 'border-blood bg-blood/5' : 'border-white/10 bg-ink-900'}`}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/50 mb-3">
                        {p.name}
                      </div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="font-display text-4xl tracking-tight text-bone">
                          {p.current}
                        </span>
                        <span className="text-bone/40 font-mono text-sm">€/mes</span>
                      </div>
                      <input
                        type="number"
                        value={p.current}
                        onChange={(e) =>
                          setPlans({ ...plans, [p.id]: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-bone focus:outline-none focus:border-blood/60 transition"
                      />
                    </div>
                  ))}
                </div>

                <button className="btn-blood !py-2.5 !px-5 !text-[10px]">
                  <Save size={12} /> Guardar precios
                </button>
              </div>
            )}

            {section === 'site' && (
              <div className="space-y-6">
                <div>
                  <div className="eyebrow">Sección</div>
                  <h2 className="font-display text-3xl tracking-tight text-bone uppercase">
                    Sitio web
                  </h2>
                </div>

                <div className="space-y-4">
                  <Field label="Título de la web" defaultValue="Mompó Fit · Entrenamiento sin excusas" />
                  <Field label="Frase del Hero" defaultValue="Ponte atlético. Sin excusas." />
                  <Field label="Manifiesto" defaultValue="Sin sobrecarga progresiva, no hay cambio." />
                  <Field label="Email de contacto público" defaultValue="hola@mompofit.com" />
                  <Field label="Dominio" defaultValue="mompofit.com" />
                </div>

                <button className="btn-blood !py-2.5 !px-5 !text-[10px]">
                  <Save size={12} /> Publicar cambios
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, icon: Icon, defaultValue }) {
  const [internal, setInternal] = useState(defaultValue || '');
  const isControlled = value !== undefined;
  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/50 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" />
        )}
        <input
          type={type}
          value={isControlled ? value : internal}
          onChange={(e) => {
            if (isControlled) onChange?.(e.target.value);
            else setInternal(e.target.value);
          }}
          placeholder={placeholder}
          className={`w-full bg-white/5 border border-white/10 ${
            Icon ? 'pl-9' : 'pl-3'
          } pr-3 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition`}
        />
      </div>
    </div>
  );
}
