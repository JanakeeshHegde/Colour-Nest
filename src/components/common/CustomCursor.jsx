import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor = () => {
  const reducedMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch screens, mobile devices or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 992;
    if (isTouch || isSmallScreen || reducedMotion) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering an interactive element with data-cursor
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovering(true);
        setCursorText(target.getAttribute('data-cursor') || 'VIEW');
      } else {
        const isClickable = e.target.closest('a, button, [role="button"], input, select, textarea');
        if (isClickable) {
          setIsHovering(true);
          setCursorText('');
        } else {
          setIsHovering(false);
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [reducedMotion]);

  // Spring animation for follower
  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId;

    const follow = () => {
      setFollowerPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18
        };
      });
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          opacity: isHovering && cursorText ? 0 : 1
        }}
      />
      <div
        className={`custom-cursor-follower ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`
        }}
      >
        <span className="cursor-label">{cursorText}</span>
      </div>
    </>
  );
};
