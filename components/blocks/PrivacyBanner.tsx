'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'wcmc-cookie-consent';

export default function PrivacyBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage blocked (private mode) — show it anyway
      setVisible(true);
    }
  }, []);

  const decide = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore — just close */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Privacy and cookies"
      className="fixed inset-x-0 bottom-0 z-[60] animate-banner-up"
    >
      <div className="bg-paper border-t-4 border-red shadow-[0_-8px_30px_-12px_rgba(40,30,20,0.35)]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col lg:flex-row lg:items-center gap-4">
          <p className="text-ink text-sm leading-relaxed flex-1">
            We use cookies to make this site work and to understand how it&apos;s used.
            You can accept or decline. See our{' '}
            <Link
              href="/privacy"
              className="text-red font-medium underline underline-offset-2 hover:text-red-dark"
            >
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              type="button"
              onClick={() => decide('declined')}
              className="px-5 py-2.5 rounded-md border border-line text-ink font-medium hover:bg-bg btn-lift min-h-[44px]"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide('accepted')}
              className="px-5 py-2.5 rounded-md bg-red text-paper font-medium hover:bg-red-dark btn-lift min-h-[44px]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
