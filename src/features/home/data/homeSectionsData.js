import { IMAGE_MANIFEST } from '../../../data/imageManifest';

// 5 Principal Service Categories for Section 03
export const SERVICE_CATEGORIES = [
  {
    id: 'interiors',
    title: 'Interior Solutions',
    desc: 'Turnkey residential planning, custom modular joinery, and tailored layouts.',
    image: IMAGE_MANIFEST['space-living-contemporary'].url,
    link: '/services/customised-interiors'
  },
  {
    id: 'textures',
    title: 'Textures & Wallpapers',
    desc: 'Italian Venetian Stucco, Anticco mineral aggregate, and seamless wallcoverings.',
    image: IMAGE_MANIFEST['material-stucco-finish'].url,
    link: '/services/premium-stucco-textures'
  },
  {
    id: 'wood',
    title: 'Wood & Finishes',
    desc: 'Polycoat mirror sheens, Melamyne, and polyurethane protective coatings.',
    image: IMAGE_MANIFEST['material-wood-grain'].url,
    link: '/services/wood-polish-melamyne-pu'
  },
  {
    id: 'ceilings-lighting',
    title: 'Ceilings & Lighting',
    desc: 'Dropped gypsum false ceilings with concealed 3000K indirect cove LED channels.',
    image: IMAGE_MANIFEST['architectural-false-ceiling'].url,
    link: '/services/false-ceilings'
  },
  {
    id: 'exterior',
    title: 'Exterior Finishes',
    desc: 'Weatherproof exterior wall textures and elastomeric masonry systems.',
    image: IMAGE_MANIFEST['exterior-facade-contemporary'].url,
    link: '/services/exterior-painting-and-textures'
  }
];

// 4 Selected Materials for Section 04
export const SELECTED_MATERIALS = [
  {
    id: 'stucco',
    title: 'Italian Venetian Stucco',
    category: 'Surface Finish',
    desc: 'Lime plaster burnished by hand to achieve organic mineral depth and subtle light reflection.',
    image: IMAGE_MANIFEST['material-stucco-finish'].url,
    link: '/services/premium-stucco-textures'
  },
  {
    id: 'anticco',
    title: 'Anticco Stone Texture',
    category: 'Textured Plaster',
    desc: 'Rustic aged limestone and marble aggregate textures reminiscent of Mediterranean architecture.',
    image: IMAGE_MANIFEST['material-anticco-texture'].url,
    link: '/services/wallpaper-and-anticco-texture'
  },
  {
    id: 'polycoat',
    title: 'Polycoat Mirror Polish',
    category: 'Wood Finish',
    desc: 'Two-pack high-clarity polyurethane crystal coat providing maximum depth and scratch resistance.',
    image: IMAGE_MANIFEST['material-wood-polycoat'].url,
    link: '/services/premium-wood-polish-polycoat'
  },
  {
    id: 'wallpaper',
    title: 'Designer Wallpapers',
    category: 'Wall Decor',
    desc: 'European vinyl and botanical wallcoverings aligned with plumb-line seam precision.',
    image: IMAGE_MANIFEST['material-wallpaper-pattern'].url,
    link: '/services/wallpaper-and-anticco-texture'
  }
];

// 4 Curated Gallery Snapshots for Section 05
export const GALLERY_PREVIEW = [
  {
    id: 'living',
    title: 'Contemporary Living Pavilion',
    category: 'Living Space',
    tag: 'Limewash finish with teak joinery',
    image: IMAGE_MANIFEST['space-living-contemporary'].url
  },
  {
    id: 'bedroom',
    title: 'Refined Master Suite',
    category: 'Bedroom',
    tag: 'Acoustic timber slats & cove illumination',
    image: IMAGE_MANIFEST['space-bedroom-refined'].url
  },
  {
    id: 'kitchen',
    title: 'Culinary Studio',
    category: 'Kitchen',
    tag: 'Waterfall marble & fluted millwork',
    image: IMAGE_MANIFEST['space-kitchen-architectural'].url
  },
  {
    id: 'reception',
    title: 'Commercial Reception Lounge',
    category: 'Commercial',
    tag: 'Textured stone backdrop & magnetic lighting',
    image: IMAGE_MANIFEST['space-commercial-workspace'].url
  }
];

// 4 Milestone Summaries for Section 06
export const PROCESS_PREVIEW = [
  {
    step: '01',
    title: 'Consultation',
    desc: 'Mr. Abhishek Rao evaluates your space, floor plan, and personal design direction.'
  },
  {
    step: '02',
    title: 'Material Direction',
    desc: 'Physical samples of plasters, wood polishes, and paint palettes tested under room light.'
  },
  {
    step: '03',
    title: 'On-Site Execution',
    desc: 'Master artisans execute wall textures, ceiling drops, joinery, and electrical channels.'
  },
  {
    step: '04',
    title: 'Quality Handover',
    desc: 'Detailed milestone inspections, post-cleaning, and client walkthrough of all finished surfaces.'
  }
];

