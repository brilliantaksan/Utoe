import React from 'react';
import { X, MapPin, Github, Mail } from 'lucide-react';
import TechStackTag from './TechStackTag';
import Button from './ui/Button';
import { useRecruiter } from '../contexts/RecruiterContext';

export default function StudentDetail({ student, onClose }) {
  const { saveCandidate, unsaveCandidate, isCandidateSaved } = useRecruiter();
  const isSaved = isCandidateSaved(student.id);

  if (!student) return null;

  const handleSave = () => {
    if (isSaved) {
      unsaveCandidate(student.id);
    } else {
      saveCandidate(student.id);
    }
  };

  const handleContact = () => {
    window.location.href = `mailto:${student.email}?subject=Opportunity from TalentMap`;
  };

  const getAvailabilityBadge = () => {
    const badges = {
      available: { text: 'Available', bg: '#8FBFB6', color: '#FFFFFF' },
      open: { text: 'Open to Offers', bg: '#F0A37A', color: '#FFFFFF' },
      'not-looking': { text: 'Not Looking', bg: '#A0A0A0', color: '#FFFFFF' }
    };
    return badges[student.availability] || badges.available;
  };

  const badge = getAvailabilityBadge();

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] bg-[#F7F3EE] shadow-2xl z-50 overflow-y-auto animate-slide-in">
      {/* Header */}
      <div className="sticky top-0 bg-[#F7F3EE] border-b border-black/5 p-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#3A3A3A]">Profile</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-[#7A7A7A]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Avatar & Name */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8FBFB6] to-[#9DB8A0] flex items-center justify-center text-white text-xl font-semibold shadow-lg border-2 border-white">
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[#3A3A3A] mb-1">{student.name}</h3>
            <div className="flex items-center gap-2 text-sm text-[#7A7A7A] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {student.location}
            </div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium shadow-md"
              style={{ backgroundColor: badge.bg, color: badge.color }}
            >
              {badge.text}
            </span>
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="text-sm text-[#3A3A3A] leading-relaxed">{student.bio}</p>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {student.techStack.map((tech, idx) => (
              <TechStackTag key={idx} tech={tech} />
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h4 className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide mb-3">
            Projects ({student.projects.length})
          </h4>
          <div className="space-y-3">
            {student.projects.map((project) => (
              <div
                key={project.id}
                className="animated-card bg-white rounded-2xl p-4 shadow-md border border-black/5"
              >
                <h5 className="font-semibold text-[#3A3A3A] mb-2">{project.title}</h5>
                <p className="text-sm text-[#7A7A7A] mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.techStack.map((tech, idx) => (
                    <TechStackTag key={idx} tech={tech} size="sm" />
                  ))}
                </div>
                <div className="flex items-start gap-2 text-xs text-[#7A7A7A] bg-[#F7F3EE] rounded-lg p-2">
                  <span className="text-base">💡</span>
                  <span className="flex-1">{project.impact}</span>
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#8FBFB6] hover:text-[#7AA89F] mt-3 font-medium transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    View on GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-[#F7F3EE] pt-4 pb-2 space-y-2">
          <Button
            onClick={handleContact}
            className="w-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] text-white rounded-full py-3 font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Mail className="w-4 h-4 mr-2 inline" />
            Contact
          </Button>
          <Button
            onClick={handleSave}
            className={`w-full rounded-full py-3 font-medium border transition-all ${
              isSaved
                ? 'bg-[#8FBFB6] text-white border-[#8FBFB6]'
                : 'bg-white text-[#6F8F88] border-black/8 hover:border-black/15'
            }`}
          >
            {isSaved ? '✓ Saved' : 'Save Candidate'}
          </Button>
        </div>

        {/* GitHub Link */}
        {student.githubUrl && (
          <a
            href={student.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-[#7A7A7A] hover:text-[#3A3A3A] transition-colors"
          >
            <Github className="w-4 h-4" />
            View Full GitHub Profile
          </a>
        )}
      </div>
    </div>
  );
}
