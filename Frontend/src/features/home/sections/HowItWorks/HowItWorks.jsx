import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import StepCard from './StepCard';
import { stepData } from './stepData';

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 md:py-32 relative">
    <div className="max-w-[1280px] mx-auto px-6">
      <SectionHeader 
        badge="Workflow"
        title="How Fixora Works" 
        subtitle="A seamless experience engineered for both customers and professionals."
      />
      <div className="grid md:grid-cols-3 gap-10 relative">
        <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-y-4 z-0"></div>
        {stepData.map((item, idx) => (
          <StepCard key={idx} {...item} />
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;