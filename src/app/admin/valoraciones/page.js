'use client';

import { useEffect, useState } from 'react';
import { Star, Quote, Trash2, MessageSquare, Inbox, Loader2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import AuthGuard from '@/components/admin/AuthGuard';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import { supabase } from '@/lib/supabase';

export default function ValoracionesPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error(err);
      setError('Error cargando valoraciones de la base de datos.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview(id) {
    if (!confirm('¿Borrar esta valoración? No se podrá recuperar.')) return;
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      alert('Error al borrar. Inténtalo de nuevo.');
    }
  }

  async function toggleApproved(id, currentApproved) {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ approved: !currentApproved })
        .eq('id', id);
      if (error) throw error;
      setReviews(
        reviews.map((r) => (r.id === id ? { ...r, approved: !currentApproved } : r))
      );
    } catch (err) {
      alert('Error al cambiar estado.');
    }
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

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
                  Admin · Valoraciones
                </div>
                <h1 className="font-display text-4xl md:text-5xl tracking-crush leading-none text-bone uppercase">
                  Valoraciones<br />
                  <span className="text-blood">recibidas</span>.
                </h1>
                <p className="mt-4 text-bone/60 max-w-2xl">
                  Todas las valoraciones que dejan los clientes en la web pública.
                  Si quitas la aprobación, la valoración deja de aparecer en la web pero se queda guardada.
                </p>
              </div>
              <button
                onClick={loadReviews}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 text-[10px] font-mono uppercase tracking-wider text-bone/70 hover:border-white/40 transition disabled:opacity-50"
              >
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                Actualizar
              </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <div className="bg-ink-900 border border-white/10 p-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-2">
                  Total recibidas
                </div>
                <div className="font-display text-4xl tracking-tight text-bone">
                  {loading ? '—' : reviews.length}
                </div>
              </div>
              <div className="bg-ink-900 border border-white/10 p-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-2">
                  Valoración media
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="font-display text-4xl tracking-tight text-bone">
                    {loading ? '—' : avgRating}
                  </div>
                  <Star size={16} className="fill-blood text-blood" />
                </div>
              </div>
              <div className="bg-ink-900 border border-white/10 p-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mb-2">
                  Publicadas
                </div>
                <div className="font-display text-4xl tracking-tight text-bone">
                  {loading ? '—' : reviews.filter((r) => r.approved).length}
                </div>
              </div>
            </div>

            {/* Lista */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="text-blood animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-blood/10 border border-blood/40 p-6 text-bone/80">
                {error}
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-ink-900 border border-white/10 p-16 text-center">
                <Inbox size={40} className="text-bone/30 mx-auto mb-4" />
                <div className="font-display text-2xl tracking-tight text-bone uppercase mb-2">
                  Aún no hay valoraciones
                </div>
                <p className="text-sm text-bone/60 max-w-md mx-auto">
                  Cuando alguien deje una valoración en la web pública, aparecerá aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <article
                    key={r.id}
                    className={`border p-6 transition ${
                      r.approved
                        ? 'bg-ink-900 border-white/10 hover:border-white/30'
                        : 'bg-ink-900/50 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <div className="font-display text-xl tracking-wide text-bone uppercase">
                            {r.name}
                          </div>
                          <span className="text-[9px] font-mono uppercase tracking-wider text-bone/40">
                            · {new Date(r.created_at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                          {!r.approved && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-blood border border-blood/40 px-2 py-0.5">
                              Oculta
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={13}
                              className={s <= r.rating ? 'fill-blood text-blood' : 'text-bone/20'}
                            />
                          ))}
                          <span className="ml-2 text-[10px] font-mono uppercase tracking-wider text-bone/60">
                            {r.rating}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleApproved(r.id, r.approved)}
                          className="text-bone/40 hover:text-bone transition p-2"
                          title={r.approved ? 'Ocultar de la web' : 'Mostrar en la web'}
                        >
                          {r.approved ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        <button
                          onClick={() => deleteReview(r.id)}
                          className="text-bone/40 hover:text-blood transition p-2"
                          title="Borrar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <Quote size={12} className="text-blood mb-2" />
                    <p className="text-sm text-bone/85 leading-relaxed">{r.text}</p>
                  </article>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="mt-10 bg-blood/5 border-l-2 border-blood p-5">
              <div className="flex items-start gap-3">
                <MessageSquare size={16} className="text-blood mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-blood mb-1">
                    Cómo funciona
                  </div>
                  <p className="text-sm text-bone/70 leading-relaxed">
                    Las valoraciones se guardan en una base de datos online (Supabase) y aparecen
                    al instante en la web pública para todos los visitantes. Aquí puedes
                    <span className="text-bone"> ocultar/mostrar</span> o
                    <span className="text-bone"> borrar</span> cualquier valoración.
                    Si quitas la aprobación, la valoración se queda guardada pero deja de aparecer en la web.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
