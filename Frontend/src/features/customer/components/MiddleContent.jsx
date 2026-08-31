import React from 'react';
import {
  useDashboardData,
  STATUS_STEPS,
  getStepIndex,
  getCategoryIcon,
  formatDate,
} from '../hooks/useDashboardData';
import GradientButton from '../../../components/ui/GradientButton';
import PageLoader from '../../../components/common/PageLoader';
import ErrorPage from '../../../components/common/ErrorPage';

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

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorPage
        message={error}
        onRetry={fetchRequests}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ═══════════ STATS GRID ═══════════ */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.12)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 ${stat.color === 'blue'
                    ? 'bg-blue-50 text-blue-600'
                    : stat.color === 'emerald'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                  {stat.icon}
                </span>
              </div>
              <span className="hidden sm:inline text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                {stat.sub}
              </span>
            </div>
            <h3 className="text-[11px] sm:text-sm text-slate-400 font-medium leading-tight">
              {stat.label}
            </h3>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1 tracking-tight leading-none">
              {loading ? '—' : stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* ═══════════ ERROR BAR ═══════════ */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm rounded-xl p-3 sm:p-4 flex items-center justify-between gap-2">
          <span className="truncate">{error}</span>
          <button
            onClick={fetchRequests}
            className="shrink-0 font-bold underline text-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* ═══════════ MAIN GRID: Job Info + Request Form ═══════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

        {/* ── Left: Current Job & Status ── */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6 order-2 lg:order-1">

          {/* Current Job Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 sm:p-4 border-b border-slate-100 flex justify-between items-center gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm sm:text-base min-w-0">
                <span className="material-symbols-outlined text-[#004ac6] text-[18px] sm:text-[20px] shrink-0">
                  engineering
                </span>
                <span className="truncate">Current Job</span>
              </div>
              {currentJob && (
                <span className="shrink-0 flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8 sm:py-10">
                  <span className="material-symbols-outlined text-[24px] text-slate-300 animate-spin">
                    progress_activity
                  </span>
                </div>
              ) : !currentJob ? (
                <div className="text-center py-8 sm:py-10">
                  <span className="material-symbols-outlined text-slate-300 text-[36px] sm:text-[40px]">
                    work_off
                  </span>
                  <p className="text-sm font-semibold text-slate-500 mt-2">
                    No active jobs right now
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Post a new request to get matched with a technician.
                  </p>
                </div>
              ) : currentJob.technician ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-base sm:text-xl">
                        {currentJob.technician.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate">
                        {currentJob.technician.name}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 truncate mt-0.5">
                        <span className="material-symbols-outlined text-[14px] text-[#004ac6] shrink-0">
                          {getCategoryIcon(currentJob.category)}
                        </span>
                        <span className="truncate">
                          {currentJob.technician.technicianType} • {currentJob.technician.city}
                        </span>
                      </p>
                    </div>
                    <a
                      href={`tel:${currentJob.technician.phone}`}
                      className="shrink-0 p-2 sm:p-2.5 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all duration-200 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">call</span>
                    </a>
                  </div>

                  {/* Share Live Location */}
                  {canShareLocation && (
                    <div className="pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleShareLocation}
                        disabled={locationStatus === 'sharing'}
                        className={`w-full py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200
                          ${locationStatus === 'shared'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-sm hover:shadow-md disabled:opacity-60'
                          }`}
                      >
                        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                          {locationStatus === 'shared' ? 'check_circle' : 'my_location'}
                        </span>
                        {locationStatus === 'sharing'
                          ? 'Getting location…'
                          : locationStatus === 'shared'
                            ? 'Opened in WhatsApp'
                            : 'Share Live Location'}
                      </button>
                      {locationStatus === 'error' && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-2 text-center">
                          {locationError}
                        </p>
                      )}
                      {locationStatus === 'shared' && (
                        <p className="text-[11px] sm:text-xs text-slate-400 mt-2 text-center">
                          Send the WhatsApp message to share your live location with{' '}
                          {currentJob.technician.name}.
                          {locationAccuracy != null &&
                            ` (~${Math.round(locationAccuracy)}m accuracy)`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-10">
                  <span className="material-symbols-outlined text-amber-400 text-[36px] sm:text-[40px]">
                    hourglass_top
                  </span>
                  <p className="text-sm font-semibold text-amber-600 mt-2">
                    Waiting for a technician
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    We'll notify you as soon as one accepts.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status Timeline */}
          {currentJob && (
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm">
              <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                <h2 className="font-bold text-slate-800 text-sm sm:text-base">
                  Job Status
                </h2>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400 bg-slate-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-100 truncate">
                  #{currentJob.id?.slice(-6).toUpperCase()}
                </span>
              </div>

              {(() => {
                const stepIndex = getStepIndex(currentJob.status);
                const progressPct = (stepIndex / (STATUS_STEPS.length - 1)) * 100;
                const icons = {
                  PENDING: 'schedule',
                  ACCEPTED: 'check',
                  IN_PROGRESS: 'engineering',
                  COMPLETED: 'task_alt',
                };
                const labels = {
                  PENDING: 'Pending',
                  ACCEPTED: 'Assigned',
                  IN_PROGRESS: 'In Progress',
                  COMPLETED: 'Completed',
                };

                return (
                  <>
                    {/* ── Mobile: compact horizontal ── */}
                    <div className="sm:hidden">
                      <div className="relative flex items-center justify-between px-1">
                        <div className="absolute top-[11px] left-[20px] right-[20px] h-1 bg-slate-100 rounded-full z-0">
                          <div
                            className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full relative transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          >
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-[3px] border-[#57dffe] rounded-full"></div>
                          </div>
                        </div>

                        {STATUS_STEPS.map((step, i) => {
                          const done = i < stepIndex;
                          const active = i === stepIndex;
                          const pending = i > stepIndex;

                          return (
                            <div
                              key={step}
                              className={`relative z-10 flex flex-col items-center text-center w-[60px] ${pending ? 'opacity-40' : ''
                                }`}
                            >
                              <div
                                className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-white transition-all duration-300
                                  ${active
                                    ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] ring-3 ring-[#004ac6]/15 shadow-md shadow-[#004ac6]/30'
                                    : done
                                      ? 'bg-[#004ac6]'
                                      : 'bg-slate-200 text-slate-400'
                                  }`}
                              >
                                <span className="material-symbols-outlined text-[13px]">
                                  {done ? 'check' : icons[step]}
                                </span>
                              </div>
                              <span
                                className={`text-[9px] mt-1.5 font-medium leading-tight ${active
                                    ? 'text-[#004ac6] font-bold'
                                    : 'text-slate-500'
                                  }`}
                              >
                                {labels[step]}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Desktop: full-size horizontal ── */}
                    <div className="hidden sm:block">
                      <div className="relative flex justify-between items-start pt-2">
                        <div className="absolute top-[19px] left-0 right-0 h-1 bg-slate-100 rounded-full z-0">
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

                          return (
                            <div
                              key={step}
                              className={`relative z-10 flex flex-col items-center text-center w-20 ${pending ? 'opacity-40' : ''
                                }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md
                                  ${active
                                    ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]'
                                    : done
                                      ? 'bg-[#004ac6]'
                                      : 'bg-slate-200 text-slate-400 shadow-none'
                                  }`}
                              >
                                <span className="material-symbols-outlined text-[20px]">
                                  {done ? 'check' : icons[step]}
                                </span>
                              </div>
                              <span
                                className={`text-xs mt-2 font-medium ${active
                                    ? 'text-[#004ac6] font-bold'
                                    : 'text-slate-500'
                                  }`}
                              >
                                {labels[step]}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* ── Right: Request Form — first on mobile, right on desktop ── */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm lg:sticky lg:top-24">
            <div className="mb-4 sm:mb-6">
              <h2 className="font-bold text-slate-800 text-base sm:text-lg">
                Request Service
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-relaxed">
                We'll match you with a verified pro in minutes.
              </p>
            </div>

            <form
              className="space-y-3 sm:space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">
                  Category
                </label>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-700 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all">
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>HVAC</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">
                  Issue Description
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm h-16 sm:h-20 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all resize-none"
                  placeholder="E.g., Kitchen sink leaking..."
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">
                  Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[16px] sm:text-[18px]">
                    location_on
                  </span>
                  <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all"
                    type="text"
                    placeholder="123 Luxury Lane"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">
                  Urgency
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUrgency('standard')}
                    className={`flex-1 py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 border
                      ${selectedUrgency === 'standard'
                        ? 'bg-[#004ac6]/10 text-[#004ac6] border-[#004ac6]/30 shadow-sm'
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'
                      }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedUrgency('emergency')}
                    className={`flex-1 py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 border
                      ${selectedUrgency === 'emergency'
                        ? 'bg-red-50 text-red-500 border-red-200 shadow-sm'
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'
                      }`}
                  >
                    Emergency
                  </button>
                </div>
              </div>

              <GradientButton
                type="submit"
                size="normal"
                className="w-full mt-1 sm:mt-2"
              >
                Post Job Now
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] ml-2">
                  send
                </span>
              </GradientButton>
            </form>
          </div>
        </div>
      </div>

      {/* ═══════════ RECENT ACTIVITIES ═══════════ */}
      <section>
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="font-bold text-slate-800 text-sm sm:text-lg">
            Recent Activities
          </h2>
          <a
            href="/history"
            className="text-xs sm:text-sm font-semibold text-[#004ac6] hover:underline"
          >
            View All
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="material-symbols-outlined text-[24px] text-slate-300 animate-spin">
              progress_activity
            </span>
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="text-center py-8 sm:py-10 bg-white rounded-xl sm:rounded-2xl border border-slate-100">
            <span className="material-symbols-outlined text-slate-300 text-[36px] sm:text-[40px]">
              inbox
            </span>
            <p className="text-sm font-semibold text-slate-500 mt-2">
              No requests yet
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {recentActivity.map((req) => {
              const isCompleted = req.status === 'COMPLETED';
              return (
                <div
                  key={req.id}
                  className="bg-white px-4 py-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 bg-slate-50 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                      <span className="material-symbols-outlined text-[18px] sm:text-[22px]">
                        {getCategoryIcon(req.category)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[13px] sm:text-sm text-slate-800 line-clamp-1">
                        {req.description}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">
                        {isCompleted ? 'Completed' : 'Requested'}{' '}
                        {formatDate(req.createdAt)}
                        {req.technician && ` • ${req.technician.name}`}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-lg ${isCompleted
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-slate-500 bg-slate-50'
                        }`}
                    >
                      {req.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom spacer */}
      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default MiddleContent;