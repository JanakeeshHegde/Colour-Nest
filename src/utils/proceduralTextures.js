import * as THREE from 'three';

/**
 * COLOUR NEST 3D - High-Fidelity Procedural PBR Texture Engine
 * Generates lightweight, zero-latency, high-resolution architectural textures:
 * - Color / Albedo maps
 * - Normal maps (for realistic surface relief under grazing light)
 * - Roughness / Specular micro-variation maps
 */

const textureCache = new Map();

/**
 * Helper: Converts heightmap canvas data into a Three.js Normal Map Texture
 */
function createNormalMapFromHeight(canvas, strength = 1.0) {
  const width = canvas.width;
  const height = canvas.height;
  const srcCtx = canvas.getContext('2d');
  const srcData = srcCtx.getImageData(0, 0, width, height).data;

  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = width;
  normalCanvas.height = height;
  const normalCtx = normalCanvas.getContext('2d');
  const normalImg = normalCtx.createImageData(width, height);
  const out = normalImg.data;

  const getH = (x, y) => {
    const px = (x + width) % width;
    const py = (y + height) % height;
    return srcData[(py * width + px) * 4] / 255.0;
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const left = getH(x - 1, y);
      const right = getH(x + 1, y);
      const top = getH(x, y - 1);
      const bottom = getH(x, y + 1);

      const dx = (right - left) * strength;
      const dy = (bottom - top) * strength;
      const dz = 1.0;

      // Normalize vector
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = dx / len;
      const ny = dy / len;
      const nz = dz / len;

      // Pack into RGB [0..255]
      out[idx] = Math.floor((nx * 0.5 + 0.5) * 255);
      out[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      out[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      out[idx + 3] = 255;
    }
  }

  normalCtx.putImageData(normalImg, 0, 0);
  const texture = new THREE.CanvasTexture(normalCanvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * 1. Plaster & Stucco Normal and Roughness Maps
 */
export function getPlasterTexture(type = 'stucco') {
  const cacheKey = `plaster_${type}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;

  const amp = type === 'anticco' ? 28 : type === 'smooth' ? 10 : 20;

  for (let i = 0; i < data.length; i += 4) {
    const n1 = (Math.random() - 0.5) * amp;
    const n2 = (Math.random() - 0.5) * (amp * 0.5);
    const val = Math.min(255, Math.max(0, 128 + n1 + n2));
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  // Artisanal trowel strokes for Venetian Stucco
  if (type === 'stucco' || type === 'anticco') {
    ctx.lineWidth = type === 'anticco' ? 22 : 16;
    for (let j = 0; j < 18; j++) {
      const isWhite = Math.random() > 0.5;
      ctx.strokeStyle = isWhite ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
      ctx.beginPath();
      const sx = Math.random() * 512;
      const sy = Math.random() * 512;
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(
        sx + (Math.random() - 0.5) * 160, sy + (Math.random() - 0.5) * 120,
        sx + (Math.random() - 0.5) * 240, sy + (Math.random() - 0.5) * 180,
        sx + (Math.random() - 0.5) * 320, sy + (Math.random() - 0.5) * 240
      );
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  textureCache.set(cacheKey, texture);
  return texture;
}

export function getPlasterNormalTexture(type = 'stucco') {
  const cacheKey = `plaster_normal_${type}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const heightTex = getPlasterTexture(type);
  const normalTex = createNormalMapFromHeight(heightTex.image, type === 'anticco' ? 2.0 : 1.2);
  normalTex.repeat.set(4, 4);

  textureCache.set(cacheKey, normalTex);
  return normalTex;
}

/**
 * 2. Authentic Architectural Wood Grain Texture
 */
export function getWoodTexture(tone = 'warm') {
  const cacheKey = `wood_${tone}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  let baseCol = '#A65E32';
  let grainCol = '#6B3512';
  if (tone === 'natural' || tone === 'ash') {
    baseCol = '#CBB28A';
    grainCol = '#967852';
  } else if (tone === 'dark' || tone === 'walnut') {
    baseCol = '#3E2919';
    grainCol = '#201208';
  } else if (tone === 'polished') {
    baseCol = '#5C341E';
    grainCol = '#35180A';
  }

  ctx.fillStyle = baseCol;
  ctx.fillRect(0, 0, 512, 512);

  // Organic longitudinal grain lines with sinusoidal annual rings
  for (let y = 0; y < 512; y += 3) {
    const alpha = 0.12 + Math.sin(y * 0.04) * 0.08 + Math.random() * 0.08;
    ctx.strokeStyle = `${grainCol}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = 1.2 + Math.random() * 1.4;
    ctx.beginPath();
    ctx.moveTo(0, y + (Math.random() - 0.5) * 2);
    for (let x = 64; x <= 512; x += 64) {
      const wobble = Math.sin((x * 0.02) + (y * 0.015)) * 4 + (Math.random() - 0.5) * 1.5;
      ctx.lineTo(x, y + wobble);
    }
    ctx.stroke();
  }

  // Medullary rays (fine perpendicular specks common in quarter-sawn oak & teak)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let k = 0; k < 1200; k++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    ctx.fillRect(rx, ry, Math.random() * 6 + 2, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);

  textureCache.set(cacheKey, texture);
  return texture;
}

export function getWoodNormalTexture(tone = 'warm') {
  const cacheKey = `wood_normal_${tone}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const woodAlbedo = getWoodTexture(tone);
  const normalTex = createNormalMapFromHeight(woodAlbedo.image, 1.4);
  normalTex.repeat.set(2, 6);

  textureCache.set(cacheKey, normalTex);
  return normalTex;
}

/**
 * 3. Architectural Stone & Hardwood Flooring Texture
 */
export function getStoneTexture(type = 'stone') {
  const cacheKey = `stone_${type}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = type === 'concrete' ? '#8F9194' : '#D9D5CD';
  ctx.fillRect(0, 0, 512, 512);

  // Micro aggregates and subtle crystalline flecks
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = Math.random() * 1.8 + 0.4;
    const isBright = Math.random() > 0.5;
    ctx.fillStyle = isBright ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft marble vein for natural stone
  if (type === 'stone') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 120);
    ctx.bezierCurveTo(140, 190, 290, 130, 512, 380);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 122);
    ctx.bezierCurveTo(140, 192, 290, 132, 512, 382);
    ctx.stroke();
  }

  // Large-format architectural tile chamfer bevels
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
  ctx.lineWidth = 2;
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

export function getStoneNormalTexture(type = 'stone') {
  const cacheKey = `stone_normal_${type}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const stoneTex = getStoneTexture(type);
  const normalTex = createNormalMapFromHeight(stoneTex.image, 1.1);
  normalTex.repeat.set(4, 4);

  textureCache.set(cacheKey, normalTex);
  return normalTex;
}

/**
 * 4. Architectural Bouclé & Woven Linen Texture
 */
export function getFabricTexture() {
  if (textureCache.has('fabric')) return textureCache.get('fabric');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#E3DFD7';
  ctx.fillRect(0, 0, 256, 256);

  // Weave grid with tactile micro-relief
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

export function getFabricNormalTexture() {
  if (textureCache.has('fabric_normal')) return textureCache.get('fabric_normal');

  const fabricTex = getFabricTexture();
  const normalTex = createNormalMapFromHeight(fabricTex.image, 0.9);
  normalTex.repeat.set(8, 8);

  textureCache.set('fabric_normal', normalTex);
  return normalTex;
}
