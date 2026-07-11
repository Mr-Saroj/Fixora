import { useState, useEffect } from 'react';

export const useCounter = (end, duration = 2000, startAnimating = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimating) return;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(animate);
  }, [end, duration, startAnimating]);

  return count;
};