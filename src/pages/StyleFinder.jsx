import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { servicesData } from '../data/services';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';
import { IMAGE_MANIFEST } from '../data/imageManifest';

const questions = [
  {
    id: 1,
    title: "WHAT ARE YOU TRANSFORMING?",
    subtitle: "Select the primary architectural domain.",
    options: [
      { id: "HOME", label: "HOME", desc: "Private apartment, villa or residential retreat" },
      { id: "OFFICE", label: "OFFICE", desc: "Executive suite, studio or collaborative floor" },
      { id: "COMMERCIAL", label: "COMMERCIAL", desc: "Boutique, clinic, gallery or hospitality" },
      { id: "EXTERIOR", label: "EXTERIOR", desc: "Weatherproof facade, compound walls & verandah" }
    ]
  },
  {
    id: 2,
    title: "HOW SHOULD IT FEEL?",
    subtitle: "Define the sensory atmosphere you want to inhabit.",
    options: [
      { id: "WARM", label: "WARM", desc: "Sun-baked clay, golden amber & cozy natural teak" },
      { id: "CALM", label: "CALM", desc: "Muted botanical sage, chalk minerals & quiet rest" },
      { id: "LUXE", label: "LUXE", desc: "Mirror-burnished Stucco, brass accents & high sheen" },
      { id: "BOLD", label: "BOLD", desc: "Basalt charcoal, midnight indigo & deep contrast" }
    ]
  },
  {
    id: 3,
    title: "WHAT NEEDS ATTENTION?",
    subtitle: "Identify the primary focal elements.",
    options: [
      { id: "WALL", label: "WALL", desc: "Feature walls, texture plasters & designer glazes" },
      { id: "CEILING", label: "CEILING", desc: "False ceilings, recessed coves & smart lighting" },
      { id: "WOOD", label: "WOOD", desc: "Teak door polishing, Melamyne & PU joinery" },
      { id: "WHOLE SPACE", label: "WHOLE SPACE", desc: "Complete turnkey spatial renovation" }
    ]
  },
  {
    id: 4,
    title: "YOUR STYLE?",
    subtitle: "Choose your guiding design philosophy.",
    options: [
      { id: "MODERN", label: "MODERN", desc: "Minimalist lines, seamless finishes & recessed fixtures" },
      { id: "CLASSIC", label: "CLASSIC", desc: "Timeless moldings, warm woodwork & traditional grace" },
      { id: "CONTEMPORARY", label: "CONTEMPORARY", desc: "Curated blend of current textures & clean palettes" },
      { id: "ARTISTIC", label: "ARTISTIC", desc: "Custom spatula weaves, Anticco patina & dimensional art" }
    ]
  }
];

