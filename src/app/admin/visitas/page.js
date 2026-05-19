'use client';

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
  Eye,
  TrendingUp,
  Clock,
  Globe,
  ExternalLink,
  Info,
} from 'lucide-react';
import TopBar from '@/components/admin/TopBar';
import MetricCard from '@/components/admin/MetricCard';
import { VISITS_30D, TOP_PAGES, TRAFFIC_SOURCES, getVisitMetrics } from '@/data/visits';

export default function VisitsPage() {
  const m = getVisitMetrics();

  return (
    <>
      <TopBar
        title="Visitas"
        subtitle="Tráfico del sitio · últimos 30 días"
      />

      <div className="flex-1 px-6 md:px-10 py-8 space-y-8">
        {/* Aviso para activar Vercel Analytics */}
        <div className="border border-blood/30 bg-blood/5 p-5 flex items-start gap-4">
          <Info size={18} className="text-blood flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-blood mb-1">
              Datos de demostración
            </div>
            <p className="text-sm text-bone/80 leading-relaxed">
              Estás viendo datos de ejemplo. Para tener estadísticas reales de tu web,
              activa <strong className="text-bone">Vercel Analytics</strong> (gratis):
              ve a tu proyecto en Vercel → pestaña <strong className="text-bone">Analytics</strong> →
              pulsa <strong className="text-bone">Enable</strong>.
              Empezarás a ver datos reales en pocas horas.
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Visitas (30d)"
            value={m.total30}
            trend={`${m.growth > 0 ? '+' : ''}${m.growth}% vs ayer`}
            trendType={m.growth > 0 ? 'up' : 'down'}
            icon={Eye}
            primary
          />
          <MetricCard
            label="Visitantes únicos"
            value={m.unique30}
            sub="personas"
            trend="79% del total"
            trendType="neutral"
            icon={Users}
          />
          <MetricCard
            label="Hoy"
            value={m.today}
            sub="visitas"
            trend="Día activo"
            trendType="up"
            icon={TrendingUp}
          />
          <MetricCard
            label="Tasa conversión"
            value={`${m.conversionRate}%`}
            trend="Visita → solicitud"
            trendType="neutral"
            icon={Clock}
          />
        </div>

        {/* Gráfico principal · evolución */}
        <div className="bg-ink-900 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="eyebrow">Evolución diaria</div>
              <h3 className="font-display text-2xl tracking-tight text-bone uppercase">
                Visitas por día
              </h3>
            </div>
            <div className="flex gap-3 text-[10px] font-mono uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blood" />
                <span className="text-bone/70">Visitas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-bone/40" />
                <span className="text-bone/70">Únicos</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={VISITS_30D}>
              <defs>
                <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B5D3B" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#0B5D3B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="uniqueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5F2EE" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#F5F2EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(245,242,238,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                interval={3}
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
              />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#0B5D3B"
                strokeWidth={2}
                fill="url(#visitsGrad)"
                name="Visitas"
              />
              <Area
                type="monotone"
                dataKey="unique"
                stroke="#F5F2EE"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                fill="url(#uniqueGrad)"
                name="Únicos"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Páginas más vistas + Fuentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top pages */}
          <div className="bg-ink-900 border border-white/10 p-6">
            <div className="eyebrow mb-3">Páginas más vistas</div>
            <h3 className="font-display text-xl tracking-tight text-bone uppercase mb-6">
              Por sección
            </h3>

            <div className="space-y-4">
              {TOP_PAGES.map((p, i) => (
                <div key={p.page}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-mono uppercase tracking-wider text-bone/80">
                      <span className="text-blood mr-2">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {p.page}
                    </span>
                    <span className="font-display text-base tracking-tight text-bone">
                      {p.views}
                    </span>
                  </div>
                  <div className="h-1 bg-white/5">
                    <div
                      className="h-full bg-blood"
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic sources */}
          <div className="bg-ink-900 border border-white/10 p-6">
            <div className="eyebrow mb-3">De dónde viene la gente</div>
            <h3 className="font-display text-xl tracking-tight text-bone uppercase mb-6">
              Fuentes de tráfico
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={TRAFFIC_SOURCES} layout="vertical" margin={{ left: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(245,242,238,0.4)', fontSize: 9 }}
                />
                <YAxis
                  type="category"
                  dataKey="source"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(245,242,238,0.7)', fontSize: 11, fontFamily: 'monospace' }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    background: '#070707',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: 11,
                    color: '#F5F2EE',
                  }}
                  formatter={(v) => [`${v} visitas`, '']}
                />
                <Bar dataKey="visits">
                  {TRAFFIC_SOURCES.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
              {TRAFFIC_SOURCES.map((s) => (
                <div key={s.source} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2" style={{ background: s.color }} />
                  <span className="font-mono text-bone/70">{s.source}</span>
                  <span className="text-bone/40 ml-auto">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cómo activar Vercel Analytics */}
        <div className="bg-ink-900 border border-white/10 p-6">
          <div className="eyebrow mb-3">Activar datos reales</div>
          <h3 className="font-display text-xl tracking-tight text-bone uppercase mb-4">
            Cómo conectar Vercel Analytics
          </h3>
          <ol className="space-y-3 text-sm text-bone/80">
            <li className="flex gap-3">
              <span className="text-blood font-mono text-[10px] uppercase tracking-wider mt-1 flex-shrink-0">
                01
              </span>
              <span>Entra a <span className="text-bone">vercel.com</span> y abre tu proyecto Mompó Fit</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blood font-mono text-[10px] uppercase tracking-wider mt-1 flex-shrink-0">
                02
              </span>
              <span>Pulsa la pestaña <span className="text-bone">Analytics</span> arriba</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blood font-mono text-[10px] uppercase tracking-wider mt-1 flex-shrink-0">
                03
              </span>
              <span>Pulsa el botón <span className="text-bone">Enable</span> (gratis)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blood font-mono text-[10px] uppercase tracking-wider mt-1 flex-shrink-0">
                04
              </span>
              <span>En unas horas verás datos reales de tus visitantes</span>
            </li>
          </ol>
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 btn-blood !py-2.5 !px-4 !text-[10px] no-underline"
          >
            <ExternalLink size={12} /> Ir a Vercel
          </a>
        </div>
      </div>
    </>
  );
}
