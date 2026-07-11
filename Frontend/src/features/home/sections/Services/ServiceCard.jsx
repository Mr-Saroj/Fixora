import React from 'react';

const ServiceCard = ({ icon, name, desc }) => (
  <div className="p-8 rounded-3xl bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-10px_rgba(0,74,198,0.18)] hover:-translate-y-2 ring-1 ring-black/[0.03] hover:ring-primary/20 transition-all duration-500 cursor-pointer group flex flex-col justify-between reveal-card">
    <div>
      <div className="w-14 h-14 bg-white text-primary rounded-2xl flex items-center justify-center mb-6 shadow-[0_8px_20px_-6px_rgba(0,74,198,0.25)] ring-1 ring-primary/10 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#004ac6] group-hover:to-[#57dffe] group-hover:text-white group-hover:shadow-[0_10px_25px_-4px_rgba(0,74,198,0.5)] transition-all duration-300">
        <span className="material-symbols-outlined text-[30px]">{icon}</span>
      </div>
      <h3 className="text-[22px] font-bold text-text-main group-hover:text-primary transition-colors">{name}</h3>
      <p className="text-text-muted mt-2 text-[15px] leading-relaxed">{desc}</p>
    </div>
    
    <div className="mt-8 pt-4 border-t border-black/[0.04] flex items-center justify-between text-[13px] font-bold text-text-muted group-hover:text-primary transition-colors">
      <span>BOOK SERVICE</span>
      <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </div>
  </div>
);

export default ServiceCard;