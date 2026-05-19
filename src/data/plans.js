// =============================================================
// PLANES Y CASOS · Mompofit · José Mompó
// =============================================================

export const PLANS = [
  {
    id: 'trim-ent',
    name: 'Trimestral',
    duration: '3 meses',
    tagline: 'Entrenamiento y seguimiento',
    title: 'Trimestral entrenamiento y seguimiento',
    description:
      'Plan de entrenamiento personalizado durante 3 meses con seguimiento semanal de tu progreso. Para quien quiere empezar con base sólida.',
    features: [
      'Plan de entrenamiento mensual personalizado',
      'Seguimiento semanal de cargas y progreso',
      'Ajustes de rutina siempre que haga falta',
      'Acceso a plataforma personalizada con videoteca técnica',
      'Soporte WhatsApp 24/7 y reuniones en videollamada',
    ],
    cta: 'Solicitar información',
    featured: false,
  },
  {
    id: 'trim-full',
    name: 'Trimestral PRO',
    duration: '3 meses',
    tagline: 'Entrenamiento + nutrición + seguimiento',
    title: 'Trimestral entrenamiento, nutrición y seguimiento',
    description:
      'Programa completo de 3 meses con entrenamiento, plan nutricional ajustado a tus objetivos y seguimiento semanal cercano.',
    features: [
      'Plan de entrenamiento personalizado',
      'Pauta nutricional con macros ajustados',
      'Seguimiento semanal estructurado',
      'Ajustes de carga y nutrición cada semana',
      'Análisis de composición corporal mensual',
      'Llamada quincenal 1 a 1 (30 min)',
      'Revisión técnica en vídeo semanal',
      'Acceso a plataforma personalizada con videoteca técnica',
      'Soporte WhatsApp 24/7 y reuniones en videollamada',
    ],
    cta: 'Solicitar información',
    featured: true,
  },
  {
    id: 'sem-ent',
    name: 'Semestral',
    duration: '6 meses',
    tagline: 'Entrenamiento y seguimiento',
    title: 'Semestral entrenamiento y seguimiento',
    description:
      'Programa de 6 meses con entrenamiento personalizado y seguimiento continuo. Para resultados consolidados a medio plazo.',
    features: [
      'Plan de entrenamiento personalizado',
      'Periodización a 6 meses',
      'Seguimiento semanal',
      'Ajustes de rutina siempre que haga falta',
      'Acceso a plataforma personalizada con videoteca técnica',
      'Soporte WhatsApp 24/7 y reuniones en videollamada',
    ],
    cta: 'Solicitar información',
    featured: false,
  },
  {
    id: 'sem-full',
    name: 'Semestral PRO',
    duration: '6 meses',
    tagline: 'Entrenamiento + nutrición + seguimiento',
    title: 'Semestral entrenamiento, nutrición y seguimiento',
    description:
      'El programa más completo. 6 meses de acompañamiento total con entrenamiento, nutrición y seguimiento detallado para cambios profundos y duraderos.',
    features: [
      'Plan de entrenamiento personalizado',
      'Pauta nutricional con macros ajustados',
      'Seguimiento semanal estructurado',
      'Ajustes de carga y nutrición cada semana',
      'Análisis de composición corporal mensual',
      'Llamada quincenal 1 a 1 (30 min)',
      'Revisión técnica en vídeo semanal',
      'Acceso a plataforma personalizada con videoteca técnica',
      'Soporte WhatsApp 24/7 y reuniones en videollamada',
    ],
    cta: 'Solicitar información',
    featured: false,
  },
];

export const CASES = [
  {
    id: 'case-001',
    name: 'David M.',
    profession: 'Enfermero',
    duration: '20 semanas',
    weightLost: '11.3 kg',
    quote:
      'Paso mucho tiempo en el trabajo, con turnos rotativos, guardias largas y bastante estrés, así que siempre me costaba ser constante con la alimentación y el entrenamiento. Ahora que estoy con Jose todo ha ido a mejor. Puedo cumplir con todos los entrenamientos y las comidas sin añadir más estrés a mi día a día.',
    photoBefore: '/casos/case1-before.jpg',
    photoAfter: '/casos/case1-after.jpg',
    plan: 'Semestral PRO',
  },
  {
    id: 'case-002',
    name: 'David D.',
    profession: 'Militar',
    duration: '20 semanas',
    weightLost: 'Recomposición',
    quote:
      'Mi trabajo exige estar siempre en forma, pero llevaba tiempo estancado y sin mejorar. Jose me diseñó un plan estructurado que se adapta a mis horarios y exigencias físicas. Y desde el inicio empecé a notar mejoras.',
    photoBefore: '/casos/case2-before.jpg',
    photoAfter: '/casos/case2-after.jpg',
    plan: 'Trimestral PRO',
  },
  {
    id: 'case-003',
    name: 'Álvaro B.',
    profession: 'Manager de operaciones',
    duration: '24 semanas',
    weightLost: 'Definición avanzada',
    quote:
      'Mi agenda es apretada y no tengo tiempo para improvisar. Siempre intentaba hacer todo por mi cuenta, pero acababa siendo irregular y sin resultados. Empezar a trabajar con Jose me organizó todo de forma clara y adaptada a mi ritmo de vida. Ahora tengo un sistema que puedo seguir incluso en semanas complicadas. Lo que más destacaría es precisamente eso, la estructura y lo fácil que lo hace de aplicar. Encaja perfectamente con alguien que tiene poco tiempo pero quiere resultados reales.',
    photoBefore: '/casos/case3-before.jpg',
    photoAfter: '/casos/case3-after.jpg',
    plan: 'Semestral PRO',
  },
];

// =============================================================
// OPINIONES DE CLIENTES · Testimonios
// =============================================================

export const TESTIMONIALS = [
  {
    id: 't-001',
    name: 'David D.',
    rating: 5,
    date: '2026-04-20',
    plan: 'Trimestral PRO',
    text: 'Súper contento con Jose, un entrenador de 10, resultados increíbles.',
  },
];
