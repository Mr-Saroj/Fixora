import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { roleConfig } from '../utils/roleConfig';
import { technicianTypes } from '../utils/technicianTypes';
import GradientButton from '../../../components/ui/GradientButton';
import FormInput from '../../../components/ui/FormInput';
import FormSelect from '../../../components/ui/FormSelect';
import UploadBox from '../../../components/ui/UploadBox';


// ─────────────────────────────────────────────────────────────────
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

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [govtIdPhoto, setGovtIdPhoto] = useState(null);
  const profilePhotoRef = useRef(null);
  const govtIdPhotoRef = useRef(null);

  const containerRef = useRef(null);
  const customerBtnRef = useRef(null);
  const technicianBtnRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  // ── Sliding pill position ──
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

  // ── Revoke blob URLs only on unmount ──
  const profilePreviewRef = useRef(null);
  const govtPreviewRef = useRef(null);

  useEffect(() => { profilePreviewRef.current = profilePhoto?.preview; }, [profilePhoto]);
  useEffect(() => { govtPreviewRef.current = govtIdPhoto?.preview; }, [govtIdPhoto]);

  useEffect(() => {
    return () => {
      if (profilePreviewRef.current) URL.revokeObjectURL(profilePreviewRef.current);
      if (govtPreviewRef.current) URL.revokeObjectURL(govtPreviewRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSinglePhoto = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    setter({ file, preview: URL.createObjectURL(file) });
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      ...formData,
      role,
      profilePhotoFile: profilePhoto?.file ?? null,
      govtIdPhotoFile: govtIdPhoto?.file ?? null,
    });
  };

  const activeConfig = roleConfig[role];

  return (
    <div className="space-y-6">

      {/* ── Role Toggle ── */}
      <div className="space-y-3">
        <div
          ref={containerRef}
          className="relative bg-surface-container-high p-1 rounded-2xl flex items-center shadow-inner"
        >
          <div
            className="absolute top-1 left-1 bg-primary/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={pillStyle}
          />
          <button
            ref={customerBtnRef}
            type="button"
            onClick={() => setRole('customer')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-[14px] font-bold rounded-xl transition-colors duration-300 ${role === 'customer' ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            Customer
          </button>
          <button
            ref={technicianBtnRef}
            type="button"
            onClick={() => setRole('technician')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-[14px] font-bold rounded-xl transition-colors duration-300 ${role === 'technician' ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
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
          <p key={`desc-${role}`} className="text-[13px] text-text-muted animate-fade-in">
            {activeConfig.description}
          </p>
        </div>
      </div>

      {/* ── Form ── */}
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
          placeholder="+1 (555) 000-0000"
          required
        />

        {/* ── Technician-only fields ── */}
        {role === 'technician' && (
          <div className="space-y-4 animate-fade-in-down">

            <FormSelect
              label="Technician Type"
              name="technicianType"
              icon="engineering"
              value={formData.technicianType}
              onChange={handleChange}
              options={technicianTypes}
              placeholder="Select your expertise"
              required
            />

            <FormInput
              label="State"
              name="state"
              icon="map"
              value={formData.state}
              onChange={handleChange}
              placeholder="e.g. California"
              required
            />

            <FormInput
              label="District"
              name="district"
              icon="location_city"
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g. Los Angeles County"
              required
            />

            <FormInput
              label="City"
              name="city"
              icon="location_on"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Los Angeles"
              required
            />

            <FormInput
              label="PIN Code"
              name="pinCode"
              icon="pin_drop"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="e.g. 90001"
              required
            />

            <UploadBox
              label="Profile Photo"
              icon="account_circle"
              preview={profilePhoto?.preview}
              inputRef={profilePhotoRef}
              onChange={(e) => handleSinglePhoto(e, setProfilePhoto)}
              onRemove={() => {
                if (profilePhoto?.preview) URL.revokeObjectURL(profilePhoto.preview);
                setProfilePhoto(null);
              }}
            />

            <UploadBox
              label="Government ID Proof"
              icon="badge"
              preview={govtIdPhoto?.preview}
              inputRef={govtIdPhotoRef}
              onChange={(e) => handleSinglePhoto(e, setGovtIdPhoto)}
              onRemove={() => {
                if (govtIdPhoto?.preview) URL.revokeObjectURL(govtIdPhoto.preview);
                setGovtIdPhoto(null);
              }}
            />

          </div>
        )}

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
            <span className="material-symbols-outlined animate-spin text-[22px]">progress_activity</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">
                {role === 'customer' ? 'person_add' : 'badge'}
              </span>
              {role === 'customer' ? 'Create Customer Account' : 'Create Technician Account'}
            </>
          )}
        </GradientButton>

      </form>
    </div>
  );
};

export default RegisterForm;