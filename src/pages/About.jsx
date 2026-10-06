import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { siteData } from '../data/siteData';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const About = () => {
  return (
    <>
      <SEOHead
        title="About Us — Studio Profile & Philosophy"
        description="We don't just paint spaces. We transform how they feel. Meet Mr. Abhishek Rao, Proprietor & Consultant at Colour Nest, Painting and Interior Decor, Jayanagar, Bangalore."
      />

      <article
        style={{
          paddingTop: 'calc(var(--nav-height) + 2.5rem)',
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--ink-primary)'
        }}
      >
        {/* Monumental Hero */}
        <section className="container-wide" style={{ marginBottom: 'clamp(3rem, 7vw, 6rem)' }}>
          <div style={{ maxWidth: '980px' }}>
            <span className="meta-tag" style={{ marginBottom: '1.25rem' }}>
              OUR PHILOSOPHY &amp; ETHOS
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1.5rem', lineHeight: 0.95 }}>
              WE DON'T JUST <br />
              PAINT SPACES. <br />
              <span className="heading-editorial-italic">WE TRANSFORM HOW THEY FEEL.</span>
            </h1>
            <ArchitecturalLine label="COLOUR NEST • ARCHITECTURAL DECOR" coordinates="JAYANAGAR 9TH BLOCK, BANGALORE" />
            <p style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)', color: 'var(--ink-secondary)', lineHeight: 1.6, maxWidth: '850px' }}>
              Founded with the conviction that architectural surfaces shape human emotion, Colour Nest
              bridges the gap between raw construction plaster and refined, liveable luxury.
            </p>
          </div>
        </section>

        {/* Studio Leadership & Consultant Presentation */}
        <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)' }}>
          <div className="container-wide">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              {/* Genuine Colour Nest Brand Image */}
              <div className="aspect-1-1" style={{ maxWidth: '500px', borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-dramatic)', overflow: 'hidden' }}>
                <img
                  src={siteData.brandImages.profile}
                  alt="Colour Nest Brand and Consultant Mr. Abhishek Rao"
                  className="aspect-fill"
                />
              </div>

              <div>
                <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                  PROPRIETOR &amp; CONSULTANT
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}>
                  {siteData.owner.name}
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
                  {siteData.owner.title} • {siteData.name}
                </p>

                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Leading Colour Nest from our studio in 9th Block Jayanagar, Mr. Abhishek Rao personally consults on every project.
                  Rather than treating painting as simple maintenance or outsourced labor, Abhishek approaches every home as a curated
                  dialogue between light, shadow, texture, and proportion.
                </p>

                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  From specifying fine Italian marble plasters (Stucco and Anticco) to engineering monsoon-resistant exterior coatings
                  and grain-nourishing timber varnishes, client satisfaction and transparent craftsmanship remain at the core of every endeavor.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={`tel:${siteData.contact.phone}`} className="btn-primary" data-cursor="CALL">
                    <Phone size={15} />
                    <span>Call Abhishek Rao</span>
                  </a>
                  <a href={siteData.urls.whatsappDirect} target="_blank" rel="noreferrer" className="btn-secondary" data-cursor="WHATSAPP">
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Specialities (Non-generic editorial showcase) */}
        <section className="section-scene">
          <div className="container-wide">
            <div style={{ maxWidth: '850px', marginBottom: '4rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                PROVEN PRACTICE
              </span>
              <h2 className="heading-display">
                OUR VERIFIED <span className="heading-editorial-italic">SPECIALITIES.</span>
              </h2>
              <ArchitecturalLine label="VERIFIED SOURCE OF TRUTH VALUES" coordinates="HONEST COMMITMENTS" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-medium)' }}>
              {siteData.specialities.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'clamp(50px, 8vw, 100px) clamp(220px, 28vw, 340px) 1fr',
                    gap: '2rem',
                    alignItems: 'baseline',
                    padding: '2rem 0',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                  className="about-speciality-row"
                >
                  <span className="oversized-number" style={{ fontSize: '2.5rem' }}>{item.number}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Location & Verified Coordinates */}
        <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container-wide">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                  STUDIO HEADQUARTERS
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '1rem' }}>
                  Jayanagar, Bangalore.
                </h3>
                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Conveniently situated in 9th Block Jayanagar, serving high-end residential apartments,
                  heritage villas, and commercial establishments throughout Bengaluru.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: 'var(--ink-primary)' }}>Address:</strong> {siteData.contact.address.formatted}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--ink-primary)' }}>Phone / WhatsApp:</strong> {siteData.contact.phone}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--ink-primary)' }}>Email:</strong> {siteData.contact.email}
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <a
                    href={siteData.urls.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    data-cursor="DIRECTIONS"
                  >
                    <MapPin size={15} />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Architectural Card */}
              <div className="arch-card" style={{ padding: '2.5rem', backgroundColor: 'var(--surface-primary)' }}>
                <span className="meta-tag" style={{ marginBottom: '1rem' }}>
                  CONSULTATION PROMISE
                </span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1rem' }}>
                  Ready to Reimagine Your Environment?
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Whether you are planning a single Italian Stucco feature wall or an extensive turnkey penthouse transformation,
                  we provide dedicated on-site assessments and live material swatches.
                </p>
                <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Book Initial Spatial Assessment</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Responsive helper for about rows */}
      <style>{`
        @media (max-width: 768px) {
          .about-speciality-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </>
  );
};
