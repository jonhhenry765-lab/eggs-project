import React from 'react';
import {
  CheckCircle2,
  Egg,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Truck,
  Wheat,
} from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../../data/initialData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Egg':
        return <Egg className="w-6 h-6 text-emerald-700" />;
      case 'Wheat':
        return <Wheat className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-700" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-amber-600" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-emerald-700" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
            Our Farming Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
            Why Choose Alkhair Meta Eggs?
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            We operate with the conviction that ethical poultry farming, healthy bird nutrition, and spotless hygiene yield undeniably superior eggs and chicken for your family.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#FBFDFB] hover:bg-emerald-50/50 border border-emerald-100/80 shadow-xs hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-bold text-emerald-950 font-display group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-emerald-100/60 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Alkhair Quality Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
