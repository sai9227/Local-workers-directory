import React, { useState } from 'react';
import { X, Building2, Wrench, ShieldCheck, CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react';
import { validateMobileNumber, verifyOtp } from '../utils/serviceLogic';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole: 'resident' | 'worker';
  onVerifySuccess: (role: 'resident' | 'worker', phone: string) => void;
  onSwitchToRegister: (role: 'resident' | 'worker') => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  targetRole,
  onVerifySuccess,
  onSwitchToRegister,
  onShowToast,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('4829');
  const [resendCountdown, setResendCountdown] = useState(24);

  if (!isOpen) return null;

  const isResident = targetRole === 'resident';

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMobileNumber(phone)) {
      onShowToast('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep('otp');
    setOtp('4829');
    onShowToast(`OTP 4829 sent to +91 ${phone}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyOtp(otp)) {
      onShowToast('Invalid code. Use demo code 4829');
      return;
    }
    onVerifySuccess(targetRole, phone);
    onClose();
    setStep('phone');
  };

  const handleResend = () => {
    setOtp('4829');
    setResendCountdown(30);
    onShowToast(`Resent code 4829 to +91 ${phone}`);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                isResident ? 'bg-[#006c49]' : 'bg-slate-900'
              }`}
            >
              {isResident ? <Building2 className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-slate-900">
                {isResident ? 'Sign In as Resident' : 'Sign In as Worker'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isResident
                  ? 'Access your home service requests & bookings'
                  : 'Access live customer job requests & earnings'}
              </p>
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

        <div className="p-6">
          {step === 'phone' ? (
            /* STEP 1: Phone Input */
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label htmlFor="loginMobile" className="text-xs font-bold text-slate-900 block mb-1.5">
                  Enter your 10-digit mobile number and get OTP
                </label>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:border-[#006c49] focus-within:ring-1 focus-within:ring-[#006c49] bg-white">
                  <span className="px-3.5 py-2.5 bg-slate-100 text-xs font-semibold text-slate-600 border-r border-slate-300 flex items-center gap-1 select-none">
                    🇮🇳 +91
                  </span>
                  <input
                    id="loginMobile"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full text-sm font-semibold p-2.5 outline-none border-none text-slate-900"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  A 4-digit verification code will be sent instantly.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006c49] hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get OTP</span>
                <MessageSquare className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToRegister(targetRole);
                    }}
                    className="font-bold text-[#006c49] hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* STEP 2: OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center pb-1">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#006c49] inline-flex items-center justify-center mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Enter your OTP and verify</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sent to <span className="font-semibold text-slate-900">+91 {phone}</span>
                </p>
              </div>

              <div>
                <label htmlFor="otpInputField" className="text-xs font-bold text-slate-900 block mb-1.5 text-center">
                  4-Digit Security Code
                </label>
                <div className="flex justify-center gap-3">
                  <input
                    id="otpInputField"
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-xl font-bold tracking-widest w-36 py-2 border-2 border-[#006c49] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006c49] text-[#006c49] bg-emerald-50/40"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-4">
                  <span>Resend in 0:{resendCountdown > 9 ? resendCountdown : `0${resendCountdown}`}</span>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#006c49] font-bold hover:underline cursor-pointer"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006c49] hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isResident ? 'Verify & Open Resident Home' : 'Verify & Open Worker Job Feed'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-xs font-semibold text-slate-500 hover:text-slate-800 text-center flex items-center justify-center gap-1 pt-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Mobile Number</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
