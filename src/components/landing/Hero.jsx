'use client';

import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollNext = () => {
    document.getElementById('metodo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink-950 grain">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1583500178690-f7fd39bce5fc?q=80&w=2000"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        <div className="absolute inset-0 diagonal-bg opacity-50" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center pt-24 md:pt-32 pb-16">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8 reveal-up">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-bone/60">
                001 — Entrenador personal · Valencia
              </span>
              <span className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-bone/40">
                <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" />
                Plazas disponibles
              </span>
            </div>

            {/* Título principal */}
            <h1 className="font-display tracking-crush leading-[0.85] text-bone uppercase reveal-up">
              <span className="sr-only">Mompofit · Entrenador Personal José Mompó · </span>
              <span className="block text-[18vw] md:text-[14vw] lg:text-[11vw]">
                Ponte
              </span>
              <span className="block text-[18vw] md:text-[14vw] lg:text-[11vw] text-blood">
                atlético<span className="text-bone">.</span>
              </span>
              <span className="block text-[12vw] md:text-[8vw] lg:text-[6vw] text-bone/50 mt-2 md:mt-0">
                Sin excusas.
              </span>
            </h1>

            {/* Subtítulo */}
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end reveal-up">
              <p className="text-base md:text-lg text-bone/70 max-w-xl leading-relaxed">
                <span className="text-bone">Mompofit</span> · Asesoramiento personal online con{' '}
                <span className="text-bone">José Mompó</span>. Entreno a hombres ocupados que
                deciden mejorar su físico. Plan a medida, seguimiento cercano y resultados garantizados.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('aplicar')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-blood"
                >
                  Aplicar al programa →
                </button>
                <button
                  onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-ghost"
                >
                  Ver planes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas inferiores */}
        <div className="border-t border-white/10 bg-ink-950/60 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-6 grid grid-cols-3 gap-6">
            {[
              { val: '3', label: 'Años entrenando' },
              { val: '92%', label: 'Adherencia media' },
              { val: '4.9', label: 'Valoración media' },
            ].map((m, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 border-l-2 border-blood/40 pl-4"
              >
                <span className="font-display text-3xl md:text-4xl tracking-tight text-bone">
                  {m.val}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-bone/50">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee inferior */}
        <div className="border-t border-white/10 py-4 overflow-hidden">
          <div className="marquee gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 whitespace-nowrap">
                <span className="font-display text-2xl tracking-tight text-bone/30 uppercase">
                  Estructura
                </span>
                <span className="text-blood">×</span>
                <span className="font-display text-2xl tracking-tight text-bone/30 uppercase">
                  Constancia
                </span>
                <span className="text-blood">×</span>
                <span className="font-display text-2xl tracking-tight text-bone/30 uppercase">
                  Método
                </span>
                <span className="text-blood">×</span>
                <span className="font-display text-2xl tracking-tight text-bone/30 uppercase">
                  Resultados
                </span>
                <span className="text-blood">×</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollNext}
          className="hidden md:flex absolute bottom-32 right-10 flex-col items-center gap-3 text-bone/40 hover:text-blood transition"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider rotate-90 origin-center mt-6">
            Scroll
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
