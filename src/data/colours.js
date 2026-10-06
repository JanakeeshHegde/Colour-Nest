/**
 * COLOUR NEST - Curated Architectural Color System
 * Tailored palettes, physical paint chips, room moods & hex values
 */

export const physicalSwatches = [
  {
    id: "clay",
    name: "Terracotta Clay",
    label: "CLAY",
    hex: "#B85C38",
    accentVar: "#B85C38",
    accentSoft: "#F4ECE6",
    accentDark: "#7B341E",
    surfaceVar: "#FBF7F4",
    inkVar: "#1F1714",
    tone: "warm",
    lrv: 24,
    description: "An earthy, sun-baked terracotta pigment grounded in architectural warmth and natural pottery tones.",
    surfaceSuitability: "Living accent walls, dining alcoves, study chambers."
  },
  {
    id: "sand",
    name: "Jayanagar Sandstone",
    label: "SAND",
    hex: "#D6C7A1",
    accentVar: "#A88D56",
    accentSoft: "#FAF6EE",
    accentDark: "#6E5728",
    surfaceVar: "#FAF8F2",
    inkVar: "#1E1C17",
    tone: "neutral-warm",
    lrv: 58,
    description: "A luminous mineral cream inspired by weathered granite and crushed architectural sandstone.",
    surfaceSuitability: "Whole-home foundational walls, open corridors, high-ceiling spaces."
  },
  {
    id: "sage",
    name: "Bangalore Botanical Sage",
    label: "SAGE",
    hex: "#7A8B7B",
    accentVar: "#5C6F5D",
    accentSoft: "#F0F4F1",
    accentDark: "#374638",
    surfaceVar: "#F5F8F6",
    inkVar: "#151C16",
    tone: "calm-cool",
    lrv: 36,
    description: "Muted eucalyptus and garden flora tone that softens hard light and invites tranquil repose.",
    surfaceSuitability: "Master bedrooms, reading nooks, spa-like baths, breakfast corners."
  },
  {
    id: "charcoal",
    name: "Architectural Charcoal",
    label: "CHARCOAL",
    hex: "#2B2D2F",
    accentVar: "#3F4245",
    accentSoft: "#F0F0F0",
    accentDark: "#171819",
    surfaceVar: "#1C1D1E",
    inkVar: "#EDEBE7",
    tone: "dramatic-deep",
    lrv: 8,
    description: "A velvety, non-reflective basalt black that pulls focus and recedes visually to create profound depth.",
    surfaceSuitability: "Media lounges, home theaters, gallery niches, feature paneling."
  },
  {
    id: "indigo",
    name: "Mysore Deep Indigo",
    label: "INDIGO",
    hex: "#2B3A4A",
    accentVar: "#2A455E",
    accentSoft: "#EFF3F7",
    accentDark: "#152433",
    surfaceVar: "#F5F7FA",
    inkVar: "#10161C",
    tone: "rich-atmospheric",
    lrv: 14,
    description: "Deep nocturnal pigment echoing heritage South Indian indigo vats and serene twilight skies.",
    surfaceSuitability: "Formal dining, library walls, powder rooms, study backdrop."
  },
  {
    id: "bronze",
    name: "Warm Architectural Bronze",
    label: "BRONZE",
    hex: "#8C6D46",
    accentVar: "#8C6D46",
    accentSoft: "#F7F3EE",
    accentDark: "#523C20",
    surfaceVar: "#FAF7F2",
    inkVar: "#1E1810",
    tone: "metallic-warm",
    lrv: 26,
    description: "Antiqued bronze and burnished alloy tone that bridges natural timber and stone plaster.",
    surfaceSuitability: "Joinery highlights, wainscoting trims, entryway ceilings."
  },
  {
    id: "rose-clay",
    name: "Dusty Rose Clay",
    label: "ROSE CLAY",
    hex: "#C28E7E",
    accentVar: "#A46D5D",
    accentSoft: "#F8F1EF",
    accentDark: "#683B2D",
    surfaceVar: "#FAF5F3",
    inkVar: "#211613",
    tone: "tactile-soft",
    lrv: 34,
    description: "A sophisticated desaturated blush grounded with umber and chalk, avoiding synthetic sweetness.",
    surfaceSuitability: "Guest suites, dressing lounges, boutique vanity spaces."
  },
  {
    id: "alabaster",
    name: "Raw Alabaster Plaster",
    label: "ALABASTER",
    hex: "#EFECE6",
    accentVar: "#968A78",
    accentSoft: "#FFFFFF",
    accentDark: "#5E5547",
    surfaceVar: "#FCFAF6",
    inkVar: "#1B1917",
    tone: "pure-foundation",
    lrv: 78,
    description: "Clean, light-bouncing foundational white softened with a whisper of raw travertine limestone.",
    surfaceSuitability: "Ceilings, light wells, minimal galleries, contemporary expanses."
  }
];

