import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-card');
    revealElements.forEach((el, idx) => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-12');
      if (el.classList.contains('reveal-card')) {
        el.classList.add('scale-95');
        el.style.transitionDelay = `${(idx % 4) * 100}ms`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};