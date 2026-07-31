import React from 'react';
import SectionHeader from '../../components/SectionHeader';

const WhyChooseUs = () => (
  <section className="py-20 md:py-32 bg-surface-container-lowest border-y border-black/[0.04]">
    <div className="max-w-[1280px] mx-auto px-6">

      <SectionHeader
        badge="Why Choose Fixora"
        title="Everything You Need for Reliable Home Services"
        subtitle="From secure authentication to live service tracking, Fixora makes booking trusted technicians simple, fast, and transparent."
      />

      <div className="grid md:grid-cols-3 gap-8">

        {[
          {
            icon: "verified_user",
            title: "Trusted Local Technicians",
            desc: "Browse service requests across the platform while ensuring technicians can only accept jobs within their own city for faster and more reliable service."
          },

          {
            icon: "payments",
            title: "Secure Digital Payments",
            desc: "Technicians subscribe through Razorpay with a secure monthly payment, providing a trusted platform for finding genuine service opportunities."
          },

          {
            icon: "monitoring",
            title: "Real-Time Service Tracking",
            desc: "Track every service request from Pending to Accepted, In Progress, and Completed with transparent status updates throughout the job."
          },

          {
            icon: "lock_reset",
            title: "Secure Authentication",
            desc: "JWT-based authentication with email OTP password recovery keeps customer and technician accounts protected."
          },

          {
            icon: "cloud_upload",
            title: "Cloud Image Storage",
            desc: "Service images are securely uploaded to Cloudinary, providing fast, reliable, and scalable cloud storage."
          },

          {
            icon: "reviews",
            title: "Customer Feedback",
            desc: "After every completed service, customers can submit ratings and feedback to help maintain service quality."
          }

        ].map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-10px_rgba(0,74,198,0.18)] hover:-translate-y-2 ring-1 ring-black/[0.03] transition-all duration-500 reveal-card"
          >

            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-[0_6px_15px_-3px_rgba(0,74,198,0.2)]">
              <span className="material-symbols-outlined text-[30px]">
                {item.icon}
              </span>
            </div>

            <h3 className="text-[22px] font-bold text-text-main mb-3">
              {item.title}
            </h3>

            <p className="text-text-muted text-[15px] leading-relaxed">
              {item.desc}
            </p>

          </div>
        ))}

      </div>
    </div>
  </section>
);

export default WhyChooseUs;