import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <header className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="flex flex-col justify-center space-y-8 reveal-on-scroll">
                    <h1 className="text-[48px] sm:text-[60px] leading-[1.1] font-bold text-text-main tracking-tight">
                        Book Trusted Home Service <span className="bg-gradient-to-r from-[#004ac6] to-[#57dffe] bg-clip-text text-transparent">Professionals</span> in Minutes
                    </h1>

                    <p className="text-[18px] text-text-muted max-w-xl leading-relaxed">
                        Fixora connects you with top-tier, AI-verified technicians for all your home maintenance needs. Reliable, transparent, and effortlessly simple.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <a href="#marketplace" className="bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white text-[15px] font-medium px-8 py-4 rounded-xl flex items-center group shadow-[0_10px_25px_-5px_rgba(0,74,198,0.4)] hover:translate-y-[-2px] hover:shadow-[0_15px_30px_-5px_rgba(0,74,198,0.6)] active:scale-95 transition-all duration-300">
                            Explore Marketplace
                            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                        <a href="#pricing" className="bg-white text-text-main text-[15px] font-medium px-8 py-4 rounded-xl shadow-[0_5px_20px_-5px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.05] hover:ring-primary/30 hover:shadow-[0_10px_25px_-5px_rgba(0,74,198,0.15)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                            View Pricing
                        </a>
                    </div>

                    <div className="flex items-center space-x-6 pt-6 border-t border-black/[0.06]">
                        <div className="flex -space-x-3 overflow-hidden p-1">
                            <img className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Plumber" />
                            <img className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Electrician" />
                            <img className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" alt="Carpenter" />
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white flex items-center justify-center text-[12px] font-semibold shadow-md">
                                4.9k
                            </div>
                        </div>
                        <div className="text-text-muted text-[13px] font-medium">
                            <span className="text-text-main font-bold text-[15px]">4.9/5</span> from over 10k bookings
                        </div>
                    </div>
                </div>

                <div className="relative hidden lg:block reveal-on-scroll">
                    <div className="relative w-full aspect-square bg-gradient-to-br from-primary/10 to-secondary-container/10 rounded-3xl p-6 shadow-[0_20px_50px_-10px_rgba(0,74,198,0.15)] ring-1 ring-black/[0.03] flex items-center justify-center">
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative group transform rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
                            <img className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80" alt="Technician working" />

                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,74,198,0.25)] ring-1 ring-black/[0.05] flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                <div className="flex items-center space-x-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white flex items-center justify-center font-bold shadow-[0_6px_15px_-3px_rgba(0,74,198,0.4)]">
                                        <span className="material-symbols-outlined text-[22px]">check</span>
                                    </div>
                                    <div>
                                        <h4 className="text-[14px] font-bold text-text-main">Verified Pro Assigned</h4>
                                        <p className="text-[12px] text-text-muted">ID: #FX-9842 • Arriving in 15 mins</p>
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full ring-1 ring-primary/20">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </header>
    );
};

export default Hero;