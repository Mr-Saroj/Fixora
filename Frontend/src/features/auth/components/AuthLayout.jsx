import React from 'react';
import Footer from '../../../components/layout/Footer';
import Navbar from '../../../components/layout/Navbar';

// Adjust these import paths depending on where your global components are


const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden z-0">

      {/* Global Top Navigation */}
      <Navbar />

      {/* Ambient Background Glows (Fixed to stay behind content) */}
      <div className="fixed top-[10%] left-[15%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-[10%] right-[15%] w-[500px] h-[500px] bg-[#57dffe]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Main Content Area - 'flex-grow' ensures footer is pushed to the bottom */}
      <main className="flex-grow flex flex-col justify-center items-center p-6 pt-32 pb-20">

        {/* Main Auth Card */}
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,74,198,0.15)] ring-1 ring-black/[0.04] reveal-on-scroll">

          {/* Mobile Logo Fallback (Only shows on very small screens where Navbar might be cramped) */}
          <div className="md:hidden text-center mb-6">
            <span className="text-[32px] font-bold bg-gradient-to-r from-primary to-secondary-container bg-clip-text text-transparent">
              Fixora
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">{title}</h1>
            {subtitle && <p className="text-text-muted mt-2 text-[15px] leading-relaxed">{subtitle}</p>}
          </div>

          {children}
        </div>

      </main>

      {/* Global Bottom Footer */}
      <Footer />

    </div>
  );
};

export default AuthLayout;