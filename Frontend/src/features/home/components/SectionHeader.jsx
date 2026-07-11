import React from 'react';

const SectionHeader = ({ badge, title, subtitle }) => (
  <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
    {badge && (
      <div className="inline-flex items-center bg-primary/10 text-primary px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-4 ring-1 ring-primary/20">
        {badge}
      </div>
    )}
    <h2 className="text-[32px] sm:text-[40px] font-bold text-text-main mb-4 tracking-tight">
      {title}
    </h2>
    <p className="text-text-muted text-[16px] sm:text-[18px] leading-relaxed">
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;