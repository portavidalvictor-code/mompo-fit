'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import TopBar from '@/components/admin/TopBar';
import { FOLLOWUPS } from '@/data/clients';

const STATUS_FILTERS = ['Todos', 'Pendiente', 'Necesita ajuste', 'Revisado'];

const STATUS_STYLES = {
  Pendiente: 'border-blood/40 bg-blood/10 text-blood',
  'Necesita ajuste': 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  Revisado: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
};

export default function FollowupsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState(FOLLOWUPS[0]?.id);
  const [reply, setReply] = useState('');
  const [statuses, setStatuses] = useState(
    Object.fromEntries(FOLLOWUPS.map((f) => [f.id, f.status]))
  );

  const filtered = useMemo(() => {
    return FOLLOWUPS.filter((f) => {
      const matchSearch =
        !search ||
        f.clientName.toLowerCase().includes(search.toLowerCase()) ||
        f.comment.toLowerCase().includes(search.toLowerCase());
      const status = statuses[f.id] ?? f.status;
      const matchFilter = filter === 'Todos' || status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter, statuses]);

  const current = FOLLOWUPS.find((f) => f.id === selected) || filtered[0];
  const currentStatus = current ? statuses[current.id] ?? current.status : null;

  const counts = useMemo(() => {
    const all = Object.values(statuses);
    return {
      pendiente: all.filter((s) => s === 'Pendiente').length,
      ajuste: all.filter((s) => s === 'Necesita ajuste').length,
      revisado: all.filter((s) => s === 'Revisado').length,
    };
  }, [statuses]);

  const updateStatus = (id, newStatus) => {
    setStatuses((s) => ({ ...s, [id]: newStatus }));
  };

  return (
    <>
      <TopBar
        title="Seguimientos"
        subtitle={`${counts.pendiente} pendientes · ${counts.ajuste} con ajuste · ${counts.revisado} revisados`}
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[420px_1fr] min-h-0">
        {/* Lista */}
        <aside className="border-r border-white/10 bg-ink-950 flex flex-col min-h-0">
          <div className="p-5 border-b border-white/10 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cliente o comentario..."
                className="w-full bg-white/5 border border-white/10 pl-9 pr-3 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition ${
                    filter === s
                      ? 'bg-blood text-bone border-blood'
                      : 'bg-transparent text-bone/50 border-white/10 hover:border-white/30 hover:text-bone'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="p-10 text-center text-sm text-bone/40">
                No hay seguimientos con esos filtros.
              </div>
            )}
            {filtered.map((f) => {
              const status = statuses[f.id] ?? f.status;
              const isActive = current?.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelected(f.id);
                    setReply(f.coachReply || '');
                  }}
                  className={`w-full text-left px-5 py-4 border-b border-white/5 transition group ${
                    isActive ? 'bg-blood/10 border-l-2 border-l-blood' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="font-display text-base tracking-wide text-bone uppercase truncate">
                      {f.clientName}
                    </div>
                    <ChevronRight
                      size={14}
                      className={`flex-shrink-0 mt-1 ${
                        isActive ? 'text-blood' : 'text-bone/30 group-hover:text-bone'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-bone/60 mb-2 truncate">{f.comment}</div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-bone/40">{f.week} · {f.date}</span>
                    <span className={`px-1.5 py-0.5 border ${STATUS_STYLES[status]}`}>
                      {status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Detalle */}
        <section className="flex-1 overflow-y-auto">
          {!current ? (
            <div className="h-full flex items-center justify-center text-bone/40 text-sm">
              Selecciona un seguimiento.
            </div>
          ) : (
            <div className="px-6 py-8 md:px-10 space-y-7">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-6 border-b border-white/10">
                <div>
                  <div className="eyebrow">{current.week} · {current.date}</div>
                  <h2 className="font-display text-4xl md:text-5xl tracking-crush text-bone uppercase">
                    {current.clientName}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 border text-[11px] font-mono uppercase tracking-wider ${STATUS_STYLES[currentStatus]}`}
                >
                  {currentStatus}
                </span>
              </div>

              {/* Métricas */}
              <div>
                <div className="eyebrow mb-4">Métricas semanales</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <Metric label="Peso" value={`${current.weight} kg`} icon={TrendingUp} />
                  <Metric label="Dieta" value={`${current.diet}%`} bar={current.diet} />
                  <Metric label="Entren." value={`${current.training}%`} bar={current.training} />
                  <Metric label="Energía" value={`${current.energy}/10`} bar={current.energy * 10} />
                  <Metric label="Sueño" value={`${current.sleep}/10`} bar={current.sleep * 10} />
                  <Metric label="Hambre" value={`${current.hunger}/10`} bar={current.hunger * 10} reverse />
                </div>
                <div className="grid grid-cols-1 mt-3">
                  <Metric label="Estrés" value={`${current.stress}/10`} bar={current.stress * 10} reverse />
                </div>
              </div>

              {/* Comentario cliente */}
              <div className="bg-ink-900 border border-white/10 p-6">
                <div className="eyebrow mb-3">Comentario del cliente</div>
                <p className="text-bone/90 leading-relaxed italic">"{current.comment}"</p>
              </div>

              {/* Respuesta del coach */}
              <div className="bg-ink-900 border border-white/10 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="eyebrow !mb-0">Respuesta del coach</div>
                  {current.coachReply && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                      Ya enviada
                    </span>
                  )}
                </div>
                <textarea
                  value={reply || current.coachReply || ''}
                  onChange={(e) => setReply(e.target.value)}
                  rows={5}
                  placeholder="Escribe la devolución, los ajustes propuestos y el mensaje motivacional..."
                  className="w-full bg-white/5 border border-white/10 px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition resize-none"
                />

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => updateStatus(current.id, 'Revisado')}
                    className="btn-blood !py-2 !px-4 !text-[10px]"
                  >
                    <Send size={11} /> Enviar respuesta
                  </button>
                  <button
                    onClick={() => updateStatus(current.id, 'Revisado')}
                    className="btn-ghost !py-2 !px-4 !text-[10px]"
                  >
                    <CheckCircle2 size={11} /> Marcar revisado
                  </button>
                  <button
                    onClick={() => updateStatus(current.id, 'Necesita ajuste')}
                    className="btn-ghost !py-2 !px-4 !text-[10px]"
                  >
                    <AlertTriangle size={11} /> Pedir ajuste de plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function Metric({ label, value, bar, reverse }) {
  const color = reverse
    ? bar > 70
      ? 'bg-blood'
      : bar > 50
      ? 'bg-amber-500'
      : 'bg-emerald-500'
    : bar > 70
    ? 'bg-emerald-500'
    : bar > 50
    ? 'bg-amber-500'
    : 'bg-blood';

  return (
    <div className="bg-ink-900 border border-white/10 p-3">
      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-1">
        {label}
      </div>
      <div className="font-display text-lg tracking-tight text-bone mb-2">{value}</div>
      {typeof bar === 'number' && (
        <div className="h-0.5 bg-white/5">
          <div className={`h-full ${color}`} style={{ width: `${bar}%` }} />
        </div>
      )}
    </div>
  );
}
