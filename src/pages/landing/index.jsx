"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../components/ui/Button';
import { Map, Users, Sparkles, Github, Target, Zap } from 'lucide-react';

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F4EFE9]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-6 h-6 text-[#8FBFB6]" />
            <span className="text-xl font-bold text-[#3A3A3A]">TalentMap</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/map')}
              className="text-[#7A7A7A] hover:text-[#3A3A3A] font-medium transition-colors"
            >
              Explore Map
            </button>
            <Button
              onClick={() => router.push('/profile/create')}
              className="bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Create Profile
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-black/6">
          <Sparkles className="w-4 h-4 text-[#8FBFB6]" />
          <span className="text-sm font-medium text-[#7A7A7A]">
            Visual Talent Discovery for Japan's Tech Startups
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-[#3A3A3A] mb-6 leading-tight">
          Visualize Talent,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9DB8A0] to-[#8FBFB6]">
            Don't Scroll Resumes
          </span>
        </h1>

        <p className="text-xl text-[#7A7A7A] mb-12 max-w-2xl mx-auto leading-relaxed">
          A visual talent map for startup tech hiring in Japan — see real builders, not resumes.
          Explore projects, not PDFs.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <Button
            onClick={() => router.push('/map')}
            className="bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <Map className="w-5 h-5 mr-2 inline" />
            Explore Talent Map
          </Button>
          <Button
            onClick={() => router.push('/profile/create')}
            className="bg-white text-[#6F8F88] px-8 py-4 rounded-full text-lg font-semibold border-2 border-black/8 hover:border-black/15 transition-all"
          >
            <Users className="w-5 h-5 mr-2 inline" />
            Create Builder Profile
          </Button>
        </div>

        {/* Visual Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-black/5">
            <div className="aspect-video bg-gradient-to-br from-[#F7F3EE] to-[#F4EFE9] rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Simplified map preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-8">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8FBFB6] to-[#9DB8A0] shadow-lg animate-pulse"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0.6 + Math.random() * 0.4
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="relative z-10 text-center">
                <Map className="w-16 h-16 text-[#8FBFB6] mx-auto mb-4 opacity-50" />
                <p className="text-[#7A7A7A] font-medium">Interactive Talent Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Split */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Students */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EEF2FF] to-white flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-[#6C63FF]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students & Builders</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Resume black hole</p>
                  <p className="text-sm text-gray-600">No feedback, no visibility</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">PDFs fail to show real ability</p>
                  <p className="text-sm text-gray-600">Your code speaks louder than words</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fragmented portfolios</p>
                  <p className="text-sm text-gray-600">GitHub, Notion, resumes scattered everywhere</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Show real projects, not claims</p>
                    <p className="text-sm text-gray-600">Build once, showcase forever</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* For Recruiters */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EEF2FF] to-white flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#6C63FF]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Recruiters & Founders</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Resume signal overload</p>
                  <p className="text-sm text-gray-600">100+ PDFs, all look the same</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Can't tell who actually built it</p>
                  <p className="text-sm text-gray-600">Team projects hide individual contributions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">ATS built for corporates</p>
                  <p className="text-sm text-gray-600">Not for fast-moving startups</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Visual exploration, not filtering</p>
                    <p className="text-sm text-gray-600">See clusters, spot talent instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#4DA3FF] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Github className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Create Your Profile</h3>
            <p className="text-gray-600">
              Add your projects, tech stack, and what you actually built. No fluff, just facts.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#4DA3FF] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Map className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Appear on the Map</h3>
            <p className="text-gray-600">
              Your profile becomes a node, clustered with similar tech stacks. Visual, not textual.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#4DA3FF] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Get Discovered</h3>
            <p className="text-gray-600">
              Recruiters explore the map, click your node, see your projects. Direct connection.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-[#9DB8A0] to-[#8FBFB6] rounded-3xl p-12 shadow-2xl text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to be seen?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join the visual talent map. Show your work, not your resume.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => router.push('/profile/create')}
              className="bg-white text-[#6F8F88] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              Create Your Profile
            </Button>
            <Button
              onClick={() => router.push('/map')}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              Explore the Map
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-[#8FBFB6]" />
              <span className="font-bold text-[#3A3A3A]">TalentMap</span>
            </div>
            <p className="text-sm text-[#7A7A7A]">
              Visual talent discovery for Japan's tech startups
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
