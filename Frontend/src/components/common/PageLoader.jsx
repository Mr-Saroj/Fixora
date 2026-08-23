import React from "react";

const PageLoader = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#f7f9fb] antialiased relative z-50">
      
      {/* Moving Circle (Spinner) */}
      <div className="w-16 h-16 md:w-20 md:h-20 animate-spin flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            {/* Same Gradient as your GradientButton */}
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004ac6" />
              <stop offset="100%" stopColor="#57dffe" />
            </linearGradient>
          </defs>
          
          {/* Faint background track */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#e2e8f0" 
            strokeWidth="8"
          />
          
          {/* Animated gradient ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#loaderGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="180" 
            strokeDashoffset="60" 
          />
        </svg>
      </div>

      {/* Static Loading Text */}
      <div className="mt-5 text-center">
        <span className="text-[14px] md:text-[16px] font-medium text-[#64748B] tracking-[0.02em] animate-pulse">
          Loading...
        </span>
      </div>

    </div>
  );
};

export default PageLoader;