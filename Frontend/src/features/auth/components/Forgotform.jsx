import React, { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { sendForgotPasswordOtp } from '../services/authService';
import { inputBaseClass } from '../utils/inputStyles';

// ─── Step 1: Email Entry ─────────────────────────────────────────────────────
export const EmailStep = ({ onNext }) => {
  const { forgotPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) return;
    forgotPassword(email, onNext);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
          Registered Email Address
        </label>
        <input
          type="email"
          className={inputBaseClass}
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading || !email}
        className="w-full py-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all disabled:opacity-70 flex justify-center items-center"
      >
        {isLoading
          ? <span className="material-symbols-outlined animate-spin">progress_activity</span>
          : 'Send OTP'}
      </button>
    </div>
  );
};

// ─── Step 2: OTP Verification ────────────────────────────────────────────────
export const OtpStep = ({ email, onNext, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length < 6) return alert('Please enter the 6-digit OTP.');
    onNext(otpString);
  };

  const handleResend = async () => {
    try {
      await sendForgotPasswordOtp(email);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setResendCountdown(60);
      const timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch {
      alert('Failed to resend OTP.');
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-[14px] text-text-muted text-center">
        We sent a 6-digit OTP to <span className="font-bold text-text-main">{email}</span>
      </p>

      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-11 h-14 text-center text-[22px] font-bold border-2 border-black/10 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={isLoading || otp.join('').length < 6}
        className="w-full py-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all disabled:opacity-70 flex justify-center items-center"
      >
        {isLoading
          ? <span className="material-symbols-outlined animate-spin">progress_activity</span>
          : 'Verify OTP'}
      </button>

      <div className="text-center space-y-2">
        {resendCountdown > 0 ? (
          <p className="text-[13px] text-text-muted">Resend OTP in {resendCountdown}s</p>
        ) : (
          <button
            onClick={handleResend}
            className="text-[13px] font-bold text-primary hover:text-[#57dffe] transition-colors"
          >
            Resend OTP
          </button>
        )}
        <div>
          <button
            onClick={onBack}
            className="text-[13px] text-text-muted hover:text-text-main transition-colors"
          >
            ← Change email
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Step 3: New Password ────────────────────────────────────────────────────
export const NewPasswordStep = ({ email, otp }) => {
  const { resetUserPassword, isLoading } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = () => {
    if (newPassword.length < 6) return alert('Password must be at least 6 characters.');
    if (newPassword !== confirmPassword) return alert('Passwords do not match.');
    resetUserPassword(email, otp, newPassword);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className={inputBaseClass + ' pr-12'}
            placeholder="Minimum 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
          Confirm Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          className={inputBaseClass}
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleReset()}
        />
      </div>

      <button
        onClick={handleReset}
        disabled={isLoading || !newPassword || !confirmPassword}
        className="w-full py-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all disabled:opacity-70 flex justify-center items-center"
      >
        {isLoading
          ? <span className="material-symbols-outlined animate-spin">progress_activity</span>
          : 'Reset Password'}
      </button>
    </div>
  );
};