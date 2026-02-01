import React from 'react';
import Button from '../../../components/ui/Button';
import { allTechStacks } from '../../../data/techStacks';
import { getTechColor } from '../../../utils/colors';

function TechToggle({ tech, selected, onToggle }) {
  const color = getTechColor(tech);
  return (
    <button
      type="button"
      onClick={() => onToggle(tech)}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
        selected
          ? 'border-transparent bg-[#8FBFB6]/15 text-[#3A3A3A] shadow-sm'
          : 'border-black/5 bg-white text-[#7A7A7A] hover:border-black/10'
      }`}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {tech}
    </button>
  );
}

export default function ProjectsStep({
  projects,
  githubUsername,
  githubRepos,
  githubSelection,
  githubImportState,
  errors,
  onProjectChange,
  onAddProject,
  onRemoveProject,
  onFetchGithub,
  onToggleRepo,
  onImportRepos,
  onNext,
  onBack
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#3A3A3A]">Projects</h2>
        <p className="text-sm text-[#7A7A7A]">Showcase real work and measurable impact.</p>
      </div>

      <div className="rounded-2xl bg-[#F7F3EE] p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#3A3A3A]">Import from GitHub</p>
            <p className="text-xs text-[#7A7A7A]">
              Pull recent repositories to prefill projects. You can edit everything after import.
            </p>
          </div>
          <Button
            onClick={onFetchGithub}
            disabled={githubImportState.loading}
            className="rounded-full border border-black/8 bg-white px-4 py-2 text-xs text-[#6F8F88]"
          >
            {githubImportState.loading ? 'Fetching…' : 'Fetch repos'}
          </Button>
        </div>
        <div className="mt-2 text-xs text-[#7A7A7A]">
          {githubUsername
            ? `Using github.com/${githubUsername}`
            : 'Add your GitHub username in step 1 to enable import.'}
        </div>
        {githubImportState.error && (
          <p className="mt-2 text-xs text-[#E07A5F]">{githubImportState.error}</p>
        )}
        {githubRepos.length > 0 && (
          <div className="mt-4 space-y-3">
            {githubRepos.map((repo) => (
              <label
                key={repo.id}
                className={`flex items-start gap-3 rounded-2xl border px-3 py-3 text-xs transition-all ${
                  githubSelection.includes(repo.id)
                    ? 'border-transparent bg-white shadow-sm'
                    : 'border-black/5 bg-white/60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={githubSelection.includes(repo.id)}
                  onChange={() => onToggleRepo(repo.id)}
                  className="mt-1 h-4 w-4 rounded border-black/10 text-[#8FBFB6] focus:ring-[#8FBFB6]/40"
                />
                <div>
                  <div className="text-sm font-semibold text-[#3A3A3A]">{repo.name}</div>
                  <p className="text-xs text-[#7A7A7A]">{repo.description || 'No description yet.'}</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-[#A0A0A0]">
                    {repo.language && <span>{repo.language}</span>}
                    {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  </div>
                </div>
              </label>
            ))}
            <div className="flex justify-end">
              <Button
                onClick={onImportRepos}
                className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-5 py-2 text-xs text-white shadow-md hover:shadow-lg transition-all"
                disabled={githubSelection.length === 0}
              >
                Import selected
              </Button>
            </div>
          </div>
        )}
      </div>

      {errors.projectsRequired && (
        <div className="rounded-2xl bg-[#FCEFEA] px-4 py-3 text-sm text-[#E07A5F]">
          {errors.projectsRequired}
        </div>
      )}

      <div className="space-y-6">
        {projects.map((project, index) => {
          const projectErrors = errors.projects?.[index] || {};
          return (
            <div key={project.tempId} className="rounded-2xl bg-[#F7F3EE] p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#3A3A3A]">Project {index + 1}</h3>
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveProject(project.tempId)}
                    className="text-xs text-[#E07A5F] hover:text-[#C76A54]"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-4 grid gap-4">
                <div>
                  <label className="text-sm font-medium text-[#3A3A3A]">Project title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(event) => onProjectChange(project.tempId, 'title', event.target.value)}
                    placeholder="e.g., Real-time Chat Engine"
                    className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
                  />
                  {projectErrors.title && (
                    <p className="mt-1 text-xs text-[#E07A5F]">{projectErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3A3A3A]">Description</label>
                  <textarea
                    rows={3}
                    value={project.description}
                    onChange={(event) => onProjectChange(project.tempId, 'description', event.target.value)}
                    placeholder="What did you build?"
                    className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
                  />
                  {projectErrors.description && (
                    <p className="mt-1 text-xs text-[#E07A5F]">{projectErrors.description}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3A3A3A]">Tech stack</label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {allTechStacks.map((tech) => (
                      <TechToggle
                        key={tech}
                        tech={tech}
                        selected={project.techStack.includes(tech)}
                        onToggle={(selectedTech) => {
                          const updated = project.techStack.includes(selectedTech)
                            ? project.techStack.filter((item) => item !== selectedTech)
                            : [...project.techStack, selectedTech];
                          onProjectChange(project.tempId, 'techStack', updated);
                        }}
                      />
                    ))}
                  </div>
                  {projectErrors.techStack && (
                    <p className="mt-2 text-xs text-[#E07A5F]">{projectErrors.techStack}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3A3A3A]">Impact statement</label>
                  <input
                    type="text"
                    value={project.impact}
                    onChange={(event) => onProjectChange(project.tempId, 'impact', event.target.value)}
                    placeholder="e.g., Handles 10k users"
                    className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
                  />
                  {projectErrors.impact && (
                    <p className="mt-1 text-xs text-[#E07A5F]">{projectErrors.impact}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3A3A3A]">GitHub URL (optional)</label>
                  <input
                    type="url"
                    value={project.githubUrl}
                    onChange={(event) => onProjectChange(project.tempId, 'githubUrl', event.target.value)}
                    placeholder="https://github.com/username/project"
                    className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          onClick={onBack}
          className="rounded-full border border-black/8 bg-white px-5 py-2 text-[#6F8F88]"
        >
          Back
        </Button>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={onAddProject}
            className="rounded-full border border-black/8 bg-white px-5 py-2 text-[#6F8F88] hover:border-black/15"
          >
            Add another project
          </Button>
          <Button
            onClick={onNext}
            className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-6 py-2 text-white shadow-md hover:shadow-lg transition-all"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
