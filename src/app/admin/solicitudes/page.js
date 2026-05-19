'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Loader2,
  Inbox,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import AuthGuard from '@/components/admin/AuthGuard';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import { supabase } from '@/lib/supabase';

const STATUS_FILTERS = ['Todas', 'pending', 'contacted', 'accepted', 'rejected'];
const STATUS_LABELS = {
  pending: 'Pendiente',
  contacted: 'Contactado',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
};
const STATUS_STYLES = {
  pending: 'border-blood/40 bg-blood/10 text-blood',
  contacted: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  accepted: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  rejected: 'border-white/20 bg-white/5 text-bone/50',
};

function buildWhatsAppLink(req) {
  const phone = (req.phone || '').replace(/\D/g, '');
  const firstName = (req.name || '').split(' ')[0];
  const goal = (req.goal || '').toLowerCase();
  const message = `Hola ${firstName}, soy Jose de Mompó Fit. He recibido tu solicitud — gracias por confiar en mí. ${goal ? `Me ha llamado la atención lo que cuentas sobre "${goal}". ` : ''}Quiero hablar contigo 15 minutos para entender mejor tu caso. ¿Cuándo te viene bien?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todas');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRequests(data || []);
      if (data && data.length > 0) setSelected(data[0].id);
    } catch (err) {
      console.error(err);
      setError('Error cargando solicitudes.');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, newStatus) {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      setRequests(requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    } catch (err) {
      alert('Error actualizando estado.');
    }
  }

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchSearch =
        !search ||
        (r.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (r.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (r.goal || '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'Todas' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [requests, search, statusFilter]);

  const current = filtered.find((r) => r.id === selected) || filtered[0];

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-ink-950">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <TopBar />

          <main className="p-6 md:p-10">
            {/* Header */}
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-blood mb-2">
                  Admin · Solicitudes
                </div>
                <h1 className="font-display text-4xl md:text-5xl tracking-crush leading-none text-bone uppercase">
                  Bandeja de<br />
                  <span className="text-blood">solicitudes</span>.
                </h1>
                <p className="mt-4 text-bone/60 max-w-2xl">
                  Aquí aparecen todas las personas que han rellenado el formulario y reservado llamada.
                  Los datos llegan al instante desde la web.
                </p>
              </div>
              <button
                onClick={loadRequests}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 text-[10px] font-mono uppercase tracking-wider text-bone/70 hover:border-white/40 transition disabled:opacity-50"
              >
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                Actualizar
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total', val: requests.length },
                { label: 'Pendientes', val: requests.filter((r) => r.status === 'pending').length },
                { label: 'Contactadas', val: requests.filter((r) => r.status === 'contacted').length },
                { label: 'Aceptadas', val: requests.filter((r) => r.status === 'accepted').length },
              ].map((s, i) => (
                <div key={i} className="bg-ink-900 border border-white/10 p-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-2">
                    {s.label}
                  </div>
                  <div className="font-display text-3xl tracking-tight text-bone">
                    {loading ? '—' : s.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Search + filtros */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre, email o objetivo..."
                  className="w-full bg-ink-900 border border-white/10 pl-10 pr-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider border transition ${
                      statusFilter === s
                        ? 'bg-blood border-blood text-bone'
                        : 'border-white/10 text-bone/60 hover:border-white/30'
                    }`}
                  >
                    {STATUS_LABELS[s] || s}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="text-blood animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-blood/10 border border-blood/40 p-6 text-bone/80">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="bg-ink-900 border border-white/10 p-16 text-center">
                <Inbox size={40} className="text-bone/30 mx-auto mb-4" />
                <div className="font-display text-2xl tracking-tight text-bone uppercase mb-2">
                  {requests.length === 0 ? 'Aún no hay solicitudes' : 'Sin resultados'}
                </div>
                <p className="text-sm text-bone/60 max-w-md mx-auto">
                  {requests.length === 0
                    ? 'Cuando alguien rellene el formulario de la web y reserve llamada, aparecerá aquí.'
                    : 'Prueba a cambiar los filtros o el buscador.'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
                {/* Lista */}
                <div className="space-y-2">
                  {filtered.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelected(r.id)}
                      className={`w-full text-left p-4 border transition ${
                        current?.id === r.id
                          ? 'bg-ink-900 border-blood'
                          : 'bg-ink-900/50 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-display text-base tracking-wide text-bone uppercase truncate">
                          {r.name}
                        </div>
                        <span
                          className={`text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                            STATUS_STYLES[r.status] || STATUS_STYLES.pending
                          }`}
                        >
                          {STATUS_LABELS[r.status] || r.status}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-bone/50 mb-1 truncate">
                        {r.plan && `Plan ${r.plan} · `}
                        {new Date(r.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </div>
                      {r.appointment_label && (
                        <div className="flex items-center gap-1.5 text-[10px] text-blood mt-2">
                          <Calendar size={9} /> {r.appointment_label}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Detalle */}
                {current && (
                  <div className="bg-ink-900 border border-white/10 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                      <div>
                        <div className="font-display text-2xl md:text-3xl tracking-tight text-bone uppercase">
                          {current.name}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-bone/50 mt-1">
                          {new Date(current.created_at).toLocaleString('es-ES')}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${current.phone}`}
                          className="w-9 h-9 border border-white/20 flex items-center justify-center text-bone/70 hover:text-bone hover:border-white/40 transition"
                          title="Llamar"
                        >
                          <Phone size={13} />
                        </a>
                        <a
                          href={`mailto:${current.email}`}
                          className="w-9 h-9 border border-white/20 flex items-center justify-center text-bone/70 hover:text-bone hover:border-white/40 transition"
                          title="Email"
                        >
                          <Mail size={13} />
                        </a>
                        <a
                          href={buildWhatsAppLink(current)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-blood border border-blood flex items-center justify-center text-bone hover:bg-blood-600 transition"
                          title="WhatsApp"
                        >
                          <MessageCircle size={13} />
                        </a>
                      </div>
                    </div>

                    {/* Cita */}
                    {current.appointment_label && (
                      <div className="mb-6 bg-blood/5 border-l-2 border-blood p-4">
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-blood mb-1">
                          <Calendar size={11} /> Cita reservada
                        </div>
                        <div className="font-display text-lg tracking-tight text-bone uppercase">
                          {current.appointment_label}
                        </div>
                      </div>
                    )}

                    {/* Datos */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
                      <Info label="Email" value={current.email} />
                      <Info label="Teléfono" value={current.phone} />
                      <Info label="Plan solicitado" value={current.plan || '—'} />
                      <Info label="Experiencia" value={current.experience || '—'} />
                      <Info label="Edad" value={current.age || '—'} />
                      <Info label="Peso" value={current.weight ? `${current.weight} kg` : '—'} />
                      <Info label="Altura" value={current.height ? `${current.height} cm` : '—'} />
                      <Info label="Días/semana" value={current.days_week || '—'} />
                      <Info label="Dónde entrena" value={current.where_train || '—'} />
                    </div>

                    {current.goal && (
                      <Block label="Objetivo" value={current.goal} />
                    )}
                    {current.injuries && (
                      <Block label="Lesiones / limitaciones" value={current.injuries} />
                    )}
                    {current.history && (
                      <Block label="Lo que ha probado antes" value={current.history} />
                    )}

                    {/* Cambiar estado */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-3">
                        Cambiar estado
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['pending', 'contacted', 'accepted', 'rejected'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(current.id, s)}
                            className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider border transition ${
                              current.status === s
                                ? STATUS_STYLES[s]
                                : 'border-white/10 text-bone/60 hover:border-white/30'
                            }`}
                          >
                            {STATUS_LABELS[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-[9px] font-mono uppercase tracking-wider text-bone/40 mb-1">{label}</div>
      <div className="text-sm text-bone break-all">{value}</div>
    </div>
  );
}

function Block({ label, value }) {
  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="text-[9px] font-mono uppercase tracking-wider text-bone/40 mb-2">{label}</div>
      <div className="text-sm text-bone/85 leading-relaxed whitespace-pre-wrap">{value}</div>
    </div>
  );
}
