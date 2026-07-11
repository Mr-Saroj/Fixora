import React from 'react';

const StepCard = ({ step, title, desc }) => (
  <div className="relative z-10 text-center p-8 rounded-3xl bg-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_25px_45px_-10px_rgba(0,74,198,0.18)] hover:-translate-y-2 ring-1 ring-black/[0.03] transition-all duration-500 reveal-card group">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white flex items-center justify-center mx-auto mb-6 text-[22px] font-bold shadow-[0_10px_25px_-5px_rgba(0,74,198,0.5)] transform -rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
      {step}
    </div>
    <h4 className="text-[22px] font-bold text-text-main mb-3">{title}</h4>
    <p className="text-text-muted text-[15px] leading-relaxed">{desc}</p>
  </div>
);

export default StepCard;