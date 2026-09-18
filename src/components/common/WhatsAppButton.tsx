import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WhatsAppButton: React.FC = () => {
  const { settings, getWhatsAppOrderUrl, cart, cartCount, total } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-emerald-100 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 text-zinc-800">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-950">Farm Dispatch Online</span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-zinc-400 hover:text-zinc-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-600 my-2 leading-relaxed">
            Need quick assistance or want to order fresh farm eggs & chicken directly via WhatsApp?
          </p>

          {cartCount > 0 ? (
            <div className="bg-emerald-50 rounded-xl p-2.5 mb-3 border border-emerald-100">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{cartCount} item(s) in cart</span>
                </span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">
                Your cart items will be pre-filled automatically in WhatsApp!
              </p>
            </div>
          ) : null}

          <a
            href={getWhatsAppOrderUrl()}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all"
            onClick={() => setShowTooltip(false)}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({settings.displayPhone})</span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="relative group">
        <a
          href={getWhatsAppOrderUrl()}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-lg shadow-emerald-900/25 transition-all transform hover:scale-105 active:scale-95 group focus:outline-none"
          id="btn-floating-whatsapp"
          onMouseEnter={() => setShowTooltip(true)}
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 leading-none">
              Need Help?
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white leading-tight">
              Order on WhatsApp
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
