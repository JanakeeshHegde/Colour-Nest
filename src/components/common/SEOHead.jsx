import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteData } from '../../data/siteData';

export const SEOHead = ({
  title,
  description = "COLOUR NEST — Premium Painting & Interior Decor Studio in Jayanagar, Bangalore. Specialising in Venetian Stucco, Italian Anticco, Royals Play, Melamyne & Polycoat Wood Finishing, False Ceilings, and Turnkey Interior Transformations under Mr. Abhishek Rao.",
  canonical,
  ogImage = siteData.brandImages.profile
}) => {
  const fullTitle = title
    ? `${title} | COLOUR NEST — Painting & Interior Decor, Bangalore`
    : "COLOUR NEST | Painting & Interior Decor | Jayanagar, Bangalore";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "COLOUR NEST",
    "alternateName": "Colour Nest Painting & Interiors",
    "image": siteData.brandImages.profile,
    "telephone": siteData.contact.phone,
    "email": siteData.contact.email,
    "url": "https://card.linkconnect.in/colour-nest",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "29th Main, 39th Cross, 9th Block",
      "addressLocality": "Jayanagar, Bangalore",
      "postalCode": "560069",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "founder": {
      "@type": "Person",
      "name": "Mr. Abhishek Rao",
      "jobTitle": "Proprietor & Consultant"
    },
    "sameAs": [
      siteData.urls.facebook,
      siteData.urls.googleMaps
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Painting & Interior Decor Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Royals Play Designs" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wallpaper & High-End Wall Texture (Anticco)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Premium Texture Designs (Stucco)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wood Polish (Melamyne, PU)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Works, Smart Lightings & Fans" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior Painting & Textures" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Customised Interiors" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Interiors" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "False Ceilings" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interiors & Decors" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Premium Wood Polish (Polycoat)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "One Stop Solution for Interior Needs" } }
      ]
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="COLOUR NEST" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
