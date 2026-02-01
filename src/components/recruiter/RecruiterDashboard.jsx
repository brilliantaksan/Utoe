"use client";

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Home, Map, Search } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useRecruiter } from '../../contexts/RecruiterContext';
import FilterSidebar from '../../screens/talent-map/components/FilterSidebar';
import ForceGraph from '../../screens/talent-map/components/ForceGraph';
import StudentDetail from '../StudentDetail';
import Button from '../ui/Button';

export default function RecruiterDashboard() {
  const router = useRouter();
  const { students, filters } = useData();
  const { savedCandidates, isLoading, loadError } = useRecruiter();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const savedStudentIds = useMemo(() => {
    return savedCandidates.map(candidate => candidate.student_id || candidate.studentId);
  }, [savedCandidates]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      if (filters.techStack.length > 0) {
        const hasMatchingTech = student.techStack.some(tech =>
          filters.techStack.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      if (filters.availability.length > 0) {
        if (!filters.availability.includes(student.availability)) return false;
      }

      if (savedOnly && !savedStudentIds.includes(student.id)) return false;

      if (availabilityFilter !== 'all' && student.availability !== availabilityFilter) {
        return false;
      }

      return true;
    });
  }, [students, filters, savedOnly, availabilityFilter, savedStudentIds]);

  const savedStudents = useMemo(() => {
    const normalized = students.filter(student => savedStudentIds.includes(student.id));
    const availabilityFiltered = availabilityFilter === 'all'
      ? normalized
      : normalized.filter(student => student.availability === availabilityFilter);
    if (!searchQuery.trim()) return availabilityFiltered;
    const query = searchQuery.toLowerCase();
    return availabilityFiltered.filter(student =>
      student.name.toLowerCase().includes(query) ||
      student.location.toLowerCase().includes(query) ||
      student.techStack.some(tech => tech.toLowerCase().includes(query))
    );
  }, [students, savedStudentIds, searchQuery, availabilityFilter]);

  const exportSaved = (format) => {
    if (savedStudents.length === 0) return;

    if (format === 'json') {
      const payload = savedStudents.map(student => ({
        id: student.id,
        name: student.name,
        email: student.email,
        location: student.location,
        availability: student.availability,
        techStack: student.techStack,
        projects: student.projects?.length || 0,
        githubUrl: student.githubUrl || ''
      }));
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'saved-candidates.json';
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    const headers = ['id', 'name', 'email', 'location', 'availability', 'techStack', 'projects', 'githubUrl'];
    const rows = savedStudents.map(student => ([
      student.id,
      `"${student.name.replace(/"/g, '""')}"`,
      `"${student.email?.replace(/"/g, '""') || ''}"`,
      `"${student.location.replace(/"/g, '""')}"`,
      student.availability,
      `"${student.techStack.join(' | ').replace(/"/g, '""')}"`,
      student.projects?.length || 0,
      `"${student.githubUrl || ''}"`
    ].join(',')));

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saved-candidates.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F4EFE9] overflow-hidden">
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
            Recruiter Workspace
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-[#7A7A7A]">
            <span className="font-medium text-[#3A3A3A]">{savedStudents.length}</span>
            {' '}saved
          </div>
          <Button
            onClick={() => router.push('/')}
            className="bg-white text-[#6F8F88] px-4 py-2 rounded-full border border-black/8 hover:border-black/15 transition-all text-sm"
          >
            <Home className="w-4 h-4 mr-2 inline" />
            Home
          </Button>
        </div>
      </header>

      <div className="flex-1 relative">
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(!isFilterOpen)}
        />

        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isFilterOpen ? 'left-[280px]' : 'left-0'
          } ${selectedStudent ? 'right-[400px]' : 'right-[360px]'}`}
        >
          <div className="w-full h-full relative">
            {filteredStudents.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-[#A0A0A0] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#3A3A3A] mb-2">
                    No builders match your filters
                  </h3>
                  <p className="text-[#7A7A7A] mb-4">
                    Try adjusting filters to see more talent.
                  </p>
                </div>
              </div>
            ) : (
              <ForceGraph
                students={filteredStudents}
                onNodeClick={setSelectedStudent}
                selectedStudentId={selectedStudent?.id}
                savedIds={savedStudentIds}
              />
            )}
          </div>
        </div>

        {!selectedStudent && (
          <aside className="fixed right-0 top-[72px] h-[calc(100vh-72px)] w-[360px] bg-[#F7F3EE] border-l border-black/5 shadow-xl z-40 flex flex-col">
          <div className="p-5 border-b border-black/5">
            <h2 className="text-lg font-semibold text-[#3A3A3A]">Saved candidates</h2>
            <div className="mt-3 relative">
                <Search className="w-4 h-4 text-[#A0A0A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by name, location, tech"
                  className="w-full rounded-full border border-black/5 bg-white py-2 pl-9 pr-3 text-xs text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
                />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSavedOnly((prev) => !prev)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                  savedOnly
                    ? 'bg-[#8FBFB6] text-white shadow-sm'
                    : 'bg-white text-[#6F8F88] border border-black/8'
                }`}
              >
                Saved-only map
              </button>
              <select
                value={availabilityFilter}
                onChange={(event) => setAvailabilityFilter(event.target.value)}
                className="rounded-full border border-black/8 bg-white px-3 py-1 text-[11px] text-[#6F8F88] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
              >
                <option value="all">All availability</option>
                <option value="available">Available</option>
                <option value="open">Open to offers</option>
                <option value="not-looking">Not looking</option>
              </select>
            </div>
            {loadError && (
              <p className="mt-2 text-xs text-[#E07A5F]">{loadError}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() => exportSaved('csv')}
                className="rounded-full border border-black/8 bg-white px-3 py-1 text-xs text-[#6F8F88]"
                disabled={savedStudents.length === 0}
              >
                <Download className="w-3.5 h-3.5 mr-1 inline" />
                CSV
              </Button>
              <Button
                onClick={() => exportSaved('json')}
                className="rounded-full border border-black/8 bg-white px-3 py-1 text-xs text-[#6F8F88]"
                disabled={savedStudents.length === 0}
              >
                <Download className="w-3.5 h-3.5 mr-1 inline" />
                JSON
              </Button>
            </div>
          </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {isLoading ? (
                <div className="text-sm text-[#7A7A7A]">Loading saved candidates...</div>
              ) : savedStudents.length === 0 ? (
                <div className="rounded-2xl bg-white/80 p-4 text-sm text-[#7A7A7A]">
                  No saved candidates yet. Click a builder on the map and save them.
                </div>
              ) : (
                savedStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full text-left rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                      selectedStudent?.id === student.id ? 'ring-2 ring-[#8FBFB6]/40' : ''
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#3A3A3A]">{student.name}</div>
                    <div className="text-xs text-[#7A7A7A]">{student.location}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {student.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-[#EEF2F1] px-2 py-0.5 text-[10px] text-[#5F6F6B]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>
        )}

        {selectedStudent && (
          <StudentDetail
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>
    </div>
  );
}
