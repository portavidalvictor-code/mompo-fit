'use client';

import { useState } from 'react';
import { Search, Apple, Clock, AlertTriangle, RefreshCw, ChevronRight } from 'lucide-react';
import TopBar from '@/components/admin/TopBar';
import { CLIENTS } from '@/data/clients';

const MEAL_PLAN = (macros) => [
  {
    time: '08:00',
    name: 'Desayuno',
    items: [
      `${Math.round(macros.protein * 0.25)}g proteína (huevos enteros + claras)`,
      `${Math.round(macros.carbs * 0.30)}g carbohidratos (avena con frutos rojos)`,
      `Café solo o con leche desnatada`,
    ],
    kcal: Math.round(macros.kcal * 0.25),
  },
  {
    time: '11:30',
    name: 'Media mañana',
    items: [
      `${Math.round(macros.protein * 0.15)}g proteína (yogur griego 0%)`,
      `Fruta entera (manzana o plátano)`,
      `Frutos secos · 20g`,
    ],
    kcal: Math.round(macros.kcal * 0.15),
  },
  {
    time: '14:30',
    name: 'Comida',
    items: [
      `${Math.round(macros.protein * 0.30)}g proteína (pollo, ternera o pescado)`,
      `${Math.round(macros.carbs * 0.40)}g carbohidratos (arroz, pasta o patata)`,
      `Verduras a discreción · aceite de oliva 1 cucharada`,
    ],
    kcal: Math.round(macros.kcal * 0.30),
  },
  {
    time: '18:00',
    name: 'Pre-entreno',
    items: [
      `${Math.round(macros.carbs * 0.15)}g carbohidratos rápidos (plátano o gel)`,
      `Café o pre-entreno opcional`,
    ],
    kcal: Math.round(macros.kcal * 0.10),
  },
  {
    time: '21:00',
    name: 'Cena',
    items: [
      `${Math.round(macros.protein * 0.30)}g proteína (pescado blanco o tortilla)`,
      `${Math.round(macros.carbs * 0.15)}g carbohidratos (boniato o pan integral)`,
      `Verduras + aguacate o aceite oliva`,
    ],
    kcal: Math.round(macros.kcal * 0.20),
  },
];

const AVOID = ['Alcohol entre semana', 'Bollería industrial', 'Refrescos azucarados', 'Frituras profundas'];

export default function NutritionPage() {
  const [selectedId, setSelectedId] = useState(CLIENTS[0]?.id);
  const client = CLIENTS.find((c) => c.id === selectedId);
  const [search, setSearch] = useState('');

  const meals = client ? MEAL_PLAN(client.macros) : [];
  const filtered = CLIENTS.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TopBar
        title="Nutrición"
        subtitle="Planes de alimentación por cliente"
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr] min-h-0">
        {/* Lista clientes */}
        <aside className="border-r border-white/10 bg-ink-950 flex flex-col min-h-0">
          <div className="p-5 border-b border-white/10">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cliente..."
                className="w-full bg-white/5 border border-white/10 pl-9 pr-3 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-blood/60 transition"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((c) => {
              const isActive = client?.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left px-5 py-4 border-b border-white/5 transition flex items-center gap-3 group ${
                    isActive ? 'bg-blood/10 border-l-2 border-l-blood' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <img src={c.photoUrl} alt="" className="w-9 h-9 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm tracking-wide text-bone uppercase truncate">
                      {c.name}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40 mt-0.5">
                      {c.phase} · {c.macros.kcal} kcal
                    </div>
                  </div>
                  <ChevronRight
                    size={13}
                    className={`flex-shrink-0 ${isActive ? 'text-blood' : 'text-bone/30 group-hover:text-bone'}`}
                  />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Detalle */}
        <section className="flex-1 overflow-y-auto">
          {!client ? (
            <div className="h-full flex items-center justify-center text-bone/40 text-sm">
              Selecciona un cliente.
            </div>
          ) : (
            <div className="px-6 py-8 md:px-10 space-y-7">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-6 border-b border-white/10">
                <div>
                  <div className="eyebrow">Plan nutricional · {client.phase}</div>
                  <h2 className="font-display text-4xl md:text-5xl tracking-crush text-bone uppercase">
                    {client.name}
                  </h2>
                </div>
                <button className="btn-ghost !py-2.5 !px-4 !text-[10px]">
                  <RefreshCw size={11} /> Ajustar plan
                </button>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MacroPill
                  label="Calorías"
                  value={client.macros.kcal}
                  unit="kcal"
                  color="blood"
                />
                <MacroPill
                  label="Proteína"
                  value={client.macros.protein}
                  unit="g"
                  color="bone"
                />
                <MacroPill
                  label="Carbohidratos"
                  value={client.macros.carbs}
                  unit="g"
                  color="amber"
                />
                <MacroPill
                  label="Grasas"
                  value={client.macros.fat}
                  unit="g"
                  color="emerald"
                />
              </div>

              {/* Plan de comidas */}
              <div>
                <div className="eyebrow mb-4">Distribución diaria</div>
                <div className="space-y-3">
                  {meals.map((m, i) => (
                    <div
                      key={i}
                      className="bg-ink-900 border border-white/10 p-5 grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 items-start"
                    >
                      <div className="flex items-center gap-2 text-blood">
                        <Clock size={12} />
                        <span className="text-[11px] font-mono uppercase tracking-wider">
                          {m.time}
                        </span>
                      </div>
                      <div>
                        <div className="font-display text-xl tracking-tight text-bone uppercase mb-2">
                          {m.name}
                        </div>
                        <ul className="space-y-1 text-sm text-bone/70">
                          {m.items.map((it, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blood mt-1.5">·</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl tracking-tight text-bone">
                          {m.kcal}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
                          kcal
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reglas adicionales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-ink-900 border border-white/10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={14} className="text-blood" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-bone/60">
                      Evitar
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {AVOID.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-bone/80">
                        <span className="text-blood">×</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-ink-900 border border-white/10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Apple size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-bone/60">
                      Recomendaciones
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-bone/80">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Bebe 3 litros de agua/día</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Prioriza alimentos enteros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Una comida libre por semana, no abusar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Suplementos: creatina 5g, multivitamínico, omega-3</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function MacroPill({ label, value, unit, color }) {
  const colorMap = {
    blood: 'border-blood/40 bg-blood/5 text-blood',
    bone: 'border-bone/30 bg-bone/5 text-bone',
    amber: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
    emerald: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
  };
  return (
    <div className={`p-5 border ${colorMap[color]}`}>
      <div className="text-[10px] font-mono uppercase tracking-wider opacity-70 mb-1.5">
        {label}
      </div>
      <div className="font-display text-3xl tracking-tight">
        {value}
        <span className="text-sm opacity-60 ml-1">{unit}</span>
      </div>
    </div>
  );
}
