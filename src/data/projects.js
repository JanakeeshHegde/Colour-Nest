/**
 * COLOUR NEST - Curated Project Portfolios
 * Focus on COMPLETE SPACES, spatial transformations, materials, finishes, lighting, and atmosphere.
 * Based on authentic Colour Nest services, Bangalore contexts, and verified craftsmanship.
 * Curated from IMAGE_MANIFEST.
 */
import { IMAGE_MANIFEST } from "./imageManifest";

export const projectsData = [
  {
    id: "jayanagar-stucco-penthouse",
    slug: "jayanagar-stucco-penthouse",
    title: "The Mineral Penthouse",
    category: "RESIDENTIAL",
    subCategory: "TEXTURE",
    space: "Double-Height Living Pavilion, Foyer & Dining",
    location: "9th Block, Jayanagar, Bangalore",
    year: "2024",
    clientType: "Private Penthouse Residence",
    aspectRatio: "wide",
    heroImage: IMAGE_MANIFEST["hero-architectural-main"].url,
    fallbackHero: IMAGE_MANIFEST["hero-architectural-main"].url,
    beforeImage: IMAGE_MANIFEST["about-interior-workspace"].url,
    afterImage: IMAGE_MANIFEST["hero-architectural-main"].url,
    summary: "A complete double-height spatial transformation uniting tiered gypsum false ceilings, warm Burma teak joinery, and hand-burnished Venetian Stucco with indirect cove lighting.",
    story: {
      theSpace: "A double-height living pavilion and dining hall in 9th Block Jayanagar. The voluminous 18-foot walls and bare concrete shell suffered from midday south-facing glare and harsh acoustic flutter echo.",
      theDirection: "Mr. Abhishek Rao designed an architectural transformation: softening the vertical scale through tiered gypsum false ceilings, warm Burma teak paneling, and tactile mineral plaster rather than flat wall paint.",
      theMaterials: "Imported Italian Carrara marble aggregate plaster, fluted Burma teak wall cladding, acoustic gypsum boards, and brushed brass trim channels.",
      theFinishes: "Hand-burnished Venetian Stucco finished to a soft satin marble sheen, two-pack matte polyurethane lacquer on the teak joinery, and dead-flat zero-reflection ceiling coats.",
      theLight: "Concealed 3000K warm architectural LED coves embedded in the ceiling perimeter graze the plaster from above, highlighting tactile trowel striations without harsh shadows.",
      theDetails: "Laser-aligned reveal shadow lines between ceiling drops and wall planes, flush floor-to-ceiling door frames, and integrated dimmable scene selectors.",
      theAtmosphere: "A tranquil, cathedral-like sanctuary. The space shifts naturally from a crisp, airy daylight pavilion to an intimate, amber-lit salon at dusk."
    },
    palette: [
      { name: "Carrara Greige", hex: "#D6CFBE" },
      { name: "Basalt Slate", hex: "#383B3E" },
      { name: "Alabaster White", hex: "#F5F3ED" },
      { name: "Burma Teak", hex: "#7E5233" }
    ],
    servicesUsed: ["stucco-texture", "false-ceilings", "interior-lighting-fans", "wood-polish-melamyne-pu"],
    gallery: [
      IMAGE_MANIFEST["hero-architectural-main"].url,
      IMAGE_MANIFEST["material-stucco-finish"].url,
      IMAGE_MANIFEST["architectural-false-ceiling"].url,
      IMAGE_MANIFEST["service-custom-interiors"].url
    ]
  },
  {
    id: "indiranagar-anticco-sanctuary",
    slug: "indiranagar-anticco-sanctuary",
    title: "Tuscan Light Residence",
    category: "RESIDENTIAL",
    subCategory: "TEXTURE",
    space: "Master Bedroom Suite & Courtyard Lounge",
    location: "Indiranagar, Bangalore",
    year: "2024",
    clientType: "Contemporary Villa",
    aspectRatio: "tall",
    heroImage: IMAGE_MANIFEST["space-bedroom-refined"].url,
    fallbackHero: IMAGE_MANIFEST["space-bedroom-refined"].url,
    beforeImage: IMAGE_MANIFEST["material-stone-marble"].url,
    afterImage: IMAGE_MANIFEST["space-bedroom-refined"].url,
    summary: "Artisan Anticco Italian texture creating romantic weathered stone depth, paired with textured botanical wallpapers, bleached ash joinery, and warm diffused lighting.",
    story: {
      theSpace: "Master bedroom suite and private reading lounge in an Indiranagar contemporary villa, overlooking a lush private garden courtyard.",
      theDirection: "Connect indoor architecture with the outdoor tropical greenery through aged European earthen textures, seamless linen wallpapers, and gentle, indirect illumination.",
      theMaterials: "Anticco Italian lime-based mineral plaster with coarse quartz sand, woven botanical textured wallpaper, and natural bleached white ash joinery.",
      theFinishes: "Hand-distressed Anticco plaster sealed with breathable natural beeswax, providing a velvety, matte stone texture that resists humidity.",
      theLight: "Low-glare deep recessed architectural spotlights and warm 2700K diffused bedside pendant drops that cast soft radial gradients across the textured relief.",
      theDetails: "Seamless transitions between wallpaper panels and troweled plaster zones, sound-damped timber headboard wall, and brass shadow trims.",
      theAtmosphere: "An enveloping cocoon of organic tranquility. Morning light reveals delicate micro-shadows along the plaster relief, evoking the warmth of a Mediterranean villa."
    },
    palette: [
      { name: "Anticco Ochre", hex: "#C7A678" },
      { name: "Olive Linen", hex: "#7E8472" },
      { name: "Soft Sand", hex: "#E8E1D3" },
      { name: "Antiqued Brass", hex: "#A88D56" }
    ],
    servicesUsed: ["wallpaper-anticco", "interiors-decors", "royals-play", "interior-lighting-fans"],
    gallery: [
      IMAGE_MANIFEST["space-bedroom-refined"].url,
      IMAGE_MANIFEST["material-anticco-texture"].url,
      IMAGE_MANIFEST["material-wallpaper-pattern"].url
    ]
  },
  {
    id: "koramangala-polycoat-residence",
    slug: "koramangala-polycoat-residence",
    title: "The Teak & Amber Pavilion",
    category: "RESIDENTIAL",
    subCategory: "WOOD",
    space: "Grand Entrance Foyer, Credenza & Architectural Wall Paneling",
    location: "Koramangala, Bangalore",
    year: "2023",
    clientType: "Private Villa",
    aspectRatio: "large",
    heroImage: IMAGE_MANIFEST["material-wood-grain"].url,
    fallbackHero: IMAGE_MANIFEST["material-wood-grain"].url,
    beforeImage: IMAGE_MANIFEST["about-interior-workspace"].url,
    afterImage: IMAGE_MANIFEST["material-wood-polycoat"].url,
    summary: "Exquisite two-pack Polycoat wood finish bringing diamond clarity and liquid-glass protection to reclaimed Burma teak, integrated with alabaster walls and coved ceilings.",
    story: {
      theSpace: "Grand entrance gallery, formal dining credenza, and custom wall paneling in an expansive Koramangala private residence.",
      theDirection: "Rejuvenate heirloom Burma teak architectural elements and integrate them with pristine alabaster walls, elevated coved ceilings, and precision modern lighting.",
      theMaterials: "Solid Burma teak woodwork, two-pack high-build Polycoat clear coat, high-density moisture-resistant MDF fluting, and acoustic ceiling panels.",
      theFinishes: "Multi-stage diamond wet-polished Polycoat achieving 100% optical clarity and glass-like depth, contrasted with velvety eggshell wall finishes.",
      theLight: "Narrow-beam 24-degree accent spotlights aimed precisely at timber grains, paired with indirect 3000K ceiling troughs that reflect golden ambient warmth throughout the room.",
      theDetails: "1200-grit micro-abrasive sanding between coats, dust-isolated application barriers, and seamless edge caulking along natural marble floor skirts.",
      theAtmosphere: "Deep, aristocratic luxury. The rich flame grains of the teak glow like liquid amber, establishing an authoritative yet welcoming first impression."
    },
    palette: [
      { name: "Burma Amber", hex: "#9E5828" },
      { name: "Rich Ebony", hex: "#1C1714" },
      { name: "Ivory Silk", hex: "#F3EDE3" },
      { name: "Warm Bronze", hex: "#8C6D46" }
    ],
    servicesUsed: ["wood-polish-polycoat", "wood-polish-melamyne-pu", "customised-interiors", "false-ceilings"],
    gallery: [
      IMAGE_MANIFEST["material-wood-polycoat"].url,
      IMAGE_MANIFEST["material-wood-grain"].url,
      IMAGE_MANIFEST["service-custom-interiors"].url
    ]
  },
  {
    id: "jp-nagar-royals-living",
    slug: "jp-nagar-royals-living",
    title: "The Metallic Weave Salon",
    category: "RESIDENTIAL",
    subCategory: "PAINTING",
    space: "Multi-Level Drawing Room & Staircase Atrium",
    location: "JP Nagar 7th Phase, Bangalore",
    year: "2024",
    clientType: "Duplex Residence",
    aspectRatio: "wide",
    heroImage: IMAGE_MANIFEST["space-living-contemporary"].url,
    fallbackHero: IMAGE_MANIFEST["space-living-contemporary"].url,
    beforeImage: IMAGE_MANIFEST["architectural-false-ceiling"].url,
    afterImage: IMAGE_MANIFEST["space-living-contemporary"].url,
    summary: "Artisan Royals Play dimensional pattern with champagne mica glazes, framing a double-height staircase and creating an ethereal light-responsive canvas.",
    story: {
      theSpace: "A multi-level formal drawing room and open staircase atrium in JP Nagar 7th Phase, designed for entertaining and art appreciation.",
      theDirection: "Create an architectural focal composition that accentuates the vertical stair void while harmonizing with bespoke modern furniture and ambient lighting.",
      theMaterials: "Royals Play metallic glazes with natural mica flakes, gypsum stepped false ceiling rafts, acoustic baffle walls, and tempered architectural glass balustrades.",
      theFinishes: "Rhythmically combed woven glaze texture over a rich neutral basecoat, satin-sheen ceiling soffits, and brushed graphite metal trims.",
      theLight: "Continuous linear LED profiles recessed along staircase handrails, coupled with perimeter ceiling cove illumination that washes down the textured feature wall.",
      theDetails: "Precision edge alignment around cantilevered stair steps, hidden wiring conduits, and custom acoustic zoning to eliminate echo in the atrium.",
      theAtmosphere: "A shimmering, dynamic environment where wall surfaces shift in tone and brilliance as visitors ascend the stairs, creating a sense of kinetic elegance."
    },
    palette: [
      { name: "Champagne Glaze", hex: "#D6C7AA" },
      { name: "Muted Terracotta", hex: "#B85C38" },
      { name: "Plaster Cream", hex: "#FAF6EE" },
      { name: "Graphite", hex: "#2C2E30" }
    ],
    servicesUsed: ["royals-play", "false-ceilings", "interior-lighting-fans", "interiors-decors"],
    gallery: [
      IMAGE_MANIFEST["space-living-contemporary"].url,
      IMAGE_MANIFEST["service-royals-play"].url,
      IMAGE_MANIFEST["architectural-lighting-pendant"].url
    ]
  },
  {
    id: "whitefield-commercial-hub",
    slug: "whitefield-commercial-hub",
    title: "Studio Horizon Offices",
    category: "COMMERCIAL",
    subCategory: "COMMERCIAL",
    space: "Executive Suite, Boardroom & Creative Studio",
    location: "Whitefield, Bangalore",
    year: "2023",
    clientType: "Commercial Studio",
    aspectRatio: "wide",
    heroImage: IMAGE_MANIFEST["space-commercial-workspace"].url,
    fallbackHero: IMAGE_MANIFEST["space-commercial-workspace"].url,
    beforeImage: IMAGE_MANIFEST["gallery-commercial-boardroom"].url,
    afterImage: IMAGE_MANIFEST["space-commercial-workspace"].url,
    summary: "Complete commercial interior transformation: high-traffic scrub-resistant wall coatings, acoustic gypsum ceiling drops, and tunable magnetic track illumination.",
    story: {
      theSpace: "A 4,000 sq ft creative executive suite and glass boardroom in Whitefield, requiring brand-aligned aesthetics and high-performance durability.",
      theDirection: "Eliminate industrial cavernous echo through floating acoustic ceiling islands, zoned circadian lighting, and scrub-resistant textured surface finishes.",
      theMaterials: "Sound-absorbing acoustic ceiling baffles, heavy-duty commercial wall coatings, black powder-coated aluminum track systems, and birch plywood accents.",
      theFinishes: "Scrub-resistant Class 1 washable wall finishes, matte black industrial ceiling sprays for open HVAC zones, and hard-wax oil for collaborative wood benches.",
      theLight: "Magnetic track lighting with tunable white LEDs (2700K to 5000K) synchronized with natural daylight cycles to optimize employee focus and wellness.",
      theDetails: "Acoustic seal gaskets around glass conference partitions, flush-mounted electrical pop-ups, and laser-straight color-blocked transitional reveals.",
      theAtmosphere: "An inspiring, sophisticated creative hub. Reverberation was cut by 60%, and the balanced lighting creates a calm, high-productivity environment."
    },
    palette: [
      { name: "Basalt Black", hex: "#1F2123" },
      { name: "Clean Industrial Greige", hex: "#D1CBC1" },
      { name: "Nordic Birch", hex: "#DDCBB2" },
      { name: "Bright Studio White", hex: "#FFFFFF" }
    ],
    servicesUsed: ["commercial-interiors", "false-ceilings", "interior-lighting-fans", "one-stop-solution"],
    gallery: [
      IMAGE_MANIFEST["space-commercial-workspace"].url,
      IMAGE_MANIFEST["gallery-commercial-boardroom"].url,
      IMAGE_MANIFEST["architectural-lighting-pendant"].url
    ]
  },
  {
    id: "bannerghatta-weatherproof-villa",
    slug: "bannerghatta-weatherproof-villa",
    title: "Monolithic Courtyard Villa",
    category: "EXTERIOR",
    subCategory: "EXTERIOR",
    space: "Exterior Facade, Boundary Walls & Balcony Soffits",
    location: "Bannerghatta Road, Bangalore",
    year: "2024",
    clientType: "Private Villa",
    aspectRatio: "tall",
    heroImage: IMAGE_MANIFEST["exterior-facade-contemporary"].url,
    fallbackHero: IMAGE_MANIFEST["exterior-facade-contemporary"].url,
    beforeImage: IMAGE_MANIFEST["gallery-exterior-residence"].url,
    afterImage: IMAGE_MANIFEST["exterior-facade-contemporary"].url,
    summary: "Heavy-duty silicone exterior stone texture providing 100% monsoon waterproofing, anti-fungal shield, and striking architectural presence.",
    story: {
      theSpace: "Full exterior facade, cantilevered courtyard canopy, boundary walls, and balcony ceiling soffits for a private villa on Bannerghatta Road.",
      theDirection: "A unified monolithic architectural presence engineered to withstand heavy Bengaluru southwest monsoon downpours while celebrating raw sculptural stone geometry.",
      theMaterials: "Silicone-modified elastomeric stone texture, hydrophobic water-shedding primers, exterior-grade composite timber soffits, and anti-carbonation coatings.",
      theFinishes: "Spray-applied medium-grain quartz stone finish that bridges hairline settling fractures, paired with UV-stable exterior timber stains.",
      theLight: "Warm 3000K IP67-rated architectural wall grazers and recessed ground uplights that accentuate the stone texture against the night sky.",
      theDetails: "Drip-edge molding details preventing water run-off stains, expansion joint sealing with high-movement structural polyurethane, and stainless-steel hardware.",
      theAtmosphere: "A timeless, fortress-like sanctuary. The facade sheds heavy monsoon rains effortlessly, looking as crisp and commanding years later as the day it was completed."
    },
    palette: [
      { name: "Granite Stone Grey", hex: "#9E9A92" },
      { name: "Alabaster Facade White", hex: "#EDE9E1" },
      { name: "Charcoal Anthracite", hex: "#2F3133" },
      { name: "Teak Soffit", hex: "#6F4B2E" }
    ],
    servicesUsed: ["exterior-painting", "one-stop-solution", "wood-polish-melamyne-pu"],
    gallery: [
      IMAGE_MANIFEST["exterior-facade-contemporary"].url,
      IMAGE_MANIFEST["gallery-exterior-residence"].url
    ]
  }
];

export const projectFilters = [
  "ALL",
  "RESIDENTIAL",
  "COMMERCIAL",
  "TEXTURE",
  "WOOD",
  "PAINTING",
  "EXTERIOR"
];
