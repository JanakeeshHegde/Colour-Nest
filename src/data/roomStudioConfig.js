/**
 * COLOUR NEST - Room Studio Configuration & Design Data Store
 * Defines the independent surface schema, PBR material parameters,
 * lighting presets, and enquiry generation helpers.
 */

// Fixed Brand Identity Palette
export const BRAND_PALETTE = {
  indigo: '#3C2D8C',
  gold: '#E3D9A4',
  ivory: '#FAF8F2',
  ink: '#211D2D'
};

// 1. Room Types
export const ROOM_TYPES = {
  LIVING: {
    id: 'LIVING',
    name: 'Living Pavilion',
    subtitle: 'Sculpted contemporary living room with fluted timber, credenza, lounge seating & architectural doorway',
    serviceCategory: 'Turnkey Residential Interiors'
  },
  BEDROOM: {
    id: 'BEDROOM',
    name: 'Master Suite',
    subtitle: 'Serene Japandi bedroom with acoustic timber headboard, floating nightstands & pendant lighting',
    serviceCategory: 'Bespoke Bedroom Finishing'
  },
  KITCHEN: {
    id: 'KITCHEN',
    name: 'Culinary Studio',
    subtitle: 'Architectural kitchen with waterfall island, brass counter stools & fluted storage',
    serviceCategory: 'Custom Kitchen Interiors'
  },
  COMMERCIAL: {
    id: 'COMMERCIAL',
    name: 'Executive Boardroom',
    subtitle: 'Contemporary collaborative meeting space with acoustic paneling & presentation display wall',
    serviceCategory: 'Commercial & Office Interiors'
  }
};

// 2. Wall Colors (Specific requirements: Warm Ivory, Soft Sand, Muted Sage, Clay, Deep Indigo, Charcoal + Custom)
export const WALL_COLORS = {
  ivory: {
    id: 'ivory',
    name: 'Warm Ivory',
    hex: '#FAF8F2',
    roughness: 0.85,
    metalness: 0.0,
    bumpScale: 0.03,
    service: 'Royals Play / Luxury Silk Emulsion',
    description: 'Soft mineral warmth that reflects gentle ambient illumination with velvety depth.'
  },
  sand: {
    id: 'sand',
    name: 'Soft Sand',
    hex: '#D6C7A1',
    roughness: 0.8,
    metalness: 0.0,
    bumpScale: 0.035,
    service: 'Anticco Aged Stone Plaster',
    description: 'Earthy golden-sand undertones evoking Mediterranean travertine and aged limestone.'
  },
  sage: {
    id: 'sage',
    name: 'Muted Sage',
    hex: '#7A8B7B',
    roughness: 0.82,
    metalness: 0.0,
    bumpScale: 0.03,
    service: 'Velvet Mineral Plaster',
    description: 'Tranquil botanical green that creates biophilic serenity and sensory quietude.'
  },
  clay: {
    id: 'clay',
    name: 'Terracotta Clay',
    hex: '#B85C38',
    roughness: 0.78,
    metalness: 0.02,
    bumpScale: 0.04,
    service: 'Italian Venetian Stucco Texture',
    description: 'Rich, sun-baked clay earth pigment troweled with authentic artisanal striations.'
  },
  indigo: {
    id: 'indigo',
    name: 'Deep Indigo',
    hex: '#3C2D8C',
    roughness: 0.75,
    metalness: 0.03,
    bumpScale: 0.035,
    service: 'Designer Metallic Glaze & Accent Emulsion',
    description: 'Our signature COLOUR NEST deep indigo evoking regal architectural dusk.'
  },
  charcoal: {
    id: 'charcoal',
    name: 'Architectural Charcoal',
    hex: '#2B2D2F',
    roughness: 0.7,
    metalness: 0.05,
    bumpScale: 0.025,
    service: 'High-Scrub Architectural Matte Finish',
    description: 'Dramatic moody slate providing deep tonal contrast behind art and timber joinery.'
  }
};

