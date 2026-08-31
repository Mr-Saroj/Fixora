import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { EmailStep, OtpStep, NewPasswordStep } from '../components/Forgotform';

const STEP_CONFIG = {
  1: { title: 'Forgot Password', subtitle: "Enter your registered email and we'll send you an OTP." },
  2: { title: 'Enter OTP',       subtitle: 'Check your inbox (and spam folder) for the 6-digit code.' },
  3: { title: 'New Password',    subtitle: 'Choose a strong new password for your account.' },
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const { title, subtitle } = STEP_CONFIG[step];

  return (
    <AuthLayout title={title} subtitle={subtitle}>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
                s <= step
                  ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white shadow-md'
                  : 'bg-black/5 text-text-muted'
              }`}
            >
              {s < step
                ? <span className="material-symbols-outlined text-[16px]">check</span>
                : s}
            </div>
            {s < 3 && (
              <div className={`h-[2px] w-8 rounded-full transition-all ${s < step ? 'bg-primary' : 'bg-black/10'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <EmailStep
          onNext={(email) => { setEmail(email); setStep(2); }}
        />
      )}
      {step === 2 && (
        <OtpStep
          email={email}
          onNext={(otp) => { setOtp(otp); setStep(3); }}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <NewPasswordStep email={email} otp={otp} />
      )}

      <div className="mt-8 pt-6 border-t border-black/[0.05] text-center">
        <p className="text-[14px] text-text-muted">
          Remembered your password?{' '}
          <a href="/login" className="font-bold text-primary hover:text-[#57dffe] transition-colors">
            Sign in
          </a>
        </p>
      </div>

    </AuthLayout>
  );
};

export default ForgotPassword;