export const roomTypes = [
  { id: "LIVING", label: "Living Space", icon: "Sofa", description: "The social epicenter requiring balanced light, conversation-sparking textures, and harmonious flow." },
  { id: "BEDROOM", label: "Resting Sanctuary", icon: "Bed", description: "Intimate private retreat prioritizing circadian soothing hues, velvety sheens, and acoustic softness." },
  { id: "KITCHEN", label: "Culinary & Dining", icon: "Utensils", description: "Dynamic zones demanding moisture-cleanable coatings, appetizing earth tones, and warm task illumination." },
  { id: "EXTERIOR", label: "Facade & Verandah", icon: "Home", description: "Monsoon-tested architectural skins harmonizing with Bangalore's tropical foliage and granite foundations." }
];

export const moodTypes = [
  { id: "CALM", label: "Calm & Serene", subtitle: "Soft minerals, sage leaves & gentle chalk" },
  { id: "BOLD", label: "Dramatic & Bold", subtitle: "Deep indigo, charred basalt & high contrast" },
  { id: "CLASSIC", label: "Heritage & Classic", subtitle: "Warm sandstone, antique bronze & rich teak" },
  { id: "MODERN", label: "Contemporary & Modern", subtitle: "Clean alabaster, graphite lines & pure form" }
];

