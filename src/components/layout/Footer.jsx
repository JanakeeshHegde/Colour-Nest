import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';
import { siteData } from '../../data/siteData';

export const Footer = () => {
  const navLinks = siteData.navigation.filter(item => !item.is3D);

  return (
    <footer
      style={{
        backgroundColor: '#211D2D',
        color: '#FAF8F2',
        borderTop: '1px solid #373344',
        padding: '3rem 0 1.5rem 0'
      }}
    >
      <div
        className="container-wide"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
        }}
      >
        {/* Balanced 3-Column Layout: LEFT, MIDDLE, RIGHT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start',
            paddingBottom: '2.5rem'
          }}
        >
          {/* LEFT: COLOUR NEST Logo and Short Description */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#FAF8F2',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(227, 217, 164, 0.45)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)'
              }}
            >
              <img
                src="/colour-nest-logo.png"
                alt="COLOUR NEST — Painting & Interior Decor"
                style={{
                  height: 'clamp(36px, 5vw, 44px)',
                  width: 'auto',
                  maxWidth: 'clamp(140px, 40vw, 180px)',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                color: '#E3D9A4',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '1rem',
                marginBottom: '0.5rem'
              }}
            >
              Painting &amp; Interior Decor.
            </p>

            <p
              style={{
                fontSize: '0.85rem',
                color: '#B5B1BE',
                lineHeight: 1.6,
                maxWidth: '320px',
                margin: 0
              }}
            >
              Bespoke interior finishes, textured surfaces and turnkey residential solutions by Mr. Abhishek Rao in Bangalore.
            </p>
          </div>

          {/* MIDDLE: Compact Navigation Links */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                color: '#E3D9A4',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              Navigation
            </span>

            <nav
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.65rem 1.5rem',
                maxWidth: '280px'
              }}
              aria-label="Footer Navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#FAF8F2',
                    opacity: 0.82,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease, color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.color = '#E3D9A4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.82';
                    e.currentTarget.style.color = '#FAF8F2';
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT: Contact Information */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                color: '#E3D9A4',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              Contact
            </span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.82rem',
                color: '#FAF8F2'
              }}
            >
              <a
                href={`tel:${siteData.contact.phone}`}
                style={{
                  color: '#FAF8F2',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E3D9A4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FAF8F2')}
              >
                <Phone size={14} color="#E3D9A4" />
                <span>{siteData.contact.phone}</span>
              </a>

              <a
                href={`mailto:${siteData.contact.email}`}
                style={{
                  color: '#FAF8F2',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E3D9A4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FAF8F2')}
              >
                <Mail size={14} color="#E3D9A4" />
                <span>{siteData.contact.email}</span>
              </a>

              <div
                style={{
                  color: '#B5B1BE',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px'
                }}
              >
                <MapPin size={14} color="#E3D9A4" />
                <span>{siteData.contact.address.line2}, Bangalore</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Slim Copyright Row & Social Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(231, 225, 214, 0.1)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.7rem',
            color: '#8A8594'
          }}
        >
          <div>
            <span>&copy; {new Date().getFullYear()} COLOUR NEST. All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a
              href={siteData.urls.facebook}
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#FAF8F2',
                opacity: 0.75,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
              aria-label="COLOUR NEST on Facebook"
            >
              <Facebook size={13} color="#E3D9A4" />
              <span>Facebook</span>
            </a>

            <a
              href={siteData.urls.googleMaps}
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#FAF8F2',
                opacity: 0.75,
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

