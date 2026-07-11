import React, { useState, useRef, useEffect } from 'react';
import { useCounter } from '../../hooks/useCounter';

const StatItem = ({ label, value, suffix = '', start }) => {
  const count = useCounter(value, 2000, start);
  return (
    <div className="p-8 rounded-3xl bg-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.03] text-center reveal-card">
      <div className="text-[40px] sm:text-[48px] font-extrabold bg-gradient-to-r from-[#004ac6] to-[#57dffe] bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <p className="text-[15px] font-bold text-text-muted uppercase tracking-wider mt-2">{label}</p>
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
    <section ref={ref} className="py-16 max-w-[1280px] mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <StatItem label="Active Jobs" value={1420} suffix="+" start={inView} />
        <StatItem label="Verified Pros" value={850} suffix="+" start={inView} />
        <StatItem label="Avg Rating" value={4} suffix=".9/5" start={inView} />
        <StatItem label="Cities Served" value={24} suffix="" start={inView} />
      </div>
    </section>
  );
};

export default Stats;