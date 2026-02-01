"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { ArrowLeft, Building2, Map, Users } from 'lucide-react';
import Button from '../../components/ui/Button';

const profileOptions = [
  {
    id: 'talent',
    eyebrow: 'For builders',
    title: 'Talent profile',
    description: 'Showcase your work, stack, and availability with a story-first profile.',
    highlights: [
      'Import projects from GitHub in minutes.',
      'Capture outcomes and collaboration style.',
      'Join the talent map with context.'
    ],
    actionLabel: 'Create talent profile',
    actionPath: '/profile/talent',
    icon: Users,
    accent: 'bg-[#EEF2F1]',
    buttonClass:
      'rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]'
  },
  {
    id: 'company',
    eyebrow: 'For hiring teams',
    title: 'Company profile',
    description: 'Set up your recruiting workspace and brand presence for the map.',
    highlights: [
      'Share your mission and hiring needs.',
      'Add contact and billing details securely.',
      'Unlock recruiter tools and shortlists.'
    ],
    actionLabel: 'Set up company profile',
    actionPath: '/profile/company',
    icon: Building2,
    accent: 'bg-[#F7F3EE]',
    buttonClass:
      'rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#6F8F88]'
  }
];

export default function ProfileHub() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isSignedIn } = useUser();
  const userLabel = React.useMemo(() => {
    return (
      user?.fullName ||
      user?.primaryEmailAddress?.emailAddress ||
      user?.username ||
      'Signed in'
    );
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F4EFE9] text-[#3A3A3A]">
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-sm font-medium text-[#7A7A7A]">Profile setup</p>
            <h1 className="text-2xl font-semibold text-[#3A3A3A]">Choose your profile path</h1>
            {isSignedIn && (
              <p className="mt-1 text-xs font-medium text-[#7A7A7A]">Signed in as {userLabel}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => router.push('/map')}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#6F8F88]"
            >
              <Map className="mr-2 inline h-4 w-4" />
              Explore map
            </Button>
            <Button
              onClick={() => router.push('/')}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#6F8F88]"
            >
              <ArrowLeft className="mr-2 inline h-4 w-4" />
              Back home
            </Button>
            {isSignedIn && (
              <Button
                onClick={() => signOut()}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#6F8F88] hover:bg-white active:bg-white"
              >
                Sign out
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {profileOptions.map((option) => (
            <section
              key={option.id}
              className="animated-card rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${option.accent}`}>
                  <option.icon className="h-6 w-6 text-[#6F8F88]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A0A0A0]">
                    {option.eyebrow}
                  </p>
                  <h2 className="text-2xl font-semibold">{option.title}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#7A7A7A]">{option.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-[#7A7A7A]">
                {option.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#8FBFB6]" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  onClick={() => router.push(option.actionPath)}
                  className={option.buttonClass}
                >
                  {option.actionLabel}
                </Button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
