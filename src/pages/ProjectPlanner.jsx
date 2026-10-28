import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Ruler,
  Building,
  Home,
  Check,
  ChevronRight,
  ArrowRight,
  Calculator,
  MessageCircle,
  Mail,
  Info,
  Layers,
  Sparkles,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';
import { servicesData } from '../data/services';
import { siteData } from '../data/siteData';

export const ProjectPlanner = () => {
  const navigate = useNavigate();

  // Step state
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [projectType, setProjectType] = useState('RESIDENTIAL_APT');
  const [location, setLocation] = useState('Jayanagar / South Bangalore');
  const [roomPreset, setRoomPreset] = useState('3BHK');
  const [customSqFt, setCustomSqFt] = useState('1850');
  const [selectedServices, setSelectedServices] = useState([
    'stucco-texture',
    'false-ceilings',
    'interior-lighting-fans',
    'wood-polish-melamyne-pu'
  ]);
  const [materialPreferences, setMaterialPreferences] = useState(['Italian Stucco', 'Burma Teak', 'Cove LEDs']);
  const [preferredMood, setPreferredMood] = useState('WARM');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Toggle service selection
  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Toggle material preference
  const toggleMaterial = (mat) => {
    if (materialPreferences.includes(mat)) {
      setMaterialPreferences(materialPreferences.filter((m) => m !== mat));
    } else {
      setMaterialPreferences([...materialPreferences, mat]);
    }
  };

  // Square footage presets
  const handleRoomPreset = (preset) => {
    setRoomPreset(preset);
    if (preset === '2BHK') setCustomSqFt('1250');
    if (preset === '3BHK') setCustomSqFt('1850');
    if (preset === '4BHK') setCustomSqFt('2600');
    if (preset === 'VILLA') setCustomSqFt('3800');
    if (preset === 'OFFICE') setCustomSqFt('3000');
  };

  // Calculated Planning Estimates (Transparent Assumptions)
  const sqFtNum = parseInt(customSqFt, 10) || 1500;
  // Rule of thumb for standard residential spaces:
  // Paintable wall area is approx 2.8x carpet area
  // False ceiling area is approx 0.85x carpet area
  const estimatedWallArea = Math.round(sqFtNum * 2.8);
  const estimatedCeilingArea = Math.round(sqFtNum * 0.85);

  // Generate WhatsApp brief
  const generateWhatsAppUrl = () => {
    const servicesList = selectedServices
      .map((sId) => servicesData.find((s) => s.id === sId)?.shortTitle || sId)
      .join(', ');

    const text =
      `Hello COLOUR NEST,\n\n` +
      `I have configured a project plan on your website:\n\n` +
      `• Project Type: ${projectType}\n` +
      `• Location: ${location}\n` +
      `• Carpet Area Estimate: ~${sqFtNum} sq ft (${roomPreset})\n` +
      `• Services Needed: ${servicesList || 'Consultation required'}\n` +
      `• Material Desires: ${materialPreferences.join(', ')}\n` +
      `• Preferred Ambience: ${preferredMood}\n` +
      `• Additional Requirements: ${additionalNotes || 'Site inspection required'}\n\n` +
      `Please contact me regarding on-site feasibility and sample demonstration.`;

    return `https://wa.me/918494950088?text=${encodeURIComponent(text)}`;
  };

  // Store in localStorage and proceed to contact form
  const handleProceedToContact = () => {
    const plannerBrief = {
      projectType,
      location,
      approximateArea: `~${sqFtNum} sq ft (${roomPreset})`,
      selectedServices: selectedServices.map((id) => servicesData.find((s) => s.id === id)?.shortTitle || id),
      materials: materialPreferences,
      mood: preferredMood,
      notes: additionalNotes
    };
    try {
      localStorage.setItem('colournest_planner_brief', JSON.stringify(plannerBrief));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    navigate('/contact');
  };

  return (
    <>
      <SEOHead
        title="Project Planner & Space Estimator — Transparent Planning | COLOUR NEST"
        description="Structured spatial requirements calculator for interior transformations in Bangalore. Calculate surface requirements, select artisanal finishes, and prepare project brief."
      />

      <div style={{ backgroundColor: '#101113', minHeight: '100vh', color: '#FFFFFF', paddingTop: '6.5rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.2rem, 4vw, 3rem)' }}>
          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent, #B85C38)', fontWeight: 700 }}>
              SPATIAL REQUIREMENTS ESTIMATOR
            </span>
            <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', margin: '0.3rem 0 0.8rem', letterSpacing: '-0.02em' }}>
              PLAN YOUR PROJECT.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '680px', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
              Structure your project scope from substrate to final coat. Receive transparent surface area estimates and prepare a complete brief for Mr. Abhishek Rao.
            </p>
          </div>

          <ArchitecturalLine />

          {/* Stepper Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', margin: '2rem 0 2.5rem', overflowX: 'auto' }}>
            {[
              { num: 1, label: '01 SPACE & SCOPE' },
              { num: 2, label: '02 SERVICES & FINISHES' },
              { num: 3, label: '03 MOOD & MATERIALS' },
              { num: 4, label: '04 PROJECT SUMMARY' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                style={{
                  backgroundColor: currentStep === s.num ? 'rgba(184, 92, 56, 0.18)' : 'rgba(255,255,255,0.03)',
                  border: currentStep === s.num ? '1px solid var(--accent, #B85C38)' : '1px solid rgba(255,255,255,0.08)',
                  color: currentStep === s.num ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  borderRadius: '8px',
                  padding: '0.65rem 1.2rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 1: SPACE & LOCATION                                      */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  1. What kind of space are you transforming?
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {[
                    { id: 'RESIDENTIAL_APT', title: 'Apartment / Penthouse', desc: 'Standard or luxury high-rise unit' },
                    { id: 'VILLA', title: 'Independent Villa', desc: 'Multi-level bungalow or duplex' },
                    { id: 'OFFICE', title: 'Commercial / Office', desc: 'Corporate suite or collaborative studio' },
                    { id: 'EXTERIOR_ONLY', title: 'Exterior Facade', desc: 'Weatherproof exterior restoration' }
                  ].map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setProjectType(t.id)}
                      style={{
                        backgroundColor: projectType === t.id ? 'rgba(184,92,56,0.15)' : 'rgba(255,255,255,0.03)',
                        border: projectType === t.id ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '10px',
                        padding: '1.2rem',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#FFF', fontSize: '0.95rem' }}>{t.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: '0.3rem' }}>{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  2. Approximate Scale & Configuration
                </h3>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {['2BHK', '3BHK', '4BHK', 'VILLA', 'OFFICE', 'CUSTOM'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleRoomPreset(preset)}
                      style={{
                        backgroundColor: roomPreset === preset ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
                        color: '#FFF',
                        border: 'none',
                        padding: '0.55rem 1.1rem',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '380px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Carpet Area (sq ft):</span>
                  <input
                    type="number"
                    value={customSqFt}
                    onChange={(e) => setCustomSqFt(e.target.value)}
                    style={{
                      backgroundColor: '#1E2024',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#FFF',
                      padding: '0.5rem 0.8rem',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      width: '120px'
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  3. Bangalore Location / Suburb
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem' }}>
                  {[
                    'Jayanagar / JP Nagar',
                    'Koramangala / HSR',
                    'Indiranagar / CBD',
                    'Whitefield / East',
                    'Sadashivanagar / North',
                    'Bannerghatta / Kanakapura'
                  ].map((loc) => (
                    <div
                      key={loc}
                      onClick={() => setLocation(loc)}
                      style={{
                        backgroundColor: location === loc ? 'rgba(184,92,56,0.15)' : 'rgba(255,255,255,0.03)',
                        border: location === loc ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '0.8rem 1rem',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                        color: location === loc ? '#FFF' : 'rgba(255,255,255,0.7)'
                      }}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  onClick={() => setCurrentStep(2)}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.75rem 1.6rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>NEXT: SERVICES & FINISHES</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 2: SERVICES SELECTION                                    */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
                Select Desired Services (Multi-select)
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                Choose the architectural surface disciplines your project requires.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                {servicesData.map((service) => {
                  const isChecked = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      style={{
                        backgroundColor: isChecked ? 'rgba(184, 92, 56, 0.12)' : 'rgba(255,255,255,0.03)',
                        border: isChecked ? '1px solid var(--accent, #B85C38)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '10px',
                        padding: '1.1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.8rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          backgroundColor: isChecked ? 'var(--accent)' : 'transparent',
                          border: isChecked ? 'none' : '1px solid rgba(255,255,255,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '2px'
                        }}
                      >
                        {isChecked && <Check size={12} color="#FFF" />}
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600 }}>{service.title}</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginTop: '0.3rem', lineHeight: 1.3 }}>
                          {service.tagline}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setCurrentStep(1)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  PREVIOUS
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.75rem 1.6rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>NEXT: MOOD & MATERIALS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 3: MOOD & MATERIALS                                      */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  1. Desired Spatial Atmosphere
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  {[
                    { id: 'WARM', title: 'Warm Amber', desc: 'Terracotta, honey teak, 2700K coves' },
                    { id: 'CALM', title: 'Calm Sage', desc: 'Japandi tones, light ash, soft daylight' },
                    { id: 'MODERN', title: 'Modern Monolith', desc: 'Alabaster, charcoal, magnetic tracks' },
                    { id: 'LUXE', title: 'Luxe Bronze', desc: 'Venetian Stucco, Polycoat mirror gloss' }
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setPreferredMood(m.id)}
                      style={{
                        backgroundColor: preferredMood === m.id ? 'rgba(184,92,56,0.15)' : 'rgba(255,255,255,0.03)',
                        border: preferredMood === m.id ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '10px',
                        padding: '1.1rem',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#FFF', fontSize: '0.9rem' }}>{m.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: '0.3rem' }}>{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  2. Tactile Material Preferences
                </h3>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {[
                    'Italian Stucco',
                    'Anticco Stone',
                    'Burma Teak',
                    'Oak Veneers',
                    'Polycoat Seal',
                    'Cove LEDs',
                    'Grasscloth Wallpaper',
                    'Magnetic Track Light',
                    'Monsoon Weatherproof'
                  ].map((mat) => {
                    const isSelected = materialPreferences.includes(mat);
                    return (
                      <button
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        style={{
                          backgroundColor: isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
                          color: '#FFF',
                          border: 'none',
                          padding: '0.55rem 1rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer'
                        }}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '0.8rem', fontFamily: 'var(--font-display)' }}>
                  3. Additional Notes or Target Completion
                </h3>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g., Moving in next month, require on-site test swatches under warm lighting..."
                  style={{
                    width: '100%',
                    backgroundColor: '#1E2024',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#FFF',
                    borderRadius: '8px',
                    padding: '0.8rem',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setCurrentStep(2)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  PREVIOUS
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.75rem 1.6rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>REVIEW PROJECT SUMMARY</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 4: VISUAL SUMMARY & ENQUIRY EXPORT                       */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div
                style={{
                  backgroundColor: '#18191B',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '16px',
                  padding: '2rem',
                  marginBottom: '2.5rem'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
                  PROJECT SPECIFICATION SUMMARY
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFF', margin: '0.3rem 0 1.5rem' }}>
                  Your Interior Planning Brief
                </h2>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>CARPET AREA</div>
                    <div style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 700, marginTop: '0.2rem' }}>~{sqFtNum} sq ft</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', marginTop: '0.2rem' }}>{roomPreset} Typology</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>ESTIMATED WALL SURFACES</div>
                    <div style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 700, marginTop: '0.2rem' }}>~{estimatedWallArea} sq ft</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', marginTop: '0.2rem' }}>Standard 2.8x perimeter factor</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>CEILING PLANE</div>
                    <div style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 700, marginTop: '0.2rem' }}>~{estimatedCeilingArea} sq ft</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', marginTop: '0.2rem' }}>Gypsum drop & coves</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>SITE LOCATION</div>
                    <div style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 600, marginTop: '0.2rem' }}>{location}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', marginTop: '0.2rem' }}>Bangalore Metro</div>
                  </div>
                </div>

                {/* Transparent Notice */}
                <div
                  style={{
                    backgroundColor: 'rgba(184, 92, 56, 0.08)',
                    border: '1px solid rgba(184, 92, 56, 0.25)',
                    borderRadius: '8px',
                    padding: '0.85rem 1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.8rem'
                  }}
                >
                  <Info size={18} color="var(--accent)" />
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
                    <strong>Planning Estimates:</strong> Square-footage numbers are calculated from standard residential room perimeter ratios to assist your initial planning. Final verified quantities are confirmed during Mr. Abhishek Rao's on-site laser survey.
                  </span>
                </div>

                {/* Selected Disciplines */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                    SERVICES OF INTEREST ({selectedServices.length})
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {selectedServices.map((id) => (
                      <span
                        key={id}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          color: '#FFF',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {servicesData.find((s) => s.id === id)?.shortTitle || id}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Material Notes */}
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                    MATERIAL PREFERENCES
                  </div>
                  <div style={{ color: '#FFF', fontSize: '0.85rem' }}>{materialPreferences.join(' • ')}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setCurrentStep(3)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  EDIT PREFERENCES
                </button>

                <button
                  onClick={handleProceedToContact}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    color: '#FFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Mail size={14} />
                  <span>PREFILL ENQUIRY FORM</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'var(--accent, #B85C38)',
                    color: '#FFFFFF',
                    padding: '0.75rem 1.6rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 18px rgba(184, 92, 56, 0.4)'
                  }}
                >
                  <MessageCircle size={15} />
                  <span>SUBMIT VIA WHATSAPP (+91 84949 50088)</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectPlanner;
