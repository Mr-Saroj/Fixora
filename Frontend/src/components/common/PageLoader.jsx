import React, { useState, useEffect } from "react";

const PageLoader = () => {
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    const messages = [
      "Loading...",
      "Preparing your workspace...",
      "Fetching latest updates...",
      "Almost there..."
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setTimeout(() => {
        setLoadingText(messages[currentIndex]);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes rotate-ring {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-node {
            0%, 100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 2px #4edea3); }
            50% { transform: scale(1.3); opacity: 0.8; filter: drop-shadow(0 0 8px #4edea3); }
          }
          @keyframes text-fade {
            0%, 10% { opacity: 0; transform: translateY(4px); }
            20%, 80% { opacity: 1; transform: translateY(0px); }
            90%, 100% { opacity: 0; transform: translateY(-4px); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-rotate-slow { animation: rotate-ring 4s linear infinite; }
          .animate-pulse-node { animation: pulse-node 2s ease-in-out infinite; }
          .animate-text-sequence { animation: text-fade 3s ease-in-out infinite; }
          .glass-background {
            backdrop-filter: blur(12px);
            background: rgba(248, 250, 252, 0.9);
          }
          .glow-effect {
            filter: blur(40px);
            background: radial-gradient(circle, rgba(0, 74, 198, 0.15) 0%, rgba(0, 74, 198, 0) 70%);
          }
        `}
      </style>

      <div className="bg-[#f7f9fb] overflow-hidden font-sans text-[16px] text-[#1E293B] antialiased w-screen h-screen relative">

        {/* Blurred Background Mockup */}
        <div className="fixed inset-0 z-0 hidden md:block">
          <div className="absolute inset-0 flex">
            <div className="w-64 h-full bg-white border-r border-slate-200/50 blur-sm"></div>
            <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 blur-md">
              <div className="md:col-span-2 h-48 bg-white rounded-xl shadow-sm"></div>
              <div className="h-48 bg-white rounded-xl shadow-sm"></div>
              <div className="h-96 bg-white rounded-xl shadow-sm"></div>
              <div className="h-96 bg-white rounded-xl shadow-sm"></div>
              <div className="h-96 bg-white rounded-xl shadow-sm"></div>
            </div>
          </div>
          <div className="absolute inset-0 glass-background"></div>
        </div>

        {/* Mobile Overlay */}
        <div className="absolute inset-0 glass-background md:hidden"></div>

        {/* Main Loader Canvas */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4">

          <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">

            <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 glow-effect rounded-full"></div>

            <div className="absolute flex items-center justify-center animate-rotate-slow">
              <svg className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#004ac6" />
                    <stop offset="100%" stopColor="#57dffe" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke="url(#ringGradient)" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="relative animate-float flex items-center justify-center">
              <div className="relative w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
                <svg className="w-full h-full fill-[#004ac6] drop-shadow-sm" viewBox="0 0 100 100">
                  <path d="M30 20 H70 V35 H45 V50 H65 V65 H45 V85 H30 Z"></path>
                  <circle className="fill-[#4edea3] animate-pulse-node" cx="65" cy="27" r="6"></circle>
                </svg>
              </div>
            </div>

          </div>

          <div className="mt-6 md:mt-8 text-center h-8 flex flex-col items-center justify-start overflow-hidden">
            <span className="text-[12px] md:text-[14px] font-medium text-[#64748B] tracking-[0.01em] animate-text-sequence">
              {loadingText}
            </span>
          </div>

        </main>
      </div>
    </>
  );
};

export default PageLoader;