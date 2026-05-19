import { CLIENTS, FOLLOWUPS, REQUESTS } from './clients';

// =============================================================
// MÉTRICAS DERIVADAS · Calculadas desde los datos mock
// =============================================================

export function getMetrics() {
  const activeClients = CLIENTS.filter((c) => c.status === 'Activo');
  const monthlyRevenue = activeClients.reduce((acc, c) => acc + c.planPrice, 0);
  const newRequests = REQUESTS.filter((r) => r.status === 'Nueva').length;
  const pendingFollowUps = FOLLOWUPS.filter((f) => f.status !== 'Revisado').length;
  const cutting = activeClients.filter((c) => c.phase === 'Definición').length;
  const bulking = activeClients.filter((c) => c.phase === 'Volumen').length;
  const retentionRate = 0;
  const yearProjection = monthlyRevenue * 12;

  return {
    activeClients: activeClients.length,
    monthlyRevenue,
    newRequests,
    pendingFollowUps,
    cutting,
    bulking,
    retentionRate,
    yearProjection,
  };
}

// Datos de facturación mensual (últimos 12 meses) — vacíos hasta que haya clientes
export const REVENUE_MONTHLY = [
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
  { month: 'Jul', revenue: 0 },
  { month: 'Ago', revenue: 0 },
  { month: 'Sep', revenue: 0 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 0 },
  { month: 'Dic', revenue: 0 },
  { month: 'Ene', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Abr', revenue: 0 },
];

// Distribución de ingresos por plan
export function getRevenueByPlan() {
  const map = { Esencial: 0, Atlético: 0, Premium: 0 };
  CLIENTS.filter((c) => c.status === 'Activo').forEach((c) => {
    if (map[c.plan] !== undefined) map[c.plan] += c.planPrice;
  });
  return [
    { plan: 'Esencial', revenue: map['Esencial'], color: '#6b7280' },
    { plan: 'Atlético', revenue: map['Atlético'], color: '#0B5D3B' },
    { plan: 'Premium', revenue: map['Premium'], color: '#F5F2EE' },
  ];
}
