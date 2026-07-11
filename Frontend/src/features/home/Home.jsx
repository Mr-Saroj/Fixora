import React from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import Particles from './components/Particles';

// Global Layout Components


// Section Imports
import Hero from './sections/Hero/Hero';
import Services from './sections/Services/Services';
import Stats from './sections/Stats/Stats';
import WhyChooseUs from './sections/WhyChooseUs/WhyChooseUs';
import Emergency from './sections/Emergency/Emergency';
import HowItWorks from './sections/HowItWorks/HowItWorks';
import Pricing from './sections/Pricing/Pricing';
import Testimonials from './sections/Testimonials/Testimonials';
import FAQ from './sections/FAQ/FAQ';
import Contact from './sections/Contact/Contact';
import CTA from './sections/CTA/CTA';

import './Home.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';


const Home = () => {
  // Initialize Global Scroll & Card Reveal Animations
  useScrollReveal();

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary/20 selection:text-primary min-h-screen relative">
      
      {/* Background Ambient Particles */}
      <Particles />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Render Feature Sections */}
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyChooseUs />
        <Emergency />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA />
      </main>

      {/* Bottom Footer */}
      <Footer />

    </div>
  );
};

export default Home;