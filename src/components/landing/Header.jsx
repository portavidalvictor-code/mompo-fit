'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV = [
  { id: 'metodo', label: 'Método' },
  { id: 'sobre', label: 'Sobre Jose' },
  { id: 'casos', label: 'Casos' },
  { id: 'planes', label: 'Planes' },
  { id: 'opiniones', label: 'Opiniones' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openApplyModal = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('open-plan-modal', { detail: { plan: '' } }));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ink-950/90 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-2 h-2 bg-blood group-hover:scale-125 transition" />
            <span className="font-display text-xl tracking-tight text-bone uppercase">
              Mompó<span className="text-blood">.</span>Fit
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[11px] font-mono uppercase tracking-wider text-bone/60 hover:text-bone transition"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openApplyModal}
              className="btn-blood !py-2.5 !px-5 !text-[10px]"
            >
              Aplicar
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-bone p-2"
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink-950 md:hidden pt-20">
          <div className="px-6 py-8 space-y-5">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left font-display text-3xl tracking-tight text-bone uppercase border-b border-white/10 pb-4 hover:text-blood transition"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-6 space-y-4">
              <button
                onClick={openApplyModal}
                className="btn-blood w-full"
              >
                Aplicar al programa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
