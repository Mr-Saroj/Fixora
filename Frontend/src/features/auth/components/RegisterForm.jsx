import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const RegisterForm = () => {
  const { register, isLoading } = useAuth();
  const [role, setRole] = useState('customer'); // 'customer' | 'technician'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    location: '' // Only used if role === 'technician'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ ...formData, role });
  };

  return (
    <div className="space-y-6">
      {/* Role Toggle Switch */}
      <div className="bg-surface-container-high p-1 rounded-xl flex items-center relative shadow-inner">
        <button
          type="button"
          onClick={() => setRole('customer')}
          className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all duration-300 z-10 ${
            role === 'customer' ? 'bg-white text-primary shadow-[0_2px_10px_rgba(0,0,0,0.05)]' : 'text-text-muted hover:text-text-main'
          }`}
        >
          Customer
        </button>
        <button
          type="button"
          onClick={() => setRole('technician')}
          className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all duration-300 z-10 ${
            role === 'technician' ? 'bg-white text-primary shadow-[0_2px_10px_rgba(0,0,0,0.05)]' : 'text-text-muted hover:text-text-main'
          }`}
        >
          Technician
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Shared Fields */}
        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Full Name</label>
          <input 
            type="text" name="name" required value={formData.name} onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] bg-surface-bright focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px] transition-all" 
            placeholder="John Doe" 
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Email Address</label>
          <input 
            type="email" name="email" required value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] bg-surface-bright focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px] transition-all" 
            placeholder="name@example.com" 
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Mobile Number</label>
          <input 
            type="tel" name="phone" required value={formData.phone} onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] bg-surface-bright focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px] transition-all" 
            placeholder="+1 (555) 000-0000" 
          />
        </div>

        {/* Technician Only Field */}
        {role === 'technician' && (
          <div className="animate-fade-in-down">
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center">
              Work Location <span className="material-symbols-outlined text-[16px] text-primary ml-1">location_on</span>
            </label>
            <select 
              name="location" required value={formData.location} onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] bg-surface-bright focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px] transition-all appearance-none"
            >
              <option value="" disabled>Select your primary service area</option>
              <option value="metro-city">Metro City Center</option>
              <option value="north-hills">North Hills District</option>
              <option value="south-bay">South Bay Area</option>
              <option value="west-valley">West Valley</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Password</label>
          <input 
            type="password" name="password" required value={formData.password} onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] bg-surface-bright focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px] transition-all" 
            placeholder="Create a strong password" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 mt-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all disabled:opacity-70 flex justify-center items-center"
        >
          {isLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;