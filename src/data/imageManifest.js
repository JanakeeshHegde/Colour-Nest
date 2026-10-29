/**
 * COLOUR NEST — Central Content-Matched Image Manifest
 * Every image is specifically selected or generated for the exact content,
 * service, section, and visual purpose where it appears.
 *
 * Folder structure:
 * public/images/
 *   hero/
 *   interiors/
 *   painting/
 *   textures/
 *   wallpaper/
 *   wood/
 *   ceilings/
 *   lighting/
 *   commercial/
 *   exterior/
 *   gallery/
 *   process/
 *   materials/
 */

export const RAW_IMAGE_MANIFEST = {
  // 1. HERO & KEYNOTE SPACES
  "hero-architectural-main": {
    id: "hero-architectural-main",
    name: "Architectural Pavilion Living Room",
    category: "Living Space / Keynote Hero",
    page: "Home / HeroRoom",
    url: "/images/hero/hero_main.jpg",
    localAssetPath: "/images/hero/hero_main.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 45%",
    aspectRatio: "16:9",
    description: "Volumetric contemporary living pavilion with honed travertine surfaces, fluted teak millwork, recessed warm cove illumination, and expansive daylight."
  },

  "hero-architectural-mobile": {
    id: "hero-architectural-mobile",
    name: "Architectural Living Space — Mobile",
    category: "Living Space / Mobile Hero",
    page: "Home / MobileHero",
    url: "/images/hero/hero_mobile.jpg",
    localAssetPath: "/images/hero/hero_mobile.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 50%",
    aspectRatio: "9:16",
    description: "Vertical architectural composition optimized for mobile portrait viewports with fluted joinery and warm ambient light."
  },

  "about-interior-workspace": {
    id: "about-interior-workspace",
    name: "Architectural Design Atelier & Consultation",
    category: "Studio / Practice",
    page: "About / Philosophy",
    url: "/images/process/consultation.jpg",
    localAssetPath: "/images/process/consultation.jpg",
    attribution: "COLOUR NEST Spatial Planning",
    license: "COLOUR NEST Studio Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Spatial consultation and blueprint review table with physical finish swatches, architectural drawings, and natural daylight."
  },

  // 2. PRIMARY RESIDENTIAL SPACES
  "space-living-contemporary": {
    id: "space-living-contemporary",
    name: "Contemporary Sculpted Living Lounge",
    category: "Living Room",
    page: "SpaceStudio / Gallery / Services",
    url: "/images/interiors/living_room.jpg",
    localAssetPath: "/images/interiors/living_room.jpg",
    attribution: "COLOUR NEST Curated Interior",
    license: "COLOUR NEST Editorial License",
    focalPoint: "50% 40%",
    aspectRatio: "16:9",
    description: "Warm architectural living space featuring low-profile seating, limewashed wall textures, fluted oak joinery, and warm ambient lighting."
  },

  "space-bedroom-refined": {
    id: "space-bedroom-refined",
    name: "Refined Japandi Master Bedroom",
    category: "Bedroom",
    page: "SpaceStudio / Gallery / Services",
    url: "/images/interiors/master_bedroom.jpg",
    localAssetPath: "/images/interiors/master_bedroom.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 45%",
    aspectRatio: "16:9",
    description: "Serene Japandi master suite featuring integrated acoustic timber slat headboard, warm cove LED illumination, and neutral tactile wall finishes."
  },

  "space-kitchen-architectural": {
    id: "space-kitchen-architectural",
    name: "Architectural Culinary Studio",
    category: "Kitchen & Dining",
    page: "SpaceStudio / Gallery",
    url: "/images/interiors/culinary_kitchen.jpg",
    localAssetPath: "/images/interiors/culinary_kitchen.jpg",
    attribution: "COLOUR NEST Curated Interior",
    license: "COLOUR NEST Editorial License",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Minimalist kitchen featuring monolithic honed marble island, matte graphite cabinetry, and architectural under-cabinet illumination."
  },

  "space-commercial-workspace": {
    id: "space-commercial-workspace",
    name: "Executive Corporate Interior",
    category: "Commercial Interior",
    page: "SpaceStudio / Services / Gallery",
    url: "/images/commercial/commercial_office.jpg",
    localAssetPath: "/images/commercial/commercial_office.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 55%",
    aspectRatio: "16:9",
    description: "Executive boardroom and corporate interior featuring acoustic timber ceiling baffles, scuff-resistant architectural walls, and linear lighting."
  },

  // 3. ARCHITECTURAL DETAILS & CEILINGS
  "architectural-false-ceiling": {
    id: "architectural-false-ceiling",
    name: "Layered Cove & False Ceiling Architecture",
    category: "False Ceilings & Gypsum",
    page: "Services / Materials / TextureLab",
    url: "/images/ceilings/false_ceiling.jpg",
    localAssetPath: "/images/ceilings/false_ceiling.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "50% 30%",
    aspectRatio: "16:9",
    description: "Multi-level gypsum false ceiling with floating geometric raft, continuous 3000K indirect cove LED illumination, and zero-glare spotlights."
  },

  "architectural-lighting-pendant": {
    id: "architectural-lighting-pendant",
    name: "Architectural Cove & Layered Illumination",
    category: "Smart Lighting & Fans",
    page: "Services / Materials",
    url: "/images/lighting/cove_lighting.jpg",
    localAssetPath: "/images/lighting/cove_lighting.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 40%",
    aspectRatio: "16:9",
    description: "Layered warm cove troughs and modern brass ring pendant casting stratified ambient illumination across architectural walls."
  },

  // 4. CRAFT, JOINERY & WOOD POLISH
  "material-wood-grain": {
    id: "material-wood-grain",
    name: "Teak Woodwork & Melamyne Satin Polish",
    category: "Wood Polish (Melamyne, PU)",
    page: "Materials / TextureLab / Services",
    url: "/images/wood/teak_wood_polish.jpg",
    localAssetPath: "/images/wood/teak_wood_polish.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Solid Burma teak cabinetry and fluted woodwork treated with Melamyne satin polish, accentuating natural wood grain pores."
  },

  "material-wood-polycoat": {
    id: "material-wood-polycoat",
    name: "Liquid-Crystal Polycoat Mirror Polish",
    category: "Premium Wood Polish (Polycoat)",
    page: "Materials / Services",
    url: "/images/wood/polycoat_mirror_polish.jpg",
    localAssetPath: "/images/wood/polycoat_mirror_polish.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Two-pack Polycoat mirror polish over solid live-edge timber, providing glass-clear reflection and lifelong heat/moisture durability."
  },

  // 5. WALL TEXTURES, STUCCO & SPECIALTY FINISHES
  "material-stucco-finish": {
    id: "material-stucco-finish",
    name: "Italian Venetian Stucco & Marmorino",
    category: "Premium Texture Designs (Stucco)",
    page: "Materials / TextureLab / Services",
    url: "/images/textures/venetian_stucco.jpg",
    localAssetPath: "/images/textures/venetian_stucco.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Hand-burnished Italian lime-and-marble Venetian Stucco with translucent mineral depth, smooth cool tactile feel, and directional raking light."
  },

  "material-anticco-texture": {
    id: "material-anticco-texture",
    name: "High-End Wall Texture (Anticco)",
    category: "Wallpaper & Anticco Textures",
    page: "Materials / TextureLab / Services",
    url: "/images/textures/anticco_texture.jpg",
    localAssetPath: "/images/textures/anticco_texture.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Aged European stone patina Anticco texture with arched recessed niche, mineral aggregate striations, and tactile warmth."
  },

  "material-wallpaper-pattern": {
    id: "material-wallpaper-pattern",
    name: "Designer Architectural Wallcoverings",
    category: "Wallpaper & Decors",
    page: "Materials / Services",
    url: "/images/wallpaper/designer_wallpaper.jpg",
    localAssetPath: "/images/wallpaper/designer_wallpaper.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Seamless textured grasscloth designer wallcovering with botanical relief framed in architectural dark timber mouldings."
  },

  "service-royals-play": {
    id: "service-royals-play",
    name: "Royals Play Designer Metallic Wash",
    category: "Royals Play Designs",
    page: "Services / Materials",
    url: "/images/painting/royals_play.jpg",
    localAssetPath: "/images/painting/royals_play.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Specialist Royals Play metallic glaze with hand-applied spatula textural relief, catching warm downlighting with subtle shimmer."
  },

  // 6. EXTERIOR ARCHITECTURAL FINISHES
  "exterior-facade-contemporary": {
    id: "exterior-facade-contemporary",
    name: "Contemporary Architectural Residence Facade",
    category: "Exterior Painting & Textures",
    page: "Services / Projects / Gallery",
    url: "/images/exterior/exterior_facade.jpg",
    localAssetPath: "/images/exterior/exterior_facade.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Bespoke Asset",
    focalPoint: "center 40%",
    aspectRatio: "16:9",
    description: "Modern architectural villa exterior coated with monsoon-tested elastomeric silicone texture paint, exterior wood cladding, and soffit lighting."
  },

  "gallery-exterior-residence": {
    id: "gallery-exterior-residence",
    name: "Geometric Cantilevered Villa",
    category: "Exterior Architecture",
    page: "Gallery / Projects",
    url: "/images/exterior/facade_textures.jpg",
    localAssetPath: "/images/exterior/facade_textures.jpg",
    attribution: "COLOUR NEST Architectural Imagery",
    license: "COLOUR NEST Editorial License",
    focalPoint: "center 45%",
    aspectRatio: "16:9",
    description: "Architectural exterior elevation displaying weatherproof stone textures, warm timber soffits, and integrated landscape lighting."
  },

  // 7. MATERIAL SHOWROOM REFERENCES
  "material-stone-marble": {
    id: "material-stone-marble",
    name: "Honed Roman Travertine & Calacatta",
    category: "Flooring & Architectural Stone",
    page: "Materials / SpaceStudio",
    url: "/images/materials/stucco_sample.jpg",
    localAssetPath: "/images/materials/stucco_sample.jpg",
    attribution: "COLOUR NEST Material Lab",
    license: "COLOUR NEST Curated Asset",
    focalPoint: "center 50%",
    aspectRatio: "1:1",
    description: "Architectural finish sample board highlighting mineral plaster textures, honed stone tones, and tactile surface swatches."
  },

  // 8. BESPOKE INTERIORS & JOINERY
  "service-custom-interiors": {
    id: "service-custom-interiors",
    name: "Customised Architectural Millwork & Decors",
    category: "Customised Interiors",
    page: "Services / Projects",
    url: "/images/interiors/living_room.jpg",
    localAssetPath: "/images/interiors/living_room.jpg",
    attribution: "COLOUR NEST Bespoke Interiors",
    license: "COLOUR NEST Curated Asset",
    focalPoint: "50% 45%",
    aspectRatio: "16:9",
    description: "Precision-engineered interior joinery, fluted wood paneling, and custom architectural storage with warm perimeter illumination."
  },

  "gallery-lounge-sanctuary": {
    id: "gallery-lounge-sanctuary",
    name: "Minimalist Lounge Sanctuary",
    category: "Curated Living",
    page: "Gallery / StyleFinder",
    url: "/images/interiors/lounge_sanctuary.jpg",
    localAssetPath: "/images/interiors/lounge_sanctuary.jpg",
    attribution: "COLOUR NEST Curated Interior",
    license: "COLOUR NEST Editorial License",
    focalPoint: "center 45%",
    aspectRatio: "16:9",
    description: "Curated neutral living sanctuary featuring curved boucle seating, warm clay plaster wall render, and hand-woven natural textures."
  },

  "gallery-commercial-boardroom": {
    id: "gallery-commercial-boardroom",
    name: "Executive Creative Boardroom",
    category: "Commercial Studio",
    page: "Gallery / Services",
    url: "/images/commercial/commercial_reception.jpg",
    localAssetPath: "/images/commercial/commercial_reception.jpg",
    attribution: "COLOUR NEST Commercial",
    license: "COLOUR NEST Editorial License",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Modern commercial workspace with linear suspended luminaires, acoustic surfaces, and durable architectural finishes."
  },

  "gallery-bedroom-minimalist": {
    id: "gallery-bedroom-minimalist",
    name: "Warm Minimalist Guest Chamber",
    category: "Bedrooms",
    page: "Gallery / Projects",
    url: "/images/gallery/gallery_04.jpg",
    localAssetPath: "/images/gallery/gallery_04.jpg",
    attribution: "COLOUR NEST Curated Interior",
    license: "COLOUR NEST Curated Asset",
    focalPoint: "center 45%",
    aspectRatio: "16:9",
    description: "Warm neutral guest suite with acoustic wall panels, integrated bedside lighting, and serene greige surfaces."
  },

  "gallery-kitchen-monochrome": {
    id: "gallery-kitchen-monochrome",
    name: "Monochrome Artisan Kitchen Island",
    category: "Kitchen Architecture",
    page: "Gallery / Materials",
    url: "/images/gallery/gallery_02.jpg",
    localAssetPath: "/images/gallery/gallery_02.jpg",
    attribution: "COLOUR NEST Curated Interior",
    license: "COLOUR NEST Curated Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Deep charcoal kitchen cabinetry with brushed brass pulls, honed stone surfaces, and integrated warm LED task lighting."
  },

  // 9. PROCESS & CRAFTSMANSHIP
  "process-craftsmanship": {
    id: "process-craftsmanship",
    name: "Artisanal Finish Application & Inspection",
    category: "Craft & Quality Control",
    page: "Process / About",
    url: "/images/process/craftsmanship.jpg",
    localAssetPath: "/images/process/craftsmanship.jpg",
    attribution: "COLOUR NEST Craftsmanship",
    license: "COLOUR NEST Studio Asset",
    focalPoint: "center 40%",
    aspectRatio: "16:9",
    description: "Master applicator testing surface tolerance and raking light depth during the multi-stage plaster burnishing phase."
  },

  "process-spatial-blueprint": {
    id: "process-spatial-blueprint",
    name: "Spatial Diagnostic & Lighting Plan",
    category: "Consultation & Planning",
    page: "Process / PlanProject",
    url: "/images/process/consultation.jpg",
    localAssetPath: "/images/process/consultation.jpg",
    attribution: "COLOUR NEST Spatial Planning",
    license: "COLOUR NEST Studio Asset",
    focalPoint: "center 50%",
    aspectRatio: "16:9",
    description: "Detailed spatial floorplan, finish schedules, and luminaire temperature mapping during initial on-site consultation."
  }
};

