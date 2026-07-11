import React, { useState, useMemo } from 'react';

const AcceptedRequest = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(null);

  // All accepted jobs with different statuses
  const [jobs, setJobs] = useState([
    {
      id: 'FX-88219',
      name: 'Sarah Jenkins',
      phone: '+1 (555) 111-2233',
      email: 'sarah.j@email.com',
      category: 'Plumbing',
      issue: 'Burst pipe under kitchen sink causing water flooding',
      address: '742 Evergreen Terrace, Apt 3B, Springfield',
      distance: '3.2 km',
      est: '$120',
      estimatedTime: '1-2 hours',
      urgency: 'Emergency',
      status: 'in-progress', // in-progress | scheduled | completed
      currentStep: 2, // 0: Assigned, 1: On the way, 2: Started, 3: Completed
      acceptedAt: 'Today, 10:15 AM',
      scheduledTime: null,
      startedAt: 'Today, 10:45 AM',
      completedAt: null,
      notes: 'Customer mentioned the shut-off valve is stuck. May need to replace it.',
      photos: 2,
      rating: '4.8',
      previousJobs: 3,
      paymentStatus: 'pending',
    },
    {
      id: 'FX-88234',
      name: 'Tom Bradley',
      phone: '+1 (555) 222-3344',
      email: 'tom.b@email.com',
      category: 'Electrical',
      issue: 'Complete rewiring needed for garage conversion',
      address: '567 Maple Drive, Oakville',
      distance: '6.1 km',
      est: '$340',
      estimatedTime: '4-6 hours',
      urgency: 'Standard',
      status: 'in-progress',
      currentStep: 1,
      acceptedAt: 'Today, 9:30 AM',
      scheduledTime: null,
      startedAt: null,
      completedAt: null,
      notes: 'Customer has purchased all materials. Need to bring only tools.',
      photos: 5,
      rating: '4.6',
      previousJobs: 1,
      paymentStatus: 'pending',
    },
    {
      id: 'FX-88250',
      name: 'Nina Patel',
      phone: '+1 (555) 333-4455',
      email: 'nina.p@email.com',
      category: 'HVAC',
      issue: 'Annual AC maintenance and filter replacement',
      address: '890 Cedar Boulevard, Riverside',
      distance: '4.7 km',
      est: '$95',
      estimatedTime: '1-2 hours',
      urgency: 'Standard',
      status: 'scheduled',
      currentStep: 0,
      acceptedAt: 'Yesterday, 4:00 PM',
      scheduledTime: 'Tomorrow, 11:00 AM',
      startedAt: null,
      completedAt: null,
      notes: 'Customer requested a call 30 minutes before arrival. Unit model: Carrier 24ACC6.',
      photos: 0,
      rating: '5.0',
      previousJobs: 6,
      paymentStatus: 'pending',
    },
    {
      id: 'FX-88265',
      name: 'Carlos Rivera',
      phone: '+1 (555) 444-5566',
      email: 'carlos.r@email.com',
      category: 'Plumbing',
      issue: 'Install new bathroom faucet and fix drain leak',
      address: '321 Pine Street, Unit 7, Lakeside',
      distance: '8.3 km',
      est: '$160',
      estimatedTime: '2-3 hours',
      urgency: 'Standard',
      status: 'scheduled',
      currentStep: 0,
      acceptedAt: 'Yesterday, 2:20 PM',
      scheduledTime: 'Tomorrow, 2:00 PM',
      startedAt: null,
      completedAt: null,
      notes: 'Faucet already purchased by customer (Delta model). Only labor needed for installation plus drain repair.',
      photos: 1,
      rating: '4.3',
      previousJobs: 0,
      paymentStatus: 'pending',
    },
    {
      id: 'FX-88190',
      name: 'Robert Kim',
      phone: '+1 (555) 555-6677',
      email: 'r.kim@email.com',
      category: 'Electrical',
      issue: 'Install ceiling fan and new light fixture in bedroom',
      address: '654 Birch Lane, Highland Park',
      distance: '2.1 km',
      est: '$145',
      estimatedTime: '1.5-2 hours',
      urgency: 'Standard',
      status: 'completed',
      currentStep: 3,
      acceptedAt: 'Today, 7:00 AM',
      scheduledTime: 'Today, 8:00 AM',
      startedAt: 'Today, 8:10 AM',
      completedAt: 'Today, 9:45 AM',
      notes: '',
      photos: 0,
      rating: '5.0',
      previousJobs: 4,
      paymentStatus: 'paid',
      customerRating: '5.0',
      customerReview: 'Excellent work! Very professional and clean installation. Highly recommend Marcus.',
    },
    {
      id: 'FX-88175',
      name: 'Amanda Foster',
      phone: '+1 (555) 666-7788',
      email: 'amanda.f@email.com',
      category: 'HVAC',
      issue: 'Thermostat replacement and system calibration',
      address: '987 Elm Street, Westbrook',
      distance: '5.4 km',
      est: '$110',
      estimatedTime: '1 hour',
      urgency: 'Standard',
      status: 'completed',
      currentStep: 3,
      acceptedAt: 'Yesterday, 3:00 PM',
      scheduledTime: 'Yesterday, 4:00 PM',
      startedAt: 'Yesterday, 4:05 PM',
      completedAt: 'Yesterday, 4:55 PM',
      notes: 'Replaced old Honeywell with Nest thermostat. Calibrated system.',
      photos: 3,
      rating: '4.9',
      previousJobs: 2,
      paymentStatus: 'paid',
      customerRating: '4.8',
      customerReview: 'Great job, very knowledgeable. System is running perfectly now.',
    },
  ]);

  const steps = [
    { icon: 'assignment_turned_in', label: 'Assigned' },
    { icon: 'local_shipping', label: 'On the way' },
    { icon: 'play_arrow', label: 'Started' },
    { icon: 'task_alt', label: 'Completed' },
  ];

  const filters = [
    { key: 'all', label: 'All Jobs', icon: 'list_alt' },
    { key: 'in-progress', label: 'In Progress', icon: 'engineering' },
    { key: 'scheduled', label: 'Scheduled', icon: 'event' },
    { key: 'completed', label: 'Completed', icon: 'check_circle' },
  ];

  const getCategoryColor = (category) => {
    const map = {
      'Plumbing': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', dot: 'bg-blue-500' },
      'Electrical': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500' },
      'HVAC': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500' },
    };
    return map[category] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', dot: 'bg-slate-500' };
  };

  const getCategoryIcon = (category) => {
    const map = { 'Plumbing': 'water_drop', 'Electrical': 'bolt', 'HVAC': 'ac_unit' };
    return map[category] || 'build';
  };

  const getStatusConfig = (status) => {
    const map = {
      'in-progress': { label: 'In Progress', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: 'engineering' },
      'scheduled': { label: 'Scheduled', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', icon: 'event' },
      'completed': { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: 'check_circle' },
    };
    return map[status] || map['scheduled'];
  };

  // Filter & Search
  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    if (activeFilter !== 'all') {
      result = result.filter(job => job.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(job =>
        job.name.toLowerCase().includes(q) ||
        job.issue.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        job.address.toLowerCase().includes(q)
      );
    }
    return result;
  }, [jobs, activeFilter, searchQuery]);

  // Counts
  const counts = {
    all: jobs.length,
    'in-progress': jobs.filter(j => j.status === 'in-progress').length,
    scheduled: jobs.filter(j => j.status === 'scheduled').length,
    completed: jobs.filter(j => j.status === 'completed').length,
  };

  const handleAdvanceStep = (jobId) => {
    setJobs(jobs.map(job => {
      if (job.id !== jobId) return job;
      const newStep = Math.min(3, job.currentStep + 1);
      const updates = { currentStep: newStep };
      if (newStep === 1 && !job.startedAt) updates.startedAt = 'Just now';
      if (newStep === 3) {
        updates.status = 'completed';
        updates.completedAt = 'Just now';
        updates.paymentStatus = 'pending';
      }
      return { ...job, ...updates };
    }));
    setShowCompleteConfirm(null);
  };

  const handleStepBack = (jobId) => {
    setJobs(jobs.map(job => {
      if (job.id !== jobId || job.currentStep <= 0) return job;
      const newStep = job.currentStep - 1;
      const updates = { currentStep: newStep };
      if (newStep < 3 && job.status === 'completed') {
        updates.status = 'in-progress';
        updates.completedAt = null;
      }
      return { ...job, ...updates };
    }));
  };

 

  // ─── MINI STEPPER FOR CARDS ───
  const MiniStepper = ({ currentStep, jobId, status }) => {
    if (status === 'completed') return null;
    return (
      <div className="flex items-center gap-1 mt-3">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                ${i < currentStep ? 'bg-[#004ac6] text-white' :
                  i === currentStep ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white ring-2 ring-[#004ac6]/20' :
                  'bg-slate-100 text-slate-400'}
              `}>
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

  // ─── DETAIL MODAL ───
  const JobDetailModal = () => {
    if (!selectedJob) return null;
    const job = selectedJob;
    const catColor = getCategoryColor(job.category);
    const statusConfig = getStatusConfig(job.status);

    return (
      <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-[fadeIn_0.2s_ease]" onClick={() => { setSelectedJob(null); setShowCompleteConfirm(null); }} />
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
          <div className="bg-white rounded-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-[slideUp_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
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
                    <p className="text-xs text-slate-400 mt-1">{job.id} • Accepted {job.acceptedAt}</p>
                  </div>
                </div>
                <button onClick={() => { setSelectedJob(null); setShowCompleteConfirm(null); }} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-800 leading-snug">{job.issue}</h2>

              {/* ─── STATUS STEPPER (for active jobs) ─── */}
              {job.status !== 'completed' && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-slate-400">route</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Job Progress</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={job.currentStep === 0}
                        onClick={() => handleStepBack(job.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (job.currentStep === 2) {
                            setShowCompleteConfirm(job.id);
                          } else {
                            handleAdvanceStep(job.id);
                            setSelectedJob(prev => prev ? { ...prev, currentStep: Math.min(3, prev.currentStep + 1) } : null);
                          }
                        }}
                        disabled={job.currentStep === 3}
                        className="px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-sm hover:shadow-md disabled:opacity-30 disabled:pointer-events-none transition-all"
                      >
                        {job.currentStep === 2 ? 'Mark Complete' : 'Advance'}
                      </button>
                    </div>
                  </div>

                  <div className="relative flex justify-between items-start pt-1">
                    <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 rounded-full z-0">
                      <div className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full transition-all duration-500" style={{ width: `${(job.currentStep / 3) * 100}%` }} />
                    </div>
                    {steps.map((step, i) => {
                      const isDone = i < job.currentStep;
                      const isActive = i === job.currentStep;
                      return (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center w-16">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md
                            ${isActive ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 ring-4 ring-[#004ac6]/10 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]' : isDone ? 'bg-[#004ac6]' : 'bg-slate-200 text-slate-400 shadow-none'}`}>
                            <span className="material-symbols-outlined text-[20px]">{isDone ? 'check' : step.icon}</span>
                          </div>
                          <span className={`text-[10px] mt-2 font-medium leading-tight ${isActive ? 'text-[#004ac6] font-bold' : 'text-slate-500'}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Complete Confirmation */}
                  {showCompleteConfirm === job.id && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3 animate-[fadeIn_0.2s_ease]">
                      <span className="material-symbols-outlined text-[20px] text-amber-600 mt-0.5">warning_amber</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-amber-800">Confirm job completion?</p>
                        <p className="text-xs text-amber-600 mt-0.5">This will mark the job as completed and notify the customer for payment and review.</p>
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => setShowCompleteConfirm(null)} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-100 transition-all">Cancel</button>
                          <button onClick={() => { handleAdvanceStep(job.id); setSelectedJob(null); }} className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 transition-all">Yes, Complete</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Completed badge for done jobs */}
              {job.status === 'completed' && (
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined text-[28px]">verified</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-emerald-800">Job Completed Successfully</p>
                    <p className="text-xs text-emerald-600 mt-0.5">Finished at {job.completedAt} • {job.paymentStatus === 'paid' ? 'Payment received' : 'Awaiting payment'}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${job.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                    {job.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </div>
              )}

              {/* Info Grid */}
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
                  <p className="text-xs text-[#004ac6] font-semibold mt-1">{job.distance} away</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">payments</span>
                  <p className="text-xs text-slate-400 font-medium">Estimated Pay</p>
                  <p className="text-lg font-extrabold text-emerald-600 mt-0.5">{job.est}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">{job.scheduledTime ? 'event' : 'schedule'}</span>
                  <p className="text-xs text-slate-400 font-medium">{job.scheduledTime ? 'Scheduled For' : 'Est. Duration'}</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{job.scheduledTime || job.estimatedTime}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">history</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Timeline</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Job Accepted', time: job.acceptedAt, done: true },
                    { label: 'On the way', time: job.currentStep >= 1 ? (job.currentStep === 1 && !job.startedAt ? 'Now' : 'En route') : null, done: job.currentStep >= 1 },
                    { label: 'Work Started', time: job.startedAt, done: job.currentStep >= 2 },
                    { label: 'Completed', time: job.completedAt, done: job.currentStep >= 3 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-[#004ac6] text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {item.done ? <span className="material-symbols-outlined text-[14px]">check</span> : <span className="text-[10px] font-bold">{i + 1}</span>}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`text-sm ${item.done ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>{item.label}</span>
                        {item.time && <span className={`text-xs ${item.done ? 'text-slate-500' : 'text-slate-300'}`}>{item.time}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {job.notes && (
                <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-100/60">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[18px] text-amber-500">sticky_note_2</span>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Notes</span>
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed">{job.notes}</p>
                </div>
              )}

              {/* Customer Review (completed jobs) */}
              {job.status === 'completed' && job.customerReview && (
                <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100/60">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[18px] text-blue-500">rate_review</span>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Customer Review</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-amber-500">{job.customerRating} ★</span>
                    <span className="text-xs text-slate-400">from {job.name}</span>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed italic">"{job.customerReview}"</p>
                </div>
              )}

              {/* Photos */}
              {job.photos > 0 && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-slate-400">photo_library</span>
                  <span className="text-sm text-slate-500">{job.photos} photo{job.photos !== 1 ? 's' : ''} attached</span>
                  <button className="text-xs font-bold text-[#004ac6] hover:underline">View Photos</button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl p-6 pt-4 border-t border-slate-100 rounded-b-3xl">
              {job.status !== 'completed' ? (
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-xl text-sm font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    Call
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-sm font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Message
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">directions</span>
                    Navigate
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Download Receipt
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Message Customer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      <JobDetailModal />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Accepted Requests</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your scheduled jobs, track progress, and communicate with customers</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: 'work', label: 'Total Accepted', value: counts.all, color: 'blue' },
          { icon: 'engineering', label: 'In Progress', value: counts['in-progress'], color: 'cyan' },
          { icon: 'event', label: 'Scheduled', value: counts.scheduled, color: 'purple' },
          { icon: 'verified', label: 'Completed', value: counts.completed, color: 'emerald' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.1)] hover:-translate-y-0.5 transition-all duration-300 group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform
              ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
                stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                'bg-emerald-50 text-emerald-600'}
            `}>
              <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 tracking-tight">{stat.value}</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
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
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeFilter === filter.key
                  ? 'bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20'
                  : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100 hover:text-slate-700'
                }`}
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

      {/* Job List */}
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

            return (
              <div
                key={job.id}
                className={`bg-white rounded-2xl border shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.1)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group
                  ${job.status === 'completed' ? 'border-emerald-100' : job.urgency === 'Emergency' ? 'border-red-200/60' : 'border-slate-100/80'}
                `}
              >
                {/* Status top accent */}
                <div className={`h-1 ${job.status === 'completed' ? 'bg-gradient-to-r from-emerald-400 to-emerald-300' : job.status === 'in-progress' ? 'bg-gradient-to-r from-[#004ac6] to-[#57dffe]' : 'bg-gradient-to-r from-purple-400 to-purple-300'}`} />

                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Left: Content */}
                    <div className="flex-1 min-w-0">
                      {/* Meta Row */}
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
                          <span className="text-[10px] font-extrabold uppercase bg-red-500 text-white px-2 py-1 rounded-lg flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            Emergency
                          </span>
                        )}
                        <span className="text-xs text-slate-400 ml-auto lg:ml-0">{job.id}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-1.5 cursor-pointer group-hover:text-[#004ac6] transition-colors" onClick={() => setSelectedJob(job)}>
                        {job.issue}
                      </h3>

                      {/* Customer & Location */}
                      <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-slate-600">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                          {job.name}
                          {job.previousJobs > 0 && <span className="text-amber-500 ml-0.5">★ {job.rating}</span>}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-red-400">location_on</span>
                          {job.distance}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">home</span>
                          <span className="truncate max-w-[200px]">{job.address}</span>
                        </span>
                      </div>

                      {/* Time info */}
                      <div className="flex items-center gap-3 flex-wrap text-xs text-slate-400 mt-1.5">
                        {job.scheduledTime ? (
                          <span className="flex items-center gap-1 font-medium text-purple-600">
                            <span className="material-symbols-outlined text-[14px]">event</span>
                            {job.scheduledTime}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            Accepted {job.acceptedAt}
                          </span>
                        )}
                        {job.startedAt && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="flex items-center gap-1 text-[#004ac6]">
                              <span className="material-symbols-outlined text-[14px]">play_circle</span>
                              Started {job.startedAt}
                            </span>
                          </>
                        )}
                        {job.completedAt && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span>
                              Done {job.completedAt}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Mini Stepper for in-progress */}
                      <MiniStepper currentStep={job.currentStep} jobId={job.id} status={job.status} />
                    </div>

                    {/* Right: Price + Actions */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:min-w-[170px] shrink-0">
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Est. Pay</p>
                        <p className={`text-2xl font-extrabold tracking-tight ${job.status === 'completed' && job.paymentStatus === 'paid' ? 'text-emerald-600' : job.status === 'completed' ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {job.est}
                        </p>
                        {job.status === 'completed' && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 inline-block ${job.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                            {job.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full lg:w-auto">
                        {job.status === 'in-progress' && (
                          <>
                            <button onClick={() => setSelectedJob(job)} className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all flex items-center justify-center gap-1.5" title="View Details">
                              <span className="material-symbols-outlined text-[16px]">visibility</span>
                              <span className="hidden sm:inline">Details</span>
                            </button>
                            <button className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all" title="Call">
                              <span className="material-symbols-outlined text-[16px]">call</span>
                            </button>
                            <button className="px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-sm hover:shadow-md transition-all flex items-center gap-1" title="Navigate">
                              <span className="material-symbols-outlined text-[16px]">directions</span>
                              <span className="hidden sm:inline text-[11px]">Nav</span>
                            </button>
                          </>
                        )}
                        {job.status === 'scheduled' && (
                          <>
                            <button onClick={() => setSelectedJob(job)} className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all flex items-center justify-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px]">visibility</span>
                              <span className="hidden sm:inline">Details</span>
                            </button>
                            <button className="flex-1 lg:flex-none px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all" title="Call">
                              <span className="material-symbols-outlined text-[16px]">call</span>
                            </button>
                            <button className="flex-1 lg:flex-none px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all" title="Message">
                              <span className="material-symbols-outlined text-[16px]">chat</span>
                            </button>
                          </>
                        )}
                        {job.status === 'completed' && (
                          <>
                            <button onClick={() => setSelectedJob(job)} className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all flex items-center justify-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px]">visibility</span>
                              <span className="hidden sm:inline">Details</span>
                            </button>
                            {job.customerReview && (
                              <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-2 rounded-xl border border-amber-100 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">star</span>
                                {job.customerRating}
                              </span>
                            )}
                          </>
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </main>
  );
};

export default AcceptedRequest;