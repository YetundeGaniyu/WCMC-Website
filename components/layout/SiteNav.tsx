'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/visit', label: 'Visit' },
  { href: '/services', label: 'Services' },
  { href: '/whats-on', label: "What's On" },
  { href: '/community', label: 'Community' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line-soft">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <div className="absolute inset-0 bg-red-dark"></div>
              <div className="absolute inset-0 bg-gold translate-x-1 translate-y-1"></div>
            </div>
            <span className="font-serif text-lg sm:text-xl text-ink">WCMC</span>
          </Link>

          {/* Centre: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm sm:text-base font-medium transition-colors hover:text-gold py-2 ${
                  pathname === link.href ? 'text-gold border-b-2 border-gold' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA Button - visible on tablet and desktop */}
          <div className="hidden sm:block">
            <Link
              href="/visit"
              className="bg-red text-paper rounded-md px-3 sm:px-4 py-2.5 text-sm font-medium hover:bg-red-dark transition-colors min-h-[44px] flex items-center justify-center"
            >
              Plan your visit
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Full screen slide-down drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-4 border-t border-line-soft">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base sm:text-lg font-medium transition-colors hover:text-gold py-3 px-4 rounded-md ${
                  pathname === link.href ? 'text-gold bg-gold-pale' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/visit"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-red text-paper rounded-md px-4 py-3 text-base sm:text-lg font-medium text-center hover:bg-red-dark transition-colors min-h-[48px] flex items-center justify-center"
            >
              Plan your visit
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
