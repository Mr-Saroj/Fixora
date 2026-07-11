import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import PricingCard from './PricingCard';
import { pricingData } from './pricingData';

const Pricing = () => (
  <section id="pricing" className="py-20 md:py-32 max-w-[1280px] mx-auto px-6">
    <SectionHeader 
      badge="Memberships"
      title="Fixora Pro Memberships" 
      subtitle="Scale your service business with institutional-grade tools designed for professionals."
    />
    <div className="grid lg:grid-cols-3 gap-8 items-stretch">
      {pricingData.map((plan, idx) => (
        <PricingCard key={idx} {...plan} />
      ))}
    </div>
  </section>
);

export default Pricing;