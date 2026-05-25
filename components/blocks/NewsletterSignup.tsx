'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to /api/newsletter
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className="bg-paper border border-line-soft rounded-xl p-6 sm:p-10 text-center">
        <p className="text-ink font-medium">Thanks for subscribing!</p>
      </div>
    );
  }

  return (
    <div className="bg-paper border border-line-soft rounded-xl p-6 sm:p-10">
      <h3 className="font-serif text-2xl sm:text-3xl text-ink mb-2 text-center">Stay in the loop</h3>
      <p className="text-ink-muted text-center mb-6">Get weekly updates on events, news, and community life.</p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold min-h-[48px]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red text-paper rounded-md font-medium hover:bg-red-dark transition-colors min-h-[48px]"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}
