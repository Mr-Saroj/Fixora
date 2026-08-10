import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { inputBaseClass } from '../utils/inputStyles';
import GradientButton from '../../../components/ui/GradientButton';


const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Email Address</label>
        <input 
          type="email" 
          required
          className={inputBaseClass}
          placeholder="name@example.com" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[13px] font-bold text-text-main uppercase">Password</label>
          <a href="/forgot-password" className="text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
            Forgot?
          </a>
        </div>
        <input 
          type="password" 
          required
          className={inputBaseClass}
          placeholder="••••••••" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
      </div>

      {/* ── Replaced raw <button> with GradientButton ── */}
      <GradientButton
        type="submit"
        size="xl"
        disabled={isLoading}
        className="w-full mt-2 font-bold text-[16px]"
      >
        {isLoading ? (
          <span className="material-symbols-outlined animate-spin">
            progress_activity
          </span>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">login</span>
            Sign In
          </>
        )}
      </GradientButton>

    </form>
  );
};

export default LoginForm;