import React from 'react';

const PricingCard = ({ title, price, desc, features, popular, contact }) => (
  <div className={`p-8 rounded-3xl flex flex-col justify-between h-full relative transition-all duration-500 reveal-card ${
    popular 
      ? 'bg-white ring-2 ring-primary shadow-[0_25px_60px_-15px_rgba(0,74,198,0.25)] lg:-translate-y-4 hover:shadow-[0_30px_70px_-15px_rgba(0,74,198,0.35)] hover:-translate-y-6' 
      : 'bg-white ring-1 ring-black/[0.04] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_25px_50px_-10px_rgba(0,74,198,0.15)] hover:-translate-y-2'
  }`}>
    {popular && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white text-[11px] px-4 py-1 rounded-full uppercase font-bold tracking-wider shadow-[0_6px_15px_-3px_rgba(0,74,198,0.5)]">
        Popular
      </div>
    )}
    
    <div>
      <div className="mb-6">
        <h3 className="text-[24px] font-bold text-text-main">{title}</h3>
        {desc && <p className="text-[13px] text-text-muted mt-1">{desc}</p>}
        <div className="mt-4 flex items-baseline">
          <span className="text-[36px] font-extrabold text-text-main tracking-tight">${price}</span>
          <span className="text-text-muted ml-1 text-[15px] font-medium">/mo</span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-black/[0.06] mb-6"></div>

      <ul className="space-y-3.5 mb-8 text-[14px]">
        {features.map((f, i) => (
          <li key={i} className="flex items-center text-text-muted">
            <span className="material-symbols-outlined text-primary mr-3 text-[20px] shrink-0">check</span> 
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <button className={`w-full py-3.5 rounded-xl font-medium text-[15px] transition-all duration-300 active:scale-95 ${
      popular 
        ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 hover:shadow-[0_15px_25px_-5px_rgba(0,74,198,0.6)] hover:-translate-y-0.5' 
        : 'bg-white text-primary ring-1 ring-primary/30 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] hover:bg-primary/5 hover:ring-primary hover:shadow-[0_8px_20px_-5px_rgba(0,74,198,0.15)] hover:-translate-y-0.5'
    }`}>
      {contact ? 'Contact Sales' : 'Get Started'}
    </button>
  </div>
);

export default PricingCard;