export const StyleFinder = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({
    1: "HOME",
    2: "WARM",
    3: "WALL",
    4: "MODERN"
  });
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelectOption = (qId, optId) => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setIsCalculated(true);
    }
  };

  // Deterministic space direction generation
  const generateDirection = () => {
    const space = answers[1];
    const mood = answers[2];
    const focus = answers[3];
    const style = answers[4];

    let suggestedServiceSlug = "royals-play-designs";
    let visualUrl = IMAGE_MANIFEST["material-stucco-finish"].url;
    let directionTitle = "Venetian Mineral Warmth";
    let colorFamily = "Earthy Terracotta & Sandstone Cream";
    let description = "A tactile architectural sanctuary characterized by hand-burnished Stucco plaster, gentle warm perimeter LED grazing, and natural timber accents.";

    if (focus === "WOOD" || (mood === "WARM" && style === "CLASSIC")) {
      suggestedServiceSlug = "wood-polish-melamyne-pu";
      visualUrl = IMAGE_MANIFEST["material-wood-grain"].url;
      directionTitle = "Amber Teak & Heritage Plaster";
      colorFamily = "Deep Teak, Antique Bronze & Warm Sand";
      description = "Richly nourished wood grains with moisture-resistant PU and Melamyne finishes, complemented by classic cream and sandstone perimeter walls.";
    } else if (focus === "CEILING" || style === "MODERN") {
      suggestedServiceSlug = "false-ceilings";
      visualUrl = IMAGE_MANIFEST["architectural-false-ceiling"].url;
      directionTitle = "Sculptural Soffits & Ambient Coves";
      colorFamily = "Alabaster White, Basalt Slate & Warm Cove Amber";
      description = "Architectural gypsum false ceilings with concealed 3000K LED troughs that wash vertical walls with gentle, glare-free indirect illumination.";
    } else if (focus === "WHOLE SPACE") {
      suggestedServiceSlug = "one-stop-interior-solution";
      visualUrl = IMAGE_MANIFEST["hero-architectural-main"].url;
      directionTitle = "Harmonized Turnkey Synthesis";
      colorFamily = "Unified 5-Tone Architectural Scheme";
      description = "A holistic spatial transformation where false ceilings, woodwork, custom wall textures, and smart lighting dialogue seamlessly under Abhishek Rao's guidance.";
    } else if (space === "EXTERIOR") {
      suggestedServiceSlug = "exterior-painting-and-textures";
      visualUrl = IMAGE_MANIFEST["exterior-facade-contemporary"].url;
      directionTitle = "Weatherproof Monolithic Facade";
      colorFamily = "Granite Grey, Mineral White & Teak Soffits";
      description = "Monsoon-tested elastomeric coatings and dirt-shedding stone textures that maintain curb appeal and protect building masonry for years.";
    } else if (style === "ARTISTIC" || mood === "LUXE") {
      suggestedServiceSlug = "wallpaper-and-anticco-texture";
      visualUrl = IMAGE_MANIFEST["material-anticco-texture"].url;
      directionTitle = "Anticco Stone & Designer Texture";
      colorFamily = "Tuscan Ochre, Ancient Olive & Aged Brass";
      description = "Aged Italian lime plaster with multi-tonal patina that catches low-angle daylight, evoking the quiet permanence of historic European villas.";
    }

    const service = servicesData.find(s => s.slug === suggestedServiceSlug) || servicesData[0];

    return {
      directionTitle,
      colorFamily,
      description,
      visualUrl,
      suggestedService: service
    };
  };

  const result = generateDirection();

  const handleCreateThis = () => {
    navigate('/contact', {
      state: {
        suggestedService: result.suggestedService.title,
        stylePreference: result.directionTitle,
        spaceType: answers[1],
        notes: `Style Finder result: ${result.directionTitle} (${result.colorFamily})`
      }
    });
  };

  return (
    <>
      <SEOHead
        title="Style Finder — Interactive Spatial Direction Quiz"
        description="Discover your personal interior space direction with Colour Nest's interactive quiz. Deterministic spatial alignment connecting room type, mood, and artisan finishes."
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
              SPATIAL ALIGNMENT ENGINE
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              STYLE <br />
              <span className="heading-editorial-italic">FINDER.</span>
            </h1>
            <ArchitecturalLine label="4-STAGE DIAGNOSTIC QUESTIONNAIRE" coordinates="DETERMINISTIC FORMULA" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Answer four essential questions to discover your personalized spatial direction,
              recommended color family, and optimal surface craft disciplines.
            </p>
          </div>

          {!isCalculated ? (
            /* Quiz Questions */
            <div className="container-narrow" style={{ margin: '0 auto' }}>
              <div className="arch-card" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
                {/* Step indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span className="meta-tag">
                    QUESTION 0{currentQ + 1} OF 0{questions.length}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    {Math.round(((currentQ + 1) / questions.length) * 100)}% COMPLETE
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '0.5rem' }}>
                  {questions[currentQ].title}
                </h2>
                <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                  {questions[currentQ].subtitle}
                </p>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {questions[currentQ].options.map((opt) => {
                    const isSelected = answers[questions[currentQ].id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(questions[currentQ].id, opt.id)}
                        className="arch-card"
                        style={{
                          cursor: 'pointer',
                          padding: '1.25rem 1.75rem',
                          border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-elevated)',
                          transition: 'all 0.25s ease'
                        }}
                        data-cursor="SELECT"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: isSelected ? 'var(--accent)' : 'var(--ink-primary)' }}>
                              {opt.label}
                            </strong>
                            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '2px' }}>
                              {opt.desc}
                            </p>
                          </div>
                          {isSelected && <CheckCircle2 size={20} color="var(--accent)" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Back / Skip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {currentQ > 0 ? (
                    <button
                      onClick={() => setCurrentQ((p) => p - 1)}
                      className="btn-secondary"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.75rem' }}
                    >
                      <ArrowLeft size={14} />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  <button
                    onClick={() => {
                      if (currentQ < questions.length - 1) {
                        setCurrentQ((p) => p + 1);
                      } else {
                        setIsCalculated(true);
                      }
                    }}
                    className="btn-ghost"
                    style={{ fontSize: '0.75rem' }}
                  >
                    <span>Next Question</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen: YOUR SPACE DIRECTION */
            <div className="container-narrow" style={{ margin: '0 auto' }}>
              <div
                className="arch-card"
                style={{
                  padding: 'clamp(2rem, 5vw, 4rem)',
                  backgroundColor: 'var(--surface-elevated)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="meta-tag">YOUR SPACE DIRECTION</span>
                  <button
                    onClick={() => {
                      setIsCalculated(false);
                      setCurrentQ(0);
                    }}
                    className="btn-ghost"
                    style={{ fontSize: '0.72rem' }}
                  >
                    <RefreshCw size={12} />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                <h2 className="heading-display" style={{ marginBottom: '0.5rem' }}>
                  {result.directionTitle}
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '2rem' }}>
                  COLOR FAMILY: {result.colorFamily}
                </p>

                {/* Visual Imagery */}
                <div className="aspect-16-9" style={{ borderRadius: 'var(--radius-xs)', marginBottom: '2rem', boxShadow: 'var(--shadow-elevated)' }}>
                  <img src={result.visualUrl} alt={result.directionTitle} className="aspect-fill" />
                </div>

                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {result.description}
                </p>

                {/* Suggested Service Callout */}
                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <span className="meta-tag" style={{ fontSize: '0.65rem', marginBottom: '0.2rem' }}>
                      RECOMMENDED ARCHITECTURAL SERVICE
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
                      {result.suggestedService.title}
                    </h4>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                    SERVICE {result.suggestedService.number}
                  </span>
                </div>

                {/* CTA Action: LET'S CREATE THIS */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleCreateThis}
                    className="btn-primary"
                    data-cursor="CREATE"
                    style={{ padding: '1rem 2.4rem', fontSize: '0.85rem' }}
                  >
                    <span>Let's Create This</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setIsCalculated(false);
                      setCurrentQ(0);
                    }}
                    className="btn-secondary"
                  >
                    <span>Explore Other Directions</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
