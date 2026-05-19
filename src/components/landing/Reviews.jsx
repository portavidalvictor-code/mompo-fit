'use client';

import { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2, Quote, AlertCircle, Loader2 } from 'lucide-react';
import { TESTIMONIALS } from '@/data/plans';
import { supabase } from '@/lib/supabase';

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar valoraciones de Supabase al montar
  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Combinar las de Supabase con las predefinidas (David D.)
      const supabaseReviews = (data || []).map((r) => ({
        id: 'sb-' + r.id,
        name: r.name,
        rating: r.rating,
        text: r.text,
        date: r.created_at?.split('T')[0],
        plan: '',
      }));
      setReviews([...supabaseReviews, ...TESTIMONIALS]);
    } catch (err) {
      console.error('Error cargando valoraciones:', err);
      setReviews(TESTIMONIALS);
    } finally {
      setLoading(false);
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Pon tu nombre';
    if (rating === 0) newErrors.rating = 'Selecciona una valoración';
    if (!text.trim()) newErrors.text = 'Escribe algo, aunque sea una palabra';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setStatus('sending');

    try {
      const { data, error } = await supabase.from('reviews').insert([
        {
          name: name.trim(),
          rating,
          text: text.trim(),
          approved: true,
        },
      ]).select();

      if (error) throw error;

      // Añadir la nueva valoración al inicio (optimistic)
      if (data && data[0]) {
        const newReview = {
          id: 'sb-' + data[0].id,
          name: data[0].name,
          rating: data[0].rating,
          text: data[0].text,
          date: data[0].created_at?.split('T')[0],
          plan: '',
        };
        setReviews([newReview, ...reviews]);
      }

      setStatus('sent');
    } catch (err) {
      console.error('Error enviando valoración:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Promedio
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, t) => acc + t.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <section
      id="opiniones"
      className="relative py-24 md:py-32 bg-ink-900 border-t border-white/10"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow justify-center">006 — Opiniones de clientes</div>
          <h2 className="font-display text-5xl md:text-7xl tracking-crush leading-none text-bone uppercase mb-6">
            La voz<br />
            de quienes<br />
            <span className="text-blood">ya entrenan</span>.
          </h2>
          <p className="text-lg text-bone/70 leading-relaxed mb-6">
            Opiniones reales de clientes que han trabajado con el entrenador personal{' '}
            <span className="text-bone">José Mompó</span>. ¿Has entrenado conmigo?
            Tu opinión ayuda a otros a decidir.
          </p>

          {/* Rating promedio */}
          <div className="inline-flex items-center gap-3 bg-ink-950 border border-white/10 px-5 py-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  className={s <= Math.round(avgRating) ? 'fill-blood text-blood' : 'text-bone/20'}
                />
              ))}
            </div>
            <span className="font-display text-2xl tracking-tight text-bone">{avgRating}</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-bone/50">
              · {reviews.length} {reviews.length === 1 ? 'opinión' : 'opiniones'}
            </span>
          </div>
        </div>

        {/* Grid: testimonios + formulario */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 max-w-6xl mx-auto">
          {/* Testimonios */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl tracking-tight text-bone uppercase mb-5">
              Lo que dicen
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 size={20} className="text-blood animate-spin" />
              </div>
            ) : (
              reviews.map((t) => (
                <article
                  key={t.id}
                  className="bg-ink-950 border border-white/10 p-6 hover:border-white/30 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-display text-lg tracking-wide text-bone uppercase">
                        {t.name}
                      </div>
                      {t.plan && (
                        <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mt-0.5">
                          Plan {t.plan}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          className={s <= t.rating ? 'fill-blood text-blood' : 'text-bone/20'}
                        />
                      ))}
                    </div>
                  </div>
                  <Quote size={12} className="text-blood mb-2" />
                  <p className="text-sm text-bone/85 leading-relaxed">{t.text}</p>
                </article>
              ))
            )}
          </div>

          {/* Formulario */}
          <div>
            <h3 className="font-display text-2xl tracking-tight text-bone uppercase mb-5">
              Deja tu opinión
            </h3>

            {status === 'sent' ? (
              <div className="bg-ink-950 border border-blood/40 p-8 text-center">
                <CheckCircle2 size={40} className="text-blood mx-auto mb-4" />
                <div className="font-display text-2xl tracking-tight text-bone uppercase mb-2">
                  ¡Gracias!
                </div>
                <p className="text-sm text-bone/70 mb-6">
                  Tu valoración ya aparece en la web. Gracias por compartir tu experiencia.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setName('');
                    setText('');
                    setRating(0);
                  }}
                  className="text-[10px] font-mono uppercase tracking-wider text-bone/60 hover:text-bone underline"
                >
                  Dejar otra valoración
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="bg-ink-950 border border-white/10 p-6 space-y-5"
              >
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/60 mb-2">
                    Tu nombre
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Carlos R."
                    className="w-full bg-white/5 border border-white/10 px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1.5 text-blood text-xs mt-1.5">
                      <AlertCircle size={11} /> {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/60 mb-2">
                    Tu valoración
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={
                            s <= (hoverRating || rating)
                              ? 'fill-blood text-blood'
                              : 'text-bone/20 hover:text-bone/40'
                          }
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="self-center ml-3 font-mono text-xs text-bone/60">
                        {rating}/5
                      </span>
                    )}
                  </div>
                  {errors.rating && (
                    <div className="flex items-center gap-1.5 text-blood text-xs mt-1.5">
                      <AlertCircle size={11} /> {errors.rating}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/60 mb-2">
                    Tu opinión
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    placeholder="Cuéntanos cómo ha sido tu experiencia con José Mompó"
                    className="w-full bg-white/5 border border-white/10 px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition resize-none"
                  />
                  {errors.text && (
                    <div className="flex items-center gap-1.5 text-blood text-xs mt-1.5">
                      <AlertCircle size={11} /> {errors.text}
                    </div>
                  )}
                </div>

                {status === 'error' && (
                  <div className="bg-blood/10 border border-blood/40 p-3 text-xs text-blood flex items-center gap-2">
                    <AlertCircle size={12} /> Error al enviar. Inténtalo de nuevo.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-blood w-full !py-3 !text-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      Enviar valoración <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
