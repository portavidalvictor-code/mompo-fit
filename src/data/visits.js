// =============================================================
// VISITS DATA · Empiezan en 0
// Cuando se active Vercel Analytics, se conectará aquí
// =============================================================

// Visitas últimos 30 días
export const VISITS_30D = [
  { date: '01', visits: 0, unique: 0 },
  { date: '02', visits: 0, unique: 0 },
  { date: '03', visits: 0, unique: 0 },
  { date: '04', visits: 0, unique: 0 },
  { date: '05', visits: 0, unique: 0 },
  { date: '06', visits: 0, unique: 0 },
  { date: '07', visits: 0, unique: 0 },
  { date: '08', visits: 0, unique: 0 },
  { date: '09', visits: 0, unique: 0 },
  { date: '10', visits: 0, unique: 0 },
  { date: '11', visits: 0, unique: 0 },
  { date: '12', visits: 0, unique: 0 },
  { date: '13', visits: 0, unique: 0 },
  { date: '14', visits: 0, unique: 0 },
  { date: '15', visits: 0, unique: 0 },
  { date: '16', visits: 0, unique: 0 },
  { date: '17', visits: 0, unique: 0 },
  { date: '18', visits: 0, unique: 0 },
  { date: '19', visits: 0, unique: 0 },
  { date: '20', visits: 0, unique: 0 },
  { date: '21', visits: 0, unique: 0 },
  { date: '22', visits: 0, unique: 0 },
  { date: '23', visits: 0, unique: 0 },
  { date: '24', visits: 0, unique: 0 },
  { date: '25', visits: 0, unique: 0 },
  { date: '26', visits: 0, unique: 0 },
  { date: '27', visits: 0, unique: 0 },
  { date: '28', visits: 0, unique: 0 },
  { date: '29', visits: 0, unique: 0 },
  { date: '30', visits: 0, unique: 0 },
];

// Páginas más visitadas
export const TOP_PAGES = [
  { path: '/', label: 'Inicio', visits: 0 },
  { path: '/#planes', label: 'Planes', visits: 0 },
  { path: '/#casos', label: 'Casos', visits: 0 },
  { path: '/#sobre', label: 'Sobre Jose', visits: 0 },
  { path: '/#opiniones', label: 'Opiniones', visits: 0 },
];

// Fuentes de tráfico
export const TRAFFIC_SOURCES = [
  { source: 'Directo', visits: 0, color: '#0B5D3B' },
  { source: 'Instagram', visits: 0, color: '#F5F2EE' },
  { source: 'Google', visits: 0, color: '#6b7280' },
  { source: 'Otros', visits: 0, color: '#374151' },
];

// Métricas globales
export const VISITS_METRICS = {
  totalVisits: 0,
  uniqueVisitors: 0,
  avgDuration: '0:00',
  bounceRate: 0,
  conversions: 0,
  conversionRate: 0,
};

// Función de compatibilidad con el código que usa getVisitMetrics
export function getVisitMetrics() {
  return VISITS_METRICS;
}
