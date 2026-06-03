import { Instagram, Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

const CHANNELS = [
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@mompo.fit',
    href: 'https://www.instagram.com/mompo.fit/',
    note: 'Mejor canal para conocer mi día a día',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+34 693 848 285',
    href: 'https://wa.me/34693848285',
    note: 'Respuesta rápida',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'mompoasesorias@gmail.com',
    href: 'mailto:mompoasesorias@gmail.com',
    note: 'Para presentaciones formales',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+34 693 848 285',
    href: 'tel:+34693848285',
    note: 'Solo casos urgentes',
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative py-24 md:py-32 bg-ink-900 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 mb-16">
          <div>
            <div className="eyebrow">007 — Contacto</div>
            <h2 className="font-display text-5xl md:text-7xl tracking-crush leading-none text-bone uppercase">
              Cuatro<br />
              caminos.<br />
              <span className="text-blood">Elige</span>.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg text-bone/70 leading-relaxed max-w-lg">
              Si quieres entrar al programa, abajo tienes el formulario.
              Si solo quieres preguntar algo concreto, cualquiera de estos canales sirve.
            </p>
          </div>
        </div>

        {/* Canales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-ink-900 p-7 hover:bg-ink-950 transition-all duration-300 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} className="text-bone/60 group-hover:text-blood transition" />
                  <ArrowUpRight
                    size={14}
                    className="text-bone/30 group-hover:text-bone transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-bone/40 mb-2">
                    {c.label}
                  </div>
                  <div className="font-display text-xl tracking-tight text-bone uppercase mb-2">
                    {c.value}
                  </div>
                  <div className="text-xs text-bone/50">{c.note}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
