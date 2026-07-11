import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import ServiceCard from './ServiceCard';
import { servicesData } from './servicesData';

const Services = () => (
  <section id="marketplace" className="py-20 md:py-32 max-w-[1280px] mx-auto px-6">
    <SectionHeader 
      badge="Marketplace"
      title="World-Class Home Care" 
      subtitle="Precision services delivered by experts. Choose from our wide range of maintenance solutions."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {servicesData.map((service, idx) => (
        <ServiceCard key={idx} {...service} />
      ))}
    </div>
  </section>
);

export default Services;