import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from './WhatsAppIcon';
import { siteData } from '../../data/siteData';

export const WhatsAppFab = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isSpaceStudio = location.pathname === '/space-studio';

  if (isSpaceStudio) return null;

  return (
    <aside aria-label="Quick WhatsApp Consultation">
      <a
        href={siteData.urls.whatsappDirect}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        data-cursor="CALL"
        aria-label="Get a free consultation on WhatsApp"
        title="Chat with Colour Nest on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <WhatsAppIcon size={28} color="#FFFFFF" className="whatsapp-fab-icon" />
        <span style={{ whiteSpace: 'nowrap' }}>
          {isHovered ? 'GET A FREE CONSULTATION' : 'CONSULT ON WHATSAPP'}
        </span>
      </a>

      {/* Sticky Mobile Bar */}
      <div className="mobile-consult-bar">
        <a
          href={`tel:${siteData.contact.phone}`}
          className="btn-secondary"
          style={{ flex: 1, padding: '0.65rem 0.5rem', fontSize: '0.72rem' }}
        >
          Call Studio
        </a>
        <a
          href={siteData.urls.whatsappDirect}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            flex: 1.4,
            padding: '0.65rem 0.5rem',
            fontSize: '0.72rem',
            backgroundColor: '#25D366',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <WhatsAppIcon size={16} color="#FFFFFF" />
          <span>Consult on WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};

export default WhatsAppFab;
