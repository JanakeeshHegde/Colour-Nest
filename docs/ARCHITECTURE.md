# COLOUR NEST — ARCHITECTURAL SPECIFICATION & SYSTEM DESIGN

**Version:** 2.0  
**Status:** Production Refactored  
**Audience:** Senior Engineers, AI Coding Agents, Frontend Maintainers  

---

## 1. Architectural Philosophy & System Topology

COLOUR NEST is designed as an architectural luxury web experience built on React 18, Vite 6, and React Three Fiber. The core design principles are:

1. **Strict Feature Modularity:** Code is grouped by business domain under `src/features/` rather than monolithic page files.
2. **Single Source of Truth (DRY):** Business metadata, contact coordinates, services catalogue, and gallery images live in `src/data/` and are consumed across the app.
3. **Optimized Token Footprint for AI Agents:** Monolithic files (>1,500 lines) have been split into discrete sub-components (<150 lines), allowing AI assistants to read and modify specific sections without loading irrelevant context into token windows.
4. **Resilient 3D Isolation:** Heavy 3D Three.js modules are isolated behind `WebGLErrorBoundary` and lazy chunk splitting, preventing WebGL or shader errors from impacting standard web routes.
5. **Brand Palette Immutability:** The verified brand palette (`#3C2D8C` Indigo, `#E3D9A4` Pale Gold, `#FAF8F2` Warm Ivory, `#211D2D` Deep Ink) is statically defined in CSS tokens and never modified by runtime 3D lighting or room material changes.

```mermaid
flowchart TD
    App["App.jsx (Router, ErrorBoundary, Lazy Pages)"]
    
    subgraph Data Layer ["src/data (Authoritative Truth)"]
        SD["siteData.js\n(Business Info, Navigation, Specialities)"]
        SRV["services.js\n(12 Service Definitions, Slugs, Features)"]
        GAL["gallery.js\n(18 Curated Projects, Tags, Categories)"]
        RSC["roomStudioConfig.js\n(3D Swatches, Surfaces, Lighting)"]
        IMG["imageManifest.js\n(Verified Image URLs & Alt Text)"]
    end
    
    subgraph Layout ["src/components/layout"]
        Nav["Navbar.jsx"]
        Foot["Footer.jsx"]
    end
    
    subgraph Features ["src/features/"]
        FHome["home/\n(Hero, Narrative, Showcase, Strengths)"]
        FStudio["space-studio/\n(useSpaceStudioState, StudioControlPanel, Modals)"]
        FServices["services/\n(EnquiryWizard)"]
        FGallery["gallery/\n(GalleryLightbox)"]
        FContact["contact/\n(ContactEnquiryWizard)"]
    end
    
    subgraph Canvas ["src/components/canvas/"]
        R3F["SpaceStudioCanvas.jsx\n+ ArchitecturalRoom.jsx"]
        Proc["ProcessWireframeCanvas.jsx"]
        ErrB["WebGLErrorBoundary.jsx"]
    end
    
    App --> Layout
    App --> Features
    Features --> Data Layer
    FStudio --> Canvas
```

---

## 2. Directory Structure & Responsibilities

| Directory | Purpose | Key Files |
|---|---|---|
| `src/data/` | Authoritative single sources of truth | `siteData.js`, `services.js`, `gallery.js`, `roomStudioConfig.js`, `imageManifest.js` |
| `src/features/home/` | Homepage modular section components | `HeroSection.jsx`, `NarrativeSection.jsx`, `ServicesShowcaseSection.jsx`, `StrengthsSection.jsx`, `homeSectionsData.js` |
| `src/features/space-studio/` | 3D Space Studio state, UI controls, & modals | `useSpaceStudioState.js`, `StudioControlPanel.jsx`, `SavedDesignsModal.jsx`, `DesignEnquiryModal.jsx` |
| `src/features/services/` | Services consultation components | `EnquiryWizard.jsx` |
| `src/features/gallery/` | Spatial portfolio interactive components | `GalleryLightbox.jsx` |
| `src/features/contact/` | Contact & consultation wizard | `ContactEnquiryWizard.jsx` |
| `src/components/layout/` | Structural UI layout components | `Navbar.jsx`, `Footer.jsx` |
| `src/components/canvas/` | 3D Three.js & React Three Fiber scenes | `SpaceStudioCanvas.jsx`, `ArchitecturalRoom.jsx`, `ProcessWireframeCanvas.jsx`, `WebGLErrorBoundary.jsx` |
| `src/components/common/` | Shared micro-components | `ArchitecturalLine.jsx`, `Preloader.jsx`, `ScrollProgress.jsx`, `SEOHead.jsx`, `WhatsAppFab.jsx` |
| `src/pages/` | Slim page route entrypoints | `Home.jsx`, `About.jsx`, `Services.jsx`, `ServiceDetail.jsx`, `Gallery.jsx`, `Process.jsx`, `SpaceStudio.jsx`, `Contact.jsx`, `NotFound.jsx` |
| `src/styles/` | Modular CSS tokens & global sheets | `variables.css`, `base.css`, `components.css`, `animations.css` |

