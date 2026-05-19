'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Target,
  Activity,
  TrendingDown,
  AlertCircle,
  Edit3,
} from 'lucide-react';
import TopBar from '@/components/admin/TopBar';
import { CLIENTS, FOLLOWUPS } from '@/data/clients';

const TABS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'seguimientos', label: 'Seguimientos' },
  { id: 'nutricion', label: 'Nutrición' },
  { id: 'entrenamiento', label: 'Entrenamiento' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'notas', label: 'Notas' },
];

export default function ClientDetailPage({ params }) {
  // Compatibilidad Next 14/15: params puede ser objeto o Promise
  const resolved = typeof params?.then === 'function' ? use(params) : params;
  const clientId = resolved.id;

  const client = CLIENTS.find((c) => c.id === clientId);
  const followups = FOLLOWUPS.filter((f) => f.clientId === clientId);
  const [activeTab, setActiveTab] = useState('resumen');

  if (!client) {
    return (
      <>
        <TopBar title="Cliente no encontrado" />
        <div className="px-10 py-16">
          <Link href="/admin/clientes" className="btn-ghost !py-2 !px-4 !text-[10px]">
            <ArrowLeft size={12} /> Volver a clientes
          </Link>
        </div>
      </>
    );
  }

  const weightDelta = (client.weightCurrent - client.weightStart).toFixed(1);
  const weightDirection = client.weightCurrent < client.weightStart ? '−' : '+';

  return (
    <>
      <TopBar
        title={client.name}
        subtitle={`${client.goal} · ${client.phase} · Plan ${client.plan}`}
        action={
          <Link
            href="/admin/clientes"
            className="btn-ghost !py-2.5 !px-4 !text-[10px] no-underline"
          >
            <ArrowLeft size={12} /> Volver
          </Link>
        }
      />

      <div className="flex-1 px-6 md:px-10 py-8 space-y-6">
        {/* Header del cliente */}
        <div className="bg-ink-900 border border-white/10 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-start">
            <img
              src={client.photoUrl}
              alt={client.name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover"
            />
            <div className="space-y-3">
              <div>
                <div className="eyebrow !mb-2">Cliente · {client.id}</div>
                <h2 className="font-display text-4xl md:text-5xl tracking-crush text-bone uppercase">
                  {client.name}
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 text-[11px] font-mono uppercase tracking-wider text-bone/60">
                <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 hover:text-blood transition">
                  <Mail size={11} /> {client.email}
                </a>
                <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 hover:text-blood transition">
                  <Phone size={11} /> {client.phone}
                </a>
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} /> Inicio: {client.startDate}
                </span>
              </div>

              {client.alerts.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {client.alerts.map((a, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-blood/10 text-blood border border-blood/30"
                    >
                      <AlertCircle size={10} /> {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`status-dot ${client.status === 'Activo' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="text-[11px] font-mono uppercase tracking-wider text-bone/70">
                {client.status}
              </span>
            </div>
          </div>

          {/* Stats principales */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/10 mt-8">
            <Stat label="Peso inicio" value={`${client.weightStart} kg`} />
            <Stat label="Peso actual" value={`${client.weightCurrent} kg`} primary />
            <Stat
              label="Diferencia"
              value={`${weightDirection}${Math.abs(weightDelta)} kg`}
              accent={weightDirection === '−' ? 'emerald' : 'amber'}
            />
            <Stat label="Adherencia" value={`${client.adherence}%`} />
            <Stat label="Próx. revisión" value={client.nextReview} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3 text-[10px] font-mono uppercase tracking-wider border-b-2 transition flex-shrink-0 ${
                activeTab === t.id
                  ? 'border-blood text-bone'
                  : 'border-transparent text-bone/40 hover:text-bone'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenido tabs */}
        {activeTab === 'resumen' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Gráfico peso */}
            <div className="lg:col-span-2 bg-ink-900 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="eyebrow">Evolución</div>
                  <h3 className="font-display text-xl tracking-tight text-bone uppercase">
                    Peso semanal
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <TrendingDown size={12} />
                  <span className="font-mono uppercase tracking-wider">
                    {weightDirection}{Math.abs(weightDelta)} kg
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={client.weeklyWeights}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(245,242,238,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(245,242,238,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#070707',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: 11,
                      color: '#F5F2EE',
                    }}
                    formatter={(v) => [`${v} kg`, 'Peso']}
                  />
                  <ReferenceLine
                    y={client.weightStart}
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="kg"
                    stroke="#0B5D3B"
                    strokeWidth={2}
                    dot={{ fill: '#0B5D3B', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Macros */}
            <div className="bg-ink-900 border border-white/10 p-6">
              <div className="eyebrow">Macros objetivo</div>
              <h3 className="font-display text-xl tracking-tight text-bone uppercase mb-5">
                Plan nutricional
              </h3>
              <div className="space-y-4">
                <MacroBar label="Calorías" value={client.macros.kcal} unit="kcal" color="bg-blood" pct={100} />
                <MacroBar label="Proteína" value={client.macros.protein} unit="g" color="bg-bone" pct={70} />
                <MacroBar label="Carbohidratos" value={client.macros.carbs} unit="g" color="bg-amber-500" pct={85} />
                <MacroBar label="Grasas" value={client.macros.fat} unit="g" color="bg-emerald-500" pct={50} />
              </div>
            </div>

            {/* Medidas */}
            <div className="bg-ink-900 border border-white/10 p-6">
              <div className="eyebrow">Última medición</div>
              <h3 className="font-display text-xl tracking-tight text-bone uppercase mb-5">
                Medidas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(client.measurements).map(([k, v]) => (
                  <div key={k} className="border border-white/10 p-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
                      {k === 'chest' ? 'Pecho' : k === 'waist' ? 'Cintura' : k === 'arm' ? 'Brazo' : 'Pierna'}
                    </div>
                    <div className="font-display text-2xl tracking-tight text-bone mt-1">
                      {v} <span className="text-sm text-bone/40">cm</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notas */}
            <div className="lg:col-span-2 bg-ink-900 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="eyebrow !mb-0">Notas del coach</div>
                <button className="text-[10px] font-mono uppercase tracking-wider text-blood hover:underline flex items-center gap-1">
                  <Edit3 size={10} /> Editar
                </button>
              </div>
              <p className="text-sm text-bone/80 leading-relaxed">{client.notes}</p>
            </div>
          </div>
        )}

        {activeTab === 'seguimientos' && (
          <div className="space-y-3">
            {followups.length === 0 ? (
              <div className="bg-ink-900 border border-white/10 p-12 text-center text-sm text-bone/40">
                No hay seguimientos registrados todavía.
              </div>
            ) : (
              followups.map((f) => (
                <div key={f.id} className="bg-ink-900 border border-white/10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-display text-xl tracking-tight text-bone uppercase">
                        {f.week}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mt-1">
                        {f.date} · {f.weight} kg
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider border ${
                        f.status === 'Revisado'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : f.status === 'Pendiente'
                          ? 'border-blood/40 bg-blood/10 text-blood'
                          : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
                    <FuStat label="Dieta" value={`${f.diet}%`} />
                    <FuStat label="Entren." value={`${f.training}%`} />
                    <FuStat label="Energía" value={`${f.energy}/10`} />
                    <FuStat label="Sueño" value={`${f.sleep}/10`} />
                    <FuStat label="Hambre" value={`${f.hunger}/10`} />
                    <FuStat label="Estrés" value={`${f.stress}/10`} />
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-1.5">
                        Comentario del cliente
                      </div>
                      <p className="text-sm text-bone/80 italic">"{f.comment}"</p>
                    </div>
                    {f.coachReply && (
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-blood mb-1.5">
                          Respuesta de Jose
                        </div>
                        <p className="text-sm text-bone/90">{f.coachReply}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'nutricion' && (
          <div className="bg-ink-900 border border-white/10 p-8">
            <div className="eyebrow">Plan nutricional · {client.phase}</div>
            <h3 className="font-display text-3xl tracking-tight text-bone uppercase mb-6">
              {client.macros.kcal} kcal/día
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Stat label="Proteína" value={`${client.macros.protein}g`} />
              <Stat label="Carbohidratos" value={`${client.macros.carbs}g`} />
              <Stat label="Grasas" value={`${client.macros.fat}g`} />
            </div>
            <Link
              href="/admin/nutricion"
              className="btn-ghost !py-2 !px-4 !text-[10px] no-underline"
            >
              <Activity size={12} /> Ver plan completo
            </Link>
          </div>
        )}

        {activeTab === 'entrenamiento' && (
          <div className="bg-ink-900 border border-white/10 p-8">
            <div className="eyebrow">Plan de entrenamiento</div>
            <h3 className="font-display text-3xl tracking-tight text-bone uppercase mb-3">
              Rutina · {client.phase}
            </h3>
            <p className="text-sm text-bone/60 mb-6">
              4 sesiones por semana adaptadas a {client.goal.toLowerCase()}.
            </p>
            <Link
              href="/admin/entrenamiento"
              className="btn-ghost !py-2 !px-4 !text-[10px] no-underline"
            >
              <Target size={12} /> Ver rutina completa
            </Link>
          </div>
        )}

        {activeTab === 'pagos' && (
          <div className="bg-ink-900 border border-white/10">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="eyebrow !mb-1">Histórico</div>
                <h3 className="font-display text-xl tracking-tight text-bone uppercase">
                  Pagos · {client.plan} · {client.planPrice}€/mes
                </h3>
              </div>
              <div className="font-display text-2xl tracking-tight text-bone">
                Total: {client.payments.reduce((a, p) => a + p.amount, 0)}€
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {client.payments.map((p, i) => (
                <div
                  key={i}
                  className="px-6 py-4 grid grid-cols-3 items-center gap-4"
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-bone/60">
                    {p.date}
                  </div>
                  <div className="font-display text-lg tracking-tight text-bone">
                    {p.amount}€
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notas' && (
          <div className="bg-ink-900 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="eyebrow !mb-0">Notas internas del coach</div>
              <button className="text-[10px] font-mono uppercase tracking-wider text-blood hover:underline flex items-center gap-1">
                <Edit3 size={10} /> Editar
              </button>
            </div>
            <textarea
              defaultValue={client.notes}
              rows={8}
              className="w-full bg-white/5 border border-white/10 px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition resize-none"
            />
            <button className="mt-4 btn-blood !py-2 !px-4 !text-[10px]">Guardar nota</button>
          </div>
        )}
      </div>
    </>
  );
}

function Stat({ label, value, primary, accent }) {
  const accentColor =
    accent === 'emerald' ? 'text-emerald-400' : accent === 'amber' ? 'text-amber-400' : '';
  return (
    <div className={`bg-ink-900 p-4 ${primary ? 'border-l-2 border-l-blood' : ''}`}>
      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-1">
        {label}
      </div>
      <div className={`font-display text-xl tracking-tight text-bone ${accentColor}`}>
        {value}
      </div>
    </div>
  );
}

function MacroBar({ label, value, unit, color, pct }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-mono uppercase tracking-wider text-bone/70">
          {label}
        </span>
        <span className="text-xs text-bone">
          {value} <span className="text-bone/40">{unit}</span>
        </span>
      </div>
      <div className="h-1 bg-white/5">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function FuStat({ label, value }) {
  return (
    <div className="border border-white/10 p-2">
      <div className="text-[9px] font-mono uppercase tracking-wider text-bone/40">
        {label}
      </div>
      <div className="font-display text-sm tracking-tight text-bone mt-0.5">{value}</div>
    </div>
  );
}
