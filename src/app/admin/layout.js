'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import AuthGuard from '@/components/admin/AuthGuard';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-ink-950 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">{children}</div>
      </div>
    </AuthGuard>
  );
}
