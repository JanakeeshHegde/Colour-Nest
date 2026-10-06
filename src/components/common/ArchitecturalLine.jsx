import React from 'react';

export const ArchitecturalLine = ({ label = 'SURFACE • 01', coordinates = '12.9250° N, 77.5938° E' }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        margin: '2rem 0',
        userSelect: 'none',
        opacity: 0.75
      }}
    >
      <div
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--accent)',
          borderRadius: '50%'
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          whiteSpace: 'nowrap'
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          backgroundColor: 'var(--border-subtle)',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            right: '20%',
            width: '5px',
            height: '5px',
            borderRight: '1px solid var(--border-medium)',
            borderTop: '1px solid var(--border-medium)'
          }}
        />
      </div>
      {coordinates && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            color: 'var(--ink-faint)',
            whiteSpace: 'nowrap'
          }}
        >
          {coordinates}
        </span>
      )}
    </div>
  );
};
