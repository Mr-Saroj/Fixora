
import React, { useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { roleConfig } from '../utils/roleConfig';

import GradientButton from '../../../components/ui/GradientButton';
import FormInput from '../../../components/ui/FormInput';

const RegisterForm = () => {

  const { register, isLoading } = useAuth();

  const [role, setRole] = useState('customer');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      role: role.toUpperCase()
    };

    register(payload);
  };

  const activeConfig = roleConfig[role];

  return (
    <div className="space-y-6">

      {/* Role Toggle */}
      <div className="space-y-3">

        <div className="relative bg-surface-container-high p-1 rounded-2xl flex items-center shadow-inner">

          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[14px] font-bold rounded-xl transition-colors ${
              role === 'customer'
                ? 'bg-primary/10 text-primary'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              person
            </span>
            Customer
          </button>

          <button
            type="button"
            onClick={() => setRole('technician')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[14px] font-bold rounded-xl transition-colors ${
              role === 'technician'
                ? 'bg-primary/10 text-primary'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              construction
            </span>
            Technician
          </button>

        </div>

        <div className="flex items-center gap-2 px-1">

          <span className="material-symbols-outlined text-primary text-[18px]">
            {activeConfig.icon}
          </span>

          <p className="text-[13px] text-text-muted">
            {activeConfig.description}
          </p>

        </div>

      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          required
        />

        <FormInput
          label="Mobile Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter mobile number"
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
          required
        />

        <GradientButton
          type="submit"
          size="xl"
          disabled={isLoading}
          className="w-full mt-4 gap-2 font-bold text-[16px]"
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

              {role === 'customer'
                ? 'Create Customer Account'
                : 'Create Technician Account'}
            </>
          )}

        </GradientButton>

      </form>

    </div>
  );
};

export default RegisterForm;
