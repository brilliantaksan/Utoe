/**
 * Clustering utilities for the talent map
 */

/**
 * Group students by their primary tech stack
 * @param {Array} students - Array of student objects
 * @returns {Object} Grouped students by tech stack
 */
export const groupByTechStack = (students) => {
  const groups = {};
  
  students.forEach(student => {
    const primaryTech = student.techStack[0] || 'Other';
    if (!groups[primaryTech]) {
      groups[primaryTech] = [];
    }
    groups[primaryTech].push(student);
  });
  
  return groups;
};

/**
 * Calculate initial positions for force simulation
 * Groups are positioned in a circle, nodes within groups are clustered
 * @param {Array} students - Array of student objects
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {Array} Students with initial x, y positions
 */
export const calculateInitialPositions = (students, width, height) => {
  const groups = groupByTechStack(students);
  const groupNames = Object.keys(groups);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.3;
  
  const nodesWithPositions = [];
  
  groupNames.forEach((groupName, groupIndex) => {
    const angle = (groupIndex / groupNames.length) * 2 * Math.PI;
    const groupX = centerX + radius * Math.cos(angle);
    const groupY = centerY + radius * Math.sin(angle);
    
    groups[groupName].forEach((student, nodeIndex) => {
      // Add some randomness within the group
      const offsetX = (Math.random() - 0.5) * 50;
      const offsetY = (Math.random() - 0.5) * 50;
      
      nodesWithPositions.push({
        ...student,
        x: groupX + offsetX,
        y: groupY + offsetY,
        group: groupName
      });
    });
  });
  
  return nodesWithPositions;
};

/**
 * Create force simulation configuration
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {Object} Force configuration
 */
export const getForceConfig = (width, height) => {
  return {
    charge: -150, // Repulsion between nodes
    collisionRadius: 30, // Minimum distance between nodes
    centerStrength: 0.05, // Pull towards center
    linkDistance: 80, // Distance between connected nodes (if any)
    alphaDecay: 0.02 // How quickly simulation settles
  };
};
