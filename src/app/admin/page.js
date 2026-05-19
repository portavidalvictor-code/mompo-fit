'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Users,
  Wallet,
  Inbox,
  ClipboardCheck,
  TrendingDown,
  TrendingUp,
  Activity,
  Target,
  ChevronRight,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import TopBar from '@/components/admin/TopBar';
import MetricCard from '@/components/admin/MetricCard';
import { getMetrics, REVENUE_MONTHLY, getRevenueByPlan } from '@/data/metrics';
import { FOLLOWUPS, REQUESTS, CLIENTS } from '@/data/clients';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const m = getMetrics();
  const planData = getRevenueByPlan();
  const pendingFollowups = FOLLOWUPS.filter((f) => f.status !== 'Revisado');
  const newRequests = REQUESTS.filter((r) => r.status === 'Nueva');

  // Datos reales de Supabase
  const [supabaseRequests, setSupabaseRequests] = useState([]);
  const [supabaseReviews, setSupabaseReviews] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: reqs } = await supabase
          .from('applications')
          .select('*')
          .order('created_at', { ascending: false });
        setSupabaseRequests(reqs || []);

        const { data: revs } = await supabase
          .from('reviews')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false });
        setSupabaseReviews(revs || []);
      } catch (err) {
        console.error('Error cargando datos del admin:', err);
      }
    }
    loadData();
  }, []);

  const pendingRequests = supabaseRequests.filter((r) => r.status === 'pending');
  const acceptedRequests = supabaseRequests.filter((r) => r.status === 'accepted');
  const contactedRequests = supabaseRequests.filter((r) => r.status === 'contacted');

  // Calcular distribución por plan
  const planCounts = acceptedRequests.reduce((acc, r) => {
    const plan = r.plan || 'Sin plan';
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {});
  const planDistribution = Object.entries(planCounts).map(([name, count]) => ({
    name,
    count,
  }));

  const avgRating = supabaseReviews.length > 0
    ? (supabaseReviews.reduce((acc, r) => acc + r.rating, 0) / supabaseReviews.length).toFixed(1)
    : '—';

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Resumen del negocio · datos en tiempo real"
      />

      <div className="flex-1 px-6 md:px-10 py-8 space-y-8">
        {/* KPIs principales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Clientes activos"
            value={acceptedRequests.length}
            sub="solicitudes aceptadas"
            trend={acceptedRequests.length > 0 ? `${acceptedRequests.length} clientes` : 'Sin clientes'}
            trendType={acceptedRequests.length > 0 ? 'up' : 'neutral'}
            icon={Users}
            primary
          />
          <MetricCard
            label="En proceso"
            value={contactedRequests.length}
            sub="contactados"
            trend="Pendiente de aceptar"
            trendType="neutral"
            icon={Activity}
          />
          <MetricCard
            label="Solicitudes pendientes"
            value={pendingRequests.length}
            trend={`${supabaseRequests.length} totales`}
            trendType="neutral"
            icon={Inbox}
          />
          <MetricCard
            label="Valoración media"
            value={avgRating}
            sub={supabaseReviews.length > 0 ? `${supabaseReviews.length} opiniones` : 'Sin opiniones'}
            trend={avgRating !== '—' && parseFloat(avgRating) >= 4 ? 'Excelente' : '—'}
            trendType={avgRating !== '—' && parseFloat(avgRating) >= 4 ? 'up' : 'neutral'}
            icon={Star}
          />
        </div>

        {/* KPIs secundarios */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Plan Trimestral"
            value={acceptedRequests.filter((r) => r.plan === 'Trimestral').length}
            sub="clientes"
            icon={TrendingDown}
          />
          <MetricCard
            label="Plan Trimestral PRO"
            value={acceptedRequests.filter((r) => r.plan === 'Trimestral PRO').length}
            sub="clientes"
            icon={TrendingUp}
          />
          <MetricCard
            label="Plan Semestral"
            value={acceptedRequests.filter((r) => r.plan === 'Semestral').length}
            sub="clientes"
            icon={TrendingDown}
          />
          <MetricCard
            label="Plan Semestral PRO"
            value={acceptedRequests.filter((r) => r.plan === 'Semestral PRO').length}
            sub="clientes"
            icon={TrendingUp}
          />
        </div>

        {/* Sección antigua que ya no usamos */}
        <div className="hidden">
          <MetricCard
            label="placeholder"
            value="0"
            icon={Wallet}
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Estado de solicitudes */}
          <div className="lg:col-span-2 bg-ink-900 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="eyebrow">Pipeline</div>
                <h3 className="font-display text-2xl tracking-tight text-bone uppercase">
                  Estado de solicitudes
                </h3>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl tracking-tight text-blood">
                  {supabaseRequests.length}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
                  totales
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={[
                  { name: 'Pendientes', value: pendingRequests.length, color: '#B45309' },
                  { name: 'Contactadas', value: contactedRequests.length, color: '#0B5D3B' },
                  { name: 'Aceptadas', value: acceptedRequests.length, color: '#10B981' },
                  {
                    name: 'Rechazadas',
                    value: supabaseRequests.filter((r) => r.status === 'rejected').length,
                    color: '#6B7280',
                  },
                ]}
              >
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(245,242,238,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(245,242,238,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#070707',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: 11,
                    color: '#F5F2EE',
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {[
                    { color: '#B45309' },
                    { color: '#0B5D3B' },
                    { color: '#10B981' },
                    { color: '#6B7280' },
                  ].map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución por plan */}
          <div className="bg-ink-900 border border-white/10 p-6">
            <div className="eyebrow">Distribución</div>
            <h3 className="font-display text-2xl tracking-tight text-bone uppercase mb-6">
              Clientes por plan
            </h3>
            {planDistribution.length === 0 ? (
              <div className="py-12 text-center text-sm text-bone/40">
                Aún no hay clientes aceptados.
                <br />
                <span className="text-xs">
                  Cuando marques solicitudes como "Aceptada", aparecerán aquí.
                </span>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={planDistribution} layout="vertical" margin={{ left: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(245,242,238,0.4)', fontSize: 9 }}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(245,242,238,0.7)', fontSize: 10, fontFamily: 'monospace' }}
                      width={90}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#070707',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: 11,
                        color: '#F5F2EE',
                      }}
                      formatter={(v) => [`${v} clientes`, '']}
                    />
                    <Bar dataKey="count" radius={0} fill="#0B5D3B" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                  {planDistribution.map((p) => (
                    <div key={p.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blood" />
                        <span className="font-mono uppercase tracking-wider text-bone/70 truncate">
                          {p.name}
                        </span>
                      </div>
                      <span className="font-display text-sm tracking-tight text-bone">
                        {p.count}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Listas: seguimientos pendientes + solicitudes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Seguimientos pendientes */}
          <div className="bg-ink-900 border border-white/10">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="eyebrow !mb-1">Por revisar</div>
                <h3 className="font-display text-xl tracking-tight text-bone uppercase">
                  Seguimientos pendientes
                </h3>
              </div>
              <Link
                href="/admin/seguimientos"
                className="text-[10px] font-mono uppercase tracking-wider text-blood hover:underline"
              >
                Ver todos →
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {pendingFollowups.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-bone/40">
                  Todo revisado. Buen trabajo.
                </div>
              )}
              {pendingFollowups.map((f) => (
                <Link
                  key={f.id}
                  href="/admin/seguimientos"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition group"
                >
                  <div className="w-9 h-9 bg-ink-950 border border-white/10 flex items-center justify-center font-display text-xs tracking-tight text-bone/70">
                    {f.clientName.split(' ').map((s) => s[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-base tracking-wide text-bone uppercase truncate">
                      {f.clientName}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mt-0.5">
                      {f.week} · {f.date}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border ${
                      f.status === 'Pendiente'
                        ? 'border-blood/40 bg-blood/10 text-blood'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {f.status}
                  </span>
                  <ChevronRight size={14} className="text-bone/30 group-hover:text-blood transition" />
                </Link>
              ))}
            </div>
          </div>

          {/* Solicitudes nuevas */}
          <div className="bg-ink-900 border border-white/10">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="eyebrow !mb-1">Lead pipeline</div>
                <h3 className="font-display text-xl tracking-tight text-bone uppercase">
                  Solicitudes nuevas
                </h3>
              </div>
              <Link
                href="/admin/solicitudes"
                className="text-[10px] font-mono uppercase tracking-wider text-blood hover:underline"
              >
                Ver todas →
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {pendingRequests.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-bone/40">
                  No hay solicitudes pendientes.
                </div>
              )}
              {pendingRequests.slice(0, 5).map((r) => (
                <Link
                  key={r.id}
                  href="/admin/solicitudes"
                  className="block px-6 py-4 hover:bg-white/[0.03] transition group"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="font-display text-base tracking-wide text-bone uppercase truncate">
                      {r.name}
                    </div>
                    <ChevronRight size={14} className="text-bone/30 group-hover:text-blood transition flex-shrink-0 mt-1" />
                  </div>
                  <div className="text-xs text-bone/60 mb-2 truncate">{r.goal || '—'}</div>
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-bone/40 flex-wrap">
                    {r.plan && <span>Plan {r.plan}</span>}
                    {r.appointment_label && (
                      <>
                        <span>·</span>
                        <span className="text-blood truncate">{r.appointment_label}</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen clientes con alertas */}
        <div className="bg-ink-900 border border-white/10">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="eyebrow !mb-1">Atención requerida</div>
              <h3 className="font-display text-xl tracking-tight text-bone uppercase">
                Clientes con alertas
              </h3>
            </div>
            <Link
              href="/admin/clientes"
              className="text-[10px] font-mono uppercase tracking-wider text-blood hover:underline"
            >
              Ver todos los clientes →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {CLIENTS.filter((c) => c.alerts.length > 0).length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-bone/40">
                Sin alertas. Todo bajo control.
              </div>
            )}
            {CLIENTS.filter((c) => c.alerts.length > 0).map((c) => (
              <Link
                key={c.id}
                href={`/admin/clientes/${c.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition group"
              >
                <img src={c.photoUrl} alt="" className="w-10 h-10 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-base tracking-wide text-bone uppercase truncate">
                    {c.name}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mt-0.5">
                    {c.plan} · {c.phase}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.alerts.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-blood/10 text-blood border border-blood/30"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <ChevronRight size={14} className="text-bone/30 group-hover:text-blood transition" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
