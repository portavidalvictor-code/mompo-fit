import { Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

const EMAIL = 'mompoasesorias@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/mompo.fit/';

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Top: nav + contacto */}
        <div className="grid md:grid-cols-[1.5fr_1fr_1.2fr] gap-12 py-16 border-b border-white/10">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-2 h-2 bg-blood" />
              <span className="font-display text-xl tracking-tight text-bone uppercase">
                Mompó<span className="text-blood">.</span>Fit
              </span>
            </div>
            <p className="text-bone/60 max-w-md text-sm leading-relaxed mb-6">
              Plataforma de entrenamiento personal premium. Por Jose Mompó.
              Para hombres que quieren resultados sin perder tiempo.
            </p>
            {/* Iconos sociales · clickables */}
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de José Mompó"
                title="Instagram @mompo.fit"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-bone/60 hover:text-blood hover:border-blood transition"
              >
                <Instagram size={15} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Enviar email a José Mompó"
                title={EMAIL}
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-bone/60 hover:text-blood hover:border-blood transition"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-bone/40 mb-5">
              Navegación
            </div>
            <ul className="space-y-3">
              {[
                { label: 'Método', id: 'metodo' },
                { label: 'Sobre Jose', id: 'sobre' },
                { label: 'Casos', id: 'casos' },
                { label: 'Planes', id: 'planes' },
                { label: 'Opiniones', id: 'opiniones' },
              ].map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-sm text-bone/70 hover:text-bone transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto · solo email e Instagram */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-bone/40 mb-5">
              Contacto directo
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-bone/70 hover:text-blood transition group"
                >
                  <Mail size={13} className="opacity-60 group-hover:opacity-100" />
                  <span className="break-all">{EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-bone/70 hover:text-blood transition group"
                >
                  <Instagram size={13} className="opacity-60 group-hover:opacity-100" />
                  <span>@mompo.fit</span>
                </a>
              </li>
              <li className="text-bone/50 text-sm pt-1">Valencia, España</li>
              <li className="pt-3">
                <Link
                  href="/admin/login"
                  className="text-[10px] font-mono uppercase tracking-wider text-bone/40 hover:text-blood transition"
                >
                  Acceso admin →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mega logo */}
        <div className="py-12 md:py-16">
          <div className="font-display text-[14rem] md:text-[22vw] tracking-crush leading-[0.75] text-bone/[0.03] uppercase select-none">
            Mompó<span className="text-blood/20">.</span>Fit
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-white/10">
          <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
            © {new Date().getFullYear()} Mompó Fit · Todos los derechos reservados
          </div>
          <div className="flex gap-6 text-[10px] font-mono uppercase tracking-wider text-bone/40">
            <a href="#" className="hover:text-bone transition">Aviso legal</a>
            <a href="#" className="hover:text-bone transition">Privacidad</a>
            <a href="#" className="hover:text-bone transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
