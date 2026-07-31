import React from 'react';

const Contact = () => (
  <section
    id="support"
    className="py-20 md:py-32 bg-surface-container-lowest border-t border-black/[0.04]"
  >
    <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Side */}
      <div className="reveal-on-scroll">

        <div className="inline-flex items-center bg-primary/10 text-primary px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-4 ring-1 ring-primary/20">
          Contact Fixora
        </div>

        <h2 className="text-[32px] sm:text-[44px] font-extrabold text-text-main tracking-tight leading-tight">
          Need Help? We're Here for You.
        </h2>

        <p className="text-text-muted text-[16px] sm:text-[18px] mt-4 leading-relaxed max-w-lg">
          Whether you're a customer booking a service or a technician using
          Fixora, our support team is ready to help with your questions,
          account issues, payments, or service requests.
        </p>

        <div className="space-y-6 mt-8">

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">mail</span>
            </div>

            <div>
              <p className="text-[13px] text-text-muted font-bold uppercase">
                Email Support
              </p>

              <p className="text-[16px] font-bold text-text-main">
                support@fixora.com
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">call</span>
            </div>

            <div>
              <p className="text-[13px] text-text-muted font-bold uppercase">
                Phone Support
              </p>

              <p className="text-[16px] font-bold text-text-main">
                +91 98765 43210
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">
                location_on
              </span>
            </div>

            <div>
              <p className="text-[13px] text-text-muted font-bold uppercase">
                Service Area
              </p>

              <p className="text-[16px] font-bold text-text-main">
                Odisha, India
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Contact Form */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] reveal-card">

        <form
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >

          <div>
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
              Subject
            </label>

            <input
              type="text"
              placeholder="How can we help?"
              className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-text-main uppercase mb-2">
              Message
            </label>

            <textarea
              rows="5"
              placeholder="Describe your issue or question..."
              className="w-full px-4 py-3.5 rounded-xl border border-black/[0.1] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px]"
            ></textarea>
          </div>

          <button
            className="w-full py-4 bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white font-bold text-[16px] rounded-xl shadow-[0_10px_20px_-5px_rgba(0,74,198,0.4)] hover:opacity-95 active:scale-95 transition-all"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  </section>
);

export default Contact;