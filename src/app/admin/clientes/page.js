'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, ChevronRight } from 'lucide-react';
import TopBar from '@/components/admin/TopBar';
import { CLIENTS } from '@/data/clients';

const PLAN_FILTERS = ['Todos', 'Esencial', 'Atlético', 'Premium'];
const STATUS_FILTERS = ['Todos', 'Activo', 'Pausado'];

const PLAN_BADGE = {
  Esencial: 'border-bone/30 text-bone/70',
  'Atlético': 'border-blood/40 text-blood',
  Premium: 'border-bone bg-bone text-ink-950',
};

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filtered = useMemo(() => {
    return CLIENTS.filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchPlan = planFilter === 'Todos' || c.plan === planFilter;
      const matchStatus = statusFilter === 'Todos' || c.status === statusFilter;
      return matchSearch && matchPlan && matchStatus;
    });
  }, [search, planFilter, statusFilter]);

  return (
    <>
      <TopBar
        title="Clientes"
        subtitle={`${filtered.length} de ${CLIENTS.length} mostrados`}
        action={
          <button className="btn-blood !py-2.5 !px-4 !text-[10px]">
            <Plus size={12} /> Nuevo cliente
          </button>
        }
      />

      <div className="flex-1 px-6 md:px-10 py-8 space-y-6">
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Buscador */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o email..."
              className="w-full bg-white/5 border border-white/10 pl-9 pr-3 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition"
            />
          </div>

          {/* Filtros plan */}
          <div className="flex gap-1.5">
            <Filter size={12} className="text-bone/40 self-center mr-1" />
            {PLAN_FILTERS.map((p) => (
              <button
                key={p}
                onClick={() => setPlanFilter(p)}
                className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider border transition ${
                  planFilter === p
                    ? 'bg-blood text-bone border-blood'
                    : 'bg-transparent text-bone/50 border-white/10 hover:border-white/30 hover:text-bone'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Filtros estado */}
          <div className="flex gap-1.5">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider border transition ${
                  statusFilter === s
                    ? 'bg-bone text-ink-950 border-bone'
                    : 'bg-transparent text-bone/50 border-white/10 hover:border-white/30 hover:text-bone'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-ink-900 border border-white/10">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_60px] gap-4 px-6 py-4 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-bone/40">
            <span>Cliente</span>
            <span>Plan</span>
            <span>Estado</span>
            <span>Adherencia</span>
            <span>Peso actual</span>
            <span></span>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-bone/40 text-sm">
              No se encontraron clientes con esos filtros.
            </div>
          ) : (
            filtered.map((c) => (
              <Link
                key={c.id}
                href={`/admin/clientes/${c.id}`}
                className="grid grid-cols-[1fr_60px] md:grid-cols-[2fr_1fr_1fr_1.5fr_1fr_60px] gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition group items-center"
              >
                {/* Cliente */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={c.photoUrl}
                    alt=""
                    className="w-10 h-10 object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-display text-base tracking-wide text-bone uppercase truncate">
                      {c.name}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mt-0.5">
                      {c.goal}
                    </div>
                  </div>
                </div>

                {/* Plan */}
                <div className="hidden md:block">
                  <span
                    className={`inline-block px-2 py-1 text-[9px] font-mono uppercase tracking-wider border ${
                      PLAN_BADGE[c.plan]
                    }`}
                  >
                    {c.plan}
                  </span>
                </div>

                {/* Estado */}
                <div className="hidden md:flex items-center gap-2">
                  <span
                    className={`status-dot ${
                      c.status === 'Activo' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-xs text-bone/70">{c.status}</span>
                </div>

                {/* Adherencia */}
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/5 relative overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 ${
                        c.adherence >= 85
                          ? 'bg-emerald-500'
                          : c.adherence >= 70
                          ? 'bg-amber-500'
                          : 'bg-blood'
                      }`}
                      style={{ width: `${c.adherence}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-bone/70 w-10 text-right">
                    {c.adherence}%
                  </span>
                </div>

                {/* Peso */}
                <div className="hidden md:block">
                  <div className="font-display text-sm tracking-tight text-bone">
                    {c.weightCurrent} kg
                  </div>
                  <div className="text-[9px] font-mono text-bone/40 mt-0.5">
                    {c.weightCurrent < c.weightStart ? '−' : '+'}
                    {Math.abs(c.weightCurrent - c.weightStart).toFixed(1)} kg
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={14}
                  className="text-bone/30 group-hover:text-blood transition justify-self-end"
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
