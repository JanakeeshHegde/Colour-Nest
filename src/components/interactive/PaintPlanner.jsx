import React, { useState } from 'react';
import { Calculator, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaintPlanner = () => {
  const [rooms, setRooms] = useState(3);
  const [carpetArea, setCarpetArea] = useState(1200);
  const [coats, setCoats] = useState(2);
  const [includeCeilings, setIncludeCeilings] = useState(true);

  // Deterministic approximate calculations:
  // Wall surface area roughly = carpet area * 3.2 (with ceilings) or * 2.5 (without)
  const multiplier = includeCeilings ? 3.2 : 2.5;
  const estimatedSurfaceAreaSqFt = Math.round(carpetArea * multiplier);
  // Average coverage per liter of luxury emulsion: ~120-140 sq ft per coat
  const minLiters = Math.round((estimatedSurfaceAreaSqFt * coats) / 140);
  const maxLiters = Math.round((estimatedSurfaceAreaSqFt * coats) / 115);
  // Primer required: 1 coat
  const primerLiters = Math.round(estimatedSurfaceAreaSqFt / 130);

  return (
    <div className="arch-card" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <Calculator size={20} color="var(--accent)" />
        <span className="meta-tag">ARCHITECTURAL QUANTITY ESTIMATOR</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' }}>
        Surface &amp; Material Planning Calculator
      </h3>
      <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Estimate your spatial surface areas and paint material requirements before professional site inspection.
      </p>

      {/* Input Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            Carpet Area ({carpetArea} sq ft)
          </label>
          <input
            type="range"
            min="300"
            max="4500"
            step="50"
            value={carpetArea}
            onChange={(e) => setCarpetArea(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
            <span>300 sq ft</span>
            <span>4,500 sq ft</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            Number of Chambers / Rooms ({rooms})
          </label>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
            <span>1 Room</span>
            <span>8 Rooms</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            Application Coats ({coats})
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCoats(c)}
                className="filter-pill"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: coats === c ? 'var(--accent)' : 'var(--surface-elevated)',
                  color: coats === c ? '#FFFFFF' : 'var(--ink-primary)',
                  borderColor: coats === c ? 'var(--accent)' : 'var(--border-subtle)'
                }}
              >
                {c} {c === 1 ? 'Coat' : 'Coats'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ceiling Toggle Checkbox */}
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="checkbox"
          id="ceilingsCheck"
          checked={includeCeilings}
          onChange={(e) => setIncludeCeilings(e.target.checked)}
          style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
        />
        <label htmlFor="ceilingsCheck" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-primary)', cursor: 'pointer' }}>
          Include Gypsum False Ceiling &amp; Soffit Areas in Calculation
        </label>
      </div>

      {/* Results Output Matrix */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          backgroundColor: 'var(--surface-secondary)',
          padding: '1.75rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem'
        }}
      >
        <div>
          <span className="meta-tag" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>ESTIMATED SURFACE</span>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--ink-primary)' }}>
            ~{estimatedSurfaceAreaSqFt.toLocaleString()} <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>sq ft</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '2px' }}>Total paintable area</p>
        </div>

        <div>
          <span className="meta-tag" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>TOPCOAT MATERIAL</span>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--accent)' }}>
            {minLiters} – {maxLiters} <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>Liters</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '2px' }}>For {coats} finished coat(s)</p>
        </div>

        <div>
          <span className="meta-tag" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>PRIMER / BASECOAT</span>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--ink-primary)' }}>
            ~{primerLiters} <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>Liters</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '2px' }}>Deep bonding acrylic primer</p>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
        <Info size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
          <strong>Disclaimer:</strong> "Planning estimate only. Final quantity depends on actual site conditions and professional assessment."
        </p>
      </div>
    </div>
  );
};
