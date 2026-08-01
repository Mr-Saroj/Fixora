import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <header className="relative min-h-screen flex items-center pt-28 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">

        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8 text-center lg:text-left reveal-on-scroll">

          <h1 className="text-4xl sm:text-5xl lg:text-[60px] leading-tight lg:leading-[1.1] font-bold tracking-tight text-text-main">
            Trusted{" "}
            <span className="bg-gradient-to-r from-[#004ac6] to-[#57dffe] bg-clip-text text-transparent">
              Home Services
            </span>{" "}
            at Your Doorstep
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
            Fixora connects customers with skilled local technicians for
            plumbing, electrical work, AC repair, carpentry, appliance
            servicing, painting, and more. Book a service in minutes,
            track your request in real time, and get reliable home
            services with complete transparency.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <a
              href="/login"
              className="w-full sm:w-auto bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white text-[15px] font-medium px-8 py-4 rounded-xl flex items-center justify-center group shadow-[0_10px_25px_-5px_rgba(0,74,198,0.4)] hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              Book a Service

              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>

            <a
              href="/login"
              className="w-full sm:w-auto bg-white text-text-main text-[15px] font-medium px-8 py-4 rounded-xl text-center shadow-[0_5px_20px_-5px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.05] hover:ring-primary/30 hover:shadow-lg transition-all"
            >
              Join as Technician
            </a>

          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-6 border-t border-black/[0.06]">

            <div className="flex -space-x-3">

              <img
                className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                src="/Images/User1.avif"
                alt="Technician"
              />

              <img
                className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                src="/Images/User2.avif"
                alt="Electrician"
              />

              <img
                className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
               src="/Images/User3.avif"
                alt="Plumber"
              />

              <div className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white flex items-center justify-center text-xs font-bold shadow-md">
                500+
              </div>

            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-bold text-text-main text-base">
                Trusted by Customers
              </h4>

              <p className="text-sm text-text-muted mt-1">
                Skilled Professionals • Fast Service • Secure Platform
              </p>
            </div>

          </div>

        </div>

        {/* Right Image - Hidden on Mobile & Tablet */}
        <div className="hidden lg:block reveal-on-scroll">

          <div className="relative w-full aspect-square bg-gradient-to-br from-primary/10 to-secondary-container/10 rounded-3xl p-6 shadow-[0_20px_50px_-10px_rgba(0,74,198,0.15)] ring-1 ring-black/[0.03] flex items-center justify-center">

            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative group rotate-1 hover:rotate-0 transition-transform duration-700">

              <img
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                src="/Images/HeroImage.avif"
                alt="Fixora Technician"
              />

              {/* Floating Status Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,74,198,0.25)] ring-1 ring-black/[0.05] flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined">
                      handyman
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-text-main">
                      Technician Assigned
                    </h4>

                    <p className="text-xs text-text-muted">
                      Your service request is in progress.
                    </p>
                  </div>

                </div>

                <span className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  In Progress
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Hero;