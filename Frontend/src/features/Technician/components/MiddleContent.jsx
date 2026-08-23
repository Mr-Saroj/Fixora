import React from 'react';
import { Link } from 'react-router-dom';
import { useTechnicianDashboard, STEPS, getCategoryIcon, formatDate } from '../hooks/useTechnicianDashboard';
import SubscriptionCard from './SubscriptionCard';
import GradientButton from '../../../components/ui/GradientButton';

const MiddleContent = () => {
  const {
    jobsLoading,
    error,
    fetchJobs,
    advancing,
    advanceCurrentJob,
    currentJob,
    currentStepIdx,
    stats,
    completedJobs,
    subscription,
    subLoading,
    fetchSubscription,
  } = useTechnicianDashboard();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Subscription Card */}
      <SubscriptionCard
        subscription={subscription}
        subLoading={subLoading}
        onPaymentSuccess={fetchSubscription}
      />

      {/* ═══════════ STATS GRID ═══════════ */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.12)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                  stat.color === 'blue'
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
              {i < 2 && jobsLoading ? '—' : stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* ═══════════ ERROR BAR ═══════════ */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm rounded-xl p-3 sm:p-4 flex items-center justify-between gap-2">
          <span className="truncate">{error}</span>
          <button
            onClick={fetchJobs}
            className="shrink-0 font-bold underline text-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* ═══════════ ACTIVE JOB ═══════════ */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 sm:p-4 border-b border-slate-100 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm sm:text-base min-w-0">
            <span className="material-symbols-outlined text-[#004ac6] text-[18px] sm:text-[20px] shrink-0">
              near_me
            </span>
            <span className="truncate">Active Job</span>
            {currentJob && (
              <span className="text-slate-400 font-normal text-xs truncate">
                • #{currentJob.id?.slice(-6).toUpperCase()}
              </span>
            )}
          </div>
          {currentJob && (
            <span className="shrink-0 flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="hidden xs:inline">
                {currentJob.status === 'IN_PROGRESS' ? 'In Progress' : 'Accepted'}
              </span>
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          {jobsLoading ? (
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
              <p className="text-sm font-semibold text-slate-500 mt-2">No active job right now</p>
              <p className="text-xs text-slate-400 mt-1">
                Head to your Requests page to accept a job.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-50 text-[#004ac6] flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
                {currentJob.fullName?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm truncate">
                  {currentJob.fullName}
                  <span className="text-slate-400 font-normal"> (Customer)</span>
                </h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 truncate mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-[#004ac6] shrink-0">
                    location_on
                  </span>
                  <span className="truncate">{currentJob.location}</span>
                </p>
              </div>
              <a
                href={`tel:${currentJob.mobileNumber}`}
                className="shrink-0 p-2 sm:p-2.5 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm"
                title="Call Customer"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">call</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════ JOB STATUS STEPPER ═══════════ */}
      {currentJob && (
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm">
          {/* Header row */}
          <div className="flex flex-wrap justify-between items-center gap-2 mb-4 sm:mb-6">
            <div>
              <h2 className="font-bold text-slate-800 text-sm sm:text-base">
                Update Job Status
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Advance your progress on this request
              </p>
            </div>
            <GradientButton
              size="small"
              disabled={currentStepIdx >= STEPS.length - 1 || advancing}
              onClick={advanceCurrentJob}
              className="!px-3 sm:!px-4 !py-1.5 !text-[11px] sm:!text-xs !rounded-lg !shadow-sm hover:!shadow-md !font-bold"
            >
              {advancing
                ? 'Updating…'
                : currentStepIdx === 1
                ? 'Mark Complete'
                : 'Advance Status'}
            </GradientButton>
          </div>

          {/* ── Mobile Stepper: compact horizontal ── */}
          <div className="sm:hidden">
            <div className="relative flex items-center justify-between px-2">
              {/* Background track */}
              <div className="absolute top-[11px] left-[24px] right-[24px] h-1 bg-slate-100 rounded-full z-0">
                <div
                  className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(currentStepIdx / (STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {STEPS.map((step, i) => {
                const isDone = i < currentStepIdx;
                const isActive = i === currentStepIdx;
                const isPending = i > currentStepIdx;

                return (
                  <div
                    key={step.status}
                    className={`relative z-10 flex flex-col items-center text-center w-16 ${isPending ? 'opacity-40' : ''}`}
                  >
                    <div
                      className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-white transition-all duration-300
                        ${isActive
                          ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] ring-3 ring-[#004ac6]/15 shadow-md shadow-[#004ac6]/30'
                          : isDone
                          ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] shadow-sm'
                          : 'bg-slate-200 text-slate-400 shadow-none'
                        }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {isDone ? 'check' : step.icon}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] mt-1.5 font-medium leading-tight ${
                        isActive
                          ? 'text-[#004ac6] font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Desktop Stepper: large horizontal ── */}
          <div className="hidden sm:block">
            <div className="relative flex justify-between items-start pt-2">
              {/* Background track */}
              <div className="absolute top-[23px] left-[32px] right-[32px] h-1 bg-slate-100 rounded-full z-0">
                <div
                  className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(currentStepIdx / (STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {STEPS.map((step, i) => {
                const isDone = i < currentStepIdx;
                const isActive = i === currentStepIdx;
                const isPending = i > currentStepIdx;

                return (
                  <div
                    key={step.status}
                    className={`relative z-10 flex flex-col items-center text-center w-24 ${
                      isPending ? 'opacity-40' : ''
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300
                        ${
                          isActive
                            ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 ring-4 ring-[#004ac6]/10 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]'
                            : isDone
                            ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] shadow-md'
                            : 'bg-slate-200 text-slate-400 shadow-none'
                        }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {isDone ? 'check' : step.icon}
                      </span>
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isActive
                          ? 'text-[#004ac6] font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ COMPLETED JOBS ═══════════ */}
      <section>
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="font-bold text-slate-800 text-sm sm:text-lg">
            Recently Completed
          </h2>
          <a
            href="#/"
            className="text-xs sm:text-sm font-semibold text-[#004ac6] hover:underline"
          >
            View All
          </a>
        </div>

        {jobsLoading ? (
          <div className="flex items-center justify-center py-8">
            <span className="material-symbols-outlined text-[24px] text-slate-300 animate-spin">
              progress_activity
            </span>
          </div>
        ) : completedJobs.length === 0 ? (
          <div className="text-center py-8 sm:py-10 bg-white rounded-xl sm:rounded-2xl border border-slate-100">
            <span className="material-symbols-outlined text-slate-300 text-[36px] sm:text-[40px]">
              inbox
            </span>
            <p className="text-sm font-semibold text-slate-500 mt-2">
              No completed jobs yet
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {completedJobs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((job) => (
                <div
                  key={job.id}
                  className="bg-white px-4 py-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 bg-slate-50 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                      <span className="material-symbols-outlined text-[18px] sm:text-[22px]">
                        {getCategoryIcon(job.category)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[13px] sm:text-sm text-slate-800 line-clamp-1">
                        {job.description}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">
                        {formatDate(job.createdAt)} • {job.fullName}
                      </p>
                    </div>
                    {job.rating ? (
                      <span className="shrink-0 text-[10px] sm:text-xs font-bold text-amber-600 bg-amber-50 px-2 sm:px-2.5 py-1 rounded-lg border border-amber-100 flex items-center gap-0.5">
                        <span
                          className="material-symbols-outlined text-[13px] sm:text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        {job.rating}.0
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] sm:text-xs font-medium text-slate-400 bg-slate-50 px-2 sm:px-2.5 py-1 rounded-lg border border-slate-100">
                        No rating
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Bottom spacer */}
      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default MiddleContent;