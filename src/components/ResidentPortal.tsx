import React, { useState } from 'react';
import {
  Wrench,
  MapPin,
  ChevronDown,
  Bell,
  LogOut,
  Home,
  FileText,
  MessageSquare,
  Wallet,
  User,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Send,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Star,
  Check,
  Receipt,
  Camera,
  MessageCircle,
} from 'lucide-react';
import { Artisan, ServiceJob, ServiceQuote } from '../utils/serviceLogic';

interface ResidentPortalProps {
  currentSubView: 'home' | 'request-detail' | 'messages' | 'payments' | 'profile';
  onNavigateSubView: (view: 'home' | 'request-detail' | 'messages' | 'payments' | 'profile') => void;
  locality: string;
  onOpenLocalityModal: () => void;
  onOpenMessagesModal: (threadId?: string) => void;
  onSignOut: () => void;
  residentName: string;
  residentAddress: string;
  residentPhone: string;
  jobs: ServiceJob[];
  onAddNewJob: (trade: string, desc: string, slot: string, budget: number) => void;
  artisans: Artisan[];
  quotes: ServiceQuote[];
  onAcceptQuote: (quote: ServiceQuote) => void;
  acceptedQuote: ServiceQuote | null;
  onShowToast: (msg: string) => void;
}

export const ResidentPortal: React.FC<ResidentPortalProps> = ({
  currentSubView,
  onNavigateSubView,
  locality,
  onOpenLocalityModal,
  onOpenMessagesModal,
  onSignOut,
  residentName,
  residentAddress,
  residentPhone,
  jobs,
  onAddNewJob,
  artisans,
  quotes,
  onAcceptQuote,
  acceptedQuote,
  onShowToast,
}) => {
  // New request form state
  const [selectedTrade, setSelectedTrade] = useState('Electrician');
  const [desc, setDesc] = useState('');
  const [slot, setSlot] = useState('Tomorrow, 10:30 AM');
  const [budget, setBudget] = useState('450');

  // Chat message state in messages tab
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'worker',
      text: 'Namaskaram Ananya garu! I reviewed your MCB trip photo. I carry spare 32A Schneider breakers and a clamp meter. Can I arrive tomorrow at 10:30 AM?',
      time: '09:12 AM',
    },
    {
      sender: 'resident',
      text: 'Yes please Ramesh garu. Our gate security is pre-cleared for flat #402.',
      time: '09:15 AM',
    },
  ]);
  const [tabChatInput, setTabChatInput] = useState('');

  // Get initials
  const initials = residentName
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'AS';

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    onAddNewJob(selectedTrade, desc.trim(), slot, Number(budget) || 450);
    setDesc('');
    onShowToast(`Request posted! Nearby ${selectedTrade}s alerted in ${locality}.`);
  };

  const handleSendTabChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tabChatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'resident', text: tabChatInput.trim(), time: 'Just now' },
    ]);
    setTabChatInput('');
    onShowToast('Message sent to Ramesh Kumar!');
  };

  return (
    <div className="min-h-screen pt-9 bg-[#f8f9ff]">
      {/* Top Header */}
      <header className="fixed top-9 left-0 right-0 h-16 bg-white/95 backdrop-blur-md shadow-xs z-50 flex items-center justify-between px-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigateSubView('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#006c49] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Wrench className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-[#006c49] leading-tight">
                Local Workers
              </span>
              <span className="text-xs text-slate-500 leading-none">Resident Portal</span>
            </div>
          </button>

          <div className="h-6 w-px bg-slate-200" />

          {/* Locality Selector Button */}
          <button
            type="button"
            onClick={onOpenLocalityModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#006c49]" />
            <span>{locality}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onShowToast('2 nearby workers available for rapid dispatch')}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-[#006c49] flex items-center justify-center text-white font-semibold text-sm">
              {initials}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">{residentName}</span>
              <span className="text-[11px] text-[#006c49] font-medium leading-tight max-w-[180px] truncate">
                {residentAddress}
              </span>
            </div>

            <button
              type="button"
              onClick={onSignOut}
              className="ml-2 flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed left-0 bottom-0 w-60 bg-white shadow-xs z-40 flex flex-col justify-between py-6 px-4 border-r border-slate-200 top-16">
        <div className="flex flex-col gap-1.5">
          <span className="px-2 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1">
            Resident Menu
          </span>

          <button
            type="button"
            onClick={() => onNavigateSubView('home')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentSubView === 'home'
                ? 'bg-emerald-500 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSubView('request-detail')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-sm transition-colors cursor-pointer ${
              currentSubView === 'request-detail'
                ? 'bg-emerald-500 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>My Requests</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                currentSubView === 'request-detail'
                  ? 'bg-white/20 text-white'
                  : 'bg-emerald-100 text-[#006c49]'
              }`}
            >
              {jobs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onOpenMessagesModal('ananya')}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          <button
            type="button"
            onClick={() => onNavigateSubView('payments')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm transition-colors cursor-pointer ${
              currentSubView === 'payments'
                ? 'bg-emerald-500 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Payments</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSubView('profile')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm transition-colors cursor-pointer ${
              currentSubView === 'profile'
                ? 'bg-emerald-500 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100 font-medium'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

        {/* Guarantee Box */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
          <div className="flex items-center gap-1.5 text-[#006c49] font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Resident Guarantee</span>
          </div>
          <p className="text-slate-600 leading-snug">
            All technicians servicing Danavaipeta carry verified Aadhaar and police clearance.
          </p>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="pl-60">
        <main className="pt-16 p-6 min-h-[calc(100vh-2.25rem)]">
          {/* ======================================================== */}
          {/* SUB-VIEW: HOME                                           */}
          {/* ======================================================== */}
          {currentSubView === 'home' && (
            <div className="flex flex-col gap-6">
              {/* Welcome Strip */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-heading font-bold text-slate-900">
                      Welcome back, <span>{residentName.split(' ')[0]}</span>
                    </h1>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006c49] text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Resident
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {residentAddress} • RMC Ward 14
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onShowToast(
                        'Redirecting to Rajahmundry Local Workers WhatsApp Desk (+91 94401 22334)...'
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Booking</span>
                  </button>

                  <div
                    onClick={() => onNavigateSubView('request-detail')}
                    className="cursor-pointer px-4 py-2 rounded-xl bg-white shadow-xs border border-slate-100 hover:shadow-md transition-shadow flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006c49] flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-900">Confirmed Visit</span>
                      <span className="text-[11px] text-slate-500">Scheduled Tomorrow</span>
                    </div>
                  </div>

                  <div
                    onClick={() => onNavigateSubView('request-detail')}
                    className="cursor-pointer px-4 py-2 rounded-xl bg-white shadow-xs border border-slate-100 hover:shadow-md transition-shadow flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {jobs.length}
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-900">Active Requests</span>
                      <span className="text-[11px] text-slate-500">Review quotes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* High Priority Scheduled Visit Banner */}
              <div className="rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col transition-all">
                <div className="bg-gradient-to-r from-[#006c49] via-emerald-800 to-emerald-600 px-5 py-3 text-white flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                      Active Selected Visit
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px] font-semibold text-white">
                      Tomorrow, 10:30 AM
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {acceptedQuote ? `Confirmed with ${acceptedQuote.artisanName}` : 'Confirmed & Dispatched'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        alt="Ramesh Kumar"
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#006c49]"
                        src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=300&q=80"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#006c49] text-[10px] font-bold uppercase">
                          Electrical
                        </span>
                        <span className="text-xs text-slate-500">Krishna Residency, Flat #402</span>
                      </div>
                      <h2 className="text-lg font-heading font-bold text-slate-900">
                        Electrician Visit with Ramesh Kumar
                      </h2>
                      <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1 flex-wrap">
                        <span>Visiting Fee: ₹299 (Standard Inspection) • ID &amp; Police Verified •</span>
                        <span className="inline-flex items-center gap-0.5 font-semibold text-slate-800">
                          4.9 <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
                        </span>
                        <span>(184 reviews)</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onShowToast('Connecting call to Ramesh Kumar (+91 98345 67812)...')}
                      className="px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#006c49] font-semibold text-xs transition-colors flex items-center gap-1.5 border border-[#006c49]/20 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Pro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenMessagesModal('ananya')}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateSubView('request-detail')}
                      className="px-3.5 py-1.5 rounded-full bg-[#006c49] hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span>View Offers &amp; Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Two Column: Post Form & Ongoing Requests */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Express Request Form */}
                <div className="lg:col-span-7 bg-white rounded-xl p-5 shadow-xs border border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#006c49] tracking-wider uppercase">
                        Resident Express Booking
                      </span>
                      <h3 className="text-lg font-heading font-bold text-slate-900">
                        Post a New Service Request
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {locality}
                    </span>
                  </div>

                  <form onSubmit={handlePostSubmit} className="flex flex-col gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-slate-900 mb-1.5 block">
                        Select Trade Needed
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {['Electrician', 'Plumber', 'Carpenter', 'AC Service', 'Painter'].map((trade) => {
                          const isSel = selectedTrade === trade;
                          return (
                            <button
                              key={trade}
                              type="button"
                              onClick={() => setSelectedTrade(trade)}
                              className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-[#006c49] text-white font-semibold'
                                  : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
                              }`}
                            >
                              <Wrench className="w-4 h-4" />
                              <span>{trade}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="postDesc" className="text-xs font-bold text-slate-900 mb-1 block">
                        Describe the Issue
                      </label>
                      <textarea
                        id="postDesc"
                        rows={2}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="E.g., Inverter load tripping when AC is switched on..."
                        required
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-900 mb-1 block">
                          Preferred Arrival Slot
                        </label>
                        <input
                          type="text"
                          value={slot}
                          onChange={(e) => setSlot(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-900 mb-1 block">
                          Est. Budget (₹)
                        </label>
                        <input
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="e.g. 450"
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006c49]" />
                        <span>Zero platform commission</span>
                      </span>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-full bg-[#006c49] hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Request to Verified Workers</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right: Ongoing Requests */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Ongoing Requests ({jobs.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => onNavigateSubView('request-detail')}
                      className="text-xs text-[#006c49] font-semibold hover:underline cursor-pointer"
                    >
                      View All &amp; Quotes
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => onNavigateSubView('request-detail')}
                        className="group rounded-xl bg-white p-4 shadow-xs border border-slate-100 hover:border-[#006c49] transition-all flex flex-col gap-2 cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#006c49] uppercase">
                              {job.trade}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006c49] mt-1">
                              {job.title}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {job.locality} • Slot: {job.slot}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-[#006c49]">
                            ₹{job.budgetMin} {job.budgetMax !== job.budgetMin ? `- ₹${job.budgetMax}` : ''}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                          {job.status === 'assigned' ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Pro Assigned
                            </span>
                          ) : (
                            <span className="text-rose-600 font-medium flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> Quotes waiting
                            </span>
                          )}

                          <button
                            type="button"
                            className="px-3 py-1 rounded-full bg-[#006c49] text-white text-xs font-semibold group-hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Review →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Workers Grid */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Nearby Verified Workers in {locality}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-bold">
                      {artisans.length} Pros Available
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    Ward 14 • Police &amp; Aadhaar Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artisans.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#006c49] shadow-xs hover:shadow transition-all flex flex-col justify-between gap-3 relative"
                    >
                      {art.featured && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#006c49] text-white text-[10px] font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#006c49] flex items-center justify-center font-bold text-base shrink-0 border border-[#006c49]">
                          {art.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-slate-900">{art.name}</h4>
                            <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                          </div>
                          <span className="text-xs text-[#006c49] font-semibold block">
                            {art.trade} • {art.subTrade}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <strong className="text-slate-700">{art.rating}</strong> ({art.reviewsCount} reviews) • {art.locality}
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 text-xs flex items-center justify-between">
                        <span className="text-slate-600 font-medium">
                          Fee: <strong className="text-[#006c49] font-bold">₹{art.visitFee}</strong> inspection
                        </span>
                        <span className="text-slate-600">
                          Ph: <strong className="text-slate-900">{art.phone}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => onShowToast(`Calling ${art.name} (${art.phone})...`)}
                          className="flex-1 py-1.5 px-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#006c49] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" /> Call
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onShowToast(`Opening WhatsApp chat with ${art.name} (${art.phone})...`)
                          }
                          className="flex-1 py-1.5 px-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SUB-VIEW: REQUEST DETAIL & OFFERS                        */}
          {/* ======================================================== */}
          {currentSubView === 'request-detail' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigateSubView('home')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Resident Home</span>
                </button>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    acceptedQuote
                      ? 'bg-[#006c49] text-white'
                      : 'bg-emerald-100 text-[#006c49]'
                  }`}
                >
                  {acceptedQuote
                    ? `Status: Assigned to ${acceptedQuote.artisanName}`
                    : `Status: ${quotes.length} Offers Received`}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Request Specs */}
                <div className="lg:col-span-7 bg-white rounded-xl p-5 shadow-xs border border-slate-100 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#006c49] uppercase tracking-wider">
                        Electrical Service
                      </span>
                      <h2 className="text-xl font-heading font-bold text-slate-900 mt-0.5">
                        Main MCB Tripping &amp; Inverter Setup
                      </h2>
                      <p className="text-xs text-slate-500">
                        Posted Today, 08:30 AM • Krishna Residency, Flat #402, Danavaipeta
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-900">
                      Budget: ₹300 - ₹500
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block mb-1">Issue Description by Ananya:</strong>
                    "Whenever master bedroom AC and kitchen geyser run together, the 32A MCB in the main DB
                    box trips immediately. Inverter is beeping overload warning. Need an electrician with
                    diagnostic clamp multimeter to check neutral load distribution."
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-900 block mb-2">
                      Attached Problem Photos
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg overflow-hidden border border-slate-200">
                        <img
                          alt="MCB Box"
                          className="w-full h-32 object-cover"
                          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80"
                        />
                        <span className="p-1.5 text-[10px] text-slate-500 bg-white block">
                          Photo 1: Main MCB Box &amp; Inverter Wire
                        </span>
                      </div>
                      <div className="rounded-lg overflow-hidden border border-slate-200">
                        <img
                          alt="Inverter Panel"
                          className="w-full h-32 object-cover"
                          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80"
                        />
                        <span className="p-1.5 text-[10px] text-slate-500 bg-white block">
                          Photo 2: Luminous Inverter Panel
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Requested Window: <strong className="text-slate-900">Tomorrow, 10:30 AM</strong>
                    </span>
                    <span className="text-[#006c49] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Pre-cleared at Gate Security
                    </span>
                  </div>
                </div>

                {/* Quotes List */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Available Service Offers ({quotes.length})
                  </h3>

                  {quotes.map((quote) => {
                    const isAccepted = acceptedQuote?.id === quote.id;
                    return (
                      <div
                        key={quote.id}
                        className={`rounded-xl bg-white p-4 shadow-xs relative flex flex-col gap-2.5 ${
                          isAccepted
                            ? 'border-2 border-emerald-500'
                            : quote.isTopRated
                            ? 'border-2 border-[#006c49]'
                            : 'border border-slate-200'
                        }`}
                      >
                        {quote.isTopRated && (
                          <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#006c49] text-white text-[10px] font-bold uppercase tracking-wider">
                            Top Rated Pro
                          </span>
                        )}

                        <div className="flex items-start gap-3 mt-1">
                          <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#006c49] font-bold text-base flex items-center justify-center border-2 border-[#006c49] shrink-0">
                            {quote.artisanName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-slate-900">{quote.artisanName}</h4>
                              <span className="text-base font-bold text-[#006c49]">
                                ₹{quote.quoteAmount}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 block">
                              {quote.trade} • {quote.experienceYears} yrs exp
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>
                                {quote.rating} ({quote.reviewsCount} reviews) • {quote.distanceKm} km away
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded leading-snug">
                          "{quote.note}"
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => onOpenMessagesModal('ananya')}
                            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Chat
                          </button>

                          {isAccepted ? (
                            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-[#006c49] text-xs font-bold flex items-center gap-1">
                              <Check className="w-4 h-4" /> Confirmed (₹{quote.quoteAmount})
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onAcceptQuote(quote)}
                              className="px-4 py-1.5 rounded-full bg-[#006c49] hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept Offer (₹{quote.quoteAmount})</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SUB-VIEW: PAYMENTS                                       */}
          {/* ======================================================== */}
          {currentSubView === 'payments' && (
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-slate-900">
                  Service Payments &amp; Receipts
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigateSubView('home')}
                  className="text-xs font-semibold text-[#006c49] underline cursor-pointer"
                >
                  Back to Dashboard
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-xs border border-slate-100 divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#006c49] flex items-center justify-center">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        M. Ravi - Wooden Door Alignment
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        Paid via UPI • 14 Days Warranty Active
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">₹450.00</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block">Completed</span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Danavaipeta Society RO Filter Service
                      </h4>
                      <span className="text-[11px] text-slate-500">Paid via NetBanking</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">₹850.00</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SUB-VIEW: PROFILE                                        */}
          {/* ======================================================== */}
          {currentSubView === 'profile' && (
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-slate-900">
                  Resident Profile &amp; Security
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigateSubView('home')}
                  className="text-xs font-semibold text-[#006c49] underline cursor-pointer"
                >
                  Back to Dashboard
                </button>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-100 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#006c49] text-white flex items-center justify-center text-xl font-bold">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{residentName}</h3>
                    <span className="text-xs text-[#006c49] font-semibold">
                      Verified Resident Pass #DNVP-RS-402
                    </span>
                    <span className="text-xs text-slate-500 block">Phone: +91 {residentPhone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 block font-medium">Flat Address</span>
                    <strong className="text-slate-900 block mt-0.5">{residentAddress}</strong>
                    <span className="text-slate-500">Main Road, Danavaipeta, Rajahmundry</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 block font-medium">Gate Security Code</span>
                    <strong className="text-slate-900 block mt-0.5">Intercom #0402</strong>
                    <span className="text-emerald-700">Pre-approved visitor clearance</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
