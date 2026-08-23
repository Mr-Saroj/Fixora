import React, { useState, useRef, useEffect } from 'react';
import { useCounter } from '../../hooks/useCounter';

const StatItem = ({ label, value, suffix = '', start }) => {
  const count = useCounter(value, 2000, start);
  return (
    
    <div className="p-5 sm:p-6 lg:p-8 rounded-3xl bg-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.03] text-center reveal-card flex flex-col justify-center">
      
      
      <div className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold bg-gradient-to-r from-[#004ac6] to-[#57dffe] bg-clip-text text-transparent whitespace-nowrap">
        {count}{suffix}
      </div>
      
     
      <p className="text-[12px] sm:text-[14px] lg:text-[15px] font-bold text-text-muted uppercase tracking-wider mt-1 sm:mt-2">
        {label}
      </p>
    </div>
  );
};

const Stats = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 max-w-[1280px] mx-auto px-5 sm:px-6">
      {/* Reduced grid gap on mobile from gap-6 to gap-4 to give cards more breathing room */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <StatItem label="Active Jobs" value={1420} suffix="+" start={inView} />
        <StatItem label="Verified Pros" value={850} suffix="+" start={inView} />
        <StatItem label="Avg Rating" value={4} suffix=".9/5" start={inView} />
        <StatItem label="Cities Served" value={24} suffix="" start={inView} />
      </div>
    </section>
  );
};

export default Stats;