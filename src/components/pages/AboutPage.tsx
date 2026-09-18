import React from 'react';
import {
  ArrowRight,
  Bird,
  CheckCircle2,
  Egg,
  Heart,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  Wheat,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setCurrentView, getWhatsAppOrderUrl, settings } = useStore();

  return (
    <div className="bg-[#FBFDFB] min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Egg className="w-3.5 h-3.5 text-amber-500" />
            <span>Pure Pakistani Poultry Heritage</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 font-display tracking-tight leading-tight">
            Nurturing Healthy Flocks, Delivering Honest Freshness
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Founded with a commitment to bring clean, biosecure, and veterinarian-inspected poultry products to Pakistani tables.
          </p>
        </div>

        {/* Story Section: Photography + Narrative */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80"
                alt="Alkhair Farm Flocks"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-900 text-white p-6 rounded-3xl shadow-xl max-w-xs border border-emerald-700 hidden sm:block">
              <p className="text-2xl font-black text-amber-300 font-display">100% Halal</p>
              <p className="text-xs text-emerald-100 mt-1">
                Raised strictly according to ethical Islamic dietary laws and humane animal handling.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-3xl font-black text-emerald-950 font-display">
              Why We Started Alkhair Meta Eggs
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              For decades, households across Pakistan have suffered from eggs stored in sweltering open-air godowns for weeks before reaching grocery shelves. Fragile albumen, degraded yolk nutrients, and cracked shells were accepted as unavoidable.
            </p>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              <strong>Alkhair Meta Eggs</strong> was founded to break this outdated supply chain. By pairing environmentally managed poultry housing with direct-to-door temperature-protected logistics, we harvest eggs each morning and bring them straight to your kitchen within 24 to 48 hours.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-emerald-100">
                <p className="text-2xl font-black text-emerald-950 font-display">500,000+</p>
                <p className="text-xs text-zinc-500 font-medium">Birds cared for daily</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-emerald-100">
                <p className="text-2xl font-black text-emerald-950 font-display">50,000+</p>
                <p className="text-xs text-zinc-500 font-medium">Pakistani families served</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Farm Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-emerald-950 font-display">
              Our 4 Pillars of Excellence
            </h2>
            <p className="text-sm text-zinc-600">
              Every egg and cut of chicken reflects these uncompromising principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Wheat className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">Pure Vegetable Feed</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Zero recycled animal bone-meal or chemical growth hormones. Our birds eat clean corn, toasted soybean meal, and organic trace minerals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">Strict Biosecurity</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Disinfection showers, sealed tunnel-ventilated sheds, and filtered water systems protect our flocks from migratory wild bird diseases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">Laser Candling Check</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Every egg passes beneath candling illumination to verify shell integrity, yolk centralization, and zero hairline cracks before carton packing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">Humane Bird Welfare</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Clean fresh water, spacious climate-moderated roosting zones, and stress-free lighting produce birds that live happily and lay naturally.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-xl">
          <h2 className="text-3xl font-black font-display">Taste the Farm Fresh Advantage</h2>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto">
            Experience what eggs truly taste like when they arrive at your breakfast table within hours of being laid.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-2xl text-sm shadow-md transition-all"
            >
              Explore Farm Products
            </button>
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-sm border border-white/20 transition-all"
            >
              Inquire on WhatsApp ({settings.displayPhone})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
