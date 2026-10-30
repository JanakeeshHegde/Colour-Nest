import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { siteData } from '../data/siteData';
import { ContactEnquiryWizard } from '../features/contact';

export const Contact = () => {
  return (
    <>
      <SEOHead
        title="Contact Us & Project Enquiry | COLOUR NEST"
        description="Connect with Mr. Abhishek Rao, Proprietor & Consultant at COLOUR NEST. Share your project details, location, and finish preferences in 9th Block Jayanagar, Bangalore."
      />

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#FAF8F2',
          paddingTop: 'calc(var(--nav-height, 84px) + 2.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)'
        }}
      >
        <div
          className="container-wide"
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
          }}
        >
          {/* Main Editorial Split Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start'
            }}
          >
            {/* ============================================================== */}
            {/* LEFT SIDE — CONTACT INTRODUCTION & COMPACT DETAILS             */}
            {/* ============================================================== */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  color: '#3C2D8C',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1rem'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#3C2D8C'
                  }}
                />
                DIRECT STUDIO CONSULTATION
              </span>

              <h1
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
                  lineHeight: 1.05,
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: '#211D2D',
                  margin: '0 0 1.25rem 0'
                }}
              >
                Tell Us About <br />
                <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Your Space.</span>
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.02rem, 2vw, 1.25rem)',
                  color: '#4A4657',
                  lineHeight: 1.65,
                  marginBottom: '2.5rem',
                  maxWidth: '520px'
                }}
              >
                Whether you're planning a complete interior or exploring a particular finish, share a few details to start the conversation.
              </p>

              {/* Studio Coordinates & Practitioner Identity */}
              <div
                style={{
                  borderTop: '1px solid #E7E1D6',
                  paddingTop: '2rem',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#211D2D',
                      display: 'block'
                    }}
                  >
                    {siteData.name}
                  </span>
                  <strong style={{ fontSize: '0.92rem', color: '#3C2D8C', display: 'block', marginTop: '2px' }}>
                    {siteData.owner.name}
                  </strong>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#6D6877', textTransform: 'uppercase' }}>
                    {siteData.owner.title}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.8rem',
                    color: '#4A4657'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <MapPin size={15} color="#3C2D8C" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{siteData.contact.address.formatted}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={15} color="#3C2D8C" style={{ flexShrink: 0 }} />
                    <a href={`tel:${siteData.contact.phone}`} style={{ color: '#211D2D', textDecoration: 'none' }}>
                      {siteData.contact.phone}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={15} color="#3C2D8C" style={{ flexShrink: 0 }} />
                    <a href={`mailto:${siteData.contact.email}`} style={{ color: '#211D2D', textDecoration: 'none' }}>
                      {siteData.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Actions: Understated, Clean */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #E7E1D6'
                }}
              >
                <a
                  href={`tel:${siteData.contact.phone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.65rem 1.2rem',
                    borderRadius: '9999px',
                    backgroundColor: '#3C2D8C',
                    color: '#FAF8F2',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <Phone size={13} color="#E3D9A4" />
                  <span>Call Direct</span>
                </a>

                <a
                  href={siteData.urls.whatsappDirect}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.65rem 1.2rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#211D2D',
                    border: '1px solid #E7E1D6',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <WhatsAppIcon size={14} color="#25D366" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${siteData.contact.email}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.65rem 1.2rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#211D2D',
                    border: '1px solid #E7E1D6',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <Mail size={13} color="#3C2D8C" />
                  <span>Email</span>
                </a>

                <a
                  href={siteData.urls.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.65rem 1.2rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#211D2D',
                    border: '1px solid #E7E1D6',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <ExternalLink size={13} color="#3C2D8C" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* ============================================================== */}
            {/* RIGHT SIDE — INTERACTIVE 4-STAGE ENQUIRY WIZARD                 */}
            {/* ============================================================== */}
            <ContactEnquiryWizard />
          </div>

          {/* ============================================================== */}
          {/* DEDICATED LOCATION SECTION & EMBEDDED GOOGLE MAP               */}
          {/* ============================================================== */}
          <section
            style={{
              marginTop: 'clamp(3.5rem, 7vw, 6rem)',
              paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
              borderTop: '1px solid #E7E1D6'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Address, Contact Details & Quick Action Buttons */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#3C2D8C',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '0.75rem'
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#3C2D8C'
                    }}
                  />
                  STUDIO LOCATION
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                    lineHeight: 1.12,
                    color: '#211D2D',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  VISIT COLOUR NEST
                </h2>

                <p
                  style={{
                    fontSize: '1rem',
                    color: '#6D6877',
                    lineHeight: 1.6,
                    margin: '0 0 2rem 0'
                  }}
                >
                  Find us in Jayanagar, Bangalore. Material sample viewings and consultations arranged directly with Mr. Abhishek Rao.
                </p>

                {/* Structured Address & Contact Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E7E1D6',
                    padding: '1.5rem',
                    marginBottom: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 4px 16px rgba(33, 29, 45, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <MapPin size={18} color="#3C2D8C" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#211D2D', display: 'block', marginBottom: '2px' }}>
                        COLOUR NEST Studio
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: '#4A4657', lineHeight: 1.5, display: 'block' }}>
                        {siteData.contact.address.formatted}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #F0ECE1',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.78rem'
                    }}
                  >
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        color: '#211D2D',
                        textDecoration: 'none'
                      }}
                    >
                      <Phone size={13} color="#3C2D8C" />
                      <span>{siteData.contact.phone}</span>
                    </a>

                    <a
                      href={`mailto:${siteData.contact.email}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        color: '#211D2D',
                        textDecoration: 'none'
                      }}
                    >
                      <Mail size={13} color="#3C2D8C" />
                      <span>{siteData.contact.email}</span>
                    </a>
                  </div>
                </div>

                {/* Primary Get Directions CTA + Action Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <a
                    href={siteData.urls.googleMaps}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0.85rem 1.6rem',
                      borderRadius: '9999px',
                      backgroundColor: '#3C2D8C',
                      color: '#FAF8F2',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.76rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 6px 18px rgba(60, 45, 140, 0.25)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <Navigation size={14} color="#E3D9A4" />
                    <span>GET DIRECTIONS</span>
                    <ExternalLink size={13} color="#E3D9A4" />
                  </a>

                  <a
                    href={`tel:${siteData.contact.phone}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '0.85rem 1.35rem',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      color: '#211D2D',
                      border: '1px solid #E7E1D6',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.76rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <Phone size={13} color="#3C2D8C" />
                    <span>CALL</span>
                  </a>

                  <a
                    href={siteData.urls.whatsappDirect}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '0.85rem 1.35rem',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      color: '#211D2D',
                      border: '1px solid #E7E1D6',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.76rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <WhatsAppIcon size={14} color="#25D366" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Embedded Google Map Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #E7E1D6',
                  backgroundColor: '#EAE6DD',
                  boxShadow: '0 12px 32px rgba(33, 29, 45, 0.06)',
                  aspectRatio: '16 / 10',
                  minHeight: '320px'
                }}
              >
                <iframe
                  title="COLOUR NEST location in Jayanagar, Bangalore"
                  src="https://www.google.com/maps?q=COLOUR+NEST,+29th+Main,+39th+Cross,+9th+Block,+Jayanagar,+Bangalore+560069&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block'
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Fallback & Map Link Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(250, 248, 242, 0.95)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #E7E1D6',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    color: '#211D2D',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <MapPin size={12} color="#3C2D8C" />
                  <span>Jayanagar 9th Block, Bangalore</span>
                  <a
                    href={siteData.urls.googleMaps}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      color: '#3C2D8C',
                      fontWeight: 700,
                      textDecoration: 'underline',
                      marginLeft: '4px'
                    }}
                  >
                    Open Full Map &rarr;
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact;
