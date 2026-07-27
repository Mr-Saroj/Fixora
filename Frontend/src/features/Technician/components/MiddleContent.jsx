import React from 'react';
import { useTechnicianDashboard, STEPS, getCategoryIcon, formatDate } from '../hooks/useTechnicianDashboard';

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
  } = useTechnicianDashboard();

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
              {i < 2 && jobsLoading ? '—' : stat.value}
            </p>
          </div>
        ))}
      </section>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4 mb-6 flex items-center justify-between">
          {error}
          <button onClick={fetchJobs} className="font-bold underline">Retry</button>
        </div>
      )}

      {/* Active Job & Status Changer */}
      <div className="mb-8">
        <div className="space-y-6">

          {/* Active Job Card (real data, no fake map/ETA) */}
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">near_me</span>
                Active Job
                {currentJob && <span className="text-slate-400 font-normal">• ID: #{currentJob.id?.slice(-6).toUpperCase()}</span>}
              </div>
              {currentJob && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  {currentJob.status === 'IN_PROGRESS' ? 'In Progress' : 'Accepted'}
                </span>
              )}
            </div>

            <div className="p-6">
              {jobsLoading ? (
                <p className="text-sm text-slate-400 text-center py-10">Loading…</p>
              ) : !currentJob ? (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-slate-300 text-[40px]">work_off</span>
                  <p className="text-sm font-semibold text-slate-500 mt-2">No active job right now</p>
                  <p className="text-xs text-slate-400 mt-1">Head to your Requests page to accept a job.</p>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#004ac6] flex items-center justify-center font-bold text-lg shrink-0">
                    {currentJob.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{currentJob.fullName} (Customer)</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                      <span className="material-symbols-outlined text-[14px] text-[#004ac6]">location_on</span>
                      {currentJob.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${currentJob.mobileNumber}`} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm" title="Call Customer">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Job Status Changer — wired to real API */}
          {currentJob && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)]">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                <div>
                  <h2 className="font-bold text-slate-800">Update Job Status</h2>
                  <p className="text-xs text-slate-400">Advance your progress on this request</p>
                </div>
                <button
                  disabled={currentStepIdx >= STEPS.length - 1 || advancing}
                  onClick={advanceCurrentJob}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-sm hover:shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  {advancing ? 'Updating…' : currentStepIdx === 1 ? 'Mark Complete' : 'Advance Status'}
                </button>
              </div>

              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-2">
                <div className="hidden md:block absolute top-7 left-8 right-8 h-1 bg-slate-100 rounded-full z-0">
                  <div
                    className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStepIdx / (STEPS.length - 1)) * 100}%` }}
                  />
                </div>

                {STEPS.map((step, i) => {
                  const isDone = i < currentStepIdx;
                  const isActive = i === currentStepIdx;
                  const isPending = i > currentStepIdx;

                  return (
                    <div key={step.status} className={`relative z-10 flex flex-col items-center text-center w-24 ${isPending ? 'opacity-40' : ''}`}>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md
                          ${isActive ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 ring-4 ring-[#004ac6]/10 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]' :
                            isDone ? 'bg-[#004ac6]' : 'bg-slate-200 text-slate-400 shadow-none'}`}
                      >
                        <span className="material-symbols-outlined text-[22px]">{isDone ? 'check' : step.icon}</span>
                      </div>
                      <span className={`text-xs mt-2 font-medium ${isActive ? 'text-[#004ac6] font-bold' : 'text-slate-500'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Completed Jobs — real data, no fabricated $ amounts */}
      <section className="pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-slate-800 text-lg">Recently Completed Jobs</h2>
          <a href="#/" className="text-sm font-semibold text-[#004ac6] hover:underline">View All History</a>
        </div>

        <div className="space-y-4">
          {jobsLoading ? (
            <p className="text-sm text-slate-400 text-center py-8">Loading…</p>
          ) : completedJobs.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-100">
              <span className="material-symbols-outlined text-slate-300 text-[40px]">inbox</span>
              <p className="text-sm font-semibold text-slate-500 mt-2">No completed jobs yet</p>
            </div>
          ) : (
            completedJobs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((job) => (
                <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                      <span className="material-symbols-outlined text-[22px]">{getCategoryIcon(job.category)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 line-clamp-1">{job.description}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Completed {formatDate(job.createdAt)} • Client: {job.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {job.rating ? (
                      <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                        {job.rating}.0 ★
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        Not rated yet
                      </span>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </section>
    </main>
  );
};

export default MiddleContent;