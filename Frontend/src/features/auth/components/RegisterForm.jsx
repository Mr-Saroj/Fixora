import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { inputBaseClass } from '../utils/inputStyles';
import { roleConfig } from '../utils/roleConfig';
import { technicianTypes } from '../utils/technicianTypes';

const RegisterForm = () => {
  const { register, isLoading } = useAuth();
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    technicianType: '',
    state: '',
    district: '',
    city: '',
    pinCode: ''
  });

  const containerRef = useRef(null);
  const customerBtnRef = useRef(null);
  const technicianBtnRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    const activeBtn = role === 'customer' ? customerBtnRef.current : technicianBtnRef.current;

    if (container && activeBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      setPillStyle({
        width: btnRect.width,
        height: btnRect.height,
        transform: `translateX(${btnRect.left - containerRect.left}px)`,
      });
    }
  }, [role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ ...formData, role });
  };

  const activeConfig = roleConfig[role];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div
          ref={containerRef}
          className="relative bg-surface-container-high p-1 rounded-2xl flex items-center shadow-inner"
        >
          {/* Sliding Pill */}
          <div
            className="absolute top-1 left-1 bg-primary/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={pillStyle}
          />

          <button
            ref={customerBtnRef}
            type="button"
            onClick={() => setRole('customer')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-[14px] font-bold rounded-xl transition-colors duration-300 ${
              role === 'customer' ? 'text-primary' : 'text-text-muted hover:text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            Customer
          </button>

          <button
            ref={technicianBtnRef}
            type="button"
            onClick={() => setRole('technician')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-[14px] font-bold rounded-xl transition-colors duration-300 ${
              role === 'technician' ? 'text-primary' : 'text-text-muted hover:text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">construction</span>
            Technician
          </button>
        </div>

        <div className="flex items-center gap-2 px-1 overflow-hidden">
          <span
            key={`icon-${role}`}
            className="material-symbols-outlined text-primary text-[18px] animate-fade-in"
          >
            {activeConfig.icon}
          </span>
          <p
            key={`desc-${role}`}
            className="text-[13px] text-text-muted animate-fade-in"
          >
            {activeConfig.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputBaseClass}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputBaseClass}
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputBaseClass}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {role === 'technician' && (
          <div className="space-y-4 animate-fade-in-down">

            {/* Technician Type Dropdown */}
            <div>
              <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center">
                Technician Type
                <span className="material-symbols-outlined text-[16px] text-primary ml-1">
                  engineering
                </span>
              </label>
              <div className="relative">
                <select
                  name="technicianType"
                  required
                  value={formData.technicianType}
                  onChange={handleChange}
                  className={`${inputBaseClass} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Select your expertise
                  </option>
                  {technicianTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center">
                State
                <span className="material-symbols-outlined text-[16px] text-primary ml-1">
                  map
                </span>
              </label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="e.g. California"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center">
                District
                <span className="material-symbols-outlined text-[16px] text-primary ml-1">
                  location_city
                </span>
              </label>
              <input
                type="text"
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="e.g. Los Angeles County"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center">
                City
                <span className="material-symbols-outlined text-[16px] text-primary ml-1">
                  location_on
                </span>
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="e.g. Los Angeles"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center">
                PIN Code
                <span className="material-symbols-outlined text-[16px] text-primary ml-1">
                  pin_drop
                </span>
              </label>
              <input
                type="text"
                name="pinCode"
                required
                value={formData.pinCode}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="e.g. 90001"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className={inputBaseClass}
            placeholder="Create a strong password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 hover:shadow-[0_12px_24px_-5px_rgba(0,74,198,0.5)] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <span className="material-symbols-outlined animate-spin text-[22px]">
              progress_activity
            </span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">
                {role === 'customer' ? 'person_add' : 'badge'}
              </span>
              {role === 'customer' ? 'Create Customer Account' : 'Create Technician Account'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;