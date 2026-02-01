"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import Button from '../../components/ui/Button';
import { FloatingIconsHero } from '../../components/ui/floating-icons-hero-section';
import { BlurFade } from '../../components/ui/blur-fade';
import {
  Map,
  Users,
  Sparkles,
  Target,
  Zap,
  Compass,
  Orbit,
  Network,
  Layers,
  ShieldCheck,
  Rocket,
  Search,
  Stars,
  BadgeCheck,
} from 'lucide-react';

const floatingIcons = [
  { id: 1, icon: Compass, className: 'top-[12%] left-[8%]' },
  { id: 2, icon: Orbit, className: 'top-[18%] right-[12%]' },
  { id: 3, icon: Network, className: 'top-[60%] left-[10%]' },
  { id: 4, icon: Layers, className: 'bottom-[12%] right-[16%]' },
  { id: 5, icon: Sparkles, className: 'top-[6%] left-[36%]' },
  { id: 6, icon: Map, className: 'top-[8%] right-[32%]' },
  { id: 7, icon: Users, className: 'bottom-[8%] left-[24%]' },
  { id: 8, icon: Target, className: 'top-[42%] left-[16%]' },
  { id: 9, icon: Rocket, className: 'top-[74%] right-[28%]' },
  { id: 10, icon: Zap, className: 'top-[86%] left-[66%]' },
  { id: 11, icon: Search, className: 'top-[52%] right-[6%]' },
  { id: 12, icon: ShieldCheck, className: 'top-[58%] left-[4%]' },
];

const trustBadges = [
  'Seed-stage founders',
  'Engineering leads',
  'Design-forward teams',
  'Community builders',
  'Talent partners',
];

const steps = [
  {
    id: 1,
    icon: BadgeCheck,
    title: 'Build a rich profile',
    description: 'Capture your real work, stack, and outcomes with a story-first profile.',
  },
  {
    id: 2,
    icon: Map,
    title: 'Join a living map',
    description: 'We place you into soft clusters that reflect how you build and collaborate.',
  },
  {
    id: 3,
    icon: Stars,
    title: 'Get discovered with context',
    description: 'Teams explore visually, understand fit faster, and reach out with confidence.',
  },
];

const valuePoints = [
  {
    id: 1,
    icon: Users,
    title: 'Human-first discovery',
    description: 'We prioritize narrative and proof of work over keyword filters.',
  },
  {
    id: 2,
    icon: Target,
    title: 'Startup-fit signals',
    description: 'Surface builders who thrive in early-stage environments.',
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Soft, clear clusters',
    description: 'Visual groupings reduce noise and highlight high-signal talent.',
  },
];

