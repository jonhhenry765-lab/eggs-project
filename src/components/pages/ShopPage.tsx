import React, { useState } from 'react';
import {
  ArrowUpDown,
  Check,
  Egg,
  Eye,
  Filter,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setIsCartOpen,
    setIsCheckoutOpen,
    getWhatsAppOrderUrl,
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(12000);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (id: string) => quantities[id] || 1;
  const setQuantity = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, val) }));
  };

  const handleBuyNow = (product: Product) => {
    const qty = getQuantity(product.id);
    addToCart(product, qty);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Filter & Sort Logic
  const filtered = products
    .filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStock = inStockOnly ? p.inStock : true;
      const matchPrice = p.price <= priceMax;
      return matchCat && matchSearch && matchStock && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default order
    });

  const allCategories: (ProductCategory | 'All')[] = [
    'All',
    'Fresh Eggs',
    'Fresh Chicken',
    'Farm Supplies',
    'Premium Packs',
  ];

  return (
    <div className="bg-[#FBFDFB] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <span>Home</span>
            <span>/</span>
            <span className="text-emerald-800 font-bold">Farm Shop</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-emerald-950 font-bold">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
            Farm-Fresh Egg & Poultry Shop
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl">
            Order premium grade eggs, wholesome country chicken, natural feeds, and family wholesale packs harvested early this morning.
          </p>
        </div>

        {/* Filters and Controls Bar */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fresh eggs, chicken, feeds..."
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
              />
            </div>

            {/* Sort Dropdown & Stock Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-xl">
                <input
                  type="checkbox"
                  id="stockToggle"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500"
                />
                <label htmlFor="stockToggle" className="cursor-pointer">
                  In Stock Only
                </label>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-zinc-50 border border-zinc-200 text-xs font-semibold rounded-xl px-3 py-2 text-zinc-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="featured">Featured / Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-6">
          <span>
            Showing <strong className="text-zinc-800">{filtered.length}</strong> farm product{filtered.length === 1 ? '' : 's'}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-emerald-700 font-bold hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200 p-8 space-y-3">
            <Egg className="w-12 h-12 text-zinc-300 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-800">No products match your criteria</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing the category and price filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="mt-2 px-5 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const qty = getQuantity(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-emerald-100/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-square overflow-hidden bg-zinc-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Badges */}
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

                      {/* Wishlist */}
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

                      {/* Quick View */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute inset-x-4 bottom-3 py-2 bg-white/95 backdrop-blur-xs text-emerald-950 text-xs font-bold rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 hover:bg-white"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                          {product.category}
                        </span>
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

                  {/* Card Controls */}
                  <div className="px-5 pb-5 pt-2 border-t border-zinc-100 space-y-2.5">
                    {/* Qty */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-zinc-500 uppercase">Quantity</span>
                      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                        <button
                          onClick={() => setQuantity(product.id, qty - 1)}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-zinc-800">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQuantity(product.id, qty + 1)}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Buttons */}
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

                    {/* WhatsApp link */}
                    <a
                      href={getWhatsAppOrderUrl(product, qty)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-1.5 text-center block text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                    >
                      Quick Order via WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
