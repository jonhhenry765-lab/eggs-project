import React from 'react';
import { Egg, Heart, ShieldCheck, Sparkles, Truck, Utensils, Wheat } from 'lucide-react';
import { PRODUCT_BENEFITS_DATA } from '../../data/initialData';

export const ProductBenefits: React.FC = () => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Egg':
        return <Egg className="w-6 h-6 text-amber-500 fill-amber-500/20" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-emerald-600" />;
      case 'Wheat':
        return <Wheat className="w-6 h-6 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-emerald-600" />;
      case 'Heart':
      default:
        return <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FBFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
            Taste The Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
            Freshness You Can Taste
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Real farm fresh eggs possess firm albumen, tall golden yolks, and superior nutritional density that you notice immediately.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_BENEFITS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-2xs hover:shadow-lg transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {getBenefitIcon(item.icon)}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-emerald-950 font-display group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {item.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
