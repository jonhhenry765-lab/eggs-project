import React, { useState } from 'react';
import {
  CheckCircle,
  Egg,
  Heart,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setIsAuthOpen, user, setIsUserDashboardOpen, quickAdminLogin, settings, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) {
      addToast('Invalid Email', 'Please provide a valid email address.', 'error');
      return;
    }
    setNewsletterSuccess(true);
    addToast('Subscribed!', 'Thank you for subscribing to Alrehman Farm fresh updates.');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-850 rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
                Fresh Harvest Alerts
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Get Weekly Farm Fresh Discounts
              </h3>
              <p className="text-sm text-emerald-200/90 max-w-xl">
                Subscribe to receive weekly batch notifications, early bird wholesale trays, and direct delivery offers straight from our farm.
              </p>
            </div>
            <div className="md:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-emerald-950/80 border border-emerald-700/80 text-white placeholder-emerald-400/70 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
              {newsletterSuccess && (
                <p className="text-xs text-amber-300 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Subscribed successfully!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-900/60">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-emerald-950 shadow-md">
                <Egg className="w-6 h-6 fill-emerald-950 text-emerald-950" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white font-display">
                  Alrehman <span className="text-amber-400">Meta Eggs</span>
                </span>
                <span className="block text-[11px] font-medium text-emerald-300 uppercase tracking-wider">
                  Farm Fresh • Punjab, Pakistan
                </span>
              </div>
            </div>

            <p className="text-sm text-emerald-200/80 leading-relaxed">
              Fresh poultry products from our farm to your family. We are committed to wholesome, antibiotic-free poultry farming with quality feed, strict hygiene, and reliable doorstep delivery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-800 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Halal Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-800 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Zero Hormones</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 text-emerald-200 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 text-emerald-200 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 text-emerald-200 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/80 hover:bg-emerald-600 hover:text-white text-emerald-200 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">Quick Links</h4>
            <ul className="space-y-2 text-sm text-emerald-200/90">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    setSelectedCategory('All');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    setSelectedCategory('Fresh Eggs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Fresh Farm Eggs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    setSelectedCategory('Fresh Chicken');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Quality Chicken
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Our Farm Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Contact & Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">Customer Care</h4>
            <ul className="space-y-2 text-sm text-emerald-200/90">
              <li>
                <button
                  onClick={() => {
                    if (user) {
                      setIsUserDashboardOpen(true);
                    } else {
                      setIsAuthOpen(true);
                    }
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  My Customer Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (user) {
                      setIsUserDashboardOpen(true);
                    } else {
                      setIsAuthOpen(true);
                    }
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Track Recent Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Shipping & Delivery Zones
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Zero-Damage Egg Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={quickAdminLogin}
                  className="text-amber-400/80 hover:text-amber-300 transition-colors text-xs font-semibold flex items-center gap-1 pt-1"
                >
                  <span>Admin Portal Access</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">Contact Farm Office</h4>
            <ul className="space-y-3 text-sm text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{settings.address}, {settings.city}, {settings.province}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white font-medium">
                  {settings.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </li>
              <li className="text-xs text-emerald-400/90 pt-1 border-t border-emerald-900/60">
                <strong>Farm Operating Hours:</strong>
                <p className="mt-0.5">{settings.businessHours}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>© 2026 Alrehman Meta Eggs. All Rights Reserved. Fresh From Our Farm, Trusted By Your Family.</p>
          <div className="flex items-center gap-1 text-emerald-300">
            <span>Crafted with pride in</span>
            <span className="text-white font-bold">Pakistan 🇵🇰</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
