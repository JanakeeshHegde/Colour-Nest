export const siteData = {
  name: "COLOUR NEST",
  tagline: "Complete Interior & Finishing Solutions",
  natureOfBusiness: "Interiors, Painting, Textures & Spatial Decor",
  subheading: "Complete Spatial Transformations: Interiors, Woodwork, Architectural Textures, Smart Lightings & False Ceilings",
  
  owner: {
    name: "Mr. Abhishek Rao",
    title: "Proprietor & Consultant",
    role: "Principal Interior & Surface Transformation Consultant"
  },

  contact: {
    phone: "+91 84949 50088",
    phoneDisplay: "+91 84949 50088",
    whatsapp: "+918494950088",
    email: "info.colournest@gmail.com",
    address: {
      line1: "29th Main, 39th Cross",
      line2: "9th Block, Jayanagar",
      city: "Bangalore",
      postalCode: "560069",
      state: "Karnataka",
      country: "India",
      formatted: "29th Main, 39th Cross, 9th Block, Jayanagar, Bangalore - 560069"
    }
  },

  urls: {
    facebook: "https://www.facebook.com/info.ColourNest/",
    googleMaps: "https://maps.app.goo.gl/pe2eR6CGW8a4iuuq7",
    vcardDownload: "https://vcard-bucket.s3.us-east-2.amazonaws.com/A001/9369/9369.vcf",
    qrCodeImage: "https://vcard-bucket.s3.us-east-2.amazonaws.com/A001/9369/9369_qr.png",
    cardReference: "https://card.linkconnect.in/colour-nest",
    whatsappDirect: "https://wa.me/918494950088?text=Hello%20Colour%20Nest,%20I%20would%20like%20to%20consult%20on%20an%20interior%20/%20painting%20project."
  },

  brandImages: {
    profile: "/images/process/consultation.jpg",
    logoIcon: "/colour-nest-logo.png",
    logoFull: "/colour-nest-logo.png",
  },

  specialities: [
    {
      id: "satisfaction",
      number: "01",
      title: "Complete client satisfaction",
      description: "Dedicated consulting from raw plaster to the final coat, ensuring every space reflects the client's distinct architectural vision."
    },
    {
      id: "pricing",
      number: "02",
      title: "Affordable pricing",
      description: "Transparent, itemized planning without hidden surprises or synthetic markups for premium finishes."
    },
    {
      id: "reliable",
      number: "03",
      title: "Reliable services",
      description: "Time-disciplined project timelines executed by master painters and skilled interior technicians."
    },
    {
      id: "payment",
      number: "04",
      title: "Easy payment mode",
      description: "Flexible milestone-based payment schedules structured around completed project phases."
    },
    {
      id: "custom",
      number: "05",
      title: "Customized solutions",
      description: "Bespoke Italian plaster recipes, custom tint matching, and tailored joinery finishes designed per site lighting."
    },
    {
      id: "tech",
      number: "06",
      title: "Use of advanced technology",
      description: "Airless spray finishing, laser alignment for false ceilings, and precision moisture testing before primer application."
    },
    {
      id: "experience",
      number: "07",
      title: "A great experience with happy clients",
      description: "Polite, immaculate on-site manners, thorough protective floor masking, and post-application inspection."
    }
  ],

  navigation: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Process", path: "/process" },
    { name: "Space Studio", path: "/space-studio", badge: "3D", is3D: true },
    { name: "Contact", path: "/contact" }
  ]
};
