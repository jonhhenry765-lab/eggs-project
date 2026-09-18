import React, { useEffect, useState } from 'react';
import {
  Egg,
  Heart,
  Menu,
  PhoneCall,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User as UserIcon,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    total,
    wishlist,
    user,
    logout,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    setIsUserDashboardOpen,
    setIsAdminOpen,
    settings,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'shop' | 'about' | 'contact', category?: ProductCategory | 'All') => {
    setCurrentView(view);
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
              Farm Fresh
            </span>
            <span className="truncate">{settings.announcementText}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Order: {settings.displayPhone}</span>
            </a>
            <span className="text-emerald-700">|</span>
            <div className="flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Halal & Biosecure Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-emerald-100 py-2.5'
            : 'bg-white border-emerald-50 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.3),transparent_70%)]" />
              <Egg className="w-6 h-6 text-amber-300 fill-amber-300/20 transform -rotate-12" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-display flex items-center gap-1">
                Alkhair <span className="text-emerald-700">Meta Eggs</span>
              </span>
              <span className="block text-[11px] font-medium text-emerald-600/90 tracking-wide uppercase">
                Fresh From Farm • Pakistan
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-zinc-700 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
              id="nav-home"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'shop' && selectedCategory === 'All'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-zinc-700 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
              id="nav-shop"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Fresh Eggs')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'shop' && selectedCategory === 'Fresh Eggs'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-zinc-700 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
              id="nav-eggs"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Fresh Eggs
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Fresh Chicken')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'shop' && selectedCategory === 'Fresh Chicken'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-zinc-700 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
              id="nav-chicken"
            >
              Fresh Chicken
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Farm Supplies')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'shop' && selectedCategory === 'Farm Supplies'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-zinc-700 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
              id="nav-supplies"
            >
              Farm Supplies
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'about'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-zinc-700 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
              id="nav-about"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'contact'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-zinc-700 hover:text-emerald-800 hover:bg-zinc-50'
              }`}
              id="nav-contact"
            >
              Contact
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-zinc-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
              aria-label="Search products"
              id="btn-search-trigger"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => {
                if (wishlist.length === 0) {
                  handleNavClick('shop');
                } else if (user) {
                  setIsUserDashboardOpen(true);
                } else {
                  handleNavClick('shop');
                }
              }}
              className="p-2.5 rounded-xl text-zinc-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors relative"
              aria-label="Wishlist"
              id="btn-wishlist-trigger"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Icon / Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!user) {
                    setIsAuthOpen(true);
                  } else {
                    setUserDropdownOpen(!userDropdownOpen);
                  }
                }}
                className="p-2.5 rounded-xl text-zinc-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
                aria-label="User Account"
                id="btn-user-account"
              >
                <UserIcon className="w-5 h-5" />
                {user && (
                  <span className="hidden xl:inline text-xs font-semibold text-emerald-800 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              {user && userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-emerald-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-zinc-100">
                    <p className="text-xs text-zinc-400 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-zinc-900 truncate">{user.name}</p>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-100 text-emerald-800 mt-1">
                      {user.role === 'admin' ? 'Farm Administrator' : 'Verified Customer'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setIsUserDashboardOpen(true);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium flex items-center justify-between"
                  >
                    <span>My Dashboard & Orders</span>
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsAdminOpen(true);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 font-bold flex items-center justify-between"
                    >
                      <span>Admin Control Panel</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  )}

                  <div className="border-t border-zinc-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 px-3.5 py-2 rounded-xl transition-colors relative"
              id="btn-cart-trigger"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-emerald-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 text-emerald-950 rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-emerald-950">
                {cartCount > 0 ? `Rs. ${total.toLocaleString()}` : 'Cart'}
              </span>
            </button>

            {/* "Order Now" Quick CTA */}
            <button
              onClick={() => handleNavClick('shop')}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-emerald-900/15 hover:shadow-emerald-900/25 transition-all transform active:scale-95"
              id="btn-order-now"
            >
              <Egg className="w-4 h-4 text-amber-300" />
              <span>Order Now</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-100"
              aria-label="Toggle Menu"
              id="btn-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-emerald-100 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-100 rounded-xl text-sm font-semibold text-zinc-700"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (user) {
                    setIsUserDashboardOpen(true);
                  } else {
                    setIsAuthOpen(true);
                  }
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-50 rounded-xl text-sm font-semibold text-emerald-800"
              >
                <UserIcon className="w-4 h-4" />
                <span>{user ? 'My Account' : 'Login / Register'}</span>
              </button>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  currentView === 'home' ? 'bg-emerald-100/70 text-emerald-900' : 'text-zinc-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop', 'All')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  currentView === 'shop' && selectedCategory === 'All'
                    ? 'bg-emerald-100/70 text-emerald-900'
                    : 'text-zinc-700'
                }`}
              >
                Shop All Products
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Fresh Eggs')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-between ${
                  currentView === 'shop' && selectedCategory === 'Fresh Eggs'
                    ? 'bg-emerald-100/70 text-emerald-900'
                    : 'text-zinc-700'
                }`}
              >
                <span>Fresh Eggs</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  Daily Fresh
                </span>
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Fresh Chicken')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  currentView === 'shop' && selectedCategory === 'Fresh Chicken'
                    ? 'bg-emerald-100/70 text-emerald-900'
                    : 'text-zinc-700'
                }`}
              >
                Fresh Chicken (Halal)
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Farm Supplies')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  currentView === 'shop' && selectedCategory === 'Farm Supplies'
                    ? 'bg-emerald-100/70 text-emerald-900'
                    : 'text-zinc-700'
                }`}
              >
                Poultry Feed & Farm Supplies
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Premium Packs')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  currentView === 'shop' && selectedCategory === 'Premium Packs'
                    ? 'bg-emerald-100/70 text-emerald-900'
                    : 'text-zinc-700'
                }`}
              >
                Family & Wholesale Packs
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  currentView === 'about' ? 'bg-emerald-100/70 text-emerald-900' : 'text-zinc-700'
                }`}
              >
                About Our Farm
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  currentView === 'contact' ? 'bg-emerald-100/70 text-emerald-900' : 'text-zinc-700'
                }`}
              >
                Contact & Farm Location
              </button>
            </div>

            <div className="pt-3 border-t border-zinc-100">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Salam%20Alkhair%20Meta%20Eggs%20team,%20I%20would%20like%20to%20place%20an%20order.`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md"
              >
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
