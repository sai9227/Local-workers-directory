import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Clock,
  Camera,
  MapPin,
  Lock,
  Unlock,
  ShieldCheck,
  Compass,
  FileText,
  Wallet,
  LogOut,
  Star,
} from 'lucide-react';
import { ServiceJob } from '../utils/serviceLogic';

interface WorkerPortalProps {
  currentSubView: 'feed' | 'detail';
  onNavigateSubView: (view: 'feed' | 'detail') => void;
  workerName: string;
  workerRole: string;
  workerFee: number;
  jobs: ServiceJob[];
  isDutyOn: boolean;
  onToggleDuty: () => void;
  onSignOut: () => void;
  onOpenMessagesModal: (threadId?: string) => void;
  onShowToast: (msg: string) => void;
}

export const WorkerPortal: React.FC<WorkerPortalProps> = ({
  currentSubView,
  onNavigateSubView,
  workerName,
  workerRole,
  workerFee,
  jobs,
  isDutyOn,
  onToggleDuty,
  onSignOut,
  onOpenMessagesModal,
  onShowToast,
}) => {
  const [isJobAccepted, setIsJobAccepted] = useState(false);

  const handleAcceptJob = () => {
    setIsJobAccepted(true);
    onShowToast('Job accepted! Flat address and gate intercom pass revealed.');
  };

  return (
    <div className="min-h-screen pt-9 bg-[#f8f9ff]">
      {/* Worker Header */}
      <header className="fixed top-9 left-0 right-0 h-16 bg-white/95 backdrop-blur-md shadow-xs z-50 flex items-center justify-between px-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigateSubView('feed')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#006c49] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-[#006c49] leading-tight">
                Local Pro
              </span>
              <span className="text-xs text-slate-500 leading-none">
                Worker Portal ({workerName})
              </span>
            </div>
          </button>

          <div className="h-6 w-px bg-slate-200" />

          {/* Duty Toggle */}
          <button
            type="button"
            onClick={onToggleDuty}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer ${
              isDutyOn
                ? 'bg-emerald-100 text-[#006c49]'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDutyOn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>{isDutyOn ? 'Accepting Calls (On Duty)' : 'Duty Paused (Off Duty)'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-[#006c49]">
            <Wallet className="w-3.5 h-3.5" />
            <span>Today: ₹1,150</span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img
              alt="Worker Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#006c49]"
              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=300&q=80"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">{workerName}</span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {workerRole} (₹{workerFee})
              </span>
            </div>

            <button
              type="button"
              onClick={onSignOut}
              className="ml-2 flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Sign out to Role Selection"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Worker Sidebar */}
      <aside className="fixed left-0 bottom-0 w-60 bg-white shadow-xs z-40 flex flex-col justify-between py-6 px-4 border-r border-slate-200 top-16">
        <div className="flex flex-col gap-1.5">
          <span className="px-2 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1">
            Artisan Menu
          </span>

          <button
            type="button"
            onClick={() => onNavigateSubView('feed')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentSubView === 'feed'
                ? 'bg-emerald-500 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4" />
              <span>Job Feed</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                currentSubView === 'feed' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-[#006c49]'
              }`}
            >
              4 New
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSubView('detail')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentSubView === 'detail'
                ? 'bg-emerald-500 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Jobs</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenMessagesModal('ananya')}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
          </button>

          <button
            type="button"
            onClick={() => onShowToast('Earnings: ₹6,450 paid directly to UPI this week.')}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-4 h-4" />
              <span>Earnings</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006c49] text-xs font-bold">
              ₹1,150 Today
            </span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-[#006c49] font-bold mb-0.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified Kaarigar</span>
          </div>
          <p className="text-slate-500">ID: RMC-ELE-498 • Rajahmundry Police Verified</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-60">
        <main className="pt-16 p-6 min-h-[calc(100vh-2.25rem)]">
          {/* ======================================================== */}
          {/* SUB-VIEW: FEED                                           */}
          {/* ======================================================== */}
          {currentSubView === 'feed' && (
            <div className="flex flex-col gap-5 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-heading font-bold text-slate-900">
                    Available Jobs in Danavaipeta
                  </h1>
                  <p className="text-xs text-slate-500">
                    Live verified customer repair requests within 2.5 km
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast('Feed refreshed! 4 requests active in Danavaipeta.')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#006c49] hover:bg-emerald-50 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Feed</span>
                </button>
              </div>

              {/* Job Card 1 (Emergency Request) */}
              <div
                onClick={() => onNavigateSubView('detail')}
                className="cursor-pointer group rounded-xl bg-white p-5 shadow-xs border-2 border-emerald-400 hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold uppercase animate-pulse">
                      Emergency Request
                    </span>
                    <span className="text-xs text-slate-500">0.8 km away • Posted 2 hrs ago</span>
                  </div>
                  <span className="text-base font-extrabold text-[#006c49]">₹300 - ₹500</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#006c49] transition-colors">
                    Electrical Repair (Emergency MCB Trip &amp; Inverter Setup)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Customer:</span>
                    <strong className="text-slate-900">Ananya Sharma</strong>
                    <span className="inline-flex items-center gap-0.5 text-slate-700">
                      (4.9 <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" /> verified resident)
                    </span>
                    <span>• Krishna Residency</span>
                  </p>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg mt-2 leading-relaxed">
                    "Main MCB trips every 10 minutes when AC turns on. Need urgent inverter &amp; wiring inspection with clamp multimeter."
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#006c49]" />
                      <span>Tomorrow, 10:30 AM</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-[#006c49]" />
                      <span>2 Photos Attached</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-[#006c49] hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <span>View Job &amp; Customer Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="rounded-xl bg-white p-4 shadow-xs border border-slate-100 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                      Ceiling Fan
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      Ceiling Fan &amp; Concealed LED Wiring
                    </h4>
                    <p className="text-xs text-slate-500">
                      K. Venkatesh • Prakash Nagar (1.4 km) • Preferred: Today
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#006c49]">₹350 Fixed</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500">Ladder provided by resident</span>
                  <button
                    type="button"
                    onClick={() => onShowToast('Submitted instant quote of ₹350 to K. Venkatesh!')}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#006c49] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Send Quick Quote (₹350)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SUB-VIEW: DETAIL                                         */}
          {/* ======================================================== */}
          {currentSubView === 'detail' && (
            <div className="flex flex-col gap-5 max-w-4xl">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigateSubView('feed')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Job Feed</span>
                </button>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isJobAccepted
                      ? 'bg-[#006c49] text-white'
                      : 'bg-emerald-100 text-[#006c49]'
                  }`}
                >
                  {isJobAccepted ? 'Job Assigned to You' : 'Job #RJY-8491 • Open for Acceptance'}
                </span>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-100 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#006c49] uppercase">
                      Electrical Services
                    </span>
                    <h2 className="text-xl font-heading font-bold text-slate-900 mt-0.5">
                      Main MCB Tripping &amp; Inverter Setup
                    </h2>
                    <p className="text-xs text-slate-500">
                      Customer requested verified technician with clamp multimeter.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-[#006c49] block">₹299 - ₹500</span>
                    <span className="text-[11px] text-slate-400">Guaranteed visit fee ₹299 upfront</span>
                  </div>
                </div>

                {/* Customer Identity Box */}
                <div className="p-4 rounded-xl bg-slate-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#006c49] text-white flex items-center justify-center font-bold text-sm">
                        AS
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Ananya Sharma</h4>
                        <span className="text-xs text-[#006c49] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Resident • 4.9</span>
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
                          <span>(18 reviews)</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onShowToast('Calling Ananya Sharma (+91 94401 23456)...')}
                        className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#006c49] hover:bg-emerald-50 flex items-center gap-1 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Customer</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenMessagesModal('ananya')}
                        className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#006c49] hover:bg-emerald-50 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>

                  {/* Address Reveal Box */}
                  <div
                    className={`p-3 rounded-lg border border-dashed flex items-center justify-between ${
                      isJobAccepted
                        ? 'bg-emerald-50/60 border-[#006c49]'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={`w-5 h-5 ${
                          isJobAccepted ? 'text-[#006c49]' : 'text-slate-400'
                        }`}
                      />
                      <div>
                        <span className="text-[11px] text-slate-400 block">Customer Address:</span>
                        <span
                          className={`text-xs font-bold ${
                            isJobAccepted ? 'text-emerald-900' : 'text-slate-700'
                          }`}
                        >
                          {isJobAccepted
                            ? 'Flat #402, Krishna Residency, Danavaipeta, Rajahmundry (Gate Pass #0402)'
                            : 'Krishna Residency, Danavaipeta (Flat number locked until job is accepted)'}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        isJobAccepted
                          ? 'bg-emerald-200 text-emerald-950'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isJobAccepted ? (
                        <>
                          <Unlock className="w-3 h-3" />
                          <span>Address Revealed</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Problem Photos */}
                <div>
                  <span className="text-xs font-bold text-slate-900 block mb-2">
                    Customer Attached Photos
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      alt="MCB Box"
                      className="w-full h-32 rounded-lg object-cover border border-slate-200"
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80"
                    />
                    <img
                      alt="Inverter Wire"
                      className="w-full h-32 rounded-lg object-cover border border-slate-200"
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 flex-wrap gap-2">
                  <span className="text-xs text-slate-500">
                    Slot: Tomorrow, 10:30 AM • Flat fee ₹299 protected
                  </span>

                  {isJobAccepted ? (
                    <div className="px-6 py-2.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                      <span>Job Accepted! Flat Address Unlocked</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAcceptJob}
                      className="px-6 py-2.5 rounded-full bg-[#006c49] hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Accept Job &amp; Reveal Flat Address</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
