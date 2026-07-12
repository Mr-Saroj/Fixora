import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { inputBaseClass } from '../utils/inputStyles';

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

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-4 mt-2 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all disabled:opacity-70 flex justify-center items-center"
      >
        {isLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;