// 3. Floor Material Presets
export const FLOOR_PRESETS = {
  stone: {
    id: 'stone',
    name: 'Carrara Limestone',
    color: '#D9D5CD',
    roughness: 0.22,
    metalness: 0.06,
    materialType: 'stone',
    service: 'Honed Large-Format Limestone Tile',
    description: 'Fine-grained honed natural stone reflecting gentle floor highlights.'
  },
  wood: {
    id: 'wood',
    name: 'European White Oak',
    color: '#BCA17E',
    roughness: 0.38,
    metalness: 0.0,
    materialType: 'wood',
    service: 'Engineered Hardwood Planks with Matte UV Seal',
    description: 'Wide architectural timber planks displaying organic grain and warm tactile comfort.'
  },
  concrete: {
    id: 'concrete',
    name: 'Burnished Micro-Cement',
    color: '#8F9194',
    roughness: 0.45,
    metalness: 0.04,
    materialType: 'concrete',
    service: 'Seamless Architectural Micro-Topping',
    description: 'Monolithic industrial finish with subtle artisan trowel marks and satin sealer.'
  },
  walnut: {
    id: 'walnut',
    name: 'Smoked Teak & Walnut',
    color: '#4E3626',
    roughness: 0.28,
    metalness: 0.02,
    materialType: 'wood',
    service: 'Premium Smoked Hardwood Polish',
    description: 'Dark, saturated hardwood reflecting luxury lounge warmth.'
  }
};

// 4. Wood Finish Presets (Fluted Wall & Credenza)
export const WOOD_FINISHES = {
  natural: {
    id: 'natural',
    name: 'Natural Ash & Teak',
    color: '#C8A375',
    roughness: 0.45,
    tone: 'natural',
    service: 'Wood Polish (PU Satin Natural)',
    description: 'Scandinavian-inspired pale timber preserving raw grain transparency.'
  },
  warm: {
    id: 'warm',
    name: 'Warm Honey Teak',
    color: '#A65E32',
    roughness: 0.35,
    tone: 'warm',
    service: 'Wood Polish (Melamyne & PU Satin)',
    description: 'Golden seasoned Indian teakwood highlighting natural grain figuring.'
  },
  dark: {
    id: 'dark',
    name: 'Smoked Deep Walnut',
    color: '#3E2919',
    roughness: 0.3,
    tone: 'dark',
    service: 'Premium Wood Polish (PU Matte Dark)',
    description: 'Rich espresso tone engineered for sophisticated modern contrast.'
  },
  polished: {
    id: 'polished',
    name: 'Mirror PU Polycoat',
    color: '#5C341E',
    roughness: 0.12,
    tone: 'polished',
    service: 'High-Gloss PU Polycoat Crystal Clear',
    description: 'Showroom-grade piano crystal coat offering deep light reflections.'
  }
};

// 5. Ceiling Colors & Finishes
export const CEILING_COLORS = {
  white: {
    id: 'white',
    name: 'Pure Plaster White',
    hex: '#FAF8F5',
    roughness: 0.9,
    description: 'High light-reflectance gypsum plaster ceiling coating.'
  },
  alabaster: {
    id: 'alabaster',
    name: 'Warm Alabaster',
    hex: '#F4EFE6',
    roughness: 0.88,
    description: 'Subtle ivory ceiling tone that softens direct overhead bounce.'
  },
  greige: {
    id: 'greige',
    name: 'Soft Greige',
    hex: '#E3DFD5',
    roughness: 0.85,
    description: 'Architectural muted mineral ceiling finish creating intimate height.'
  },
  indigo: {
    id: 'indigo',
    name: 'Deep Indigo Vault',
    hex: '#3C2D8C',
    roughness: 0.78,
    description: 'Dramatic architectural jewel-box ceiling accent.'
  }
};

// 6. Ceiling Architectural Variants
export const CEILING_STYLES = {
  LAYERED: {
    id: 'LAYERED',
    name: 'Dropped Gypsum Cove',
    description: 'Stepped false ceiling island concealing 3000K warm indirect cove LED grazing.'
  },
  LINEAR: {
    id: 'LINEAR',
    name: 'Recessed Linear Track',
    description: 'Architectural black low-glare magnetic track lights with directional spots.'
  },
  'LIGHT-FEATURE': {
    id: 'LIGHT-FEATURE',
    name: 'Brushed Gold Halo Chandelier',
    description: 'Suspended sculptural brass torus luminaire providing ambient center glow.'
  }
};

