// =============================================================
// AUTH MOCK · Sustituible por Supabase / NextAuth
// =============================================================

const STORAGE_KEY = 'mompo-fit-session';

const ADMIN = {
  email: 'admin@mompofit.com',
  password: 'admin123',
  name: 'Jose Mompó',
  role: 'coach',
};

export function login(email, password) {
  if (email === ADMIN.email && password === ADMIN.password) {
    const session = {
      email: ADMIN.email,
      name: ADMIN.name,
      role: ADMIN.role,
      loggedAt: new Date().toISOString(),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
    return { success: true, session };
  }
  return { success: false, error: 'Credenciales incorrectas' };
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getSession();
}

export const DEMO_CREDENTIALS = {
  email: ADMIN.email,
  password: ADMIN.password,
};
