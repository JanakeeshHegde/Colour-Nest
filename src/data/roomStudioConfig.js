/**
 * COLOUR NEST - Room Studio Configuration & Design Data Store
 * Defines the independent surface schema, PBR material parameters,
 * curated palettes, lighting presets, and enquiry generation helpers.
 */

// Fixed Brand Identity Palette
export const BRAND_PALETTE = {
  indigo: '#3C2D8C',
  gold: '#E3D9A4',
  ivory: '#FAF8F2',
  ink: '#211D2D'
};

// 1. Room Types (Only fully implemented high-quality architectural spaces)
export const ROOM_TYPES = {
  LIVING: {
    id: 'LIVING',
    name: 'Living Pavilion',
    badge: 'LIVING ROOM',
    subtitle: 'Contemporary residential pavilion with acoustic timber slats, floating credenza & designer lounge seating',
    serviceCategory: 'Turnkey Residential Interiors'
  },
  BEDROOM: {
    id: 'BEDROOM',
    name: 'Master Suite',
    badge: 'BEDROOM',
    subtitle: 'Serene Japandi master suite with integrated acoustic timber headboard, platform bed & pendant lighting',
    serviceCategory: 'Bespoke Bedroom Finishing'
  }
};

// 2. Wall Finishes / Material Types
export const WALL_FINISH_TYPES = {
  paint: {
    id: 'paint',
    name: 'Smooth Luxury Emulsion',
    category: 'PAINT',
    roughness: 0.85,
    normalScale: 0.35,
    sheen: 0.05,
    description: 'High-scrub luxury interior silk emulsion with velvety light diffusion'
  },
  stucco: {
    id: 'stucco',
    name: 'Italian Venetian Stucco',
    category: 'TEXTURE',
    roughness: 0.52,
    normalScale: 1.1,
    sheen: 0.3,
    description: 'Authentic hand-burnished lime & marble plaster with translucent mineral depth'
  },
  anticco: {
    id: 'anticco',
    name: 'Anticco Stone Texture',
    category: 'TEXTURE',
    roughness: 0.82,
    normalScale: 1.8,
    sheen: 0.0,
    description: 'Rustic aged limestone and mineral aggregate reminiscent of Mediterranean stone'
  },
  wallpaper: {
    id: 'wallpaper',
    name: 'Architectural Wallcovering',
    category: 'WALLPAPER',
    roughness: 0.78,
    normalScale: 0.7,
    sheen: 0.1,
    description: 'Textured textile wallcovering aligned with plumb-line seam precision'
  }
};

// 3. Wall Colors Grouped by Tone (Curated first 2 in each category, expandable with VIEW ALL)
export const WALL_COLOR_CATEGORIES = {
  NEUTRAL: {
    id: 'NEUTRAL',
    label: 'Neutral',
    colors: [
      { id: 'ivory', name: 'Warm Ivory', hex: '#FAF8F2', service: 'Royals Play / Luxury Silk', isCurated: true },
      { id: 'sand', name: 'Soft Sand', hex: '#D6C7A1', service: 'Anticco Aged Stone', isCurated: true },
      { id: 'alabaster', name: 'Alabaster White', hex: '#F5EFEB', service: 'High-Scrub Matte', isCurated: false },
      { id: 'greige', name: 'Warm Greige', hex: '#D8D2C7', service: 'Silk Mineral Emulsion', isCurated: false }
    ]
  },
  WARM: {
    id: 'WARM',
    label: 'Warm',
    colors: [
      { id: 'clay', name: 'Terracotta Clay', hex: '#B85C38', service: 'Italian Venetian Stucco', isCurated: true },
      { id: 'ochre', name: 'Raw Ochre', hex: '#C28A4B', service: 'Artisan Texture', isCurated: true },
      { id: 'amber', name: 'Warm Amber', hex: '#C99E64', service: 'Velvet Mineral Glaze', isCurated: false },
      { id: 'rose', name: 'Desert Bloom', hex: '#C4846E', service: 'Designer Matte Paint', isCurated: false }
    ]
  },
  COOL: {
    id: 'COOL',
    label: 'Cool',
    colors: [
      { id: 'sage', name: 'Muted Sage', hex: '#7A8B7B', service: 'Velvet Mineral Plaster', isCurated: true },
      { id: 'celadon', name: 'Celadon Glaze', hex: '#97ABA0', service: 'Artisan Lime Wash', isCurated: true },
      { id: 'nordic', name: 'Nordic Mist', hex: '#8FA4A6', service: 'Luxury Silk Emulsion', isCurated: false },
      { id: 'slate', name: 'Slate Dusk', hex: '#5B6673', service: 'Deep Mineral Coating', isCurated: false }
    ]
  },
  EARTH: {
    id: 'EARTH',
    label: 'Earth',
    colors: [
      { id: 'indigo', name: 'Deep Indigo', hex: '#3C2D8C', service: 'Designer Metallic Glaze', isCurated: true },
      { id: 'charcoal', name: 'Architectural Charcoal', hex: '#2B2D2F', service: 'Matte Charcoal Finish', isCurated: true },
      { id: 'espresso', name: 'Espresso Earth', hex: '#3A2E2B', service: 'Burnished Mineral Plaster', isCurated: false },
      { id: 'forest', name: 'Deep Forest', hex: '#2C3B30', service: 'Luxury Architectural Velvet', isCurated: false }
    ]
  }
};

