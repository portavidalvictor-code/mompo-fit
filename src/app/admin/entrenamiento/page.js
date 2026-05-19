'use client';

import { useState } from 'react';
import { Search, Play, ChevronRight, Dumbbell, RefreshCw, Plus } from 'lucide-react';
import TopBar from '@/components/admin/TopBar';
import { CLIENTS } from '@/data/clients';

const ROUTINES = {
  Definición: {
    name: 'Definición · 4 días',
    days: [
      {
        day: 'Lun',
        name: 'Empuje',
        exercises: [
          { name: 'Press banca', sets: 4, reps: '6-8', rest: '2-3 min', tech: 'Pausa controlada en pecho', loads: [80, 82, 85, 87] },
          { name: 'Press inclinado mancuernas', sets: 3, reps: '8-10', rest: '90 s', tech: 'Codos a 45°', loads: [28, 30, 32] },
          { name: 'Aperturas polea', sets: 3, reps: '12-15', rest: '60 s', tech: 'Foco en el pico', loads: [15, 16, 17] },
          { name: 'Press militar', sets: 4, reps: '6-8', rest: '2 min', tech: 'Sin balanceo', loads: [50, 52, 55, 55] },
          { name: 'Tríceps polea cuerda', sets: 3, reps: '12', rest: '60 s', tech: 'Abrir al final', loads: [20, 22, 25] },
        ],
      },
      {
        day: 'Mar',
        name: 'Tirón',
        exercises: [
          { name: 'Dominadas', sets: 4, reps: 'AMRAP', rest: '2 min', tech: 'Sin saltos', loads: ['BW', 'BW', '+5', '+5'] },
          { name: 'Remo barra', sets: 4, reps: '6-8', rest: '2 min', tech: '15° de inclinación', loads: [70, 72, 75, 75] },
          { name: 'Jalón pecho', sets: 3, reps: '10-12', rest: '90 s', tech: 'Codos abajo, no atrás', loads: [55, 60, 60] },
          { name: 'Curl barra', sets: 3, reps: '10', rest: '60 s', tech: 'Codos pegados', loads: [30, 32, 35] },
          { name: 'Curl martillo', sets: 3, reps: '12', rest: '60 s', tech: 'Sin balanceo', loads: [12, 14, 14] },
        ],
      },
      {
        day: 'Jue',
        name: 'Pierna · Quad',
        exercises: [
          { name: 'Sentadilla', sets: 5, reps: '5', rest: '3 min', tech: 'Profundidad completa', loads: [100, 105, 110, 110, 110] },
          { name: 'Prensa', sets: 4, reps: '8-10', rest: '2 min', tech: 'Sin bloquear', loads: [180, 200, 220, 240] },
          { name: 'Extensiones', sets: 3, reps: '15', rest: '60 s', tech: '2 s arriba', loads: [50, 55, 60] },
          { name: 'Gemelos pie', sets: 4, reps: '12', rest: '60 s', tech: 'Pausa arriba', loads: [80, 90, 100, 100] },
        ],
      },
      {
        day: 'Vie',
        name: 'Pierna · Posterior',
        exercises: [
          { name: 'Peso muerto rumano', sets: 4, reps: '6-8', rest: '2-3 min', tech: 'Espalda neutra', loads: [110, 115, 120, 120] },
          { name: 'Hip thrust', sets: 4, reps: '10', rest: '90 s', tech: 'Bloqueo arriba', loads: [100, 110, 120, 120] },
          { name: 'Femoral tumbado', sets: 3, reps: '12', rest: '60 s', tech: 'Lento al bajar', loads: [40, 45, 50] },
          { name: 'Abducciones', sets: 3, reps: '15', rest: '45 s', tech: 'Pausa al final', loads: [55, 60, 65] },
        ],
      },
    ],
  },
  Volumen: {
    name: 'Volumen · 5 días',
    days: [
      {
        day: 'Lun',
        name: 'Pecho + Tríceps',
        exercises: [
          { name: 'Press banca', sets: 5, reps: '5', rest: '3 min', tech: 'Foco fuerza', loads: [85, 90, 92, 92, 92] },
          { name: 'Press inclinado', sets: 4, reps: '8', rest: '2 min', tech: '45°', loads: [60, 65, 65, 65] },
          { name: 'Fondos lastrados', sets: 3, reps: '8-10', rest: '2 min', tech: 'Inclinarse al frente', loads: ['+15', '+20', '+20'] },
          { name: 'Press francés', sets: 3, reps: '10', rest: '90 s', tech: 'Codos fijos', loads: [30, 32, 32] },
          { name: 'Extensiones polea', sets: 3, reps: '15', rest: '60 s', tech: 'Foco contracción', loads: [25, 27, 27] },
        ],
      },
      {
        day: 'Mar',
        name: 'Espalda + Bíceps',
        exercises: [
          { name: 'Peso muerto', sets: 5, reps: '5', rest: '3 min', tech: 'Sin rebote', loads: [120, 130, 135, 135, 135] },
          { name: 'Dominadas lastradas', sets: 4, reps: '6-8', rest: '2 min', tech: 'Pecho a barra', loads: ['+10', '+15', '+15', '+15'] },
          { name: 'Remo Pendlay', sets: 4, reps: '6-8', rest: '2 min', tech: 'Explosivo', loads: [70, 75, 80, 80] },
          { name: 'Curl predicador', sets: 4, reps: '10', rest: '90 s', tech: 'No pasar 90°', loads: [25, 27, 30, 30] },
        ],
      },
      {
        day: 'Mié',
        name: 'Pierna · Quad',
        exercises: [
          { name: 'Sentadilla', sets: 5, reps: '5', rest: '3 min', tech: 'Cinturón', loads: [110, 115, 120, 120, 120] },
          { name: 'Prensa 45°', sets: 4, reps: '8', rest: '2 min', tech: 'Pies juntos', loads: [200, 220, 240, 240] },
          { name: 'Búlgaras', sets: 3, reps: '10/p', rest: '90 s', tech: 'Pie atrás elevado', loads: [20, 22, 22] },
          { name: 'Gemelos', sets: 5, reps: '12', rest: '60 s', tech: 'Pausa', loads: [100, 100, 110, 110, 110] },
        ],
      },
      {
        day: 'Jue',
        name: 'Hombro + Antebrazo',
        exercises: [
          { name: 'Press militar', sets: 5, reps: '5', rest: '3 min', tech: 'Glúteos apretados', loads: [55, 60, 62, 62, 62] },
          { name: 'Elevaciones laterales', sets: 4, reps: '12', rest: '60 s', tech: 'Codos altos', loads: [12, 14, 14, 14] },
          { name: 'Pájaro cara abajo', sets: 4, reps: '15', rest: '60 s', tech: 'Foco posterior', loads: [10, 12, 12, 12] },
          { name: 'Curl muñeca', sets: 3, reps: '15', rest: '45 s', tech: 'Rango completo', loads: [20, 22, 22] },
        ],
      },
      {
        day: 'Vie',
        name: 'Pierna · Posterior',
        exercises: [
          { name: 'Peso muerto rumano', sets: 5, reps: '6', rest: '3 min', tech: 'Tira de glúteos', loads: [110, 120, 125, 125, 125] },
          { name: 'Hip thrust', sets: 4, reps: '10', rest: '90 s', tech: 'Pausa arriba', loads: [110, 120, 130, 130] },
          { name: 'Femoral sentado', sets: 4, reps: '12', rest: '60 s', tech: '2 s al bajar', loads: [50, 55, 60, 60] },
        ],
      },
    ],
  },
  Mantenimiento: { name: 'Mantenimiento · 3 días', days: [] },
};