// 7. Three Functional Room Lighting Presets (Requirement: Soft Daylight, Balanced, Warm Evening)
export const LIGHTING_PRESETS = {
  'SOFT DAYLIGHT': {
    id: 'SOFT DAYLIGHT',
    name: 'Soft Daylight',
    temp: '5500K Natural',
    description: 'Crisp morning daylight pouring through the floor-to-ceiling window, illuminating wall textures with high-CRI clarity.',
    ambientColor: '#E8F0FA',
    ambientIntensity: 0.9,
    sunColor: '#FFF8EC',
    sunIntensity: 2.1,
    sunPos: [-11, 7, 4],
    coveIntensity: 0.3,
    skyColor: '#DCE8F5',
    pointFillIntensity: 0.6
  },
  BALANCED: {
    id: 'BALANCED',
    name: 'Balanced',
    temp: '4000K Architectural',
    description: 'Harmonious midday daylight balanced with soft interior downlights and stepped false ceiling cove illumination.',
    ambientColor: '#FFFFFF',
    ambientIntensity: 1.1,
    sunColor: '#FFFDF7',
    sunIntensity: 2.3,
    sunPos: [-9, 8.5, 2],
    coveIntensity: 0.8,
    skyColor: '#E8F3FF',
    pointFillIntensity: 0.9
  },
  'WARM EVENING': {
    id: 'WARM EVENING',
    name: 'Warm Evening',
    temp: '2700K Sunset Golden Hour',
    description: 'Warm golden sunset rays grazing the feature wall and floor, paired with dramatic 2700K false ceiling cove glow.',
    ambientColor: '#F7DFD0',
    ambientIntensity: 0.7,
    sunColor: '#FFAE64',
    sunIntensity: 2.2,
    sunPos: [-12, 3.8, 6],
    coveIntensity: 1.8,
    skyColor: '#EAA478',
    pointFillIntensity: 1.2
  }
};

// 8. Surface Definitions for 3D Raycasting & State Mapping
export const CONFIGURABLE_SURFACES = [
  {
    id: 'wall-main',
    name: 'Main Wall',
    category: 'WALLS',
    tag: 'Back Wall (Left Section)',
    desc: 'Primary architectural wall finish framing the living room composition'
  },
  {
    id: 'wall-feature',
    name: 'Feature Accent Wall',
    category: 'WALLS',
    tag: 'Back Wall (Center Section)',
    desc: 'Artisan Venetian Stucco / Textured Statement Wall behind credenza'
  },
  {
    id: 'wall-left',
    name: 'Left Wall (Window Flank)',
    category: 'WALLS',
    tag: 'Left Architectural Jambs',
    desc: 'Natural daylight-receiving wall framing the floor-to-ceiling glass window'
  },
  {
    id: 'wall-right',
    name: 'Right Wall (Entrance Doorway)',
    category: 'WALLS',
    tag: 'Right Wall with Doorway Reveal',
    desc: 'Architectural wall containing the residential entrance doorway and niche'
  },
  {
    id: 'floor-main',
    name: 'Floor Surface',
    category: 'FLOOR',
    tag: 'Ground Plane',
    desc: 'Honed limestone, micro-cement, or European oak hardwood flooring'
  },
  {
    id: 'ceiling-main',
    name: 'Ceiling Architecture',
    category: 'CEILING',
    tag: 'False Ceiling & Cove',
    desc: 'Stepped gypsum ceiling island with concealed cove lighting'
  },
  {
    id: 'wood-panel',
    name: 'Timber Slat Paneling',
    category: 'WOOD',
    tag: 'Acoustic Fluted Wall (Right 35%)',
    desc: 'Architectural vertical fluted timber slats with PU satin finish'
  },
  {
    id: 'cabinet-main',
    name: 'Bespoke Media Credenza',
    category: 'WOOD',
    tag: 'Living Credenza & Shelving',
    desc: 'Floating teak credenza with bevelled profiles and brass plinth accents'
  }
];

