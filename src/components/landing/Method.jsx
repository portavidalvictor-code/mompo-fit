import { Clock, Target, Zap } from 'lucide-react';

const PILLARS = [
  {
    num: '01',
    icon: Clock,
    title: 'Poco tiempo',
    description:
      'Sesiones de 45 a 60 minutos. Lo justo para producir el estímulo sin invadir tu vida. No regalo minutos. Cada serie tiene una razón.',
  },
  {
    num: '02',
    icon: Target,
    title: 'Plan a medida',
    description:
      'Edad, lesiones, viajes, horarios y objetivos reales. Un plan que aguante tu vida real, no uno que requiera otra vida para funcionar.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Vamos al grano',
    description:
      'Sin teorías inútiles ni dietas imposibles. Acción + medición + ajuste cada semana. Un plan estructurado que funciona.',
  },
];

export default function Method() {
  return (
    <section id="metodo" className="relative py-24 md:py-32 bg-ink-950 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-20">
          <div>
            <div className="eyebrow">002 — El método</div>
            <h2 className="font-display text-5xl md:text-7xl tracking-crush leading-none text-bone uppercase">
              Tres<br />
              <span className="text-blood">pilares</span>.<br />
              Reinicia tu<br />
              <span className="text-blood">metabolismo</span>.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg text-bone/70 leading-relaxed max-w-xl">
              Ofrezco un sistema que ya ha funcionado con otros hombres.
              Lo aplico contigo, lo ajustamos cada semana para asegurarnos de que consigues
              tu objetivo y lo sostenemos en el tiempo.
            </p>
          </div>
        </div>

        {/* Pilares */}
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="bg-ink-950 p-8 md:p-10 group hover:bg-ink-900 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
                    {p.num}
                  </span>
                  <Icon size={20} className="text-bone/30 group-hover:text-blood transition" />
                </div>

                <h3 className="font-display text-3xl md:text-4xl tracking-tight text-bone uppercase mb-5">
                  {p.title}
                </h3>

                <p className="text-bone/70 leading-relaxed">{p.description}</p>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
                    Pilar fundamental
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
