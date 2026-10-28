import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  Bookmark,
  Share2,
  MessageCircle,
  FolderOpen,
  Edit2,
  Check,
  X,
  Palette,
  Layers,
  Sparkles,
  Maximize2,
  FileText
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';
import { IMAGE_MANIFEST } from '../data/imageManifest';
import { texturesData } from '../data/textures';
import { physicalSwatches } from '../data/colours';

// Curated library of items users can quickly add to their design board
const AVAILABLE_LIBRARY = {
  ROOMS: [
    {
      id: 'room-living',
      type: 'ROOM',
      name: 'Sculpted Living Pavilion',
      category: 'Living Space',
      image: IMAGE_MANIFEST['hero-architectural-main'].url,
      tag: 'Double Height • Stucco'
    },
    {
      id: 'room-bedroom',
      type: 'ROOM',
      name: 'Japandi Master Suite',
      category: 'Bed Chamber',
      image: IMAGE_MANIFEST['space-bedroom-refined'].url,
      tag: 'Timber Headboard • Linen'
    },
    {
      id: 'room-kitchen',
      type: 'ROOM',
      name: 'Architectural Culinary Studio',
      category: 'Kitchen Architecture',
      image: IMAGE_MANIFEST['space-kitchen-architectural'].url,
      tag: 'Honed Marble • Graphite'
    },
    {
      id: 'room-commercial',
      type: 'ROOM',
      name: 'Executive Collaborative Suite',
      category: 'Commercial Studio',
      image: IMAGE_MANIFEST['space-commercial-workspace'].url,
      tag: 'Acoustic Ceilings • Glass'
    }
  ],
  MATERIALS: [
    {
      id: 'mat-stucco',
      type: 'MATERIAL',
      name: 'Venetian Marble Stucco',
      category: 'Artisan Plaster',
      image: IMAGE_MANIFEST['material-stucco-finish'].url,
      tag: 'Zero VOC • Hand-Burnished'
    },
    {
      id: 'mat-anticco',
      type: 'MATERIAL',
      name: 'Anticco Tuscan Stone',
      category: 'Italian Texture',
      image: IMAGE_MANIFEST['material-anticco-texture'].url,
      tag: 'Aged Patina • Relief'
    },
    {
      id: 'mat-wood',
      type: 'MATERIAL',
      name: 'Burma Teak & PU Polish',
      category: 'Joinery & Timber',
      image: IMAGE_MANIFEST['material-wood-grain'].url,
      tag: 'Satin Sheen • Pore Fill'
    },
    {
      id: 'mat-polycoat',
      type: 'MATERIAL',
      name: 'Polycoat Crystal Sealer',
      category: 'Liquid Crystal Glass',
      image: IMAGE_MANIFEST['material-wood-polycoat'].url,
      tag: 'Mirror Depth • Hardness'
    },
    {
      id: 'mat-ceiling',
      type: 'MATERIAL',
      name: 'Gypsum Dropped Coves',
      category: 'False Ceiling',
      image: IMAGE_MANIFEST['architectural-false-ceiling'].url,
      tag: '3000K LED Grazing'
    },
    {
      id: 'mat-lighting',
      type: 'MATERIAL',
      name: 'Suspended Luminaire & Track',
      category: 'Smart Lighting',
      image: IMAGE_MANIFEST['architectural-lighting-pendant'].url,
      tag: 'Low-Glare Optics'
    }
  ],
  COLOURS: [
    { id: 'col-ivory', type: 'COLOUR', name: 'Warm Ivory', hex: '#FAF7F2', category: 'Base Surface' },
    { id: 'col-clay', type: 'COLOUR', name: 'Terracotta Clay', hex: '#B85C38', category: 'Accent Feature' },
    { id: 'col-sage', type: 'COLOUR', name: 'Botanical Sage', hex: '#7A8B7B', category: 'Restorative Wall' },
    { id: 'col-sand', type: 'COLOUR', name: 'Sandstone Greige', hex: '#D6C7A1', category: 'Balancing Hue' },
    { id: 'col-charcoal', type: 'COLOUR', name: 'Architectural Charcoal', hex: '#2B2D2F', category: 'Hardware & Trims' },
    { id: 'col-teak', type: 'COLOUR', name: 'Burma Teak Amber', hex: '#7E5233', category: 'Joinery Tone' }
  ]
};

