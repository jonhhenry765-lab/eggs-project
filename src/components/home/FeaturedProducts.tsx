import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory } from '../../types';

export const FeaturedProducts: React.FC = () => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setIsCartOpen,
    setIsCheckoutOpen,
    setCurrentView,
    setSelectedCategory,
  } = useStore();

  const [activeTab, setActiveTab] = useState<ProductCategory | 'All'>('All');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filterTabs: (ProductCategory | 'All')[] = [
    'All',
    'Fresh Eggs',
    'Fresh Chicken',
    'Farm Supplies',
    'Premium Packs',
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  const getQuantity = (id: string) => quantities[id] || 1;

  const setQuantity = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));
  };

  const handleBuyNow = (product: Product) => {
    const qty = getQuantity(product.id);
    addToCart(product, qty);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-white" id="featured-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              Harvested Daily
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
              Our Freshest Products
            </h2>
            <p className="text-sm text-zinc-600 max-w-xl">
              From our bio-secure farm in Faisalabad to your family table. Guaranteed fresh, 100% Halal, and packaged with veterinary care.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/10'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            const qty = getQuantity(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-emerald-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                id={`product-card-${product.id}`}
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {product.badge && (
                        <span className="px-2.5 py-1 bg-amber-400 text-emerald-950 text-[11px] font-black rounded-lg shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      {product.discountPercentage && (
                        <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-md shadow-xs">
                          -{product.discountPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-xl z-10 transition-colors ${
                        inWishlist
                          ? 'bg-rose-50 text-rose-500 shadow-sm'
                          : 'bg-white/90 hover:bg-white text-zinc-400 hover:text-rose-500 shadow-sm'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
                    </button>

                    {/* Quick View Hover Button */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute inset-x-4 bottom-3 py-2 bg-white/95 backdrop-blur-xs text-emerald-950 text-xs font-bold rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 hover:bg-white"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        {product.category}
                      </span>
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-zinc-800">{product.rating}</span>
                        <span className="text-zinc-400 text-[11px]">({product.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-emerald-950 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                      {product.unit}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xl font-black text-emerald-950">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-zinc-400 line-through">
                          Rs. {product.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Quantity + Add to Cart + Buy Now */}
                <div className="px-5 pb-5 pt-2 border-t border-zinc-100 space-y-2.5">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase">Qty</span>
                    <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                      <button
                        onClick={() => setQuantity(product.id, qty - 1)}
                        className="px-2 py-1 text-zinc-600 hover:bg-zinc-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-zinc-800">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQuantity(product.id, qty + 1)}
                        className="px-2 py-1 text-zinc-600 hover:bg-zinc-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product, qty)}
                      className="py-2.5 px-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="py-2.5 px-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-950 fill-emerald-950" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to view full catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setCurrentView('shop');
              setSelectedCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-2xl text-sm font-bold border border-emerald-200 transition-all hover:shadow-md"
          >
            <span>Explore All Farm Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
