import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import { testimonialsData } from '../../data/testimonials';

const Testimonials = () => (
  <section className="py-20 md:py-32 bg-surface-container-lowest border-y border-black/[0.04]">
    <div className="max-w-[1280px] mx-auto px-6">
      <SectionHeader 
        badge="Social Proof"
        title="Loved by Homeowners & Pros"
        subtitle="Read real stories from our network of verified clients and master technicians."
      />
      <div className="grid md:grid-cols-3 gap-8">
        {testimonialsData.map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_45px_-10px_rgba(0,74,198,0.15)] ring-1 ring-black/[0.03] flex flex-col justify-between transition-all duration-500 reveal-card">
            <div className="flex items-center space-x-1 text-amber-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px] fill-current">star</span>
              ))}
            </div>
            <p className="text-text-main text-[16px] italic leading-relaxed mb-8">"{item.quote}"</p>
            <div className="flex items-center space-x-4 pt-4 border-t border-black/[0.05]">
              <img className="w-12 h-12 rounded-full object-cover shadow-md" src={item.image} alt={item.name} />
              <div>
                <h4 className="font-bold text-[15px] text-text-main">{item.name}</h4>
                <p className="text-[13px] text-text-muted">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;