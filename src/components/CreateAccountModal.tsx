import React, { useState } from 'react';
import { X, Building2, Wrench, CheckCircle2, MessageSquare } from 'lucide-react';
import { validateMobileNumber, verifyOtp } from '../utils/serviceLogic';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole: 'resident' | 'worker';
  onRegisterResident: (data: { name: string; phone: string; address: string }) => void;
  onRegisterWorker: (data: { name: string; phone: string; address: string; trade: string; fee: number }) => void;
  onSwitchToSignIn: (role: 'resident' | 'worker') => void;
  onShowToast: (msg: string) => void;
}

export const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  isOpen,
  onClose,
  initialRole,
  onRegisterResident,
  onRegisterWorker,
  onSwitchToSignIn,
  onShowToast,
}) => {
  const [role, setRole] = useState<'resident' | 'worker'>(initialRole);

  // Resident form state
  const [resName, setResName] = useState('Ananya Sharma');
  const [resPhone, setResPhone] = useState('9440123456');
  const [resAddress, setResAddress] = useState('Flat #402, Krishna Residency, Danavaipeta, Rajahmundry');
  const [resOtp, setResOtp] = useState('4829');

  // Worker form state
  const [workerName, setWorkerName] = useState('Ramesh Kumar');
  const [workerPhone, setWorkerPhone] = useState('9876543210');
  const [workerAddress, setWorkerAddress] = useState('Danavaipeta Main Junction, Ward 14, Rajahmundry');
  const [workerTrade, setWorkerTrade] = useState('Electrician');
  const [workerFee, setWorkerFee] = useState(299);
  const [workerOtp, setWorkerOtp] = useState('4829');

  if (!isOpen) return null;

  const handleResidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMobileNumber(resPhone)) {
      onShowToast('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!verifyOtp(resOtp)) {
      onShowToast('Please verify with demo OTP 4829');
      return;
    }
    onRegisterResident({
      name: resName.trim() || 'Ananya Sharma',
      phone: resPhone.trim(),
      address: resAddress.trim(),
    });
    onClose();
  };

  const handleWorkerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMobileNumber(workerPhone)) {
      onShowToast('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!verifyOtp(workerOtp)) {
      onShowToast('Please verify with demo OTP 4829');
      return;
    }
    onRegisterWorker({
      name: workerName.trim() || 'Ramesh Kumar',
      phone: workerPhone.trim(),
      address: workerAddress.trim(),
      trade: workerTrade,
      fee: Number(workerFee) || 299,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header with Role switcher */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                role === 'resident' ? 'bg-[#006c49]' : 'bg-slate-900'
              }`}
            >
              {role === 'resident' ? <Building2 className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-slate-900">
                {role === 'resident' ? 'Create Resident Account' : 'Create Worker Account'}
              </h3>
              <p className="text-[11px] text-slate-500">Rajahmundry Municipal Ward 14 Directory</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Toggle Pills */}
        <div className="px-6 pt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setRole('resident')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'resident'
                ? 'bg-emerald-100 text-[#006c49] border-2 border-[#006c49]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Resident</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('worker')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'worker'
                ? 'bg-slate-900 text-white border-2 border-slate-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Worker / Artisan</span>
          </button>
        </div>

        {/* Resident Form */}
        {role === 'resident' ? (
          <form onSubmit={handleResidentSubmit} className="p-6 flex flex-col gap-4">
            <div>
              <label htmlFor="regResName" className="text-xs font-bold text-slate-900 block mb-1">
                Full Name
              </label>
              <input
                id="regResName"
                type="text"
                value={resName}
                onChange={(e) => setResName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
              />
            </div>

            <div>
              <label htmlFor="regResMobile" className="text-xs font-bold text-slate-900 block mb-1">
                10-Digit Mobile Number
              </label>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:border-[#006c49] focus-within:ring-1 focus-within:ring-[#006c49]">
                <span className="px-3 py-2 bg-slate-100 text-xs font-semibold text-slate-600 border-r border-slate-200 select-none">
                  🇮🇳 +91
                </span>
                <input
                  id="regResMobile"
                  type="tel"
                  maxLength={10}
                  value={resPhone}
                  onChange={(e) => setResPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="94401 23456"
                  required
                  className="w-full text-xs p-2.5 outline-none border-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="regResAddress" className="text-xs font-bold text-slate-900 block mb-1">
                Address / Apartment in Rajahmundry
              </label>
              <input
                id="regResAddress"
                type="text"
                value={resAddress}
                onChange={(e) => setResAddress(e.target.value)}
                placeholder="e.g. Krishna Residency, Flat #402, Danavaipeta"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
              />
            </div>

            {/* OTP Section */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#006c49]" />
                  <span>Enter OTP to verify number</span>
                </span>
                <span className="text-[10px] font-semibold text-[#006c49]">Demo OTP: 4829</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={resOtp}
                  onChange={(e) => setResOtp(e.target.value)}
                  className="w-28 text-center text-sm font-bold tracking-widest p-2 rounded-lg border border-slate-300 focus:border-[#006c49] outline-none bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setResOtp('4829');
                    onShowToast('OTP auto-filled: 4829');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#006c49] text-xs font-semibold cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#006c49] hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Create Resident Account &amp; Open Home</span>
            </button>

            <p className="text-center text-xs text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToSignIn('resident');
                }}
                className="font-bold text-[#006c49] underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          /* Worker Form */
          <form onSubmit={handleWorkerSubmit} className="p-6 flex flex-col gap-4">
            <div>
              <label htmlFor="regWorkerName" className="text-xs font-bold text-slate-900 block mb-1">
                Full Name
              </label>
              <input
                id="regWorkerName"
                type="text"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
              />
            </div>

            <div>
              <label htmlFor="regWorkerMobile" className="text-xs font-bold text-slate-900 block mb-1">
                10-Digit Mobile Number
              </label>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:border-[#006c49] focus-within:ring-1 focus-within:ring-[#006c49]">
                <span className="px-3 py-2 bg-slate-100 text-xs font-semibold text-slate-600 border-r border-slate-200 select-none">
                  🇮🇳 +91
                </span>
                <input
                  id="regWorkerMobile"
                  type="tel"
                  maxLength={10}
                  value={workerPhone}
                  onChange={(e) => setWorkerPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  required
                  className="w-full text-xs p-2.5 outline-none border-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="regWorkerAddress" className="text-xs font-bold text-slate-900 block mb-1">
                Address / Hub in Rajahmundry
              </label>
              <input
                id="regWorkerAddress"
                type="text"
                value={workerAddress}
                onChange={(e) => setWorkerAddress(e.target.value)}
                placeholder="e.g. Danavaipeta Main Junction, Ward 14"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="regWorkerTrade" className="text-xs font-bold text-slate-900 block mb-1">
                  Which type of work (Trade)
                </label>
                <select
                  id="regWorkerTrade"
                  value={workerTrade}
                  onChange={(e) => setWorkerTrade(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none bg-white"
                >
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="AC Service">AC Service</option>
                  <option value="Painter">Painter</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                </select>
              </div>

              <div>
                <label htmlFor="regWorkerFee" className="text-xs font-bold text-slate-900 block mb-1">
                  Visiting fee (₹)
                </label>
                <input
                  id="regWorkerFee"
                  type="number"
                  value={workerFee}
                  onChange={(e) => setWorkerFee(Number(e.target.value))}
                  placeholder="299"
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none"
                />
              </div>
            </div>

            {/* OTP Section */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#006c49]" />
                  <span>Enter OTP to verify number</span>
                </span>
                <span className="text-[10px] font-semibold text-[#006c49]">Demo OTP: 4829</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={workerOtp}
                  onChange={(e) => setWorkerOtp(e.target.value)}
                  className="w-28 text-center text-sm font-bold tracking-widest p-2 rounded-lg border border-slate-300 focus:border-[#006c49] outline-none bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setWorkerOtp('4829');
                    onShowToast('Worker verification code: 4829');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#006c49] text-xs font-semibold cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Create Worker Account &amp; Open Feed</span>
            </button>

            <p className="text-center text-xs text-slate-500">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToSignIn('worker');
                }}
                className="font-bold text-[#006c49] underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