export default function TrainingPage() {
  const [selectedId, setSelectedId] = useState(CLIENTS[0]?.id);
  const client = CLIENTS.find((c) => c.id === selectedId);
  const [search, setSearch] = useState('');
  const [activeDay, setActiveDay] = useState(0);

  const routine = client ? ROUTINES[client.phase] || ROUTINES['Definición'] : null;
  const day = routine?.days?.[activeDay];

  const filtered = CLIENTS.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TopBar
        title="Entrenamiento"
        subtitle="Rutinas y progresiones por cliente"
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
                  onClick={() => {
                    setSelectedId(c.id);
                    setActiveDay(0);
                  }}
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
                      {c.phase}
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
          {!client || !routine ? (
            <div className="h-full flex items-center justify-center text-bone/40 text-sm">
              Selecciona un cliente.
            </div>
          ) : (
            <div className="px-6 py-8 md:px-10 space-y-7">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-6 border-b border-white/10">
                <div>
                  <div className="eyebrow">Plan de entrenamiento</div>
                  <h2 className="font-display text-4xl md:text-5xl tracking-crush text-bone uppercase">
                    {client.name}
                  </h2>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-bone/60 mt-2">
                    {routine.name}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-ghost !py-2.5 !px-4 !text-[10px]">
                    <RefreshCw size={11} /> Cambiar plantilla
                  </button>
                  <button className="btn-blood !py-2.5 !px-4 !text-[10px]">
                    <Plus size={11} /> Nueva sesión
                  </button>
                </div>
              </div>

              {/* Tabs días */}
              {routine.days.length > 0 && (
                <>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {routine.days.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveDay(i)}
                        className={`flex-shrink-0 px-5 py-3 border transition text-left min-w-[140px] ${
                          activeDay === i
                            ? 'bg-blood text-bone border-blood'
                            : 'bg-ink-900 text-bone/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                          {d.day}
                        </div>
                        <div className="font-display text-base tracking-tight uppercase mt-0.5">
                          {d.name}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Tabla ejercicios */}
                  <div className="bg-ink-900 border border-white/10 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell size={14} className="text-blood" />
                        <span className="font-display text-lg tracking-tight text-bone uppercase">
                          {day.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-bone/40">
                        {day.exercises.length} ejercicios
                      </span>
                    </div>

                    <div className="hidden md:grid grid-cols-[2fr_70px_90px_80px_2fr_100px_30px] gap-3 px-6 py-3 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-bone/40">
                      <span>Ejercicio</span>
                      <span>Series</span>
                      <span>Reps</span>
                      <span>Descanso</span>
                      <span>Técnica</span>
                      <span>Progresión</span>
                      <span></span>
                    </div>

                    {day.exercises.map((ex, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-[2fr_70px_90px_80px_2fr_100px_30px] gap-3 px-6 py-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition"
                      >
                        <div>
                          <div className="font-display text-base tracking-wide text-bone uppercase">
                            {ex.name}
                          </div>
                        </div>
                        <div className="text-sm text-bone/80">{ex.sets}</div>
                        <div className="text-sm text-bone/80">{ex.reps}</div>
                        <div className="text-sm text-bone/80">{ex.rest}</div>
                        <div className="text-xs text-bone/60 italic">{ex.tech}</div>
                        <div className="flex items-end gap-0.5 h-8">
                          {ex.loads.map((l, idx) => {
                            const max = Math.max(
                              ...ex.loads.map((x) =>
                                typeof x === 'string' ? parseInt(x.replace(/\D/g, '')) || 5 : x
                              )
                            );
                            const val = typeof l === 'string' ? parseInt(l.replace(/\D/g, '')) || 5 : l;
                            const h = (val / max) * 100;
                            return (
                              <div
                                key={idx}
                                className="flex-1 bg-blood/40 hover:bg-blood transition"
                                style={{ height: `${h}%` }}
                                title={String(l)}
                              />
                            );
                          })}
                        </div>
                        <button className="text-bone/30 hover:text-blood transition">
                          <Play size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Notas */}
                  <div className="bg-ink-900 border border-white/10 p-6">
                    <div className="eyebrow mb-3">Notas para esta sesión</div>
                    <p className="text-sm text-bone/80 leading-relaxed">
                      Calentamiento general 5-8 minutos · 1-2 series específicas antes de los pesados.
                      Si el RPE de la primera serie pesada está por debajo de 7, sube la siguiente. Si está en 9-10,
                      mantén o baja un 2.5%. Apunta cargas en la app después de cada sesión.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
