import { CASES } from '@/data/plans';
import { Quote } from 'lucide-react';

export default function Cases() {
  return (
    <section id="casos" className="relative py-24 md:py-32 bg-ink-900 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 md:mb-20">
          <div>
            <div className="eyebrow">004 — Casos reales</div>
            <h2 className="font-display text-5xl md:text-7xl tracking-crush leading-none text-bone uppercase">
              Antes.<br />
              <span className="text-blood">Después</span>.<br />
              Sin filtros.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg text-bone/70 leading-relaxed max-w-lg">
              Tres ejemplos reales. Tres contextos distintos. Mismo método.
              Sin retoques, sin promesas vacías. Lo que ves es lo que pasa cuando se ejecuta.
            </p>
          </div>
        </div>

        {/* Grid de casos */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {CASES.map((c) => (
            <article
              key={c.id}
              className="group border border-white/10 bg-ink-950 hover:border-white/30 transition-all duration-300 flex flex-col"
            >
              {/* Antes / Después */}
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={c.photoBefore}
                    alt={`${c.name} antes`}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-ink-950/90 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-bone/70 border border-white/10">
                    Antes
                  </div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={c.photoAfter}
                    alt={`${c.name} después`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-blood px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-bone">
                    Después
                  </div>
                </div>
              </div>

              {/* Datos */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-2xl tracking-tight text-bone uppercase">
                      {c.name}
                    </div>
                    {c.profession && (
                      <div className="text-[10px] font-mono uppercase tracking-wider text-bone/50 mt-1">
                        {c.profession}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-blood border border-blood/40 px-2 py-1 whitespace-nowrap">
                    {c.plan}
                  </span>
                </div>

                {/* Stats - solo Tiempo y Cambio */}
                <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-wider text-bone/40 mb-1">
                      Tiempo
                    </div>
                    <div className="font-display text-base tracking-wide text-bone">
                      {c.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-wider text-bone/40 mb-1">
                      Cambio
                    </div>
                    <div className="font-display text-base tracking-wide text-bone">
                      {c.weightLost}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="pt-4 flex-1">
                  <Quote size={14} className="text-blood mb-2" />
                  <p className="text-sm text-bone/80 italic leading-relaxed">
                    {c.quote}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