// Flattened dictionary of all wall colors for quick lookup
export const WALL_COLORS = Object.values(WALL_COLOR_CATEGORIES).reduce((acc, cat) => {
  cat.colors.forEach((c) => {
    acc[c.id] = {
      ...c,
      category: cat.id,
      roughness: c.id === 'clay' ? 0.65 : c.id === 'indigo' ? 0.72 : 0.85
    };
  });
  return acc;
}, {});

// 4. Floor Material Presets
export const FLOOR_PRESETS = {
  wood: {
    id: 'wood',
    name: 'European White Oak',
    color: '#BCA17E',
    roughness: 0.38,
    materialType: 'wood',
    service: 'Engineered Hardwood Planks with UV Matte Seal',
    description: 'Wide architectural timber planks displaying organic grain and warm tactile comfort.'
  },
  stone: {
    id: 'stone',
    name: 'Carrara Limestone',
    color: '#D9D5CD',
    roughness: 0.22,
    materialType: 'stone',
    service: 'Honed Large-Format Limestone Tile',
    description: 'Fine-grained honed natural stone reflecting gentle floor highlights.'
  },
  walnut: {
    id: 'walnut',
    name: 'Smoked Deep Walnut',
    color: '#4E3626',
    roughness: 0.28,
    materialType: 'wood',
    service: 'Premium Smoked Hardwood Polish',
    description: 'Dark saturated hardwood planks reflecting deep lounge luxury.'
  },
  concrete: {
    id: 'concrete',
    name: 'Burnished Micro-Cement',
    color: '#8F9194',
    roughness: 0.45,
    materialType: 'concrete',
    service: 'Seamless Architectural Micro-Topping',
    description: 'Monolithic industrial finish with subtle artisan trowel marks.'
  }
};

// 5. Wood Finish Presets (Fluted Wall & Credenza)
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

// 6. Ceiling Colors & Finishes
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
  }
};

// 7. Ceiling Architectural Variants
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

// 8. Three Real Physical Lighting Moods (Soft Daylight, Balanced, Warm Evening)
export const LIGHTING_PRESETS = {
  'SOFT DAYLIGHT': {
    id: 'SOFT DAYLIGHT',
    name: 'Soft Daylight',
    temp: '5500K Natural',
    description: 'Crisp morning daylight pouring through the floor-to-ceiling window, illuminating wall textures with high-CRI clarity.',
    ambientColor: '#E8F0FA',
    ambientIntensity: 0.95,
    sunColor: '#FFF8EC',
    sunIntensity: 2.1,
    sunPos: [-11, 7, 4],
    coveIntensity: 0.35,
    skyColor: '#DCE8F5',
    pointFillIntensity: 0.65
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
    coveIntensity: 0.85,
    skyColor: '#E8F3FF',
    pointFillIntensity: 0.95
  },
  'WARM EVENING': {
    id: 'WARM EVENING',
    name: 'Warm Evening',
    temp: '2700K Golden Sunset',
    description: 'Warm golden sunset rays grazing the feature wall and floor, paired with dramatic 2700K false ceiling cove glow.',
    ambientColor: '#F7DFD0',
    ambientIntensity: 0.75,
    sunColor: '#FFAE64',
    sunIntensity: 2.2,
    sunPos: [-12, 3.8, 6],
    coveIntensity: 1.9,
    skyColor: '#EAA478',
    pointFillIntensity: 1.25
  }
};

