import React from 'react';

const Emergency = () => (
  <section className="py-16 max-w-[1280px] mx-auto px-6">
    <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-[0_25px_60px_-15px_rgba(0,74,198,0.4)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 reveal-on-scroll">

      <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Left Content */}
      <div className="max-w-2xl text-center md:text-left z-10">

        <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-[12px] font-bold tracking-wider uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
          Fast • Reliable • Secure
        </div>

        <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight leading-tight">
          Need a Home Service?
        </h2>

        <p className="text-white/90 text-[16px] sm:text-[18px] mt-3 leading-relaxed">
          Book trusted technicians for plumbing, electrical work, AC repair,
          carpentry, appliance servicing, painting, and more. Create your
          service request, track its progress in real time, and connect with
          skilled professionals in your city.
        </p>

      </div>

      {/* Button */}
      <div className="z-10 shrink-0">

        <button className="bg-white text-[#004ac6] hover:bg-slate-50 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-200 flex items-center text-[16px]">

          <span className="material-symbols-outlined mr-2 text-[22px]">
            handyman
          </span>

          Book a Service

        </button>

      </div>

    </div>
  </section>
);

export default Emergency;