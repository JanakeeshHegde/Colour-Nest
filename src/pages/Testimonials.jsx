import React, { useState } from 'react';
import { Star, MessageSquare, Check, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { sampleTestimonials } from '../data/testimonials';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const Testimonials = () => {
  const [reviews, setReviews] = useState(sampleTestimonials);
  const [newFeedback, setNewFeedback] = useState({
    name: '',
    rating: 5,
    service: 'Royals Play Designs',
    feedback: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.name || !newFeedback.feedback) return;

    const submitted = {
      id: `user-${Date.now()}`,
      name: newFeedback.name,
      rating: Number(newFeedback.rating),
      date: 'Just now',
      service: newFeedback.service,
      feedback: newFeedback.feedback,
      projectType: 'Client Submitted Review',
      verified: true
    };

    setReviews([submitted, ...reviews]);
    setNewFeedback({ name: '', rating: 5, service: 'Royals Play Designs', feedback: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <>
      <SEOHead
        title="Client Feedback & Testimonials"
        description="Client reviews and transparent feedback portal for Colour Nest, Painting and Interior Decor in Jayanagar, Bangalore."
      />

      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 2.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: 'var(--surface-primary)',
          minHeight: '100vh'
        }}
      >
        <div className="container-wide">
          {/* Header */}
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              TRANSPARENCY &amp; CLIENT VOICE
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              FEEDBACK &amp; <br />
              <span className="heading-editorial-italic">REVIEWS.</span>
            </h1>
            <ArchitecturalLine label="VERIFIED SOURCE INTEGRITY NOTICE" coordinates="JAYANAGAR SHOWROOM" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              In accordance with our strict data integrity policy, all pre-populated reviews below are clearly
              labelled as placeholders awaiting genuine client verification. You may also submit live feedback directly.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(2rem, 4vw, 3.5rem)', alignItems: 'start' }}>
            {/* Reviews List (7 Cols) */}
            <div style={{ gridColumn: 'span 12' }} className="testimonials-list-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {reviews.map((rev) => (
                  <div key={rev.id} className="arch-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
                          {rev.name}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>
                          {rev.service} • {rev.date}
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < rev.rating ? 'var(--accent)' : 'none'}
                            color={i < rev.rating ? 'var(--accent)' : 'var(--border-strong)'}
                          />
                        ))}
                      </div>
                    </div>

                    <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, fontStyle: rev.placeholderNotice ? 'italic' : 'normal', marginBottom: '1.25rem' }}>
                      "{rev.feedback}"
                    </p>

                    {rev.placeholderNotice && (
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--ink-muted)',
                          backgroundColor: 'var(--surface-secondary)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      >
                        <ShieldAlert size={13} color="var(--accent)" />
                        <span>{rev.placeholderNotice}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Feedback Form (5 Cols) */}
            <div style={{ gridColumn: 'span 12' }} className="testimonials-form-col">
              <div className="arch-card" style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)', position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SHARE YOUR EXPERIENCE
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                  Leave Client Feedback
                </h3>

                {showSuccess && (
                  <div
                    style={{
                      backgroundColor: 'var(--accent-soft)',
                      border: '1px solid var(--accent)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-xs)',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-primary)'
                    }}
                  >
                    <Check size={16} color="var(--accent)" />
                    <span>Feedback submitted successfully to live session!</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Rao"
                      value={newFeedback.name}
                      onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: 'var(--surface-elevated)',
                        color: 'var(--ink-primary)'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                      Rating *
                    </label>
                    <select
                      value={newFeedback.rating}
                      onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: 'var(--surface-elevated)',
                        color: 'var(--ink-primary)'
                      }}
                    >
                      <option value="5">★★★★★ (5 - Outstanding Craftsmanship)</option>
                      <option value="4">★★★★☆ (4 - Very Good Experience)</option>
                      <option value="3">★★★☆☆ (3 - Satisfactory)</option>
                      <option value="2">★★☆☆☆ (2 - Needs Improvement)</option>
                      <option value="1">★☆☆☆☆ (1 - Poor)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                      Service Executed
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Stucco Plaster &amp; False Ceiling"
                      value={newFeedback.service}
                      onChange={(e) => setNewFeedback({ ...newFeedback, service: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: 'var(--surface-elevated)',
                        color: 'var(--ink-primary)'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the quality of surface finishing, punctuality, and overall transformation..."
                      value={newFeedback.feedback}
                      onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: 'var(--surface-elevated)',
                        color: 'var(--ink-primary)'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    data-cursor="SUBMIT"
                  >
                    <Send size={15} />
                    <span>Publish Review</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 1024px) {
          .testimonials-list-col { grid-column: span 7 !important; }
          .testimonials-form-col { grid-column: span 5 !important; }
        }
      `}</style>
    </>
  );
};
