import React from "react";
import "./Hero.css";
import GradientButton from "../../../../components/ui/GradientButton";

const Hero = () => {
  return (
    <header className="relative flex flex-col lg:min-h-screen lg:items-center pt-28 md:pt-24 pb-0 md:pb-16 overflow-hidden bg-gradient-to-br from-[#e6f2fb] via-[#f8fbff] to-[#e0f6fc] z-0">

      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="hero-glow hero-glow-1 absolute -top-[10%] -left-[20%] w-[120%] h-[50%] md:w-[70%] md:h-[70%] rounded-full bg-[#004ac6] blur-[100px] md:blur-[120px] opacity-[0.15] md:opacity-[0.12]"></div>
        <div className="hero-glow hero-glow-2 absolute -bottom-[10%] -right-[20%] w-[120%] h-[50%] md:w-[60%] md:h-[60%] rounded-full bg-[#57dffe] blur-[100px] md:blur-[120px] opacity-[0.25]"></div>
        <div className="hero-glow hero-glow-3 hidden md:block absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] blur-[100px] opacity-[0.12]"></div>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-5 md:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-12 items-center relative z-10">

        {/* ── Left Content ── */}
        <div className="hero-left-content flex flex-col justify-center space-y-6 md:space-y-8 text-center lg:text-left pt-2 lg:pt-0 pb-10 lg:pb-0">

          <h1 className="hero-fade-up hero-delay-1 text-4xl sm:text-5xl lg:text-[60px] lg:leading-[1.1] font-bold tracking-tight text-text-main">
            Trusted{" "}
            <span className="bg-gradient-to-r from-[#004ac6] to-[#57dffe] bg-clip-text text-transparent">
              Home Services
            </span>{" "}
            <br className="hidden sm:block lg:hidden" />
            at Your Doorstep
          </h1>

          <p className="hero-fade-up hero-delay-2 text-[15px] sm:text-lg text-text-muted leading-relaxed max-w-[480px] mx-auto lg:mx-0">
            Fixora connects customers with skilled local technicians for
            plumbing, electrical work, AC repair, carpentry, appliance
            servicing, painting, and more.
          </p>

          <div className="hero-fade-up hero-delay-3 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0">
            <GradientButton
              to="/login"
              size="xl"
              showArrow
              className="w-full sm:w-auto shadow-[0_10px_25px_-5px_rgba(0,74,198,0.3)]"
            >
              Book a Service
            </GradientButton>

            <a
              href="/login"
              className="hero-ghost-btn w-full sm:w-auto bg-white/80 backdrop-blur-sm text-text-main text-[15px] font-medium px-8 py-4 rounded-xl text-center shadow-[0_5px_20px_-5px_rgba(0,10,50,0.08)] ring-1 ring-[#004ac6]/10 hover:ring-[#004ac6]/30 hover:shadow-lg transition-all"
            >
              Join as Technician
            </a>
          </div>

          <div className="hero-fade-up hero-delay-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pt-6 mt-2 border-t border-[#004ac6]/10 w-full max-w-md mx-auto lg:mx-0">
            <div className="hero-avatars flex -space-x-3">
              <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover shadow-md" src="/Images/User1.avif" alt="Technician" />
              <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover shadow-md" src="/Images/User2.avif" alt="Electrician" />
              <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover shadow-md" src="/Images/User3.avif" alt="Plumber" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-md">
                500+
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-bold text-text-main text-[15px] sm:text-base">
                Trusted by Customers
              </h4>
              <p className="text-[13px] sm:text-sm text-text-muted mt-0.5">
                Fast Service • Secure Platform
              </p>
            </div>
          </div>

        </div>

        {/* ── Right Image ── */}
        <div className="hidden lg:block hero-fade-right hero-delay-3 w-full max-w-[450px] mx-auto lg:max-w-none mt-0 lg:mt-0 pb-16 lg:pb-0">

          <div className="hero-image-wrapper relative w-full aspect-square bg-gradient-to-br from-[#004ac6]/10 to-[#57dffe]/20 rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_-10px_rgba(0,74,198,0.15)] ring-1 ring-white flex items-center justify-center">

            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative group lg:rotate-1 hover:rotate-0 transition-transform duration-700">

              <img
                className="w-full h-full object-cover lg:scale-105 group-hover:scale-100 transition-transform duration-700"
                src="/Images/HeroImage.avif"
                alt="Fixora Technician"
              />

              {/* Floating Status Card */}
              <div className="hero-float-card absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,74,198,0.25)] ring-1 ring-white flex items-center justify-between">

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-[18px] sm:text-[24px]">handyman</span>
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-text-main leading-tight">Technician Assigned</h4>
                    <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">Service in progress.</p>
                  </div>
                </div>

                <span className="hero-pulse-badge text-[10px] sm:text-[11px] font-bold text-[#004ac6] bg-[#004ac6]/10 px-2.5 py-1 rounded-full border border-[#004ac6]/20">
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