import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CATEGORIES_DATA,
  DEFAULT_SETTINGS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
} from '../data/initialData';
import {
  CartItem,
  CategoryInfo,
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  ProductCategory,
  StoreSettings,
  ToastMessage,
  User,
} from '../types';

interface StoreContextType {
  // Navigation & View
  currentView: 'home' | 'shop' | 'about' | 'contact';
  setCurrentView: (view: 'home' | 'shop' | 'about' | 'contact') => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (category: ProductCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  isUserDashboardOpen: boolean;
  setIsUserDashboardOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Products
  products: Product[];
  categories: CategoryInfo[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  total: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth
  user: User | null;
  login: (emailOrPhone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  quickAdminLogin: () => void;
  updateUserProfile: (updates: Partial<User>) => void;

  // Orders
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    city: string;
    postalCode?: string;
    deliveryInstructions?: string;
    deliverySlot?: string;
    paymentMethod: PaymentMethod;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // WhatsApp
  getWhatsAppOrderUrl: (product?: Product, quantity?: number) => string;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('alkhair_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Categories
  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    const saved = localStorage.getItem('alkhair_categories');
    return saved ? JSON.parse(saved) : CATEGORIES_DATA;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('alkhair_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupon
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('alkhair_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // User
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('alkhair_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('alkhair_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('alkhair_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('alkhair_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('alkhair_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('alkhair_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('alkhair_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('alkhair_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('alkhair_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('alkhair_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('alkhair_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast Helper
  const addToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'p-' + Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast('Product Added', `"${newProduct.name}" added to catalog.`);
  };

  const updateProduct = (id: string, productUpdates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...productUpdates } : item))
    );
    addToast('Product Updated', 'Product changes saved successfully.');
  };

  const deleteProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    addToast('Product Deleted', `Removed ${p?.name || 'item'} from catalog.`, 'info');
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);

  // Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast('Added to Cart', `${quantity}x ${product.name} added.`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast('Removed from Cart', `${item.product.name} removed.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= settings.freeDeliveryThreshold ? 0 : settings.standardDeliveryFee;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ALFARM10' || clean === 'FRESH10') {
      setCouponCode(clean);
      setDiscountPercent(10);
      addToast('Coupon Applied!', '10% discount has been applied to your order.', 'success');
      return true;
    } else if (clean === 'EGGSLOVER' || clean === 'ALFARMFAM') {
      setCouponCode(clean);
      setDiscountPercent(15);
      addToast('Special Coupon Applied!', '15% family discount applied!', 'success');
      return true;
    } else {
      addToast('Invalid Coupon', 'Please check the coupon code and try again.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    addToast('Coupon Removed', 'Discount removed.', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = products.find((p) => p.id === productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast('Removed from Wishlist', `${prod?.name || 'Item'} removed from favorites.`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast('Added to Wishlist', `${prod?.name || 'Item'} saved to your favorites.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Authentication
  const login = async (emailOrPhone: string, pass: string) => {
    const cleanId = emailOrPhone.trim().toLowerCase();
    // Check if admin
    if (
      cleanId === 'admin@alkhairmetaeggs.com' ||
      cleanId === 'admin' ||
      cleanId === 'admin@alkhair.com'
    ) {
      const adminUser: User = {
        id: 'usr-admin-01',
        name: 'Farm Admin Manager',
        email: 'admin@alkhairmetaeggs.com',
        phone: '0300-1234567',
        role: 'admin',
        createdAt: '2026-01-01',
        addresses: [
          {
            id: 'addr-farm',
            label: 'Alkhair Farm Headquarter',
            address: 'Sargodha Road, Chak 42-JB',
            city: 'Faisalabad',
            isDefault: true,
          },
        ],
      };
      setUser(adminUser);
      addToast('Welcome Admin!', 'Logged into Alkhair Meta Eggs administrative portal.');
      return { success: true };
    }

    // Standard Customer Login
    const sampleUser: User = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Valued Customer',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'customer@alkhairmetaeggs.pro',
      phone: emailOrPhone.includes('@') ? '0301-7654321' : emailOrPhone,
      role: 'customer',
      createdAt: new Date().toISOString().slice(0, 10),
      addresses: [
        {
          id: 'addr-1',
          label: 'Home',
          address: 'House 45, Street 12, Cavalry Ground',
          city: 'Lahore',
          isDefault: true,
        },
      ],
    };
    setUser(sampleUser);
    addToast('Signed In', `Welcome back, ${sampleUser.name}!`);
    return { success: true };
  };

  const signup = async (name: string, email: string, phone: string, pass: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now().toString().slice(-5),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: 'customer',
      createdAt: new Date().toISOString().slice(0, 10),
      addresses: [],
    };
    setUser(newUser);
    addToast('Account Created!', `Welcome to Alkhair Meta Eggs, ${name}!`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsUserDashboardOpen(false);
    setIsAdminOpen(false);
    addToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  const quickAdminLogin = () => {
    login('admin@alkhairmetaeggs.com', 'admin123');
    setIsAdminOpen(true);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
    addToast('Profile Updated', 'Your profile details have been saved.');
  };

  // Orders
  const placeOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    city: string;
    postalCode?: string;
    deliveryInstructions?: string;
    deliverySlot?: string;
    paymentMethod: PaymentMethod;
  }) => {
    const orderNum = 'AME-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      address: orderData.address,
      city: orderData.city,
      postalCode: orderData.postalCode || '38000',
      deliveryInstructions: orderData.deliveryInstructions,
      deliverySlot: orderData.deliverySlot || 'Morning (8:00 AM - 12:00 PM)',
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        unit: item.product.unit,
        image: item.product.images[0],
      })),
      subtotal,
      deliveryFee,
      discountAmount,
      total,
      paymentMethod: orderData.paymentMethod,
      status: 'Confirmed',
      createdAt: new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }),
      estimatedDelivery: 'Tomorrow (' + (orderData.deliverySlot || 'Morning') + ')',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);

