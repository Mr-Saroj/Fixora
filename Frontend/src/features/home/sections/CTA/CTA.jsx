import React from 'react';

const CTA = () => (
  <section className="py-20 max-w-[1280px] mx-auto px-6">
    <div className="p-12 md:p-20 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden text-center flex flex-col items-center reveal-on-scroll">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#004ac6]/30 via-transparent to-[#57dffe]/20 pointer-events-none"></div>
      
      <h2 className="text-[36px] sm:text-[50px] font-extrabold tracking-tight max-w-2xl leading-tight z-10">
        Ready to Experience Precision Service Delivery?
      </h2>
      <p className="text-slate-300 text-[18px] max-w-xl mt-4 z-10">
        Join over 10,000+ homeowners and service professionals building the future of residential care.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-8 z-10">
        <button className="bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold px-10 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,74,198,0.5)] hover:scale-105 active:scale-95 transition-all">
          Book a Professional Now
        </button>
        <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-md active:scale-95 transition-all">
          Apply as a Technician
        </button>
      </div>
    </div>
  </section>
);

export default CTA;