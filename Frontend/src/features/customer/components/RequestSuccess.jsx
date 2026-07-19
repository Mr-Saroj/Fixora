import React from 'react';

const RequestSuccess = ({ formData, uploadedPhotos, coordinates, handleReset, viewRequest }) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] p-10 text-center">
          {/* Animated Checkmark */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(16,185,129,0.4)]">
            <span className="material-symbols-outlined text-white text-[40px]">check</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Request Submitted!</h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed max-w-md mx-auto">
            Your service request has been received. We'll match you with a verified professional within minutes. You'll get a confirmation via SMS.
          </p>

          {/* Summary Card */}
          <div className="mt-8 bg-slate-50 rounded-xl p-5 text-left border border-slate-100">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4">REQUEST SUMMARY</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Request ID</span>
                <span className="font-mono font-bold text-slate-700">#FX-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Name</span>
                <span className="font-semibold text-slate-700">{formData.fullName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Category</span>
                <span className="font-semibold text-slate-700 capitalize">{formData.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Urgency</span>
                <span className={`font-bold ${formData.urgency === 'emergency' ? 'text-red-500' : 'text-[#004ac6]'}`}>
                  {formData.urgency === 'emergency' ? '🔴 Emergency' : '🔵 Standard'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Photos Attached</span>
                <span className="font-semibold text-slate-700">{uploadedPhotos.length} file(s)</span>
              </div>
              {coordinates && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Coordinates</span>
                  <span className="font-mono text-xs text-slate-500">{coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Another Request
            </button>
            <button
              onClick={viewRequest}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white font-semibold text-sm shadow-[0_8px_20px_-4px_rgba(0,74,198,0.3)] hover:shadow-[0_12px_25px_-4px_rgba(0,74,198,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              View Request
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequestSuccess;