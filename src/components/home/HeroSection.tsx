import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Egg,
  Heart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory, products, addToCart, setQuickViewProduct } = useStore();

  const heroFeaturedProduct = products.find((p) => p.id === 'p-2') || products[0];

  const handleExploreFarm = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopNow = () => {
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-[#FBFDFB] pt-8 pb-16 lg:py-20">
      {/* Decorative organic background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subheading, CTAs & Trust Badges */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200/80 px-4 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-emerald-900 tracking-wide">
                Daily Harvest • Biosecure Punjab Farm
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-emerald-950 font-display leading-[1.1]">
              Fresh From Our Farm <br />
              <span className="text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-from-font underline-offset-8">
                Straight To Your Table
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl">
              Premium farm-fresh eggs, healthy chicken and trusted poultry products delivered with quality you can count on. Daily harvested under strict veterinary hygiene.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleShopNow}
                className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                id="hero-btn-shop-now"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 ml-1" />
              </button>

              <button
                onClick={handleExploreFarm}
                className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-emerald-200 shadow-sm transition-all hover:border-emerald-300"
                id="hero-btn-explore-farm"
              >
                <span>Explore Our Farm</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-emerald-100/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-emerald-950">
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Farm Fresh</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Quality Checked</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                  <PackageCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hygienically Packed</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visuals & Floating Farm Egg Card */}
          <div className="lg:col-span-5 relative">
            {/* Main Photography Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Alkhair Meta Eggs Farm Fresh Harvest"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />

              {/* In-photo Badge */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-400 text-emerald-950 font-black text-xs rounded-full">
                    ★ 4.9 / 5.0 Rating
                  </span>
                  <span className="text-xs text-emerald-100 font-medium">Over 50,000+ happy households</span>
                </div>
                <p className="text-sm font-semibold text-white/90">
                  Harvested this morning • Chilled express dispatch across Punjab
                </p>
              </div>
            </div>

            {/* Floating Live Product Card (Right Side) */}
            <div className="sm:absolute -bottom-8 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-emerald-100 max-w-xs mt-4 sm:mt-0 transition-all hover:shadow-2xl">
              <div className="flex items-start gap-3">
                <img
                  src={heroFeaturedProduct.images[0]}
                  alt={heroFeaturedProduct.name}
                  className="w-16 h-16 rounded-xl object-cover border border-emerald-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="font-bold text-zinc-800">4.9</span>
                    <span className="text-zinc-400 text-[10px]">(230 reviews)</span>
                  </div>
                  <h4 className="text-xs font-bold text-emerald-950 truncate mt-0.5">
                    {heroFeaturedProduct.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-sm font-black text-emerald-800">
                      Rs. {heroFeaturedProduct.price.toLocaleString()}
                    </span>
                    {heroFeaturedProduct.oldPrice && (
                      <span className="text-[10px] text-zinc-400 line-through">
                        Rs. {heroFeaturedProduct.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => addToCart(heroFeaturedProduct, 1)}
                  className="flex-1 py-1.5 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setQuickViewProduct(heroFeaturedProduct)}
                  className="py-1.5 px-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-semibold"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Small Top Floating Pill */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-emerald-900 text-white px-4 py-2.5 rounded-2xl shadow-lg border border-emerald-700 items-center gap-2">
              <Egg className="w-4 h-4 text-amber-300 fill-amber-300/40" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-amber-300">Guaranteed Fresh</p>
                <p className="text-xs font-extrabold text-white">24h Farm-to-Table</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