---

## 3. Data Flow & Verified Business Information

### Authoritative Business Identity (`src/data/siteData.js`)
All contact telephone numbers, WhatsApp numbers, studio street addresses, proprietor identity, and navigation items are declared strictly once:
- **Proprietor:** Mr. Abhishek Rao
- **Nature of Business:** Complete Interior, Finishing & Painting Studio
- **Address:** 29th Main, 39th Cross, 9th Block, Jayanagar, Bangalore - 560069
- **Phone / WhatsApp:** `+91 84949 50088`
- **Email:** `info.colournest@gmail.com`
- **LinkConnect Card Reference:** `https://card.linkconnect.in/colour-nest`

### Services Catalogue (`src/data/services.js`)
Contains the full 12 services:
1. `space-turnkey-interiors` (Space & Turnkey Interiors)
2. `interior-painting-luxury` (Interior Painting & Luxury Emulsions)
3. `venetian-stucco-italian` (Venetian Stucco & Italian Finishes)
4. `anticco-textured-finishes` (Anticco & Mineral Aggregate Finishes)
5. `royals-play-designer` (Royals Play & Designer Wall Textures)
6. `wood-polishing-melamyne-pu` (Wood Polishing, Melamyne & Polycoat Polish)
7. `waterproofing-damp-treatment` (Waterproofing & Substrate Damp Treatment)
8. `designer-wallpapers-murals` (Designer Wallpapers & Bespoke Wall Coverings)
9. `false-ceiling-lights-fans` (False Ceiling, Architectural Lights & Fans)
10. `exterior-painting-textures` (Exterior Painting & Weather-Shield Finishes)
11. `deep-cleaning-site-prep` (Deep Cleaning & Post-Paint Site Handover)
12. `commercial-retail-finishes` (Commercial, Retail & High-End Office Finishes)

Both the `Services.jsx` catalogue listing and `ServiceDetail.jsx` dynamic route consume `servicesData` directly, ensuring zero duplication.

---

## 4. 3D Space Studio Architecture

The Space Studio (`/space-studio`) provides interactive 3D spatial customization without coupling to unrelated page UI:

1. **State Isolation (`useSpaceStudioState.js`):**
   - Manages active surfaces (`wallLeft`, `wallBack`, `wallRight`, `floor`, `ceiling`, `wood`).
   - Manages lighting presets (`morning`, `noon`, `evening`, `gallery`).
   - Manages camera view transitions (`FRONT`, `CORNER`, `WIDE`, `CEILING`, `DETAIL`).
   - Manages LocalStorage save/restore for custom room configurations.
   - Dispatches structured project briefs to WhatsApp and Email enquiry modals.

2. **3D Canvas Layer (`SpaceStudioCanvas.jsx` + `ArchitecturalRoom.jsx`):**
   - Wraps the canvas inside `WebGLErrorBoundary` to present a graceful CSS fallback if the client's GPU lacks WebGL support.
   - Renders independent room meshes with procedural bump maps, reflections, and roughness mapping.
   - Walls are independently selectable via raycasting or UI button selection.

3. **Performance Optimization:**
   - Three.js and `@react-three/*` libraries are isolated into the `three-vendor` chunk (~845 kB) via Vite `manualChunks`.
   - Users browsing standard content pages (`Home`, `About`, `Services`, `Gallery`, `Contact`) never download the Three.js bundle until they navigate to a 3D route.

---

## 5. Performance, Chunking & Build Metrics

The Vite configuration (`vite.config.js`) enforces manual chunk separation:
- **`three-vendor`** (~845 kB / gzip: ~228 kB): Three.js, React Three Fiber, React Three Drei.
- **`motion-vendor`** (~206 kB / gzip: ~71 kB): Framer Motion, GSAP, Lenis.
- **`react-vendor`** (~178 kB / gzip: ~58 kB): React, React-DOM, React Router DOM, React Helmet Async.
- **Application Shell (`index.js`)** (~70 kB / gzip: ~26 kB): App entrypoint, Navbar, Footer, layout styles.
- **Route Chunks:** Each page is independently lazy-loaded and weighs between 2 kB and 66 kB.

---

## 6. Guidelines for Future Maintenance

1. **Do Not Invert Centralization:** Always add new services, projects, or contact methods to `src/data/`, never hardcoded into page JSX.
2. **Follow Feature-First Organization:** New subcomponents belong in `src/features/<domain>/components/`.
3. **Preserve Verified Business Copy:** Do not alter business identity, proprietor name, address, or phone numbers without official authorization.
4. **Preserve Brand Color Identity:** Brand colors are static architectural tokens (`#3C2D8C`, `#E3D9A4`, `#FAF8F2`, `#211D2D`) defined in `src/styles/variables.css`.
5. **Always Verify Builds:** Always execute `npm run build` to confirm zero lint, bundle, or chunk regression before completing tasks.

