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
  Wallet,
  TrendingUp,
  Target,
  Clock,
  Download,
  CheckCircle2,
} from 'lucide-react';
import TopBar from '@/components/admin/TopBar';
import MetricCard from '@/components/admin/MetricCard';
import { REVENUE_MONTHLY, getRevenueByPlan, getMetrics } from '@/data/metrics';
import { CLIENTS } from '@/data/clients';

export default function FinancePage() {
  const metrics = getMetrics();
  const planData = getRevenueByPlan();
  const totalYear = REVENUE_MONTHLY.reduce((acc, m) => acc + m.revenue, 0);
  const avgMonth = Math.round(totalYear / REVENUE_MONTHLY.length);
  const lastMonth = REVENUE_MONTHLY[REVENUE_MONTHLY.length - 1].revenue;
  const prevMonth = REVENUE_MONTHLY[REVENUE_MONTHLY.length - 2].revenue;
  const growth = (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(1);

  const allPayments = CLIENTS.flatMap((c) =>
    c.payments.map((p) => ({ ...p, clientName: c.name, clientId: c.id, plan: c.plan }))
  ).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <TopBar
        title="Finanzas"
        subtitle="Ingresos, proyecciones y pagos"
        action={
          <button className="btn-ghost !py-2.5 !px-4 !text-[10px]">
            <Download size={11} /> Exportar
          </button>
        }
      />

      <div className="flex-1 px-6 md:px-10 py-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Mes actual"
            value={`${lastMonth}€`}
            trend={`${growth > 0 ? '+' : ''}${growth}% vs mes ant.`}
            trendType={growth > 0 ? 'up' : 'down'}
            icon={Wallet}
            primary
          />
          <MetricCard
            label="Acumulado año"
            value={`${(totalYear / 1000).toFixed(1)}k€`}
            trend={`Promedio: ${avgMonth}€/mes`}
            trendType="neutral"
            icon={TrendingUp}
          />
          <MetricCard
            label="Proyección anual"
            value={`${(metrics.yearProjection / 1000).toFixed(1)}k€`}
            trend="Si mantenemos clientes"
            trendType="neutral"
            icon={Target}
          />
          <MetricCard
            label="Pagos pendientes"
            value="0"
            sub="€"
            trend="Todo al día"
            trendType="up"
            icon={Clock}
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Evolución 12 meses */}
          <div className="lg:col-span-2 bg-ink-900 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="eyebrow">Evolución</div>
                <h3 className="font-display text-2xl tracking-tight text-bone uppercase">
                  Facturación · 12 meses
                </h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={REVENUE_MONTHLY}>
                <defs>
                  <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B5D3B" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0B5D3B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="month"
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
                  formatter={(v) => [`${v}€`, 'Ingresos']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0B5D3B"
                  strokeWidth={2}
                  fill="url(#finGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Por plan */}
          <div className="bg-ink-900 border border-white/10 p-6">
            <div className="eyebrow">Reparto</div>
            <h3 className="font-display text-2xl tracking-tight text-bone uppercase mb-6">
              Por plan
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={planData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="plan"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(245,242,238,0.5)', fontSize: 10, fontFamily: 'monospace' }}
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
                  formatter={(v) => [`${v}€/mes`, 'Ingresos']}
                />
                <Bar dataKey="revenue">
                  {planData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Histórico mensual con barras */}
        <div className="bg-ink-900 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="eyebrow">Histórico mensual</div>
              <h3 className="font-display text-2xl tracking-tight text-bone uppercase">
                Comparativa por mes
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {REVENUE_MONTHLY.slice().reverse().map((m, i) => {
              const max = Math.max(...REVENUE_MONTHLY.map((x) => x.revenue));
              const pct = (m.revenue / max) * 100;
              const isCurrent = i === 0;
              return (
                <div key={m.month} className="grid grid-cols-[60px_1fr_80px] gap-4 items-center">
                  <span className={`text-[11px] font-mono uppercase tracking-wider ${
                    isCurrent ? 'text-blood' : 'text-bone/60'
                  }`}>
                    {m.month}
                  </span>
                  <div className="h-6 bg-white/5 relative">
                    <div
                      className={`absolute inset-y-0 left-0 ${isCurrent ? 'bg-blood' : 'bg-white/20'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={`text-right font-display text-sm tracking-tight ${
                    isCurrent ? 'text-blood' : 'text-bone'
                  }`}>
                    {m.revenue}€
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabla de pagos */}
        <div className="bg-ink-900 border border-white/10">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="eyebrow !mb-1">Histórico</div>
              <h3 className="font-display text-xl tracking-tight text-bone uppercase">
                Últimos pagos
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
              {allPayments.length} transacciones
            </span>
          </div>

          <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_120px_100px] gap-4 px-6 py-3 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-bone/40">
            <span>Fecha</span>
            <span>Cliente</span>
            <span>Plan</span>
            <span>Importe</span>
            <span>Estado</span>
          </div>

          {allPayments.slice(0, 15).map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_2fr_80px] md:grid-cols-[1fr_1.5fr_1fr_120px_100px] gap-4 px-6 py-3.5 border-b border-white/5 hover:bg-white/[0.02] transition items-center"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-bone/60">
                {p.date}
              </div>
              <div className="font-display text-sm tracking-wide text-bone uppercase truncate">
                {p.clientName}
              </div>
              <div className="hidden md:block text-xs text-bone/60">{p.plan}</div>
              <div className="hidden md:block font-display text-sm tracking-tight text-bone">
                {p.amount}€
              </div>
              <div className="text-right md:text-left">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 size={9} /> {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
