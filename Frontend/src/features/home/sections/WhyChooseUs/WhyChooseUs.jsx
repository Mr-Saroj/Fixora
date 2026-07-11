import React from 'react';
import SectionHeader from '../../components/SectionHeader';

const WhyChooseUs = () => (
  <section className="py-20 md:py-32 bg-surface-container-lowest border-y border-black/[0.04]">
    <div className="max-w-[1280px] mx-auto px-6">
      <SectionHeader 
        badge="The Fixora Advantage"
        title="Why Elite Homeowners Trust Us"
        subtitle="Institutional-grade reliability, transparent telemetry, and zero guesswork."
      />
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: 'shield_lock', title: '100% Escrow Protection', desc: 'Funds are never released until you digitally sign off on the completed, perfected job.' },
          { icon: 'psychology', title: 'AI-Precision Matching', desc: 'Our algorithm connects you with specialized pros based on real-time availability and tools.' },
          { icon: 'history', title: 'Full Audit Trail', desc: 'Live GPS telemetry, photographic proof of work, and permanent digital invoice records.' }
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-10px_rgba(0,74,198,0.18)] hover:-translate-y-2 ring-1 ring-black/[0.03] transition-all duration-500 reveal-card">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-[0_6px_15px_-3px_rgba(0,74,198,0.2)]">
              <span className="material-symbols-outlined text-[30px]">{item.icon}</span>
            </div>
            <h3 className="text-[22px] font-bold text-text-main mb-3">{item.title}</h3>
            <p className="text-text-muted text-[15px] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;