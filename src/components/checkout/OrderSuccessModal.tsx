import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Egg,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    lastPlacedOrder,
    setCurrentView,
    settings,
  } = useStore();

  useEffect(() => {
    if (isOrderSuccessOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#15803d', '#f59e0b', '#10b981', '#fef08a'],
        });
      } catch (err) {
        // Confetti fallback
      }
    }
  }, [isOrderSuccessOpen]);

  if (!isOrderSuccessOpen || !lastPlacedOrder) return null;

  const order = lastPlacedOrder;

  const handleContinueShopping = () => {
    setIsOrderSuccessOpen(false);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppTrackUrl = () => {
    const text = `Salam Alrehman Meta Eggs team!\n\nI just placed order *${order.orderNumber}* on your website.\n• Name: ${order.customerName}\n• Total: Rs. ${order.total.toLocaleString()}\n• City: ${order.city}\n• Payment: ${order.paymentMethod}\n\nPlease confirm order receipt and tracking updates. Thank you!`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden relative animate-in zoom-in-95 duration-200 my-8">
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 sm:p-8 text-center text-white relative">
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center mb-3 shadow-lg">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Confirmed & Queued
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Order Placed Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Thank you, <strong>{order.customerName}</strong>! Your farm-fresh harvest is being prepared.
          </p>
        </div>

        {/* Order Details & Receipt */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Order ID & Estimated Delivery Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Order Tracking ID
              </span>
              <p className="text-xl font-black text-emerald-900 font-mono mt-0.5">
                {order.orderNumber}
              </p>
              <span className="text-[10px] text-emerald-700">Status: {order.status}</span>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/70">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Estimated Delivery
              </span>
              <p className="text-sm font-bold text-amber-950 mt-0.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>{order.estimatedDelivery}</span>
              </p>
              <span className="text-[10px] text-amber-800">{order.deliverySlot}</span>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 text-xs space-y-2">
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider">Delivery Destination</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-700">
              <div>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Phone:</strong> {order.customerPhone}</p>
                <p><strong>Email:</strong> {order.customerEmail}</p>
              </div>
              <div>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>City:</strong> {order.city} ({order.postalCode})</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              </div>
            </div>
            {order.deliveryInstructions && (
              <p className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200">
                <strong>Instructions:</strong> {order.deliveryInstructions}
              </p>
            )}
          </div>

          {/* Itemized Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
              <span>Items in this Order ({order.items.length})</span>
            </h4>

            <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-2xl p-3 bg-white">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-zinc-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-zinc-900">{item.name}</p>
                      <p className="text-[10px] text-zinc-500">
                        {item.quantity} x Rs. {item.price.toLocaleString()} ({item.unit})
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-emerald-950">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between text-sm">
              <span className="font-bold text-emerald-950">Total Amount ({order.paymentMethod}):</span>
              <span className="text-xl font-black text-emerald-900">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <a
              href={getWhatsAppTrackUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Track Order & Inquire on WhatsApp</span>
            </a>

            <button
              onClick={handleContinueShopping}
              className="w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
