import React, { useState, useMemo } from 'react';

const CustomerRequest = () => {
  // Filter state
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([
    {
      id: 'REQ-201',
      name: 'David Miller',
      phone: '+1 (555) 234-8901',
      email: 'david.miller@email.com',
      category: 'Plumbing',
      issue: 'Burst pipe under kitchen sink causing water flooding',
      description: 'The main supply pipe under the kitchen sink has burst and water is rapidly flooding the kitchen floor. I have tried shutting off the main valve but it seems stuck. Need immediate assistance before it damages the cabinets and flooring.',
      address: '742 Evergreen Terrace, Apt 3B, Springfield',
      time: '10 mins ago',
      distance: '2.4 km',
      urgency: 'Emergency',
      est: '$120',
      estimatedTime: '1-2 hours',
      photos: 2,
      rating: '4.8',
      previousJobs: 3,
    },
    {
      id: 'REQ-202',
      name: 'Emma Watson',
      phone: '+1 (555) 876-5432',
      email: 'emma.w@email.com',
      category: 'Electrical',
      issue: 'Circuit breaker tripping repeatedly every 30 minutes',
      description: 'The main circuit breaker in the panel keeps tripping approximately every 30 minutes. We have unplugged most devices but it still happens. There is a slight burning smell coming from the panel area. Concerned about fire hazard.',
      address: '221B Baker Street, Downtown',
      time: '25 mins ago',
      distance: '4.1 km',
      urgency: 'Emergency',
      est: '$90',
      estimatedTime: '2-3 hours',
      photos: 1,
      rating: '4.5',
      previousJobs: 1,
    },
    {
      id: 'REQ-203',
      name: 'James Smith',
      phone: '+1 (555) 345-6789',
      email: 'j.smith@email.com',
      category: 'HVAC',
      issue: 'AC unit making loud grinding noise when running',
      description: 'Our central AC unit has started making a loud grinding noise whenever it runs. The cooling performance has also dropped significantly. The unit is about 5 years old. We would like a diagnostic and repair estimate.',
      address: '1600 Pennsylvania Avenue, Suite 400',
      time: '1 hr ago',
      distance: '5.8 km',
      urgency: 'Standard',
      est: '$150',
      estimatedTime: '2-4 hours',
      photos: 0,
      rating: '4.9',
      previousJobs: 5,
    },
    {
      id: 'REQ-204',
      name: 'Lisa Chen',
      phone: '+1 (555) 567-1234',
      email: 'lisa.chen@email.com',
      category: 'Plumbing',
      issue: 'Slow drainage in bathroom shower and sink',
      description: 'Both the shower and sink in the master bathroom are draining very slowly. It has been getting worse over the past week. We have tried over-the-counter drain cleaners but they did not help. Probably needs professional snaking.',
      address: '350 Fifth Avenue, Floor 12',
      time: '2 hrs ago',
      distance: '3.2 km',
      urgency: 'Standard',
      est: '$85',
      estimatedTime: '1 hour',
      photos: 3,
      rating: '5.0',
      previousJobs: 8,
    },
    {
      id: 'REQ-205',
      name: 'Robert Johnson',
      phone: '+1 (555) 789-4561',
      email: 'r.johnson@email.com',
      category: 'Electrical',
      issue: 'Two outlets in living room stopped working suddenly',
      description: 'Two wall outlets in the living room stopped working this morning. No breaker appears to be tripped. The rest of the house has power fine. Might be a wiring issue behind the wall.',
      address: '1 Infinite Loop, Cupertino',
      time: '3 hrs ago',
      distance: '7.5 km',
      urgency: 'Standard',
      est: '$110',
      estimatedTime: '1-2 hours',
      photos: 0,
      rating: '4.2',
      previousJobs: 0,
    },
    {
      id: 'REQ-206',
      name: 'Maria Garcia',
      phone: '+1 (555) 123-7890',
      email: 'maria.g@email.com',
      category: 'HVAC',
      issue: 'Thmostat displaying error code E3, no heating',
      description: 'The thermostat is showing error code E3 and the heating system is completely non-responsive. Outside temperature is dropping below freezing. We have two small children in the house. This is extremely urgent.',
      address: '456 Oak Lane, Suburb Hills',
      time: '5 mins ago',
      distance: '1.8 km',
      urgency: 'Emergency',
      est: '$200',
      estimatedTime: '1-3 hours',
      photos: 2,
      rating: '4.7',
      previousJobs: 2,
    },
  ]);

  const filters = [
    { key: 'all', label: 'All Requests', icon: 'list_alt' },
    { key: 'Emergency', label: 'Emergency', icon: 'warning' },
    { key: 'Standard', label: 'Standard', icon: 'schedule' },
  ];

  const sortOptions = [
    { key: 'newest', label: 'Newest First' },
    { key: 'distance', label: 'Nearest First' },
    { key: 'price-high', label: 'Highest Pay' },
    { key: 'price-low', label: 'Lowest Pay' },
  ];

  // Filter and sort logic
  const filteredRequests = useMemo(() => {
    let result = [...requests];

    // Filter by urgency
    if (activeFilter !== 'all') {
      result = result.filter(req => req.urgency === activeFilter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(req =>
        req.name.toLowerCase().includes(q) ||
        req.issue.toLowerCase().includes(q) ||
        req.category.toLowerCase().includes(q) ||
        req.address.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'distance':
        result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'price-high':
        result.sort((a, b) => parseInt(b.est.replace('$', '')) - parseInt(a.est.replace('$', '')));
        break;
      case 'price-low':
        result.sort((a, b) => parseInt(a.est.replace('$', '')) - parseInt(b.est.replace('$', '')));
        break;
      case 'newest':
      default:
        // Already in order
        break;
    }

    return result;
  }, [requests, activeFilter, searchQuery, sortBy]);

  // Stats
  const totalCount = requests.length;
  const emergencyCount = requests.filter(r => r.urgency === 'Emergency').length;
  const standardCount = requests.filter(r => r.urgency === 'Standard').length;

  const handleAccept = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    setSelectedRequest(null);
  };

  const handleDecline = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    setSelectedRequest(null);
  };

  const getCategoryColor = (category) => {
    const map = {
      'Plumbing': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
      'Electrical': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
      'HVAC': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    };
    return map[category] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };
  };

  const getCategoryIcon = (category) => {
    const map = {
      'Plumbing': 'water_drop',
      'Electrical': 'bolt',
      'HVAC': 'ac_unit',
    };
    return map[category] || 'build';
  };

  // ─── DETAIL MODAL ───
  const RequestDetailModal = () => {
    if (!selectedRequest) return null;
    const req = selectedRequest;
    const catColor = getCategoryColor(req.category);

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-[fadeIn_0.2s_ease]"
          onClick={() => setSelectedRequest(null)}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
          <div
            className="bg-white rounded-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-[slideUp_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-6 pb-4 border-b border-slate-100 rounded-t-3xl z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl ${catColor.bg} ${catColor.text} ${catColor.border} border flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-[28px]">{getCategoryIcon(req.category)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${catColor.bg} ${catColor.text} ${catColor.border} border`}>
                        {req.category}
                      </span>
                      {req.urgency === 'Emergency' && (
                        <span className="text-[10px] font-extrabold uppercase bg-red-500 text-white px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          Emergency
                        </span>
                      )}
                      {req.urgency === 'Standard' && (
                        <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-md">
                          Standard
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{req.id} • {req.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Issue Title */}
              <div>
                <h2 className="text-lg font-bold text-slate-800 leading-snug">{req.issue}</h2>
              </div>

              {/* Description */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">description</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Problem Description</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{req.description}</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">person</span>
                  <p className="text-xs text-slate-400 font-medium">Customer</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{req.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{req.phone}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">location_on</span>
                  <p className="text-xs text-slate-400 font-medium">Address</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5 leading-snug">{req.address}</p>
                  <p className="text-xs text-[#004ac6] font-semibold mt-1">{req.distance} away</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">payments</span>
                  <p className="text-xs text-slate-400 font-medium">Estimated Pay</p>
                  <p className="text-lg font-extrabold text-emerald-600 mt-0.5">{req.est}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">schedule</span>
                  <p className="text-xs text-slate-400 font-medium">Est. Duration</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{req.estimatedTime}</p>
                </div>
              </div>

              {/* Customer Stats Row */}
              <div className="flex items-center gap-4 p-4 bg-amber-50/60 rounded-xl border border-amber-100/60">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-sm">
                  {req.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{req.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      {req.rating}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{req.previousJobs} previous job{req.previousJobs !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-white rounded-xl border border-slate-200 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm" title="Call">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </button>
                  <button className="p-2.5 bg-white rounded-xl border border-slate-200 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm" title="Message">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </button>
                </div>
              </div>

              {/* Photos Indicator */}
              {req.photos > 0 && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-slate-400">photo_library</span>
                  <span className="text-sm text-slate-500">{req.photos} photo{req.photos !== 1 ? 's' : ''} attached by customer</span>
                  <button className="text-xs font-bold text-[#004ac6] hover:underline">View Photos</button>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl p-6 pt-4 border-t border-slate-100 rounded-b-3xl">
              <div className="flex gap-3">
                <button
                  onClick={() => handleDecline(req.id)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  Decline Request
                </button>
                <button
                  onClick={() => handleAccept(req.id)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Accept Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      {/* Modal */}
      <RequestDetailModal />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Customer Requests</h1>
            <p className="text-sm text-slate-400 mt-1">Review incoming service requests and accept jobs near your area</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm self-start">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[24px]">inbox</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">{totalCount}</p>
            <p className="text-xs text-slate-400 font-medium">Total Requests</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-red-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 relative">
            <span className="material-symbols-outlined text-[24px]">warning</span>
            {emergencyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {emergencyCount}
              </span>
            )}
          </div>
          <div>
            <p className="text-2xl font-extrabold text-red-600">{emergencyCount}</p>
            <p className="text-xs text-slate-400 font-medium">Emergency</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined text-[24px]">schedule</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">{standardCount}</p>
            <p className="text-xs text-slate-400 font-medium">Standard</p>
          </div>
        </div>
      </div>

      {/* Search + Sort Bar */}
      <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
            <span className="material-symbols-outlined text-slate-400 text-[20px] mr-3">search</span>
            <input
              type="text"
              placeholder="Search by name, issue, category, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 rounded-xl px-4 py-3 pr-10 border border-slate-100 text-sm text-slate-600 font-medium cursor-pointer outline-none focus:border-[#004ac6]/30 focus:ring-2 focus:ring-[#004ac6]/10 transition-all w-full sm:w-auto"
            >
              {sortOptions.map(opt => (
                <option key={opt.key} value={opt.key}>{opt.label}</option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">unfold_more</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {filters.map(filter => {
            const count = filter.key === 'all'
              ? totalCount
              : filter.key === 'Emergency'
                ? emergencyCount
                : standardCount;

            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                  ${activeFilter === filter.key
                    ? 'bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20'
                    : filter.key === 'Emergency' && activeFilter !== filter.key
                      ? 'bg-red-50 text-red-500 border border-red-100 hover:bg-red-100'
                      : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100 hover:text-slate-700'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>
                {filter.label}
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                  activeFilter === filter.key
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200/70 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Request List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-slate-50 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-slate-300">search_off</span>
          </div>
          <h3 className="text-lg font-bold text-slate-700">No requests found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search term.`
              : `No ${activeFilter === 'all' ? '' : activeFilter + ' '}requests available right now. Check back soon.`
            }
          </p>
          {(searchQuery || activeFilter !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-4 text-sm font-semibold text-[#004ac6] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req, index) => {
            const catColor = getCategoryColor(req.category);
            const isEmergency = req.urgency === 'Emergency';

            return (
              <div
                key={req.id}
                className={`bg-white rounded-2xl border shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.1)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group
                  ${isEmergency ? 'border-red-200/80' : 'border-slate-100/80'}
                `}
              >
                {/* Emergency Top Bar */}
                {isEmergency && (
                  <div className="h-1 bg-gradient-to-r from-red-500 via-red-400 to-orange-400" />
                )}

                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Left Content */}
                    <div className="flex-1 min-w-0">
                      {/* Top Meta Row */}
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${catColor.bg} ${catColor.text} ${catColor.border} border flex items-center gap-1`}>
                          <span className="material-symbols-outlined text-[14px]">{getCategoryIcon(req.category)}</span>
                          {req.category}
                        </span>

                        {isEmergency ? (
                          <span className="text-[10px] font-extrabold uppercase bg-red-500 text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm shadow-red-500/20">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Emergency
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
                            Standard
                          </span>
                        )}

                        <span className="text-xs text-slate-400 ml-auto lg:ml-0">{req.id}</span>
                      </div>

                      {/* Issue Title */}
                      <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-2 group-hover:text-[#004ac6] transition-colors cursor-pointer" onClick={() => setSelectedRequest(req)}>
                        {req.issue}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-slate-600">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                          {req.name}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-red-400">location_on</span>
                          {req.distance}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          {req.time}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">timer</span>
                          {req.estimatedTime}
                        </span>
                        {req.photos > 0 && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">photo_library</span>
                              {req.photos} photo{req.photos !== 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Address */}
                      <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1 truncate">
                        <span className="material-symbols-outlined text-[14px]">home</span>
                        {req.address}
                      </p>
                    </div>

                    {/* Right: Price + Actions */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:min-w-[160px]">
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Est. Pay</p>
                        <p className="text-2xl font-extrabold text-emerald-600 tracking-tight">{req.est}</p>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2 w-full lg:w-auto">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          <span className="hidden sm:inline">View</span>
                        </button>
                        <button
                          onClick={() => handleDecline(req.id)}
                          className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-12" />

      {/* Animations */}
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

export default CustomerRequest;