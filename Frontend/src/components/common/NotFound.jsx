import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] text-center px-6">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-[56px] text-slate-400">construction</span>
      </div>

      {/* Text Content */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
        Page Not Developed Yet
      </h1>
      <p className="text-slate-500 text-base md:text-lg max-w-md mb-10 leading-relaxed">
        This page has not been developed by the developer yet. 
        Please check back later or return to the previous page.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-[0_8px_20px_-4px_rgba(0,74,198,0.3)] hover:shadow-[0_12px_25px_-4px_rgba(0,74,198,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Return to Back
      </button>
    </div>
  );
};

export default NotFound;