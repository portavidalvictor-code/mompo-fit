'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { login, DEMO_CREDENTIALS } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 600);
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-ink-950">
      {/* Lado izquierdo · Branding */}
      <div className="relative hidden md:flex flex-col justify-between p-12 bg-ink-950 border-r border-white/10 overflow-hidden">
        <div className="absolute inset-0 diagonal-bg opacity-30" />
        <img
          src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/60 to-transparent" />

        {/* Top */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-2 h-2 bg-blood group-hover:scale-125 transition" />
            <span className="font-display text-xl tracking-tight text-bone uppercase">
              Mompó<span className="text-blood">.</span>Fit
            </span>
          </Link>
        </div>

        {/* Mid */}
        <div className="relative z-10">
          <div className="eyebrow">Panel del coach</div>
          <h2 className="font-display text-7xl tracking-crush leading-none text-bone uppercase">
            Sin<br />
            sobrecarga<br />
            progresiva,<br />
            <span className="text-blood">no hay cambio</span>.
          </h2>
        </div>

        {/* Bottom */}
        <div className="relative z-10 text-[10px] font-mono uppercase tracking-wider text-bone/40">
          Acceso restringido · Solo coach
        </div>
      </div>

      {/* Lado derecho · Form */}
      <div className="flex flex-col justify-center p-8 md:p-12">
        <div className="max-w-sm mx-auto w-full">
          {/* Logo móvil */}
          <Link href="/" className="md:hidden flex items-center gap-2.5 mb-12">
            <span className="w-2 h-2 bg-blood" />
            <span className="font-display text-xl tracking-tight text-bone uppercase">
              Mompó<span className="text-blood">.</span>Fit
            </span>
          </Link>

          <div className="eyebrow">Iniciar sesión</div>
          <h1 className="font-display text-5xl tracking-crush leading-none text-bone uppercase mb-3">
            Acceso<br />
            <span className="text-blood">coach</span>.
          </h1>
          <p className="text-bone/60 text-sm mb-10">
            Introduce tus credenciales para entrar al panel.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/60 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mompofit.com"
                className="w-full bg-white/5 border border-white/10 px-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-bone/60 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 pl-9 pr-3 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 border border-blood/30 bg-blood/10 text-blood text-xs">
                <AlertCircle size={13} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-blood w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : (
                <>Entrar al panel <ArrowRight size={14} /></>
              )}
            </button>
          </form>

          {/* Demo */}
          <div className="mt-10 p-4 border border-white/10 bg-ink-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
                Credenciales demo
              </span>
              <button
                onClick={fillDemo}
                className="text-[10px] font-mono uppercase tracking-wider text-blood hover:underline"
              >
                Auto-rellenar
              </button>
            </div>
            <div className="space-y-1 text-xs font-mono text-bone/60">
              <div>{DEMO_CREDENTIALS.email}</div>
              <div>{DEMO_CREDENTIALS.password}</div>
            </div>
          </div>

          <Link
            href="/"
            className="block mt-8 text-center text-[10px] font-mono uppercase tracking-wider text-bone/40 hover:text-bone transition"
          >
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
