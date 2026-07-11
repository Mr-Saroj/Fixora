import React, { useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import { faqData } from '../../data/faq';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04] overflow-hidden transition-all duration-300 mb-4 reveal-card">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left font-bold text-[18px] text-text-main flex justify-between items-center hover:text-primary transition-colors"
      >
        <span>{question}</span>
        <span className={`material-symbols-outlined text-[24px] transition-transform duration-300 ${open ? 'rotate-180 text-primary' : 'text-text-muted'}`}>
          expand_more
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-text-muted text-[15px] leading-relaxed border-t border-black/[0.04] pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <section className="py-20 md:py-32 max-w-4xl mx-auto px-6">
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