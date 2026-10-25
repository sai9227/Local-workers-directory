import React from 'react';
import { ArrowRight, CheckCircle2, UserPlus, Wrench, Building2 } from 'lucide-react';

interface AuthPortalProps {
  onOpenSignIn: (role: 'resident' | 'worker') => void;
  onOpenRegister: (role: 'resident' | 'worker') => void;
  onBackToSplash: () => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({
  onOpenSignIn,
  onOpenRegister,
  onBackToSplash,
}) => {
  return (
    <div className="min-h-[calc(100vh-2.25rem)] bg-slate-50 flex flex-col justify-between">
      {/* Auth Top Navigation Bar */}
      <header className="w-full bg-white border-b border-slate-200 py-3.5 px-6 sm:px-10 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={onBackToSplash}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-[#006c49] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <span className="font-heading font-bold text-base sm:text-lg text-[#006c49] leading-tight block">
              Local Workers
            </span>
            <span className="text-[11px] text-slate-500">Rajahmundry Artisan &amp; Resident Network</span>
          </div>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onOpenSignIn('resident')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#006c49] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => onOpenSignIn('resident')}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#006c49] bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors hidden sm:inline-block cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => onOpenRegister('resident')}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#006c49] hover:bg-emerald-800 rounded-full shadow-xs transition-all flex items-center gap-1 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>
      </header>

      {/* Hero & Main Role Cards Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto w-full">
        {/* Header copy */}
        <div className="text-center max-w-xl mb-8">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-wider inline-block mb-3">
            Verified Local Services • Danavaipeta Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Connect with Verified Rajahmundry Artisans
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Sign in to book instant trusted home services or accept jobs in your neighborhood.
          </p>
        </div>

        {/* Side-by-side Role Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Resident Role Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 hover:border-[#006c49] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006c49] flex items-center justify-center group-hover:bg-[#006c49] group-hover:text-white transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Resident Portal
                </span>
              </div>
              <h2 className="text-lg font-heading font-bold text-slate-900 group-hover:text-[#006c49] transition-colors">
                Sign In as a Resident
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Post repair requests, browse pre-cleared electricians, plumbers and painters, and compare upfront quotes.
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp &amp; In-app booking</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Police &amp; Aadhaar verified pros</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenSignIn('resident')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006c49] hover:bg-emerald-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Sign In as a Resident</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onOpenRegister('resident')}
                className="w-full py-2 text-xs font-semibold text-[#006c49] hover:underline text-center cursor-pointer"
              >
                New here? Create Resident Account
              </button>
            </div>
          </div>

          {/* Worker Role Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 hover:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  Worker Portal
                </span>
              </div>
              <h2 className="text-lg font-heading font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                Sign In as a Worker
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access nearby repair jobs in Ward 14, get instant customer notifications, and earn daily with zero commissions.
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant customer lead dispatch</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Fixed upfront visit fees</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenSignIn('worker')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Sign In as a Worker</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onOpenRegister('worker')}
                className="w-full py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:underline text-center cursor-pointer"
              >
                New pro? Register as a Worker
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <p>Local Workers Portal • Danavaipeta, Rajahmundry • 24x7 Verified Municipal Directory</p>
      </footer>
    </div>
  );
};
