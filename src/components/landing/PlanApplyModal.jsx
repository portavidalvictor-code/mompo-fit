'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Genera próximos 10 días laborables (sin domingos)
function getAvailableDays() {
  const days = [];
  const today = new Date();
  let offset = 1;
  while (days.length < 10) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    if (d.getDay() !== 0) {
      // skip domingos
      days.push(d);
    }
    offset++;
  }
  return days;
}

// Slots horarios fijos
const TIME_SLOTS = ['09:00', '10:30', '12:00', '17:00', '18:30'];

// Pseudo-aleatorio para marcar algunos slots como ocupados (consistente por día)
function isSlotBusy(date, time) {
  const seed = date.getDate() + parseInt(time.split(':')[0]) * 7;
  return seed % 5 === 0 || seed % 7 === 0;
}

function formatDayShort(date) {
  return date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
}

function formatDayNumber(date) {
  return date.getDate();
}

function formatMonth(date) {
  return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
}

function formatFullDate(date) {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export default function PlanApplyModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: calendar, 3: success
  const [selectedPlan, setSelectedPlan] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
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
  });

  // Calendar
  const days = useRef(getAvailableDays()).current;
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Listen to custom event from outside
  useEffect(() => {
    const handler = (e) => {
      const plan = e.detail?.plan || '';
      setSelectedPlan(plan);
      setStep(1);
      setSelectedDay(null);
      setSelectedTime(null);
      setErrors({});
      setOpen(true);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener('open-plan-modal', handler);
    return () => window.removeEventListener('open-plan-modal', handler);
  }, []);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line
  }, [open]);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = '';
  };

  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validar y avanzar a calendario
  const goToCalendar = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Pon tu nombre';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email no válido';
    if (!formData.phone.trim()) newErrors.phone = 'Pon tu teléfono';
    if (!formData.goal.trim()) newErrors.goal = 'Cuéntame tu objetivo';
    if (!formData.experience) newErrors.experience = 'Selecciona tu experiencia';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    } else {
      // Scroll al primer error
      setTimeout(() => {
        document
          .querySelector('[data-error="true"]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // Enviar todo (formulario + slot) a Supabase
  const submitAll = async () => {
    if (!selectedDay || !selectedTime) return;
    setSubmitting(true);
    try {
      const appointmentDate = selectedDay.toISOString().split('T')[0];
      const appointmentTime = selectedTime;
      const appointmentLabel = formatFullDate(selectedDay) + ' a las ' + selectedTime;

      // Guardar en Supabase
      const { error: dbError } = await supabase.from('applications').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age || null,
          weight: formData.weight || null,
          height: formData.height || null,
          goal: formData.goal,
          experience: formData.experience,
          days_week: formData.daysWeek || null,
          where_train: formData.where || null,
          injuries: formData.injuries || null,
          history: formData.history || null,
          plan: selectedPlan,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          appointment_label: appointmentLabel,
        },
      ]);

      if (dbError) {
        console.error('Error Supabase:', dbError);
      }

      // También intentar enviar email (silencioso si falla)
      try {
        await fetch('/api/solicitudes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            plan: selectedPlan,
            appointmentDate,
            appointmentTime,
            appointmentLabel,
          }),
        });
      } catch (emailErr) {
        // ignore - ya está guardado en BD
      }

      // Mostrar éxito si al menos Supabase funcionó
      if (!dbError) {
        setStep(3);
      } else {
        alert('Hubo un error. Inténtalo de nuevo o escríbeme a josemompo8@gmail.com');
      }
    } catch (err) {
      console.error('Error general:', err);
      alert('Hubo un error. Inténtalo de nuevo o escríbeme a josemompo8@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-ink-950/85 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-ink-950 border border-white/10 overflow-hidden flex flex-col">
        {/* Header del modal */}
        <div className="sticky top-0 z-10 bg-ink-950 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-blood mb-0.5">
              {step === 1 && 'Paso 1 de 2 · Tus datos'}
              {step === 2 && 'Paso 2 de 2 · Reserva tu llamada'}
              {step === 3 && 'Reserva confirmada'}
            </div>
            <div className="font-display text-lg md:text-xl tracking-tight text-bone uppercase truncate">
              {selectedPlan ? `Plan ${selectedPlan}` : 'Aplicar al programa'}
            </div>
          </div>
          <button
            onClick={close}
            className="flex-shrink-0 ml-4 w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-blood hover:border-blood transition"
            aria-label="Cerrar"
          >
            <X size={16} className="text-bone" />
          </button>
        </div>

        {/* Progreso */}
        {step < 3 && (
          <div className="h-0.5 bg-white/10">
            <div
              className="h-full bg-blood transition-all duration-500"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {/* PASO 1 — FORMULARIO */}
          {step === 1 && (
            <form onSubmit={goToCalendar} className="p-6 md:p-8 space-y-6">
              <p className="text-sm text-bone/70 leading-relaxed border-l-2 border-blood pl-4">
                Cuanto mejor entienda tu situación, mejor será el plan. Todos los campos
                con <span className="text-blood">*</span> son obligatorios. Después
                reservarás una llamada conmigo.
              </p>

              {/* Sobre ti */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-blood">01</span>
                  <span className="font-display text-lg tracking-tight text-bone uppercase">
                    Sobre ti
                  </span>
                  <span className="flex-1 h-px bg-white/10" />
                </div>

                <Field
                  label="Nombre completo"
                  required
                  error={errors.name}
                  value={formData.name}
                  onChange={(v) => update('name', v)}
                  placeholder="Jose Mompó"
                />
                <Field
                  type="email"
                  label="Email"
                  required
                  error={errors.email}
                  value={formData.email}
                  onChange={(v) => update('email', v)}
                  placeholder="tu@email.com"
                />
                <Field
                  type="tel"
                  label="Teléfono / WhatsApp"
                  required
                  error={errors.phone}
                  value={formData.phone}
                  onChange={(v) => update('phone', v)}
                  placeholder="+34 600 000 000"
                />
                <div className="grid grid-cols-3 gap-4">
                  <Field
                    type="number"
                    label="Edad"
                    value={formData.age}
                    onChange={(v) => update('age', v)}
                    placeholder="34"
                  />
                  <Field
                    type="number"
                    label="Peso (kg)"
                    value={formData.weight}
                    onChange={(v) => update('weight', v)}
                    placeholder="78"
                  />
                  <Field
                    type="number"
                    label="Altura (cm)"
                    value={formData.height}
                    onChange={(v) => update('height', v)}
                    placeholder="178"
                  />
                </div>
              </div>

              {/* Tu objetivo */}
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-blood">02</span>
                  <span className="font-display text-lg tracking-tight text-bone uppercase">
                    Tu objetivo
                  </span>
                  <span className="flex-1 h-px bg-white/10" />
                </div>

                <FieldArea
                  label="¿Qué quieres conseguir?"
                  required
                  error={errors.goal}
                  value={formData.goal}
                  onChange={(v) => update('goal', v)}
                  placeholder="Perder grasa, ganar músculo, recomposición, mejorar rendimiento..."
                />

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-bone/60 mb-2">
                    Tu experiencia entrenando <span className="text-blood">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2" data-error={errors.experience ? 'true' : 'false'}>
                    {['Principiante', 'Intermedio', 'Avanzado'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => update('experience', opt)}
                        className={`py-3 px-3 text-[10px] font-mono uppercase tracking-wider border transition ${
                          formData.experience === opt
                            ? 'bg-blood border-blood text-bone'
                            : 'border-white/10 text-bone/60 hover:border-white/30'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.experience && (
                    <div className="flex items-center gap-1.5 text-blood text-xs mt-2">
                      <AlertCircle size={11} /> {errors.experience}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Días/semana disponibles"
                    value={formData.daysWeek}
                    onChange={(v) => update('daysWeek', v)}
                    placeholder="3, 4, 5..."
                  />
                  <Field
                    label="Dónde entrenas"
                    value={formData.where}
                    onChange={(v) => update('where', v)}
                    placeholder="Gimnasio / casa / mixto"
                  />
                </div>
              </div>

              {/* Contexto */}
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-blood">03</span>
                  <span className="font-display text-lg tracking-tight text-bone uppercase">
                    Contexto
                  </span>
                  <span className="flex-1 h-px bg-white/10" />
                </div>

                <FieldArea
                  label="Lesiones, dolencias o limitaciones"
                  value={formData.injuries}
                  onChange={(v) => update('injuries', v)}
                  placeholder="Hombro, rodilla, espalda... cualquier cosa relevante"
                />
                <FieldArea
                  label="Lo que has probado antes"
                  value={formData.history}
                  onChange={(v) => update('history', v)}
                  placeholder="Apps, otros entrenadores, dietas..."
                />
              </div>

              {/* Submit form */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="submit"
                  className="btn-blood !px-6 !py-3.5 !text-[10px]"
                >
                  Continuar a reserva <ArrowRight size={12} />
                </button>
              </div>
            </form>
          )}

          {/* PASO 2 — CALENDARIO */}
          {step === 2 && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 border-l-2 border-blood pl-4">
                <Calendar size={16} className="text-blood mt-0.5 flex-shrink-0" />
                <p className="text-sm text-bone/70 leading-relaxed">
                  Reserva una llamada conmigo de <span className="text-bone">15 minutos</span>.
                  Repasaremos tu situación y veremos si encajamos. Sin compromiso.
                </p>
              </div>

              {/* Selector de día */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-bone/60 mb-3">
                  Elige un día
                </div>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {days.map((d, i) => {
                    const active =
                      selectedDay && selectedDay.toDateString() === d.toDateString();
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedDay(d);
                          setSelectedTime(null);
                        }}
                        className={`flex flex-col items-center py-3 px-1 border transition ${
                          active
                            ? 'bg-blood border-blood text-bone'
                            : 'border-white/10 text-bone/70 hover:border-white/30'
                        }`}
                      >
                        <span className="text-[8px] font-mono uppercase tracking-wider opacity-80">
                          {formatDayShort(d)}
                        </span>
                        <span className="font-display text-xl tracking-tight mt-1">
                          {formatDayNumber(d)}
                        </span>
                        <span className="text-[8px] font-mono uppercase opacity-60">
                          {formatMonth(d)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector de hora */}
              {selectedDay && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-bone/60 mb-3 flex items-center gap-2">
                    <Clock size={11} />
                    Elige una hora · {formatFullDate(selectedDay)}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {TIME_SLOTS.map((time) => {
                      const busy = isSlotBusy(selectedDay, time);
                      const active = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={busy}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 text-sm font-mono tracking-wider transition ${
                            busy
                              ? 'border border-white/5 text-bone/20 line-through cursor-not-allowed'
                              : active
                              ? 'bg-blood border border-blood text-bone'
                              : 'border border-white/10 text-bone/80 hover:border-white/40'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Resumen y CTA */}
              {selectedDay && selectedTime && (
                <div className="border border-blood/40 bg-blood/5 p-5">
                  <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-blood mb-1">
                    Tu reserva
                  </div>
                  <div className="font-display text-lg md:text-xl tracking-tight text-bone uppercase">
                    {formatFullDate(selectedDay)} · {selectedTime}h
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="pt-4 flex flex-col-reverse md:flex-row items-stretch md:items-center md:justify-between gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/20 text-[10px] font-mono uppercase tracking-wider text-bone/70 hover:border-white/40 transition"
                >
                  <ArrowLeft size={12} /> Volver al formulario
                </button>
                <button
                  type="button"
                  disabled={!selectedDay || !selectedTime || submitting}
                  onClick={submitAll}
                  className="btn-blood !px-6 !py-3.5 !text-[10px] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Enviando...' : (
                    <>
                      Confirmar reserva <Check size={12} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* PASO 3 — SUCCESS */}
          {step === 3 && (
            <div className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-blood mb-6">
                <CheckCircle2 size={32} className="text-blood" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-crush leading-none text-bone uppercase mb-4">
                Reserva<br />
                <span className="text-blood">confirmada</span>.
              </h3>
              <p className="text-base text-bone/70 leading-relaxed max-w-md mx-auto mb-6">
                Te he reservado el{' '}
                <span className="text-bone">
                  {selectedDay && formatFullDate(selectedDay)} a las {selectedTime}h
                </span>
                . Te llegará un email con los detalles y te llamaré yo personalmente.
              </p>
              <p className="text-sm text-bone/50 leading-relaxed max-w-md mx-auto mb-8">
                Si necesitas cambiar la cita, escríbeme por WhatsApp a{' '}
                <span className="text-bone">+34 693 848 285</span>.
              </p>
              <button
                onClick={close}
                className="btn-blood !px-8 !py-3.5 !text-[10px]"
              >
                Cerrar <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// Subcomponentes auxiliares
// =============================================================
function Field({ label, required, error, value, onChange, placeholder, type = 'text' }) {
  return (
    <div data-error={error ? 'true' : 'false'}>
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-bone/60 mb-2">
        {label} {required && <span className="text-blood">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/5 border px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none transition ${
          error ? 'border-blood/60' : 'border-white/10 focus:border-blood/60'
        }`}
      />
      {error && (
        <div className="flex items-center gap-1.5 text-blood text-xs mt-1.5">
          <AlertCircle size={11} /> {error}
        </div>
      )}
    </div>
  );
}

function FieldArea({ label, required, error, value, onChange, placeholder }) {
  return (
    <div data-error={error ? 'true' : 'false'}>
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-bone/60 mb-2">
        {label} {required && <span className="text-blood">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`w-full bg-white/5 border px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none transition resize-none ${
          error ? 'border-blood/60' : 'border-white/10 focus:border-blood/60'
        }`}
      />
      {error && (
        <div className="flex items-center gap-1.5 text-blood text-xs mt-1.5">
          <AlertCircle size={11} /> {error}
        </div>
      )}
    </div>
  );
}
