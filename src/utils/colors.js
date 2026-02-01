import { techStackColors } from '../data/techStacks';

// Semantic cluster colors from design.json
const semanticColors = {
  AI: '#8FBFB6',
  ML: '#8FBFB6',
  TensorFlow: '#8FBFB6',
  PyTorch: '#8FBFB6',
  
  // Startup/Fast-moving
  React: '#F0A37A',
  Node: '#F0A37A',
  TypeScript: '#F0A37A',
  
  // Systems/Rust
  Rust: '#9DB8A0',
  Go: '#9DB8A0',
  WebAssembly: '#9DB8A0',
  
  // Junior-friendly
  Python: '#E7A39A',
  JavaScript: '#E7A39A',
  Vue: '#E7A39A'
};

/**
 * Get color for a tech stack with semantic clustering
 * @param {string} tech - Tech stack name
 * @returns {string} Hex color code
 */
export const getTechColor = (tech) => {
  return semanticColors[tech] || techStackColors[tech] || '#A0A0A0';
};

/**
 * Get color with opacity
 * @param {string} color - Hex color
 * @param {number} opacity - Opacity (0-1)
 * @returns {string} RGBA color string
 */
export const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Get primary tech stack color for a student
 * @param {string[]} techStack - Array of tech stacks
 * @returns {string} Hex color code
 */
export const getPrimaryTechColor = (techStack) => {
  if (!techStack || techStack.length === 0) return '#A0A0A0';
  return getTechColor(techStack[0]);
};

/**
 * Darken a hex color for better contrast
 * @param {string} hex - Hex color
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} Darkened hex color
 */
export const darkenColor = (hex, percent) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};
