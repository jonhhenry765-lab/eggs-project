import React from 'react';
import {
  CheckCircle2,
  Home,
  PackageCheck,
  Search,
  Stethoscope,
  Truck,
  Wheat,
} from 'lucide-react';
import { FARMING_PROCESS_STEPS } from '../../data/initialData';

export const FarmingProcess: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wheat':
        return <Wheat className="w-5 h-5 text-amber-500" />;
      case 'Home':
        return <Home className="w-5 h-5 text-emerald-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-amber-600" />;
      case 'SearchCheck':
        return <Search className="w-5 h-5 text-emerald-600" />;
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5 text-amber-500" />;
      case 'Truck':
      default:
        return <Truck className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-emerald-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
            Farm-To-Table Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
            Our 6-Step Farming Process
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            From formulating wholesome grains to shock-proof delivery, see how our standards guarantee freshness every morning.
          </p>
        </div>

        {/* Timeline with Desktop Connecting Line */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-300 -translate-y-6 z-0" />

          {/* Grid of 6 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {FARMING_PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#FBFDFB] hover:bg-white rounded-3xl p-6 border border-emerald-100/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1.5"
              >
                {/* Step Pill */}
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-3">
                  Step {step.step}
                </span>

                {/* Icon Bubble */}
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-emerald-100 group-hover:border-emerald-600 shadow-md flex items-center justify-center mb-4 transition-colors">
                  {getStepIcon(step.icon)}
                </div>

                <h3 className="text-base font-bold text-emerald-950 font-display group-hover:text-emerald-700 transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
