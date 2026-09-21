import React from 'react';
import { ArrowRight, CheckCircle, Egg, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const FarmStorySection: React.FC = () => {
  const { setCurrentView } = useStore();

  const handleLearnMore = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FBFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Farm Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80"
                alt="Alrehman Meta Farm Poultry Care"
                className="w-full h-[420px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />

              {/* Float Experience Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-100 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-400 text-emerald-950 font-black text-xl flex items-center justify-center shrink-0">
                    25+
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                      Years of Heritage
                    </h4>
                    <p className="text-xs text-zinc-600">
                      Pioneering modern biosecure poultry farming in Punjab.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Column: Story Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Egg className="w-3.5 h-3.5 text-amber-500" />
              <span>Our Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-display tracking-tight leading-tight">
              From Our Farm <br />
              <span className="text-emerald-700">To Your Family</span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
              Alrehman Meta Eggs is committed to providing fresh, reliable and quality poultry products to families and businesses. We combine responsible poultry farming, quality feed, hygiene and careful handling to bring better products to your table.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-700 leading-relaxed">
                  <strong className="text-emerald-950">100% Grain-Fed Birds:</strong> Our flocks thrive on a veterinarian-crafted diet of corn, soybean, and essential minerals—never synthetic hormones.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-700 leading-relaxed">
                  <strong className="text-emerald-950">Biosecurity Excellence:</strong> Enclosed, temperature-balanced housing shielding birds from wild environmental contamination and pathogens.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-700 leading-relaxed">
                  <strong className="text-emerald-950">Direct Delivery:</strong> Cut out supermarket storage delays. What is harvested today is on your kitchen table tomorrow.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-bold text-sm shadow-md transition-all group"
                id="btn-story-learn-more"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
