import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Download, QrCode, Facebook, ExternalLink, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { siteData } from '../data/siteData';
import { EnquiryWizard } from '../components/interactive/EnquiryWizard';
import { ContactQrModal } from '../components/common/ContactQrModal';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const Contact = () => {
  const location = useLocation();
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Incoming state from Colour Studio or Style Finder
  const incomingPalette = location.state?.paletteName
    ? { name: location.state.paletteName, colors: location.state.colors }
    : null;
  const incomingService = location.state?.suggestedService || '';

  // Generate vCard download
  const handleDownloadVcard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Rao;Abhishek;;Mr.;
FN:Mr. Abhishek Rao - Colour Nest
ORG:COLOUR NEST;Painting & Interior Decor
TITLE:Proprietor & Consultant
TEL;TYPE=CELL,VOICE:${siteData.contact.phone}
EMAIL;TYPE=WORK,INTERNET:${siteData.contact.email}
ADR;TYPE=WORK:;;29th Main\\, 39th Cross\\, 9th Block;Jayanagar;Bangalore;560069;India
URL:https://card.linkconnect.in/colour-nest
NOTE:Painting and Interiors specialist in Bangalore
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Colour-Nest-Abhishek-Rao.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEOHead
        title="Contact Studio — Consultation & Coordinates"
        description="Connect with Mr. Abhishek Rao, Proprietor & Consultant at Colour Nest. 29th Main, 39th Cross, 9th Block, Jayanagar, Bangalore. Direct WhatsApp, call, and consultation wizard."
      />

      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 2.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: 'var(--surface-primary)',
          minHeight: '100vh'
        }}
      >
        <div className="container-wide">
          {/* Header */}
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              DIRECT ARCHITECTURAL CONSULTATION
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              LET'S TRANSFORM <br />
              <span className="heading-editorial-italic">YOUR SPACE.</span>
            </h1>
            <ArchitecturalLine label="OFFICIAL STUDIO COORDINATES" coordinates="JAYANAGAR 9TH BLOCK, BANGALORE - 560069" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Consult directly with proprietor Mr. Abhishek Rao. Whether scheduling an on-site moisture &amp; light survey
              or reviewing physical texture boards, we are here to assist.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'start'
            }}
          >
            {/* LEFT: STUDIO COORDINATES & DIRECT ACTIONS (5 Cols) */}
            <div style={{ gridColumn: 'span 12' }} className="contact-info-col">
              <div className="arch-card" style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>
                <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                  STUDIO IDENTIFIER
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '0.25rem' }}>
                  COLOUR NEST
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  {siteData.tagline}
                </p>

                <div style={{ padding: '1rem', backgroundColor: 'var(--surface-secondary)', borderRadius: 'var(--radius-xs)', marginBottom: '1.75rem' }}>
                  <strong style={{ fontSize: '1rem', display: 'block' }}>{siteData.owner.name}</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{siteData.owner.title}</span>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <MapPin size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>Physical Studio:</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginTop: '2px' }}>
                      {siteData.contact.address.formatted}
                    </p>
                  </div>
                </div>

                {/* Direct Action Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '2rem' }}>
                  <a
                    href={`tel:${siteData.contact.phone}`}
                    className="btn-primary"
                    style={{ padding: '0.75rem 0.5rem', fontSize: '0.72rem' }}
                    data-cursor="CALL"
                  >
                    <Phone size={14} />
                    <span>Call Direct</span>
                  </a>
                  <a
                    href={siteData.urls.whatsappDirect}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ padding: '0.75rem 0.5rem', fontSize: '0.72rem', backgroundColor: '#25D366' }}
                    data-cursor="WHATSAPP"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${siteData.contact.email}`}
                    className="btn-secondary"
                    style={{ padding: '0.75rem 0.5rem', fontSize: '0.72rem' }}
                    data-cursor="EMAIL"
                  >
                    <Mail size={14} />
                    <span>Email Studio</span>
                  </a>
                  <a
                    href={siteData.urls.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.75rem 0.5rem', fontSize: '0.72rem' }}
                    data-cursor="MAPS"
                  >
                    <ExternalLink size={14} />
                    <span>Directions</span>
                  </a>
                </div>

                {/* Digital Card & QR Downloads */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={handleDownloadVcard}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }}
                    data-cursor="DOWNLOAD"
                  >
                    <Download size={14} />
                    <span>Add To Phone Book (.vcf)</span>
                  </button>
                  <button
                    onClick={() => setQrModalOpen(true)}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }}
                    data-cursor="QR"
                  >
                    <QrCode size={14} />
                    <span>View &amp; Save Studio QR Code</span>
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="arch-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Facebook size={20} color="var(--accent)" />
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>Facebook Updates</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Follow project dispatches</span>
                  </div>
                </div>
                <a
                  href={siteData.urls.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: '0.72rem' }}
                >
                  <span>Visit Page</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* RIGHT: CONSULTATION WIZARD (7 Cols) */}
            <div style={{ gridColumn: 'span 12' }} className="contact-wizard-col">
              <EnquiryWizard initialService={incomingService} initialPalette={incomingPalette} />
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      <ContactQrModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />

      <style>{`
        @media (min-width: 1024px) {
          .contact-info-col { grid-column: span 5 !important; }
          .contact-wizard-col { grid-column: span 7 !important; }
        }
      `}</style>
    </>
  );
};
