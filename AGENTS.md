# AGENTS.MD — COLOUR NEST ARCHITECTURE & AI ORIENTATION GUIDE

> **AI Context Optimization Notice:**  
> This file is the primary orientation index for AI coding assistants. Read this file first instead of scanning the full repository to conserve context tokens and maintain architectural discipline.

---

## 1. Verified Brand Identity & Ground Truth

- **Brand Name:** COLOUR NEST
- **Nature of Business:** Complete Interior, Finishing & Painting Studio
- **Proprietor & Consultant:** Mr. Abhishek Rao
- **Contact Number / WhatsApp:** `+91 84949 50088`
- **Email:** `info.colournest@gmail.com`
- **Location:** 29th Main, 39th Cross, 9th Block, Jayanagar, Bangalore - 560069
- **Fixed Brand Color Tokens:**
  - **Primary Indigo:** `#3C2D8C`
  - **Pale Gold:** `#E3D9A4`
  - **Warm Ivory:** `#FAF8F2`
  - **Deep Ink:** `#211D2D`
  *Rule: The brand palette is fixed and static. 3D room material adjustments must never alter the global brand UI tokens.*

---

## 2. Technology Stack

- **Framework:** React 18 (SPA)
- **Bundler:** Vite 6 (with manual chunking for React, Framer Motion, and Three.js)
- **Routing:** React Router DOM v6 (lazy-loaded routes)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation:** `framer-motion`, `gsap`, `lenis`
- **Icons:** `lucide-react`
- **Hosting / Deploy Target:** Vercel (configured with `vercel.json` rewrite rule)

---

## 3. High-Efficiency Project Structure

```
c:\Users\hegde\Desktop\Color Nest\
├── vercel.json                  # SPA routing rewrite to /index.html
├── vite.config.js               # Code splitting & vendor chunking
├── package.json
├── AGENTS.md                    # This AI orientation guide
├── docs/
│   └── ARCHITECTURE.md          # Architectural decisions & component contracts
├── public/                      # Static assets, textures, favicon
└── src/
    ├── App.jsx                  # Root router, code-split lazy routes, error boundary
    ├── main.jsx                 # React root mount
    ├── index.css                # Style loader (imports 4 tokenized stylesheets)
    │
    ├── data/                    # AUTHORITATIVE DATA (Single Sources of Truth)
    │   ├── siteData.js          # Business details, navigation items, specialities, URLs
    │   ├── services.js          # 12 core services catalogue (slugs, details, categories)
    │   ├── gallery.js           # 18 curated spatial gallery projects & categories
    │   ├── roomStudioConfig.js  # 3D material swatches, surface presets, lighting setups
    │   └── imageManifest.js     # Image URLs & asset mappings
    │
    ├── features/                # MODULAR FEATURE DOMAINS
    │   ├── home/                # Homepage modular sections & section data
    │   │   ├── components/      # HeroSection, Narrative, ServicesShowcase, etc.
    │   │   ├── data/            # homeSectionsData.js
    │   │   └── index.js
    │   ├── space-studio/        # 3D Space Studio state, UI controls, & modals
    │   │   ├── components/      # StudioControlPanel, SavedDesignsModal, DesignEnquiryModal
    │   │   ├── hooks/           # useSpaceStudioState.js (all room state & mutations)
    │   │   └── index.js
    │   ├── services/            # Services catalogue & consultation forms
    │   │   ├── components/      # EnquiryWizard.jsx
    │   │   └── index.js
    │   ├── contact/             # Contact page components
    │   │   ├── components/      # ContactEnquiryWizard.jsx
    │   │   └── index.js
    │   └── gallery/             # Gallery portfolio components
    │       ├── components/      # GalleryLightbox.jsx
    │       └── index.js
    │
    ├── components/
    │   ├── layout/              # Structural wrappers: Navbar.jsx, Footer.jsx
    │   ├── canvas/              # 3D R3F canvases: SpaceStudioCanvas, ArchitecturalRoom, ProcessWireframeCanvas, WebGLErrorBoundary
    │   └── common/              # ArchitecturalLine, Preloader, ScrollProgress, SEOHead, WhatsAppFab
    │
    ├── pages/                   # Slim route components (lazy loaded by App.jsx)
    │   ├── Home.jsx             # (~40 lines, orchestrates features/home)
    │   ├── About.jsx            # Studio story, verified specialities, location
    │   ├── Services.jsx         # Category-filtered service catalogue
    │   ├── ServiceDetail.jsx    # Dynamic service details by slug with EnquiryWizard
    │   ├── Gallery.jsx          # Filterable spatial portfolio with Lightbox
    │   ├── Process.jsx          # 8-stage sequence with ProcessWireframeCanvas
    │   ├── SpaceStudio.jsx      # 3D interactive room customizer
    │   ├── Contact.jsx          # Direct contact info + multi-step enquiry wizard
    │   └── NotFound.jsx         # 404 fallback page
    │
    ├── hooks/                   # useSmoothScroll.js, useReducedMotion.js
    ├── styles/                  # variables.css, base.css, components.css, animations.css
    └── utils/                   # proceduralTextures.js
```

---

## 4. Key Developer & AI Maintenance Workflows

### Target-Specific Editing (To Save Tokens)
- **To update business info, phone, or navigation links:**  
  Edit ONLY `src/data/siteData.js`.
- **To add or edit services:**  
  Edit ONLY `src/data/services.js`. Both the catalogue and detail pages update automatically.
- **To update gallery items:**  
  Edit ONLY `src/data/gallery.js`.
- **To update 3D Space Studio swatches, materials, or lighting:**  
  Edit ONLY `src/data/roomStudioConfig.js` and/or `src/features/space-studio/hooks/useSpaceStudioState.js`.
- **To adjust homepage sections:**  
  Inspect and edit components inside `src/features/home/components/`.

### Commands
- **Development Server:** `npm run dev`
- **Production Build:** `npm run build`
- **Preview Build:** `npm run preview`

---

## 5. Architectural Guardrails

1. **Do Not Redesign UI:** Maintain the architectural luxury aesthetic and layout.
2. **Never Invent Factual Claims:** Rely on verified LinkConnect baseline facts.
3. **Keep Brand Colors Inviolable:** `--brand-indigo`, `--brand-gold`, `--brand-ivory`, `--brand-ink`.
4. **Isolate 3D Code:** Canvas components use `WebGLErrorBoundary` so a WebGL failure never breaks the page.
5. **Always Run `npm run build`:** Verify production bundle chunks before completing any refactor.

