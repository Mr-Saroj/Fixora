import React, { useState } from 'react';

const MiddleContent = () => {
  const [selectedUrgency, setSelectedUrgency] = useState('standard');

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: 'plumbing', label: 'Active Jobs', value: '02', sub: 'IN PROGRESS', color: 'blue' },
          { icon: 'payments', label: 'Total Invested', value: '$1,450', sub: 'THIS MONTH', color: 'emerald' },
          { icon: 'verified', label: 'Fixora Rating', value: '4.9/5.0', sub: 'EXCELLENT', color: 'amber' },
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

      {/* Main Grid: Map/Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left: Map & Status */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Map Card */}
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">distance</span>
                Live Technician Tracking
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live
              </span>
            </div>

            <div className="h-96 w-full relative bg-slate-100">
              {/* Map Placeholder Image */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Map" 
                className="w-full h-full object-cover opacity-80"
              />

              {/* Floating Tech Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-lg p-4 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] border border-white/50 flex items-center gap-4">
                <div className="relative">
                  <img 
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-white shadow-sm" 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Technician" 
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-sm">Marcus Johnson</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#004ac6]">schedule</span>
                    Arriving in approx. 8 mins
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all duration-200 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </button>
                  <button className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[#004ac6] hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all duration-200 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-slate-800">Job Status</h2>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">ID: #FX-88219</span>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Background Line */}
              <div className="hidden md:block absolute top-5 left-0 right-0 h-1 bg-slate-100 rounded-full z-0">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full relative">
                  <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-4 border-[#57dffe] rounded-full shadow-sm"></div>
                </div>
              </div>

              {/* Steps */}
              {[
                { icon: 'check', label: 'Pending', done: true },
                { icon: 'check', label: 'Assigned', done: true },
                { icon: 'local_shipping', label: 'On the way', active: true },
                { icon: 'play_arrow', label: 'Started', pending: true },
                { icon: 'task_alt', label: 'Completed', pending: true },
              ].map((step, i) => (
                <div key={i} className={`relative z-10 flex flex-col items-center text-center w-20 ${step.pending ? 'opacity-40' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-md
                    ${step.active ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]' : 
                    step.done ? 'bg-[#004ac6]' : 'bg-slate-200 text-slate-400 shadow-none'}`}>
                    <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step.active ? 'text-[#004ac6] font-bold' : 'text-slate-500'}`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
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

              <div className="grid grid-cols-2 gap-3">
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

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Estimate</label>
                  <div className="bg-gradient-to-r from-[#004ac6]/5 to-[#57dffe]/5 border border-[#004ac6]/10 py-2 px-3 rounded-lg flex items-center justify-center font-bold text-sm text-[#004ac6]">
                    $80 - $120
                  </div>
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
          <a href="#" className="text-sm font-semibold text-[#004ac6] hover:underline">View All</a>
        </div>

        <div className="space-y-4">
          {[
            { icon: 'bolt', title: 'Electrical Panel Inspection', sub: 'Completed Oct 24 • Pro: Sarah L.', amount: '$210.00', status: 'Receipt' },
            { icon: 'ac_unit', title: 'HVAC Winterization', sub: 'Scheduled Nov 1 • Pro: Waiting...', amount: 'Scheduled', status: 'Edit' },
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
                <span className={`text-sm font-bold ${i === 0 ? 'text-slate-800' : 'text-slate-400 bg-slate-50 px-3 py-1 rounded-lg'}`}>{item.amount}</span>
                <button className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200
                  ${i === 0 
                    ? 'border-[#004ac6]/20 text-[#004ac6] hover:bg-[#004ac6] hover:text-white' 
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                  {item.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MiddleContent;