import * as THREE from 'three';

/**
 * Procedural Texture Utilities for Colour Nest 3D
 * Generates lightweight, zero-bandwidth, high-fidelity CanvasTextures
 * with realistic micro-relief, subtle grain, and architectural tactile qualities.
 */

// Cache textures to avoid recreating on each render
const textureCache = new Map();

/**
 * Procedural Plaster / Stucco Bump & Roughness Texture
 */
export function getPlasterTexture() {
  if (textureCache.has('plaster')) return textureCache.get('plaster');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;

  // Multi-frequency noise for lime plaster & Venetian stucco micro-relief
  for (let i = 0; i < data.length; i += 4) {
    const noise1 = (Math.random() - 0.5) * 32;
    const noise2 = (Math.random() - 0.5) * 16;
    const val = Math.min(255, Math.max(0, 128 + noise1 + noise2));
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  // Soft spatula blade strokes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 14;
  for (let j = 0; j < 12; j++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 512);
    ctx.bezierCurveTo(
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512
    );
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  textureCache.set('plaster', texture);
  return texture;
}

/**
 * Procedural Wood Grain Texture
 */
export function getWoodTexture(tone = 'natural') {
  const cacheKey = `wood_${tone}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  let baseCol = '#C49A6C';
  let grainCol = '#8F663C';
  if (tone === 'dark') {
    baseCol = '#3D2817';
    grainCol = '#241408';
  } else if (tone === 'warm') {
    baseCol = '#9C582B';
    grainCol = '#6B3512';
  } else if (tone === 'polished') {
    baseCol = '#5A361F';
    grainCol = '#381C0B';
  }

  ctx.fillStyle = baseCol;
  ctx.fillRect(0, 0, 512, 512);

  // Linear grain rings
  ctx.strokeStyle = grainCol;
  for (let y = 0; y < 512; y += 4) {
    const alpha = 0.15 + Math.sin(y * 0.05) * 0.1 + Math.random() * 0.1;
    ctx.strokeStyle = `${grainCol}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = 1.5 + Math.random();
    ctx.beginPath();
    ctx.moveTo(0, y + (Math.random() - 0.5) * 3);
    for (let x = 64; x <= 512; x += 64) {
      const wobble = Math.sin((x + y) * 0.03) * 6;
      ctx.lineTo(x, y + wobble);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Procedural Stone / Polished Concrete Floor Texture
 */
export function getStoneTexture(type = 'stone') {
  const cacheKey = `stone_${type}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = type === 'concrete' ? '#8A8D8F' : '#D1CBC4';
  ctx.fillRect(0, 0, 512, 512);

  // Micro aggregates
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = Math.random() * 2 + 0.5;
    const shade = Math.random() > 0.5 ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)';
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft marble vein for stone
  if (type === 'stone') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.bezierCurveTo(150, 180, 300, 120, 512, 350);
    ctx.stroke();
  }

  // Large format architectural tile joints
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, 512, 512);
  ctx.strokeRect(256, 0, 256, 512);
  ctx.strokeRect(0, 256, 512, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Procedural Bouclé / Linen Fabric Texture
 */
export function getFabricTexture() {
  if (textureCache.has('fabric')) return textureCache.get('fabric');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#E3DFD7';
  ctx.fillRect(0, 0, 256, 256);

  // Weave grid
  for (let x = 0; x < 256; x += 4) {
    for (let y = 0; y < 256; y += 4) {
      const isAlt = (x / 4 + y / 4) % 2 === 0;
      ctx.fillStyle = isAlt ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
      ctx.fillRect(x, y, 4, 4);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);

  textureCache.set('fabric', texture);
  return texture;
}
