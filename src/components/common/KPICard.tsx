import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export function KPICard({ title, value, change, changeType = 'neutral', icon: Icon }: KPICardProps) {
  const changeColorMap = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-blue-600 bg-blue-50'
  };

  const iconBgMap = {
    positive: 'from-green-500 to-green-600',
    negative: 'from-red-500 to-red-600',
    neutral: 'from-blue-500 to-blue-600'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${iconBgMap[changeType]} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${changeColorMap[changeType]}`}>
            {changeType === 'positive' && <TrendingUp className="w-3.5 h-3.5" />}
            {changeType === 'negative' && <TrendingDown className="w-3.5 h-3.5" />}
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">{title}</p>
        <p className="text-4xl font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
