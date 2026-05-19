import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCard({
  label,
  value,
  sub,
  trend,
  trendType, // up | down | neutral
  icon: Icon,
  primary,
}) {
  const trendColor =
    trendType === 'up'
      ? 'text-emerald-400'
      : trendType === 'down'
      ? 'text-blood'
      : 'text-bone/40';

  return (
    <div
      className={`p-5 transition ${
        primary
          ? 'bg-blood text-bone border border-blood'
          : 'bg-ink-900 border border-white/10 hover:border-white/30'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={`text-[10px] font-mono uppercase tracking-wider ${
            primary ? 'text-bone/80' : 'text-bone/50'
          }`}
        >
          {label}
        </span>
        {Icon && <Icon size={14} className={primary ? 'text-bone/80' : 'text-blood'} />}
      </div>

      <div className="font-display text-3xl tracking-tight uppercase leading-none">
        {value}
        {sub && (
          <span className={`text-sm ml-2 ${primary ? 'text-bone/60' : 'text-bone/30'}`}>
            {sub}
          </span>
        )}
      </div>

      {trend && (
        <div className={`flex items-center gap-1.5 mt-3 text-[10px] font-mono uppercase tracking-wider ${
          primary ? 'text-bone/70' : trendColor
        }`}>
          {trendType === 'up' && <TrendingUp size={11} />}
          {trendType === 'down' && <TrendingDown size={11} />}
          {trend}
        </div>
      )}
    </div>
  );
}
