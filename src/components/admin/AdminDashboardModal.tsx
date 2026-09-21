import React, { useState } from 'react';
import {
  AlertCircle,
  Banknote,
  CheckCircle,
  DollarSign,
  Edit2,
  Egg,
  Layers,
  Package,
  Phone,
  Plus,
  Save,
  Search,
  Settings,
  ShoppingBag,
  Trash2,
  TrendingUp,
  Truck,
  Users,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus, Product, ProductCategory } from '../../types';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    orders,
    categories,
    settings,
    updateProduct,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    updateSettings,
    addToast,
    user,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'settings'>('overview');

  // Product Management Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Fresh Eggs',
    price: 500,
    unit: '12 Eggs Pack',
    shortDescription: '',
    fullDescription: '',
    inStock: true,
    badge: 'Fresh Harvest',
    images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'],
  });

  // Order Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [searchOrder, setSearchOrder] = useState('');

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState(settings);

  if (!isAdminOpen) return null;

  // Calculate Metrics
  const totalSales = orders.reduce((acc, curr) => (curr.status !== 'Cancelled' ? acc + curr.total : acc), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'Delivered').length;

  // Unique customers
  const uniqueCustomersMap = new Map<string, { name: string; email: string; phone: string; totalSpent: number; ordersCount: number }>();
  orders.forEach((o) => {
    const key = o.customerPhone || o.customerEmail;
    if (uniqueCustomersMap.has(key)) {
      const existing = uniqueCustomersMap.get(key)!;
      existing.totalSpent += o.total;
      existing.ordersCount += 1;
    } else {
      uniqueCustomersMap.set(key, {
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        totalSpent: o.total,
        ordersCount: 1,
      });
    }
  });
  const customersList = Array.from(uniqueCustomersMap.values());

  const filteredOrders = orders.filter((o) => {
    const matchStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    const matchSearch =
      o.orderNumber.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customerPhone.includes(searchOrder);
    return matchStatus && matchSearch;
  });

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      addToast('Validation Error', 'Product name and price are required.', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
      setEditingProduct(null);
    } else if (isAddingProduct) {
      const newProd: Omit<Product, 'id'> = {
        name: productForm.name || '',
        slug: (productForm.name || '').toLowerCase().replace(/\s+/g, '-'),
        category: (productForm.category as ProductCategory) || 'Fresh Eggs',
        price: Number(productForm.price) || 0,
        oldPrice: productForm.oldPrice ? Number(productForm.oldPrice) : undefined,
        discountPercentage: productForm.discountPercentage ? Number(productForm.discountPercentage) : undefined,
        unit: productForm.unit || '1 Pack',
        shortDescription: productForm.shortDescription || '',
        fullDescription: productForm.fullDescription || productForm.shortDescription || '',
        images: productForm.images || ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'],
        inStock: productForm.inStock ?? true,
        stockCount: 150,
        rating: 5.0,
        reviewCount: 1,
        badge: productForm.badge,
        features: ['Farm Fresh', 'Quality Inspected'],
      };
      addProduct(newProd);
      setIsAddingProduct(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-emerald-200 overflow-hidden relative flex flex-col max-h-[92vh] my-4">
        {/* Top Header */}
        <div className="bg-emerald-950 px-6 py-4 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <Egg className="w-6 h-6 fill-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black font-display tracking-wide">
                  Alrehman  Control Panel
                </h2>
                <span className="text-[10px] bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded-md">
                  Administrator
                </span>
              </div>
              <p className="text-xs text-emerald-200">Real-time inventory, sales, and logistics dispatch</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            aria-label="Close admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-zinc-100 px-6 border-b border-zinc-200 flex gap-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'customers'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers ({customersList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FBFDFB]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
                    <span>Total Farm Sales</span>
                    <Banknote className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-emerald-950 font-display">
                    Rs. {totalSales.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-emerald-700">From completed & active orders</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-emerald-950 font-display">
                    {totalOrdersCount}
                  </div>
                  <p className="text-[11px] text-zinc-500">{pendingOrdersCount} pending / in-transit</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
                    <span>Live Products</span>
                    <Package className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-emerald-950 font-display">
                    {products.length}
                  </div>
                  <p className="text-[11px] text-zinc-500">Across {categories.length} categories</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
                    <span>Customers</span>
                    <Users className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-emerald-950 font-display">
                    {customersList.length}
                  </div>
                  <p className="text-[11px] text-emerald-700">{deliveredOrdersCount} completed orders</p>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider">
                    Recent Incoming Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-200">
                      <tr>
                        <th className="p-3">Order #</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-zinc-50/60">
                          <td className="p-3 font-mono font-bold text-emerald-950">{o.orderNumber}</td>
                          <td className="p-3 font-medium text-zinc-900">{o.customerName}</td>
                          <td className="p-3 text-zinc-600">{o.city}</td>
                          <td className="p-3 font-bold text-emerald-900">Rs. {o.total.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3 text-zinc-600">{o.paymentMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-emerald-950">Farm Catalog Management</h3>
                  <p className="text-xs text-zinc-500">Edit prices, adjust stock levels, or launch new trays</p>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      category: 'Fresh Eggs',
                      price: 500,
                      unit: '12 Eggs',
                      shortDescription: '',
                      fullDescription: '',
                      inStock: true,
                      badge: 'Fresh Harvest',
                      images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'],
                    });
                    setIsAddingProduct(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Add / Edit Form Modal */}
              {(isAddingProduct || editingProduct) && (
                <form
                  onSubmit={handleSaveProduct}
                  className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                    <h4 className="text-sm font-bold text-emerald-950">
                      {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Farm Product'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="text-xs font-bold text-zinc-500 hover:text-zinc-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-zinc-700 mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      >
                        <option value="Fresh Eggs">Fresh Eggs</option>
                        <option value="Fresh Chicken">Fresh Chicken</option>
                        <option value="Farm Supplies">Farm Supplies</option>
                        <option value="Premium Packs">Premium Packs</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Price (PKR)</label>
                      <input
                        type="number"
                        required
                        value={productForm.price || ''}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Old Price (PKR)</label>
                      <input
                        type="number"
                        value={productForm.oldPrice || ''}
                        onChange={(e) => setProductForm({ ...productForm, oldPrice: Number(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Unit / Packaging</label>
                      <input
                        type="text"
                        value={productForm.unit || ''}
                        onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                        placeholder="e.g. 30 Eggs Tray"
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block font-bold text-zinc-700 mb-1">Short Description</label>
                      <input
                        type="text"
                        value={productForm.shortDescription || ''}
                        onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block font-bold text-zinc-700 mb-1">Image URL</label>
                      <input
                        type="url"
                        value={productForm.images?.[0] || ''}
                        onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={productForm.badge || ''}
                        onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                        placeholder="Best Seller / Farm Fresh"
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox"
                        id="inStockCheck"
                        checked={productForm.inStock ?? true}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      />
                      <label htmlFor="inStockCheck" className="font-bold text-zinc-800">
                        In Stock & Available for Delivery
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-800 text-white font-bold rounded-xl text-xs hover:bg-emerald-900"
                  >
                    Save Product
                  </button>
                </form>
              )}

              {/* Product Table */}
              <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-200">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Stock Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-50/60">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-zinc-900">{p.name}</p>
                              {p.badge && <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">{p.badge}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-zinc-600">{p.category}</td>
                        <td className="p-3 font-bold text-emerald-950">Rs. {p.price.toLocaleString()}</td>
                        <td className="p-3 text-zinc-500">{p.unit}</td>
                        <td className="p-3">
                          <button
                            onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              p.inStock
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setProductForm(p);
                                setIsAddingProduct(false);
                              }}
                              className="p-1.5 hover:bg-zinc-100 text-zinc-600 rounded-lg"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 hover:bg-rose-50 text-zinc-400 hover:text-rose-600 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchOrder}
                    onChange={(e) => setSearchOrder(e.target.value)}
                    placeholder="Search by order #, customer, phone..."
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-white"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex gap-1 overflow-x-auto text-xs font-bold">
                  {['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                        orderStatusFilter === st
                          ? 'bg-emerald-800 text-white'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-200">
                    <tr>
                      <th className="p-3">Order #</th>
                      <th className="p-3">Customer & Contact</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">City & Address</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-zinc-50/60">
                        <td className="p-3 font-mono font-bold text-emerald-950">{o.orderNumber}</td>
                        <td className="p-3">
                          <p className="font-bold text-zinc-900">{o.customerName}</p>
                          <p className="text-[10px] text-zinc-500">{o.customerPhone}</p>
                        </td>
                        <td className="p-3 text-zinc-600">
                          {o.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                        </td>
                        <td className="p-3">
                          <p className="font-medium text-zinc-800">{o.city}</p>
                          <p className="text-[10px] text-zinc-500 truncate max-w-xs">{o.address}</p>
                        </td>
                        <td className="p-3 font-bold text-emerald-900">
                          Rs. {o.total.toLocaleString()}
                          <span className="block text-[10px] text-zinc-400 font-normal">{o.paymentMethod}</span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              o.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : o.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className="text-[11px] p-1.5 rounded-lg border border-zinc-300 bg-white font-semibold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-200">
                    <tr>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Orders Count</th>
                      <th className="p-3">Total Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {customersList.map((c, i) => (
                      <tr key={i} className="hover:bg-zinc-50/60">
                        <td className="p-3 font-bold text-zinc-900">{c.name}</td>
                        <td className="p-3 font-mono text-zinc-600">{c.phone}</td>
                        <td className="p-3 text-zinc-500">{c.email}</td>
                        <td className="p-3 font-semibold">{c.ordersCount} orders</td>
                        <td className="p-3 font-black text-emerald-900">
                          Rs. {c.totalSpent.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-6 border border-zinc-200 space-y-6 max-w-3xl">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Alrehman Store & Contact Configuration</h3>
                <p className="text-xs text-zinc-500">Manage WhatsApp hotline numbers, delivery fees, and bank account data</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">WhatsApp Number (Digits only)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Display Hotline Phone</label>
                  <input
                    type="text"
                    value={settingsForm.displayPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, displayPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Standard Delivery Fee (PKR)</label>
                  <input
                    type="number"
                    value={settingsForm.standardDeliveryFee}
                    onChange={(e) => setSettingsForm({ ...settingsForm, standardDeliveryFee: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Free Delivery Threshold (PKR)</label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-zinc-700 mb-1">Farm Location Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={settingsForm.bankName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bankName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Account Title</label>
                  <input
                    type="text"
                    value={settingsForm.accountTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, accountTitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={settingsForm.accountNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, accountNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">IBAN</label>
                  <input
                    type="text"
                    value={settingsForm.iban}
                    onChange={(e) => setSettingsForm({ ...settingsForm, iban: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-800 text-white font-bold rounded-xl text-xs hover:bg-emerald-900 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
