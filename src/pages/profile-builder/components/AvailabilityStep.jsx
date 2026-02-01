import React from 'react';
import Button from '../../../components/ui/Button';

const availabilityOptions = [
  { value: 'available', label: 'Available', description: 'Ready to start right away.' },
  { value: 'open', label: 'Open to Offers', description: 'Exploring the right fit.' },
  { value: 'not-looking', label: 'Not Looking', description: 'Happy where I am.' }
];

export default function AvailabilityStep({ formData, errors, onChange, onSubmit, onBack, isSubmitting = false }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#3A3A3A]">Availability & bio</h2>
        <p className="text-sm text-[#7A7A7A]">Share what you are open to and a short intro.</p>
      </div>

      <div>
        <label className="text-sm font-medium text-[#3A3A3A]">Short bio</label>
        <textarea
          rows={4}
          maxLength={150}
          value={formData.bio}
          onChange={(event) => onChange('bio', event.target.value)}
          placeholder="Tell recruiters what drives you (150 characters max)."
          className="mt-2 w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#3A3A3A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FBFB6]/40"
        />
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className={errors.bio ? 'text-[#E07A5F]' : 'text-[#7A7A7A]'}>
            {errors.bio || 'Keep it short and human.'}
          </span>
          <span className="text-[#7A7A7A]">{formData.bio.length}/150</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[#3A3A3A]">Availability</label>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {availabilityOptions.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-2xl border px-4 py-4 text-sm transition-all ${
                formData.availability === option.value
                  ? 'border-transparent bg-[#8FBFB6]/15 text-[#3A3A3A] shadow-sm'
                  : 'border-black/5 bg-white text-[#7A7A7A] hover:border-black/10'
              }`}
            >
              <input
                type="radio"
                name="availability"
                value={option.value}
                checked={formData.availability === option.value}
                onChange={(event) => onChange('availability', event.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-[#3A3A3A]">{option.label}</div>
              <div className="mt-1 text-xs text-[#7A7A7A]">{option.description}</div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          onClick={onBack}
          className="rounded-full border border-black/8 bg-white px-5 py-2 text-[#6F8F88]"
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          className="rounded-full bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] px-6 py-2 text-white shadow-md hover:shadow-lg transition-all"
        >
          Submit profile
        </Button>
      </div>
    </div>
  );
}
