import React from 'react';

const Contact = () => (
  <section
    id="support"
    className="py-12 md:py-32 bg-surface-container-lowest border-t border-black/[0.04]"
  >
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

      <div className="reveal-on-scroll">

        <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-wider mb-3 sm:mb-4 ring-1 ring-primary/20">
          Contact Fixora
        </div>

        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-text-main tracking-tight leading-tight">
          Need Help? We're Here for You.
        </h2>

        <p className="text-text-muted text-[14px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-4 leading-relaxed max-w-lg">
          Whether you're a customer booking a service or a technician using
          Fixora, our support team is ready to help with your questions,
          account issues, payments, or service requests.
        </p>

        <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">mail</span>
            </div>

            <div>
              <p className="text-[12px] sm:text-[13px] text-text-muted font-bold uppercase">
                Email Support
              </p>
              <p className="text-[14px] sm:text-[16px] font-bold text-text-main">
                support@fixora.com
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">call</span>
            </div>

            <div>
              <p className="text-[12px] sm:text-[13px] text-text-muted font-bold uppercase">
                Phone Support
              </p>
              <p className="text-[14px] sm:text-[16px] font-bold text-text-main">
                +91 98765 43210
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                location_on
              </span>
            </div>

            <div>
              <p className="text-[12px] sm:text-[13px] text-text-muted font-bold uppercase">
                Service Area
              </p>
              <p className="text-[14px] sm:text-[16px] font-bold text-text-main">
                Odisha, India
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] reveal-card">

        <form
          className="space-y-4 sm:space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >

          <div>
            <label className="block text-[12px] sm:text-[13px] font-bold text-text-main uppercase mb-1.5 sm:mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] sm:text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[12px] sm:text-[13px] font-bold text-text-main uppercase mb-1.5 sm:mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] sm:text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[12px] sm:text-[13px] font-bold text-text-main uppercase mb-1.5 sm:mb-2">
              Subject
            </label>

            <input
              type="text"
              placeholder="How can we help?"
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] sm:text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[12px] sm:text-[13px] font-bold text-text-main uppercase mb-1.5 sm:mb-2">
              Message
            </label>

            <textarea
              rows="4"
              placeholder="Describe your issue or question..."
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] sm:text-[15px]"
            ></textarea>
          </div>

          <button
            className="w-full py-3.5 sm:py-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[15px] sm:text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  </section>
);

export default Contact;