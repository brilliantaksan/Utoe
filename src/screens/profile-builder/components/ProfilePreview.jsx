import React from 'react';
import TechStackTag from '../../../components/TechStackTag';

const availabilityStyles = {
  available: { bg: '#8FBFB6', text: 'Available' },
  open: { bg: '#F0A37A', text: 'Open to Offers' },
  'not-looking': { bg: '#A0A0A0', text: 'Not Looking' }
};

export default function ProfilePreview({ previewData }) {
  const initials = previewData.name
    ? previewData.name.split(' ').map((part) => part[0]).join('').slice(0, 2)
    : 'TM';

  const availability = availabilityStyles[previewData.availability] || availabilityStyles.available;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#8FBFB6] to-[#9DB8A0] text-white flex items-center justify-center text-lg font-semibold shadow-md border-2 border-white">
          {initials}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#3A3A3A]">
            {previewData.name || 'Your name'}
          </h3>
          <p className="text-sm text-[#7A7A7A]">{previewData.location || 'Your location'}</p>
          <span
            className="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm"
            style={{ backgroundColor: availability.bg }}
          >
            {availability.text}
          </span>
        </div>
      </div>

      <div className="mt-5 text-sm text-[#3A3A3A]">
        {previewData.bio || 'Your bio will appear here. Keep it friendly and focused on your strengths.'}
      </div>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">Tech stack</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {previewData.techStack.length > 0 ? (
            previewData.techStack.map((tech) => (
              <TechStackTag key={tech} tech={tech} />
            ))
          ) : (
            <span className="text-xs text-[#A0A0A0]">Add a project to populate your stack.</span>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
          Projects ({previewData.projects.length})
        </h4>
        <div className="mt-3 space-y-3">
          {previewData.projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/10 bg-[#F7F3EE] px-4 py-3 text-xs text-[#7A7A7A]">
              Add at least one project to show your impact.
            </div>
          ) : (
            previewData.projects.map((project) => (
              <div key={project.tempId} className="rounded-2xl bg-[#F7F3EE] p-4">
                <div className="text-sm font-semibold text-[#3A3A3A]">{project.title || 'Project title'}</div>
                <p className="mt-1 text-xs text-[#7A7A7A]">
                  {project.description || 'Project description goes here.'}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.techStack.length > 0 ? (
                    project.techStack.map((tech) => (
                      <TechStackTag key={tech} tech={tech} size="sm" />
                    ))
                  ) : (
                    <span className="text-[11px] text-[#A0A0A0]">Select tech tags.</span>
                  )}
                </div>
                {project.impact && (
                  <div className="mt-2 rounded-lg bg-white px-3 py-2 text-[11px] text-[#7A7A7A]">
                    {project.impact}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
