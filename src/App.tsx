/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WelcomeSplash } from './components/WelcomeSplash';
import { TopQuickNav, ScreenView } from './components/TopQuickNav';
import { AuthPortal } from './components/AuthPortal';
import { AuthModal } from './components/AuthModal';
import { CreateAccountModal } from './components/CreateAccountModal';
import { LocationModal } from './components/LocationModal';
import { MessagesModal } from './components/MessagesModal';
import { ResidentPortal } from './components/ResidentPortal';
import { WorkerPortal } from './components/WorkerPortal';
import { Toast } from './components/Toast';
import {
  INITIAL_ARTISANS,
  INITIAL_JOBS,
  INITIAL_QUOTES,
  INITIAL_CHAT_THREADS,
  Locality,
  ChatThread,
} from './data/mockData';
import { ServiceJob, ServiceQuote } from './utils/serviceLogic';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<ScreenView>('welcome');
  const [residentSubView, setResidentSubView] = useState<
    'home' | 'request-detail' | 'messages' | 'payments' | 'profile'
  >('home');
  const [workerSubView, setWorkerSubView] = useState<'feed' | 'detail'>('feed');

  // Support ?autostart=1 or ?screen=... query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setCurrentView('resident-home');
    } else if (params.get('screen')) {
      const scr = params.get('screen') as ScreenView;
      if (
        [
          'welcome',
          'role-selection',
          'resident-home',
          'resident-request-detail',
          'worker-feed',
          'worker-detail',
        ].includes(scr)
      ) {
        setCurrentView(scr);
      }
    }
  }, []);

  // Locality
  const [currentLocality, setCurrentLocality] = useState('Danavaipeta Hub • Rajahmundry');
  const [currentWard, setCurrentWard] = useState('Ward 14');

  // Resident Profile State
  const [residentName, setResidentName] = useState('Ananya Sharma');
  const [residentAddress, setResidentAddress] = useState('Flat #402, Krishna Residency, Danavaipeta, Rajahmundry');
  const [residentPhone, setResidentPhone] = useState('9440123456');

  // Worker Profile State
  const [workerName, setWorkerName] = useState('Ramesh Kumar');
  const [workerRole, setWorkerRole] = useState('Electrician Pro');
  const [workerFee, setWorkerFee] = useState(299);
  const [isDutyOn, setIsDutyOn] = useState(true);

  // Data Collections
  const [jobs, setJobs] = useState<ServiceJob[]>(INITIAL_JOBS);
  const [artisans] = useState(INITIAL_ARTISANS);
  const [quotes, setQuotes] = useState<ServiceQuote[]>(INITIAL_QUOTES);
  const [acceptedQuote, setAcceptedQuote] = useState<ServiceQuote | null>(null);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState('ananya');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'resident' | 'worker'>('resident');

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerModalRole, setRegisterModalRole] = useState<'resident' | 'worker'>('resident');

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  // Master Navigation Handler
  const handleNavigate = (view: ScreenView) => {
    setCurrentView(view);
    if (view === 'resident-home') {
      setResidentSubView('home');
    } else if (view === 'resident-request-detail') {
      setResidentSubView('request-detail');
    } else if (view === 'worker-feed') {
      setWorkerSubView('feed');
    } else if (view === 'worker-detail') {
      setWorkerSubView('detail');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Sign In
  const handleOpenSignIn = (role: 'resident' | 'worker') => {
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  // Open Register
  const handleOpenRegister = (role: 'resident' | 'worker') => {
    setRegisterModalRole(role);
    setIsRegisterModalOpen(true);
  };

  // Verify Auth Success
  const handleAuthSuccess = (role: 'resident' | 'worker', phone: string) => {
    if (role === 'resident') {
      setResidentPhone(phone);
      showToast(`Welcome back, ${residentName}!`);
      handleNavigate('resident-home');
    } else {
      showToast(`Welcome back, ${workerName}!`);
      handleNavigate('worker-feed');
    }
  };

  // Register Resident
  const handleRegisterResident = (data: { name: string; phone: string; address: string }) => {
    setResidentName(data.name);
    setResidentPhone(data.phone);
    setResidentAddress(data.address);
    showToast(`Resident account created! Welcome ${data.name}.`);
    handleNavigate('resident-home');
  };

  // Register Worker
  const handleRegisterWorker = (data: {
    name: string;
    phone: string;
    address: string;
    trade: string;
    fee: number;
  }) => {
    setWorkerName(data.name);
    setWorkerRole(`${data.trade} Pro`);
    setWorkerFee(data.fee);
    showToast(`Worker account registered! Welcome ${data.name} (${data.trade}).`);
    handleNavigate('worker-feed');
  };

  // Add new job
  const handleAddNewJob = (trade: string, desc: string, slot: string, budget: number) => {
    const newJob: ServiceJob = {
      id: `job-${Date.now()}`,
      customerName: residentName,
      customerPhone: `+91 ${residentPhone}`,
      locality: currentLocality.split('•')[0].trim(),
      ward: currentWard,
      addressFull: residentAddress,
      trade,
      title: `${trade} Service (${desc.slice(0, 32)}...)`,
      description: desc,
      slot,
      budgetMin: budget,
      budgetMax: budget,
      isEmergency: false,
      distanceKm: 0.8,
      postedTimeAgo: 'Just now',
      status: 'open',
      photos: [],
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  // Accept Quote
  const handleAcceptQuote = (quote: ServiceQuote) => {
    setAcceptedQuote(quote);
    showToast(`Offer accepted! ${quote.artisanName} confirmed for tomorrow 10:30 AM.`);
  };

  // Select Locality
  const handleSelectLocality = (loc: Locality) => {
    setCurrentLocality(`${loc.name} Hub • Rajahmundry`);
    setCurrentWard(loc.ward);
    showToast(`Location set to ${loc.name} (${loc.ward}). Showing nearby pros.`);
  };

  // Send message inside modal
  const handleSendMessage = (threadId: string, text: string) => {
    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'worker' as const,
            senderName: workerName,
            text,
            time: 'Just now',
          };
          return {
            ...thread,
            lastMessage: text,
            lastTime: 'Just now',
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f6fbf6] text-[#171d1a] relative">
      {/* Top Quick Navigation helper for instant screen jumping */}
      <TopQuickNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Screen 1: Welcome Splash */}
      {currentView === 'welcome' && (
        <div className="pt-9">
          <WelcomeSplash
            currentLocality={currentLocality}
            onEnter={() => handleNavigate('resident-home')}
            onSignIn={() => handleNavigate('role-selection')}
            onOpenLocalityModal={() => setIsLocationModalOpen(true)}
          />
        </div>
      )}

      {/* Auth Portal / Role Selection */}
      {currentView === 'role-selection' && (
        <div className="pt-9">
          <AuthPortal
            onOpenSignIn={handleOpenSignIn}
            onOpenRegister={handleOpenRegister}
            onBackToSplash={() => handleNavigate('welcome')}
          />
        </div>
      )}

      {/* Resident Portal */}
      {(currentView === 'resident-home' || currentView === 'resident-request-detail') && (
        <ResidentPortal
          currentSubView={residentSubView}
          onNavigateSubView={(sub) => {
            setResidentSubView(sub);
            if (sub === 'home') setCurrentView('resident-home');
            if (sub === 'request-detail') setCurrentView('resident-request-detail');
          }}
          locality={currentLocality.split('•')[0].trim()}
          onOpenLocalityModal={() => setIsLocationModalOpen(true)}
          onOpenMessagesModal={(threadId) => {
            if (threadId) setActiveThreadId(threadId);
            setIsMessagesModalOpen(true);
          }}
          onSignOut={() => {
            showToast('Signed out successfully.');
            handleNavigate('role-selection');
          }}
          residentName={residentName}
          residentAddress={residentAddress}
          residentPhone={residentPhone}
          jobs={jobs}
          onAddNewJob={handleAddNewJob}
          artisans={artisans}
          quotes={quotes}
          onAcceptQuote={handleAcceptQuote}
          acceptedQuote={acceptedQuote}
          onShowToast={showToast}
        />
      )}

      {/* Worker Portal */}
      {(currentView === 'worker-feed' || currentView === 'worker-detail') && (
        <WorkerPortal
          currentSubView={workerSubView}
          onNavigateSubView={(sub) => {
            setWorkerSubView(sub);
            if (sub === 'feed') setCurrentView('worker-feed');
            if (sub === 'detail') setCurrentView('worker-detail');
          }}
          workerName={workerName}
          workerRole={workerRole}
          workerFee={workerFee}
          jobs={jobs}
          isDutyOn={isDutyOn}
          onToggleDuty={() => {
            setIsDutyOn((prev) => !prev);
            showToast(isDutyOn ? 'Duty paused. Job alerts snoozed.' : 'You are now ON DUTY and will receive Danavaipeta jobs.');
          }}
          onSignOut={() => {
            showToast('Signed out successfully.');
            handleNavigate('role-selection');
          }}
          onOpenMessagesModal={(threadId) => {
            if (threadId) setActiveThreadId(threadId);
            setIsMessagesModalOpen(true);
          }}
          onShowToast={showToast}
        />
      )}

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        targetRole={authModalRole}
        onVerifySuccess={handleAuthSuccess}
        onSwitchToRegister={handleOpenRegister}
        onShowToast={showToast}
      />

      <CreateAccountModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        initialRole={registerModalRole}
        onRegisterResident={handleRegisterResident}
        onRegisterWorker={handleRegisterWorker}
        onSwitchToSignIn={handleOpenSignIn}
        onShowToast={showToast}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocality={currentLocality}
        onSelectLocality={handleSelectLocality}
      />

      <MessagesModal
        isOpen={isMessagesModalOpen}
        onClose={() => setIsMessagesModalOpen(false)}
        threads={chatThreads}
        activeThreadId={activeThreadId}
        onSelectThread={(id) => setActiveThreadId(id)}
        onSendMessage={handleSendMessage}
        onShowToast={showToast}
      />

      {/* Floating Toast notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
