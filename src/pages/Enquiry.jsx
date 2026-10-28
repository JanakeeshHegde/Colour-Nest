import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  CheckCircle2,
  Copy,
  Layers,
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { siteData } from '../data/siteData';

const PROJECT_TYPES = [
  'Complete Residential Interior',
  'Living & Dining Pavilion',
  'Master Bedroom Suite',
  'Artisan Wall Textures (Stucco / Anticco)',
  'Timber Joinery & Polish (Melamyne / PU)',
  'Architectural False Ceilings & Lighting',
  'Commercial / Office Space',
  'Exterior Facade Finishing'
];

const SERVICE_OPTIONS = [
  'Royals Play Designs',
  'Wallpaper & High-End Wall Texture (Anticco)',
  'Premium Texture Designs (Stucco)',
  'Wood Polish (Melamyne / PU)',
  'Interior Works, Smart Lightings & Fans',
  'Exterior Painting & Textures',
  'Customised Interiors',
  'Commercial Interiors',
  'False Ceilings',
  'Premium Wood Polish (Polycoat)'
];

export const Enquiry = () => {
  const [searchParams] = useSearchParams();

  // Retrieve any saved 3D design configuration
  const [savedConfig, setSavedConfig] = useState(null);

  useEffect(() => {
    try {
      const activeRaw = localStorage.getItem('colournest_active_room_config');
      if (activeRaw) {
        const parsed = JSON.parse(activeRaw);
        setSavedConfig(parsed);
      }
    } catch {
      // Fallback
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Bangalore',
    projectType: searchParams.get('project') || 'Complete Residential Interior',
    requiredServices: searchParams.get('service') ? [searchParams.get('service')] : ['Customised Interiors'],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [preparedText, setPreparedText] = useState('');
  const [copied, setCopied] = useState(false);

  // Toggle multi-select service checkbox
  const handleServiceToggle = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.requiredServices.includes(serviceName);
      return {
        ...prev,
        requiredServices: exists
          ? prev.requiredServices.filter((s) => s !== serviceName)
          : [...prev.requiredServices, serviceName]
      };
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid contact phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (formData.requiredServices.length === 0) {
      errs.requiredServices = 'Please select at least one service of interest';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateMessageBody = () => {
    let msg = `*COLOUR NEST — Project Enquiry*\n`;
    msg += `--------------------------------------\n`;
    msg += `*Client Name:* ${formData.name}\n`;
    msg += `*Phone:* ${formData.phone}\n`;
    msg += `*Email:* ${formData.email}\n`;
    msg += `*Location:* ${formData.location || 'Bangalore'}\n`;
    msg += `*Project Type:* ${formData.projectType}\n`;
    msg += `*Services Required:* ${formData.requiredServices.join(', ')}\n\n`;

    if (savedConfig && savedConfig.surfaces) {
      msg += `*3D Studio Room Configuration:*\n`;
      msg += `• Room Type: ${savedConfig.roomType || 'Living'}\n`;
      if (savedConfig.surfaces['wall-feature']?.name) {
        msg += `• Feature Wall: ${savedConfig.surfaces['wall-feature'].name} (${savedConfig.surfaces['wall-feature'].color})\n`;
      }
      if (savedConfig.surfaces['wall-main']?.name) {
        msg += `• Main Walls: ${savedConfig.surfaces['wall-main'].name} (${savedConfig.surfaces['wall-main'].color})\n`;
      }
      if (savedConfig.surfaces['floor-main']?.color) {
        msg += `• Floor: ${savedConfig.surfaces['floor-main'].material || 'Stone'} finish\n`;
      }
      if (savedConfig.surfaces['wood-panel']?.color) {
        msg += `• Wood Elements: Fluted Timber & Credenza\n`;
      }
      if (savedConfig.lighting) {
        msg += `• Lighting Atmosphere: ${savedConfig.lighting}\n`;
      }
      msg += `\n`;
    }

    if (formData.message.trim()) {
      msg += `*Client Message:*\n${formData.message}\n\n`;
    }

    msg += `--------------------------------------\n`;
    msg += `_Sent from colournest.in client enquiry system_`;
    return msg;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const body = generateMessageBody();
    setPreparedText(body);
    setIsPrepared(true);

    // Try to directly trigger WhatsApp
    const encoded = encodeURIComponent(body);
    const waUrl = `https://wa.me/918494950088?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(preparedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://wa.me/918494950088?text=${encodeURIComponent(preparedText)}`;
  const mailtoUrl = `mailto:${siteData.contact.email}?subject=${encodeURIComponent(
    `Project Enquiry — ${formData.name} (${formData.projectType})`
  )}&body=${encodeURIComponent(preparedText)}`;

  return (
    <>
      <SEOHead
        title="Start Your Project — Client Enquiry"
        description="Submit your interior design, architectural finishes, or painting project specifications directly to Mr. Abhishek Rao at Colour Nest, Bangalore."
      />

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#FAF8F2',
          paddingTop: 'calc(var(--nav-height, 84px) + 2rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)'
        }}
      >
        <div className="container-wide" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1rem, 3.5vw, 2.5rem)' }}>
          {/* Header */}
          <div style={{ maxWidth: '780px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.16em',
                color: '#3C2D8C',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.85rem',
                fontWeight: 600
              }}
            >
              Direct Project Consultation
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                lineHeight: 1.05,
                color: '#211D2D',
                margin: '0 0 1rem 0'
              }}
            >
              Start Your <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Project.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#6D6877', lineHeight: 1.6, margin: 0 }}>
              Provide your spatial requirements and surface interests below. We will review your brief and coordinate
              an on-site survey or digital material walkthrough.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'start'
            }}
          >
            {/* Left: Interactive Form */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E7E1D6',
                padding: 'clamp(1.75rem, 4vw, 2.75rem)',
                boxShadow: '0 12px 36px rgba(33, 29, 45, 0.06)'
              }}
            >
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div style={{ marginBottom: '1.4rem' }}>
                  <label
                    htmlFor="enquiry-name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#211D2D',
                      marginBottom: '0.45rem',
                      fontWeight: 600
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Sharma"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '6px',
                      border: errors.name ? '1.5px solid #D93838' : '1px solid #E7E1D6',
                      backgroundColor: '#FAF8F2',
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.95rem',
                      color: '#211D2D',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {errors.name && (
                    <span style={{ fontSize: '0.78rem', color: '#D93838', marginTop: '4px', display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '1.4rem'
                  }}
                >
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        marginBottom: '0.45rem',
                        fontWeight: 600
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '6px',
                        border: errors.phone ? '1.5px solid #D93838' : '1px solid #E7E1D6',
                        backgroundColor: '#FAF8F2',
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.95rem',
                        color: '#211D2D',
                        outline: 'none'
                      }}
                    />
                    {errors.phone && (
                      <span style={{ fontSize: '0.78rem', color: '#D93838', marginTop: '4px', display: 'block' }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        marginBottom: '0.45rem',
                        fontWeight: 600
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '6px',
                        border: errors.email ? '1.5px solid #D93838' : '1px solid #E7E1D6',
                        backgroundColor: '#FAF8F2',
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.95rem',
                        color: '#211D2D',
                        outline: 'none'
                      }}
                    />
                    {errors.email && (
                      <span style={{ fontSize: '0.78rem', color: '#D93838', marginTop: '4px', display: 'block' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Location & Project Type */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '1.4rem'
                  }}
                >
                  <div>
                    <label
                      htmlFor="enquiry-location"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        marginBottom: '0.45rem',
                        fontWeight: 600
                      }}
                    >
                      Site / Location
                    </label>
                    <input
                      id="enquiry-location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Jayanagar, Koramangala, Indiranagar"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid #E7E1D6',
                        backgroundColor: '#FAF8F2',
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.95rem',
                        color: '#211D2D',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-type"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        marginBottom: '0.45rem',
                        fontWeight: 600
                      }}
                    >
                      Project Type
                    </label>
                    <select
                      id="enquiry-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid #E7E1D6',
                        backgroundColor: '#FAF8F2',
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.92rem',
                        color: '#211D2D',
                        outline: 'none'
                      }}
                    >
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Required Services Checkboxes */}
                <div style={{ marginBottom: '1.4rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#211D2D',
                      marginBottom: '0.65rem',
                      fontWeight: 600
                    }}
                  >
                    Required Services *
                  </label>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '0.55rem',
                      maxHeight: '220px',
                      overflowY: 'auto',
                      padding: '0.5rem',
                      border: errors.requiredServices ? '1.5px solid #D93838' : '1px solid #E7E1D6',
                      borderRadius: '6px',
                      backgroundColor: '#FAF8F2'
                    }}
                  >
                    {SERVICE_OPTIONS.map((srv) => {
                      const checked = formData.requiredServices.includes(srv);
                      return (
                        <label
                          key={srv}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.82rem',
                            color: checked ? '#3C2D8C' : '#211D2D',
                            fontWeight: checked ? 600 : 400,
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleServiceToggle(srv)}
                            style={{ accentColor: '#3C2D8C' }}
                          />
                          <span>{srv}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.requiredServices && (
                    <span style={{ fontSize: '0.78rem', color: '#D93838', marginTop: '4px', display: 'block' }}>
                      {errors.requiredServices}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label
                    htmlFor="enquiry-message"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#211D2D',
                      marginBottom: '0.45rem',
                      fontWeight: 600
                    }}
                  >
                    Project Details / Specific Notes
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room dimensions, timeline, current condition, or design preferences..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid #E7E1D6',
                      backgroundColor: '#FAF8F2',
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.95rem',
                      color: '#211D2D',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    backgroundColor: '#3C2D8C',
                    color: '#FAF8F2',
                    border: '1px solid rgba(227, 217, 164, 0.4)',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 20px rgba(60, 45, 140, 0.28)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>Submit Project Consultation</span>
                  <Send size={16} color="#E3D9A4" />
                </button>
              </form>
            </div>

            {/* Right: Confirmation / Dispatch Hub & Attached 3D Configuration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* If 3D configuration exists */}
              {savedConfig && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E7E1D6',
                    padding: '1.5rem',
                    boxShadow: '0 8px 24px rgba(33, 29, 45, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                    <Layers size={18} color="#3C2D8C" />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        color: '#3C2D8C',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}
                    >
                      Attached 3D Space Studio Selections
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#6D6877', margin: '0 0 1rem 0' }}>
                    Your saved material preferences from the interactive 3D configurator will automatically be
                    transmitted with your consultation message.
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.65rem',
                      fontSize: '0.8rem',
                      backgroundColor: '#FAF8F2',
                      padding: '0.85rem',
                      borderRadius: '6px',
                      border: '1px solid #E7E1D6'
                    }}
                  >
                    <div>
                      <span style={{ color: '#6D6877', display: 'block', fontSize: '0.72rem' }}>Room Preset</span>
                      <strong style={{ color: '#211D2D' }}>{savedConfig.roomType || 'Living Pavilion'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#6D6877', display: 'block', fontSize: '0.72rem' }}>Feature Wall</span>
                      <strong style={{ color: '#3C2D8C' }}>
                        {savedConfig.surfaces?.['wall-feature']?.name || 'Selected Tint'}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: '#6D6877', display: 'block', fontSize: '0.72rem' }}>Floor Material</span>
                      <strong style={{ color: '#211D2D' }}>
                        {savedConfig.surfaces?.['floor-main']?.material || 'Stone / Wood'}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: '#6D6877', display: 'block', fontSize: '0.72rem' }}>Atmosphere</span>
                      <strong style={{ color: '#211D2D' }}>{savedConfig.lighting || 'Balanced'}</strong>
                    </div>
                  </div>

                  <Link
                    to="/space-studio"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      color: '#3C2D8C',
                      fontFamily: 'var(--font-mono, monospace)',
                      marginTop: '0.85rem',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    <span>Adjust 3D Selections</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}

              {/* Status / Prepared Action Card */}
              {isPrepared ? (
                <div
                  style={{
                    backgroundColor: '#FAF8F2',
                    borderRadius: '12px',
                    border: '2px solid #3C2D8C',
                    padding: '1.75rem',
                    boxShadow: '0 12px 32px rgba(60, 45, 140, 0.12)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                    <CheckCircle2 size={22} color="#3C2D8C" />
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.4rem',
                        color: '#211D2D',
                        margin: 0
                      }}
                    >
                      Enquiry Message Formatted
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#6D6877', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Your consultation brief is encoded and ready. Please click below to send via WhatsApp directly to
                    proprietor <strong>Mr. Abhishek Rao</strong>, or transmit via Email.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        padding: '0.9rem 1.4rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <MessageCircle size={18} />
                      <span>Open &amp; Send in WhatsApp</span>
                    </a>

                    <a
                      href={mailtoUrl}
                      style={{
                        backgroundColor: '#3C2D8C',
                        color: '#FAF8F2',
                        padding: '0.9rem 1.4rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <Mail size={18} />
                      <span>Send via Email Application</span>
                    </a>

                    <button
                      onClick={copyToClipboard}
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#211D2D',
                        border: '1px solid #E7E1D6',
                        padding: '0.75rem 1.4rem',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Copy size={15} />
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
                    </button>
                  </div>

                  <div
                    style={{
                      maxHeight: '160px',
                      overflowY: 'auto',
                      backgroundColor: '#FFFFFF',
                      padding: '0.85rem',
                      borderRadius: '6px',
                      border: '1px solid #E7E1D6',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.75rem',
                      color: '#4A4657',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {preparedText}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E7E1D6',
                    padding: '1.75rem',
                    boxShadow: '0 8px 24px rgba(33, 29, 45, 0.04)'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.45rem',
                      color: '#211D2D',
                      marginBottom: '0.75rem'
                    }}
                  >
                    Direct Consultant Access
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#6D6877', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Every project is personally evaluated by proprietor <strong>Mr. Abhishek Rao</strong>. We operate with
                    itemized transparency, zero hidden markups, and dedicated master craftsmen.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      borderTop: '1px solid #E7E1D6',
                      paddingTop: '1rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Phone size={15} color="#3C2D8C" />
                      <a href={`tel:${siteData.contact.phone}`} style={{ color: '#211D2D', textDecoration: 'none', fontWeight: 600 }}>
                        {siteData.contact.phone}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Mail size={15} color="#3C2D8C" />
                      <a href={`mailto:${siteData.contact.email}`} style={{ color: '#211D2D', textDecoration: 'none' }}>
                        {siteData.contact.email}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Info size={15} color="#3C2D8C" />
                      <span style={{ color: '#6D6877' }}>
                        {siteData.contact.address.formatted}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
