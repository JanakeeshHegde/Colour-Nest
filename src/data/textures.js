/**
 * COLOUR NEST - Architectural Textures & Tactile Material Explorer
 * Features tactile physical simulation parameters, lighting responses and related services
 * All imagery sourced from curated IMAGE_MANIFEST
 */
import { IMAGE_MANIFEST } from "./imageManifest";

export const texturesData = [
  {
    id: "stucco",
    slug: "stucco-venetian-plaster",
    title: "Stucco (Venetian Marble Plaster)",
    label: "STUCCO",
    subtitle: "High-burnish mineral plaster with deep marble translucence",
    category: "TEXTURE",
    roughness: 0.15,
    specular: 0.85,
    reliefDepth: "low-relief / ultra-smooth",
    origin: "Venetian Artisan Tradition",
    description: "Hand-applied with flexible spatulas in micro-thin layers. Natural marble dust creates a surface that feels cool to the touch and reflects ambient light like polished Carrara limestone.",
    serviceId: "stucco-texture",
    serviceSlug: "premium-stucco-textures",
    realImage: IMAGE_MANIFEST["material-stucco-finish"].url,
    highResImage: IMAGE_MANIFEST["material-stucco-finish"].url,
    colorVariations: [
      { name: "Carrara Mist", hex: "#ECE9E2", gradient: "radial-gradient(circle at %X% %Y%, #FFFFFF 0%, #D8D2C4 60%, #B8B09F 100%)" },
      { name: "Basalt Velvet", hex: "#323538", gradient: "radial-gradient(circle at %X% %Y%, #5A6065 0%, #2A2C2E 50%, #151617 100%)" },
      { name: "Warm Sienna", hex: "#A86248", gradient: "radial-gradient(circle at %X% %Y%, #D18367 0%, #9D583F 55%, #6B3624 100%)" }
    ],
    technicalSpec: {
      composition: "Slaked lime putty, micronized marble dust, organic binders",
      sheenLevel: "Satin to mirror high-gloss (achieved by steel trowel burnishing)",
      thickness: "0.8mm - 1.2mm total system",
      voc: "Zero VOC, breathable, naturally resistant to mold"
    }
  },
  {
    id: "anticco",
    slug: "anticco-heritage-texture",
    title: "Anticco (Aged Italian Stone Plaster)",
    label: "ANTICCO",
    subtitle: "Aged stone texture with gentle relief and multi-tonal patina",
    category: "TEXTURE",
    roughness: 0.65,
    specular: 0.35,
    reliefDepth: "medium-high tactile relief",
    origin: "Tuscan Architectural Heritage",
    description: "Evokes the weathered, romantic textures of ancient European villas. Coarser mineral aggregates cast soft micro-shadows under directional lighting, giving flat walls sculptural permanence.",
    serviceId: "wallpaper-anticco",
    serviceSlug: "wallpaper-and-anticco-texture",
    realImage: IMAGE_MANIFEST["material-anticco-texture"].url,
    highResImage: IMAGE_MANIFEST["material-anticco-texture"].url,
    colorVariations: [
      { name: "Tuscan Ochre", hex: "#D4B483", gradient: "radial-gradient(circle at %X% %Y%, #F2D9B3 0%, #C4A26E 60%, #8E6D3C 100%)" },
      { name: "Weathered Sand", hex: "#C7BCA8", gradient: "radial-gradient(circle at %X% %Y%, #E5DDD0 0%, #B8AC98 55%, #887B67 100%)" },
      { name: "Ancient Olive", hex: "#7E8472", gradient: "radial-gradient(circle at %X% %Y%, #A3AA97 0%, #707764 60%, #484D40 100%)" }
    ],
    technicalSpec: {
      composition: "Hydrated lime, selected silica & marble sands, natural iron oxides",
      sheenLevel: "Deep matte with waxed highlights",
      thickness: "1.5mm - 2.5mm",
      voc: "Natural mineral, class A1 fire resistance"
    }
  },
  {
    id: "royals-play",
    slug: "royals-play-artisan-designs",
    title: "Royals Play (Artisan Metallics & Weaves)",
    label: "ROYALS PLAY",
    subtitle: "Light-shifting metallic glazes, spatula waves & artisan weaves",
    category: "PAINTING",
    roughness: 0.40,
    specular: 0.70,
    reliefDepth: "patterned tactile relief",
    origin: "Modern Artisan Paint Innovation",
    description: "Specialized designer glazes manipulated by master applicators using combs, sponges, and spatulas. Shifts dynamically as the sun moves across your living space.",
    serviceId: "royals-play",
    serviceSlug: "royals-play-designs",
    realImage: IMAGE_MANIFEST["service-royals-play"].url,
    highResImage: IMAGE_MANIFEST["service-royals-play"].url,
    colorVariations: [
      { name: "Molten Bronze", hex: "#9E784E", gradient: "radial-gradient(circle at %X% %Y%, #D6B287 0%, #9E784E 50%, #5E4325 100%)" },
      { name: "Champagne Dune", hex: "#D6C7AA", gradient: "radial-gradient(circle at %X% %Y%, #F7EEDB 0%, #C4B393 50%, #877454 100%)" },
      { name: "Teal Shimmer", hex: "#3B6168", gradient: "radial-gradient(circle at %X% %Y%, #61959F 0%, #355A61 50%, #1A343A 100%)" }
    ],
    technicalSpec: {
      composition: "Modified acrylic emulsions with mica pearlescent particles",
      sheenLevel: "Semi-gloss metallic luster",
      thickness: "0.5mm decorative glaze over smooth basecoats",
      voc: "Low VOC, water-thinnable, scrub resistant"
    }
  },
  {
    id: "wood-polish",
    slug: "wood-polish-melamyne-pu",
    title: "Wood Polish (Melamyne, PU & Natural Grain)",
    label: "WOOD",
    subtitle: "Grain-preserving silken timber finishes with heat & moisture shields",
    category: "WOOD",
    roughness: 0.25,
    specular: 0.65,
    reliefDepth: "open-pore / closed-pore timber",
    origin: "Fine Cabinetmaking & Joinery",
    description: "Preserves the deep soul of natural Burma teak, walnut, and oak. Melamyne and Polyurethane seal the grain against water rings while allowing timber's warmth to breathe through.",
    serviceId: "wood-polish-melamyne-pu",
    serviceSlug: "wood-polish-melamyne-pu",
    realImage: IMAGE_MANIFEST["material-wood-grain"].url,
    highResImage: IMAGE_MANIFEST["material-wood-grain"].url,
    colorVariations: [
      { name: "Natural Honey Teak", hex: "#A86835", gradient: "radial-gradient(circle at %X% %Y%, #CCA16C 0%, #9E5F2E 55%, #593112 100%)" },
      { name: "Smoked American Walnut", hex: "#4C3322", gradient: "radial-gradient(circle at %X% %Y%, #73533C 0%, #462E1D 60%, #211309 100%)" },
      { name: "Bleached Ash", hex: "#C8BBA5", gradient: "radial-gradient(circle at %X% %Y%, #E6DDCE 0%, #B8A991 60%, #7D6E57 100%)" }
    ],
    technicalSpec: {
      composition: "Acid-curing melamyne or two-pack aliphatic polyurethane",
      sheenLevel: "Matt (10%), Satin (30%), Silk (50%), or Gloss (85%)",
      thickness: "100 - 150 microns dry film",
      voc: "Complies with interior architectural coating guidelines"
    }
  },
  {
    id: "polycoat",
    slug: "polycoat-wood-sealant",
    title: "Polycoat (Ultra-Hard Liquid Crystal Sealer)",
    label: "POLYCOAT",
    subtitle: "Glass-like mirror depth, non-yellowing durability & diamond hardness",
    category: "WOOD",
    roughness: 0.05,
    specular: 0.95,
    reliefDepth: "mirror flat / crystal clear",
    origin: "Luxury Yacht & High-End Furniture Finishing",
    description: "Two-pack crosslinking formulation that envelops wood in liquid crystal clarity. Exceptional scratch resistance, zero yellowing, and an unforgettable wet-look reflection.",
    serviceId: "wood-polish-polycoat",
    serviceSlug: "premium-wood-polish-polycoat",
    realImage: IMAGE_MANIFEST["material-wood-polycoat"].url,
    highResImage: IMAGE_MANIFEST["material-wood-polycoat"].url,
    colorVariations: [
      { name: "Crystal Teak Mirror", hex: "#8A4D22", gradient: "radial-gradient(circle at %X% %Y%, #BF7741 0%, #85481E 50%, #452109 100%)" },
      { name: "Deep Rosewood Luster", hex: "#3E1E19", gradient: "radial-gradient(circle at %X% %Y%, #6B3A32 0%, #381A15 50%, #1A0907 100%)" },
      { name: "Golden Oak Gloss", hex: "#A87A3E", gradient: "radial-gradient(circle at %X% %Y%, #DCB073 0%, #9F7236 50%, #5B3E18 100%)" }
    ],
    technicalSpec: {
      composition: "Two-pack isocyanate cured acrylic polyol resin",
      sheenLevel: "95%+ specular gloss mirror",
      thickness: "120 - 180 microns",
      voc: "High solid content, UV stabilized non-yellowing"
    }
  },
  {
    id: "textured-wall",
    slug: "architectural-textured-wall",
    title: "Textured Wall (Rough-Cast Architectural Plaster)",
    label: "TEXTURED WALL",
    subtitle: "Organic stone grain, continuous earth surface & light grazing",
    category: "TEXTURE",
    roughness: 0.85,
    specular: 0.20,
    reliefDepth: "heavy continuous architectural relief",
    origin: "Monolithic Architectural Finishes",
    description: "Bold mineral aggregate applied continuously over expansive interior and exterior spans. Under low-angle cove lighting, it creates an unforgettable interplay of cast shadows.",
    serviceId: "exterior-painting",
    serviceSlug: "exterior-painting-and-textures",
    realImage: IMAGE_MANIFEST["exterior-facade-contemporary"].url,
    highResImage: IMAGE_MANIFEST["exterior-facade-contemporary"].url,
    colorVariations: [
      { name: "Granite Plaster", hex: "#8E8B84", gradient: "radial-gradient(circle at %X% %Y%, #B2AEA5 0%, #827E77 60%, #4F4C47 100%)" },
      { name: "Clay Adobe", hex: "#9F634A", gradient: "radial-gradient(circle at %X% %Y%, #C78265 0%, #955A42 60%, #5C3221 100%)" },
      { name: "Sandstone Rough", hex: "#C7B99B", gradient: "radial-gradient(circle at %X% %Y%, #E4D8BE 0%, #BAAB8C 60%, #7A6D52 100%)" }
    ],
    technicalSpec: {
      composition: "Graded quartz crystals, elastomeric polymer binders, mineral pigments",
      sheenLevel: "Ultra-matte texture with deep shadowing",
      thickness: "2.0mm - 4.0mm heavy build",
      voc: "Waterproof, bridge hairline substrate cracks"
    }
  }
];

export const materialCategories = [
  { id: "PAINT", title: "Paint & Glaze", description: "Luxury acrylic emulsions, breathable minerals and metallic luster coatings" },
  { id: "TEXTURE", title: "Artisan Plaster", description: "Venetian Stucco, Tuscan Anticco and rough-cast dimensional relief" },
  { id: "WOOD", title: "Wood & Timber", description: "Melamyne, PU and Polycoat crystal sealers for natural grains" },
  { id: "WALLPAPER", title: "Wallcoverings", description: "Textured grasscloth, European vinyl and botanical seamless panels" },
  { id: "LIGHT", title: "Lighting & Coves", description: "Concealed 2700K-4000K LED profiles, magnetic tracks and smart fans" },
  { id: "CEILING", title: "Gypsum Volumes", description: "Precision laser-leveled false ceilings, floating rafts and perimeter coves" }
];
