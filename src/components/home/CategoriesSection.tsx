import React from 'react';
import { ArrowRight, Egg, Layers, Package, Sparkles, Utensils } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';

export const CategoriesSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory, categories } = useStore();

  const handleCategorySelect = (catName: ProductCategory) => {
    setSelectedCategory(catName);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (catName: string) => {
    switch (catName) {
      case 'Fresh Eggs':
        return <Egg className="w-5 h-5 text-amber-500" />;
      case 'Fresh Chicken':
        return <Utensils className="w-5 h-5 text-emerald-600" />;
      case 'Farm Supplies':
        return <Layers className="w-5 h-5 text-amber-600" />;
      case 'Premium Packs':
      default:
        return <Package className="w-5 h-5 text-emerald-700" />;
    }
  };

  const getButtonText = (catName: string) => {
    switch (catName) {
      case 'Fresh Eggs':
        return 'Shop Eggs';
      case 'Fresh Chicken':
        return 'Shop Chicken';
      case 'Farm Supplies':
        return 'Shop Supplies';
      case 'Premium Packs':
      default:
        return 'Explore Packs';
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FBFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Farm Direct Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
            Shop Our Farm Products
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Fresh, healthy and carefully selected products from our farm.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden bg-zinc-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-xs text-emerald-900 text-xs font-bold rounded-full shadow-sm flex items-center gap-1.5">
                  {getCategoryIcon(category.name)}
                  <span>{category.badge}</span>
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-emerald-950 font-display group-hover:text-emerald-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCategorySelect(category.name)}
                  className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-800 text-emerald-900 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>{getButtonText(category.name)}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
