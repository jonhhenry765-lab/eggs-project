import React, { useState } from 'react';
import { Egg, KeyRound, Lock, Mail, Phone, ShieldCheck, Sparkles, User, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login, signup, addToast, quickAdminLogin } = useStore();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup fields
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) {
      addToast('Input Required', 'Please enter your email/phone and password.', 'error');
      return;
    }
    setIsLoading(true);
    const res = await login(emailOrPhone, password);
    setIsLoading(false);
    if (res.success) {
      setIsAuthOpen(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !signupEmail.trim() || !signupPhone.trim()) {
      addToast('Input Required', 'Please fill in all required fields.', 'error');
      return;
    }
    if (signupPassword !== confirmPassword) {
      addToast('Passwords Mismatch', 'Passwords do not match.', 'error');
      return;
    }
    setIsLoading(true);
    const res = await signup(name, signupEmail, signupPhone, signupPassword);
    setIsLoading(false);
    if (res.success) {
      setIsAuthOpen(false);
    }
  };

  const handleQuickCustomer = () => {
    login('customer@example.com', 'password123');
    setIsAuthOpen(false);
  };

  const handleQuickAdmin = () => {
    quickAdminLogin();
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-100 overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-emerald-950 p-6 text-white text-center relative">
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close auth"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center mx-auto mb-2 shadow-md">
            <Egg className="w-7 h-7 fill-emerald-950 text-emerald-950" />
          </div>

          <h3 className="text-xl font-black font-display tracking-tight text-white">
            Alrehman Meta Eggs
          </h3>
          <p className="text-xs text-emerald-200 mt-0.5">
            {mode === 'login' ? 'Sign in to access orders & saved trays' : 'Create your fresh farm account'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-100 bg-zinc-50 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === 'login'
                ? 'bg-white text-emerald-900 border-b-2 border-emerald-700'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === 'signup'
                ? 'bg-white text-emerald-900 border-b-2 border-emerald-700'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="user@example.com or 03001234567"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-zinc-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-700 focus:ring-emerald-500"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => addToast('Password Reset', 'Password reset instructions sent to your phone/email.')}
                  className="text-emerald-700 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Muhammad Tariq"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="tariq@gmail.com"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>{isLoading ? 'Creating Account...' : 'Create Customer Account'}</span>
              </button>
            </form>
          )}

          {/* Quick Demo Logins for instant evaluation */}
          <div className="pt-3 border-t border-zinc-100">
            <p className="text-[11px] text-zinc-400 font-semibold mb-2 text-center">
              Quick 1-Click Demo Logins:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Customer Demo</span>
              </button>
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
