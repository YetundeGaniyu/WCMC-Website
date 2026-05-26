'use client';

import { useState } from 'react';

const SUBJECTS = [
  { id: 'general', label: 'General' },
  { id: 'visit', label: 'Planning a visit' },
  { id: 'pastoral', label: 'Pastoral' },
  { id: 'hallhire', label: 'Hall hire' },
  { id: 'safeguarding', label: 'Safeguarding' },
] as const;

type SubjectId = (typeof SUBJECTS)[number]['id'];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general' as SubjectId,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'general', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-800 font-medium">Thanks for reaching out! We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold min-h-[48px]"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold min-h-[48px]"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          Subject
        </label>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              type="button"
              onClick={() => setFormData({ ...formData, subject: subject.id })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                formData.subject === subject.id
                  ? 'bg-gold text-ink'
                  : 'bg-gold-pale text-ink hover:bg-gold hover:text-ink'
              }`}
            >
              {subject.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          className="w-full px-4 py-3 border border-line-soft rounded-md text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold resize-none"
          placeholder="How can we help?"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-red text-paper rounded-md px-6 py-3 text-base font-medium hover:bg-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
