import React from 'react';
import Button from '../../../components/ui/Button';

export default function BasicInfoStep({ formData, errors, onChange, onNext }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#3A3A3A]">Basic info</h2>
        <p className="text-sm text-[#7A7A7A]">Tell us who you are. This helps recruiters connect quickly.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-[#3A3A3A]">Full name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="e.g., Aiko Nakamura"
            className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-[#E07A5F]">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-[#3A3A3A]">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => onChange('email', event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#E07A5F]">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-[#3A3A3A]">Location</label>
          <input
            type="text"
            list="location-suggestions"
            value={formData.location}
            onChange={(event) => onChange('location', event.target.value)}
            placeholder="Tokyo, Osaka, Kyoto"
            className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
          />
          <datalist id="location-suggestions">
            <option value="Tokyo" />
            <option value="Osaka" />
            <option value="Kyoto" />
            <option value="Fukuoka" />
            <option value="Nagoya" />
            <option value="Sapporo" />
          </datalist>
          {errors.location && (
            <p className="mt-1 text-xs text-[#E07A5F]">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-[#3A3A3A]">GitHub username</label>
          <div className="mt-2 flex items-center rounded-xl border border-black/5 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#8FBFB6]/40">
            <span className="text-xs text-[#7A7A7A]">github.com/</span>
            <input
              type="text"
              value={formData.githubUsername}
              onChange={(event) => onChange('githubUsername', event.target.value)}
              placeholder="username"
              className="ml-2 flex-1 bg-transparent text-sm text-[#3A3A3A] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          onClick={onNext}
          className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-6 py-2 text-white shadow-md hover:shadow-lg transition-all"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
