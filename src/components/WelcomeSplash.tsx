import React from 'react';
import { ArrowRight, CheckCircle2, Lock, Zap, ShieldCheck } from 'lucide-react';

interface WelcomeSplashProps {
  onEnter: () => void;
  onSignIn: () => void;
  currentLocality?: string;
  onOpenLocalityModal?: () => void;
}

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({
  onEnter,
  onSignIn,
  currentLocality = 'Danavaipeta Hub • Rajahmundry',
  onOpenLocalityModal,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#f6fbf6] flex flex-col justify-between overflow-x-hidden selection:bg-emerald-200">
      {/* Dot matrix pattern overlay */}
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-85" />

      {/* Radial soft mint glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full glow-radial pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-6 sm:px-12 pt-7 pb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenLocalityModal}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700 shadow-xs hover:border-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
          aria-label="Current locality: Danavaipeta Hub Rajahmundry"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{currentLocality}</span>
        </button>

        <button
          type="button"
          onClick={onSignIn}
          className="text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/60 cursor-pointer"
        >
          Sign In
        </button>
      </header>

      {/* Center Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto w-full text-center">
        {/* Glowing Emerald Toolbox Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#006c49] flex items-center justify-center text-white glow-icon shadow-lg transition-transform hover:scale-105 duration-200">
            {/* Toolbox SVG matching the prototype */}
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          </div>

          {/* Verified Check Badge */}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#00ecba] text-[#00422b] flex items-center justify-center border-2 border-white shadow-sm">
            <CheckCircle2 className="w-4 h-4 fill-[#00422b] text-[#00ecba]" />
          </div>
        </div>

        {/* Directory Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-emerald-300 text-emerald-800 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Verified Municipal Directory</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#171d1a] tracking-tight leading-tight">
          Local Workers
        </h1>

        {/* Subtitle */}
        <p className="text-emerald-800 font-semibold text-base sm:text-lg mt-2 mb-6">
          Rajahmundry Artisan & Resident Network
        </p>

        {/* Quote Card */}
        <div className="relative w-full max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-emerald-100 shadow-sm mb-7 text-center">
          {/* Decorative quote mark */}
          <span className="absolute -top-3.5 left-6 text-2xl font-serif text-emerald-300 select-none bg-white px-1.5 rounded">
            “
          </span>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic font-normal">
            “Empowering local hands, enriching local homes. Connecting trust, skill, and community across every neighborhood.”
          </p>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={onEnter}
          className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#006c49] hover:bg-[#00573a] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer active:scale-95"
        >
          <span>Enter Local Workers</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-7 text-xs sm:text-sm font-medium text-slate-700">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>100% Police Verified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>Zero Commission</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span>Instant Dispatch</span>
          </div>
        </div>
      </main>

      {/* Footer Info Strip */}
      <footer className="relative z-10 w-full px-6 sm:px-12 py-5 border-t border-slate-200/60 bg-white/50 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>Rajahmundry Municipal Corporation • Ward 14 Danavaipeta</p>
        <p>24×7 Verified Electricians, Plumbers & Artisans</p>
      </footer>
    </div>
  );
};
