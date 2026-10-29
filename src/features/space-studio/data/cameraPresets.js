/**
 * COLOUR NEST 3D SPACE STUDIO - AUTHORITATIVE CAMERA PRESETS
 * Coordinates tailored precisely to ArchitecturalRoom dimensions:
 * - Room Origin: [0, 0, 0]
 * - Back Wall: Z = -5.5, Y = 0 to 3.45, X = -7.0 to +7.0
 * - Left Window Wall: X = -7.0
 * - Right Fluted Wall: X = +7.0
 * - Ceiling: Y = 3.45
 * - Credenza: [-0.8, 0, -4.95]
 */

export const CAMERA_PRESETS = {
  FRONT: {
    id: 'FRONT',
    label: 'FRONT',
    position: [0, 1.65, 5.4],
    target: [0, 1.45, -2.0],
    fov: 45,
    description: 'Direct eye-level perspective facing the main feature wall and cabinetry'
  },
  CORNER: {
    id: 'CORNER',
    label: 'CORNER',
    position: [3.8, 1.75, 4.4],
    target: [-0.6, 1.4, -1.8],
    fov: 48,
    description: 'Diagonal perspective capturing the back wall, side wall, and floor'
  },
  WIDE: {
    id: 'WIDE',
    label: 'WIDE',
    position: [0, 1.85, 6.4],
    target: [0, 1.4, -1.6],
    fov: 54,
    description: 'Expansive wide-angle perspective showing the complete room volume'
  },
  LEFT: {
    id: 'LEFT',
    label: 'LEFT',
    position: [2.6, 1.65, 3.6],
    target: [-3.4, 1.45, -2.0],
    fov: 46,
    description: 'Focuses on the window wall, natural daylight, and lounge seating'
  },
  RIGHT: {
    id: 'RIGHT',
    label: 'RIGHT',
    position: [-2.6, 1.65, 3.6],
    target: [3.4, 1.45, -2.0],
    fov: 46,
    description: 'Focuses on the acoustic fluted timber panel and display niche'
  },
  TOP: {
    id: 'TOP',
    label: 'TOP',
    position: [0, 5.6, 2.6],
    target: [0, 0.3, -1.2],
    fov: 48,
    description: 'Overhead architectural view showing spatial layout and floor material'
  }
};

export default CAMERA_PRESETS;

