"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import BasicInfoStep from './components/BasicInfoStep';
import ProjectsStep from './components/ProjectsStep';
import AvailabilityStep from './components/AvailabilityStep';
import ProfilePreview from './components/ProfilePreview';
import Button from '../../components/ui/Button';

const availabilityLabels = {
  available: 'Available',
  open: 'Open to Offers',
  'not-looking': 'Not Looking'
};

const createEmptyProject = () => ({
  tempId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: '',
  description: '',
  techStack: [],
  impact: '',
  githubUrl: ''
});

const normalizeGithubUsername = (value) => {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const withoutProtocol = trimmed.replace(/^https?:\/\//, '');
  const withoutDomain = withoutProtocol.replace(/^www\./, '').replace(/^github\.com\//, '');
  return withoutDomain.replace(/^@/, '').split('/')[0];
};

const GITHUB_IMPORT_LIMIT = 8;
const PROFILE_DRAFT_KEY = 'talentmap_profile_builder_draft';

const mapLanguageToTech = (language) => {
  const mapping = {
    JavaScript: 'Node',
    TypeScript: 'TypeScript',
    Python: 'Python',
    Go: 'Go',
    Rust: 'Rust',
    Java: 'Java',
    Ruby: 'Ruby',
    Kotlin: 'Kotlin',
    Swift: 'Swift',
    Vue: 'Vue'
  };
  return mapping[language] || null;
};

export default function ProfileBuilder() {
  const router = useRouter();
  const { addStudent } = useData();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const hasMounted = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubSelection, setGithubSelection] = useState([]);
  const [githubImportState, setGithubImportState] = useState({
    loading: false,
    error: '',
    lastFetchedFor: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    githubUsername: '',
    projects: [createEmptyProject()],
    bio: '',
    availability: 'available'
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFILE_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.formData) {
          setFormData({
            name: parsed.formData.name || '',
            email: parsed.formData.email || '',
            location: parsed.formData.location || '',
            githubUsername: parsed.formData.githubUsername || '',
            projects: parsed.formData.projects?.length
              ? parsed.formData.projects
              : [createEmptyProject()],
            bio: parsed.formData.bio || '',
            availability: parsed.formData.availability || 'available'
          });
          setStep(parsed.step || 1);
          setStatusMessage('Draft restored. Pick up where you left off.');
          setTimeout(() => setStatusMessage(''), 3500);
        }
      }
    } catch (error) {
      console.error('Failed to restore draft:', error);
    }
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(
          PROFILE_DRAFT_KEY,
          JSON.stringify({ formData, step, savedAt: Date.now() })
        );
        setStatusMessage('Draft saved.');
        setTimeout(() => setStatusMessage(''), 2500);
      } catch (error) {
        console.error('Failed to save draft:', error);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [formData, step]);

  const aggregatedTechStack = useMemo(() => {
    const allTech = formData.projects.flatMap((project) => project.techStack || []);
    return Array.from(new Set(allTech));
  }, [formData.projects]);

  const previewData = useMemo(() => ({
    name: formData.name,
    location: formData.location,
    bio: formData.bio,
    availability: formData.availability,
    availabilityLabel: availabilityLabels[formData.availability] || availabilityLabels.available,
    techStack: aggregatedTechStack,
    projects: formData.projects
  }), [formData, aggregatedTechStack]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (tempId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.tempId === tempId ? { ...project, [field]: value } : project
      )
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, createEmptyProject()]
    }));
  };

  const removeProject = (tempId) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.tempId !== tempId)
    }));
  };

  const fetchGithubRepos = async () => {
    const username = normalizeGithubUsername(formData.githubUsername);
    if (!username) {
      setGithubImportState({
        loading: false,
        error: 'Add your GitHub username in step 1 first.',
        lastFetchedFor: ''
      });
      return;
    }

    setGithubImportState({ loading: true, error: '', lastFetchedFor: username });
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch repositories. Check the username and try again.');
      }
      const repos = await response.json();
      const filtered = repos
        .filter((repo) => !repo.fork)
        .slice(0, GITHUB_IMPORT_LIMIT)
        .map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || '',
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count
        }));
      setGithubRepos(filtered);
      setGithubSelection([]);
      setGithubImportState({ loading: false, error: '', lastFetchedFor: username });
    } catch (error) {
      setGithubImportState({
        loading: false,
        error: error.message || 'Unable to fetch repositories right now.',
        lastFetchedFor: username
      });
    }
  };

  const toggleGithubSelection = (repoId) => {
    setGithubSelection((prev) =>
      prev.includes(repoId) ? prev.filter((id) => id !== repoId) : [...prev, repoId]
    );
  };

  const importSelectedRepos = () => {
    if (githubSelection.length === 0) return;
    const selectedRepos = githubRepos.filter((repo) => githubSelection.includes(repo.id));
    const existingTitles = new Set(formData.projects.map((project) => project.title.trim()));
    const newProjects = selectedRepos
      .filter((repo) => !existingTitles.has(repo.name))
      .map((repo) => {
        const mappedTech = mapLanguageToTech(repo.language);
        return {
          tempId: `${Date.now()}-${repo.id}`,
          title: repo.name,
          description: repo.description || 'Open-source repository on GitHub.',
          techStack: mappedTech ? [mappedTech] : [],
          impact: repo.stars ? `⭐ ${repo.stars} GitHub stars` : '',
          githubUrl: repo.url
        };
      });

    if (newProjects.length > 0) {
      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, ...newProjects]
      }));
      setStatusMessage(`Imported ${newProjects.length} GitHub projects.`);
      setTimeout(() => setStatusMessage(''), 2500);
    }
  };

  const validateStep1 = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please add your full name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formData.location.trim()) nextErrors.location = 'Location is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = { projects: [] };
    if (formData.projects.length === 0) {
      nextErrors.projectsRequired = 'Please add at least one project.';
    }

    formData.projects.forEach((project, index) => {
      const projectErrors = {};
      if (!project.title.trim()) projectErrors.title = 'Project title is required.';
      if (!project.description.trim()) projectErrors.description = 'Description is required.';
      if (!project.impact.trim()) projectErrors.impact = 'Impact statement is required.';
      if (!project.techStack || project.techStack.length === 0) {
        projectErrors.techStack = 'Select at least one tech tag.';
      }
      nextErrors.projects[index] = projectErrors;
    });

    const hasProjectErrors = nextErrors.projects.some((projectErrors) =>
      Object.keys(projectErrors).length > 0
    );

    if (!nextErrors.projectsRequired && !hasProjectErrors) {
      setErrors({});
      return true;
    }

    setErrors(nextErrors);
    return false;
  };

  const validateStep3 = () => {
    const nextErrors = {};
    if (!formData.bio.trim()) {
      nextErrors.bio = 'Add a short bio so recruiters understand your goals.';
    } else if (formData.bio.trim().length > 150) {
      nextErrors.bio = 'Bio must be 150 characters or less.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsSubmitting(true);

    const githubUsername = normalizeGithubUsername(formData.githubUsername);
    const githubUrl = githubUsername ? `https://github.com/${githubUsername}` : '';

    const newStudent = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      location: formData.location.trim(),
      githubUrl,
      bio: formData.bio.trim(),
      availability: formData.availability,
      techStack: aggregatedTechStack,
      projects: formData.projects.map((project, index) => ({
        id: Date.now() + index,
        title: project.title.trim(),
        description: project.description.trim(),
        techStack: project.techStack,
        impact: project.impact.trim(),
        githubUrl: project.githubUrl.trim() || undefined
      }))
    };

    try {
      await addStudent(newStudent);
      localStorage.removeItem(PROFILE_DRAFT_KEY);
      setStatusMessage('Profile created. Redirecting to the map...');
    setTimeout(() => router.push('/map'), 700);
    } catch (error) {
      console.error('Failed to create profile:', error);
      setStatusMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Projects' },
    { id: 3, label: 'Availability' }
  ];

  return (
    <div className="min-h-screen bg-[#F4EFE9]">
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-[#7A7A7A]">Build your TalentMap profile</p>
            <h1 className="text-2xl font-semibold text-[#3A3A3A]">Create your builder story</h1>
            {statusMessage && (
              <p className="mt-1 text-xs font-medium text-[#7A7A7A]">{statusMessage}</p>
            )}
          </div>
          <Button
            onClick={() => router.push('/')}
            className="rounded-full border border-black/8 bg-white px-4 py-2 text-[#6F8F88]"
          >
            <ArrowLeft className="mr-2 inline h-4 w-4" />
            Back home
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
                Step {step} of 3
              </p>
              <p className="mt-2 text-sm text-[#3A3A3A]">{steps[step - 1].label}</p>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((item) => (
                <span
                  key={item.id}
                  className={`h-2 w-12 rounded-full ${
                    item.id <= step ? 'bg-[#8FBFB6]' : 'bg-[#E5DED7]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-6">
            {step === 1 && (
              <BasicInfoStep
                formData={formData}
                errors={errors}
                onChange={updateField}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <ProjectsStep
                projects={formData.projects}
                githubUsername={formData.githubUsername}
                githubRepos={githubRepos}
                githubSelection={githubSelection}
                githubImportState={githubImportState}
                errors={errors}
                onProjectChange={handleProjectChange}
                onAddProject={addProject}
                onRemoveProject={removeProject}
                onFetchGithub={fetchGithubRepos}
                onToggleRepo={toggleGithubSelection}
                onImportRepos={importSelectedRepos}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 3 && (
              <AvailabilityStep
                formData={formData}
                errors={errors}
                onChange={updateField}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onBack={handleBack}
              />
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-[#F7F3EE] p-5 text-sm text-[#7A7A7A] shadow-sm">
            <p className="font-medium text-[#3A3A3A]">Live preview</p>
            <p className="mt-2">
              Recruiters will see this card on the map. Keep it warm, clear, and impact-focused.
            </p>
          </div>
          <ProfilePreview previewData={previewData} />
        </aside>
      </main>
    </div>
  );
}
