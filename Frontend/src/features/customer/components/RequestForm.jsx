import React from 'react';

const RequestForm = ({
  formData,
  handleInputChange,
  setFormData,
  uploadedPhotos,
  locationStatus,
  coordinates,
  fileInputRef,
  fetchCurrentLocation,
  handlePhotoUpload,
  removePhoto,
  handleSubmit,
  handleReset,
  isSubmitting,
}) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-[#004ac6]/10 to-[#57dffe]/5 rounded-xl border border-[#004ac6]/10">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">assignment</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Create Service Request</h1>
            <p className="text-sm text-slate-400">Fill in the details below and we'll connect you with a verified professional.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 pb-12">

        {/* --- Section 1: Personal Information --- */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">person</span>
            <h2 className="font-bold text-slate-800 text-sm tracking-tight">Personal Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">badge</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., Alex Johnson"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-bold">+1</span>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="(555) 123-4567"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 text-[18px]">phone_iphone</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 2: Service Details --- */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">build</span>
            <h2 className="font-bold text-slate-800 text-sm tracking-tight">Service Details</h2>
          </div>
          <div className="p-6 space-y-5">
            {/* Category + Urgency Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Service Category <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">category</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>Select a category...</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="appliance">Appliance Repair</option>
                    <option value="other">Other</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 text-[18px] pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Urgency Level</label>
                <div className="flex gap-2 h-[42px]">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setFormData((prev) => ({ ...prev, urgency: 'standard' }))}
                    className={`flex-1 rounded-xl text-xs font-bold transition-all duration-200 border flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed
                      ${formData.urgency === 'standard'
                        ? 'bg-[#004ac6]/10 text-[#004ac6] border-[#004ac6]/30 shadow-sm'
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    Standard
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setFormData((prev) => ({ ...prev, urgency: 'emergency' }))}
                    className={`flex-1 rounded-xl text-xs font-bold transition-all duration-200 border flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed
                      ${formData.urgency === 'emergency'
                        ? 'bg-red-50 text-red-500 border-red-200 shadow-sm'
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">emergency</span>
                    Emergency
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Issue Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                rows={4}
                placeholder="Describe the issue in detail. E.g., The kitchen faucet is leaking from the base, and there's water pooling under the sink cabinet..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all resize-none leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-slate-400">Be specific for faster matching</span>
                <span className="text-[11px] text-slate-400 font-mono">{formData.description.length}/500</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 3: Location --- */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">location_on</span>
            <h2 className="font-bold text-slate-800 text-sm tracking-tight">Service Location</h2>
          </div>
          <div className="p-6 space-y-4">
            {/* Location Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">pin_drop</span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your full address manually..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Fetch Location Button */}
            <button
              type="button"
              onClick={fetchCurrentLocation}
              disabled={locationStatus === 'fetching' || isSubmitting}
              className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                ${locationStatus === 'fetching'
                  ? 'bg-[#004ac6]/5 border-[#004ac6]/20 text-[#004ac6] cursor-wait'
                  : locationStatus === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                    : locationStatus === 'error'
                      ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-[#004ac6]/5 hover:border-[#004ac6]/20 hover:text-[#004ac6]'
                }`}
            >
              {locationStatus === 'fetching' ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#004ac6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Detecting your location...
                </>
              ) : locationStatus === 'success' ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Location detected successfully
                </>
              ) : locationStatus === 'error' ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  Location access denied — enter manually
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">my_location</span>
                  Use Current Location
                </>
              )}
            </button>

            {/* Coordinates Display */}
            {coordinates && (
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">gps_fixed</span>
                <div className="flex-1">
                  <span className="text-[11px] text-slate-400 font-medium block">GPS COORDINATES</span>
                  <span className="text-xs font-mono text-slate-600">
                    {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">ACCURATE</span>
              </div>
            )}
          </div>
        </div>

        {/* --- Section 4: Photo Upload --- */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">photo_camera</span>
              <h2 className="font-bold text-slate-800 text-sm tracking-tight">Damage Photos</h2>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Optional but recommended</span>
          </div>
          <div className="p-6">
            {/* Upload Area */}
            <div
              onClick={() => !isSubmitting && fileInputRef.current?.click()}
              className={`border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center transition-all duration-200 group ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-[#004ac6]/40 hover:bg-[#004ac6]/[0.02]'
                }`}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-[#004ac6]/5 group-hover:border-[#004ac6]/20 transition-all duration-200">
                <span className="material-symbols-outlined text-slate-300 text-[32px] group-hover:text-[#004ac6] transition-colors duration-200">cloud_upload</span>
              </div>
              <p className="text-sm font-semibold text-slate-600 group-hover:text-[#004ac6] transition-colors">
                Click to upload photos
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP up to 10MB each • Max 5 photos</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploadedPhotos.length >= 5 || isSubmitting}
              />
            </div>

            {/* Photo Previews Grid */}
            {uploadedPhotos.length > 0 && (
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {uploadedPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group/photo rounded-xl overflow-hidden border border-slate-100 shadow-sm aspect-square"
                  >
                    <img
                      src={photo.preview}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1">
                      <span className="text-white text-[10px] font-medium truncate px-2 max-w-full">{photo.name}</span>
                      <span className="text-white/60 text-[10px]">{photo.size}</span>
                    </div>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(index);
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-sm disabled:opacity-0"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                    <div className="absolute bottom-1.5 left-1.5 w-5 h-5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                ))}

                {uploadedPhotos.length < 5 && (
                  <div
                    onClick={() => !isSubmitting && fileInputRef.current?.click()}
                    className={`aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center transition-all duration-200 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-[#004ac6]/40 hover:bg-[#004ac6]/[0.02]'
                      }`}
                  >
                    <span className="material-symbols-outlined text-slate-300 text-[24px]">add</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Add</span>
                  </div>
                )}
              </div>
            )}

            {uploadedPhotos.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500 text-[16px]">check_circle</span>
                <span className="text-xs text-slate-500">
                  <span className="font-bold text-slate-700">{uploadedPhotos.length}</span>/5 photos attached
                </span>
              </div>
            )}
          </div>
        </div>

        {/* --- Submit Actions --- */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            Clear Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white font-bold text-sm shadow-[0_10px_20px_-5px_rgba(0,74,198,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(0,74,198,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span className={`material-symbols-outlined text-[18px] ${isSubmitting ? 'animate-spin' : ''}`}>
              {isSubmitting ? 'progress_activity' : 'send'}
            </span>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default RequestForm;