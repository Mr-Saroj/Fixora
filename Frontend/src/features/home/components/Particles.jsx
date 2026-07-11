import React from 'react';

const Particles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
    <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-[50%] right-[10%] w-96 h-96 bg-[#57dffe]/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
  </div>
);

export default Particles;