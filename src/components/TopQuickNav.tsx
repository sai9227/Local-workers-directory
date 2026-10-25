import React from 'react';

export type ScreenView =
  | 'welcome'
  | 'role-selection'
  | 'resident-home'
  | 'resident-request-detail'
  | 'worker-feed'
  | 'worker-detail';

interface TopQuickNavProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
}

export const TopQuickNav: React.FC<TopQuickNavProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-9 bg-slate-900 text-slate-200 text-xs z-[100] flex items-center justify-between px-3 sm:px-4 border-b border-slate-700 select-none">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-semibold text-emerald-400">Interactive Mode</span>
        <span className="text-slate-400 hidden sm:inline">| Auth, OTP, Account Creation &amp; Dashboards</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <span className="text-[11px] text-slate-400 mr-1 hidden md:inline">Jump:</span>

        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            currentView === 'welcome'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          Welcome Splash
        </button>

        <button
          type="button"
          onClick={() => onNavigate('role-selection')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            currentView === 'role-selection'
              ? 'bg-rose-700 text-white font-bold'
              : 'bg-rose-900/60 hover:bg-rose-800 text-rose-100'
          }`}
        >
          Sign Out / Auth Portal
        </button>

        <button
          type="button"
          onClick={() => onNavigate('resident-home')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            currentView === 'resident-home'
              ? 'bg-emerald-600 text-white font-bold'
              : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 border border-emerald-800'
          }`}
        >
          Resident Home
        </button>

        <button
          type="button"
          onClick={() => onNavigate('resident-request-detail')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            currentView === 'resident-request-detail'
              ? 'bg-emerald-600 text-white font-bold'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          Request &amp; Offers
        </button>

        <button
          type="button"
          onClick={() => onNavigate('worker-feed')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            currentView === 'worker-feed'
              ? 'bg-emerald-600 text-white font-bold'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          Worker Feed
        </button>

        <button
          type="button"
          onClick={() => onNavigate('worker-detail')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            currentView === 'worker-detail'
              ? 'bg-emerald-600 text-white font-bold'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          Worker Job Detail
        </button>
      </div>
    </div>
  );
};