export const curatedPalettes = {
  "LIVING_CALM": {
    name: "Jayanagar Morning Light",
    concept: "Gentle natural daylight bouncing off textured minerals and pale eucalyptus foliage.",
    colors: [
      { name: "Raw Alabaster", hex: "#EFECE6", role: "Ceiling & Coves" },
      { name: "Limestone Sand", hex: "#E2D9C5", role: "Primary Walls" },
      { name: "Bangalore Sage", hex: "#8A9A8B", role: "Feature Accent" },
      { name: "Earthy Umber", hex: "#5A4E44", role: "Joinery & Trims" },
      { name: "Antique Brass", hex: "#C5A869", role: "Hardware & Light Accents" }
    ],
    recommendedFinish: "Stucco velvet plaster on feature wall with matte acrylic emulsion elsewhere",
    lightingTip: "Pair with 3000K warm diffuse cove LED and directional spots grazing the sage wall."
  },
  "LIVING_BOLD": {
    name: "Architectural Twilight",
    concept: "Sculptural drama built with deep nocturnal tones and striking warm metallic warmth.",
    colors: [
      { name: "Midnight Charcoal", hex: "#222426", role: "Media & Feature Wall" },
      { name: "Deep Indigo", hex: "#233342", role: "Secondary Contrast" },
      { name: "Warm Greige", hex: "#C9C0B3", role: "Balancing Walls" },
      { name: "Burnished Bronze", hex: "#9E7B48", role: "Metal & Wood Trims" },
      { name: "Whisper White", hex: "#EDE9E1", role: "Architectural Ceiling" }
    ],
    recommendedFinish: "Royals Play metallic stipple glaze or dark burnished Stucco",
    lightingTip: "Concealed 2700K perimeter grazing will make the dark surface shimmer like velvet."
  },
  "LIVING_CLASSIC": {
    name: "Colonial Teak & Sandstone",
    concept: "Timeless Bangalore heritage aesthetic combining warm stone, brass, and deep oiled timber.",
    colors: [
      { name: "Heritage Sandstone", hex: "#DECDB0", role: "Main Walls" },
      { name: "Terracotta Clay", hex: "#B85C38", role: "Archway Accent" },
      { name: "Burma Teak Brown", hex: "#5C3D24", role: "Doors & Wood Polish" },
      { name: "Aged Ochre", hex: "#CFA04E", role: "Decorative Molding" },
      { name: "Cream Plaster", hex: "#F3ECE1", role: "Gypsum False Ceiling" }
    ],
    recommendedFinish: "Anticco lime plaster with Melamyne or PU wood polish on architectural joinery",
    lightingTip: "Warm dimmable chandelier light balanced with hidden warm uplights."
  },
  "LIVING_MODERN": {
    name: "Minimalist Gallery Form",
    concept: "Clean, restrained architectural rhythm honoring pure geometry and tactile micro-relief.",
    colors: [
      { name: "Gallery Off-White", hex: "#F4F2EB", role: "Continuous Envelope" },
      { name: "Basalt Slate", hex: "#46484A", role: "Floating TV Panel" },
      { name: "Bleached Oak", hex: "#D4C5B0", role: "Wood Slats & Storage" },
      { name: "Concrete Wash", hex: "#B3B0A8", role: "Column Treatment" },
      { name: "Matte Black", hex: "#161718", role: "Architectural Hardware" }
    ],
    recommendedFinish: "Super-flat architectural matte emulsion with low-sheen Polycoat woodwork",
    lightingTip: "Recessed magnetic track system with 3500K neutral-warm spot accents."
  },
  "BEDROOM_CALM": {
    name: "Slumbering Sanctuary",
    concept: "Low-contrast, rhythmic calm designed to promote restorative deep rest.",
    colors: [
      { name: "Misted Sage", hex: "#A3B2A4", role: "Headboard Wall" },
      { name: "Chalk Linen", hex: "#ECE7DE", role: "Surrounding Walls" },
      { name: "Warm Oat", hex: "#D2C5B3", role: "Wardrobe Laminates" },
      { name: "Soft Cashmere", hex: "#BEB0A2", role: "Window Reveille" },
      { name: "Alabaster Ceiling", hex: "#F7F5F0", role: "Upper Plane" }
    ],
    recommendedFinish: "Velvet touch matte emulsion with anti-fungal hygiene formulation",
    lightingTip: "Independent reading wall sconces with low-lumen ambient perimeter glow."
  },
  "BEDROOM_BOLD": {
    name: "Nocturne Cocoon",
    concept: "An enveloping, opulent chamber wrapped in velvety deep tones and brass gleams.",
    colors: [
      { name: "Deep Inkwell", hex: "#1B2836", role: "All Four Walls" },
      { name: "Smoky Quartz", hex: "#453835", role: "Wardrobe Accents" },
      { name: "Brushed Gold", hex: "#D4AF37", role: "Sconce & Handle Metal" },
      { name: "Muted Charcoal", hex: "#32353A", role: "Ceiling Tint" },
      { name: "Warm Suede", hex: "#9E8B7A", role: "Textile Contrast" }
    ],
    recommendedFinish: "Eggshell wipeable glaze or Stucco feature wall with hand-buffed sheen",
    lightingTip: "Low-placed fixtures to cast soft pools of light across rich bedding."
  },
  "BEDROOM_CLASSIC": {
    name: "Rosewood & Ivory Haven",
    concept: "Warm, dignified South Indian residential elegance with polished rosewood accents.",
    colors: [
      { name: "Ivory Silk", hex: "#F3EFE6", role: "Primary Envelope" },
      { name: "Terracotta Earth", hex: "#AF583B", role: "Niche Dressing" },
      { name: "Deep Rosewood", hex: "#48261F", role: "Bed & Cabinet Polish" },
      { name: "Dull Gold", hex: "#BFA364", role: "Molding Trims" },
      { name: "Cloud White", hex: "#FAF8F4", role: "False Ceiling" }
    ],
    recommendedFinish: "Royals Play subtle linen pattern behind headboard; Polycoat wood finish",
    lightingTip: "Warm bedside pendants suspended at eye level."
  },
  "BEDROOM_MODERN": {
    name: "Urban Zen Suite",
    concept: "Understated neutral layering emphasizing air, shadow, and quiet luxury.",
    colors: [
      { name: "Pebble Grey", hex: "#CDC9C1", role: "Main Walls" },
      { name: "Charcoal Ash", hex: "#383B3D", role: "Louvered Wardrobe" },
      { name: "Natural Birch", hex: "#E0D5C3", role: "Bed Frame & Side Tables" },
      { name: "Bone White", hex: "#F8F6F1", role: "Ceiling & Doors" },
      { name: "Bronze Oxide", hex: "#7E6A52", role: "Accent Sockets" }
    ],
    recommendedFinish: "Smooth seamless gypsum finish with water-based PU timber coat",
    lightingTip: "Concealed curtain pocket LED strip washing down floor-to-ceiling drapes."
  },
  "KITCHEN_CALM": {
    name: "Botanical Hearth",
    concept: "Crisp, appetizing organic tones with effortless wipeability and culinary light.",
    colors: [
      { name: "Fresh Celadon", hex: "#8F9E8B", role: "Base Cabinetry" },
      { name: "Pure Quartz White", hex: "#FAF8F5", role: "Upper Cabinets & Walls" },
      { name: "Warm Travertine", hex: "#DFD2BE", role: "Backsplash & Floor" },
      { name: "Blackened Iron", hex: "#222325", role: "Hardware & Fixtures" },
      { name: "Natural Beech", hex: "#D6BF9E", role: "Open Shelving" }
    ],
    recommendedFinish: "High-scrub anti-fungal kitchen acrylic enamel + PU sealed shelving",
    lightingTip: "Under-cabinet 4000K neutral task lights for food preparation clarity."
  },
  "KITCHEN_BOLD": {
    name: "Gourmet Bistro",
    concept: "Dramatic, confident culinary setting celebrating dark cabinetry and rich contrast.",
    colors: [
      { name: "Charcoal Olive", hex: "#353D32", role: "Kitchen Islands" },
      { name: "Matte Black", hex: "#1A1A1A", role: "Base Units" },
      { name: "Warm Ochre Clay", hex: "#C78C44", role: "Breakfast Nook" },
      { name: "Polished Concrete", hex: "#A8A59D", role: "Countertop Tone" },
      { name: "Pure Canvas", hex: "#F3EFEA", role: "Ceiling Plane" }
    ],
    recommendedFinish: "Polyurethane 2-pack pigmented cabinet coating with heat resistance",
    lightingTip: "Statement smoked glass pendant lighting over kitchen bar island."
  },
  "KITCHEN_CLASSIC": {
    name: "Artisan Spice",
    concept: "Warm cardamom, clove, and turmeric undertones celebrating Indian culinary tradition.",
    colors: [
      { name: "Warm Mustard", hex: "#CFA04E", role: "Pantry Accent" },
      { name: "Earthy Terracotta", hex: "#AC5435", role: "Feature Arch" },
      { name: "Oiled Walnut", hex: "#4C3322", role: "Breakfast Bar Wood" },
      { name: "Milk Cream", hex: "#F5F0E6", role: "General Surfaces" },
      { name: "Aged Brass", hex: "#9F8043", role: "Pots & Tapware" }
    ],
    recommendedFinish: "Wipeable high-durability silk emulsion + Melamyne wood polish",
    lightingTip: "Dual circuit switching for bright prep mode versus warm dinner glow."
  },
  "KITCHEN_MODERN": {
    name: "Architectural Monolith",
    concept: "Seamless integrated appliances, hidden storage lines, and pure tonal discipline.",
    colors: [
      { name: "Smoky Titanium", hex: "#838383", role: "Handleless Cabinets" },
      { name: "Stark Matte Black", hex: "#1E1E1E", role: "Island Waterfall" },
      { name: "Chalk White", hex: "#F8F7F3", role: "Perimeter Walls" },
      { name: "Smoked Oak", hex: "#6D5E50", role: "Integrated Tall Units" },
      { name: "Graphite", hex: "#3E4042", role: "Appliance Fascias" }
    ],
    recommendedFinish: "Fingerprint-resistant matte PU lacquer with ceramic-infused wall paint",
    lightingTip: "Continuous flush ceiling line diffusers with CRI 95 daylight LEDs."
  },
  "EXTERIOR_CALM": {
    name: "Verdant Villa Oasis",
    concept: "Earthy tones that blend gracefully with Bangalore rain trees and tropical gardens.",
    colors: [
      { name: "Weathered Granite", hex: "#BBB3A5", role: "Main Facade" },
      { name: "Muted Olive", hex: "#6B7563", role: "Balcony Fascia" },
      { name: "Off-White Plaster", hex: "#EAE6DE", role: "Window Bands" },
      { name: "Charcoal Slate", hex: "#3B3D3F", role: "Compound Walls & Gates" },
      { name: "Teak Stain", hex: "#7C5234", role: "Exterior Wood Cladding" }
    ],
    recommendedFinish: "Silicone-modified elastomeric waterproof coating with anti-algae shield",
    lightingTip: "Waterproof IP65 warm exterior up-down wall grazing sconces."
  },
  "EXTERIOR_BOLD": {
    name: "Sculptural Contemporary",
    concept: "High-contrast architectural massing creating striking modern street presence.",
    colors: [
      { name: "Anthracite Basalt", hex: "#2E3033", role: "Cantilevered Volumes" },
      { name: "Crisp Architectural White", hex: "#F4F3EE", role: "Main Massing" },
      { name: "Raw Corten Rust", hex: "#9E4828", role: "Screening Feature" },
      { name: "Concrete Grey", hex: "#96948E", role: "Boundary & Plinth" },
      { name: "Warm Amber Glow", hex: "#E8A34E", role: "Recessed Soffit Accents" }
    ],
    recommendedFinish: "Heavy-duty exterior texture coat with dirt-shedding nanotech surface",
    lightingTip: "Linear LED strip concealed under cantilever overhangs."
  },
  "EXTERIOR_CLASSIC": {
    name: "Heritage Verandah",
    concept: "Traditional Karnataka residential charm with red roof tiles, white pillars, and wood.",
    colors: [
      { name: "Heritage Ivory", hex: "#F0E9DC", role: "Pillars & Main Walls" },
      { name: "Mangalore Terracotta", hex: "#A84E30", role: "Gables & Cornices" },
      { name: "Forest Green", hex: "#3E5743", role: "Window Shutters" },
      { name: "Teak Brown", hex: "#523720", role: "Rafters & Ceiling Slat" },
      { name: "Dark Stone", hex: "#43403B", role: "Plinth Foundation" }
    ],
    recommendedFinish: "All-weather anti-fungal exterior emulsion with UV fade protection",
    lightingTip: "Hanging brass lantern pendants along the wrap-around verandah."
  },
  "EXTERIOR_MODERN": {
    name: "Linear Geometry",
    concept: "Sophisticated neutral grey and sandstone monolith with integrated landscape illumination.",
    colors: [
      { name: "Sandstone Beige", hex: "#D2C5B0", role: "Primary Plastered Skin" },
      { name: "Flint Grey", hex: "#72716E", role: "Vertical Fins" },
      { name: "Bright Studio White", hex: "#FFFFFF", role: "Ceiling Overhangs" },
      { name: "Deep Bronze Metal", hex: "#3D352B", role: "Window Frame Profiles" },
      { name: "Limestone Dust", hex: "#E5E1D6", role: "Driveway Curb Walls" }
    ],
    recommendedFinish: "Stone-finish acrylic exterior spray texture with waterproof top sealer",
    lightingTip: "Low-voltage ground in-grade lights uplighting architectural facade trees."
  }
};
