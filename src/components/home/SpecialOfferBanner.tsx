import React from 'react';
import { ArrowRight, Egg, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SpecialOfferBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  const handleShopNow = () => {
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FBFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white shadow-2xl border border-emerald-800">
          {/* Subtle background image overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1600&q=80"
              alt="Farm Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct Farm Wholesale Advantage</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Freshness Delivered <br className="hidden sm:inline" />
                To Your Door
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl leading-relaxed">
                Order directly from Alkhair Meta Eggs and enjoy quality poultry products without unnecessary middlemen. Sourced early morning, packed into sanitized trays, and delivered in refrigerated vans.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleShopNow}
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Egg className="w-4 h-4 fill-emerald-950 text-emerald-950" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-200 bg-white/10 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/10">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Free delivery on orders over Rs. 2,500</span>
                </div>
              </div>
            </div>

            {/* Right decorative visual badge */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center max-w-xs space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-lg font-black text-xl">
                  100%
                </div>
                <h4 className="text-lg font-bold text-white">Pure & Fresh Promise</h4>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Never frozen or preserved with chemicals. If any egg cracks in transit, we replace it instantly for free.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-1 text-xs text-amber-300 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Zero-Damage Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
