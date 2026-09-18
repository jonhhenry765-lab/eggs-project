import React from 'react';
import { Bird, ShieldCheck, Sparkles, Wheat } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '500K+',
      label: 'Happy Birds',
      subtitle: 'Free to roam in biosecure, climate-managed sheds',
      icon: <Bird className="w-7 h-7 text-emerald-700" />,
      accentBg: 'bg-emerald-100',
    },
    {
      value: '99%',
      label: 'Quality Feed',
      subtitle: 'Pure vegetarian grains, toasted soya & organic calcium',
      icon: <Wheat className="w-7 h-7 text-amber-600" />,
      accentBg: 'bg-amber-100',
    },
    {
      value: '24/7',
      label: 'Expert Care',
      subtitle: 'Full-time veterinary monitoring & preventive wellness',
      icon: <ShieldCheck className="w-7 h-7 text-emerald-700" />,
      accentBg: 'bg-emerald-100',
    },
    {
      value: '100%',
      label: 'Fresh & Hygienic',
      subtitle: 'Laser-candled, sanitized and delivered within 24–48h',
      icon: <Sparkles className="w-7 h-7 text-amber-600" />,
      accentBg: 'bg-amber-100',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-emerald-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FBFDFB] hover:bg-emerald-50/50 border border-emerald-100/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${stat.accentBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-emerald-900">{stat.label}</div>
                <div className="text-xs text-zinc-500 leading-relaxed">{stat.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
