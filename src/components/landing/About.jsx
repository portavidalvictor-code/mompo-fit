import { Award, Dumbbell, Star } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-ink-950 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-start">
          {/* Foto · vertical, entera, sin difuminado */}
          <div className="relative">
            <div className="relative aspect-[2/3] overflow-hidden bg-ink-900">
              <img
                src="/jose-mompo.jpg"
                alt="José Mompó · Entrenador personal Mompofit"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Firma inferior */}
            <div className="absolute -bottom-4 -right-4 bg-bone text-ink-950 px-5 py-3 z-10">
              <div className="font-display text-2xl tracking-tight uppercase leading-none">
                José Mompó
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.3em] mt-1">
                Mompofit
              </div>
            </div>
          </div>

          {/* Texto */}
          <div>
            <div className="eyebrow">003 — Sobre José Mompó</div>

            <h2 className="font-display text-5xl md:text-6xl tracking-crush leading-none text-bone uppercase mb-8">
              No vendo humo.<br />
              Te ayudo con<br />
              <span className="text-blood">un sistema probado</span>.
            </h2>

            <div className="space-y-5 text-bone/70 leading-relaxed">
              <p>
                Llevo 3 años entrenando a personas que llegan diciendo lo mismo:{' '}
                <span className="text-bone">"no tengo tiempo, no veo cambios, ya no me reconozco"</span>.
                Mi trabajo es darte un plan que sí funcione contigo y acompañarte en el proceso.
              </p>
              <p>
                Trabajo con gente de todas las edades:{' '}
                <span className="text-bone">directivos, médicos, comerciales</span> y cualquier
                profesional que quiera mejorar su físico con un método claro. Gente con
                responsabilidades reales y poco margen para experimentos.
              </p>
              <p>
                Mi enfoque es directo, medible y sin filosofías raras.{' '}
                <span className="text-bone">Entrenamiento, nutrición y seguimiento personalizado</span>{' '}
                adaptado a tu vida real, no a otra que requeriría no tener responsabilidades.
              </p>
            </div>

            {/* Mini stats */}
            <div className="mt-10 grid grid-cols-3 gap-px bg-white/10">
              {[
                { icon: Award, val: '3', label: 'Años' },
                { icon: Dumbbell, val: '92%', label: 'Adherencia' },
                { icon: Star, val: '4.9', label: 'Rating' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-ink-950 px-4 py-5 flex flex-col gap-2">
                    <Icon size={14} className="text-blood" />
                    <span className="font-display text-2xl tracking-tight text-bone">
                      {s.val}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-bone/40">
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
