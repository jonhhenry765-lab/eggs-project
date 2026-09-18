import React, { useState } from 'react';
import {
  Clock,
  Heart,
  LogOut,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  User,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

export const UserDashboardModal: React.FC = () => {
  const {
    isUserDashboardOpen,
    setIsUserDashboardOpen,
    user,
    logout,
    orders,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    setIsAdminOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'addresses'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isUserDashboardOpen || !user) return null;

  // Filter orders placed by current user
  const userOrders = orders.filter(
    (o) => o.customerEmail === user.email || o.customerPhone === user.phone
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-emerald-100 overflow-hidden relative animate-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="bg-emerald-950 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 font-black text-xl flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display">{user.name}</h2>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-800 px-2.5 py-0.5 rounded-full text-emerald-200">
                  {user.role === 'admin' ? 'Admin Access' : 'Farm Member'}
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user.role === 'admin' && (
              <button
                onClick={() => {
                  setIsUserDashboardOpen(false);
                  setIsAdminOpen(true);
                }}
                className="hidden sm:inline-flex px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-xl text-xs font-bold"
              >
                Switch to Admin Panel
              </button>
            )}
            <button
              onClick={() => setIsUserDashboardOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-100 bg-[#FBFDFB] px-6 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('orders');
              setSelectedOrder(null);
            }}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({userOrders.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('wishlist');
              setSelectedOrder(null);
            }}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistProducts.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('profile');
              setSelectedOrder(null);
            }}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Information</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('addresses');
              setSelectedOrder(null);
            }}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div>
              {selectedOrder ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    ← Back to all orders
                  </button>

                  <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900">
                          Order {selectedOrder.orderNumber}
                        </h4>
                        <p className="text-xs text-zinc-500">
                          Placed on {selectedOrder.createdAt} • {selectedOrder.paymentMethod}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-600 space-y-1">
                      <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}</p>
                      <p><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery} ({selectedOrder.deliverySlot})</p>
                    </div>

                    <div className="divide-y divide-zinc-200 border-t border-zinc-200 pt-2">
                      {selectedOrder.items.map((it, idx) => (
                        <div key={idx} className="py-2 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img src={it.image} alt={it.name} className="w-8 h-8 rounded-md object-cover" />
                            <span>{it.name} ({it.quantity}x)</span>
                          </div>
                          <span className="font-bold text-zinc-900">
                            Rs. {(it.price * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-zinc-200 flex justify-between font-black text-sm text-emerald-950">
                      <span>Total Amount:</span>
                      <span>Rs. {selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : userOrders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-12 h-12 text-zinc-300 mx-auto" />
                  <h4 className="text-base font-bold text-zinc-800">No orders placed yet</h4>
                  <p className="text-xs text-zinc-500">
                    Your fresh egg and poultry delivery history will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {userOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/60 p-3 rounded-2xl transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-emerald-950 font-mono">
                            {ord.orderNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                              ord.status
                            )}`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500">
                          {ord.createdAt} • {ord.items.length} item{ord.items.length === 1 ? '' : 's'} • {ord.city}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="text-sm font-black text-emerald-900">
                          Rs. {ord.total.toLocaleString()}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
                  <h4 className="text-base font-bold text-zinc-800">Your wishlist is empty</h4>
                  <p className="text-xs text-zinc-500">
                    Click the heart icon on any product card to save it for later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl border border-zinc-200 bg-[#FBFDFB] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover border border-zinc-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-emerald-950">{p.name}</h4>
                          <span className="text-[11px] text-zinc-500">{p.unit}</span>
                          <p className="text-xs font-black text-emerald-900 mt-0.5">
                            Rs. {p.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-2 rounded-xl bg-zinc-100 hover:bg-rose-50 hover:text-rose-500 text-zinc-400 transition-colors"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Full Name</label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  disabled
                  value={user.phone}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-700"
                />
              </div>
              <p className="text-[11px] text-zinc-400">
                To update your verified phone number or email, please contact customer support.
              </p>
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              {user.addresses && user.addresses.length > 0 ? (
                user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-700">{addr.address}</p>
                      <p className="text-xs text-zinc-500">{addr.city}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-500">No saved addresses yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer with Logout */}
        <div className="p-4 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <button
            onClick={() => {
              logout();
              setIsUserDashboardOpen(false);
            }}
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 text-xs font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={() => setIsUserDashboardOpen(false)}
            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