// 9. Configurable Surfaces Schema for 3D Raycasting & State Mapping
export const CONFIGURABLE_SURFACES = [
  {
    id: 'wall-main',
    name: 'Main Wall',
    category: 'WALLS',
    tag: 'Back Wall (Left Section)',
    desc: 'Primary architectural wall finish framing the room composition'
  },
  {
    id: 'wall-feature',
    name: 'Feature Accent Wall',
    category: 'WALLS',
    tag: 'Back Wall (Center Section)',
    desc: 'Artisan Venetian Stucco / Textured Statement Wall behind furniture'
  },
  {
    id: 'wall-left',
    name: 'Left Wall (Window Flank)',
    category: 'WALLS',
    tag: 'Window Surround',
    desc: 'Natural daylight-receiving wall framing the floor-to-ceiling glass window'
  },
  {
    id: 'wall-right',
    name: 'Right Wall (Entrance Doorway)',
    category: 'WALLS',
    tag: 'Entrance Wall',
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
    tag: 'Acoustic Fluted Wall',
    desc: 'Architectural vertical fluted timber slats with PU satin finish'
  },
  {
    id: 'cabinet-main',
    name: 'Bespoke Media Credenza',
    category: 'WOOD',
    tag: 'Living Credenza / Joinery',
    desc: 'Floating teak credenza with bevelled profiles and brass plinth accents'
  }
];

// 10. Default Independent Surface State Schema
export const DEFAULT_SURFACES_STATE = {
  'wall-main': {
    material: 'paint',
    finishType: 'paint',
    colorKey: 'ivory',
    color: '#FAF8F2',
    name: 'Warm Ivory',
    finish: 'Royals Play / Luxury Silk Emulsion',
    roughness: 0.85
  },
  'wall-feature': {
    material: 'stucco',
    finishType: 'stucco',
    colorKey: 'indigo',
    color: '#3C2D8C',
    name: 'Deep Indigo',
    finish: 'Italian Venetian Stucco Texture',
    roughness: 0.52
  },
  'wall-left': {
    material: 'paint',
    finishType: 'paint',
    colorKey: 'ivory',
    color: '#FAF8F2',
    name: 'Warm Ivory',
    finish: 'Luxury Emulsion (Silk Finish)',
    roughness: 0.85
  },
  'wall-right': {
    material: 'paint',
    finishType: 'paint',
    colorKey: 'ivory',
    color: '#FAF8F2',
    name: 'Warm Ivory',
    finish: 'Smooth Silk Emulsion',
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

// 11. Default Room Configuration Object
export const DEFAULT_ROOM_CONFIG = {
  roomType: 'LIVING',
  surfaces: { ...DEFAULT_SURFACES_STATE },
  lighting: 'BALANCED'
};

// 12. Helper to Build Human-Readable Design Summary for Enquiry & WhatsApp
export function generateDesignEnquiryText(config) {
  const room = ROOM_TYPES[config.roomType] || ROOM_TYPES.LIVING;
  const surfaces = config.surfaces || DEFAULT_SURFACES_STATE;
  const light = LIGHTING_PRESETS[config.lighting] || LIGHTING_PRESETS.BALANCED;

  const lines = [
    `*COLOUR NEST — 3D INTERIOR DESIGN SPECIFICATION*`,
    `----------------------------------------`,
    `• *Space Type:* ${room.name} (${room.serviceCategory})`,
    `• *Main Walls:* ${surfaces['wall-main']?.name || 'Warm Ivory'} (${surfaces['wall-main']?.color || '#FAF8F2'}) [${surfaces['wall-main']?.finish || 'Silk Emulsion'}]`,
    `• *Feature Accent Wall:* ${surfaces['wall-feature']?.name || 'Deep Indigo'} (${surfaces['wall-feature']?.color || '#3C2D8C'}) [${surfaces['wall-feature']?.finish || 'Venetian Stucco'}]`,
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

// 13. Helper to Build WhatsApp URL
export function getWhatsAppEnquiryUrl(config) {
  const message = generateDesignEnquiryText(config);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/918494950088?text=${encoded}`;
}

// 14. Helper to Build Mailto URL
export function getMailtoEnquiryUrl(config) {
  const room = ROOM_TYPES[config.roomType] || ROOM_TYPES.LIVING;
  const message = generateDesignEnquiryText(config);
  const subject = encodeURIComponent(`Design Quotation Request: ${room.name} — Colour Nest`);
  const body = encodeURIComponent(message);
  return `mailto:info.colournest@gmail.com?subject=${subject}&body=${body}`;
}
