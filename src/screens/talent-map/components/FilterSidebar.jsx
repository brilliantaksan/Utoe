import React from 'react';
import { X, Filter } from 'lucide-react';
import { allTechStacks } from '../../../data/techStacks';
import { useData } from '../../../contexts/DataContext';

export default function FilterSidebar({ isOpen, onClose }) {
  const { filters, updateFilters, resetFilters, students } = useData();

  const handleTechToggle = (tech) => {
    const newTechStack = filters.techStack.includes(tech)
      ? filters.techStack.filter(t => t !== tech)
      : [...filters.techStack, tech];
    updateFilters({ techStack: newTechStack });
  };

  const handleAvailabilityToggle = (status) => {
    const newAvailability = filters.availability.includes(status)
      ? filters.availability.filter(s => s !== status)
      : [...filters.availability, status];
    updateFilters({ availability: newAvailability });
  };

  // Count students per tech stack
  const techCounts = {};
  students.forEach(student => {
    student.techStack.forEach(tech => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });

  // Count students per availability
  const availabilityCounts = {
    available: students.filter(s => s.availability === 'available').length,
    open: students.filter(s => s.availability === 'open').length,
    'not-looking': students.filter(s => s.availability === 'not-looking').length
  };

  const popularTechs = allTechStacks
    .filter(tech => techCounts[tech] > 0)
    .sort((a, b) => (techCounts[b] || 0) - (techCounts[a] || 0));

  if (!isOpen) {
    return (
      <button
        onClick={onClose}
        className="fixed left-6 top-6 z-40 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
      >
        <Filter className="w-5 h-5 text-[#7A7A7A]" />
      </button>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-[280px] bg-[#F7F3EE] shadow-xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#F7F3EE] border-b border-black/5 p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#7A7A7A]" />
          <h2 className="text-lg font-semibold text-[#3A3A3A]">Filters</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-[#7A7A7A]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Tech Stack Filter */}
        <div>
          <h3 className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide mb-3">
            Tech Stack
          </h3>
          <div className="space-y-2">
            {popularTechs.map(tech => (
              <label
                key={tech}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.techStack.includes(tech)}
                  onChange={() => handleTechToggle(tech)}
                  className="w-4 h-4 rounded border-gray-300 text-[#8FBFB6] focus:ring-[#8FBFB6] focus:ring-offset-0"
                />
                <span className="flex-1 text-sm text-[#3A3A3A]">{tech}</span>
                <span className="text-xs text-[#A0A0A0] bg-white rounded-full px-2 py-0.5">
                  {techCounts[tech]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h3 className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide mb-3">
            Availability
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.availability.includes('available')}
                onChange={() => handleAvailabilityToggle('available')}
                className="w-4 h-4 rounded border-gray-300 text-[#8FBFB6] focus:ring-[#8FBFB6] focus:ring-offset-0"
              />
              <span className="flex-1 text-sm text-[#3A3A3A]">Available</span>
              <span className="text-xs text-[#A0A0A0] bg-white rounded-full px-2 py-0.5">
                {availabilityCounts.available}
              </span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.availability.includes('open')}
                onChange={() => handleAvailabilityToggle('open')}
                className="w-4 h-4 rounded border-gray-300 text-[#8FBFB6] focus:ring-[#8FBFB6] focus:ring-offset-0"
              />
              <span className="flex-1 text-sm text-[#3A3A3A]">Open to Offers</span>
              <span className="text-xs text-[#A0A0A0] bg-white rounded-full px-2 py-0.5">
                {availabilityCounts.open}
              </span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.availability.includes('not-looking')}
                onChange={() => handleAvailabilityToggle('not-looking')}
                className="w-4 h-4 rounded border-gray-300 text-[#8FBFB6] focus:ring-[#8FBFB6] focus:ring-offset-0"
              />
              <span className="flex-1 text-sm text-[#3A3A3A]">Not Looking</span>
              <span className="text-xs text-[#A0A0A0] bg-white rounded-full px-2 py-0.5">
                {availabilityCounts['not-looking']}
              </span>
            </label>
          </div>
        </div>

        {/* Reset Button */}
        {(filters.techStack.length > 0 || filters.availability.length > 0) && (
          <button
            onClick={resetFilters}
            className="w-full py-2.5 px-4 bg-white text-[#7A7A7A] rounded-full text-sm font-medium hover:bg-white/80 transition-colors border border-black/8"
          >
            Reset Filters
          </button>
        )}

        {/* Stats */}
        <div className="pt-4 border-t border-black/5">
          <div className="text-xs text-[#A0A0A0] space-y-1">
            <div className="flex justify-between">
              <span>Total Builders:</span>
              <span className="font-medium text-[#7A7A7A]">{students.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Filtered:</span>
              <span className="font-medium text-[#7A7A7A]">
                {filters.techStack.length > 0 || filters.availability.length > 0 ? 'Active' : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