export const DesignBoard = () => {
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState('My Curated Spatial Concept');
  const [boardNotes, setBoardNotes] = useState('An understated architectural palette pairing burnished lime stucco with warm honeyed teak and stratified perimeter cove lighting.');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Initial board items
  const [boardItems, setBoardItems] = useState([
    AVAILABLE_LIBRARY.ROOMS[0],
    AVAILABLE_LIBRARY.MATERIALS[0],
    AVAILABLE_LIBRARY.MATERIALS[2],
    AVAILABLE_LIBRARY.COLOURS[1],
    AVAILABLE_LIBRARY.COLOURS[0]
  ]);

  // Saved boards in localStorage
  const [savedBoards, setSavedBoards] = useState(() => {
    try {
      const data = localStorage.getItem('colournest_saved_boards');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Add item to board
  const handleAddItem = (item) => {
    const uniqueItem = { ...item, instanceId: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4) };
    setBoardItems([...boardItems, uniqueItem]);
    showToast(`Added ${item.name} to design board`);
  };

  // Remove item from board
  const handleRemoveItem = (index) => {
    const updated = boardItems.filter((_, idx) => idx !== index);
    setBoardItems(updated);
    showToast('Removed element from board');
  };

  // Move item up / down
  const handleMoveItem = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= boardItems.length) return;
    const updated = [...boardItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setBoardItems(updated);
  };

  // Save current board to localStorage
  const handleSaveBoard = () => {
    const newBoard = {
      id: 'board-' + Date.now(),
      title: boardTitle,
      notes: boardNotes,
      items: boardItems,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updated = [newBoard, ...savedBoards.slice(0, 5)];
    setSavedBoards(updated);
    try {
      localStorage.setItem('colournest_saved_boards', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    showToast('Design board successfully saved to local portfolio');
  };

  // Restore saved board
  const handleRestoreBoard = (board) => {
    if (!board) return;
    setBoardTitle(board.title || 'Untitled Board');
    setBoardNotes(board.notes || '');
    setBoardItems(board.items || []);
    setIsSavedModalOpen(false);
    showToast(`Restored: ${board.title}`);
  };

  // Real PNG Snapshot Generator using HTML5 Canvas
  const handleExportPNG = () => {
    if (boardItems.length === 0) {
      showToast('Cannot export empty board');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#141517';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative grid line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Header text
    ctx.fillStyle = '#B85C38';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('COLOUR NEST • SPATIAL DESIGN BOARD', 60, 75);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px serif';
    ctx.fillText(boardTitle.toUpperCase(), 60, 115);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '14px sans-serif';
    ctx.fillText(boardNotes.slice(0, 110) + '...', 60, 145);

    // Grid layout for cards
    const startX = 60;
    const startY = 180;
    const cardWidth = 240;
    const cardHeight = 260;
    const gap = 30;

    boardItems.slice(0, 8).forEach((item, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const x = startX + col * (cardWidth + gap);
      const y = startY + row * (cardHeight + gap);

      // Card card background
      ctx.fillStyle = '#1E2024';
      ctx.fillRect(x, y, cardWidth, cardHeight);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(x, y, cardWidth, cardHeight);

      if (item.type === 'COLOUR') {
        // Color block
        ctx.fillStyle = item.hex;
        ctx.fillRect(x + 15, y + 15, cardWidth - 30, 140);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeRect(x + 15, y + 15, cardWidth - 30, 140);
      } else {
        // Fallback banner for image items
        ctx.fillStyle = '#2C3038';
        ctx.fillRect(x + 15, y + 15, cardWidth - 30, 140);
        ctx.fillStyle = '#B85C38';
        ctx.font = '11px monospace';
        ctx.fillText(item.type, x + 25, y + 90);
      }

      // Metadata
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '10px monospace';
      ctx.fillText(item.category || item.type, x + 15, y + 185);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(item.name.slice(0, 22), x + 15, y + 210);

      if (item.hex) {
        ctx.fillStyle = '#B85C38';
        ctx.font = '12px monospace';
        ctx.fillText(item.hex, x + 15, y + 235);
      } else if (item.tag) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '11px sans-serif';
        ctx.fillText(item.tag.slice(0, 26), x + 15, y + 235);
      }
    });

    // Footer signature
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '11px monospace';
    ctx.fillText('Mr. Abhishek Rao • Colour Nest Interior Studio Bangalore • +91 84949 50088', 60, canvas.height - 45);

    // Export PNG download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `COLOUR-NEST-DESIGN-BOARD-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Design Board exported as real PNG file');
  };

  // WhatsApp Enquiry construction
  const generateWhatsAppUrl = () => {
    const summary = boardItems
      .map((item, idx) => `  ${idx + 1}. [${item.type}] ${item.name} ${item.hex ? `(${item.hex})` : ''}`)
      .join('\n');

    const msg =
      `Hello COLOUR NEST,\n\n` +
      `I have built an interior concept on the Design Board tool:\n\n` +
      `• Board Title: ${boardTitle}\n` +
      `• Project Notes: ${boardNotes}\n\n` +
      `Selected Elements:\n${summary}\n\n` +
      `Please review this design direction and advise on sample inspection & project feasibility.`;

    return `https://wa.me/918494950088?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <SEOHead
        title="Interactive Design Board — Curate Your Interior Palette | COLOUR NEST"
        description="Build and organize a personalized interior design inspiration board. Combine Italian stucco plasters, natural timber grains, and designer architectural colours."
      />

      <div style={{ backgroundColor: '#101113', minHeight: '100vh', color: '#FFFFFF', paddingTop: '6.5rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.2rem, 4vw, 3rem)' }}>
          {/* ------------------------------------------------------------- */}
          {/* HEADER & CONTROLS                                             */}
          {/* ------------------------------------------------------------- */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ maxWidth: '750px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent, #B85C38)', fontWeight: 700 }}>
                INTERACTIVE INTERIOR MOODBOARD
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.3rem' }}>
                {isEditingTitle ? (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={boardTitle}
                      onChange={(e) => setBoardTitle(e.target.value)}
                      style={{
                        backgroundColor: '#1E2024',
                        border: '1px solid var(--accent, #B85C38)',
                        color: '#FFFFFF',
                        fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                        fontFamily: 'var(--font-display, serif)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px'
                      }}
                    />
                    <button
                      onClick={() => setIsEditingTitle(false)}
                      style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#FFF', padding: '0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Check size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', margin: 0, letterSpacing: '-0.02em' }}>
                      {boardTitle}
                    </h1>
                    <button
                      onClick={() => setIsEditingTitle(true)}
                      style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '0.3rem' }}
                      title="Edit board title"
                    >
                      <Edit2 size={16} />
                    </button>
                  </>
                )}
              </div>

              {/* Editable Notes */}
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setBoardNotes(e.currentTarget.textContent || '')}
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  marginTop: '0.8rem',
                  outline: 'none',
                  borderBottom: '1px dashed rgba(255,255,255,0.2)',
                  paddingBottom: '0.4rem'
                }}
                title="Click to edit design notes"
              >
                {boardNotes}
              </p>
            </div>

            {/* Actions: Save, Saved Boards, Export PNG, Enquiry */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={handleSaveBoard}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <Bookmark size={14} />
                <span>SAVE BOARD</span>
              </button>

              <button
                onClick={() => setIsSavedModalOpen(true)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <FolderOpen size={14} />
                <span>SAVED ({savedBoards.length})</span>
              </button>

              <button
                onClick={handleExportPNG}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <Download size={14} />
                <span>EXPORT PNG</span>
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'var(--accent, #B85C38)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 18px rgba(184, 92, 56, 0.4)'
                }}
              >
                <MessageCircle size={14} />
                <span>ENQUIRE WITH BOARD</span>
              </a>
            </div>
          </div>

          <ArchitecturalLine />

          {/* ------------------------------------------------------------- */}
          {/* THE BOARD: ACTIVE CARDS GRID                                  */}
          {/* ------------------------------------------------------------- */}
          <div style={{ margin: '2.5rem 0 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em' }}>
                CURRENT BOARD ELEMENTS ({boardItems.length})
              </span>
              {boardItems.length > 0 && (
                <button
                  onClick={() => setBoardItems([])}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                >
                  CLEAR BOARD
                </button>
              )}
            </div>

            {boardItems.length === 0 ? (
              /* Useful Empty State */
              <div
                style={{
                  border: '2px dashed rgba(255,255,255,0.12)',
                  borderRadius: '16px',
                  padding: '4.5rem 2rem',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255,255,255,0.01)'
                }}
              >
                <Layers size={36} color="var(--accent, #B85C38)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '0 0 0.5rem' }}>
                  Your Design Board is Empty
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.88rem' }}>
                  Select rooms, tactile materials, or architectural colours from the library drawer below to start composing your interior sanctuary.
                </p>
                <button
                  onClick={() => handleAddItem(AVAILABLE_LIBRARY.ROOMS[0])}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  + ADD SAMPLE LIVING ROOM
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.4rem'
                }}
              >
                {boardItems.map((item, idx) => (
                  <motion.div
                    key={item.instanceId || `${item.id}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      backgroundColor: 'rgba(24, 25, 27, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                      position: 'relative'
                    }}
                  >
                    {/* Visual Media or Color Swatch */}
                    {item.type === 'COLOUR' ? (
                      <div
                        style={{
                          height: '170px',
                          backgroundColor: item.hex,
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '1rem'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(8px)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            color: '#FFFFFF'
                          }}
                        >
                          {item.hex}
                        </span>
                      </div>
                    ) : (
                      <div style={{ height: '170px', position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,21,23,0.85) 0%, transparent 60%)' }} />
                        <span
                          style={{
                            position: 'absolute',
                            top: '0.8rem',
                            left: '0.8rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            letterSpacing: '0.12em',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(6px)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            color: 'var(--accent)'
                          }}
                        >
                          {item.type}
                        </span>
                      </div>
                    )}

                    {/* Card Content & Meta */}
                    <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>
                          {item.category}
                        </span>
                        <h4 style={{ margin: '0.2rem 0 0.4rem', color: '#FFFFFF', fontSize: '1rem', lineHeight: 1.3 }}>
                          {item.name}
                        </h4>
                        {item.tag && (
                          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Reorder and Delete Controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.7rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button
                            onClick={() => handleMoveItem(idx, -1)}
                            disabled={idx === 0}
                            style={{
                              background: 'none',
                              border: '1px solid rgba(255,255,255,0.15)',
                              color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#FFFFFF',
                              borderRadius: '4px',
                              padding: '0.25rem',
                              cursor: idx === 0 ? 'default' : 'pointer'
                            }}
                            title="Move item left"
                          >
                            <ArrowUp size={12} style={{ transform: 'rotate(-90deg)' }} />
                          </button>
                          <button
                            onClick={() => handleMoveItem(idx, 1)}
                            disabled={idx === boardItems.length - 1}
                            style={{
                              background: 'none',
                              border: '1px solid rgba(255,255,255,0.15)',
                              color: idx === boardItems.length - 1 ? 'rgba(255,255,255,0.2)' : '#FFFFFF',
                              borderRadius: '4px',
                              padding: '0.25rem',
                              cursor: idx === boardItems.length - 1 ? 'default' : 'pointer'
                            }}
                            title="Move item right"
                          >
                            <ArrowDown size={12} style={{ transform: 'rotate(-90deg)' }} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.4)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            fontSize: '0.72rem'
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <ArchitecturalLine />

          {/* ------------------------------------------------------------- */}
          {/* CURATED LIBRARY DRAWER: CLICK TO ADD                          */}
          {/* ------------------------------------------------------------- */}
          <div style={{ marginTop: '3.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700 }}>
              CURATED MATERIAL DRAWER
            </span>
            <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.8rem', margin: '0.3rem 0 1.5rem', color: '#FFFFFF' }}>
              Add Spatial Elements to Your Board
            </h2>

            {/* Sub-tabs for library: Rooms, Materials, Colours */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* 1. ROOM CONCEPTS */}
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.8rem' }}>
                  01 • SPATIAL TYPOLOGIES
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {AVAILABLE_LIBRARY.ROOMS.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => handleAddItem(room)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <img src={room.image} alt={room.name} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {room.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{room.category}</div>
                      </div>
                      <Plus size={16} color="var(--accent)" />
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. TACTILE MATERIALS */}
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.8rem' }}>
                  02 • SURFACE MATERIALS & TEXTURES
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {AVAILABLE_LIBRARY.MATERIALS.map((mat) => (
                    <div
                      key={mat.id}
                      onClick={() => handleAddItem(mat)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <img src={mat.image} alt={mat.name} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {mat.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{mat.category}</div>
                      </div>
                      <Plus size={16} color="var(--accent)" />
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. COLOUR PALETTES */}
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.8rem' }}>
                  03 • CURATED ARCHITECTURAL COLOURS
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {AVAILABLE_LIBRARY.COLOURS.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => handleAddItem(col)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: col.hex, border: '1px solid rgba(255,255,255,0.2)' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFF' }}>{col.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>{col.hex}</div>
                      </div>
                      <Plus size={16} color="var(--accent)" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SAVED BOARDS MODAL                                            */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {isSavedModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              <div
                style={{
                  backgroundColor: '#18191B',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                  padding: '2rem',
                  maxWidth: '520px',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '1.3rem', fontFamily: 'var(--font-display)' }}>
                    Saved Design Boards ({savedBoards.length})
                  </h3>
                  <button
                    onClick={() => setIsSavedModalOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: 0 }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {savedBoards.length === 0 ? (
                    <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem 0' }}>
                      No saved boards found in your local browser portfolio.
                    </div>
                  ) : (
                    savedBoards.map((b) => (
                      <div
                        key={b.id}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '0.85rem 1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600 }}>{b.title}</div>
                          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                            {b.items?.length || 0} Elements • Saved on {b.date}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRestoreBoard(b)}
                          style={{
                            backgroundColor: 'var(--accent)',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.45rem 0.85rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            cursor: 'pointer'
                          }}
                        >
                          LOAD
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setIsSavedModalOpen(false)}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.65rem 1.2rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{
                position: 'fixed',
                bottom: '2.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(20, 21, 23, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--accent, #B85C38)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '0.75rem 1.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                zIndex: 120,
                boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
              }}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DesignBoard;
