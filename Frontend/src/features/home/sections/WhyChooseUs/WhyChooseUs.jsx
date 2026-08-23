import React from 'react';
import SectionHeader from '../../components/SectionHeader';

const WhyChooseUs = () => (
  <section className="py-16 md:py-32 bg-surface-container-lowest border-y border-black/[0.04]">
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

      <SectionHeader
        badge="Why Choose Fixora"
        title="Everything You Need for Reliable Home Services"
        subtitle="From secure authentication to live service tracking, Fixora makes booking trusted technicians simple, fast, and transparent."
      />

      {/* grid-cols-2 forces 2 cards per row on mobile. md:grid-cols-3 makes it 3 per row on desktop (change to md:grid-cols-2 if you want 2 on desktop too) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">

        {[
          {
            icon: "verified_user",
            title: "Trusted Local",
            desc: "Browse service requests across the platform securely within your city."
          },
          {
            icon: "payments",
            title: "Secure Payments",
            desc: "Technicians subscribe through Razorpay with a secure monthly payment."
          },
          {
            icon: "monitoring",
            title: "Live Tracking",
            desc: "Track every service request from Pending to Completed seamlessly."
          },
          {
            icon: "lock_reset",
            title: "Secure Login",
            desc: "JWT-based authentication with email OTP keeps your accounts protected."
          },
          {
            icon: "cloud_upload",
            title: "Cloud Storage",
            desc: "Service images are securely uploaded to Cloudinary for reliable access."
          },
          {
            icon: "reviews",
            title: "Real Feedback",
            desc: "Submit ratings and feedback to help maintain top service quality."
          }
        ].map((item, idx) => (
          <div
            key={idx}
            /* Adjusted padding (p-4 on mobile, p-8 on desktop) to fit 2 cards on small screens */
            className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-10px_rgba(0,74,198,0.18)] hover:-translate-y-1 sm:hover:-translate-y-2 ring-1 ring-black/[0.03] transition-all duration-500 reveal-card flex flex-col"
          >

            {/* Smaller icon for mobile, regular size for desktop */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 sm:mb-6 shadow-[0_6px_15px_-3px_rgba(0,74,198,0.2)]">
              <span className="material-symbols-outlined text-[20px] sm:text-[30px]">
                {item.icon}
              </span>
            </div>

            {/* Smaller title for mobile */}
            <h3 className="text-[14px] sm:text-[22px] font-bold text-text-main mb-2 sm:mb-3 leading-tight">
              {item.title}
            </h3>

            {/* Smaller description text for mobile */}
            <p className="text-text-muted text-[12px] sm:text-[15px] leading-relaxed">
              {item.desc}
            </p>

          </div>
        ))}

      </div>
    </div>
  </section>
);

export default WhyChooseUs;