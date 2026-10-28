import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Navigation
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { siteData } from '../data/siteData';

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

export const Contact = () => {
  const [searchParams] = useSearchParams();

  // Current Step: 1, 2, 3 or 4 (Review/Submit)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    projectType: searchParams.get('project') || 'Residential Interior',
    location: 'Bangalore',
    projectScope: 'Complete Interior',
    requiredServices: searchParams.get('service') ? [searchParams.get('service')] : ['Turnkey Interior Execution'],
    message: '',
    contactPreference: 'WhatsApp'
  });

  const [errors, setErrors] = useState({});

  // Detect Saved 3D Space Studio Configuration
  const [savedStudioConfig, setSavedStudioConfig] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('colournest_active_room_config');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.surfaces) {
          setSavedStudioConfig(parsed);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Update single field
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Toggle multi-select service pill
  const toggleService = (srv) => {
    setFormData((prev) => {
      const exists = prev.requiredServices.includes(srv);
      const updated = exists
        ? prev.requiredServices.filter((s) => s !== srv)
        : [...prev.requiredServices, srv];
      return { ...prev, requiredServices: updated };
    });
    if (errors.requiredServices) {
      setErrors((prev) => ({ ...prev, requiredServices: null }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      errs.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.emailAddress.trim()) {
      errs.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs = {};
    if (!formData.projectType) errs.projectType = 'Please select a project type';
    if (!formData.location.trim()) errs.location = 'Please provide the project location';
    if (!formData.projectScope) errs.projectScope = 'Please select the approximate scope';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs = {};
    if (formData.requiredServices.length === 0) {
      errs.requiredServices = 'Please select at least one service of interest';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4); // Review
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Generate Message Payload
  const generateFormattedMessage = () => {
    let msg = `*COLOUR NEST — Project Enquiry*\n`;
    msg += `--------------------------------------\n`;
    msg += `*Name:* ${formData.fullName}\n`;
    msg += `*Phone:* ${formData.phoneNumber}\n`;
    msg += `*Email:* ${formData.emailAddress}\n`;
    msg += `*Location:* ${formData.location}\n`;
    msg += `*Project Type:* ${formData.projectType}\n`;
    msg += `*Scope:* ${formData.projectScope}\n`;
    msg += `*Services Required:* ${formData.requiredServices.join(', ')}\n`;
    msg += `*Preferred Contact Method:* ${formData.contactPreference}\n\n`;

    if (savedStudioConfig && savedStudioConfig.surfaces) {
      msg += `*Custom 3D Studio Configuration:*\n`;
      msg += `• Room Type: ${savedStudioConfig.roomType || 'Living'}\n`;
      if (savedStudioConfig.surfaces['wall-feature']?.name) {
        msg += `• Feature Wall: ${savedStudioConfig.surfaces['wall-feature'].name} (${savedStudioConfig.surfaces['wall-feature'].color})\n`;
      }
      if (savedStudioConfig.surfaces['wall-main']?.name) {
        msg += `• Main Wall: ${savedStudioConfig.surfaces['wall-main'].name} (${savedStudioConfig.surfaces['wall-main'].color})\n`;
      }
      if (savedStudioConfig.surfaces['floor-main']?.material) {
        msg += `• Floor: ${savedStudioConfig.surfaces['floor-main'].material}\n`;
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
                    COLOUR NEST
                  </span>
                  <strong style={{ fontSize: '0.92rem', color: '#3C2D8C', display: 'block', marginTop: '2px' }}>
                    Mr. Abhishek Rao
                  </strong>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#6D6877', textTransform: 'uppercase' }}>
                    Proprietor &amp; Consultant
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
                    <span>29th Main, 39th Cross, 9th Block, Jayanagar, Bangalore - 560069</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={15} color="#3C2D8C" style={{ flexShrink: 0 }} />
                    <a href={`tel:${siteData.contact.phone}`} style={{ color: '#211D2D', textDecoration: 'none' }}>
                      +91 84949 50088
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={15} color="#3C2D8C" style={{ flexShrink: 0 }} />
                    <a href={`mailto:${siteData.contact.email}`} style={{ color: '#211D2D', textDecoration: 'none' }}>
                      info.colournest@gmail.com
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
                  <MessageCircle size={13} color="#25D366" />
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
            {/* RIGHT SIDE — INTERACTIVE 3-STAGE ENQUIRY FORM                   */}
            {/* ============================================================== */}
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
                      <span style={{ color: currentStep >= 3 ? '#3C2D8C' : '#6D6877', fontWeight: currentStep >= 3 ? 700 : 500 }}>
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
                                border: errors.fullName ? '1px solid #D32F2F' : '1px solid #E7E1D6',
                                backgroundColor: '#FAF8F2',
                                fontFamily: 'inherit',
                                fontSize: '0.92rem',
                                color: '#211D2D',
                                outline: 'none'
                              }}
                            />
                            {errors.fullName && (
                              <span style={{ fontSize: '0.74rem', color: '#D32F2F', marginTop: '4px', display: 'block' }}>
                                {errors.fullName}
                              </span>
                            )}
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
                              Phone / WhatsApp Number *
                            </label>
                            <input
                              id="phoneNumber"
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={(e) => updateField('phoneNumber', e.target.value)}
                              placeholder="+91 98765 43210"
                              style={{
                                width: '100%',
                                padding: '0.85rem 1rem',
                                borderRadius: '8px',
                                border: errors.phoneNumber ? '1px solid #D32F2F' : '1px solid #E7E1D6',
                                backgroundColor: '#FAF8F2',
                                fontFamily: 'inherit',
                                fontSize: '0.92rem',
                                color: '#211D2D',
                                outline: 'none'
                              }}
                            />
                            {errors.phoneNumber && (
                              <span style={{ fontSize: '0.74rem', color: '#D32F2F', marginTop: '4px', display: 'block' }}>
                                {errors.phoneNumber}
                              </span>
                            )}
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
                              Email Address *
                            </label>
                            <input
                              id="emailAddress"
                              type="email"
                              value={formData.emailAddress}
                              onChange={(e) => updateField('emailAddress', e.target.value)}
                              placeholder="name@example.com"
                              style={{
                                width: '100%',
                                padding: '0.85rem 1rem',
                                borderRadius: '8px',
                                border: errors.emailAddress ? '1px solid #D32F2F' : '1px solid #E7E1D6',
                                backgroundColor: '#FAF8F2',
                                fontFamily: 'inherit',
                                fontSize: '0.92rem',
                                color: '#211D2D',
                                outline: 'none'
                              }}
                            />
                            {errors.emailAddress && (
                              <span style={{ fontSize: '0.74rem', color: '#D32F2F', marginTop: '4px', display: 'block' }}>
                                {errors.emailAddress}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ---------------------------------------------------- */}
                    {/* STEP 02: YOUR SPACE                                  */}
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
                          Step 02 — Space &amp; Location
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: '#6D6877', marginBottom: '1.75rem' }}>
                          Select your project typology, approximate scope, and property location.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          {/* Project Type */}
                          <div>
                            <span
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
                              Project Type *
                            </span>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.5rem' }}>
                              {PROJECT_TYPES.map((type) => {
                                const selected = formData.projectType === type;
                                return (
                                  <button
                                    key={type}
                                    type="button"
                                    onClick={() => updateField('projectType', type)}
                                    style={{
                                      padding: '0.6rem 0.8rem',
                                      borderRadius: '8px',
                                      border: selected ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                                      backgroundColor: selected ? 'rgba(60, 45, 140, 0.08)' : '#FAF8F2',
                                      color: selected ? '#3C2D8C' : '#211D2D',
                                      fontFamily: 'inherit',
                                      fontSize: '0.8rem',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      fontWeight: selected ? 600 : 400,
                                      transition: 'all 0.15s ease'
                                    }}
                                  >
                                    {type}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Location */}
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
                              Project Location *
                            </label>
                            <input
                              id="location"
                              type="text"
                              value={formData.location}
                              onChange={(e) => updateField('location', e.target.value)}
                              placeholder="e.g. Jayanagar, Koramangala, Indiranagar, Whitefield"
                              style={{
                                width: '100%',
                                padding: '0.85rem 1rem',
                                borderRadius: '8px',
                                border: errors.location ? '1px solid #D32F2F' : '1px solid #E7E1D6',
                                backgroundColor: '#FAF8F2',
                                fontFamily: 'inherit',
                                fontSize: '0.92rem',
                                color: '#211D2D',
                                outline: 'none'
                              }}
                            />
                            {errors.location && (
                              <span style={{ fontSize: '0.74rem', color: '#D32F2F', marginTop: '4px', display: 'block' }}>
                                {errors.location}
                              </span>
                            )}
                          </div>

                          {/* Approximate Project Scope */}
                          <div>
                            <span
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
                              Approximate Scope *
                            </span>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '0.5rem' }}>
                              {PROJECT_SCOPES.map((scope) => {
                                const selected = formData.projectScope === scope;
                                return (
                                  <button
                                    key={scope}
                                    type="button"
                                    onClick={() => updateField('projectScope', scope)}
                                    style={{
                                      padding: '0.6rem 0.8rem',
                                      borderRadius: '8px',
                                      border: selected ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                                      backgroundColor: selected ? 'rgba(60, 45, 140, 0.08)' : '#FAF8F2',
                                      color: selected ? '#3C2D8C' : '#211D2D',
                                      fontFamily: 'inherit',
                                      fontSize: '0.8rem',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      fontWeight: selected ? 600 : 400,
                                      transition: 'all 0.15s ease'
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
                    {/* STEP 03: YOUR REQUIREMENT                            */}
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
                          Step 03 — Requirements &amp; Notes
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: '#6D6877', marginBottom: '1.5rem' }}>
                          Select the specific finishes needed and add any architectural details or deadlines.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          {/* Required Services multi-select pills */}
                          <div>
                            <span
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
                              Services Needed (Select all that apply) *
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                              {SERVICE_OPTIONS.map((srv) => {
                                const selected = formData.requiredServices.includes(srv);
                                return (
                                  <button
                                    key={srv}
                                    type="button"
                                    onClick={() => toggleService(srv)}
                                    style={{
                                      padding: '0.45rem 0.85rem',
                                      borderRadius: '9999px',
                                      border: selected ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                                      backgroundColor: selected ? '#3C2D8C' : '#FAF8F2',
                                      color: selected ? '#FAF8F2' : '#211D2D',
                                      fontFamily: 'inherit',
                                      fontSize: '0.76rem',
                                      cursor: 'pointer',
                                      fontWeight: selected ? 600 : 400,
                                      transition: 'all 0.15s ease'
                                    }}
                                  >
                                    {selected ? '✓ ' : '+ '}
                                    {srv}
                                  </button>
                                );
                              })}
                            </div>
                            {errors.requiredServices && (
                              <span style={{ fontSize: '0.74rem', color: '#D32F2F', marginTop: '6px', display: 'block' }}>
                                {errors.requiredServices}
                              </span>
                            )}
                          </div>

                          {/* Message / Project Notes */}
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
                              Project Notes / Space Details (Optional)
                            </label>
                            <textarea
                              id="message"
                              rows={3}
                              value={formData.message}
                              onChange={(e) => updateField('message', e.target.value)}
                              placeholder="e.g. 3BHK flat handover in Jayanagar, looking for Italian Stucco in living hall and PU polish on teak entrance door."
                              style={{
                                width: '100%',
                                padding: '0.85rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #E7E1D6',
                                backgroundColor: '#FAF8F2',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                color: '#211D2D',
                                outline: 'none',
                                resize: 'vertical'
                              }}
                            />
                          </div>

                          {/* Preferred Contact Method */}
                          <div>
                            <span
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
                              Preferred Response Method
                            </span>
                            <div style={{ display: 'flex', gap: '0.65rem' }}>
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
                              <span style={{ color: '#6D6877', fontSize: '0.8rem' }}>{formData.phoneNumber} • {formData.emailAddress}</span>
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
                              <span style={{ color: '#6D6877', fontSize: '0.8rem' }}>Location: {formData.location}</span>
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
                              <strong style={{ display: 'block' }}>Services: {formData.requiredServices.join(', ')}</strong>
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
                            <MessageCircle size={16} color="#E3D9A4" />
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
                      <MessageCircle size={14} color="#E3D9A4" />
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
                        29th Main, 39th Cross, 9th Block, Jayanagar, Bangalore &ndash; 560069
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
                      href="tel:+918494950088"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        color: '#211D2D',
                        textDecoration: 'none'
                      }}
                    >
                      <Phone size={13} color="#3C2D8C" />
                      <span>+91 84949 50088</span>
                    </a>

                    <a
                      href="mailto:info.colournest@gmail.com"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        color: '#211D2D',
                        textDecoration: 'none'
                      }}
                    >
                      <Mail size={13} color="#3C2D8C" />
                      <span>info.colournest@gmail.com</span>
                    </a>
                  </div>
                </div>

                {/* Primary Get Directions CTA + Action Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <a
                    href="https://maps.app.goo.gl/pe2eR6CGW8a4iuuq7"
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
                    href="tel:+918494950088"
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
                    <MessageCircle size={13} color="#25D366" />
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
                    href="https://maps.app.goo.gl/pe2eR6CGW8a4iuuq7"
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
