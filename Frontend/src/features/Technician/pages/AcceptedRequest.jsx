import React from 'react';
import { useTechnicianJobs } from '../hooks/useTechnicianJobs';

// ── Mini Stepper Sub-component ─────────────────────────
const MiniStepper = ({ currentStep, status, steps }) => {
  if (status === 'completed') return null;
  return (
    <div className="flex items-center gap-1 mt-3">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
              ${
                i < currentStep
                  ? 'bg-[#004ac6] text-white'
                  : i === currentStep
                  ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white ring-2 ring-[#004ac6]/20'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {i < currentStep ? '✓' : i + 1}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 rounded-full transition-all ${i < currentStep ? 'bg-[#004ac6]' : 'bg-slate-100'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ── Job Detail Modal Sub-component ─────────────────────
const JobDetailModal = ({ hook }) => {
  const {
    jobs, selectedJob, setSelectedJob, showCompleteConfirm, setShowCompleteConfirm,
    updatingId, advanceJob, getCategoryColor, getCategoryIcon, getStatusConfig, 
    formatDate, steps
  } = hook;

  if (!selectedJob) return null;
  const job = jobs.find((j) => j.id === selectedJob.id) || selectedJob;
  const catColor = getCategoryColor(job.category);
  const statusConfig = getStatusConfig(job.status);
  const isUpdating = updatingId === job.id;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        onClick={() => { setSelectedJob(null); setShowCompleteConfirm(null); }}
      />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-6 pb-4 border-b border-slate-100 rounded-t-3xl z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${catColor.bg} ${catColor.text} ${catColor.border} border flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[28px]">{getCategoryIcon(job.category)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${catColor.bg} ${catColor.text} ${catColor.border} border`}>{job.category}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-[12px]">{statusConfig.icon}</span>
                      {statusConfig.label}
                    </span>
                    {job.urgency === 'Emergency' && (
                      <span className="text-[10px] font-extrabold uppercase bg-red-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Emergency
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{job.id} • Requested {formatDate(job.createdAt)}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedJob(null); setShowCompleteConfirm(null); }} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 leading-snug">{job.issue}</h2>

            {job.status !== 'completed' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-slate-400">route</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Job Progress</span>
                  </div>
                  <button
                    onClick={() => {
                      if (job.currentStep === 1) setShowCompleteConfirm(job.id);
                      else advanceJob(job.id);
                    }}
                    disabled={job.currentStep >= 2 || isUpdating}
                    className="px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-sm hover:shadow-md disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    {isUpdating ? 'Updating…' : job.currentStep === 1 ? 'Mark Complete' : 'Start Job'}
                  </button>
                </div>

                <div className="relative flex justify-between items-start pt-1">
                  <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 rounded-full z-0">
                    <div className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full transition-all duration-500" style={{ width: `${(job.currentStep / 2) * 100}%` }} />
                  </div>
                  {steps.map((step, i) => {
                    const isDone = i < job.currentStep;
                    const isActive = i === job.currentStep;
                    return (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center w-16">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md
                          ${isActive ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 ring-4 ring-[#004ac6]/10' : isDone ? 'bg-[#004ac6]' : 'bg-slate-200 text-slate-400 shadow-none'}`}>
                          <span className="material-symbols-outlined text-[20px]">{isDone ? 'check' : step.icon}</span>
                        </div>
                        <span className={`text-[10px] mt-2 font-medium leading-tight ${isActive ? 'text-[#004ac6] font-bold' : 'text-slate-500'}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>

                {showCompleteConfirm === job.id && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-amber-600 mt-0.5">warning_amber</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-amber-800">Confirm job completion?</p>
                      <p className="text-xs text-amber-600 mt-0.5">This will mark the job as completed for the customer.</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => setShowCompleteConfirm(null)} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-100 transition-all">Cancel</button>
                        <button onClick={() => advanceJob(job.id)} disabled={isUpdating} className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 disabled:opacity-50 transition-all">
                          {isUpdating ? 'Updating…' : 'Yes, Complete'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {job.status === 'completed' && (
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-[28px]">verified</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-800">Job Completed</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Nice work — this one's done.</p>
                </div>
              </div>
            )}

            {job.status === 'completed' && job.rating && (
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Customer Rating</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`material-symbols-outlined text-[20px] ${star <= job.rating ? 'text-amber-400' : 'text-slate-200'}`}
                      style={{ fontVariationSettings: star <= job.rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                {job.review && <p className="text-sm text-amber-800 mt-2 leading-relaxed italic">"{job.review}"</p>}
              </div>
            )}

            {job.status === 'completed' && !job.rating && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-300 text-[24px]">hourglass_empty</span>
                <p className="text-xs text-slate-400">Customer hasn't rated this job yet.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">person</span>
                <p className="text-xs text-slate-400 font-medium">Customer</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{job.name}</p>
                <p className="text-xs text-slate-500 mt-1">{job.phone}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">location_on</span>
                <p className="text-xs text-slate-400 font-medium">Address</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5 leading-snug">{job.address}</p>
              </div>
            </div>

            {job.photos > 0 && (
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-slate-400">photo_library</span>
                <span className="text-sm text-slate-500">{job.photos} photo{job.photos !== 1 ? 's' : ''} attached</span>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl p-6 pt-4 border-t border-slate-100 rounded-b-3xl">
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl text-sm font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Main Component ─────────────────────────────────────────
const AcceptedRequest = () => {
  const hook = useTechnicianJobs();

  const {
    loading, error, filteredJobs, counts, fetchJobs,
    activeFilter, setActiveFilter, searchQuery, setSearchQuery,
    steps, filters, getCategoryColor, getCategoryIcon, getStatusConfig,
    formatDate, updatingId, advanceJob, setSelectedJob
  } = hook;

  if (loading) {
    return (
      <main className="flex-1 p-8 bg-[#f8fafc] flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
          <p className="text-sm font-medium">Loading your jobs…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-8 bg-[#f8fafc] flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-10 text-center max-w-md">
          <span className="material-symbols-outlined text-[36px] text-red-400">error</span>
          <p className="text-sm font-bold text-slate-700 mt-3">{error}</p>
          <button onClick={fetchJobs} className="mt-4 px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#004ac6]">
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      <JobDetailModal hook={hook} />

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Accepted Requests</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your jobs and track progress</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: 'work', label: 'Total Accepted', value: counts.all },
          { icon: 'engineering', label: 'In Progress', value: counts['in-progress'] },
          { icon: 'event', label: 'Accepted', value: counts.scheduled },
          { icon: 'verified', label: 'Completed', value: counts.completed },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-sm">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-blue-50 text-blue-600">
              <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 tracking-tight">{stat.value}</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-4 mb-6">
        <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
          <span className="material-symbols-outlined text-slate-400 text-[20px] mr-3">search</span>
          <input
            type="text"
            placeholder="Search by job ID, customer, issue, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeFilter === filter.key ? 'bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'}`}
            >
              <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>
              {filter.label}
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${activeFilter === filter.key ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-500'}`}>
                {counts[filter.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-slate-50 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-slate-300">work_off</span>
          </div>
          <h3 className="text-lg font-bold text-slate-700">No jobs found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery ? `No results for "${searchQuery}".` : `No ${activeFilter === 'all' ? '' : activeFilter.replace('-', ' ') + ' '}jobs at the moment.`}
          </p>
          {(searchQuery || activeFilter !== 'all') && (
            <button onClick={() => { setSearchQuery(''); setActiveFilter('all'); }} className="mt-4 text-sm font-semibold text-[#004ac6] hover:underline">Clear filters</button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const catColor = getCategoryColor(job.category);
            const statusConfig = getStatusConfig(job.status);
            const isUpdating = updatingId === job.id;

            return (
              <div key={job.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${job.status === 'completed' ? 'border-emerald-100' : job.urgency === 'Emergency' ? 'border-red-200/60' : 'border-slate-100/80'}`}>
                <div className={`h-1 ${job.status === 'completed' ? 'bg-gradient-to-r from-emerald-400 to-emerald-300' : job.status === 'in-progress' ? 'bg-gradient-to-r from-[#004ac6] to-[#57dffe]' : 'bg-gradient-to-r from-purple-400 to-purple-300'}`} />

                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${catColor.bg} ${catColor.text} ${catColor.border} border flex items-center gap-1`}>
                          <span className="material-symbols-outlined text-[14px]">{getCategoryIcon(job.category)}</span>
                          {job.category}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border flex items-center gap-1`}>
                          <span className="material-symbols-outlined text-[12px]">{statusConfig.icon}</span>
                          {statusConfig.label}
                        </span>
                        {job.urgency === 'Emergency' && job.status !== 'completed' && (
                          <span className="text-[10px] font-extrabold uppercase bg-red-500 text-white px-2 py-1 rounded-lg">Emergency</span>
                        )}
                        <span className="text-xs text-slate-400 ml-auto lg:ml-0">{job.id}</span>
                      </div>

                      <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-1.5 cursor-pointer hover:text-[#004ac6] transition-colors" onClick={() => setSelectedJob(job)}>
                        {job.issue}
                      </h3>

                      <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-slate-600">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                          {job.name}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">home</span>
                          <span className="truncate max-w-[200px]">{job.address}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap text-xs text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          Requested {formatDate(job.createdAt)}
                        </span>
                      </div>

                      <MiniStepper currentStep={job.currentStep} status={job.status} steps={steps} />
                    </div>

                    <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:min-w-[170px] shrink-0">
                      <div className="flex gap-2 w-full lg:w-auto">
                        <button onClick={() => setSelectedJob(job)} className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          <span className="hidden sm:inline">Details</span>
                        </button>
                        {job.status !== 'completed' && (
                          <button
                            onClick={() => advanceJob(job.id)}
                            disabled={isUpdating}
                            className="px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-sm disabled:opacity-50 transition-all"
                            title={job.currentStep === 1 ? 'Mark Complete' : 'Start Job'}
                          >
                            {isUpdating ? '…' : job.currentStep === 1 ? 'Complete' : 'Start'}
                          </button>
                        )}
                        {job.status === 'completed' && job.rating && (
                          <span className="px-3 py-2.5 rounded-xl text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 flex items-center gap-1" title={job.review || ''}>
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            {job.rating}.0
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="h-12" />
    </main>
  );
};

export default AcceptedRequest;