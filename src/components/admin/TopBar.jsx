'use client';

import { Search, Bell } from 'lucide-react';

export default function TopBar({ title, subtitle, action }) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="sticky top-0 z-30 bg-ink-950/95 backdrop-blur-md border-b border-white/10">
      <div className="px-6 py-5 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-bone/40 mb-1">
            {today}
          </div>
          <h1 className="font-display text-3xl md:text-4xl tracking-tight text-bone uppercase truncate">
            {title}
          </h1>
          {subtitle && (
            <div className="text-xs text-bone/50 mt-1.5">{subtitle}</div>
          )}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search */}
          <div className="hidden md:block relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-xs text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition w-48"
            />
          </div>
          {/* Bell */}
          <button className="relative w-9 h-9 border border-white/10 flex items-center justify-center text-bone/60 hover:text-blood hover:border-blood/40 transition">
            <Bell size={14} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blood rounded-full" />
          </button>
          {action}
        </div>
      </div>
    </header>
  );
}