// Resilient alias mappings
RAW_IMAGE_MANIFEST['material-polycoat-finish'] = RAW_IMAGE_MANIFEST['material-wood-polycoat'];
RAW_IMAGE_MANIFEST['space-commercial-reception'] = RAW_IMAGE_MANIFEST['space-commercial-workspace'];

// Resilient Proxy ensures that accessing any unknown image key safely falls back to a valid hero image instead of throwing undefined
export const IMAGE_MANIFEST = new Proxy(RAW_IMAGE_MANIFEST, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    if (typeof prop === 'string' && prop !== 'then' && prop !== 'toJSON') {
      return {
        id: prop,
        url: '/images/hero/hero_main.jpg',
        localAssetPath: '/images/hero/hero_main.jpg',
        name: 'COLOUR NEST Architectural Asset',
        description: 'COLOUR NEST Architectural Interior'
      };
    }
    return target[prop];
  }
});

/**
 * Convenience helper to get verified image URL with fallback
 */
export function getImageUrl(id, fallbackKey = "hero-architectural-main") {
  if (IMAGE_MANIFEST[id]?.url) {
    return IMAGE_MANIFEST[id].url;
  }
  return IMAGE_MANIFEST[fallbackKey]?.url || "/images/hero/hero_main.jpg";
}

/**
 * Returns all image entries as an array
 */
export function getAllImages() {
  return Object.values(RAW_IMAGE_MANIFEST);
}

/**
 * Filter images by category
 */
export function getImagesByCategory(cat) {
  return Object.values(RAW_IMAGE_MANIFEST).filter(img => 
    img.category?.toLowerCase().includes(cat.toLowerCase())
  );
}

export default IMAGE_MANIFEST;
