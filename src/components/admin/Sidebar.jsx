'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  ClipboardCheck,
  Apple,
  Dumbbell,
  Wallet,
  Inbox,
  Settings,
  LogOut,
  BarChart3,
  Star,
} from 'lucide-react';
import { logout, getSession } from '@/lib/auth';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutGrid, exact: true },
  { href: '/admin/visitas', label: 'Visitas', icon: BarChart3 },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/seguimientos', label: 'Seguimientos', icon: ClipboardCheck },
  { href: '/admin/nutricion', label: 'Nutrición', icon: Apple },
  { href: '/admin/entrenamiento', label: 'Entrenamiento', icon: Dumbbell },
  { href: '/admin/finanzas', label: 'Finanzas', icon: Wallet },
  { href: '/admin/solicitudes', label: 'Solicitudes', icon: Inbox },
  { href: '/admin/valoraciones', label: 'Valoraciones', icon: Star },
  { href: '/admin/ajustes', label: 'Ajustes', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const isActive = (href, exact) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-ink-950 border-r border-white/10 h-screen sticky top-0">
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-blood" />
          <span className="font-display text-lg tracking-tight text-bone uppercase">
            Mompó<span className="text-blood">.</span>Fit
          </span>
        </Link>
        <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-bone/40 mt-1.5 ml-4">
          Panel coach
        </div>
      </div>

      <div className="mx-3 mt-4 mb-2 p-3 border border-white/10 bg-ink-900 flex items-center gap-3">
        <div className="w-9 h-9 bg-blood flex items-center justify-center font-display text-sm tracking-tight text-bone uppercase">
          {session?.name?.split(' ').map((s) => s[0]).join('').slice(0, 2) || 'JM'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-display tracking-wide text-bone uppercase truncate">
            {session?.name || 'Jose Mompó'}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="status-dot bg-emerald-500" />
            <span className="text-[9px] font-mono uppercase tracking-wider text-bone/50">
              Online
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 transition group ${
                active
                  ? 'bg-blood/10 border-l-2 border-l-blood text-bone'
                  : 'border-l-2 border-l-transparent text-bone/50 hover:text-bone hover:bg-white/[0.03]'
              }`}
            >
              <Icon
                size={14}
                className={active ? 'text-blood' : 'text-bone/40 group-hover:text-bone/70'}
              />
              <span className="text-[11px] font-mono uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-bone/50 hover:text-blood hover:bg-blood/5 transition"
        >
          <LogOut size={14} />
          <span className="text-[11px] font-mono uppercase tracking-wider">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
