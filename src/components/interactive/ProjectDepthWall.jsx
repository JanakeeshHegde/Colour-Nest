import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Compass, Eye, Sparkles } from 'lucide-react';

export const ProjectDepthWall = ({ projects }) => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '620px',
        backgroundColor: '#121213',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        padding: '3rem 2rem',
        perspective: '1200px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              color: 'var(--accent, #B85C38)',
              fontWeight: 700
            }}
          >
            INTERACTIVE 3D DEPTH WALL
          </span>
          <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.8rem', color: '#FFFFFF', margin: '0.25rem 0 0 0' }}>
            SPATIAL PORTFOLIO IN DEPTH.
          </h2>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.65rem',
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.12em'
          }}
        >
          MOVE CURSOR TO SHIFT DEPTH PLANE
        </span>
      </div>

      {/* 3D Depth Card Grid with Staggered Z-Offsets */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: `rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`
        }}
      >
        {projects.map((proj, idx) => {
          // Stagger depth: odd cards are further back, even cards closer
          const baseZ = (idx % 3 === 0 ? 30 : idx % 2 === 0 ? 0 : -30);
          const isHovered = hoveredId === proj.id;
          const currentZ = isHovered ? baseZ + 45 : baseZ;

          return (
            <motion.div
              key={proj.id}
              onMouseEnter={() => setHoveredId(proj.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/projects/${proj.slug}`)}
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateZ(${currentZ}px) scale(${isHovered ? 1.03 : 1})`,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                backgroundColor: 'rgba(26, 27, 28, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: isHovered
                  ? '1.5px solid var(--accent, #B85C38)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                  ? '0 25px 50px rgba(0,0,0,0.7), 0 0 20px rgba(184, 92, 56, 0.3)'
                  : '0 10px 30px rgba(0,0,0,0.4)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              data-cursor="VIEW"
            >
              {/* Project Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = proj.fallbackHero;
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'rgba(18, 18, 19, 0.85)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.62rem',
                    color: '#FFFFFF'
                  }}
                >
                  {proj.category}
                </div>
              </div>

              {/* Card Meta */}
              <div style={{ padding: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.65rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}
                >
                  {proj.location} • {proj.year}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.25rem',
                    color: '#FFFFFF',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  {proj.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {proj.summary}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    color: 'var(--accent, #B85C38)',
                    letterSpacing: '0.12em',
                    fontWeight: 600
                  }}
                >
                  <span>ENTER CASE STUDY</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
