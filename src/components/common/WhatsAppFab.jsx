import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteData } from '../../data/siteData';

export const WhatsAppFab = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside aria-label="Quick WhatsApp Consultation">
      <a
        href={siteData.urls.whatsappDirect}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        data-cursor="CALL"
        aria-label="Get a free consultation on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className="whatsapp-fab-icon" />
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
          style={{ flex: 1.4, padding: '0.65rem 0.5rem', fontSize: '0.72rem', backgroundColor: '#25D366' }}
        >
          Consult on WhatsApp
        </a>
      </div>
    </aside>
  );
};
