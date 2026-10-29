import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Check, Mail, Phone, ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { siteData } from '../../../data/siteData';
import { servicesData } from '../../../data/services';

export const EnquiryWizard = ({ initialService = '', initialPalette = null, initialSpaceConfig = null }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const defaultMsg = initialSpaceConfig
    ? `Configured in 3D Space Studio:\n• Space: ${initialSpaceConfig.spaceName || 'Living Room'}\n• Wall: ${initialSpaceConfig.wall?.name || 'Clay'}\n• Floor: ${initialSpaceConfig.floor?.name || 'Stone'}\n• Wood: ${initialSpaceConfig.wood?.name || 'Warm Teak'}\n• Ceiling: ${initialSpaceConfig.ceiling || 'Layered Cove'}\n• Lighting: ${(initialSpaceConfig.light || 'evening').toUpperCase()}`
    : initialPalette
    ? `Interested in ${initialPalette.name} palette (${initialPalette.colors.map(c => c.name).join(', ')}).`
    : '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Bangalore',
    projectType: 'Residential',
    approximateArea: '1500 sq ft',
    service: initialService || 'Space & Turnkey Interiors',
    stylePreference: initialSpaceConfig ? 'Bespoke Architectural' : 'Warm & Serene',
    message: defaultMsg
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (step === 1 && (!formData.name || !formData.phone)) {
      alert('Please provide your name and phone number so we can reach you.');
      return;
    }
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // Build WhatsApp text
  const buildWhatsAppText = () => {
    const text = `*New Spatial Project Consultation Request*
----------------------------------------
*Client:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'Not specified'}
*Location:* ${formData.location}

*Project Type:* ${formData.projectType}
*Approximate Area:* ${formData.approximateArea}
*Selected Service:* ${formData.service}
*Style Aesthetic:* ${formData.stylePreference}

*Special Notes / Context:*
${formData.message || 'Ready for site inspection and material consultation.'}
----------------------------------------
_Source: Colour Nest Digital Experience_`;
    return encodeURIComponent(text);
  };

  // Build Mailto link
  const buildMailtoLink = () => {
    const subject = encodeURIComponent(`Spatial Project Consultation — ${formData.name} (${formData.projectType})`);
    const body = buildWhatsAppText();
    return `mailto:${siteData.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B85C38', '#A88D56', '#5C725E', '#2B4663']
      });
    } catch (err) {
      // Ignore
    }

    // Open WhatsApp in new tab
    const waUrl = `https://wa.me/${siteData.contact.whatsapp}?text=${buildWhatsAppText()}`;
    window.open(waUrl, '_blank');
  };

  // Generate vCard download on demand via client-side Blob
  const handleDownloadVcard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Rao;Abhishek;;Mr.;
FN:Mr. Abhishek Rao - Colour Nest
ORG:COLOUR NEST;Painting & Interior Decor
TITLE:Proprietor & Consultant
TEL;TYPE=CELL,VOICE:${siteData.contact.phone}
EMAIL;TYPE=WORK,INTERNET:${siteData.contact.email}
ADR;TYPE=WORK:;;29th Main\\, 39th Cross\\, 9th Block;Jayanagar;Bangalore;560069;India
URL:https://card.linkconnect.in/colour-nest
NOTE:Painting and Interiors specialist in Bangalore
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Colour-Nest-Abhishek-Rao.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="arch-card" style={{ padding: 'clamp(1.5rem, 5vw, 3.5rem)', position: 'relative' }}>
      {/* Wizard Progress Line */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        {['01 YOU', '02 SPACE', '03 CRAFT', '04 REVIEW'].map((tab, idx) => (
          <div
            key={tab}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              opacity: step === idx + 1 ? 1 : step > idx + 1 ? 0.8 : 0.4
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: step === idx + 1 ? 'var(--accent)' : 'var(--ink-secondary)',
                fontWeight: 700
              }}
            >
              {tab}
            </span>
            <div
              style={{
                height: '2px',
                width: '100%',
                minWidth: '50px',
                backgroundColor: step >= idx + 1 ? 'var(--accent)' : 'var(--border-subtle)'
              }}
            />
          </div>
        ))}
      </div>

      {!isSubmitted ? (
        <form onSubmit={step === 4 ? handleSubmit : handleNext}>
          {/* STEP 1: YOU */}
          {step === 1 && (
            <div>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>STEP 01 • CONTACT DETAILS</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                Who is transforming this space?
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Hegde"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--surface-elevated)',
                      color: 'var(--ink-primary)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98450 XXXXX"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--surface-elevated)',
                      color: 'var(--ink-primary)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh@example.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--surface-elevated)',
                      color: 'var(--ink-primary)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Location in Bangalore
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Jayanagar, Indiranagar, Whitefield"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--surface-elevated)',
                      color: 'var(--ink-primary)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SPACE */}
          {step === 2 && (
            <div>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>STEP 02 • SPATIAL SCOPE</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                Tell us about your physical space.
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  Project Environment
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {['Residential Apartment', 'Independent Villa', 'Commercial Office', 'Exterior Facade'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData(p => ({ ...p, projectType: type }))}
                      className="filter-pill"
                      style={{
                        padding: '0.8rem',
                        textAlign: 'center',
                        backgroundColor: formData.projectType === type ? 'var(--accent)' : 'var(--surface-elevated)',
                        color: formData.projectType === type ? '#FFFFFF' : 'var(--ink-primary)',
                        borderColor: formData.projectType === type ? 'var(--accent)' : 'var(--border-subtle)'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  Approximate Area / Scope
                </label>
                <select
                  name="approximateArea"
                  value={formData.approximateArea}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--ink-primary)',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="Single Feature Wall / Room (< 500 sq ft)">Single Feature Wall / Room (&lt; 500 sq ft)</option>
                  <option value="2 BHK Apartment (1000 - 1400 sq ft)">2 BHK Apartment (1000 - 1400 sq ft)</option>
                  <option value="3 BHK Apartment (1500 - 2200 sq ft)">3 BHK Apartment (1500 - 2200 sq ft)</option>
                  <option value="Duplex / Villa (> 2500 sq ft)">Duplex / Villa (&gt; 2500 sq ft)</option>
                  <option value="Commercial Space / Office">Commercial Space / Office</option>
                  <option value="Full Exterior Facade">Full Exterior Facade</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: REQUIREMENT */}
          {step === 3 && (
            <div>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>STEP 03 • DESIRED FINISHES</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                Which surface craft fits your vision?
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  Primary Service Needed
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--ink-primary)',
                    fontFamily: 'inherit'
                  }}
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.number} • {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  Desired Mood / Aesthetic
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.65rem' }}>
                  {['Warm & Serene', 'Dramatic & Bold', 'Earthy & Mineral', 'Luxury High-Gloss', 'Heritage Classic'].map((mood) => (
                    <button
                      type="button"
                      key={mood}
                      onClick={() => setFormData(p => ({ ...p, stylePreference: mood }))}
                      className="filter-pill"
                      style={{
                        padding: '0.7rem',
                        fontSize: '0.7rem',
                        backgroundColor: formData.stylePreference === mood ? 'var(--accent)' : 'var(--surface-elevated)',
                        color: formData.stylePreference === mood ? '#FFFFFF' : 'var(--ink-primary)',
                        borderColor: formData.stylePreference === mood ? 'var(--accent)' : 'var(--border-subtle)'
                      }}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  Specific Requirements / Existing Site Conditions
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details such as dampness issues, ceiling heights, timber restoration requirements, or timeline expectations..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--ink-primary)',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {step === 4 && (
            <div>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>STEP 04 • CONSULTATION SUMMARY</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                Confirm details before dispatch.
              </h3>

              <div
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem'
                }}
              >
                <div><strong>Client:</strong> {formData.name} ({formData.phone})</div>
                <div><strong>Email:</strong> {formData.email || 'None provided'}</div>
                <div><strong>Location:</strong> {formData.location}</div>
                <div><strong>Project Scope:</strong> {formData.projectType} • {formData.approximateArea}</div>
                <div><strong>Service Selected:</strong> {formData.service}</div>
                <div><strong>Aesthetic Direction:</strong> {formData.stylePreference}</div>
                {formData.message && <div><strong>Notes:</strong> {formData.message}</div>}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>
                Clicking "Send via WhatsApp" will open a direct chat with consultant Mr. Abhishek Rao (+91 84949 50088) with your formatted project brief. A mailto fallback is also provided.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
              >
                <ArrowLeft size={15} />
                <span>Back</span>
              </button>
            ) : <div />}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.8rem', fontSize: '0.75rem' }}
                >
                  <span>Continue</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={buildMailtoLink()}
                    className="btn-secondary"
                    style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
                  >
                    <Mail size={15} />
                    <span>Send via Email</span>
                  </a>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '0.75rem 2rem', fontSize: '0.75rem', backgroundColor: '#25D366' }}
                  >
                    <Send size={15} />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      ) : (
        /* Animated Success State */
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 8px 24px var(--accent-glow)'
            }}
          >
            <Check size={32} />
          </div>

          <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
            PROJECT BRIEF TRANSMITTED
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', marginBottom: '1rem' }}>
            Thank You, {formData.name}.
          </h2>
          <p style={{ color: 'var(--ink-secondary)', maxWidth: '540px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Your consultation request has been prepared for Mr. Abhishek Rao. WhatsApp will connect you directly with the Colour Nest studio.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadVcard}
              className="btn-secondary"
              data-cursor="DOWNLOAD"
            >
              <Download size={15} />
              <span>Add Colour Nest To Phone Book (.vcf)</span>
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
              }}
              className="btn-ghost"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EnquiryWizard;

