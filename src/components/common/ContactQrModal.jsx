import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Download, Share2, Copy, Check } from 'lucide-react';
import { siteData } from '../../data/siteData';

export const ContactQrModal = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const profileUrl = "https://card.linkconnect.in/colour-nest";

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(profileUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1C1A18',
          light: '#FAF7F2'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [isOpen]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'Colour-Nest-QR.png';
    link.href = qrDataUrl;
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: 'rgba(18, 18, 19, 0.85)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="arch-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--surface-primary)',
          textAlign: 'center',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-primary)'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <span className="meta-tag" style={{ marginBottom: '1rem' }}>
          DIGITAL ARCHITECTURAL CARD
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.4rem' }}>
          COLOUR NEST
        </h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>
          {siteData.owner.name} • {siteData.owner.title}
        </p>

        {/* QR Code Container */}
        <div
          style={{
            display: 'inline-block',
            padding: '1.25rem',
            backgroundColor: '#FAF7F2',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-medium)'
          }}
        >
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Colour Nest QR Code"
              style={{ width: '220px', height: '220px', display: 'block' }}
            />
          ) : (
            <div style={{ width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Generating QR...
            </div>
          )}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.75rem' }}>
          Scan to access Colour Nest studio profile, save contact coordinates, or open on mobile.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleDownload}
            className="btn-primary"
            style={{ flex: 1, padding: '0.8rem 1rem', fontSize: '0.75rem' }}
          >
            <Download size={15} />
            <span>Download QR</span>
          </button>
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{ flex: 1, padding: '0.8rem 1rem', fontSize: '0.75rem' }}
          >
            {copied ? <Check size={15} color="var(--accent)" /> : <Copy size={15} />}
            <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
