import React, { useState, useEffect } from 'react';

export const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          width: `${scrollPercentage}%`,
          height: '100%',
          backgroundColor: 'var(--accent, #B85C38)',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px var(--accent)'
        }}
      />
    </div>
  );
};
