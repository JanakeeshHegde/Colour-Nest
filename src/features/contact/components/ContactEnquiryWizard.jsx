import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from '../../../components/common/WhatsAppIcon';
import { siteData } from '../../../data/siteData';

const PROJECT_TYPES = [
  'Residential Interior',
  'Commercial Interior',
  'Painting & Finishes',
  'Textures & Wallpaper',
  'Wood & Polish',
  'Ceiling & Lighting',
  'Exterior',
  'Other'
];

const PROJECT_SCOPES = [
  'One Room',
  'Multiple Rooms',
  'Complete Interior',
  'Commercial Space',
  'Not Sure Yet'
];

const SERVICE_OPTIONS = [
  'Royals Play Designs',
  'Italian Venetian Stucco',
  'Anticco Stone Textures',
  'Designer Wallpapers',
  'Wood Polish (Melamyne / PU)',
  'Premium Wood Polycoat',
  'False Ceilings & Coves',
  'Architectural Smart Lighting & Fans',
  'Exterior Facade Coatings',
  'Custom Joinery & Millwork',
  'Turnkey Interior Execution'
];

const CONTACT_PREFERENCES = ['WhatsApp', 'Phone Call', 'Email'];

export const ContactEnquiryWizard = () => {
  const [searchParams] = useSearchParams();

  // Retrieve any saved 3D design configuration
  const [savedStudioConfig, setSavedStudioConfig] = useState(null);

  useEffect(() => {
    try {
      const activeRaw = localStorage.getItem('colournest_active_room_config');
      if (activeRaw) {
        setSavedStudioConfig(JSON.parse(activeRaw));
      }
    } catch (e) {
      console.warn('Could not read saved 3D design from storage:', e);
    }
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    location: '',
    projectType: searchParams.get('type') || 'Residential Interior',
    projectScope: 'Complete Interior',
    requiredServices: searchParams.get('service') ? [searchParams.get('service')] : [],
    contactPreference: 'WhatsApp',
    message: ''
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (srv) => {
    setFormData((prev) => {
      const exists = prev.requiredServices.includes(srv);
      return {
        ...prev,
        requiredServices: exists
          ? prev.requiredServices.filter((s) => s !== srv)
          : [...prev.requiredServices, srv]
      };
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        alert('Please provide your name.');
        return;
      }
      if (!formData.phoneNumber.trim()) {
        alert('Please provide your contact phone number.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Structured Message Generator
  const generateFormattedMessage = () => {
    let msg = `*New Project Consultation Request*\n`;
    msg += `--------------------------------------\n`;
    msg += `*Client Details:*\n`;
    msg += `• Name: ${formData.fullName}\n`;
    msg += `• Phone: ${formData.phoneNumber}\n`;
    if (formData.emailAddress) msg += `• Email: ${formData.emailAddress}\n`;
    if (formData.location) msg += `• Location: ${formData.location}\n`;
    msg += `• Preferred Contact: ${formData.contactPreference}\n\n`;

    msg += `*Project Scope:*\n`;
    msg += `• Type: ${formData.projectType}\n`;
    msg += `• Scope: ${formData.projectScope}\n\n`;

    if (formData.requiredServices.length > 0) {
      msg += `*Required Services:*\n`;
      formData.requiredServices.forEach((s) => {
        msg += `• ${s}\n`;
      });
      msg += `\n`;
    }

    if (savedStudioConfig) {
      msg += `*Attached 3D Space Studio Specification:*\n`;
      msg += `• Space: ${savedStudioConfig.roomType || 'Living'}\n`;
      if (savedStudioConfig.surfaces) {
        const s = savedStudioConfig.surfaces;
        if (s['wall-feature']?.name) msg += `• Feature Wall: ${s['wall-feature'].name} (${s['wall-feature'].color})\n`;
        if (s['floor-main']?.name) msg += `• Floor: ${s['floor-main'].name}\n`;
        if (s['wood-panel']?.name) msg += `• Wood Finish: ${s['wood-panel'].name}\n`;
        if (s['ceiling-main']?.name) msg += `• Ceiling Plaster: ${s['ceiling-main'].name}\n`;
      }
      if (savedStudioConfig.lighting) {
        msg += `• Lighting Mode: ${savedStudioConfig.lighting}\n`;
      }
      msg += `\n`;
    }

    if (formData.message.trim()) {
      msg += `*Project Notes:*\n${formData.message}\n\n`;
    }

    msg += `--------------------------------------\n`;
    msg += `_Sent via colournest.in direct enquiry_`;
    return msg;
  };

  const handleFinalSubmit = () => {
    const body = generateFormattedMessage();
    const encoded = encodeURIComponent(body);
    const waUrl = `https://wa.me/918494950088?text=${encoded}`;
    window.open(waUrl, '_blank');
    setIsSubmitted(true);
  };

  const copyMessage = () => {
    const body = generateFormattedMessage();
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedMsg = generateFormattedMessage();
  const mailtoUrl = `mailto:${siteData.contact.email}?subject=${encodeURIComponent(
    `Project Enquiry — ${formData.fullName} (${formData.projectType})`
  )}&body=${encodeURIComponent(formattedMsg)}`;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E7E1D6',
        boxShadow: '0 12px 36px rgba(33, 29, 45, 0.05)',
        padding: 'clamp(1.2rem, 3.5vw, 2.75rem)'
      }}
    >
      {!isSubmitted ? (
        <>
          {/* Progress Indicator */}
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6D6877',
                marginBottom: '0.75rem'
              }}
            >
              <span style={{ color: currentStep >= 1 ? '#3C2D8C' : '#6D6877', fontWeight: currentStep === 1 ? 700 : 500 }}>
                01. Details
              </span>
              <span>&rarr;</span>
              <span style={{ color: currentStep >= 2 ? '#3C2D8C' : '#6D6877', fontWeight: currentStep === 2 ? 700 : 500 }}>
                02. Space
              </span>
              <span>&rarr;</span>
              <span style={{ color: currentStep >= 3 ? '#3C2D8C' : '#6D6877', fontWeight: currentStep === 3 ? 700 : 500 }}>
                03. Requirement
              </span>
            </div>

            {/* Progress Bar Track */}
            <div
              style={{
                height: '3px',
                backgroundColor: '#E7E1D6',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: '#3C2D8C',
                  width: `${(currentStep / 4) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Form Stage Content */}
          <AnimatePresence mode="wait">
            {/* ---------------------------------------------------- */}
            {/* STEP 01: YOUR DETAILS                                */}
            {/* ---------------------------------------------------- */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.6rem',
                    color: '#211D2D',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  Step 01 — Contact Details
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6D6877', marginBottom: '1.75rem' }}>
                  Let us know who we are addressing and where we can reach you.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.45rem'
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #E7E1D6',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        color: '#211D2D',
                        backgroundColor: '#FAF8F2',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.45rem'
                      }}
                    >
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => updateField('phoneNumber', e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #E7E1D6',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        color: '#211D2D',
                        backgroundColor: '#FAF8F2',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="emailAddress"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.45rem'
                      }}
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="emailAddress"
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => updateField('emailAddress', e.target.value)}
                      placeholder="e.g. name@example.com"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #E7E1D6',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        color: '#211D2D',
                        backgroundColor: '#FAF8F2',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Location in Bangalore */}
                  <div>
                    <label
                      htmlFor="location"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.45rem'
                      }}
                    >
                      Project Location (Bangalore Neighborhood)
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      placeholder="e.g. Jayanagar, Indiranagar, Whitefield..."
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #E7E1D6',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        color: '#211D2D',
                        backgroundColor: '#FAF8F2',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 02: THE SPACE & SCOPE                           */}
            {/* ---------------------------------------------------- */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.6rem',
                    color: '#211D2D',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  Step 02 — Project Scope
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6D6877', marginBottom: '1.75rem' }}>
                  Tell us about the property and how comprehensive your requirements are.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Project Type */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.65rem'
                      }}
                    >
                      Property Nature
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                      {PROJECT_TYPES.map((type) => {
                        const selected = formData.projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => updateField('projectType', type)}
                            style={{
                              padding: '0.65rem 0.85rem',
                              borderRadius: '8px',
                              border: selected ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                              backgroundColor: selected ? 'rgba(60, 45, 140, 0.08)' : '#FAF8F2',
                              color: selected ? '#3C2D8C' : '#211D2D',
                              fontFamily: 'inherit',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              fontWeight: selected ? 600 : 400,
                              textAlign: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Scope */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.65rem'
                      }}
                    >
                      Scope of Work
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                      {PROJECT_SCOPES.map((scope) => {
                        const selected = formData.projectScope === scope;
                        return (
                          <button
                            key={scope}
                            type="button"
                            onClick={() => updateField('projectScope', scope)}
                            style={{
                              padding: '0.65rem 0.85rem',
                              borderRadius: '8px',
                              border: selected ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                              backgroundColor: selected ? 'rgba(60, 45, 140, 0.08)' : '#FAF8F2',
                              color: selected ? '#3C2D8C' : '#211D2D',
                              fontFamily: 'inherit',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              fontWeight: selected ? 600 : 400,
                              textAlign: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {scope}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 03: SERVICES & REQUIREMENTS                     */}
            {/* ---------------------------------------------------- */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.6rem',
                    color: '#211D2D',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  Step 03 — Finishing &amp; Needs
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6D6877', marginBottom: '1.75rem' }}>
                  Select the specialized trades you are interested in.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Services Multi-Select */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.65rem'
                      }}
                    >
                      Specific Services (Choose all that apply)
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.5rem' }}>
                      {SERVICE_OPTIONS.map((srv) => {
                        const selected = formData.requiredServices.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => toggleService(srv)}
                            style={{
                              padding: '0.65rem 0.75rem',
                              borderRadius: '8px',
                              border: selected ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                              backgroundColor: selected ? 'rgba(60, 45, 140, 0.08)' : '#FAF8F2',
                              color: selected ? '#3C2D8C' : '#211D2D',
                              fontFamily: 'inherit',
                              fontSize: '0.76rem',
                              cursor: 'pointer',
                              fontWeight: selected ? 600 : 400,
                              textAlign: 'left',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span>{srv}</span>
                            {selected && <Check size={13} color="#3C2D8C" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes / Message */}
                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.45rem'
                      }}
                    >
                      Project Notes or Specific Questions
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="e.g. 3BHK apartment ready for handover next month. Need Italian Stucco on living room feature wall and false ceilings in all bedrooms..."
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #E7E1D6',
                        fontFamily: 'inherit',
                        fontSize: '0.86rem',
                        color: '#211D2D',
                        backgroundColor: '#FAF8F2',
                        outline: 'none',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Contact Preference */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#211D2D',
                        fontWeight: 600,
                        marginBottom: '0.5rem'
                      }}
                    >
                      Preferred Channel for Initial Response
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {CONTACT_PREFERENCES.map((pref) => {
                        const selected = formData.contactPreference === pref;
                        return (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => updateField('contactPreference', pref)}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              border: selected ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                              backgroundColor: selected ? 'rgba(60, 45, 140, 0.08)' : '#FAF8F2',
                              color: selected ? '#3C2D8C' : '#211D2D',
                              fontFamily: 'inherit',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              fontWeight: selected ? 600 : 400
                            }}
                          >
                            {pref}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 04: REVIEW & SUBMIT                             */}
            {/* ---------------------------------------------------- */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.6rem',
                    color: '#211D2D',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  Review &amp; Submit Enquiry
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6D6877', marginBottom: '1.5rem' }}>
                  Please verify your entries before confirming. You can adjust any detail directly.
                </p>

                {/* Review Summary Card */}
                <div
                  style={{
                    backgroundColor: '#FAF8F2',
                    borderRadius: '10px',
                    border: '1px solid #E7E1D6',
                    padding: '1.25rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    color: '#211D2D'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E7E1D6', paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                    <div>
                      <strong style={{ display: 'block' }}>{formData.fullName}</strong>
                      <span style={{ color: '#6D6877', fontSize: '0.8rem' }}>{formData.phoneNumber} {formData.emailAddress ? `• ${formData.emailAddress}` : ''}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      style={{ background: 'none', border: 'none', color: '#3C2D8C', fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Edit Details
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E7E1D6', paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                    <div>
                      <strong style={{ display: 'block' }}>{formData.projectType} ({formData.projectScope})</strong>
                      <span style={{ color: '#6D6877', fontSize: '0.8rem' }}>Location: {formData.location || 'Bangalore'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      style={{ background: 'none', border: 'none', color: '#3C2D8C', fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Edit Space
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: savedStudioConfig ? '0.65rem' : '0' }}>
                    <div>
                      <strong style={{ display: 'block' }}>Services: {formData.requiredServices.length > 0 ? formData.requiredServices.join(', ') : 'Turnkey Finishing'}</strong>
                      {formData.message && (
                        <p style={{ color: '#6D6877', margin: '4px 0 0 0', fontStyle: 'italic', fontSize: '0.8rem' }}>
                          "{formData.message}"
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      style={{ background: 'none', border: 'none', color: '#3C2D8C', fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Edit Services
                    </button>
                  </div>

                  {/* Attached 3D Room Config Notice */}
                  {savedStudioConfig && (
                    <div
                      style={{
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px dashed #E7E1D6',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#3C2D8C',
                        fontSize: '0.78rem'
                      }}
                    >
                      <Sparkles size={14} color="#3C2D8C" />
                      <span>Your active 3D Space Studio configuration will be automatically attached!</span>
                    </div>
                  )}
                </div>

                {/* Confirmation Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    style={{
                      width: '100%',
                      padding: '0.95rem 1.5rem',
                      borderRadius: '9999px',
                      backgroundColor: '#3C2D8C',
                      color: '#FAF8F2',
                      border: '1px solid rgba(227, 217, 164, 0.4)',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 20px rgba(60, 45, 140, 0.3)'
                    }}
                  >
                    <WhatsAppIcon size={16} color="#E3D9A4" />
                    <span>Confirm &amp; Send on WhatsApp</span>
                  </button>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a
                      href={mailtoUrl}
                      style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        borderRadius: '9999px',
                        backgroundColor: '#FFFFFF',
                        color: '#211D2D',
                        border: '1px solid #E7E1D6',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontWeight: 600,
                        textAlign: 'center',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Mail size={13} color="#3C2D8C" />
                      <span>Email Fallback</span>
                    </a>

                    <button
                      type="button"
                      onClick={copyMessage}
                      style={{
                        padding: '0.75rem 1.25rem',
                        borderRadius: '9999px',
                        backgroundColor: '#FFFFFF',
                        color: '#211D2D',
                        border: '1px solid #E7E1D6',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {copied ? <Check size={13} color="#25D366" /> : <Copy size={13} color="#3C2D8C" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Navigation Controls (for steps 1-3) */}
          {currentStep < 4 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #E7E1D6'
              }}
            >
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#6D6877',
                    border: 'none',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.74rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={handleNext}
                style={{
                  backgroundColor: '#3C2D8C',
                  color: '#FAF8F2',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(227, 217, 164, 0.4)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(60, 45, 140, 0.2)'
                }}
              >
                <span>{currentStep === 3 ? 'Review Summary' : 'Continue'}</span>
                <ArrowRight size={14} color="#E3D9A4" />
              </button>
            </div>
          )}
        </>
      ) : (
        /* ============================================================== */
        /* COMPLETION CONFIRMATION STATE                                   */
        /* ============================================================== */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '1rem 0' }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(60, 45, 140, 0.1)',
              color: '#3C2D8C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}
          >
            <CheckCircle2 size={32} color="#3C2D8C" />
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: '1.8rem',
              color: '#211D2D',
              margin: '0 0 0.5rem 0'
            }}
          >
            Enquiry Formatted Successfully
          </h3>

          <p
            style={{
              fontSize: '0.92rem',
              color: '#4A4657',
              lineHeight: 1.6,
              maxWidth: '460px',
              margin: '0 auto 1.5rem auto'
            }}
          >
            Your enquiry details and finish preferences have been compiled.
            Your request opened in WhatsApp. If you need to resend or use email, the options are ready below.
          </p>

          <div
            style={{
              backgroundColor: '#FAF8F2',
              borderRadius: '8px',
              border: '1px solid #E7E1D6',
              padding: '1rem',
              textAlign: 'left',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.74rem',
              color: '#4A4657',
              maxHeight: '160px',
              overflowY: 'auto',
              marginBottom: '1.75rem',
              whiteSpace: 'pre-wrap'
            }}
          >
            {formattedMsg}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={handleFinalSubmit}
              style={{
                padding: '0.75rem 1.4rem',
                borderRadius: '9999px',
                backgroundColor: '#3C2D8C',
                color: '#FAF8F2',
                border: 'none',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <WhatsAppIcon size={14} color="#E3D9A4" />
              <span>Reopen WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={copyMessage}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#211D2D',
                border: '1px solid #E7E1D6',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copied ? <Check size={14} color="#25D366" /> : <Copy size={14} color="#3C2D8C" />}
              <span>{copied ? 'Copied' : 'Copy Message'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                backgroundColor: 'transparent',
                color: '#6D6877',
                border: 'none',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw size={13} />
              <span>Edit Responses</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

