import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Layers } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { servicesData } from '../data/services';
import { EnquiryWizard } from '../components/interactive/EnquiryWizard';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Find related services
  const related = servicesData
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${service.title} — Service Specification`}
        description={`${service.title} by Colour Nest, Bangalore. ${service.tagline}. Handcrafted under Mr. Abhishek Rao's personal consultancy.`}
      />

      <article
        style={{
          paddingTop: 'calc(var(--nav-height) + 2rem)',
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--ink-primary)'
        }}
      >
        {/* Back Link */}
        <div className="container-wide" style={{ marginBottom: '2rem' }}>
          <Link
            to="/services"
            className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={14} />
            <span>Return to Services Wall</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container-wide" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span className="oversized-number" style={{ fontSize: '3.5rem', opacity: 0.6 }}>
                  {service.number}
                </span>
                <span className="meta-tag">{service.category}</span>
              </div>
              <h1 className="heading-display" style={{ marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                {service.title}
              </h1>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                {service.tagline}
              </p>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                {service.fullDescription}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#consultation-wizard" className="btn-primary" data-cursor="START">
                  <span>Enquire For Your Space</span>
                  <ArrowRight size={16} />
                </a>
                <Link to="/contact" className="btn-secondary">
                  <span>Contact Consultant</span>
                </Link>
              </div>
            </div>

            {/* Visual Hero Image */}
            <div className="aspect-4-3" style={{ borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-dramatic)' }}>
              <img
                src={service.image}
                alt={service.title}
                className="aspect-fill"
                onError={(e) => {
                  e.currentTarget.src = service.fallbackImage;
                }}
              />
            </div>
          </div>
        </section>

        {/* Architectural Line Divider */}
        <div className="container-wide">
          <ArchitecturalLine label={`SPECIFICATION SHEET • ${service.number}`} coordinates="SITE APPLICATION" />
        </div>

        {/* What We Create & Features */}
        <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)' }}>
          <div className="container-wide">
            <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                CRAFT EXECUTION
              </span>
              <h2 className="heading-section">
                WHAT WE CREATE &amp; DELIVER.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {service.features.map((feature, idx) => (
                <div key={idx} className="arch-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <CheckCircle2 size={18} color="var(--accent)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                      CRITERIA 0{idx + 1}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--ink-primary)', lineHeight: 1.6 }}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="arch-card"
              style={{
                marginTop: '3rem',
                backgroundColor: 'var(--surface-primary)',
                borderLeft: '4px solid var(--accent)',
                padding: '1.75rem'
              }}
            >
              <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '0.4rem' }}>
                IDEAL ARCHITECTURAL APPLICATION:
              </strong>
              <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                {service.idealFor}
              </p>
            </div>
          </div>
        </section>

        {/* Technical Process Steps */}
        <section className="section-scene">
          <div className="container-wide">
            <div style={{ maxWidth: '850px', marginBottom: '3.5rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                ON-SITE DISCIPLINE
              </span>
              <h2 className="heading-section">
                THE EXECUTION TIMELINE.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
              {service.process.map((step, idx) => (
                <div key={idx} className="arch-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="oversized-number" style={{ fontSize: '2.8rem' }}>0{idx + 1}</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                      Phase 0{idx + 1}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Metadata Table */}
            <div
              style={{
                marginTop: '3.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                backgroundColor: 'var(--surface-secondary)',
                padding: '2rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem'
              }}
            >
              <div>
                <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>MATERIALS USED:</strong>
                <span style={{ color: 'var(--ink-primary)' }}>{service.materials}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>CURING / DRYING:</strong>
                <span style={{ color: 'var(--ink-primary)' }}>{service.dryingTime}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>MAINTENANCE:</strong>
                <span style={{ color: 'var(--ink-primary)' }}>{service.maintenance}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {related.length > 0 && (
          <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="container-wide">
              <h3 className="heading-section" style={{ marginBottom: '2.5rem' }}>
                COMPLEMENTARY <span className="heading-editorial-italic">DISCIPLINES.</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/services/${rel.slug}`}
                    className="arch-card"
                    style={{ textDecoration: 'none', padding: 0, overflow: 'hidden' }}
                  >
                    <div className="aspect-16-9">
                      <img src={rel.image} alt={rel.title} className="aspect-fill" onError={(e) => (e.currentTarget.src = rel.fallbackImage)} />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <span className="meta-tag" style={{ fontSize: '0.65rem', marginBottom: '0.4rem' }}>{rel.category}</span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.4rem' }}>{rel.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>{rel.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Embedded Consultation Wizard */}
        <section id="consultation-wizard" className="section-scene" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container-narrow">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
                DIRECT CONSULTATION
              </span>
              <h2 className="heading-section">
                CONSULT ON {service.title.toUpperCase()}.
              </h2>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Transmit your project requirements directly to consultant Mr. Abhishek Rao.
              </p>
            </div>
            <EnquiryWizard initialService={service.title} />
          </div>
        </section>
      </article>
    </>
  );
};
