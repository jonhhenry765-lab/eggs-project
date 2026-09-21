import React, { useState } from 'react';
import {
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  Egg,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  User,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    settings,
    placeOrder,
    user,
    addToast,
  } = useStore();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.addresses?.[0]?.address || '');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Lahore');
  const [postalCode, setPostalCode] = useState('54000');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Morning (8:00 AM - 12:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const popularCities = ['Lahore', 'Faisalabad', 'Islamabad', 'Rawalpindi', 'Karachi', 'Multan', 'Sialkot', 'Gujranwala'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      addToast('Missing Details', 'Please fill in your name, phone, address and city.', 'error');
      return;
    }

    if (cart.length === 0) {
      addToast('Cart is empty', 'Add products to cart before checking out.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        customerName: fullName.trim(),
        customerEmail: email.trim() || 'customer@alrehmanmetaeggs.pro',
        customerPhone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        deliveryInstructions: deliveryInstructions.trim(),
        deliverySlot,
        paymentMethod,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-emerald-100 overflow-hidden relative animate-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-emerald-100 flex items-center justify-between bg-[#FBFDFB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center">
              <Egg className="w-5 h-5 fill-amber-300/30" />
            </div>
            <div>
              <h2 className="text-xl font-black text-emerald-950 font-display">
                Complete Your Farm Order
              </h2>
              <p className="text-xs text-zinc-500">
                Fresh direct harvest delivery across Punjab & Pakistan
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Customer Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <User className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950">
                1. Customer & Contact Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Tariq"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Phone Number (WhatsApp preferred) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Email Address (for order receipts & tracking)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address & Schedule */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950">
                2. Doorstep Delivery Address
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Select City <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {popularCities.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCity(c)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      city === c
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City Name"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Complete Street Address (House/Shop #, Street, Colony/Sector) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House 14-B, Street 3, Phase 5..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="54000"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Preferred Delivery Slot
                </label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                >
                  <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 5:00 PM)">Afternoon (12:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="e.g. Ring bell, leave with security"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <Banknote className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950">
                3. Payment Method
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: COD */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-emerald-700 bg-emerald-50/70 shadow-sm'
                    : 'border-zinc-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-5 h-5 text-emerald-700" />
                  {paymentMethod === 'Cash on Delivery' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  )}
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-950">
                    Cash on Delivery
                  </span>
                  <span className="text-[11px] text-zinc-500 leading-tight">
                    Pay driver in cash upon doorstep arrival
                  </span>
                </div>
              </button>

              {/* Option 2: Bank Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  paymentMethod === 'Bank Transfer'
                    ? 'border-emerald-700 bg-emerald-50/70 shadow-sm'
                    : 'border-zinc-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  {paymentMethod === 'Bank Transfer' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  )}
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-950">
                    Direct Bank Transfer
                  </span>
                  <span className="text-[11px] text-zinc-500 leading-tight">
                    Meezan Bank online transfer
                  </span>
                </div>
              </button>

              {/* Option 3: Mobile Wallet */}
              <button
                type="button"
                onClick={() => setPaymentMethod('EasyPaisa / JazzCash')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  paymentMethod === 'EasyPaisa / JazzCash'
                    ? 'border-emerald-700 bg-emerald-50/70 shadow-sm'
                    : 'border-zinc-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  {paymentMethod === 'EasyPaisa / JazzCash' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  )}
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-950">
                    EasyPaisa / JazzCash
                  </span>
                  <span className="text-[11px] text-zinc-500 leading-tight">
                    Direct mobile wallet transfer
                  </span>
                </div>
              </button>
            </div>

            {/* Bank Transfer Details Drawer */}
            {paymentMethod === 'Bank Transfer' && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5 text-amber-950 animate-in fade-in duration-200">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Alrehman Official Bank Account Details:</span>
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div>Bank: <strong>{settings.bankName}</strong></div>
                  <div>Title: <strong>{settings.accountTitle}</strong></div>
                  <div>Account: <strong>{settings.accountNumber}</strong></div>
                  <div>IBAN: <strong>{settings.iban}</strong></div>
                </div>
                <p className="text-[10px] text-amber-800 pt-1">
                  * Please share transaction receipt screenshot on our WhatsApp ({settings.displayPhone}) after placing the order.
                </p>
              </div>
            )}
          </div>

          {/* Section 4: Order Summary Review */}
          <div className="bg-[#FBFDFB] rounded-2xl p-4 border border-emerald-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Summary ({cart.length} items)</span>
            </h4>

            <div className="divide-y divide-zinc-100 max-h-36 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-zinc-900 truncate">{item.product.name}</span>
                    <span className="text-[10px] text-zinc-400">({item.product.unit})</span>
                  </div>
                  <span className="font-bold text-zinc-900 shrink-0">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-zinc-200 space-y-1 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `Rs. ${deliveryFee}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-emerald-950 pt-2 border-t border-zinc-200">
                <span>Total Payable:</span>
                <span className="text-emerald-800">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Place Order CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              id="btn-confirm-place-order"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
              <span>{isSubmitting ? 'Securing Farm Harvest...' : `Confirm & Place Order (Rs. ${total.toLocaleString()})`}</span>
            </button>

            <p className="text-center text-[11px] text-zinc-500 mt-2">
              🔒 100% Safe Checkout • Zero-Damage Guarantee • Direct Farm Fresh Quality
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
