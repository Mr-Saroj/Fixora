import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-glass dark:bg-background-dark/70 backdrop-blur-md border-b border-white/40 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo - Updated to use Link so it goes to Home without refreshing */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
          <svg width="140" height="42" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <g transform="translate(0, 10)">
              <path d="M10 0 C10 0 40 0 40 5 C40 10 20 12 20 15 L20 25 L35 25 C35 25 35 30 30 30 L20 30 L20 45 L10 45 L10 0" fill="url(#logo-grad)" />
              <circle cx="45" cy="5" r="5" fill="#10B981" />
              <text x="65" y="35" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="32" fill="#0F172A">Fixora</text>
            </g>
          </svg>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {/* Note: Hash links stay as standard <a> tags so they scroll on the home page */}
          <a className="text-[16px] text-primary font-bold border-b-2 border-primary pb-1 transition-all" href="#marketplace">
            Marketplace
          </a>
          <a className="text-[16px] text-text-muted hover:text-primary transition-all duration-300 spring" href="#how-it-works">
            How it Works
          </a>
          <a className="text-[16px] text-text-muted hover:text-primary transition-all duration-300 spring" href="#pricing">
            Pricing
          </a>
          <a className="text-[16px] text-text-muted hover:text-primary transition-all duration-300 spring" href="#support">
            Support
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {/* 2. Login Link */}
          <Link 
            to="/login" 
            className="text-[14px] font-medium text-text-muted hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-all inline-block"
          >
            Login
          </Link>
          
          {/* 3. Register (Get Started) Link */}
          <Link 
            to="/register" 
            className="bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white text-[14px] font-medium px-6 py-2.5 rounded-full shadow-[0_8px_20px_-4px_rgba(0,74,198,0.35)] hover:translate-y-[-2px] hover:shadow-[0_12px_25px_-4px_rgba(0,74,198,0.5)] active:scale-95 transition-all duration-300 inline-block text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;