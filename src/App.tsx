import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ToastContainer } from './components/common/ToastContainer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { AuthModal } from './components/auth/AuthModal';
import { UserDashboardModal } from './components/account/UserDashboardModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentView } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Sticky Header with Navigation, Live Search, Badges & Actions */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="flex-1 w-full">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Interactive WhatsApp Hotline */}
      <WhatsAppButton />

      {/* Global Notifications */}
      <ToastContainer />

      {/* Modals & Slide-out Drawers */}
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <AuthModal />
      <UserDashboardModal />
      <AdminDashboardModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
