import React, { useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import { faqData } from '../../data/faq';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04] overflow-hidden transition-all duration-300 mb-3 sm:mb-4 reveal-card">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full p-4 sm:p-6 text-left font-bold text-[15px] sm:text-[18px] text-text-main flex justify-between items-center hover:text-primary transition-colors"
      >
        <span className="pr-4">{question}</span>
        
        <span className={`material-symbols-outlined text-[20px] sm:text-[24px] shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-primary' : 'text-text-muted'}`}>
          expand_more
        </span>
      </button>
      
      {open && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-text-muted text-[14px] sm:text-[15px] leading-relaxed border-t border-black/[0.04] pt-3 sm:pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <section className="py-16 md:py-32 max-w-4xl mx-auto px-4 sm:px-6">
    <SectionHeader 
      badge="Got Questions?"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about our dispatch engine, billing, and precision guarantees."
    />
    <div>
      {faqData.map((item, idx) => (
        <FAQItem key={idx} {...item} />
      ))}
    </div>
  </section>
);

export default FAQ;