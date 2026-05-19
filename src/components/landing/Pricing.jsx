'use client';

import { PLANS } from '@/data/plans';
import { Check, ArrowRight, Calendar } from 'lucide-react';

export default function Pricing() {
  const openModal = (planTitle) => {
    window.dispatchEvent(
      new CustomEvent('open-plan-modal', { detail: { plan: planTitle } })
    );
  };

  return (
    <section id="planes" className="relative py-24 md:py-32 bg-ink-950 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <div className="eyebrow justify-center">005 — Planes Mompofit</div>
          <h2 className="font-display text-5xl md:text-7xl tracking-crush leading-none text-bone uppercase mb-6">
            Cuatro opciones.<br />
            <span className="text-blood">Una decisión</span>.
          </h2>
        </div>

        {/* Grid 4 planes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col p-7 md:p-8 transition-all duration-300 ${
                plan.featured
                  ? 'bg-blood text-bone border border-blood blood-glow'
                  : 'bg-ink-900 border border-white/10 hover:border-white/30'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bone text-ink-950 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.25em]">
                  El más popular
                </div>
              )}

              {/* Header */}
              <div className="mb-5">
                <div
                  className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] mb-3 ${
                    plan.featured ? 'text-bone/80' : 'text-bone/50'
                  }`}
                >
                  <Calendar size={11} />
                  {plan.duration}
                </div>
                <h3 className="font-display text-3xl md:text-4xl tracking-tight uppercase mb-2 leading-none">
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.featured ? 'text-bone/85' : 'text-bone/60'}`}>
                  {plan.tagline}
                </p>
              </div>

              {/* Divider */}
              <div className={`h-px mb-5 ${plan.featured ? 'bg-bone/30' : 'bg-white/10'}`} />

              {/* Description */}
              <p
                className={`text-sm leading-relaxed mb-5 ${
                  plan.featured ? 'text-bone/90' : 'text-bone/70'
                }`}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={13}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'text-bone' : 'text-blood'
                      }`}
                    />
                    <span className={plan.featured ? 'text-bone/95' : 'text-bone/80'}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                onClick={() => openModal(plan.name)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[10px] font-mono uppercase tracking-wider transition-all ${
                  plan.featured
                    ? 'bg-bone text-ink-950 hover:bg-white'
                    : 'bg-blood text-bone hover:bg-blood-600'
                }`}
              >
                {plan.cta} <ArrowRight size={12} />
              </button>
            </article>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center mt-12 text-xs font-mono uppercase tracking-wider text-bone/40">
          Sin permanencia · Solicita información sin compromiso · Mompofit · José Mompó
        </p>
      </div>
    </section>
  );
}
