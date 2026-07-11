import React, { useState } from 'react';

const MiddleContent = () => {
  // State to track and update current active job status
  const [currentStep, setCurrentStep] = useState(2); // 0: Assigned, 1: On the way, 2: Started, 3: Completed

  const steps = [
    { icon: 'assignment_turned_in', label: 'Assigned' },
    { icon: 'local_shipping', label: 'On the way' },
    { icon: 'play_arrow', label: 'Started' },
    { icon: 'task_alt', label: 'Completed' },
  ];

  // State for incoming customer requests queue
  const [requests, setRequests] = useState([
    { id: 'REQ-101', name: 'David Miller', category: 'Plumbing', issue: 'Leaking pipe under kitchen sink', time: '10 mins ago', distance: '2.4 km', urgency: 'Emergency', est: '$120' },
    { id: 'REQ-102', name: 'Emma Watson', category: 'Electrical', issue: 'Circuit breaker tripping repeatedly', time: '25 mins ago', distance: '4.1 km', urgency: 'Standard', est: '$90' },
    { id: 'REQ-103', name: 'James Smith', category: 'HVAC', issue: 'AC unit making grinding noise', time: '1 hr ago', distance: '5.8 km', urgency: 'Standard', est: '$150' },
  ]);

  const handleAccept = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    // Additional logic for accepting job can be placed here
  };

  const handleDecline = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: 'build_circle', label: 'Accepted Jobs Today', value: '04', sub: '2 IN PROGRESS', color: 'blue' },
          { icon: 'account_balance_wallet', label: 'Today\'s Earnings', value: '$380', sub: '+$120 PENDING', color: 'emerald' },
          { icon: 'star', label: 'My Tech Rating', value: '4.95/5.0', sub: 'TOP RATED PRO', color: 'amber' },
        ].map((stat, i) => (
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
            <p className="text-2xl font-extrabold text-slate-800 mt-1 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Main Grid: Live Tracking & Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left: Active Job Route & Status Changer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live Customer Route Card */}
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">near_me</span>
                Active Job Route • <span className="text-slate-400 font-normal">ID: #FX-88219</span>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Navigating
              </span>
            </div>

            <div className="h-80 w-full relative bg-slate-100">
              {/* Map Placeholder */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Route Map" 
                className="w-full h-full object-cover opacity-80"
              />

              {/* Floating Customer Info Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] border border-white/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#004ac6] flex items-center justify-center font-bold text-lg shrink-0">
                  SL
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate">Sarah Jenkins (Customer)</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                    <span className="material-symbols-outlined text-[14px] text-[#004ac6]">location_on</span>
                    742 Evergreen Terrace • 3.2 km away
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm" title="Call Customer">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </button>
                  <button className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm" title="Chat">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </button>
                  <button className="p-2.5 bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center gap-1 px-3 text-xs font-bold" title="Open Navigation">
                    <span className="material-symbols-outlined text-[18px]">directions</span>
                    <span className="hidden sm:inline">Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Job Status Changer */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
              <div>
                <h2 className="font-bold text-slate-800">Update Job Status</h2>
                <p className="text-xs text-slate-400">Click to advance your progress on this request</p>
              </div>
              <div className="flex gap-2">
                <button 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  Previous Step
                </button>
                <button 
                  disabled={currentStep === steps.length - 1}
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-sm hover:shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  Advance Status
                </button>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-2">
              {/* Background Progress Bar */}
              <div className="hidden md:block absolute top-7 left-8 right-8 h-1 bg-slate-100 rounded-full z-0">
                <div 
                  className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Step Items */}
              {steps.map((step, i) => {
                const isDone = i < currentStep;
                const isActive = i === currentStep;
                const isPending = i > currentStep;

                return (
                  <div key={i} className={`relative z-10 flex flex-col items-center text-center w-24 ${isPending ? 'opacity-40' : ''}`}>
                    <button 
                      onClick={() => setCurrentStep(i)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md cursor-pointer hover:scale-105
                        ${isActive ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 ring-4 ring-[#004ac6]/10 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]' : 
                          isDone ? 'bg-[#004ac6]' : 'bg-slate-200 text-slate-400 shadow-none'}`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {isDone ? 'check' : step.icon}
                      </span>
                    </button>
                    <span className={`text-xs mt-2 font-medium ${isActive ? 'text-[#004ac6] font-bold' : 'text-slate-500'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Incoming Customer Requests Pool */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-bold text-slate-800 text-lg">New Requests</h2>
                <p className="text-xs text-slate-400 mt-0.5">Available jobs near your location</p>
              </div>
              <span className="bg-[#004ac6]/10 text-[#004ac6] text-xs font-bold px-2.5 py-1 rounded-full">
                {requests.length} Live
              </span>
            </div>

            {requests.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <span className="material-symbols-outlined text-[48px] mb-2 text-slate-300">inbox</span>
                <p className="text-sm font-medium">No new requests at the moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#004ac6] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {req.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {req.urgency === 'Emergency' && (
                          <span className="text-[10px] font-extrabold uppercase bg-red-50 text-red-500 px-2 py-0.5 rounded border border-red-100 animate-pulse">
                            Emergency
                          </span>
                        )}
                        <span className="text-xs font-bold text-slate-700">{req.est}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-800">{req.issue}</h4>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-600">
                        <span className="material-symbols-outlined text-[14px]">person</span> {req.name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-red-500">location_on</span> {req.distance}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200/60">
                      <button 
                        onClick={() => handleDecline(req.id)}
                        className="py-2 rounded-lg text-xs font-bold text-slate-500 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                      >
                        Decline
                      </button>
                      <button 
                        onClick={() => handleAccept(req.id)}
                        className="py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-sm hover:shadow hover:-translate-y-0.5 transition-all"
                      >
                        Accept Job
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completed & Past Jobs Table */}
      <section className="pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-slate-800 text-lg">Recently Completed Jobs</h2>
          <a href="#/" className="text-sm font-semibold text-[#004ac6] hover:underline">View All History</a>
        </div>

        <div className="space-y-4">
          {[
            { icon: 'plumbing', title: 'Main Line Valve Replacement', sub: 'Completed Today, 2:30 PM • Client: Robert K.', amount: '+$180.00', status: 'Paid', rating: '5.0 ★' },
            { icon: 'bolt', title: 'Ceiling Fan & Fixture Wiring', sub: 'Completed Yesterday • Client: Amanda P.', amount: '+$145.00', status: 'Paid', rating: '4.8 ★' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">{item.rating}</span>
                <span className="text-sm font-bold text-emerald-600">{item.amount}</span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MiddleContent;