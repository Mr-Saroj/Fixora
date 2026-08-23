import React from 'react';

const Emergency = () => (
  <section className="py-8 md:py-16 max-w-[1280px] mx-auto px-4 sm:px-6">
    
    <div className="p-6 sm:p-8 md:p-14 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white shadow-[0_25px_60px_-15px_rgba(0,74,198,0.4)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 reveal-on-scroll">

      <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Left Content */}
      <div className="max-w-2xl text-center md:text-left z-10">

        <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-3 py-1 md:px-3.5 md:py-1 rounded-full text-[10px] md:text-[12px] font-bold tracking-wider uppercase mb-3 md:mb-4">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 mr-2"></span>
          Fast • Reliable • Secure
        </div>

        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-extrabold tracking-tight leading-tight">
          Need a Home Service?
        </h2>

        <p className="text-white/90 text-[14px] sm:text-[16px] md:text-[18px] mt-2 md:mt-3 leading-relaxed">
          Book trusted technicians for plumbing, electrical work, AC repair,
          carpentry, appliance servicing, painting, and more. Create your
          service request, track its progress in real time, and connect with
          skilled professionals in your city.
        </p>

      </div>

      {/* Button */}
      <div className="z-10 shrink-0 w-full md:w-auto mt-1 md:mt-0">

        <button className="w-full md:w-auto justify-center bg-white text-[#004ac6] hover:bg-slate-50 font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-200 flex items-center text-[15px] md:text-[16px]">

          <span className="material-symbols-outlined mr-2 text-[20px] md:text-[22px]">
            handyman
          </span>

          Book a Service

        </button>

      </div>

    </div>
  </section>
);

export default Emergency;