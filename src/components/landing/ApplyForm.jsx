'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const GOALS = ['Pérdida de grasa', 'Ganar músculo', 'Recomposición', 'Mantener / rendimiento'];
const EXPERIENCE = ['Principiante', 'Intermedio', 'Avanzado'];
const WHERE = ['Gimnasio', 'Casa con material', 'Casa sin material', 'Aire libre'];

export default function ApplyForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    experience: '',
    daysWeek: '',
    where: '',
    injuries: '',
    history: '',
    plan: 'Atlético',
    accepted: false,
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm({ ...form, [k]: v });

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Requerido';
    if (!form.email) e.email = 'Requerido';
    if (!form.phone) e.phone = 'Requerido';
    if (!form.goal) e.goal = 'Requerido';
    if (!form.experience) e.experience = 'Requerido';
    if (!form.history || form.history.length < 20) e.history = 'Mínimo 20 caracteres';
    if (!form.accepted) e.accepted = 'Debes aceptar';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <section id="aplicar" className="py-24 md:py-32 bg-ink-950 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
          <CheckCircle2 size={48} className="text-blood mx-auto mb-6" />
          <div className="eyebrow justify-center">Solicitud recibida</div>
          <h2 className="font-display text-5xl md:text-6xl tracking-crush text-bone uppercase mb-6">
            Hablamos<br />
            <span className="text-blood">en 24h.</span>
          </h2>
          <p className="text-bone/70 leading-relaxed">
            Hemos recibido tu solicitud. Te contactaré por email en menos de 24 horas para
            agendar una llamada inicial gratuita y, si encajamos, empezar el plan.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="aplicar" className="relative py-24 md:py-32 bg-ink-950 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 diagonal-bg opacity-30" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="eyebrow justify-center">007 — Solicitud</div>
          <h2 className="font-display text-5xl md:text-7xl tracking-crush leading-none text-bone uppercase mb-6">
            Aplica al<br />
            <span className="text-blood">programa</span>.
          </h2>
          <p className="text-lg text-bone/70 max-w-xl mx-auto">
            Responde estas preguntas con honestidad. Cuanto mejor entienda tu situación,
            mejor será el plan. Te contesto en 24h.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <FieldGroup title="Sobre ti" num="01">
            <Field label="Nombre completo *" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="form-input"
                placeholder="Jose Mompó"
              />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="form-input"
                placeholder="tu@email.com"
              />
            </Field>
            <Field label="Teléfono / WhatsApp *" error={errors.phone}>
              <input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="form-input"
                placeholder="+34 600 000 000"
              />
            </Field>
            <Field label="Edad">
              <input
                type="number"
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                className="form-input"
                placeholder="34"
              />
            </Field>
          </FieldGroup>

          <FieldGroup title="Datos físicos" num="02">
            <Field label="Peso actual (kg)">
              <input
                type="number"
                step="0.1"
                value={form.weight}
                onChange={(e) => update('weight', e.target.value)}
                className="form-input"
                placeholder="78.4"
              />
            </Field>
            <Field label="Altura (cm)">
              <input
                type="number"
                value={form.height}
                onChange={(e) => update('height', e.target.value)}
                className="form-input"
                placeholder="178"
              />
            </Field>
          </FieldGroup>

          <FieldGroup title="Tu objetivo" num="03">
            <Field label="¿Qué quieres conseguir? *" error={errors.goal} full>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {GOALS.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => update('goal', g)}
                    className={`px-3 py-3 text-[10px] font-mono uppercase tracking-wider border transition ${
                      form.goal === g
                        ? 'bg-blood text-bone border-blood'
                        : 'bg-transparent text-bone/70 border-white/20 hover:border-white/40'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Experiencia entrenando *" error={errors.experience}>
              <div className="grid grid-cols-3 gap-2">
                {EXPERIENCE.map((e) => (
                  <button
                    type="button"
                    key={e}
                    onClick={() => update('experience', e)}
                    className={`px-3 py-3 text-[10px] font-mono uppercase tracking-wider border transition ${
                      form.experience === e
                        ? 'bg-blood text-bone border-blood'
                        : 'bg-transparent text-bone/70 border-white/20 hover:border-white/40'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Días/semana disponibles">
              <input
                type="number"
                min="1"
                max="7"
                value={form.daysWeek}
                onChange={(e) => update('daysWeek', e.target.value)}
                className="form-input"
                placeholder="4"
              />
            </Field>

            <Field label="¿Dónde entrenas?" full>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {WHERE.map((w) => (
                  <button
                    type="button"
                    key={w}
                    onClick={() => update('where', w)}
                    className={`px-3 py-3 text-[10px] font-mono uppercase tracking-wider border transition ${
                      form.where === w
                        ? 'bg-blood text-bone border-blood'
                        : 'bg-transparent text-bone/70 border-white/20 hover:border-white/40'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </Field>
          </FieldGroup>

          <FieldGroup title="Tu historia" num="04">
            <Field label="Lesiones / molestias" full>
              <input
                value={form.injuries}
                onChange={(e) => update('injuries', e.target.value)}
                className="form-input"
                placeholder='"Hombro derecho operado en 2022", "Ninguna", etc.'
              />
            </Field>
            <Field label="Cuéntame brevemente tu situación *" error={errors.history} full>
              <textarea
                value={form.history}
                onChange={(e) => update('history', e.target.value)}
                rows={5}
                className="form-input resize-none"
                placeholder="Llevo dos años entrenando solo. Estoy estancado. He probado dos planes online y abandoné. Necesito alguien que me siga semanalmente."
              />
            </Field>
          </FieldGroup>

          <FieldGroup title="Plan de interés" num="05">
            <Field label="¿Qué plan te encaja?" full>
              <div className="grid grid-cols-3 gap-2">
                {['Esencial', 'Atlético', 'Premium'].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => update('plan', p)}
                    className={`px-3 py-3 text-[10px] font-mono uppercase tracking-wider border transition ${
                      form.plan === p
                        ? 'bg-blood text-bone border-blood'
                        : 'bg-transparent text-bone/70 border-white/20 hover:border-white/40'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>
          </FieldGroup>

          <div className="border-t border-white/10 pt-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.accepted}
                onChange={(e) => update('accepted', e.target.checked)}
                className="mt-1 w-4 h-4 accent-blood"
              />
              <span className="text-sm text-bone/70 group-hover:text-bone transition">
                Acepto que mis datos sean usados para contactarme sobre mi solicitud.
                No los comparto, no spam.
              </span>
            </label>
            {errors.accepted && (
              <div className="flex items-center gap-2 text-blood text-xs mt-2 ml-7">
                <AlertCircle size={12} /> {errors.accepted}
              </div>
            )}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 border border-blood/30 bg-blood/10 text-blood text-sm">
              <AlertCircle size={14} />
              Hubo un error al enviar tu solicitud. Inténtalo de nuevo o escríbenos directamente por WhatsApp.
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-blood disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>Enviando...</>
              ) : (
                <>
                  Enviar solicitud <Send size={14} />
                </>
              )}
            </button>
          </div>
        </form>

        <style jsx>{`
          .form-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1rem;
            color: #f5f2ee;
            font-family: var(--font-sans);
            font-size: 0.9rem;
            transition: border-color 0.2s;
          }
          .form-input:focus {
            outline: none;
            border-color: rgba(11, 93, 59, 0.6);
          }
          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.25);
          }
        `}</style>
      </div>
    </section>
  );
}

function FieldGroup({ title, num, children }) {
  return (
    <div className="border border-white/10 bg-ink-900 p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
          {num}
        </span>
        <span className="font-display text-xl tracking-tight text-bone uppercase">
          {title}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Field({ label, error, children, full }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/60 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 text-blood text-xs mt-1.5">
          <AlertCircle size={11} /> {error}
        </div>
      )}
    </div>
  );
}
