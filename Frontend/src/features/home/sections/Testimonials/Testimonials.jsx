import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import { testimonialsData } from '../../data/testimonials';

const Testimonials = () => (
  <section className="py-16 md:py-32 bg-surface-container-lowest border-y border-black/[0.04]">
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
      
      <SectionHeader 
        badge="Social Proof"
        title="Loved by Homeowners & Pros"
        subtitle="Read real stories from our network of verified clients and master technicians."
      />
      
      {/* Changed to grid-cols-2 by default (mobile), md:grid-cols-3 for desktop. Also reduced mobile gap. */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        
        {testimonialsData.map((item, idx) => (
          <div 
            key={idx} 
            /* Reduced padding on mobile (p-4) to p-8 on desktop */
            className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_45px_-10px_rgba(0,74,198,0.15)] ring-1 ring-black/[0.03] flex flex-col justify-between transition-all duration-500 reveal-card"
          >
            
            {/* Stars - scaled down slightly for mobile */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 text-amber-400 mb-3 sm:mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px] sm:text-[20px] fill-current">
                  star
                </span>
              ))}
            </div>
            
            {/* Quote - smaller text size (12px) for mobile to fit narrow columns */}
            <p className="text-text-main text-[12px] sm:text-[16px] italic leading-relaxed mb-4 sm:mb-8 flex-grow">
              "{item.quote}"
            </p>
            
            {/* Profile Section */}
            <div className="flex items-center space-x-2 sm:space-x-4 pt-3 sm:pt-4 border-t border-black/[0.05]">
              {/* Avatar shrunk on mobile so it doesn't take up the whole card */}
              <img 
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover shadow-md shrink-0" 
                src={item.image} 
                alt={item.name} 
              />
              {/* Added overflow-hidden and truncate so very long names don't break the mobile box */}
              <div className="overflow-hidden">
                <h4 className="font-bold text-[12px] sm:text-[15px] text-text-main truncate">
                  {item.name}
                </h4>
                <p className="text-[10px] sm:text-[13px] text-text-muted truncate">
                  {item.role}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  </section>
);

export default Testimonials;