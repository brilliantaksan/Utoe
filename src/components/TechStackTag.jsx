import React from 'react';
import { getTechColor } from '../utils/colors';

export default function TechStackTag({ tech, size = 'default', className = '' }) {
  const color = getTechColor(tech);
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: '#EEF2F1',
        color: '#5F6F6B'
      }}
    >
      <span
        className="w-2 h-2 rounded-full mr-1.5"
        style={{ backgroundColor: color }}
      />
      {tech}
    </span>
  );
}
