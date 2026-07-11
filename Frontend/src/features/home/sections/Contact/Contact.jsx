import React from 'react';
import SectionHeader from '../../components/SectionHeader';

const Contact = () => (
  <section id="support" className="py-20 md:py-32 bg-surface-container-lowest border-t border-black/[0.04]">
    <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div className="reveal-on-scroll">
        <div className="inline-flex items-center bg-primary/10 text-primary px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-4 ring-1 ring-primary/20">
          Support Center
        </div>
        <h2 className="text-[32px] sm:text-[44px] font-extrabold text-text-main tracking-tight leading-tight">
          We’re Here to Help You Build & Maintain.
        </h2>
        <p className="text-text-muted text-[16px] sm:text-[18px] mt-4 leading-relaxed max-w-lg">
          Need a custom franchise consultation or direct support with an ongoing booking? Our human dispatch team operates 24/7.
        </p>
        
        <div className="space-y-6 mt-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <p className="text-[13px] text-text-muted font-bold uppercase">Email Us</p>
              <p className="text-[16px] font-bold text-text-main">concierge@fixora.ai</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <p className="text-[13px] text-text-muted font-bold uppercase">Global Headquarters</p>
              <p className="text-[16px] font-bold text-text-main">100 Innovation Way, Tech District, CA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] reveal-card">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px]" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px]" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2">Message</label>
            <textarea rows="4" className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px]" placeholder="How can our team assist you?"></textarea>
          </div>
          <button className="w-full py-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all">
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default Contact;