import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone, Mail, Facebook, ExternalLink } from 'lucide-react';
import { siteData } from '../../data/siteData';

export const Footer = () => {
  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#111112',
        color: '#FAF7F2',
        overflow: 'hidden',
        paddingTop: 'clamp(5rem, 12vw, 9rem)',
        paddingBottom: 'clamp(2.5rem, 6vw, 4rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Subtle Architectural Grid & Ambient Texture Behind */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.12,
          backgroundImage: 'radial-gradient(#FAF7F2 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent, #B85C38) 0%, transparent 70%)',
          opacity: 0.15,
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Monumental Call to Action Headline */}
        <div style={{ marginBottom: 'clamp(3rem, 7vw, 6rem)' }}>
          <span
            className="meta-tag"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '1.25rem',
              display: 'inline-flex'
            }}
          >
            THE TRANSFORMATION BEGINS HERE
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2
              className="heading-monumental"
              style={{
                color: '#FFFFFF',
                letterSpacing: '-0.04em',
                lineHeight: 0.92
              }}
            >
              LET'S TRANSFORM
            </h2>
            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 'clamp(1rem, 3vw, 2rem)' }}>
              <h2
                className="heading-monumental"
                style={{
                  color: 'var(--accent, #B85C38)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.92,
                  fontStyle: 'italic'
                }}
              >
                YOUR SPACE.
              </h2>
              <Link
                to="/contact"
                className="btn-primary"
                data-cursor="START"
                style={{
                  padding: '1.1rem 2.6rem',
                  fontSize: '0.85rem'
                }}
              >
                <span>Start A Project</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Studio Matrix Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '3.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {/* Identity & Consultant */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                marginBottom: '0.5rem'
              }}
            >
              COLOUR NEST
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                color: 'var(--accent, #B85C38)',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              Painting &amp; Interior Decor
            </p>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}
            >
              Consultant: <strong>{siteData.owner.name}</strong>
              <br />
              {siteData.owner.title}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={siteData.urls.facebook}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease'
                }}
                aria-label="Colour Nest on Facebook"
                data-cursor="FACEBOOK"
              >
                <Facebook size={16} />
              </a>
              <a
                href={siteData.urls.googleMaps}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease'
                }}
                aria-label="Google Maps Location"
                data-cursor="DIRECTIONS"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

          {/* Direct Contact Coordinates */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'rgba(255, 255, 255, 0.45)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1.25rem'
              }}
            >
              Studio Coordinates
            </span>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}
            >
              {siteData.contact.address.line1}
              <br />
              {siteData.contact.address.line2}
              <br />
              {siteData.contact.address.city} - {siteData.contact.address.postalCode}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href={`tel:${siteData.contact.phone}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--accent, #B85C38)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                data-cursor="CALL"
              >
                <Phone size={14} />
                <span>{siteData.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteData.contact.email}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                data-cursor="EMAIL"
              >
                <Mail size={14} />
                <span>{siteData.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Spatial Architecture Links */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'rgba(255, 255, 255, 0.45)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1.25rem'
              }}
            >
              Spatial Architecture
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {siteData.navigation.map((nav) => (
                <Link
                  key={nav.path}
                  to={nav.path}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.65)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Verification */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'rgba(255, 255, 255, 0.45)'
          }}
        >
          <div>
            © {new Date().getFullYear()} COLOUR NEST • ALL RIGHTS RESERVED
          </div>
          <div>
            JAYANAGAR 9TH BLOCK, BANGALORE - 560069
          </div>
          <div>
            DIGITAL INTERIOR EXPERIENCE
          </div>
        </div>
      </div>
    </footer>
  );
};
