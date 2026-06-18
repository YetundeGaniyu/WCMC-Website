'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function PrayerForm() {
  const [name, setName] = useState('');
  const [prayer, setPrayer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, prayer }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setName('');
        setPrayer('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {submitStatus === 'success' && (
        <div className="bg-green-pale border border-green text-green rounded-md p-4 mb-6">
          Thank you for your prayer request. Our prayer team will pray for you.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-pale border border-red text-red rounded-md p-4 mb-6">
          Sorry, there was an error submitting your prayer request. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-sans text-ink mb-2">
            Name (optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold min-h-[48px]"
          />
        </div>

        <div>
          <label htmlFor="prayer" className="block font-sans text-ink mb-2">
            Prayer Request
          </label>
          <textarea
            id="prayer"
            value={prayer}
            onChange={(e) => setPrayer(e.target.value)}
            placeholder="How can we pray for you?"
            required
            rows={5}
            className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold resize-none"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
        </Button>
      </form>
    </div>
  );
}
