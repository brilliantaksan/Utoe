"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Map, Home, Users, PauseCircle, PlayCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useRecruiter } from '../../contexts/RecruiterContext';
import ForceGraph from './components/ForceGraph';
import FilterSidebar from './components/FilterSidebar';
import StudentDetail from '../../components/StudentDetail';
import Button from '../../components/ui/Button';

const relevanceScore = (student) => {
  const availabilityWeight = {
    available: 3,
    open: 2,
    'not-looking': 1
  };
  const projectScore = (student.projects?.length || 0) * 2;
  const availabilityScore = availabilityWeight[student.availability] || 0;
  return projectScore + availabilityScore;
};

export default function TalentMap() {
  const router = useRouter();
  const { students, filters, resetFilters } = useData();
  const { savedCandidates } = useRecruiter();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [freezeLayout, setFreezeLayout] = useState(false);
  const topLimit = 24;

  // Filter students based on active filters
  const filteredStudents = useMemo(() => {
    const base = students.filter(student => {
      // Filter by tech stack
      if (filters.techStack.length > 0) {
        const hasMatchingTech = student.techStack.some(tech =>
          filters.techStack.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      // Filter by availability
      if (filters.availability.length > 0) {
        if (!filters.availability.includes(student.availability)) return false;
      }

      return true;
    });

    if (showAll) return base;

    return base
      .slice()
      .sort((a, b) => relevanceScore(b) - relevanceScore(a))
      .slice(0, topLimit);
  }, [students, filters, showAll]);

  const savedIds = useMemo(() => {
    return savedCandidates.map((candidate) => candidate.student_id || candidate.studentId);
  }, [savedCandidates]);

  const handleNodeClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetail = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F4EFE9] overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-black/5 px-6 py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <Map className="w-5 h-5 text-[#8FBFB6]" />
            <span className="text-lg font-semibold text-[#3A3A3A]">TalentMap</span>
          </button>
          <div className="h-6 w-px bg-black/10" />
          <h1 className="text-base font-medium text-[#7A7A7A]">
            Visual Talent Map for Tech Hiring in Japan
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-[#7A7A7A]">
            <span className="font-medium text-[#3A3A3A]">{filteredStudents.length}</span>
            {' '}builders
          </div>
          <Button
            onClick={() => router.push('/')}
            className="bg-white text-[#6F8F88] px-4 py-2 rounded-full border border-black/8 hover:border-black/15 transition-all text-sm"
          >
            <Home className="w-4 h-4 mr-2 inline" />
            Home
          </Button>
          <Button
            onClick={() => router.push('/profile/create')}
            className="bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all text-sm"
          >
            <Users className="w-4 h-4 mr-2 inline" />
            Create Profile
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(!isFilterOpen)}
        />

        {/* Map Canvas */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isFilterOpen ? 'left-[280px]' : 'left-0'
          } ${selectedStudent ? 'right-[400px]' : 'right-0'}`}
        >
          <div className="w-full h-full relative">
            {/* Map Instructions */}
            {filteredStudents.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-[#A0A0A0] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#3A3A3A] mb-2">
                    No builders match your filters
                  </h3>
                  <p className="text-[#7A7A7A] mb-4">
                    Try adjusting your filters to see more talent
                  </p>
                  <Button
                    onClick={resetFilters}
                    className="bg-white text-[#6F8F88] px-6 py-2 rounded-full border border-black/8"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Instructions Overlay */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-black/5">
                  <p className="text-sm text-[#7A7A7A]">
                    <span className="font-medium text-[#3A3A3A]">Hover</span> to preview •{' '}
                    <span className="font-medium text-[#3A3A3A]">Click</span> to view full profile •{' '}
                    <span className="font-medium text-[#3A3A3A]">Drag</span> to explore
                  </p>
                </div>

                <div className="absolute top-6 right-6 z-10 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      showAll
                        ? 'bg-[#8FBFB6] text-white shadow-md'
                        : 'bg-white/90 text-[#6F8F88] border border-black/8'
                    }`}
                  >
                    {showAll ? 'Showing all builders' : `Top ${topLimit} by signal`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFreezeLayout((prev) => !prev)}
                    className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-[#6F8F88] border border-black/8 shadow-sm"
                  >
                    {freezeLayout ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-1 inline" />
                        Resume layout
                      </>
                    ) : (
                      <>
                        <PauseCircle className="w-4 h-4 mr-1 inline" />
                        Freeze layout
                      </>
                    )}
                  </button>
                </div>

                {/* Force Graph */}
                <ForceGraph
                  students={filteredStudents}
                  onNodeClick={handleNodeClick}
                  selectedStudentId={selectedStudent?.id}
                  freezeLayout={freezeLayout}
                  savedIds={savedIds}
                />
              </>
            )}
          </div>
        </div>

        {/* Student Detail Panel */}
        {selectedStudent && (
          <StudentDetail
            student={selectedStudent}
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </div>
  );
}