    // If user is logged in, attach address
    if (user && user.addresses.length === 0) {
      updateUserProfile({
        addresses: [
          {
            id: 'addr-' + Date.now(),
            label: 'Delivery Address',
            address: orderData.address,
            city: orderData.city,
            isDefault: true,
          },
        ],
      });
    }

    addToast('Order Confirmed!', `Your order ${orderNum} has been placed.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addToast('Order Status Updated', `Order marked as ${status}.`);
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('Settings Saved', 'Store configuration updated successfully.');
  };

  // WhatsApp Order Link Generator
  const getWhatsAppOrderUrl = (singleProduct?: Product, quantity = 1) => {
    const waNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `Salam Alkhair Meta Eggs team!\n\n`;

    if (singleProduct) {
      text += `I would like to order:\n`;
      text += `• *${singleProduct.name}* (${singleProduct.unit})\n`;
      text += `• Quantity: ${quantity}\n`;
      text += `• Price: Rs. ${(singleProduct.price * quantity).toLocaleString()}\n\n`;
    } else if (cart.length > 0) {
      text += `I would like to place an order for the following items:\n\n`;
      cart.forEach((item, idx) => {
        text += `${idx + 1}. *${item.product.name}* (${item.product.unit})\n`;
        text += `   Qty: ${item.quantity} | Rs. ${(item.product.price * item.quantity).toLocaleString()}\n`;
      });
      text += `\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n`;
      text += `*Delivery:* Rs. ${deliveryFee.toLocaleString()}\n`;
      if (discountAmount > 0) {
        text += `*Discount:* -Rs. ${discountAmount.toLocaleString()}\n`;
      }
      text += `*Estimated Total:* Rs. ${total.toLocaleString()}\n\n`;
    } else {
      text += `I would like to inquire about fresh eggs, chicken, and poultry products from your farm.\n\n`;
    }

    if (user) {
      text += `*Customer:* ${user.name} (${user.phone})\n`;
      if (user.addresses.length > 0) {
        text += `*City:* ${user.addresses[0].city}\n`;
      }
    }

    text += `Please confirm product availability and delivery schedule. Thank you!`;

    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        isUserDashboardOpen,
        setIsUserDashboardOpen,
        isAdminOpen,
        setIsAdminOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        discountAmount,
        couponCode,
        applyCoupon,
        removeCoupon,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        login,
        signup,
        logout,
        quickAdminLogin,
        updateUserProfile,
        orders,
        lastPlacedOrder,
        placeOrder,
        updateOrderStatus,
        settings,
        updateSettings,
        getWhatsAppOrderUrl,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
