// src/pages/TechnicianProfile.jsx
import React from 'react';
import {
  User,
  MapPin,
  BriefcaseBusiness,
  Image,
  ShieldCheck,
  Pencil,
  Save,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  Camera,
  ExternalLink
} from 'lucide-react';

import useTechnicianProfile, {
  TECHNICIAN_TYPES
} from '../hooks/useTechnicianProfile';
import TechnicianProfileSkeleton from '../Skelitons/TechnicianProfileSkeleton';

/* ---------- Fixora theme tokens ---------- */
const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none sm:py-3 transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100';

const labelClass = 'mb-2 block text-sm font-semibold text-slate-700';

const readOnlyClass =
  'rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 sm:py-3';

const cardClass =
  'rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_14px_rgba(15,23,42,0.06)] sm:p-5 md:p-7';

const pillClass =
  'inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500';

const primaryBtn =
  'flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg sm:py-3 shadow-blue-500/30 transition hover:from-blue-800 hover:to-blue-600 disabled:opacity-60';

const LOCATION_FIELDS = [
  ['state', 'State'],
  ['district', 'District'],
  ['city', 'City'],
  ['pinCode', 'PIN Code']
];

/* ---------- Small presentational pieces ---------- */
const SectionHeader = ({ icon: Icon, title, subtitle, tint }) => (
  <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${tint}`}>
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  </div>
);

const ImagePreview = ({ src, alt, emptyIcon: EmptyIcon, emptyText }) => (
  <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 sm:h-44 md:h-48">
    {src ? (
      <img src={src} alt={alt} className="h-full w-full object-contain" />
    ) : (
      <div className="text-center text-slate-400">
        <EmptyIcon size={30} className="mx-auto mb-2" />
        <p className="text-xs">{emptyText}</p>
      </div>
    )}
  </div>
);

/* ---------- Page ---------- */
const TechnicianProfile = () => {
  const {
    form,
    loading,
    saving,
    editing,
    profileExists,
    profileComplete,
    message,
    error,
    loadProfile,
    handleChange,
    handleSubmit,
    startEditing,
    cancelEditing
  } = useTechnicianProfile();

  if (loading) {
    return <TechnicianProfileSkeleton />;
  }

  if (error && !profileExists && !editing) {
    return (
      <div className="m-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        <AlertCircle size={18} />
        <span>{error}</span>
        <button onClick={loadProfile} className="ml-2 font-semibold underline">
          Retry
        </button>
      </div>
    );
  }

  const typeLabel = form.technicianType
    ? form.technicianType.replaceAll('_', ' ')
    : '';

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-3 sm:space-y-7 sm:p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl text-slate-900 md:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your professional information and identity details.
          </p>
        </div>

        {!editing && profileExists && (
          <button onClick={startEditing} className={primaryBtn}>
            <Pencil size={16} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Alerts */}
      {message && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Profile overview */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_14px_rgba(15,23,42,0.06)]">
        <div className="h-16 bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 sm:h-28" />

        <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-end sm:gap-4 sm:px-6 sm:pb-6">
          <div className="-mt-9 flex h-[72px] w-[72px] shrink-0 sm:-mt-12 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-50 shadow-md">
            {form.profilePhotoUrl ? (
              <img
                src={form.profilePhotoUrl}
                alt="Technician"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <User size={38} className="text-blue-600" />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold sm:text-xl text-slate-900">
              {typeLabel || 'Technician Profile'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {form.city
                ? `${form.city}, ${form.district}, ${form.state}`
                : 'Add your professional location'}
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider sm:self-auto ${
              profileComplete
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-amber-50 text-amber-600'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                profileComplete ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            {profileComplete ? 'Profile Complete' : 'Profile Incomplete'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Professional information */}
        <section className={cardClass}>
          <SectionHeader
            icon={BriefcaseBusiness}
            title="Professional Information"
            subtitle="Your service category"
            tint="bg-blue-50 text-blue-600"
          />

          <div className="max-w-xl">
            <label className={labelClass}>Technician Type</label>

            {editing ? (
              <select
                name="technicianType"
                value={form.technicianType}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select technician type</option>
                {TECHNICIAN_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.replaceAll('_', ' ')}
                  </option>
                ))}
              </select>
            ) : (
              <p className={readOnlyClass}>{typeLabel || 'Not provided'}</p>
            )}
          </div>
        </section>

        {/* Location information */}
        <section className={cardClass}>
          <SectionHeader
            icon={MapPin}
            title="Location Information"
            subtitle="Your service area and address location"
            tint="bg-sky-50 text-sky-600"
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {LOCATION_FIELDS.map(([name, label]) => (
              <div key={name}>
                <label className={labelClass}>{label}</label>

                {editing ? (
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    maxLength={name === 'pinCode' ? 6 : undefined}
                    inputMode={name === 'pinCode' ? 'numeric' : undefined}
                    className={inputClass}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <p className={readOnlyClass}>{form[name] || 'Not provided'}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Identity documents */}
        <section className={cardClass}>
          <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
            <SectionHeader
              icon={ShieldCheck}
              title="Identity & Profile Photos"
              subtitle="Your profile and verification document URLs"
              tint="bg-indigo-50 text-indigo-600"
            />
            <span className={pillClass}>Verification</span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {/* Profile photo */}
            <div className="space-y-3">
              <label className={labelClass}>Profile Photo URL</label>

              {editing && (
                <input
                  type="url"
                  name="profilePhotoUrl"
                  value={form.profilePhotoUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/profile.jpg"
                  className={inputClass}
                />
              )}

              <ImagePreview
                src={form.profilePhotoUrl}
                alt="Profile preview"
                emptyIcon={Camera}
                emptyText="No profile image added"
              />
            </div>

            {/* Government ID */}
            <div className="space-y-3">
              <label className={labelClass}>Government ID Photo URL</label>

              {editing && (
                <input
                  type="url"
                  name="govtIdPhotoUrl"
                  value={form.govtIdPhotoUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/id.jpg"
                  className={inputClass}
                />
              )}

              <ImagePreview
                src={form.govtIdPhotoUrl}
                alt="Government ID preview"
                emptyIcon={Image}
                emptyText="No ID image added"
              />

              {form.govtIdPhotoUrl && (
                <a
                  href={form.govtIdPhotoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                >
                  View document <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Actions */}
        {editing && (
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            {profileExists && (
              <button
                type="button"
                onClick={cancelEditing}
                disabled={saving}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:py-3"
              >
                Cancel
              </button>
            )}

            <button type="submit" disabled={saving} className={primaryBtn}>
              {saving ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Profile
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TechnicianProfile;