// 9. Default Independent Surface State Schema
export const DEFAULT_SURFACES_STATE = {
  'wall-main': {
    material: 'paint',
    colorKey: 'ivory',
    color: '#FAF8F2',
    name: 'Warm Ivory',
    finish: 'Royals Play / Luxury Silk Emulsion',
    roughness: 0.85
  },
  'wall-feature': {
    material: 'paint',
    colorKey: 'indigo',
    color: '#3C2D8C',
    name: 'Deep Indigo',
    finish: 'Designer Metallic Glaze / Venetian Stucco',
    roughness: 0.75
  },
  'wall-left': {
    material: 'paint',
    colorKey: 'ivory',
    color: '#FAF8F2',
    name: 'Warm Ivory',
    finish: 'Luxury Emulsion (Silk Finish)',
    roughness: 0.85
  },
  'wall-right': {
    material: 'paint',
    colorKey: 'ivory',
    color: '#FAF8F2',
    name: 'Warm Ivory',
    finish: 'Anticco Plaster / Mineral Emulsion',
    roughness: 0.85
  },
  'floor-main': {
    material: 'stone',
    preset: 'stone',
    color: '#D9D5CD',
    name: 'Carrara Limestone',
    finish: 'Honed Natural Limestone',
    roughness: 0.22
  },
  'ceiling-main': {
    material: 'paint',
    colorKey: 'white',
    color: '#FAF8F5',
    name: 'Pure Plaster White',
    finish: 'Seamless Gypsum Plaster',
    stylePreset: 'LAYERED',
    roughness: 0.9
  },
  'wood-panel': {
    material: 'wood',
    preset: 'warm',
    color: '#A65E32',
    name: 'Warm Honey Teak',
    finish: 'PU Satin Clearcoat',
    roughness: 0.35
  },
  'cabinet-main': {
    material: 'wood',
    preset: 'warm',
    color: '#A65E32',
    name: 'Warm Honey Teak',
    finish: 'Hand-Rubbed Melamyne & PU Satin',
    roughness: 0.35
  }
};

// 10. Default Room Configuration Object
export const DEFAULT_ROOM_CONFIG = {
  roomType: 'LIVING',
  surfaces: { ...DEFAULT_SURFACES_STATE },
  lighting: 'BALANCED'
};

// 11. Helper to Build Human-Readable Design Summary for Enquiry & WhatsApp
export function generateDesignEnquiryText(config) {
  const room = ROOM_TYPES[config.roomType] || ROOM_TYPES.LIVING;
  const surfaces = config.surfaces || DEFAULT_SURFACES_STATE;
  const light = LIGHTING_PRESETS[config.lighting] || LIGHTING_PRESETS.BALANCED;

  const lines = [
    `*COLOUR NEST — 3D INTERIOR DESIGN SPECIFICATION*`,
    `----------------------------------------`,
    `• *Space Type:* ${room.name} (${room.serviceCategory})`,
    `• *Main Walls:* ${surfaces['wall-main']?.name || 'Warm Ivory'} (${surfaces['wall-main']?.color || '#FAF8F2'})`,
    `• *Feature Accent Wall:* ${surfaces['wall-feature']?.name || 'Deep Indigo'} (${surfaces['wall-feature']?.color || '#3C2D8C'})`,
    `• *Window Flank Wall:* ${surfaces['wall-left']?.name || 'Warm Ivory'} (${surfaces['wall-left']?.color || '#FAF8F2'})`,
    `• *Entrance Wall:* ${surfaces['wall-right']?.name || 'Warm Ivory'} (${surfaces['wall-right']?.color || '#FAF8F2'})`,
    `• *Floor Finish:* ${surfaces['floor-main']?.name || 'Carrara Limestone'} (${surfaces['floor-main']?.finish || 'Honed Limestone'})`,
    `• *Ceiling Architecture:* ${surfaces['ceiling-main']?.name || 'Pure Plaster White'} [Style: ${surfaces['ceiling-main']?.stylePreset || 'LAYERED Cove'}]`,
    `• *Acoustic Timber Slats:* ${surfaces['wood-panel']?.name || 'Warm Honey Teak'}`,
    `• *Living Cabinetry:* ${surfaces['cabinet-main']?.name || 'Warm Honey Teak'}`,
    `• *Lighting Mood:* ${light.name} (${light.temp})`,
    `----------------------------------------`,
    `Generated via COLOUR NEST 3D Space Studio (Jayanagar, Bangalore).`,
    `I would like to request an architectural site inspection and material quotation for this design.`
  ];

  return lines.join('\n');
}

// 12. Helper to Build WhatsApp URL
export function getWhatsAppEnquiryUrl(config) {
  const message = generateDesignEnquiryText(config);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/918494950088?text=${encoded}`;
}

// 13. Helper to Build Mailto URL
export function getMailtoEnquiryUrl(config) {
  const room = ROOM_TYPES[config.roomType] || ROOM_TYPES.LIVING;
  const message = generateDesignEnquiryText(config);
  const subject = encodeURIComponent(`Design Quotation Request: ${room.name} — Colour Nest`);
  const body = encodeURIComponent(message);
  return `mailto:info.colournest@gmail.com?subject=${subject}&body=${body}`;
}