export default function Landing() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const profilePath = React.useMemo(() => {
    const role = `${user?.publicMetadata?.role || user?.unsafeMetadata?.role || ''}`.toLowerCase();
    if (role.includes('recruiter') || role.includes('company') || role.includes('employer')) {
      return '/profile/company';
    }
    if (role.includes('talent') || role.includes('builder') || role.includes('job-seeker')) {
      return '/profile/talent';
    }
    return '/profile';
  }, [user]);

  const userLabel = React.useMemo(() => {
    return (
      user?.fullName ||
      user?.primaryEmailAddress?.emailAddress ||
      user?.username ||
      'Signed in'
    );
  }, [user]);

  const scrollToSection = (sectionId) => {
    if (typeof window !== 'undefined') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    router.push(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-[#F4EFE9] text-[#3A3A3A]">
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#F7F3EE]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <Map className="h-5 w-5 text-[#8FBFB6]" />
            </div>
            <div>
              <p className="text-lg font-semibold">TalentMap</p>
              <p className="text-xs text-[#7A7A7A]">Visual talent discovery</p>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm text-[#7A7A7A] md:flex">
            <button
              onClick={() => router.push('/map')}
              className="transition hover:text-[#3A3A3A]"
            >
              Explore map
            </button>
            <button
              onClick={() => scrollToSection('how')}
              className="transition hover:text-[#3A3A3A]"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('get-started')}
              className="transition hover:text-[#3A3A3A]"
            >
              Get started
            </button>
          </div>
          <div className="flex items-center gap-3">
            {!isSignedIn ? (
              <>
                <button
                  onClick={() => router.push('/sign-in')}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#6F8F88] transition hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                >
                  Sign in
                </button>
                <Button
                  onClick={() => router.push('/sign-up')}
                  className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition hover:shadow-[0_14px_36px_rgba(0,0,0,0.14)]"
                >
                  Get started
                </Button>
              </>
            ) : (
              <>
                <span className="hidden text-xs font-medium text-[#7A7A7A] md:inline">
                  Signed in as {userLabel}
                </span>
                <button
                  onClick={() => router.push(profilePath)}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#6F8F88] transition hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                >
                  View profile
                </button>
                <Button
                  onClick={() => router.push('/map')}
                  className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition hover:shadow-[0_14px_36px_rgba(0,0,0,0.14)]"
                >
                  Explore map
                </Button>
                <button
                  onClick={() => signOut()}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#6F8F88] transition hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <FloatingIconsHero
        title="A calmer way to discover real builders"
        subtitle="TalentMap replaces resume overload with a warm, visual talent map. Explore clusters, understand fit fast, and connect with builders who are ready to ship."
        ctaText={isSignedIn ? 'Go to your profile' : 'Get started free'}
        ctaHref={isSignedIn ? profilePath : '/sign-up'}
        showSignIn={!isSignedIn}
        icons={floatingIcons}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="animated-card rounded-3xl border border-black/5 bg-white/70 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#A0A0A0]">Trusted by</p>
              <BlurFade inView>
                <h2 className="mt-2 text-3xl font-semibold">Teams who hire with heart</h2>
              </BlurFade>
            </div>
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm text-[#7A7A7A] shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#A0A0A0]">The TalentMap difference</p>
          <BlurFade inView>
            <h2 className="mt-3 text-4xl font-semibold">Visual clusters replace cold filters</h2>
          </BlurFade>
          <p className="mt-4 text-lg text-[#7A7A7A]">
            We group builders by real project signals, not keyword density. You see how talent
            connects, which stacks they love, and who works well together.
          </p>
          <div className="mt-8 grid gap-4">
            {valuePoints.map((point) => (
              <div
                key={point.id}
                className="animated-card flex items-start gap-4 rounded-2xl border border-black/5 bg-white/70 p-4 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2F1]">
                  <point.icon className="h-5 w-5 text-[#6F8F88]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                  <p className="mt-1 text-sm text-[#7A7A7A]">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              onClick={() => router.push('/map')}
              className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition hover:shadow-[0_14px_36px_rgba(0,0,0,0.14)]"
            >
              Explore the map
            </Button>
            <Button
              onClick={() => router.push('/profile/talent')}
              className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#6F8F88]"
            >
              Build a profile
            </Button>
          </div>
        </div>
        <div className="relative">
            <div className="animated-card rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="Collaborative startup team"
              className="h-72 w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-[#F7F3EE] p-4">
                <p className="text-sm text-[#7A7A7A]">Active builders</p>
                <p className="mt-2 text-2xl font-semibold">1,240+</p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#F7F3EE] p-4">
                <p className="text-sm text-[#7A7A7A]">Hiring squads</p>
                <p className="mt-2 text-2xl font-semibold">180+</p>
              </div>
            </div>
          </div>
          <div className="animated-card absolute -bottom-6 -left-6 hidden rounded-3xl border border-black/5 bg-white/80 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:block">
            <p className="text-sm text-[#7A7A7A]">Signal clarity</p>
            <p className="mt-2 text-xl font-semibold">3x faster shortlist</p>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#A0A0A0]">How it works</p>
            <BlurFade inView>
              <h2 className="mt-3 text-4xl font-semibold">A calm path from profile to discovery</h2>
            </BlurFade>
          </div>
          <p className="max-w-lg text-sm text-[#7A7A7A]">
            We help builders show their work with clarity while giving hiring teams a richer view of
            talent.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="animated-card rounded-3xl border border-black/5 bg-white/80 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2F1]">
                <step.icon className="h-6 w-6 text-[#6F8F88]" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm text-[#7A7A7A]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
        <div className="animated-card rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <p className="text-sm uppercase tracking-[0.2em] text-[#A0A0A0]">For builders</p>
          <BlurFade inView>
            <h3 className="mt-3 text-3xl font-semibold">Show your work, not just your words</h3>
          </BlurFade>
          <p className="mt-4 text-sm text-[#7A7A7A]">
            Bring GitHub, demos, and case studies together. Keep your story gentle, structured, and
            easy to navigate.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[#7A7A7A]">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#8FBFB6]" />
              Curated project highlights with context.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#8FBFB6]" />
              Transparent availability and collaboration style.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#8FBFB6]" />
              Cluster placement that reflects your strengths.
            </li>
          </ul>
          <div className="mt-8">
            <Button
              onClick={() => router.push('/profile/talent')}
              className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
            >
              Create your profile
            </Button>
          </div>
        </div>
        <div className="animated-card rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <p className="text-sm uppercase tracking-[0.2em] text-[#A0A0A0]">For hiring teams</p>
          <BlurFade inView>
            <h3 className="mt-3 text-3xl font-semibold">Find builders who match your mission</h3>
          </BlurFade>
          <p className="mt-4 text-sm text-[#7A7A7A]">
            See who ships, who collaborates, and who thrives in early-stage product teams.
          </p>
          <div className="mt-6 rounded-2xl border border-black/5 bg-[#F7F3EE] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <Target className="h-5 w-5 text-[#6F8F88]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Signal-aware shortlists</p>
                <p className="text-xs text-[#7A7A7A]">Reduce time-to-reach-out by 43%</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-black/5 bg-[#F7F3EE] p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Users className="h-5 w-5 text-[#6F8F88]" />
            </div>
            <div>
              <p className="text-sm font-semibold">Warm intros</p>
              <p className="text-xs text-[#7A7A7A]">Connect with builders through shared signals.</p>
            </div>
          </div>
          <div className="mt-8">
            <Button
              onClick={() => router.push('/map')}
              className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#6F8F88]"
            >
              Explore talent clusters
            </Button>
          </div>
        </div>
      </section>

      <section id="get-started" className="mx-auto max-w-6xl px-6 py-20">
        <div className="animated-card rounded-3xl border border-black/5 bg-gradient-to-br from-[#9DB8A0] to-[#8FBFB6] p-10 shadow-[0_14px_36px_rgba(0,0,0,0.14)]">
          <div className="flex flex-wrap items-center justify-between gap-8 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">Get started</p>
              <BlurFade inView>
                <h2 className="mt-3 text-4xl font-semibold">Choose your path</h2>
              </BlurFade>
              <p className="mt-3 max-w-xl text-sm text-white/90">
                Whether you are building or hiring, TalentMap gives you a clear, gentle way to
                connect.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {!isSignedIn ? (
                <>
                  <Button
                    onClick={() => router.push('/sign-up')}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#6F8F88]"
                  >
                    Sign up as a builder
                  </Button>
                  <Button
                    onClick={() => router.push('/sign-in')}
                    className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Sign in to hire
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => router.push(profilePath)}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#6F8F88]"
                  >
                    View your profile
                  </Button>
                  <Button
                    onClick={() => router.push('/map')}
                    className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Explore the map
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="animated-card rounded-3xl border border-white/30 bg-white/15 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Builder onboarding</p>
                  <p className="text-xs text-white/80">10-minute guided setup</p>
                </div>
              </div>
            </div>
            <div className="animated-card rounded-3xl border border-white/30 bg-white/15 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Hiring workspace</p>
                  <p className="text-xs text-white/80">Explore curated clusters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animated-card rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#A0A0A0]">Community snapshot</p>
            <BlurFade inView>
              <h3 className="mt-3 text-3xl font-semibold">The map is alive and growing</h3>
            </BlurFade>
            <p className="mt-4 text-sm text-[#7A7A7A]">
              Every week, new builders appear across AI, product, and emerging tech clusters.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-[#F7F3EE] p-4">
                <p className="text-sm text-[#7A7A7A]">New profiles</p>
                <p className="mt-2 text-2xl font-semibold">+72 / week</p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#F7F3EE] p-4">
                <p className="text-sm text-[#7A7A7A]">Active clusters</p>
                <p className="mt-2 text-2xl font-semibold">18 focus areas</p>
              </div>
            </div>
          </div>
          <div className="animated-card rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Team reviewing visual talent map"
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-[#8FBFB6]" />
            <span className="font-semibold">TalentMap</span>
          </div>
          <p className="text-sm text-[#7A7A7A]">
            Visual talent discovery for Japan&apos;s tech startups.
          </p>
        </div>
      </footer>
    </div>
  );
}
