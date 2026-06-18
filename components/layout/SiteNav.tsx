'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogoMark } from '@/components/brand/Logo';

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
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo + church name */}
          <Link
            href="/"
            className="logo-link flex items-center gap-2.5 sm:gap-3 shrink-0"
            aria-label="West Croydon Methodist Church home page"
          >
            <LogoMark className="w-10 h-10 sm:w-12 sm:h-12 text-red shrink-0" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-xl sm:text-2xl font-semibold text-ink">West Croydon</span>
              <span className="font-serif text-xs sm:text-sm font-medium text-red tracking-wide">Methodist Church</span>
            </span>
          </Link>

          {/* Centre: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`nav-link text-sm font-medium transition-colors hover:text-red py-2 ${
                  pathname === link.href ? 'text-red' : 'text-ink'
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
              className="bg-red text-paper rounded-md px-3 sm:px-4 py-2.5 text-sm font-medium hover:bg-red-dark btn-lift min-h-[44px] flex items-center justify-center"
            >
              Plan your visit
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
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
          <div id="mobile-menu" className="lg:hidden py-6 space-y-4 border-t border-line-soft animate-menu-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base sm:text-lg font-medium transition-colors hover:text-red py-3 px-4 rounded-md ${
                  pathname === link.href ? 'text-red bg-gold-pale' : 'text-ink'
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
