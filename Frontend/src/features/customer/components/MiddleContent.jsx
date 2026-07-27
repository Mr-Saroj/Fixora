import React from 'react';
import { useDashboardData, STATUS_STEPS, getStepIndex, getCategoryIcon, formatDate } from '../hooks/useDashboardData';

const MiddleContent = () => {
  const {
    selectedUrgency,
    setSelectedUrgency,
    loading,
    error,
    fetchRequests,
    currentJob,
    recentActivity,
    stats,
    locationStatus,
    locationError,
    locationAccuracy,
    canShareLocation,
    handleShareLocation,
  } = useDashboardData();

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.12)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{stat.sub}</span>
            </div>
            <h3 className="text-sm text-slate-400 font-medium">{stat.label}</h3>
            <p className="text-2xl font-extrabold text-slate-800 mt-1 tracking-tight">
              {loading ? '—' : stat.value}
            </p>
          </div>
        ))}
      </section>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4 mb-6 flex items-center justify-between">
          {error}
          <button onClick={fetchRequests} className="font-bold underline">Retry</button>
        </div>
      )}

      {/* Main Grid: Map/Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

        {/* Left: Map & Status */}
        <div className="lg:col-span-8 space-y-6">
          {/* Technician Card */}
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">engineering</span>
                Current Job
              </div>
              {currentJob && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live
                </span>
              )}
            </div>

            <div className="p-6">
              {loading ? (
                <p className="text-sm text-slate-400 text-center py-10">Loading…</p>
              ) : !currentJob ? (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-slate-300 text-[40px]">work_off</span>
                  <p className="text-sm font-semibold text-slate-500 mt-2">No active jobs right now</p>
                  <p className="text-xs text-slate-400 mt-1">Post a new request to get matched with a technician.</p>
                </div>
              ) : currentJob.technician ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-xl">
                        {currentJob.technician.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm">{currentJob.technician.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#004ac6]">
                          {getCategoryIcon(currentJob.category)}
                        </span>
                        {currentJob.technician.technicianType} • {currentJob.technician.city}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${currentJob.technician.phone}`}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all duration-200 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[20px]">call</span>
                      </a>
                    </div>
                  </div>

                  {/* ── Share Live Location ── */}
                  {canShareLocation && (
                    <div className="pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleShareLocation}
                        disabled={locationStatus === 'sharing'}
                        className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200
                          ${locationStatus === 'shared'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-sm hover:shadow-md disabled:opacity-60'}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {locationStatus === 'shared' ? 'check_circle' : 'my_location'}
                        </span>
                        {locationStatus === 'sharing'
                          ? 'Getting your precise location…'
                          : locationStatus === 'shared'
                          ? 'Opened in WhatsApp'
                          : 'Share Your Live Location'}
                      </button>
                      {locationStatus === 'error' && (
                        <p className="text-xs text-red-500 mt-2 text-center">{locationError}</p>
                      )}
                      {locationStatus === 'shared' && (
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          Send the WhatsApp message to share your live location with {currentJob.technician.name}.
                          {locationAccuracy != null && ` (accurate to ~${Math.round(locationAccuracy)}m)`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-amber-400 text-[40px]">hourglass_top</span>
                  <p className="text-sm font-semibold text-amber-600 mt-2">Waiting for a technician</p>
                  <p className="text-xs text-slate-400 mt-1">We'll notify you as soon as one accepts your request.</p>
                </div>
              )}
            </div>
          </div>

          {/* Status Timeline */}
          {currentJob && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-bold text-slate-800">Job Status</h2>
                <span className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  ID: #{currentJob.id?.slice(-6).toUpperCase()}
                </span>
              </div>

              {(() => {
                const stepIndex = getStepIndex(currentJob.status);
                const progressPct = (stepIndex / (STATUS_STEPS.length - 1)) * 100;
                return (
                  <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="hidden md:block absolute top-5 left-0 right-0 h-1 bg-slate-100 rounded-full z-0">
                      <div
                        className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full relative transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      >
                        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-4 border-[#57dffe] rounded-full shadow-sm"></div>
                      </div>
                    </div>

                    {STATUS_STEPS.map((step, i) => {
                      const done = i < stepIndex;
                      const active = i === stepIndex;
                      const pending = i > stepIndex;
                      const icons = { PENDING: 'schedule', ACCEPTED: 'check', IN_PROGRESS: 'engineering', COMPLETED: 'task_alt' };
                      const labels = { PENDING: 'Pending', ACCEPTED: 'Assigned', IN_PROGRESS: 'In Progress', COMPLETED: 'Completed' };
                      return (
                        <div key={step} className={`relative z-10 flex flex-col items-center text-center w-20 ${pending ? 'opacity-40' : ''}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md
                            ${active ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]' :
                              done ? 'bg-[#004ac6]' : 'bg-slate-200 text-slate-400 shadow-none'}`}>
                            <span className="material-symbols-outlined text-[20px]">{done ? 'check' : icons[step]}</span>
                          </div>
                          <span className={`text-xs mt-2 font-medium ${active ? 'text-[#004ac6] font-bold' : 'text-slate-500'}`}>{labels[step]}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Right: Request Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] sticky top-24">
            <div className="mb-6">
              <h2 className="font-bold text-slate-800 text-lg">Request Service</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">We'll match you with a verified pro in minutes.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all">
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>HVAC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Issue Description</label>
                <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm h-20 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all resize-none" placeholder="E.g., Kitchen sink leaking..." />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">location_on</span>
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all" type="text" placeholder="123 Luxury Lane" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Urgency</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUrgency('standard')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 border
                      ${selectedUrgency === 'standard'
                        ? 'bg-[#004ac6]/10 text-[#004ac6] border-[#004ac6]/30 shadow-sm'
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'}`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedUrgency('emergency')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 border
                      ${selectedUrgency === 'emergency'
                        ? 'bg-red-50 text-red-500 border-red-200 shadow-sm'
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'}`}
                  >
                    Emergency
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white py-3 rounded-xl font-bold text-sm shadow-[0_10px_20px_-5px_rgba(0,74,198,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(0,74,198,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                Post Job Now
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <section className="pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-slate-800 text-lg">Recent Activities</h2>
          <a href="/history" className="text-sm font-semibold text-[#004ac6] hover:underline">View All</a>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-slate-400 text-center py-8">Loading…</p>
          ) : recentActivity.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-100">
              <span className="material-symbols-outlined text-slate-300 text-[40px]">inbox</span>
              <p className="text-sm font-semibold text-slate-500 mt-2">No requests yet</p>
            </div>
          ) : (
            recentActivity.map((req) => {
              const isCompleted = req.status === 'COMPLETED';
              return (
                <div key={req.id} className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                      <span className="material-symbols-outlined text-[22px]">{getCategoryIcon(req.category)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 line-clamp-1">{req.description}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isCompleted ? 'Completed' : 'Requested'} {formatDate(req.createdAt)}
                        {req.technician && ` • Pro: ${req.technician.name}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${isCompleted ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-50'}`}>
                      {req.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
};

export default MiddleContent;